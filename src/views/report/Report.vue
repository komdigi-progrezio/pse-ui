<template>
  <div>
    <CCard>
      <CCardHeader> Filter </CCardHeader>
      <CCardBody>
        <div class="d-flex p-3 p-lg-0">
          <CButton
            color="dark"
            variant="outline"
            size="sm"
            class="mr-2"
            :class="{ 'mr-auto': search.name === null }"
            v-c-tooltip="{
              content: 'Filter',
              placement: 'bottom',
            }"
            @click="filter"
          >
            Filter
            <CIcon :name="setIconFilter" />
          </CButton>
          <CButton
            v-show="search.name !== null"
            color="info"
            variant="outline"
            size="sm"
            class="mr-auto"
            v-c-tooltip="{
              content: 'Bersihkan',
              placement: 'bottom',
            }"
            @click="clearFilter"
          >
            Clear All
            <CIcon name="cil-clear-all" />
          </CButton>
          <template v-if="listFilter">
            <CButton
              color="primary"
              variant="outline"
              size="sm"
              class="mr-2"
              v-c-tooltip="{
                content: 'Cari',
                placement: 'bottom',
              }"
              @click="filterData"
            >
              Search
              <CIcon name="cil-search" />
            </CButton>
            <CButton
              color="danger"
              variant="outline"
              size="sm"
              v-c-tooltip="{
                content: 'Reset',
                placement: 'bottom',
              }"
              @click="resetFilter"
            >
              Reset
              <CIcon name="cil-reload" />
            </CButton>
          </template>
        </div>
        <template v-if="listFilter">
          <CRow class="px-3 p-lg-0 my-3">
            <CCol sm="12">
              <div class="form-group">
                <label for="name">Nama Laporan</label>
                <input
                  v-model="search.name"
                  type="text"
                  name="name"
                  placeholder="Masukan Nama Laporan"
                  class="form-control"
                />
              </div>
            </CCol>
            <CCol sm="12" md="4" lg="4">
              <div class="form-group">
                <label for="tanggal">Bulan</label>
                <select v-model="search.tanggal" class="form-control">
                  <option value="all">Pilih Bulan</option>
                  <option
                    :value="value.id"
                    v-for="(value, index) in dataSelect.tanggal"
                    :key="`tanggal-${index}`"
                  >
                    {{ value.name }}
                  </option>
                </select>
              </div>
            </CCol>
            <CCol sm="12" md="4" lg="4">
              <div class="input-group">
                <label for="created_at">Mulai</label>
                <div class="input-group mb-3">
                  <date-picker
                    v-model="search.created_at"
                    name="created_at"
                    :config="optionsCreatedAt"
                    class="form-control"
                    @input="changeMinDate"
                  />
                  <div class="input-group-append">
                    <span class="input-group-text" id="basic-addon2"
                      ><CIcon name="cil-calendar"
                    /></span>
                  </div>
                </div>
              </div>
            </CCol>
            <CCol sm="12" md="4" lg="4">
              <div class="input-group">
                <label for="modified_at">Sampai</label>
                <div class="input-group mb-3">
                  <date-picker
                    v-model="search.modified_at"
                    name="modified_at"
                    :config="optionsModifiedAt"
                    class="form-control"
                  />
                  <div class="input-group-append">
                    <span class="input-group-text" id="basic-addon2"
                      ><CIcon name="cil-calendar"
                    /></span>
                  </div>
                </div>
              </div>
            </CCol>
          </CRow>
        </template>
      </CCardBody>
    </CCard>
    <CCard>
      <CCardHeader>
        <CIcon name="cil-bullhorn" /> Laporan
        <div class="card-header-actions">
          <CButton
            color="info"
            shape="pill"
            size="sm"
            :variant="isExcelDownload"
            v-c-tooltip="{
              content: 'Download Seluruh Laporan',
              placement: 'bottom',
            }"
            :disabled="isDownload"
            @click="downloadExcelAll"
          >
            <CIcon name="cil-data-transfer-down" v-if="!isDownload" />
            <CSpinner size="sm" color="primary" v-if="isDownload" />
          </CButton>

          <CButton
            color="success"
            shape="pill"
            size="sm"
            variant="outline"
            v-c-tooltip="{
              content: 'Tambah Laporan',
              placement: 'bottom',
            }"
            v-if="addReportPermission"
            @click="addReport"
          >
            <CIcon name="cil-plus" />
          </CButton>
        </div>
      </CCardHeader>
      <CCardBody>
        <div class="mt-lg-4">
          <div v-if="spinner" class="d-flex justify-content-center">
            <div class="spinner-border text-primary" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
          <div class="table-responsive">
            <table v-if="!spinner" class="table table-hover table-striped">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama Laporan</th>
                  <th colspan="3">Aksi</th>
                </tr>
              </thead>
              <tbody>
                <template v-if="data.length > 0">
                  <tr v-for="(item, index) in data" :key="index">
                    <th scope="row">
                      {{
                        (pagination.current_page - 1) * pagination.per_page +
                        index +
                        1
                      }}
                    </th>
                    <td>{{ item.name }}</td>
                    <td>
                      <template v-if="!userReport">
                        <CButton
                          color="danger"
                          size="sm"
                          class="mr-2"
                          v-c-tooltip="{
                            content: 'Hapus Laporan',
                            placement: 'bottom',
                          }"
                          @click="destroy(item)"
                          v-if="deleteReportPermission"
                        >
                          <CIcon name="cil-trash" />
                          <span class="mobile-only">Hapus Laporan</span>
                        </CButton>
                        <CButton
                          color="success"
                          size="sm"
                          class="mr-2"
                          v-c-tooltip="{
                            content: 'Edit Laporan',
                            placement: 'bottom',
                          }"
                          @click="edit(item)"
                          v-if="editReportPermission"
                        >
                          <CIcon name="cil-pencil" />
                          <span class="mobile-only">Edit Laporan</span>
                        </CButton>
                      </template>
                      <CButton
                        color="info"
                        size="sm"
                        class="mr-2"
                        v-c-tooltip="{
                          content: 'Download Laporan',
                          placement: 'bottom',
                        }"
                        :disabled="isDownload"
                        @click="downloadExcel(item.id)"
                      >
                        <CIcon
                          name="cil-data-transfer-down"
                          v-if="!isDownload"
                        />
                        <CSpinner size="sm" color="info" v-if="isDownload" />
                        <span class="mobile-only">
                          Download Laporan
                          <CSpinner size="sm" color="info" v-if="isDownload" />
                        </span>
                      </CButton>
                    </td>
                  </tr>
                </template>
                <template v-else>
                  <tr>
                    <td colspan="6" class="text-center"> Data Kosong </td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
        </div>
      </CCardBody>
    </CCard>
    <CPagination
      :activePage.sync="pagination.current_page"
      :pages="pagination.last_page"
      size="sm"
      align="center"
      @update:activePage="getData"
      v-if="data.length > 0"
    />
    <CModal
      :title="modal.title"
      :color="modal.color"
      :show.sync="modal.showModal"
      v-if="deleteReportPermission"
    >
      <template v-slot:body-wrapper>
        <div class="modal-body">
          <p>
            {{ modal.message }}
            <strong>{{ modal.data }}</strong
            >?
          </p>
        </div>
      </template>
      <template v-slot:footer>
        <CButton
          color="secondary"
          size="sm"
          class="m-2"
          @click="closeModalDelete"
        >
          Cancel
        </CButton>
        <CButton color="primary" size="sm" class="m-2" @click="submitDelete">
          {{ modal.labelButton }}
        </CButton>
      </template>
    </CModal>
  </div>
</template>

<script>
export default {
  name: 'Report',
  data() {
    return {
      isDownload: false,
      spinner: false,
      listFilter: false,
      data: [],
      modal: {
        showModal: false,
        title: null,
        color: null,
        message: null,
        labelButton: null,
        uniqueId: null,
      },
      search: {
        name: null,
        tanggal: 'all',
        created_at: null,
        modified_at: null,
      },
      dataSelect: {
        tanggal: [
          {
            id: 'january',
            name: 'Januari',
          },
          {
            id: 'februari',
            name: 'Februari',
          },
          {
            id: 'maret',
            name: 'Maret',
          },
          {
            id: 'april',
            name: 'April',
          },
          {
            id: 'mei',
            name: 'Mei',
          },
          {
            id: 'juni',
            name: 'Juni',
          },
          {
            id: 'juli',
            name: 'Juli',
          },
          {
            id: 'agustus',
            name: 'Agustus',
          },
          {
            id: 'september',
            name: 'September',
          },
          {
            id: 'oktober',
            name: 'Oktober',
          },
          {
            id: 'november',
            name: 'November',
          },
          {
            id: 'desember',
            name: 'Desember',
          },
        ],
      },
      pagination: {
        current_page: 1,
        last_page: 10,
        per_page: null,
      },
    }
  },
  computed: {
    isExcelDownload() {
      if (this.isDownload) {
        return null
      }

      return 'outline'
    },
    setIconFilter() {
      if (this.listFilter) {
        return 'cil-filter-x'
      }

      return 'cil-filter'
    },
    addReportPermission() {
      return this.$store.state.auth.data.permissions.includes('Tambah Laporan')
    },
    editReportPermission() {
      return this.$store.state.auth.data.permissions.includes('Edit Laporan')
    },
    deleteReportPermission() {
      return this.$store.state.auth.data.permissions.includes('Hapus Laporan')
    },
    userReport() {
      return this.$store.state.auth.data.roles.includes('Sub Pejabat')
    },
  },
  created() {
    this.getData()
  },
  methods: {
    downloadExcel(id) {
      this.isDownload = true
      this.$http
        .get(`/report/excel/${id}`)
        .then((response) => {
          console.log(response)
          this.isDownload = false
          window.location.href = response.data.path
        })
        .catch((error) => {
          this.isDownload = false
          if (error.response.status === 500) {
            this.$toastr.e('Ada Kesalahan dari Server', 'Pemberitahuan')
          } else {
            this.$toastr.e(error.response.data.message, 'Pemberitahuan')
          }
        })
    },
    downloadExcelAll() {
      this.isDownload = true
      this.$http
        .get('/report/excel-all', {})
        .then((response) => {
          // console.log('test')
          console.log(response)
          this.isDownload = false

          window.location.href = response.data.path
        })
        .catch((error) => {
          console.log('eerrr')
          console.log(error)
          this.isDownload = false
          if (error.response.status === 500) {
            this.$toastr.e('Ada Kesalahan dari Server', 'Pemberitahuan')
          } else {
            this.$toastr.e(error.response.data.message, 'Pemberitahuan')
          }
        })
    },
    addReport() {
      this.$router.push('/admin/report/add')
    },
    edit(value) {
      this.$router.push(`/admin/report/${value.id}/edit`)
    },
    changeMinDate() {
      this.optionsModifiedAt.minDate = this.search.created_at
    },
    resetFilter() {
      this.spinner = true
      this.clearFilter()

      this.$http
        .get('/report/filter', {
          params: {
            page: 1,
          },
        })
        .then((response) => {
          this.spinner = true
          this.data = response.data.data
          this.pagination.current_page = response.data.meta.current_page
          this.pagination.per_page = response.data.meta.per_page
          this.pagination.last_page = response.data.meta.last_page
        })
        .catch((error) => {
          if (error.response.status === 500) {
            this.$toastr.e('Ada Kesalahan dari Server', 'Pemberitahuan')
          } else {
            this.$toastr.e(error.response.data.message, 'Pemberitahuan')
          }
        })
    },
    filter() {
      this.listFilter = !this.listFilter
      this.clearFilter()
    },
    clearFilter() {
      this.search.name = null
    },
    filterData() {
      this.spinner = true

      this.$http
        .get('/report/filter', {
          params: {
            page: 1,
            filter: 'name',
            q: this.search.name,
          },
        })
        .then((response) => {
          this.spinner = false
          this.data = response.data.data
          this.pagination.current_page = response.data.meta.current_page
          this.pagination.per_page = response.data.meta.per_page
          this.pagination.last_page = response.data.meta.last_page
        })
        .catch((error) => {
          if (error.response.status === 500) {
            this.$toastr.e('Ada Kesalahan dari Server', 'Pemberitahuan')
          } else {
            this.$toastr.e(error.response.data.message, 'Pemberitahuan')
          }
        })
    },
    getData() {
      this.spinner = true

      this.$http
        .get('/report/filter', {
          params: {
            page: this.pagination.current_page,
            filter: 'name',
            q: this.search.name,
          },
        })
        .then((response) => {
          this.spinner = false
          this.data = response.data.data
          this.pagination.current_page = response.data.meta.current_page
          this.pagination.per_page = response.data.meta.per_page
          this.pagination.last_page = response.data.meta.last_page
        })
        .catch((error) => {
          if (error.response.status === 500) {
            this.$toastr.e('Ada Kesalahan dari Server', 'Pemberitahuan')
          } else {
            this.$toastr.e(error.response.data.message, 'Pemberitahuan')
          }
        })
    },
    destroy(item) {
      this.modal.showModal = true
      this.modal.title = 'Hapus Data'
      this.modal.color = 'danger'
      this.modal.data = item.name
      this.modal.uniqueId = item.id
      this.modal.message = 'Ingin Menghapus Data'
      this.modal.labelButton = 'Hapus'
    },
    closeModalDelete() {
      this.modal.showModal = false
      this.clearModalDelete()
    },
    clearModalDelete() {
      this.modal.title = null
      this.modal.color = null
      this.modal.data = null
      this.modal.uniqueId = null
      this.modal.message = null
      this.modal.labelButton = null
    },
    submitDelete() {
      this.$http
        .delete(`report/${this.modal.uniqueId}`)
        .then((response) => {
          this.filterData()
          this.closeModalDelete()
          this.$toastr.s(response.data.message, 'Pemberitahuan')
        })
        .catch((error) => {
          this.closeModalDelete()
          if (error.response.status === 500) {
            this.$toastr.e('Ada Kesalahan dari Server', 'Pemberitahuan')
          } else {
            this.$toastr.e(error.response.data.message, 'Pemberitahuan')
          }
        })
    },
  },
}
</script>

<style></style>

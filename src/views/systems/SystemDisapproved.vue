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
            :class="{ 'mr-auto': search.nama_eksternal === null }"
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
            v-show="search.nama_eksternal !== null"
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
                <label for="name">Nama Sistem Elektronik</label>
                <input
                  v-model="search.nama_eksternal"
                  type="text"
                  name="nama_eksternal"
                  placeholder="Masukan Nama Sistem Elektronik"
                  class="form-control"
                />
              </div>
            </CCol>
            <CCol sm="12">
              <div class="form-group">
                <label for="name">Nama Instansi</label>
                <input
                  v-model="search.nama_instansi"
                  type="text"
                  name="nama_instansi"
                  placeholder="Masukan Nama Instansi"
                  class="form-control"
                />
              </div>
            </CCol>
          </CRow>
        </template>
      </CCardBody>
    </CCard>
    <CCard>
      <CCardHeader> <CIcon name="cil-cloud" /> Sistem Elektronik </CCardHeader>
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
                  <th>Nama User</th>
                  <th>Nama Sistem Elektronik</th>
                  <th>URL</th>
                  <th>Tanggal Update</th>
                  <th>Progress</th>
                  <template>
                    <th>Aksi</th>
                  </template>
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
                    <td
                      ><a :href="`/admin/account/${item.account.id}/official`">{{ item.account.nama }}</a></td
                    >
                    <td>
                      <span class="mobile-only mr-1"
                        >Nama Sistem Elektronik:
                      </span>
                      {{ item.nama_eksternal }}
                    </td>
                    <td>
                      <span class="mobile-only mr-1"
                        >URL:
                      </span>
                      {{ item.url }}
                    </td>
                    <td>
                      <span class="mobile-only mr-1">Tanggal Update: </span>
                      {{ formatDate(item.date_updated) }}
                    </td>
                    <td>
                      <span class="mobile-only mr-1">Progress: </span>
                      {{ item.progress }}%
                    </td>

                    <template v-if="isAdmin">
                      <td>
                        <CButton
                          color="dark"
                          size="sm"
                          v-c-tooltip="{
                            content: 'Setujui Sistem Elektronik',
                            placement: 'bottom',
                          }"
                          @click="approve(item)"
                        >
                          <CIcon name="cil-check-circle" />
                          <span class="mobile-only ml-1"
                            >Setujui Sistem Elektronik</span
                          >
                        </CButton>
                        <CButton
                          color="primary"
                          size="sm"
                          class="ml-2"
                          v-c-tooltip="{
                            content: 'Detail Sistem Elektronik',
                            placement: 'bottom',
                          }"
                          :to="`/admin/systems/${item.id}`"
                        >
                          <CIcon name="cil-description" />
                          <span class="mobile-only ml-1"
                            >Detail Sistem Elektronik
                          </span>
                        </CButton>
                        <CButton
                          color="danger"
                          size="sm"
                          class="ml-2"
                          v-c-tooltip="{
                            content: 'Hapus Sistem Elektronik',
                            placement: 'bottom',
                          }"
                          @click="destroy(item)"
                        >
                          <CIcon name="cil-trash" />
                        </CButton>
                      </td>
                    </template>
                    <template v-else>
                      <!-- <CButton
                        color="primary"
                        size="sm"
                        class="mr-2"
                        v-c-tooltip="{
                          content: 'Detail Sistem Elektronik',
                          placement: 'bottom',
                        }"
                        :to="`/admin/systems/${item.id}`"
                      >
                        <CIcon name="cil-description" />
                        <span class="mobile-only ml-1"
                          >Detail Sistem Elektronik
                        </span>
                      </CButton> -->
                      <CButton
                        v-if="!isAdmin"
                        color="danger"
                        size="sm"
                        class="mr-2"
                        v-c-tooltip="{
                          content: 'Hapus Sistem Elektronik',
                          placement: 'bottom',
                        }"
                        @click="destroy(item)"
                      >
                        <CIcon name="cil-trash" />
                      </CButton>
                    </template>
                  </tr>
                </template>
                <template v-else>
                  <tr>
                    <td colspan="5" class="text-center"> Data Kosong </td>
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
        <CButton color="dark" size="sm" class="m-2" @click="closeModal">
          Cancel
        </CButton>
        <CButton
          color="primary"
          size="sm"
          class="m-2"
          @click="approvedPublishSytem"
          :disabled="isSubmit"
        >
          {{ modal.labelButton }}
          <CSpinner size="sm" color="info" v-if="isSubmit" />
        </CButton>
      </template>
    </CModal>
    <CModal
      :title="modal.delete.title"
      :color="modal.delete.color"
      :show.sync="modal.delete.showModal"
    >
      <template v-slot:body-wrapper>
        <div class="modal-body">
          <p>
            {{ modal.delete.message }}
            <strong>{{ modal.delete.data }}</strong
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
          {{ modal.delete.labelButton }}
        </CButton>
      </template>
    </CModal>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'SystemDisapproved',
  data() {
    return {
      spinner: false,
      isSubmit: false,
      listFilter: false,
      data: [],
      search: {
        nama_eksternal: null,
        nama_instansi: null,
      },
      modal: {
        delete: {
          showModal: false,
          title: null,
          color: null,
          message: null,
          labelButton: null,
          uniqueId: null,
        },
        showModal: false,
        title: null,
        color: null,
        message: null,
        labelButton: null,
        url: null,
        uniqueId: null,
        method: null,
      },
      pagination: {
        current_page: 1,
        last_page: 10,
        per_page: null,
      },
    }
  },
  computed: {
    setIconFilter() {
      if (this.listFilter) {
        return 'cil-filter-x'
      }

      return 'cil-filter'
    },

    isAdmin() {
      if (this.$store.state.auth.data.roles.includes('Admin')) {
        return true
      }

      return false
    },
  },
  created() {
    this.getData()
  },
  methods: {
    formatDate: function (date) {
      return moment(date).format('DD-MM-YYYY HH:mm:ss')
    },
    clearModal() {
      this.modal.title = null
      this.modal.color = null
      this.modal.data = null
      this.modal.message = null
      this.modal.url = null
      this.modal.labelButton = null
      this.modal.uniqueId = null
      this.modal.method = null
    },
    closeModal() {
      this.modal.showModal = false
      this.clearModal()
    },
    approve(value) {
      this.modal.showModal = true
      this.modal.title = 'Setujui Data'
      this.modal.color = 'success'
      this.modal.data = value.nama_eksternal
      this.modal.uniqueId = value.id
      this.modal.message = 'Ingin Mensetujui Data'
      this.modal.labelButton = 'Setujui'
      this.modal.url = 'systems/approved'
      this.modal.method = 'patch'
    },
    filter() {
      this.listFilter = !this.listFilter
      this.clearFilter()
    },
    submitDelete() {
      this.$http
        .delete(`systems/${this.modal.delete.uniqueId}`)
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
    clearModalDelete() {
      this.modal.delete.title = null
      this.modal.delete.color = null
      this.modal.delete.data = null
      this.modal.delete.uniqueId = null
      this.modal.delete.message = null
      this.modal.delete.labelButton = null
    },
    closeModalDelete() {
      this.modal.delete.showModal = false
      this.clearModalDelete()
    },
    destroy(item) {
      this.modal.delete.showModal = true
      this.modal.delete.title = 'Hapus Data'
      this.modal.delete.color = 'danger'
      this.modal.delete.data = item.nama
      this.modal.delete.uniqueId = item.id
      this.modal.delete.message = 'Ingin Menghapus Data'
      this.modal.delete.labelButton = 'Hapus'
    },
    clearFilter() {
      this.search.nama_eksternal = null
      this.search.nama_instansi = null
    },
    getData() {
      this.spinner = true
      this.$http
        .get('/systems/filter/disapproved', {
          params: {
            page: this.pagination.current_page,
            // nama_eksternal: this.search.nama_eksternal,
            // nama_instansi: this.search.nama_instansi,
            filter: 'nama_eksternal',
            q: this.search.nama_eksternal,
            agency: this.search.nama_instansi,
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
    filterData() {
      this.spinner = true

      this.$http
        .get('/systems/filter/disapproved', {
          params: {
            page: 1,
            // nama_eksternal: this.search.nama_eksternal,
            // nama_instansi: this.search.nama_instansi,
            filter: 'nama_eksternal',
            q: this.search.nama_eksternal,
            agency: this.search.nama_instansi,
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
    resetFilter() {
      this.spinner = true
      this.clearFilter()

      this.$http
        .get('/systems/filter/disapproved', {
          params: {
            page: 1,
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
    approvedPublishSytem() {
      this.spinner = true
      this.isSubmit = true
      this.$http
        .patch(`/systems/approved/publish/${this.modal.uniqueId}`)
        .then((response) => {
          this.spinner = false
          this.isSubmit = false
          this.filterData()
          this.closeModal()
          this.$toastr
            .s(response.data.message, 'Pemberitahuan')
            .catch((error) => {
              this.spinner = false
              this.isSubmit = false
              if (error.response.status === 500) {
                this.$toastr.e('Ada Kesalahan dari Server', 'Pemberitahuan')
              } else {
                this.$toastr.e(error.response.data.message, 'Pemberitahuan')
              }
            })
        })
    },
  },
}
</script>

<style></style>

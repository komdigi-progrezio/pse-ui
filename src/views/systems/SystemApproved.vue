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
            <CCol sm="12">
              <div class="form-group">
                <label for="name">Progress</label>
                <select v-model="search.progres" class="form-control">
                  <option value="">Pilih Progress</option>
                  <option
                    v-for="(value, index) in progress"
                    :value="value.id"
                    :key="`progress-${index}`"
                  >
                    {{ value.name }}
                  </option>
                </select>
              </div>
            </CCol>
          </CRow>
        </template>
      </CCardBody>
    </CCard>
    <CCard>
      <CCardHeader>
        <div class="d-flex align-items-center w-100">
          <CIcon class="mr-1" name="cil-cloud" />
          <strong>Sistem Elektronik</strong>
          <div class="card-header-actions ml-auto">
            <CButton
              v-if="!isAdmin"
              color="success"
              shape="pill"
              size="sm"
              variant="outline"
              v-c-tooltip="{
                content: 'Tambah Sistem Elektronik',
                placement: 'bottom',
              }"
              :to="'/admin/systems/register'"
            >
              <CIcon name="cil-plus" />
            </CButton>
          </div>
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
                  <th>Nama User</th>
                  <th v-if="!isSubPejabat">Nama Penyelenggara</th>
                  <th>Nama Sistem Elektronik</th>
                  <th>Tanggal Update</th>
                  <th>Progress</th>
                  <th>Status</th>
                  <th>Aksi</th>
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
                    <td  v-if="item.account"
                      ><a :href="`/admin/account/${item.account.id}/official`">{{ item.account.nama }}</a></td
                    >
                    <td v-else> - </td>
                    <td v-if="!isSubPejabat">{{ item.organizer_profile }}</td>
                    <td
                      >{{ item.nama_internal }} / {{ item.nama_eksternal }}</td
                    >
                    <td>{{ formatDate(item.date_updated) }}</td>
                    <td
                      ><span class="mobile-only mr-1">Progress: </span>
                      {{ item.progress }}%</td
                    >
                    <td>{{ item.status }}</td>
                    <td>
                      <CButton
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
                      </CButton>
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
                      <CButton
                        v-if="
                          item.status === 'Tidak Terdaftar' && (item.is_locked === false || item.is_locked === null) &&
                          item.progress === 100
                        "
                        color="success"
                        size="sm"
                        v-c-tooltip="{
                          content: 'Kunci Sistem Elektronik',
                          placement: 'bottom',
                        }"
                        @click="confirmLocked(item)"
                      >
                        <CIcon name="cil-check" />
                        <span class="mobile-only ml-1"
                          >Kunci Sistem Elektronik
                        </span>
                      </CButton>
                    </td>
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
        <CButton color="primary" size="sm" class="m-2" @click="locked">
          {{ modal.labelButton }}
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
    <CModal
      :title="modal.confirm.title"
      :color="modal.confirm.color"
      :show.sync="modal.confirm.showModal"
      :keyboard="false"
      @click.self.stop
      class="modal-confirm-layout"
    >
      <template v-slot:header>
        <h5 class="modal-title">{{ modal.confirm.title }}</h5>
        <button type="button" class="close" aria-label="Close" @click="closeConfirmModal">
          <span aria-hidden="true">&times;</span>
        </button>
      </template>
      <template v-slot:body-wrapper>
        <div class="modal-body">
          <CRow>
            <CCol sm="12">
              <p>Yth {{ modal.confirm.user_name }}</p>
              <p>Berikut ini merupakan informasi dari Sistem Elektronik yang Anda daftarkan. <br/><br/>
                <b>Nama Sistem Elektronik:</b>  {{ modal.confirm.nama_internal }} <br/>
                <b>Tanggal Daftar:</b>  {{ createdAtformatDate(modal.confirm.created_at) }} <br/>
                <b>Status:</b>  Menunggu Diverifikasi <br /><br />
                Best Regards, <br />
                Webmaster PSE
              </p>
            </CCol>
          </CRow>
        </div>
      </template>
      <template v-slot:footer>
        <CButton color="primary" size="sm" class="m-2" @click="closeConfirmModal()">
          Confirm
        </CButton>
      </template>
    </CModal>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'SystemApproved',
  data() {
    return {
      spinner: false,
      listFilter: false,
      data: [],
      disapprovedData: [],
      search: {
        nama_eksternal: null,
        nama_instansi: null,
      },
      modal: {
        confirm: {
          showModal: false,
          title: 'Informasi',
          color: 'dark',
          user_name: null,
          created_at: null,
          nama_internal: null,
        },
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
        uniqueId: null,
      },
      pagination: {
        current_page: 1,
        last_page: 10,
        per_page: null,
      },
      progress: [
        {
          id: 1,
          name: '50%',
        },
        {
          id: 2,
          name: '60%-90%',
        },
        {
          id: 3,
          name: '100%',
        },
      ],
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

    isSubPejabat() {
      if (this.$store.state.auth.data.roles.includes('Sub Pejabat')) {
        return true
      }

      return false
    },
  },
  created() {
    this.getData()
    if (localStorage.getItem('isRegisteredSe')) {
      this.getDisapprovedData()
      this.modal.confirm.showModal = true
      this.modal.confirm.nama_internal = localStorage.getItem('nama_internal')
    }
  },
  methods: {
    formatDate: function (date) {
      if(date){
        return moment(date).format('DD-MM-YYYY HH:mm:ss')
      }else{
        return moment('01-01-2000 00:00:00').format('DD-MM-YYYY HH:mm:ss')
      }

    },
    createdAtformatDate: function (date) {
      if(date){
        return moment(date).format('DD-MM-YYYY HH:mm:ss')
      }else{
        return moment().format('DD-MM-YYYY HH:mm:ss')
      }

    },
    closeConfirmModal() {
      if (localStorage.getItem('isRegisteredSe')) {
        localStorage.removeItem('nama_internal')
        localStorage.removeItem('nama_eksternal')
        localStorage.removeItem('isRegisteredSe')
      }
      this.modal.confirm.showModal = false
    },
    closeModal() {
      this.modal.showModal = false
      this.clearModal()
    },
    clearModal() {
      this.modal.title = null
      this.modal.color = null
      this.modal.data = null
      this.modal.uniqueId = null
      this.modal.message = null
      this.modal.labelButton = null
    },
    confirmLocked(item) {
      this.modal.showModal = true
      this.modal.title = 'Kunci Sistem Elektronik'
      this.modal.color = 'success'
      this.modal.data = item.nama_internal
      this.modal.uniqueId = item.id
      this.modal.message = 'Ingin Mengkunci Sistem Elektronik'
      this.modal.labelButton = 'Kunci'
    },
    locked() {
      this.$http
        .patch(`/systems/${this.modal.uniqueId}/locked`)
        .then((response) => {
          this.filterData()
          this.closeModal()
          if(response.data.status === 400){
            this.$toastr.e(response.data.message, 'Pemberitahuan')
          }else{
            this.$toastr.s(response.data.message, 'Pemberitahuan')
          }
        })
        .catch((error) => {
          this.closeModal()
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
      this.search.progres = ''
    },
    getData() {
      this.spinner = true
      this.$http
        .get('/systems/filter/approved', {
          params: {
            page: this.pagination.current_page,
            filter: 'nama_eksternal',
            q: this.search.nama_eksternal,
            agency: this.search.nama_instansi,
            progres: this.search.progres
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
        .get('/systems/filter/approved', {
          params: {
            page: 1,
            filter: 'nama_eksternal',
            q: this.search.nama_eksternal,
            agency: this.search.nama_instansi,
            progres: this.search.progres,
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
        .get('/systems/filter/approved', {
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
    getDisapprovedData() {
      this.$http
        .get('/systems/filter/disapproved', {
          params: {
            page: this.pagination.current_page,
            filter: 'nama_eksternal',
          },
        })
        .then((response) => {
          this.disapprovedData = response.data.data  
          if (localStorage.getItem('isRegisteredSe')){
            this.modal.confirm.created_at = this.disapprovedData[0].date_updated
            this.modal.confirm.user_name = this.disapprovedData[0].user_name
          }
        })
        .catch((error) => {
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

<style>
.modal-confirm-layout {
  pointer-events: none;
}
</style>

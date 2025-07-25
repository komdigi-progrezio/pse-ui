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
            :class="{ 'mr-auto': search.nama === null }"
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
            v-show="search.nama !== null"
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
              <label for="name">Nama Kabupaten / Kota</label>
              <input
                v-model="search.nama"
                type="text"
                name="nama"
                placeholder="Masukan Nama Kabupaten / Kota"
                class="form-control"
              />
            </CCol>
          </CRow>
        </template>
      </CCardBody>
    </CCard>
    <CCard>
      <CCardHeader>
        <div class="d-flex align-items-center">
          <CIcon name="cil-terrain" class="mr-1" />
          <p class="m-0"
            >Kabupaten / Kota | <strong>{{ provinsi }}</strong></p
          >
          <div class="card-header-actions ml-auto">
            <CButton
              color="success"
              shape="pill"
              class="m-1"
              size="sm"
              variant="outline"
              v-c-tooltip="{
                content: 'Tambah Kabupaten / Kota',
                placement: 'bottom',
              }"
              @click="post"
            >
              <CIcon name="cil-plus" />
            </CButton>
          </div>
        </div>
      </CCardHeader>
      <CCardBody>
        <div>
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
                  <th>Nama Kabupaten / Kota</th>
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
                    <td>{{ item.nama }}</td>
                    <td>
                      <CButton
                        color="danger"
                        size="sm"
                        class="mr-2"
                        v-c-tooltip="{
                          content: 'Hapus Kabupaten / Kota',
                          placement: 'bottom',
                        }"
                        @click="destroy(item)"
                      >
                        <CIcon name="cil-trash" />
                        <span class="mobile-only ml-1"
                          >Hapus Kabupaten / Kota</span
                        >
                      </CButton>
                      <CButton
                        color="success"
                        size="sm"
                        class="mr-2"
                        v-c-tooltip="{
                          content: 'Edit Kabupaten / Kota',
                          placement: 'bottom',
                        }"
                        @click="edit(item)"
                      >
                        <CIcon name="cil-pencil" />
                        <span class="mobile-only ml-1"
                          >Edit Kabupaten / Kota</span
                        >
                      </CButton>
                    </td>
                  </tr>
                </template>
                <template v-else>
                  <tr>
                    <td colspan="2" class="text-center"> Data Kosong </td>
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
        <CButton color="dark" size="sm" class="m-2" @click="closeModalDelete">
          Cancel
        </CButton>
        <CButton color="primary" size="sm" class="m-2" @click="submitDelete">
          {{ modal.delete.labelButton }}
        </CButton>
      </template>
    </CModal>
    <CModal
      :title="modal.post_put.title"
      :color="modal.post_put.color"
      :show.sync="modal.post_put.showModal"
    >
      <template v-slot:body-wrapper>
        <div class="modal-body">
          <CRow>
            <CCol sm="12">
              <label for="name">Nama Kabupaten / Kota</label>
              <input
                v-model="forms.nama"
                type="text"
                name="nama"
                placeholder="Masukan Nama Kabupaten / Kota"
                class="form-control"
                :class="{
                  'is-invalid': errorValidations.nama.length > 0,
                }"
                @blur="errorValidations.nama = []"
              />
              <message :messages="errorValidations.nama" />
            </CCol>
          </CRow>
        </div>
      </template>
      <template v-slot:footer>
        <CButton color="dark" size="sm" class="m-2" @click="closeModalPostPut">
          Cancel
        </CButton>
        <CButton color="primary" size="sm" class="m-2" @click="submitPostPut">
          {{ modal.post_put.labelButton }}
        </CButton>
      </template>
    </CModal>
  </div>
</template>

<script>
export default {
  name: 'Kota',
  data() {
    return {
      spinner: true,
      listFilter: false,
      modal: {
        delete: {
          showModal: false,
          title: null,
          color: null,
          message: null,
          labelButton: null,
          uniqueId: null,
        },
        post_put: {
          showModal: false,
          title: null,
          color: null,
          labelButton: null,
          method: null,
        },
      },
      data: [],
      forms: {
        id: null,
        id_propinsi: this.$route.query.id_provinsi,
        nama: null,
      },
      provinsi: null,
      search: {
        nama: null,
      },
      errorValidations: {
        nama: [],
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
  },
  created() {
    this.getData()
  },
  methods: {
    resetFilter() {
      this.spinner = true
      this.clearFilter()

      this.$http
        .get('/kota/filter', {
          params: {
            page: 1,
            id_propinsi: this.$route.query.id_provinsi,
          },
        })
        .then((response) => {
          this.spinner = false
          this.data = response.data.data
          this.provinsi = response.data.provinsi.nama
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
      this.search.nama = null
    },
    filterData() {
      this.spinner = true

      this.$http
        .get('/kota/filter', {
          params: {
            page: 1,
            id_propinsi: this.$route.query.id_provinsi,
            filter: 'nama',
            q: this.search.nama,
          },
        })
        .then((response) => {
          this.spinner = false
          this.data = response.data.data
          this.provinsi = response.data.provinsi.nama
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
        .get('/kota/filter', {
          params: {
            page: this.pagination.current_page,
            id_propinsi: this.$route.query.id_provinsi,
            filter: 'nama',
            q: this.search.nama,
          },
        })
        .then((response) => {
          this.spinner = false
          this.data = response.data.data
          this.provinsi = response.data.provinsi.nama
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
      this.modal.delete.showModal = true
      this.modal.delete.title = 'Hapus Data'
      this.modal.delete.color = 'danger'
      this.modal.delete.data = item.nama
      this.modal.delete.uniqueId = item.id
      this.modal.delete.message = 'Ingin Menghapus Data'
      this.modal.delete.labelButton = 'Hapus'
    },
    clearForm() {
      this.forms.id = null
      this.forms.nama = null
    },
    post() {
      this.clearForm()
      this.modal.post_put.showModal = true
      this.modal.post_put.title = 'Tambah Data'
      this.modal.post_put.color = 'success'
      this.modal.post_put.labelButton = 'Simpan'
      this.modal.post_put.method = 'post'
    },
    put() {
      this.modal.post_put.showModal = true
      this.modal.post_put.title = 'Update Data'
      this.modal.post_put.color = 'success'
      this.modal.post_put.labelButton = 'Update'
      this.modal.post_put.method = 'patch'
    },
    clearModalDelete() {
      this.modal.delete.title = null
      this.modal.delete.color = null
      this.modal.delete.data = null
      this.modal.delete.uniqueId = null
      this.modal.delete.message = null
      this.modal.delete.labelButton = null
    },
    clearModalPostPut() {
      this.modal.post_put.title = null
      this.modal.post_put.color = null
      this.modal.post_put.data = null
      this.modal.post_put.uniqueId = null
      this.modal.post_put.message = null
      this.modal.post_put.labelButton = null
    },
    closeModalDelete() {
      this.modal.delete.showModal = false
      this.clearModalDelete()
    },
    closeModalPostPut() {
      this.modal.post_put.showModal = false
      this.clearModalPostPut()
      this.clearForm()
    },
    submitDelete() {
      this.$http
        .delete(`kota/${this.modal.delete.uniqueId}`)
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
    submitPostPut() {
      const url = '/kota'
      const formData = new FormData()
      let urlAction = null
      if (this.modal.post_put.method === 'patch') {
        urlAction = `${url}/${this.forms.id}`
        formData.append('_method', 'patch')
      } else {
        urlAction = url
        formData.append('_method', 'POST')
      }
      const forMapData = Object.entries(this.forms)
      forMapData.forEach((value) => {
        if (Array.isArray(value[1])) {
          for (let index = 0; index < value[1].length; index++) {
            formData.append(`${value[0]}[${index}]`, value[1][index])
          }
        } else {
          formData.append(value[0], value[1] === null ? [] : value[1])
        }
      })
      this.errorValidations.nama = []

      this.$http({
        method: 'post',
        url: urlAction,
        data: formData,
      })
        .then((response) => {
          this.filterData()
          this.closeModalPostPut()
          this.$toastr.s(response.data.message, 'Pemberitahuan')
        })
        .catch((error) => {
          if (error.response.status === 422) {
            this.$toastr.e('Silahkan Cek Form Anda Kembali', 'Pemberitahuan')
            this.errorValidations.nama =
              typeof error.response.data.errors.nama === 'undefined'
                ? []
                : error.response.data.errors.nama
          } else if (error.response.status === 500) {
            this.$toastr.e('Ada Kesalahan dari Server', 'Pemberitahuan')
          } else {
            this.$toastr.e(error.response.data.message, 'Pemberitahuan')
          }
        })
    },
    edit(item) {
      this.forms.id = item.id
      this.forms.nama = item.nama

      this.put()
    },
  },
}
</script>

<style></style>

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
              <div class="form-group">
                <label for="name">Nama Lengkap</label>
                <input
                  v-model="search.nama"
                  type="text"
                  name="name"
                  placeholder="Masukan Nama Lengkap"
                  class="form-control"
                />
              </div>
            </CCol>
          </CRow>
        </template>
      </CCardBody>
    </CCard>
    <CCard>
      <CCardHeader>
        <CIcon name="cil-people" /> Akun
        <div class="card-header-actions">
          <CButton
            color="success"
            shape="pill"
            size="sm"
            variant="outline"
            v-c-tooltip="{
              content: 'Tambah User',
              placement: 'bottom',
            }"
            @click="post"
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
                  <th>Nama</th>
                  <th>Status</th>
                  <th>Last Login</th>
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
                    <td
                      ><span class="mobile-only mr-1">Status: </span>
                      {{ item.nama_status }}</td
                    >
                    <td
                      ><span class="mobile-only mr-1">Last login: </span>
                      {{ item.last_login }}</td
                    >
                    <td>
                      <CButton
                        color="danger"
                        size="sm"
                        class="mr-1"
                        v-c-tooltip="{
                          content: 'Hapus User',
                          placement: 'bottom',
                        }"
                        @click="destroy(item)"
                      >
                        <CIcon name="cil-trash" />
                        <span class="mobile-only ml-1">Hapus User</span>
                      </CButton>
                      <CButton
                        color="success"
                        size="sm"
                        class="mr-1"
                        v-c-tooltip="{
                          content: 'Edit User',
                          placement: 'bottom',
                        }"
                        @click="edit(item)"
                      >
                        <CIcon name="cil-pencil" />
                        <span class="mobile-only ml-1">Edit User</span>
                      </CButton>
                      <template v-if="item.status">
                        <CButton
                          color="dark"
                          size="sm"
                          v-c-tooltip="{
                            content: 'Non Aktifkan User',
                            placement: 'bottom',
                          }"
                          @click="confirmDisable(item)"
                        >
                          <CIcon name="cil-x-circle" />
                          <span class="mobile-only ml-1"
                            >Non-aktifkan User</span
                          >
                        </CButton>
                      </template>
                      <template v-else>
                        <CButton
                          color="dark"
                          size="sm"
                          v-c-tooltip="{
                            content: 'Aktifkan User',
                            placement: 'bottom',
                          }"
                          @click="confirmEnable(item)"
                        >
                          <CIcon name="cil-check-circle" />
                          <span class="mobile-only ml-1">Aktifkan User</span>
                        </CButton>
                      </template>
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
    <ValidationObserver v-slot="{ invalid }" ref="form_admin">
      <CModal
        :title="modal.post_put.title"
        :color="modal.post_put.color"
        :show.sync="modal.post_put.showModal"
      >
        <template v-slot:body-wrapper>
          <div class="modal-body">
            <CRow>
              <CCol sm="12">
                <label for="name">Nama Lengkap</label>
                <ValidationProvider
                  name="Nama Lengkap"
                  :rules="{
                    required: true,
                  }"
                  v-slot="{ errors }"
                >
                  <input
                    v-model="forms.name"
                    type="text"
                    name="name"
                    placeholder="Masukan Nama Lengkap"
                    class="form-control"
                    :class="{
                      'is-invalid':
                        errors.length > 0 || errorValidations.name.length > 0,
                    }"
                    @blur="errorValidations.name = []"
                  />
                  <div v-if="errors.length > 0" class="invalid-feedback">
                    {{ errors[0] }}
                  </div>
                </ValidationProvider>
                <message :messages="errorValidations.name" />
              </CCol>
              <CCol sm="12">
                <label for="username">Username</label>
                <ValidationProvider
                  name="username"
                  :rules="{
                    required: true,
                  }"
                  v-slot="{ errors }"
                >
                  <input
                    v-model="forms.username"
                    type="text"
                    name="username"
                    placeholder="Masukan Username"
                    class="form-control"
                    :class="{
                      'is-invalid':
                        errors.length > 0 ||
                        errorValidations.username.length > 0,
                    }"
                    @input="validateUsername"
                    @blur="errorValidations.username = []"
                  />
                  <div v-if="errors.length > 0" class="invalid-feedback">
                    {{ errors[0] }}
                  </div>
                </ValidationProvider>
                <message :messages="errorValidations.username" />
              </CCol>
              <!-- <template v-if="modal.post_put.method == 'post'">
              <CCol sm="12">
                <label for="password">Password</label>
                <input
                  v-model="forms.password"
                  type="password"
                  name="password"
                  placeholder="Masukan Password"
                  class="form-control"
                  @blur="errorValidations.password = []"
                />
                <message :messages="errorValidations.password" />
              </CCol>
              <CCol sm="12">
                <label for="password_confirmation">Konfirmasi Password</label>
                <input
                  v-model="forms.password_confirmation"
                  type="password"
                  name="password_confirmation"
                  placeholder="Masukan Konfirmasi Password"
                  class="form-control"
                />
              </CCol>
            </template> -->
              <CCol sm="12">
                <div class="form-group">
                  <label for="name">Status</label>
                  <div class="d-flex">
                    <div class="form-check form-check-inline mr-1">
                      <input
                        v-model="forms.status"
                        class="form-check-input"
                        id="inline-radio1"
                        type="radio"
                        value="0"
                        name="inline-radios"
                      />
                      <label class="form-check-label" for="inline-radio1"
                        >Tidak</label
                      >
                    </div>
                    <div class="form-check form-check-inline mr-1">
                      <input
                        v-model="forms.status"
                        class="form-check-input"
                        id="inline-radio1"
                        type="radio"
                        value="1"
                        name="inline-radios"
                      />
                      <label class="form-check-label" for="inline-radio1"
                        >Ya</label
                      >
                    </div>
                  </div>
                </div>
              </CCol>
            </CRow>
            <!-- <CRow>
            <CCol sm="12">
              <label class="form-label">Roles</label>
              <label
                v-for="(value, index) in roles"
                :key="index"
                class="custom-control custom-checkbox col-lg-6"
              >
                <input
                  :id="value.name"
                  v-model="forms.roles"
                  type="checkbox"
                  class="custom-control-input"
                  :value="value.name"
                />
                <span class="custom-control-label">{{
                  value.name.toUpperCase()
                }}</span>
              </label>
            </CCol>
          </CRow> -->
          </div>
        </template>
        <template v-slot:footer>
          <CButton
            color="dark"
            size="sm"
            class="m-2"
            @click="closeModalPostPut"
          >
            Cancel
          </CButton>
          <CButton
            color="primary"
            size="sm"
            class="m-2"
            @click="submitPostPut"
            :disabled="invalid"
          >
            {{ modal.post_put.labelButton }}
          </CButton>
        </template>
      </CModal>
    </ValidationObserver>
    <CModal
      :title="modal.disable.title"
      :color="modal.disable.color"
      :show.sync="modal.disable.showModal"
    >
      <template v-slot:body-wrapper>
        <div class="modal-body">
          <p>
            {{ modal.disable.message }}
            <strong>{{ modal.disable.data }}</strong
            >?
          </p>
        </div>
      </template>
      <template v-slot:footer>
        <CButton color="dark" size="sm" class="m-2" @click="closeModal">
          Cancel
        </CButton>
        <CButton color="primary" size="sm" class="m-2" @click="disable">
          Submit
        </CButton>
      </template>
    </CModal>
    <CModal
      :title="modal.enable.title"
      :color="modal.enable.color"
      :show.sync="modal.enable.showModal"
    >
      <template v-slot:body-wrapper>
        <div class="modal-body">
          <p>
            {{ modal.enable.message }}
            <strong>{{ modal.enable.data }}</strong
            >?
          </p>
        </div>
      </template>
      <template v-slot:footer>
        <CButton color="dark" size="sm" class="m-2" @click="closeModal">
          Cancel
        </CButton>
        <CButton color="primary" size="sm" class="m-2" @click="enable">
          Submit
        </CButton>
      </template>
    </CModal>
  </div>
</template>

<script>
export default {
  name: 'AccountListAdmin',
  data() {
    return {
      search: {
        nama: null,
      },
      listFilter: false,
      pagination: {
        current_page: 1,
        last_page: 10,
        per_page: null,
      },
      spinner: true,
      modal: {
        disable: {
          showModal: false,
          title: 'Konfirmasi Penontifkan User',
          color: 'dark',
          message: 'Apakah Anda Yakin Ingin Menonaktifkan Akun Ini',
          labelButton: 'Submit',
          uniqueId: null,
          data: null,
        },
        enable: {
          showModal: false,
          title: 'Konfirmasi Aktifkan User',
          color: 'dark',
          message: 'Apakah Anda Yakin Ingin Mengaktifkan Akun Ini',
          labelButton: 'Submit',
          uniqueId: null,
          data: null,
        },
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
      // roles: [],
      forms: {
        id: null,
        name: null,
        username: null,
        status: null,
        // password: null,
        // password_confirmation: null,
        // roles: [],
      },
      errorValidations: {
        name: [],
        username: [],
        // password: [],
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
    // this.getRole()
  },
  methods: {
    closeModal() {
      this.modal.disable.showModal = false
      this.modal.enable.showModal = false
    },
    confirmDisable(value) {
      this.modal.disable.showModal = true
      this.modal.disable.uniqueId = value.id
      this.modal.disable.data = value.nama
    },
    confirmEnable(value) {
      this.modal.enable.showModal = true
      this.modal.enable.uniqueId = value.id
      this.modal.enable.data = value.nama
    },
    resetFilter() {
      this.spinner = true
      this.clearFilter()

      this.$http
        .get('/users/filter', {
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
    clearFilter() {
      this.search.nama = null
    },
    filter() {
      this.listFilter = !this.listFilter
      this.clearFilter()
    },
    filterData() {
      this.spinner = true

      this.$http
        .get('/users/filter', {
          params: {
            page: 1,
            filter: 'nama',
            q: this.search.nama,
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
    enable() {
      this.$http({
        method: 'patch',
        url: `/users/enable/${this.modal.enable.uniqueId}`,
      })
        .then((response) => {
          this.modal.enable.showModal = false
          this.spinner = false
          this.filterData()
          this.$toastr.s(response.data.message, 'Pemberitahuan')
        })
        .catch((error) => {
          this.modal.enable.showModal = false
          if (error.response.status === 500) {
            this.$toastr.e('Ada Kesalahan dari Server', 'Pemberitahuan')
          } else {
            this.$toastr.e(error.response.data.message, 'Pemberitahuan')
          }
        })
    },
    disable() {
      this.$http({
        method: 'patch',
        url: `/users/disable/${this.modal.disable.uniqueId}`,
      })
        .then((response) => {
          this.modal.disable.showModal = false
          this.spinner = false
          this.filterData()
          this.$toastr.s(response.data.message, 'Pemberitahuan')
        })
        .catch((error) => {
          this.modal.disable.showModal = false
          if (error.response.status === 500) {
            this.$toastr.e('Ada Kesalahan dari Server', 'Pemberitahuan')
          } else {
            this.$toastr.e(error.response.data.message, 'Pemberitahuan')
          }
        })
    },
    validateUsername() {
      const regex = new RegExp(/^\S*$/)
      const value = this.forms.username
        .toString()
        .replace(/ /g, '')
        .toLowerCase()
      if (regex.test(this.forms.username)) {
        this.errorValidations.username = []
      } else {
        this.errorValidations.username = ['Tidak Boleh ada Spasi']
        this.forms.username = value
      }
    },
    getData() {
      this.spinner = true
      this.$http
        .get('/users/filter', {
          params: {
            page: this.pagination.current_page,
            filter: 'nama',
            q: this.search.nama,
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
    // getRole() {
    //   this.spinner = true
    //   this.$http
    //     .get('/roles')
    //     .then((response) => {
    //       this.spinner = false
    //       this.roles = response.data.data
    //     })
    //     .catch((error) => {
    //       if (error.response.status === 500) {
    //         this.$toastr.e('Ada Kesalahan dari Server', 'Pemberitahuan')
    //       } else {
    //         this.$toastr.e(error.response.data.message, 'Pemberitahuan')
    //       }
    //     })
    // },
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
      this.forms.name = null
      this.forms.username = null
      this.forms.status = '1'
      // this.forms.password = null
      // this.forms.password_confirmation = null
      // this.forms.roles = []
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
        .delete(`users/${this.modal.delete.uniqueId}`)
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
      const url = '/users'
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
          for (let index = 0; index < value[1].length; index += 1) {
            formData.append(`${value[0]}[${index}]`, value[1][index])
          }
        } else {
          formData.append(value[0], value[1] === null ? [] : value[1])
        }
      })
      this.errorValidations.name = []
      this.errorValidations.username = []
      // this.errorValidations.password = []

      this.$http({
        method: 'post',
        url: urlAction,
        data: formData,
      })
        .then((response) => {
          this.$nextTick(() => {
            this.$refs.form_admin.reset()
          })
          this.filterData()
          this.closeModalPostPut()
          this.$toastr.s(response.data.message, 'Pemberitahuan')
        })
        .catch((error) => {
          if (error.response.status === 422) {
            this.$toastr.e('Silahkan Cek Form Anda Kembali', 'Pemberitahuan')
            this.errorValidations.name =
              typeof error.response.data.errors.name === 'undefined'
                ? []
                : error.response.data.errors.name
            this.errorValidations.username =
              typeof error.response.data.errors.username === 'undefined'
                ? []
                : error.response.data.errors.username
            // this.errorValidations.password =
            //   typeof error.response.data.errors.password === 'undefined'
            //     ? []
            //     : error.response.data.errors.password
          } else if (error.response.status === 500) {
            this.$toastr.e('Ada Kesalahan dari Server', 'Pemberitahuan')
          } else {
            this.$toastr.e(error.response.data.message, 'Pemberitahuan')
          }
        })
    },
    edit(item) {
      this.forms.id = item.id
      this.forms.name = item.nama
      this.forms.username = item.username
      this.forms.status = item.status
      // this.forms.roles = item.roles
      this.put()
    },
  },
}
</script>

<style></style>

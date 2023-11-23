<template>
  <div>
    <CCard>
      <CCardHeader> Filter </CCardHeader>
      <CCardBody>
        <div class="d-flex mb-3">
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
          <CRow class="my-3">
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
        <CIcon name="cil-user" /> Sub-Pejabat
        <template v-if="isNotAdmin">
          <div class="card-header-actions">
            <CButton
              color="success"
              shape="pill"
              size="sm"
              variant="outline"
              v-c-tooltip="{
                content: 'Tambah Pengguna',
                placement: 'bottom',
              }"
              @click="post"
            >
              <CIcon name="cil-plus" />
            </CButton>
          </div>
        </template>
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
                  <th>Nama Lengkap</th>
                  <th>Status</th>
                  <th colspan="2">Aksi</th>
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
                    <td>{{ item.nama_status }}</td>
                    <td>
                      <template v-if="isAdmin">
                        <template v-if="item.status">
                          <CButton
                            class="mr-2 mt-1"
                            color="dark"
                            size="sm"
                            v-c-tooltip="{
                              content: 'Non-aktifkan User',
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
                            class="mr-2 mt-1"
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
                      </template>

                      <CButton
                        color="danger"
                        size="sm"
                        class="mr-2"
                        v-c-tooltip="{
                          content: 'Hapus Pengguna',
                          placement: 'bottom',
                        }"
                        @click="destroy(item)"
                      >
                        <CIcon name="cil-trash" />
                      </CButton>
                      <CButton
                        class="mr-2"
                        color="success"
                        size="sm"
                        v-c-tooltip="{
                          content: 'Edit User',
                          placement: 'bottom',
                        }"
                        @click="editUser(item.id)"
                      >
                        <CIcon name="cil-pencil" />
                      </CButton>
                      <CButton
                        color="primary"
                        size="sm"
                        v-c-tooltip="{
                          content: 'Lihat Detail User',
                          placement: 'bottom',
                        }"
                        :to="{
                          path: `/admin/account/${item.id}/official`,
                        }"
                      >
                        <CIcon name="cil-description" />
                      </CButton>
                    </td>
                  </tr>
                </template>
                <template v-else>
                  <tr>
                    <td colspan="4" class="text-center"> Data Kosong </td>
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
    <ValidationObserver v-slot="{ invalid }" ref="form_parent">
      <CModal
        :title="modal.post.title"
        :color="modal.post.color"
        :show.sync="modal.post.showModal"
        size="lg"
      >
        <template v-slot:body-wrapper>
          <div class="modal-body">
            <CRow>
              <CCol sm="12">
                <h5>Data Akun</h5>
                <div class="form-group">
                  <label for="username">Email</label>
                  <ValidationProvider
                    name="E-mail"
                    :rules="{
                      required: true,
                      email: true,
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
                      @blur="errorValidations.username = []"
                    />
                    <div v-if="errors.length > 0" class="invalid-feedback">
                      {{ errors[0] }}
                    </div>
                  </ValidationProvider>
                  <message :messages="errorValidations.username" />
                </div>
              </CCol>
              <!-- <CCol sm="12">
                <div class="form-group">
                  <label for="password">Password</label>
                  <ValidationProvider
                    name="Password"
                    rules="required|confirmed:Konfirmasi Password|min:6"
                    v-slot="{ errors }"
                  >
                    <input
                      v-model="forms.password"
                      type="password"
                      name="password"
                      placeholder="Masukan Password"
                      class="form-control"
                      :class="{
                        'is-invalid':
                          errors.length > 0 ||
                          errorValidations.password.length > 0,
                      }"
                      @blur="errorValidations.password = []"
                    />
                    <div v-if="errors.length > 0" class="invalid-feedback">
                      {{ errors[0] }}
                    </div>
                  </ValidationProvider>
                  <message :messages="errorValidations.password" />
                </div>
              </CCol>
              <CCol sm="12">
                <div class="form-group">
                  <label for="password">Konfirmasi Password</label>
                  <ValidationProvider
                    rules="required"
                    vid="Konfirmasi Password"
                  >
                    <input
                      v-model="forms.password_confirmation"
                      type="password"
                      placeholder="Masukan Konfirmasi Password"
                      class="form-control"
                    />
                  </ValidationProvider>
                  <message :messages="errorValidations.password_confirmation" />
                </div>
              </CCol> -->
              <CCol sm="12">
                <hr />
                <h5>Data Diri</h5>
                <div class="form-group">
                  <label for="nama">Nama Lengkap</label>
                  <ValidationProvider
                    name="Nama Lengkap"
                    rules="required|alpha_spaces"
                    v-slot="{ errors }"
                  >
                    <input
                      v-model="forms.nama"
                      type="text"
                      name="nama"
                      placeholder="Masukan Nama Lengkap"
                      class="form-control"
                      :class="{
                        'is-invalid':
                          errors.length > 0 || errorValidations.nama.length > 0,
                      }"
                      @blur="errorValidations.nama = []"
                    />
                    <div v-if="errors.length > 0" class="invalid-feedback">
                      {{ errors[0] }}
                    </div>
                  </ValidationProvider>
                  <message :messages="errorValidations.nama" />
                </div>
              </CCol>
              <CCol sm="12">
                <div class="form-group">
                  <label for="nip">NIP</label>
                  <ValidationProvider
                    name="NIP"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <input
                      v-model="forms.nip"
                      type="text"
                      maxlength="18"
                      class="form-control"
                      placeholder="Masukan NIP"
                      :class="{
                        'is-invalid':
                          errors.length > 0 || errorValidations.nip.length > 0,
                      }"
                      @blur="errorValidations.nip = []"
                    />
                    <div v-if="errors.length > 0" class="invalid-feedback">
                      {{ errors[0] }}
                    </div>
                  </ValidationProvider>
                  <message :messages="errorValidations.nip" />
                </div>
              </CCol>
              <CCol sm="12">
                <div class="form-group">
                  <label for="jabatan">Jabatan</label>
                  <ValidationProvider
                    name="Jabatan"
                    rules="required|alpha_spaces"
                    v-slot="{ errors }"
                  >
                    <input
                      v-model="forms.jabatan"
                      type="text"
                      class="form-control"
                      placeholder="Masukan Jabatan"
                      :class="{
                        'is-invalid':
                          errors.length > 0 ||
                          errorValidations.jabatan.length > 0,
                      }"
                      @blur="errorValidations.jabatan = []"
                    />
                    <div v-if="errors.length > 0" class="invalid-feedback">
                      {{ errors[0] }}
                    </div>
                  </ValidationProvider>
                  <message :messages="errorValidations.jabatan" />
                </div>
              </CCol>
              <CCol sm="12">
                <div class="form-group">
                  <label for="no_telepon">Nomor Telepon</label>
                  <ValidationProvider
                    name="Nomor Telepon"
                    rules="required|numeric"
                    v-slot="{ errors }"
                  >
                    <input
                      v-model="forms.no_telepon"
                      type="text"
                      class="form-control"
                      placeholder="Masukan Nomor Telepon"
                      :class="{
                        'is-invalid':
                          errors.length > 0 ||
                          errorValidations.no_telepon.length > 0,
                      }"
                      @blur="errorValidations.no_telepon = []"
                    />
                    <div v-if="errors.length > 0" class="invalid-feedback">
                      {{ errors[0] }}
                    </div>
                  </ValidationProvider>
                  <message :messages="errorValidations.no_telepon" />
                  <p class="text-muted">
                    Gunakan kode area, contoh: 02133334444
                  </p>
                </div>
              </CCol>
              <CCol sm="12">
                <div class="form-group">
                  <label for="no_hp">No Handphone</label>
                  <ValidationProvider
                    name="No Handphone"
                    rules="required|numeric"
                    v-slot="{ errors }"
                  >
                    <input
                      v-model="forms.no_hp"
                      type="text"
                      class="form-control"
                      placeholder="Masukan No Handphone"
                      :class="{
                        'is-invalid':
                          errors.length > 0 ||
                          errorValidations.no_hp.length > 0,
                      }"
                      @blur="errorValidations.no_hp = []"
                    />
                    <div v-if="errors.length > 0" class="invalid-feedback">
                      {{ errors[0] }}
                    </div>
                  </ValidationProvider>
                  <message :messages="errorValidations.no_hp" />
                </div>
              </CCol>
              <CCol sm="12" v-if="isNotAdmin">
                <hr />
                <h5>Satuan Kerja</h5>
                <div class="form-group">
                  <ul class="w-100 p-0">
                    <tree-item-checkbox :item="treeData"></tree-item-checkbox>
                  </ul>
                </div>
              </CCol>
              <CCol sm="12">
                <div class="form-group">
                  <label for="no_hp">File Upload</label>
                  <ValidationProvider
                    name="File"
                    rules="required|mimes:application/pdf"
                    v-slot="{ errors, validate }"
                  >
                    <div class="custom-file">
                      <input
                        type="file"
                        class="custom-file-input"
                        id="customFile"
                        accept="application/pdf"
                        @change="
                          onFilePickedDocument($event) || validate($event)
                        "
                        @blur="errorValidations.dokumen = []"
                      />
                      <label class="custom-file-label" for="customFile">{{
                        filename
                      }}</label>
                      <div
                        v-if="errors.length > 0"
                        :class="{
                          'has-error-file': errors.length > 0,
                        }"
                      >
                        {{ errors[0] }}
                      </div>
                    </div>
                  </ValidationProvider>
                  <message :messages="errorValidations.dokumen" />
                </div>
              </CCol>
            </CRow>
          </div>
        </template>
        <template v-slot:footer>
          <CButton
            color="secondary"
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
            :disabled="invalid"
            @click="submitPost"
          >
            {{ modal.post.labelButton }}
          </CButton>
        </template>
      </CModal>
    </ValidationObserver>
  </div>
</template>

<script>
import TreeItemCheckbox from '../partials/TreeItemCheckbox.vue'
export default {
  components: { TreeItemCheckbox },
  name: 'AccountParent',
  data() {
    return {
      data: [],
      forms: {
        username: null,
        // password: null,
        // password_confirmation: null,
        nama: null,
        nip: null,
        jabatan: null,
        no_telepon: null,
        no_hp: null,
        dokumen: null,
        instansi_induk: this.$store.state.auth.data.instansi_induk,
        status_register: 1,
      },
      spinner: true,
      listFilter: false,
      search: {
        nama: null,
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
        post: {
          showModal: false,
          title: null,
          color: null,
          labelButton: null,
          method: null,
        },
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
      },
      pagination: {
        current_page: 1,
        last_page: 10,
        per_page: null,
      },
      errorValidations: {
        username: [],
        // password: [],
        // password_confirmation: [],
        nama: [],
        nip: [],
        jabatan: [],
        no_telepon: [],
        no_hp: [],
        dokumen: [],
        satuan_kerja: [],
      },
      treeData: {
        id: null,
        name: 'Satuan Kerja',
        children: [],
      },
      filename: 'Choose File',
    }
  },
  computed: {
    setIconFilter() {
      if (this.listFilter) {
        return 'cil-filter-x'
      }

      return 'cil-filter'
    },
    isNotAdmin() {
      if (this.$store.state.auth.data.roles.includes('Admin')) {
        return false
      }

      return true
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
    this.fetchTreeViewWorkUnit()
  },
  methods: {
    editUser(id) {
      this.$router.push(`/admin/account/${id}/edit`)
    },
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
    //  Fetch Tree View
    fetchTreeViewWorkUnit() {
      this.$http
        .get('parsatuankerja/list/tree-view')
        .then((response) => {
          this.treeData.children = response.data
        })
        .catch((error) => {
          if (error.response.status === 500) {
            this.$toastr.e('Ada Kesalahan dari Server', 'Pemberitahuan')
          } else {
            this.$toastr.e(error.response.data.message, 'Pemberitahuan')
          }
        })
    },
    clearModalPostPut() {
      this.modal.post.title = null
      this.modal.post.color = null
      this.modal.post.data = null
      this.modal.post.uniqueId = null
      this.modal.post.message = null
      this.modal.post.labelButton = null
    },
    closeModalPostPut() {
      this.modal.post.showModal = false
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
      this.search.nama = null
    },
    filter() {
      this.listFilter = !this.listFilter
      this.clearFilter()
    },
    clearForm() {
      this.forms.username = null
      // this.forms.password = null
      // this.forms.password_confirmation = null
      this.forms.nama = null
      this.forms.nip = null
      this.forms.jabatan = null
      this.forms.no_telepon = null
      this.forms.no_hp = null
      this.forms.dokumen = null

      this.$store.commit('resetCheckbox')
      this.filename = 'Choose File'
    },
    post() {
      this.clearForm()
      this.modal.post.showModal = true
      this.modal.post.title = 'Tambah Data'
      this.modal.post.color = 'success'
      this.modal.post.labelButton = 'Simpan'
      this.modal.post.method = 'post'
    },
    resetFilter() {
      this.spinner = true
      this.clearFilter()

      this.$http
        .get('/users/parent/account', {
          params: {
            page: 1,
            parent_id: this.$route.params.parent_id,
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
        .get('/users/parent/account', {
          params: {
            page: 1,
            filter: 'nama',
            q: this.search.nama,
            parent_id: this.$route.params.parent_id,
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
        .get('/users/parent/account', {
          params: {
            page: this.pagination.current_page,
            filter: 'nama',
            q: this.search.nama,
            parent_id: this.$route.params.parent_id,
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
    submitPost() {
      const url = '/users/parent/account'
      const formData = new FormData()
      let urlAction = null
      if (this.modal.post.method === 'patch') {
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
      this.$store.state.treeView.workUnitCheckbox.forEach((value, index) => {
        formData.append(`satuan_kerja[${index}]`, value)
      })

      this.errorValidations.username = []
      // this.errorValidations.password = []
      // this.errorValidations.password_confirmation = []
      this.errorValidations.nama = []
      this.errorValidations.nip = []
      this.errorValidations.jabatan = []
      this.errorValidations.no_telepon = []
      this.errorValidations.no_hp = []
      this.errorValidations.satuan_kerja = []

      this.$http({
        method: 'post',
        url: urlAction,
        data: formData,
      })
        .then((response) => {
          this.filterData()
          this.closeModalPostPut()
          this.$toastr.s(response.data.message, 'Pemberitahuan')
          this.$nextTick(() => {
            this.$refs.form_parent.reset()
          })
        })
        .catch((error) => {
          if (error.response.status === 422) {
            this.$toastr.e('Silahkan Cek Form Anda Kembali', 'Pemberitahuan')
            this.errorValidations.username =
              typeof error.response.data.errors.username === 'undefined'
                ? []
                : error.response.data.errors.username
            // this.errorValidations.password =
            //   typeof error.response.data.errors.password === 'undefined'
            //     ? []
            //     : error.response.data.errors.password
            // this.errorValidations.password_confirmation =
            //   typeof error.response.data.errors.password_confirmation ===
            //   'undefined'
            //     ? []
            //     : error.response.data.errors.password_confirmation
            this.errorValidations.nama =
              typeof error.response.data.errors.nama === 'undefined'
                ? []
                : error.response.data.errors.nama
            this.errorValidations.nip =
              typeof error.response.data.errors.nip === 'undefined'
                ? []
                : error.response.data.errors.nip
            this.errorValidations.jabatan =
              typeof error.response.data.errors.jabatan === 'undefined'
                ? []
                : error.response.data.errors.jabatan
            this.errorValidations.no_telepon =
              typeof error.response.data.errors.no_telepon === 'undefined'
                ? []
                : error.response.data.errors.no_telepon
            this.errorValidations.no_hp =
              typeof error.response.data.errors.no_hp === 'undefined'
                ? []
                : error.response.data.errors.no_hp
            this.errorValidations.satuan_kerja =
              typeof error.response.data.errors.satuan_kerja === 'undefined'
                ? []
                : error.response.data.errors.satuan_kerja
          } else if (error.response.status === 500) {
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
          this.modal.disable.showModal = false
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
          if (error.response.status === 500) {
            this.modal.disable.showModal = false
            this.$toastr.e('Ada Kesalahan dari Server', 'Pemberitahuan')
          } else {
            this.$toastr.e(error.response.data.message, 'Pemberitahuan')
          }
        })
    },
    onFilePickedDocument() {
      if (event.target.files[0].type === 'application/pdf') {
        this.forms.dokumen = event.target.files[0]
        this.filename = event.target.files[0].name
      } else {
        this.forms.dokumen = null
        this.filename = 'Choose File'
      }
    },
  },
}
</script>

<style></style>

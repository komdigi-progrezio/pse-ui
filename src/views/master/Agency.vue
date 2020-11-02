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
              content: 'Bershikan',
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
              <label for="name">Nama Instansi</label>
              <input
                v-model="search.name"
                type="text"
                placeholder="Masukan Nama Instansi"
                class="form-control"
              />
            </CCol>
          </CRow>
        </template>
      </CCardBody>
    </CCard>
    <a @click.prevent="modalNotApproved" href="">
      <div
        class="alert alert-warning"
        role="alert"
        v-if="not_approved.data.length > 0"
      >
        Ada <strong>{{ not_approved.total_data }}</strong> Permintaan Penambahan
        Instansi.
      </div>
    </a>
    <CRow>
      <CCol lg="12">
        <CCard>
          <CCardHeader>
            <CIcon name="cil-building" /> Instansi
            <div class="card-header-actions">
              <CButton
                color="success"
                shape="pill"
                class="m-1"
                size="sm"
                variant="outline"
                v-c-tooltip="{
                  content: 'Tambah Instansi',
                  placement: 'bottom',
                }"
                @click="post"
              >
                <CIcon name="cil-plus" />
              </CButton>
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
                      <th>Kategori</th>
                      <th>Kelompok</th>
                      <th>Nama Instansi</th>
                      <th>Alamat</th>
                      <th>Provinsi</th>
                      <th>Kabupaten / Kota</th>
                      <th>Kode Pos</th>
                      <th>Website</th>
                      <th colspan="3">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    <template v-if="data.length > 0">
                      <tr v-for="(item, index) in data" :key="index">
                        <th scope="row">
                          {{ index + 1 }}
                        </th>
                        <td>{{ item.kategori }}</td>
                        <td>{{ item.kelompok }}</td>
                        <td>{{ item.name }}</td>
                        <td>{{ item.alamat }}</td>
                        <td>
                          {{ item.nama_propinsi }}
                        </td>
                        <td>{{ item.nama_kota }}</td>
                        <td>{{ item.kode_pos }}</td>
                        <td>{{ item.website }}</td>
                        <td>
                          <CButton
                            color="danger"
                            size="sm"
                            class="mr-2"
                            v-c-tooltip="{
                              content: 'Hapus Instansi',
                              placement: 'bottom',
                            }"
                            @click="destroy(item)"
                          >
                            <CIcon name="cil-trash" />
                          </CButton>
                          <CButton
                            color="success"
                            size="sm"
                            class="mr-2"
                            v-c-tooltip="{
                              content: 'Edit Instansi',
                              placement: 'bottom',
                            }"
                            @click="edit(item)"
                          >
                            <CIcon name="cil-pencil" />
                          </CButton>
                        </td>
                      </tr>
                    </template>
                    <template v-else>
                      <tr>
                        <td colspan="10" class="text-center"> Data Kosong </td>
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
      </CCol>
    </CRow>
    <CModal
      :title="modal.not_approved.title"
      :color="modal.not_approved.color"
      :size="'xl'"
      :show.sync="modal.not_approved.showModal"
    >
      <template v-slot:body-wrapper>
        <div class="modal-body">
          <div
            v-if="spinner_not_approved"
            class="d-flex justify-content-center"
          >
            <div class="spinner-border text-primary" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
          <div class="table-responsive">
            <table
              v-if="!spinner_not_approved"
              class="table table-hover table-striped"
            >
              <thead>
                <tr>
                  <th>No</th>
                  <th>Kategori</th>
                  <th>Kelompok</th>
                  <th>Nama Instansi</th>
                  <th>Alamat</th>
                  <th>Provinsi</th>
                  <th>Kabupaten / Kota</th>
                  <th>Kode Pos</th>
                  <th>Website</th>
                  <th colspan="2">Aksi</th>
                </tr>
              </thead>
              <tbody>
                <template v-if="not_approved.data.length > 0">
                  <tr v-for="(item, index) in not_approved.data" :key="index">
                    <th scope="row">
                      {{ index + 1 }}
                    </th>
                    <td>{{ item.kategori }}</td>
                    <td>{{ item.kelompok }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.alamat }}</td>
                    <td>
                      {{ item.nama_propinsi }}
                    </td>
                    <td>{{ item.nama_kota }}</td>
                    <td>{{ item.kode_pos }}</td>
                    <td>{{ item.website }}</td>
                    <td>
                      <CButton
                        color="danger"
                        size="sm"
                        class="mr-2"
                        v-c-tooltip="{
                          content: 'Hapus Instansi',
                          placement: 'bottom',
                        }"
                        @click="destroy(item)"
                      >
                        <CIcon name="cil-trash" />
                      </CButton>
                      <CButton
                        color="dark"
                        size="sm"
                        v-c-tooltip="{
                          content: 'Setujui Instansi',
                          placement: 'bottom',
                        }"
                        @click="confirmActive(item)"
                      >
                        <CIcon name="cil-check" />
                      </CButton>
                    </td>
                  </tr>
                </template>
                <template v-else>
                  <tr>
                    <td colspan="10" class="text-center"> Data Kosong </td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
          <CPagination
            :activePage.sync="pagination_not_approved.current_page"
            :pages="pagination_not_approved.last_page"
            size="sm"
            align="center"
            @update:activePage="getAgencyNotApproved"
            v-if="data.length > 0"
          />
        </div>
      </template>
      <template v-slot:footer-wrapper>
        <div></div>
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
        <CButton color="dark" size="sm" class="mr-2" @click="closeModalDelete">
          Cancel
        </CButton>
        <CButton color="primary" size="sm" @click="submitDelete">
          {{ modal.delete.labelButton }}
        </CButton>
      </template>
    </CModal>
    <CModal
      :title="modal.active.title"
      :color="modal.active.color"
      :show.sync="modal.active.showModal"
    >
      <template v-slot:body-wrapper>
        <div class="modal-body">
          <p>
            {{ modal.active.message }}
            <strong>{{ modal.active.data }}</strong
            >?
          </p>
        </div>
      </template>
      <template v-slot:footer>
        <CButton color="dark" size="sm" class="mr-2" @click="closeModalActive">
          Cancel
        </CButton>
        <CButton color="primary" size="sm" @click="active">
          {{ modal.active.labelButton }}
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
              <label for="kelompok">Kelompok</label>
              <select
                v-model="forms.kelompok"
                class="form-control"
                :class="{
                  'is-invalid': errorValidations.kelompok.length > 0,
                }"
                @blur="errorValidations.kelompok = []"
              >
                <option value="" selected="selected"> Pilih Kategori </option>
                <option
                  :value="value.id"
                  v-for="(value, index) in dataSelect.kelompok"
                  :key="index"
                >
                  {{ value.param_value }}
                </option>
              </select>
              <message :messages="errorValidations.kelompok" />
            </CCol>
            <CCol sm="12">
              <label for="kategori">Kategori</label>
              <select
                v-model="forms.kategori"
                class="form-control"
                :class="{
                  'is-invalid': errorValidations.kategori.length > 0,
                }"
                @blur="errorValidations.kategori = []"
              >
                <option value="" selected="selected"> Pilih Kategori </option>
                <option
                  :value="value.id"
                  v-for="(value, index) in dataSelect.kategori"
                  :key="index"
                >
                  {{ value.name }}
                </option>
              </select>
              <message :messages="errorValidations.kategori" />
            </CCol>
            <CCol sm="12">
              <label for="name">Nama Instansi</label>
              <input
                v-model="forms.name"
                type="text"
                placeholder="Masukan Nama Instansi"
                class="form-control"
                :class="{
                  'is-invalid': errorValidations.name.length > 0,
                }"
                @blur="errorValidations.name = []"
              />
              <message :messages="errorValidations.name" />
            </CCol>
            <CCol sm="12">
              <label for="alamat">Alamat</label>
              <textarea
                v-model="forms.alamat"
                cols="30"
                rows="10"
                class="form-control"
                :class="{
                  'is-invalid': errorValidations.alamat.length > 0,
                }"
                @blur="errorValidations.alamat = []"
              ></textarea>
              <message :messages="errorValidations.alamat" />
            </CCol>
            <CCol sm="12">
              <label for="provinsi">Provinsi</label>
              <select
                v-model="forms.propinsi"
                class="form-control"
                :class="{
                  'is-invalid': errorValidations.propinsi.length > 0,
                }"
                @change="getDistrict"
                @blur="errorValidations.propinsi = []"
              >
                <option value="" selected="selected"> Pilih Provinsi </option>
                <option
                  :value="value.id"
                  v-for="(value, index) in dataSelect.provinsi"
                  :key="`provivnsi-${index}`"
                >
                  {{ value.nama }}
                </option>
              </select>
              <message :messages="errorValidations.propinsi" />
            </CCol>
            <CCol sm="12">
              <label for="kota">Kota</label>
              <select
                v-model="forms.kota"
                class="form-control"
                :class="{
                  'is-invalid': errorValidations.kota.length > 0,
                }"
                @blur="errorValidations.kota = []"
              >
                <option value="" selected="selected"> Pilih Kota </option>
                <option
                  :value="value.id"
                  v-for="(value, index) in dataSelect.kota"
                  :key="`kota-${index}`"
                >
                  {{ value.nama }}
                </option>
              </select>
              <message :messages="errorValidations.kota" />
            </CCol>
            <CCol sm="12">
              <label for="kode_pos">Kode Pos</label>
              <input
                v-model="forms.kode_pos"
                type="text"
                maxlength="5"
                placeholder="Masukan Kode Pos"
                class="form-control"
                :class="{
                  'is-invalid': errorValidations.kode_pos.length > 0,
                }"
                @input="validateKodePos"
                @blur="errorValidations.kode_pos = []"
              />
              <message :messages="errorValidations.kode_pos" />
            </CCol>
            <CCol sm="12">
              <label for="website">Website</label>
              <input
                v-model="forms.website"
                type="text"
                placeholder="Masukan Domain Website"
                class="form-control"
                :class="{
                  'is-invalid': errorValidations.website.length > 0,
                }"
                @input="validateWebsite"
                @blur="errorValidations.website = []"
              />
              <message :messages="errorValidations.website" />
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
  name: 'Agency',
  data() {
    return {
      spinner: true,
      spinner_not_approved: true,
      listFilter: false,
      modal: {
        not_approved: {
          showModal: false,
          title: null,
          color: null,
        },
        delete: {
          showModal: false,
          title: null,
          color: null,
          message: null,
          labelButton: null,
          uniqueId: null,
        },
        active: {
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
        name: null,
        alamat: null,
        propinsi: '',
        kota: '',
        kode_pos: null,
        approved: null,
        website: null,
        kategori: '',
        kelompok: '',
      },
      dataSelect: {
        provinsi: [],
        kota: [],
        kelompok: [],
        kategori: [
          {
            id: 'Pemerintah Pusat',
            name: 'Pemerintah Pusat',
          },
          {
            id: 'Pemerintah Daerah',
            name: 'Pemerintah Daerah',
          },
        ],
      },
      not_approved: {
        data: [],
        total_data: null,
      },
      search: {
        name: null,
      },
      errorValidations: {
        kelompok: [],
        kategori: [],
        name: [],
        alamat: [],
        propinsi: [],
        kota: [],
        kode_pos: [],
        website: [],
      },
      pagination: {
        current_page: 1,
        last_page: 10,
      },
      pagination_not_approved: {
        current_page: 1,
        last_page: 10,
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
    this.getProvince()
    this.getAgencyNotApproved()
    this.getAgencyGroup()
  },
  methods: {
    validateWebsite() {
      const regex = new RegExp(/[a-z0-9]+\.go.id$/g)
      const value = this.forms.website
        .toString()
        .replace(/[^a-zA-Z0-9.]/, '')
        .toLowerCase()
      if (regex.test(this.forms.website)) {
        this.errorValidations.website = []
      } else {
        this.errorValidations.website = ['Format Webiste Tidak Sesuai']
        this.forms.website = value
      }
    },
    modalNotApproved() {
      this.modal.not_approved.showModal = true
      this.modal.not_approved.title = 'Daftar Permintaan Penambahan Instansi'
      this.modal.not_approved.color = 'primary'
    },
    active() {
      this.$http
        .patch(`/parinstansi/approved/${this.modal.active.uniqueId}`)
        .then((response) => {
          this.$toastr.s(response.data.message, 'Pemberitahuan')
          this.getAgencyNotApproved()
          this.getData()
          this.modal.active.showModal = false
          this.modal.not_approved.showModal = true
        })
        .catch((error) => {
          if (error.response.status === 500) {
            this.$toastr.e('Ada Kesalahan dari Server', 'Pemberitahuan')
          }

          this.$toastr.e(error.response.data.message, 'Pemberitahuan')
        })
    },
    getAgencyGroup() {
      this.$http
        .get('/parconfig/agency/group')
        .then((response) => {
          this.dataSelect.kelompok = response.data.data
        })
        .catch((error) => {
          if (error.response.status === 500) {
            this.$toastr.e('Ada Kesalahan dari Server', 'Pemberitahuan')
          }

          this.$toastr.e(error.response.data.message, 'Pemberitahuan')
        })
    },
    validateKodePos() {
      const regex = new RegExp(/^[0-9]*$/)
      const value = this.forms.kode_pos
        .toString()
        .replace(/[^\d]/g, '')
        .toLowerCase()
      if (regex.test(this.forms.kode_pos)) {
        this.errorValidations.kode_pos = []
      } else {
        this.errorValidations.kode_pos = ['Hanya Boleh Angka']
        this.forms.kode_pos = value
      }
    },
    getAgencyNotApproved() {
      this.spinner = true

      this.$http
        .get('/parinstansi/not/approved', {
          params: {
            page: this.pagination_not_approved.current_page,
          },
        })
        .then((response) => {
          this.not_approved.data = response.data.data
          this.not_approved.total_data = response.data.meta.total
          this.pagination_not_approved.current_page =
            response.data.meta.current_page
          this.pagination_not_approved.last_page = response.data.meta.last_page
          this.spinner_not_approved = false
        })
        .catch((error) => {
          if (error.response.status === 500) {
            this.$toastr.e('Ada Kesalahan dari Server', 'Pemberitahuan')
          }

          this.$toastr.e(error.response.data.message, 'Pemberitahuan')
        })
    },
    getProvince() {
      this.$http
        .get('/provinsi')
        .then((response) => {
          this.dataSelect.provinsi = response.data.data
        })
        .catch((error) => {
          if (error.response.status === 500) {
            this.$toastr.e('Ada Kesalahan dari Server', 'Pemberitahuan')
          }

          this.$toastr.e(error.response.data.message, 'Pemberitahuan')
        })
    },
    getDistrict() {
      this.$http
        .get(`/provinsi/${this.forms.propinsi}/kota`)
        .then((response) => {
          this.dataSelect.kota = response.data.data
          this.forms.kota = ''
        })
        .catch((error) => {
          if (error.response.status === 500) {
            this.$toastr.e('Ada Kesalahan dari Server', 'Pemberitahuan')
          }

          this.$toastr.e(error.response.data.message, 'Pemberitahuan')
        })
    },
    resetFilter() {
      this.spinner = true
      this.clearFilter()

      this.$http
        .get('/parinstansi/filter/approved', {
          params: {
            page: 1,
          },
        })
        .then((response) => {
          this.spinner = false
          this.data = response.data.data
          this.pagination.current_page = response.data.meta.current_page
          this.pagination.last_page = response.data.meta.last_page
        })
        .catch((error) => {
          if (error.response.status === 500) {
            this.$toastr.e('Ada Kesalahan dari Server', 'Pemberitahuan')
          }

          this.$toastr.e(error.response.data.message, 'Pemberitahuan')
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
        .get('/parinstansi/filter/approved', {
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
          this.pagination.last_page = response.data.meta.last_page
        })
        .catch((error) => {
          if (error.response.status === 500) {
            this.$toastr.e('Ada Kesalahan dari Server', 'Pemberitahuan')
          }

          this.$toastr.e(error.response.data.message, 'Pemberitahuan')
        })
    },
    getData() {
      this.spinner = true

      this.$http
        .get('/parinstansi/filter/approved', {
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
          this.pagination.last_page = response.data.meta.last_page
        })
        .catch((error) => {
          if (error.response.status === 500) {
            this.$toastr.e('Ada Kesalahan dari Server', 'Pemberitahuan')
          }

          this.$toastr.e(error.response.data.message, 'Pemberitahuan')
        })
    },
    destroy(item) {
      this.modal.delete.showModal = true
      this.modal.delete.title = 'Hapus Data'
      this.modal.delete.color = 'danger'
      this.modal.delete.data = item.name
      this.modal.delete.uniqueId = item.id
      this.modal.delete.message = 'Ingin Menghapus Data'
      this.modal.delete.labelButton = 'Hapus'
    },
    confirmActive(item) {
      this.modal.not_approved.showModal = false
      this.modal.active.showModal = true
      this.modal.active.title = 'Konfirmasi Aktifkan Instansi'
      this.modal.active.color = 'success'
      this.modal.active.data = item.name
      this.modal.active.uniqueId = item.id
      this.modal.active.message = 'Ingin Mengaktifkan Instansi'
      this.modal.active.labelButton = 'Update'
    },
    clearForm() {
      this.forms.id = null
      this.forms.name = null
      this.forms.alamat = null
      this.forms.propinsi = ''
      this.forms.kota = ''
      this.forms.kode_pos = null
      this.forms.approved = null
      this.forms.website = null
      this.forms.kategori = ''
      this.forms.kelompok = ''
      this.dataSelect.kota = []
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
    clearModalActive() {
      this.modal.active.title = null
      this.modal.active.color = null
      this.modal.active.data = null
      this.modal.active.uniqueId = null
      this.modal.active.message = null
      this.modal.active.labelButton = null
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
    closeModalActive() {
      this.modal.active.showModal = false
      this.clearModalActive()
    },
    closeModalPostPut() {
      this.modal.post_put.showModal = false
      this.clearModalPostPut()
      this.clearForm()
    },
    submitDelete() {
      this.$http
        .delete(`/parinstansi/${this.modal.delete.uniqueId}`)
        .then((response) => {
          this.filterData()
          this.closeModalDelete()
          this.getAgencyNotApproved()
          this.$toastr.s(response.data.message, 'Pemberitahuan')
        })
        .catch((error) => {
          this.closeModalDelete()
          if (error.response.status === 500) {
            this.$toastr.e('Ada Kesalahan dari Server', 'Pemberitahuan')
          }

          this.$toastr.e(error.response.data.message, 'Pemberitahuan')
        })
    },
    submitPostPut() {
      const url = '/parinstansi'
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
      this.errorValidations.kelompok = []
      this.errorValidations.kategori = []
      this.errorValidations.name = []
      this.errorValidations.alamat = []
      this.errorValidations.propinsi = []
      this.errorValidations.kota = []
      this.errorValidations.kode_pos = []
      this.errorValidations.website = []

      this.$http({
        method: 'post',
        url: urlAction,
        data: formData,
      })
        .then((response) => {
          this.filterData()
          this.getAgencyNotApproved()
          this.closeModalPostPut()
          this.$toastr.s(response.data.message, 'Pemberitahuan')
        })
        .catch((error) => {
          if (error.response.status === 422) {
            this.errorValidations.kelompok =
              typeof error.response.data.errors.kelompok === 'undefined'
                ? []
                : error.response.data.errors.kelompok
            this.errorValidations.kategori =
              typeof error.response.data.errors.kategori === 'undefined'
                ? []
                : error.response.data.errors.kategori
            this.errorValidations.name =
              typeof error.response.data.errors.name === 'undefined'
                ? []
                : error.response.data.errors.name
            this.errorValidations.alamat =
              typeof error.response.data.errors.alamat === 'undefined'
                ? []
                : error.response.data.errors.alamat
            this.errorValidations.propinsi =
              typeof error.response.data.errors.propinsi === 'undefined'
                ? []
                : error.response.data.errors.propinsi
            this.errorValidations.kota =
              typeof error.response.data.errors.kota === 'undefined'
                ? []
                : error.response.data.errors.kota
            this.errorValidations.kode_pos =
              typeof error.response.data.errors.kode_pos === 'undefined'
                ? []
                : error.response.data.errors.kode_pos
            this.errorValidations.website =
              typeof error.response.data.errors.website === 'undefined'
                ? []
                : error.response.data.errors.website
          }
          if (error.response.status === 500) {
            this.$toastr.e('Ada Kesalahan dari Server', 'Pemberitahuan')
          }

          this.$toastr.e(error.response.data.message, 'Pemberitahuan')
        })
    },
    edit(item) {
      this.forms.id = item.id
      this.forms.name = item.name
      this.forms.alamat = item.alamat
      this.forms.propinsi = item.id_propinsi
      this.forms.kode_pos = item.kode_pos
      this.forms.approved = item.approved
      this.forms.website = item.website
      this.forms.kategori = item.kategori
      this.forms.kelompok = item.id_kelompok

      this.put()
      this.$nextTick(() => {
        this.getDistrict()
        this.forms.kota = item.id_kota
      })
    },
  },
}
</script>

<style></style>

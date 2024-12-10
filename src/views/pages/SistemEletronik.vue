<template>
  <div>
    <CCard>
      <CCardHeader>
        Kelompok data yang harus dilengkapi untuk mencapai 100%
      </CCardHeader>
      <CCardBody>
        <div class="d-flex p-3 p-lg-0">
          <ol>
            <li>Fungsi Utama</li>
            <li>Ruang Lingkup</li>
            <li>Jenis Layanan</li>
            <li>Sistem Pengamanan</li>
            <li>Perangkat Keras</li>
            <li>Perangkat Lunak</li>
            <li>Ketersediaan Tenaga Ahli</li>
            <li>Dasar Hukum</li>
            <li>S O P</li>
          </ol>
        </div>
      </CCardBody>
    </CCard>
    <CCard>
      <CCardHeader> Filter </CCardHeader>
      <CCardBody>
        <div class="d-flex p-3 p-lg-0">
          <CButton
            color="dark"
            variant="outline"
            size="sm"
            class="mr-2"
            :class="{ 'mr-auto': checkFilter }"
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
            v-show="!checkFilter"
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
                <label for="name">Nama Sistem</label>
                <input
                  v-model="search.nama_internal"
                  type="text"
                  name="name"
                  placeholder="Masukan Nama Sistem"
                  class="form-control"
                />
              </div>
            </CCol>
            <CCol sm="12">
              <div class="form-group">
                <label for="name">Pengguna</label>
                <v-select
                  v-model="search.user_id"
                  :reduce="(users) => users.id"
                  :filterable="true"
                  :options="users"
                  label="nama"
                >
                  <template slot="no-options">
                    Ketik Untuk Cari Nama Pengguna
                  </template>
                  <template slot="option" slot-scope="option">
                    <div class="d-center">
                      {{ option.nama }}
                    </div>
                  </template>
                  <template slot="selected-option" slot-scope="option">
                    <div class="selected d-center">
                      {{ option.nama }}
                    </div>
                  </template>
                </v-select>
              </div>
            </CCol>
            <CCol sm="12">
              <div class="form-group">
                <label for="name">Instansi</label>
                <v-select
                  v-model="search.agency"
                  :reduce="(agency) => agency.id"
                  :filterable="true"
                  :options="agency"
                  label="name"
                >
                  <template slot="no-options">
                    Ketik Untuk Cari Nama Instansi
                  </template>
                  <template slot="option" slot-scope="option">
                    <div class="d-center">
                      {{ option.name }}
                    </div>
                  </template>
                  <template slot="selected-option" slot-scope="option">
                    <div class="selected d-center">
                      {{ option.name }}
                    </div>
                  </template>
                </v-select>

                <!-- <select
                  v-model="search.agency"
                  class="form-control"
                  @change="fetchWorkUnit"
                >
                  <option value="">Pilih Instansi</option>
                  <option
                    v-for="(value, index) in agency"
                    :value="value.id"
                    :key="`agency-${index}`"
                  >
                    {{ value.name }}
                  </option>
                </select> -->
              </div>
            </CCol>
            <CCol sm="12">
              <div class="form-group">
                <label for="name">Satuan Kerja</label>
                <select v-model="search.workunit" class="form-control">
                  <option value="">Pilih Satuan Kerja</option>
                  <option
                    v-for="(value, index) in workUnit"
                    :value="value.id"
                    :key="`work-unit-${index}`"
                  >
                    {{ value.name }}
                  </option>
                </select>
              </div>
            </CCol>
            <CCol sm="12">
              <div class="form-group">
                <label for="name">Status</label>
                <select v-model="search.status" class="form-control">
                  <option value="">Pilih Status</option>
                  <option
                    v-for="(value, index) in status"
                    :value="value.id"
                    :key="`status-${index}`"
                  >
                    {{ value.name }}
                  </option>
                </select>
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
            <CCol sm="12" md="6" lg="6">
              <div class="form-group">
                <label for="bulan">Bulan</label>
                <select v-model="search.bulan" class="form-control">
                  <option value="all">Pilih Bulan</option>
                  <option
                    v-for="(value, index) in month"
                    :value="value.id"
                    :key="index"
                    >{{ value.name }}</option
                  >
                </select>
              </div>
            </CCol>
            <CCol sm="12" md="6" lg="6">
              <div class="form-group">
                <label for="tahun">Tahun</label>
                <select v-model="search.tahun" class="form-control">
                  <option value="current">Pilih Tahun</option>
                  <option
                    v-for="(value, index) in year"
                    :value="value.id"
                    :key="index"
                    >{{ value.name }}</option
                  >
                </select>
              </div>
            </CCol>
          </CRow>
        </template>
      </CCardBody>
    </CCard>
    <CCard>
      <CCardHeader>
        <CIcon name="cil-cloud" /> Daftar Sistem Elektronik
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
                  <th
                    >Nama Instansi Penyelenggara Negara / Nama Pejabat
                    Pendaftaran</th
                  >
                  <th>Sistem Elektronik / Satuan Kerja / Penanggung Jawab</th>
                  <th>Keterangan</th>
                  <th @click="filterOrderData()" class="pointer"
                    >Tanggal Daftar</th
                  >
                  <th>No Tanda Daftar</th>
                  <th>Progress</th>
                  <th>Bersedia Dipublish</th>
                  <th>Status</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                <template v-if="data.length > 0">
                  <tr v-for="(value, index) in data" :key="index">
                    <td>
                      {{
                        (pagination.current_page - 1) * pagination.per_page +
                        index +
                        1
                      }}
                    </td>
                    <td>
                      {{ value.nama_instansi }} / {{ value.nama_pejabat }}
                    </td>
                    <td>
                      {{ value.nama_internal }} /
                      {{ value.nama_penanggungjawab }} /
                      {{ value.nama_penanggungjawab_satuan_kerja }}
                      <span class="mobile-only w-100"
                        ><hr class="mb-0 mt-4"
                      /></span>
                    </td>
                    <td>
                      {{ value.deskripsi }}
                    </td>
                    <td>
                      {{ value.tgl_daftar }}
                    </td>
                    <td>
                      <span class="mobile-only mr-1">Nomor registrasi: </span>
                      {{ value.no_reg }}
                    </td>
                    <td>
                      <span class="mobile-only mr-1">Progress: </span>
                      {{ value.progress }}%
                    </td>
                    <td>
                      <span class="mobile-only mr-1">Bersedia Dipublish: </span>
                      {{ value.publish === 1 ? 'Ya' : 'Tidak' }}
                    </td>
                    <td>
                      <span class="mobile-only mr-1">Status: </span>
                      {{
                        value.approved === 1 ? 'Terdaftar' : 'Belum Terdaftar'
                      }}
                    </td>
                    <td>
                      <CButton
                        class="mr-1"
                        color="primary"
                        size="sm"
                        v-c-tooltip="{
                          content: 'Detail Sistem Elektronik',
                          placement: 'bottom',
                        }"
                        :to="`/admin/systems/${value.id}`"
                      >
                        <CIcon name="cil-description" />
                        <span class="mobile-only"
                          >Detail Sistem Elektronik</span
                        >
                      </CButton>
                      <CButton
                        class="mr-1"
                        v-if="value.deleted !== 1"
                        color="danger"
                        size="sm"
                        v-c-tooltip="{
                          content: 'Hapus Sistem Elektronik',
                          placement: 'bottom',
                        }"
                        @click="destroy(value)"
                      >
                        <CIcon name="cil-trash" />
                        <span class="mobile-only">Hapus Sistem Elektronik</span>
                      </CButton>
                      <CButton
                        class="mr-1"
                        v-if="value.publish === 0"
                        color="dark"
                        size="sm"
                        v-c-tooltip="{
                          content: 'Publish Sistem Elektronik',
                          placement: 'bottom',
                        }"
                        @click="publish(value)"
                      >
                        <CIcon name="cil-globe-alt" />
                        <span class="mobile-only"
                          >Publish Sistem Elektronik</span
                        >
                      </CButton>
                      <CButton
                        class="mr-1"
                        v-if="value.approved === 0"
                        color="success"
                        size="sm"
                        v-c-tooltip="{
                          content: 'Setujui Sistem Elektronik',
                          placement: 'bottom',
                        }"
                        @click="approve(value)"
                      >
                        <CIcon name="cil-check" />
                        <span class="mobile-only"
                          >Setujui Sistem Elektronik</span
                        >
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
          @click="submit"
          :disabled="isSubmit"
        >
          {{ modal.labelButton }}
          <CSpinner size="sm" color="info" v-if="isSubmit" />
        </CButton>
      </template>
    </CModal>
  </div>
</template>

<script>
import axios from 'axios'
import _ from 'lodash'

export default {
  name: 'SistemEletronik',
  data() {
    return {
      isSubmit: false,
      spinner: false,
      listFilter: false,
      search: {
        nama_internal: null,
        user_id: null,
        agency: '',
        workunit: '',
        status: '',
        bulan: 'all',
        tahun: 'current',
      },
      modal: {
        showModal: false,
        title: null,
        color: null,
        message: null,
        labelButton: null,
        url: null,
        uniqueId: null,
        method: null,
      },
      users: [],
      agency: [],
      workUnit: [],
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
      status: [
        {
          id: 0,
          name: 'Belum Terdaftar',
        },
        {
          id: 1,
          name: 'Terdaftar',
        },
      ],
      month: [
        {
          id: '01',
          name: 'Januari',
        },
        {
          id: '02',
          name: 'Februari',
        },
        {
          id: '03',
          name: 'Maret',
        },
        {
          id: '04',
          name: 'April',
        },
        {
          id: '05',
          name: 'Mei',
        },
        {
          id: '06',
          name: 'Juni',
        },
        {
          id: '07',
          name: 'Juli',
        },
        {
          id: '08',
          name: 'Agustus',
        },
        {
          id: '09',
          name: 'September',
        },
        {
          id: '10',
          name: 'Oktober',
        },
        {
          id: '11',
          name: 'November',
        },
        {
          id: '12',
          name: 'Desember',
        },
      ],
      year: [
        {
          id: '2010',
          name: '2010',
        },
        {
          id: '2011',
          name: '2011',
        },
        {
          id: '2012',
          name: '2012',
        },
        {
          id: '2013',
          name: '2013',
        },
        {
          id: '2014',
          name: '2014',
        },
        {
          id: '2015',
          name: '2015',
        },
        {
          id: '2016',
          name: '2016',
        },
        {
          id: '2017',
          name: '2017',
        },
        {
          id: '2018',
          name: '2018',
        },
        {
          id: '2019',
          name: '2019',
        },
        {
          id: '2020',
          name: '2020',
        },
        {
          id: '2021',
          name: '2021',
        },
        {
          id: '2022',
          name: '2022',
        },
        {
          id: '2023',
          name: '2023',
        },
        {
          id: '2024',
          name: '2024',
        },
        {
          id: '2025',
          name: '2025',
        },
      ],
      data: [],
      pagination: {
        current_page: 1,
        last_page: 10,
        per_page: null,
      },
    }
  },
  computed: {
    checkFilter() {
      if (
        this.search.nama_internal !== null ||
        this.search.user_id !== null ||
        this.search.agency !== '' ||
        this.search.workunit !== '' ||
        this.search.status !== '' ||
        this.search.progres !== '' ||
        this.search.bulan !== 'all' ||
        this.search.tahun !== 'current'
      ) {
        return false
      } else {
        return true
      }
    },
    setIconFilter() {
      if (this.listFilter) {
        return 'cil-filter-x'
      }

      return 'cil-filter'
    },
  },
  created() {
    this.fetchAgency()
    this.fetchUsers()
    this.getData()
  },
  methods: {
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
    clearFilter() {
      this.search.nama_internal = null
      this.search.user_id = null
      this.search.agency = ''
      this.search.workunit = ''
      this.search.status = ''
      this.search.progres = ''
    },
    destroy(value) {
      this.modal.showModal = true
      this.modal.title = 'Hapus Data'
      this.modal.color = 'danger'
      this.modal.data = value.nama_internal
      this.modal.uniqueId = value.id
      this.modal.message = 'Ingin Menghapus Data'
      this.modal.labelButton = 'Hapus'
      this.modal.url = 'systems'
      this.modal.method = 'DELETE'
    },
    publish(value) {
      this.modal.showModal = true
      this.modal.title = 'Publish Data'
      this.modal.color = 'dark'
      this.modal.data = value.nama_internal
      this.modal.uniqueId = value.id
      this.modal.message = 'Ingin Mempublish Data'
      this.modal.labelButton = 'Publish'
      this.modal.url = 'systems/publish'
      this.modal.method = 'PATCH'
    },
    approve(value) {
      console.log(value)
      this.modal.showModal = true
      this.modal.title = 'Setujui Data'
      this.modal.color = 'success'
      this.modal.data = value.nama_internal
      this.modal.uniqueId = value.id
      this.modal.message = 'Ingin Mensetujui Data'
      this.modal.labelButton = 'Setujui'
      this.modal.url = 'systems/approved'
      this.modal.method = 'patch'
    },
    submit() {
      this.isSubmit = true
      this.$http({
        method: this.modal.method,
        url: `/${this.modal.url}/${this.modal.uniqueId}`,
      })
        .then((response) => {
          this.filterData()
          this.closeModal()
          this.$toastr.s(response.data.message, 'Pemberitahuan')
          this.isSubmit = false
        })
        .catch((error) => {
          this.isSubmit = false
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
    resetFilter() {
      this.spinner = true
      this.clearFilter()

      this.$http
        .get('/systems/repository', {
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
    filterData() {
      this.spinner = true

      this.$http
        .get('/systems/repository', {
          params: {
            page: this.pagination.current_page,
            nama_internal: this.search.nama_internal,
            user_id: this.search.user_id,
            agency: this.search.agency,
            workunit: this.search.workunit,
            status: this.search.status,
            progres: this.search.progres,
            bulan: this.search.bulan,
            tahun: this.search.tahun,
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
    filterOrderData() {
      this.spinner = true

      this.$http
        .get('/systems/repository', {
          params: {
            page: this.pagination.current_page,
            orderData: this.orderBy,
          },
        })
        .then((response) => {
          this.spinner = false
          this.orderBy == 'ASC'
            ? (this.orderBy = 'DESC')
            : (this.orderBy = 'ASC')
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
        .get('/systems/repository', {
          params: {
            page: this.pagination.current_page,
            nama_internal: this.search.nama_internal,
            user_id: this.search.user_id,
            agency: this.search.agency,
            workunit: this.search.workunit,
            status: this.search.status,
            progres: this.search.progres,
            bulan: this.search.bulan,
            tahun: this.search.tahun,
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
    onSearch(searchUsers, loading) {
      loading(true)
      this.searchUsers(loading, searchUsers, this)
    },
    searchUsers: _.debounce((loading, searchUsers, vm) => {
      const defaultOptions = {
        baseURL: process.env.VUE_APP_BASE_API_URL,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${window.localStorage.getItem('token')}`,
        },
      }
      const instance = axios.create(defaultOptions)
      instance
        .get('/users/dropdown', {
          params: {
            filter: 'nama',
            q: escape(searchUsers),
          },
        })
        .then((response) => {
          vm.users = response.data.data
          loading(false)
        })
    }, 350),
    onSearchInstansi(searchInstansi, loading) {
      loading(true)
      this.searchInstansi(loading, searchInstansi, this)
    },
    searchInstansi: _.debounce((loading, searchInstansi, vm) => {
      const defaultOptions = {
        baseURL: process.env.VUE_APP_BASE_API_URL,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${window.localStorage.getItem('token')}`,
        },
      }
      const instance = axios.create(defaultOptions)
      instance
        .get('/public/parinstansi/filter', {
          params: {
            filter: 'name',
            q: escape(searchInstansi),
          },
        })
        .then((response) => {
          vm.agency = response.data.data
          loading(false)
        })
    }, 350),
    fetchAgency() {
      this.$http
        .get('parinstansi')
        .then((response) => {
          this.agency = response.data.data
        })
        .catch((error) => {
          if (error.response.status === 500) {
            this.$toastr.e('Ada Kesalahan dari Server', 'Pemberitahuan')
          } else {
            this.$toastr.e(error.response.data.message, 'Pemberitahuan')
          }
        })
    },
    fetchUsers() {
      this.$http
        .get('users')
        .then((response) => {
          this.users = response.data.data
        })
        .catch((error) => {
          if (error.response.status === 500) {
            this.$toastr.e('Ada Kesalahan dari Server', 'Pemberitahuan')
          } else {
            this.$toastr.e(error.response.data.message, 'Pemberitahuan')
          }
        })
    },
    fetchWorkUnit() {
      this.$http
        .get(`/parsatuankerja/${this.search.agency}/parinstansi/dropdown`)
        .then((response) => {
          this.workUnit = response.data.data
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
.pointer {
  cursor: pointer;
}
</style>

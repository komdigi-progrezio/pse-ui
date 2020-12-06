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
          <CRow class="my-3">
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
                  :filterable="false"
                  :options="users"
                  label="nama"
                  @search="onSearch"
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
                <select
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
                </select>
              </div>
            </CCol>
            <CCol sm="12">
              <div class="form-group">
                <label for="name">Satuan Kerja</label>
                <select v-model="search.workUnit" class="form-control">
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
          </CRow>
        </template>
      </CCardBody>
    </CCard>
    <CCard>
      <CCardHeader>
        <CIcon name="cil-cloud" /> Daftar Sistem Elektronik
      </CCardHeader>
      <CCardBody>
        <div class="mt-4">
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
                  <th>No Tanda Daftar</th>
                  <th>Progress</th>
                  <th colspan="3">Aksi</th>
                </tr>
              </thead>
              <tbody>
                <template v-if="data.length > 0">
                  <tr v-for="(value, index) in data" :key="index">
                    <td>
                      {{ index + 1 }}
                    </td>
                    <td
                      >{{ value.nama_instansi }} / {{ value.nama_pejabat }}</td
                    >
                    <td
                      >{{ value.nama_internal }} /
                      {{ value.nama_penanggungjawab }} /
                      {{ value.nama_penanggungjawab_satuan_kerja }}</td
                    >
                    <td>{{ value.deskripsi }}</td>
                    <td>{{ value.no_reg }}</td>
                    <td>{{ value.progress }}</td>
                    <td>
                      <CButton
                        color="primary"
                        size="sm"
                        v-c-tooltip="{
                          content: 'Detail Sistem Elektronik',
                          placement: 'bottom',
                        }"
                        :to="`/admin/systems/${value.id}`"
                      >
                        <CIcon name="cil-description" />
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
  </div>
</template>

<script>
import axios from 'axios'
import _ from 'lodash'

export default {
  name: 'SistemEletronik',
  data() {
    return {
      spinner: false,
      listFilter: false,
      search: {
        nama_internal: null,
        user_id: null,
        agency: '',
        workUnit: '',
        status: '',
      },
      users: [],
      agency: [],
      workUnit: [],
      status: [
        {
          id: 0,
          name: 'Tidak Dihapus',
        },
        {
          id: 1,
          name: 'Dihapus',
        },
      ],
      data: [],
      pagination: {
        current_page: 1,
        last_page: 10,
      },
    }
  },
  computed: {
    checkFilter() {
      if (
        this.search.nama_internal !== null ||
        this.search.user_id !== null ||
        this.search.agency !== '' ||
        this.search.workUnit !== '' ||
        this.search.status !== ''
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
    this.getData()
  },
  methods: {
    clearFilter() {
      this.search.nama_internal = null
      this.search.user_id = null
      this.search.agency = ''
      this.search.workUnit = ''
      this.search.status = ''
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
            page: 1,
            nama_internal: this.search.nama_internal,
            user_id: this.search.user_id,
            agency: this.search.agency,
            workUnit: this.search.workUnit,
            status: this.search.status,
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
            workUnit: this.search.workUnit,
            status: this.search.status,
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
          Authorization: `Bearer ${localStorage.getItem('token')}`,
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
</style>

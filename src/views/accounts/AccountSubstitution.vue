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
                <label for="nama">Nama Lengkap</label>
                <input
                  v-model="search.nama"
                  type="text"
                  placeholder="Masukan Nama Lengkap"
                  class="form-control"
                />
              </div>
            </CCol>
          </CRow>
        </template>
      </CCardBody>
    </CCard>
    <CRow>
      <CCol lg="12">
        <CCard>
          <CCardHeader>
            <CIcon name="cil-lock-locked" /> Daftar Pergantian User
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
                      <th>NIP</th>
                      <th>Jabatan</th>
                      <th>Instansi</th>
                      <th>Status</th>
                      <th>Tanggal Daftar</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    <template v-if="data.length > 0">
                      <tr v-for="(item, index) in data" :key="index">
                        <th scope="row">
                          {{
                            (pagination.current_page - 1) *
                              pagination.per_page +
                            index +
                            1
                          }}
                        </th>
                        <td>{{ item.nama }}</td>
                        <td
                          ><span class="mobile-only mr-1">NIP: </span>
                          {{ item.nip }}</td
                        >
                        <td
                          ><span class="mobile-only mr-1">Jabatan: </span>
                          {{ item.jabatan }}</td
                        >
                        <td
                          ><span class="mobile-only mr-1">Instansi: </span>
                          {{ item.nama_instansi }}</td
                        >
                        <td
                          ><span class="mobile-only mr-1">Status: </span>
                          {{ item.nama_status }}</td
                        >
                        <td
                          ><span class="mobile-only mr-1"
                            >Tanggal Daftar:
                          </span>
                          {{ item.created_at }}</td
                        >
                        <td>
                          <CButton
                            color="primary"
                            size="sm"
                            class="mr-2 mt-1"
                            v-c-tooltip="{
                              content:
                                'Lihat Detail Penggantian Akun Pengelola',
                              placement: 'bottom',
                            }"
                            :to="{
                              path: `/admin/account/${item.id}/substitution`,
                            }"
                          >
                            <CIcon name="cil-description" />
                            <span class="mobile-only ml-1">Lihat Detail </span>
                          </CButton></td
                        >
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
      </CCol>
    </CRow>
  </div>
</template>

<script>
export default {
  name: 'AccountSubstitution',
  data() {
    return {
      spinner: false,
      listFilter: false,
      data: [],
      permissions: [],
      search: {
        nama: null,
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
        .get('/users/change', {
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
        .get('/users/change', {
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
    getData() {
      this.spinner = true

      this.$http
        .get('/users/change', {
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
  },
}
</script>

<style></style>

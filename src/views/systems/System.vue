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
          <CRow class="my-3">
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
          </CRow>
        </template>
      </CCardBody>
    </CCard>
    <CRow>
      <CCol lg="12">
        <CCard>
          <CCardHeader>
            <CIcon name="cil-cloud" /> Sistem Elektronik
            <div class="card-header-actions">
              <CButton
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
                      <th>Penyelenggara</th>
                      <th>Nama Sistem</th>
                      <th>Progress</th>
                      <th>Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    <template v-if="data.length > 0">
                      <tr v-for="(item, index) in data" :key="index">
                        <th scope="row">
                          {{ index + 1 }}
                        </th>
                        <td>{{ item.organizer_profile }}</td>
                        <td>{{ item.nama_eksternal }}</td>
                        <td>{{ item.progress }}</td>
                        <td>
                          <CButton
                            color="primary"
                            size="sm"
                            v-c-tooltip="{
                              content: 'Detail Sistem Elektronik',
                              placement: 'bottom',
                            }"
                            :to="`/admin/systems/${item.id}`"
                          >
                            <CIcon name="cil-description" />
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
      </CCol>
    </CRow>
  </div>
</template>

<script>
export default {
  name: 'System',
  data() {
    return {
      spinner: false,
      listFilter: false,
      data: [],
      search: {
        nama_eksternal: null,
      },
      pagination: {
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
  },
  methods: {
    filter() {
      this.listFilter = !this.listFilter
      this.clearFilter()
    },
    clearFilter() {
      this.search.nama_eksternal = null
    },
    getData() {
      this.spinner = true
      this.$http
        .get('/systems/filter', {
          params: {
            page: this.pagination.current_page,
            filter: 'nama_eksternal',
            q: this.search.nama_eksternal,
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
        .get('/systems/filter', {
          params: {
            page: 1,
            filter: 'nama_eksternal',
            q: this.search.nama_eksternal,
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
    resetFilter() {
      this.spinner = true
      this.clearFilter()

      this.$http
        .get('/systems/filter', {
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
  },
}
</script>

<style></style>

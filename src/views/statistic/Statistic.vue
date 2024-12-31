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
              :class="{ 'mr-auto': search.propinsi === null }"
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
              v-show="search.propinsi !== null"
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
                  <label for="name">Provinsi</label>
                  <select v-model="search.propinsi" class="form-control">
                    <option value="">Pilih Provinsi</option>
                    <option
                      v-for="(value, index) in province"
                      :value="value.id"
                      :key="`progress-${index}`"
                    >
                      {{ value.nama }}
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
          <CIcon name="cil-description" /> Statistik
          <div class="card-header-actions">
            <CButton
              color="info"
              shape="pill"
              size="sm"
              :variant="isExcelDownload"
              v-c-tooltip="{
                content: 'Download Laporan Statistik',
                placement: 'bottom',
              }"
              :disabled="isDownload"
              @click="downloadExcel"
            >
              <CIcon name="cil-data-transfer-down" v-if="!isDownload" />
              <CSpinner size="sm" color="primary" v-if="isDownload" />
            </CButton>
          </div>
        </CCardHeader>
  
        <CCardBody>
          <div class="mt-lg-4">
            <div v-if="loading.statistics" class="d-flex justify-content-center">
              <div class="spinner-border text-primary" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </div>
  
            <div class="table-responsive">
              <table v-if="!loading.statistics" class="table table-hover">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Nama Instansi</th>
                    <th>Jumlah</th>
                  </tr>
                </thead>
  
                <tbody>
                  <template v-if="data.statistics">
                    <template v-for="(item, index) in data.statistics">
                      <tree-view-table
                        :key="item.id"
                        :number="
                          index + 1
                        "
                        :data="item"
                        :is-parent="true"
                      />
                    </template>
                  </template>
  
                  <template v-else>
                    <tr>
                      <td colspan="3" class="text-center"> Data Kosong </td>
                    </tr>
                  </template>
                </tbody>
              </table>
            </div>
          </div>
        </CCardBody>
      </CCard>
    </div>
  </template>
  
  <script>
  import TreeViewTable from '../partials/TreeViewTable'
  
  export default {
    name: 'Statistic',
    components: {
      TreeViewTable,
    },
    data() {
      return {
        listFilter: false,
        isDownload: false,
        province: [],
        data: {
          statistics: [],
        },
        search: {
          propinsi: null,
        },
        query: {
          page: 1,
        },
        pagination: {
          last_page: null,
        },
        loading: {
          statistics: true,
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
      isExcelDownload() {
        if (this.isDownload) {
          return null
        }
  
        return 'outline'
      },
    },
    mounted() {
      this.getProvince()
      this.fetchStatistics()
    },
    methods: {
      fetchStatistics() {
        this.loading.statistics = true
  
        this.$http
          .get('parinstansi/list/new-tree-view', {
            params: {
              ...this.query,
            },
          })
          .then((response) => {
            this.data.statistics = response.data.data
            this.loading.statistics = false
            this.pagination = response.data.meta
          })
      },
      getProvince() {
        this.$http
          .get(`public/provinsi`)
          .then((response) => {
            this.province = response.data.data
          })
          .catch((error) => {
            if (error.response.status === 500) {
              this.$toastr.e('Ada Kesalahan dari Server', 'Pemberitahuan')
            } else {
              this.$toastr.e(error.response.data.message, 'Pemberitahuan')
            }
          })
      },
      downloadExcel() {
        this.isDownload = true
        this.$http
          .get('/report/statistics')
          .then((response) => {
            this.isDownload = false
            window.location.href = response.data.path
          })
          .catch((error) => {
            this.isDownload = false
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
          .get('parinstansi/list/new-tree-view', {
            params: {
              propinsi: this.search.propinsi,
            },
          }).then((response) => {
            this.data.statistics = response.data.data
            this.loading.statistics = false
            this.pagination = response.data.meta
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
        this.search.propinsi = ''
      },
      filter() {
        this.listFilter = !this.listFilter
        this.clearFilter()
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
    },
  }
  </script>
  
  <style></style>
  
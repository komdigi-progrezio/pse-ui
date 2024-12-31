<template>
  <div>
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
                <template v-if="data.statistics.length > 0">
                  <template v-for="(item, index) in data.statistics">
                    <tree-view-table
                      :key="item.id"
                      :number="
                        (pagination.current_page - 1) * pagination.per_page +
                        index +
                        1
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
    <CPagination
      :activePage.sync="query.page"
      :pages="pagination.last_page"
      size="sm"
      align="center"
      @update:activePage="fetchStatistics"
      v-if="data.statistics.length > 0"
    />
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
      isDownload: false,
      data: {
        statistics: [],
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
    isExcelDownload() {
      if (this.isDownload) {
        return null
      }

      return 'outline'
    },
  },
  mounted() {
    this.fetchStatistics()
  },
  methods: {
    fetchStatistics() {
      this.loading.statistics = true

      this.$http
        .get('parinstansi/list/tree-view', {
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
  },
}
</script>

<style></style>

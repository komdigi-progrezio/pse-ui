<template>
  <div>
    <template>
      <div class="row">
        <div class="col-6 col-lg-3">
          <div class="card text-white bg-blue">
            <div
              class="card-body p-3 d-flex justify-content-between align-items-start"
            >
              <div class="mx-auto text-center">
                <i class="fas fa-users fa-2x"></i>
                <div class="text-value-lg my-1">{{ widget.pejabat }}</div>
                <div>Total Pejabat</div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-6 col-lg-3">
          <div class="card text-white bg-blue">
            <div
              class="card-body p-3 d-flex justify-content-between align-items-start"
            >
              <div class="mx-auto text-center">
                <i class="fas fa-users-cog fa-2x"></i>
                <div class="text-value-lg my-1">{{ widget.admin }}</div>
                <div>Total Admin</div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-6 col-lg-3">
          <div class="card text-white bg-blue">
            <div
              class="card-body p-3 d-flex justify-content-between align-items-start"
            >
              <div class="mx-auto text-center">
                <i class="fas fa-cloud fa-2x"></i>
                <div class="text-value-lg my-1">{{ widget.sis_profil }}</div>
                <div>Total Sistem Elektronik</div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-6 col-lg-3">
          <div class="card text-white bg-blue">
            <div
              class="card-body p-3 d-flex justify-content-between align-items-start"
            >
              <div class="mx-auto text-center">
                <i class="far fa-file-alt fa-2x"></i>
                <div class="text-value-lg my-1">{{
                  widget.request_update
                }}</div>
                <div>Total Perubahan Data</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CCard>
        <CCardHeader>
          <strong>Sistem Elektronik</strong>
          <div class="card-header-actions">
            <CButton
              color="danger"
              shape="pill"
              variant="outline"
              v-c-tooltip="{
                content: 'Reset Filter',
                placement: 'bottom',
              }"
              @click="resetChartSystemElectronic"
            >
              <CIcon name="cil-reload" />
            </CButton>
          </div>
          <div class="row w-100 mt-2 mb-2">
            <div class="col-4 col-lg-2">
              <div class="form-group mb-0">
                <label for="name">Bulan</label>
                <select class="form-control" v-model="search.chartSystem.month">
                  <option value="">Pilih Bulan</option>
                  <option
                    v-for="(value, index) in dataSelect.month"
                    :value="value.id"
                    :key="index"
                    >{{ value.name }}</option
                  >
                </select>
              </div>
            </div>
            <div class="col-4 col-lg-2">
              <div class="form-group mb-0">
                <label for="name">Tahun</label>
                <select class="form-control" v-model="search.chartSystem.year">
                  <option
                    v-for="(value, index) in dataSelect.year"
                    :value="value"
                    :key="index"
                    >{{ value }}</option
                  >
                </select>
              </div>
            </div>
            <div class="d-flex align-items-end">
              <div>
                <CButton
                  color="success"
                  variant="outline"
                  v-c-tooltip="{
                    content: 'Filter',
                    placement: 'bottom',
                  }"
                  @click="fetchChartSystemElectronic"
                >
                  Filter
                </CButton>
              </div>
            </div>
            <div class="col-2 d-flex align-items-end">
              <div>
                <CButton
                  color="success"
                  variant="outline"
                  v-c-tooltip="{
                    content: 'Download Data',
                    placement: 'bottom',
                  }"
                  @click="downloadChartSystemElectronic"
                >
                  Download
                </CButton>
              </div>
            </div>
          </div>
        </CCardHeader>

        <CCardBody class="p-3">
          <CChartBar
            class="mt-4"
            style="height: 300px"
            :datasets="[
              {
                data: chart.systemElectronic.approved,
                backgroundColor: '#321FDB',
                label: 'Sudah Disetujui',
              },
              {
                data: chart.systemElectronic.not_approved,
                backgroundColor: '#3399FF',
                label: 'Belum Disetujui',
              },
              {
                data: chart.systemElectronic.publish,
                backgroundColor: '#F9B115',
                label: 'Sudah Dipublish',
              },
              {
                data: chart.systemElectronic.not_publish,
                backgroundColor: '#E55353',
                label: 'Tidak Dipublish',
              },
            ]"
            :labels="chart.systemElectronic.label"
            :options="{
              maintainAspectRatio: false,
              scales: {
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true,
                    },
                  },
                ],
              },
            }"
          />
        </CCardBody>
      </CCard>

      <!-- Start Chart Change Data Submission Section -->
      <CCard>
        <CCardHeader>
          <strong>Pengajuan Perubahan Data</strong>
          <div class="card-header-actions">
            <CButton
              color="danger"
              shape="pill"
              variant="outline"
              v-c-tooltip="{
                content: 'Reset Filter',
                placement: 'bottom',
              }"
              @click="resetChartChangeDataSubmission"
            >
              <CIcon name="cil-reload" />
            </CButton>
          </div>

          <!-- Filter Section -->
          <div class="row w-100 mt-2 mb-2">
            <div class="col-5 col-lg-2">
              <div class="form-group mb-0">
                <label for="name">Bulan</label>
                <select
                  class="form-control"
                  v-model="search.chartChangeDataSubmission.month"
                >
                  <option value="">Pilih Bulan</option>
                  <option
                    v-for="(value, index) in dataSelect.month"
                    :value="value.id"
                    :key="index"
                    >{{ value.name }}</option
                  >
                </select>
              </div>
            </div>
            <div class="col-5 col-lg-2">
              <div class="form-group mb-0">
                <label for="name">Tahun</label>
                <select
                  class="form-control"
                  v-model="search.chartChangeDataSubmission.year"
                >
                  <option
                    v-for="(value, index) in dataSelect.year"
                    :value="value"
                    :key="index"
                  >
                    {{ value }}
                  </option>
                </select>
              </div>
            </div>
            <div class="col-2 d-flex align-items-end">
              <div>
                <CButton
                  color="success"
                  variant="outline"
                  v-c-tooltip="{
                    content: 'Filter',
                    placement: 'bottom',
                  }"
                  @click="fetchChartChangeDataSubmission"
                >
                  Filter
                </CButton>
              </div>
            </div>
          </div>
          <!-- Filter Section -->
        </CCardHeader>

        <CCardBody class="p-3">
          <!-- Chart Section -->
          <CChartLine
            class="mt-4"
            style="height: 300px"
            :datasets="[
              {
                data: chart.changeDataSubmission.approved,
                borderColor: '#321FDB',
                fill: false,
                label: 'Sudah Disetujui',
              },
              {
                data: chart.changeDataSubmission.finished,
                borderColor: '#3399FF',
                fill: false,
                label: 'Sudah Selesai',
              },
              {
                data: chart.changeDataSubmission.not_approved,
                borderColor: '#F9B115',
                fill: false,
                label: 'Tidak Disetujui',
              },
              {
                data: chart.changeDataSubmission.not_finished,
                borderColor: '#E55353',
                fill: false,
                label: 'Tidak Selesai',
              },
            ]"
            :labels="chart.changeDataSubmission.label"
            :options="{
              maintainAspectRatio: false,
              scales: {
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true,
                    },
                  },
                ],
              },
            }"
          />
          <!-- Chard Section -->
        </CCardBody>
      </CCard>
      <!-- End Chart Change Data Submission Section -->
    </template>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data() {
    return {
      search: {
        chartSystem: {
          month: '',
          year: new Date(Date.now()).getFullYear(),
        },

        chartChangeDataSubmission: {
          month: '',
          year: new Date(Date.now()).getFullYear(),
        },
      },

      widget: {
        pejabat: null,
        admin: null,
        sis_profil: null,
        request_update: null,
      },

      chart: {
        systemElectronic: {
          approved: [],
          not_approved: [],
          publish: [],
          not_publish: [],
          label: [],
        },

        changeDataSubmission: {
          approved: [],
          finished: [],
          not_approved: [],
          not_finished: [],
          label: [],
        },
      },
      dataSelect: {
        month: [],
      },
    }
  },

  computed: {
    isAdmin() {
      if (this.$store.state.auth.data.roles.includes('Admin')) {
        return true
      }

      return false
    },
  },
  created() {
    this.fetchWidget()
    this.fetchChartSystemElectronic()
    this.fetchChartChangeDataSubmission()
  },

  methods: {
    resetChartSystemElectronic() {
      this.search.chartSystem.month = ''
      this.search.chartSystem.year = new Date(Date.now()).getFullYear()

      this.fetchChartSystemElectronic()
      // this.downloadChartSystemElectronic()
    },

    fetchWidget() {
      this.$http
        .get('/dashboard/widget')
        .then((response) => {
          this.widget.pejabat = response.data.pejabat
          this.widget.admin = response.data.admin
          this.widget.sis_profil = response.data.sis_profil
          this.widget.request_update = response.data.request_update
        })
        .catch((error) => {
          if (error.response.status === 500) {
            this.$toastr.e(error.response.data.message, 'Pemberitahuan')
          } else {
            this.$toastr.e(error.response.data.message, 'Pemberitahuan')
          }
        })
    },

    fetchChartSystemElectronic() {
      this.$http
        .get('/dashboard/chart/system/electronic', {
          params: {
            month: this.search.chartSystem.month,
            year: this.search.chartSystem.year,
          },
        })
        .then((response) => {
          this.chart.systemElectronic.approved = response.data.data.approved
          this.chart.systemElectronic.not_approved =
            response.data.data.not_approved
          this.chart.systemElectronic.publish = response.data.data.publish
          this.chart.systemElectronic.not_publish =
            response.data.data.not_publish
          this.chart.systemElectronic.label = response.data.label
          this.dataSelect.month = response.data.month
          this.dataSelect.year = response.data.year
        })
        .catch((error) => {
          if (error.response.status === 500) {
            this.$toastr.e('Ada Kesalahan dari Server', 'Pemberitahuan')
          } else {
            this.$toastr.e(error.response.data.message, 'Pemberitahuan')
          }
        })
    },

    downloadChartSystemElectronic() {
      this.$http
        .get('/dashboard/chart/system/downloadelectronic', {
          params: {
            month: this.search.chartSystem.month,
            year: this.search.chartSystem.year,
          },
        })
        .then((response) => {
          console.log(response)
          window.location.href = response.data.path
        })
        .catch((error) => {
          if (error.response.status === 500) {
            this.$toastr.e('Ada Kesalahan dari Server', 'Pemberitahuan')
          } else {
            this.$toastr.e(error.response.data.message, 'Pemberitahuan')
          }
        })
    },

    /**
     * Filter Section
     */
    resetChartChangeDataSubmission() {
      Object.assign(this.search.chartChangeDataSubmission, {
        month: '',
        year: new Date(Date.now()).getFullYear(),
      })

      this.fetchChartChangeDataSubmission()
    },

    /**
     * Fetch data pengajuan perubahan data
     */
    fetchChartChangeDataSubmission() {
      this.$http
        .get('dashboard/chart/request/update', {
          params: {
            ...this.search.chartChangeDataSubmission,
          },
        })
        .then((response) => {
          Object.assign(this.chart.changeDataSubmission, {
            approved: response.data.data.approved,
            finished: response.data.data.finished,
            not_approved: response.data.data.not_approved,
            not_finished: response.data.data.not_finished,
            label: response.data.label,
          })
        })
        .catch((error) => {
          if (error.response.status === 500) {
            this.showToast('Ada Kesalahan dari Server', 'Pemberitahuan')
          } else {
            this.showToast(error.response.data.message, 'Pemberitahuan')
          }
        })
    },

    /**
     * Show toast
     *
     * @param {string} message
     * @param {string} title
     */
    showToast(message, title) {
      this.$toastr.e(message, title)
    },
  },
}
</script>

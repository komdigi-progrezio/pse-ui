<template>
  <div>
    <CRow>
      <CCol lg="12">
        <CCard>
          <CCardHeader>
            <CIcon name="cil-cloud" /> Daftar Sistem Elektronik
          </CCardHeader>

          <CCardBody>
            <div v-if="loading.user" class="d-flex justify-content-center">
              <div class="spinner-border text-primary" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </div>

            <div v-else class="row">
              <div class="col-md-6 col-sm-12">
                <div class="row mb-2">
                  <div class="col-md-4 col-sm-4 col-lg-4"> Nama Lengkap </div>

                  <div class="col-md-1 col-sm-1 col-lg-1"> : </div>

                  <div class="col-md-7 col-sm-7 col-lg-7">
                    {{ data.profile.nama }}
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-4 col-sm-4"> Jabatan </div>

                  <div class="col-md-1 col-sm-1"> : </div>

                  <div class="col-md-7 col-sm-7">
                    {{ data.profile.jabatan }}
                  </div>
                </div>
              </div>

              <div class="col-md-6 col-sm-12">
                <div class="row mb-2">
                  <div class="col-md-4 col-sm-4"> NIP </div>

                  <div class="col-md-1 col-sm-1"> : </div>

                  <div class="col-md-7 col-sm-7">
                    {{ data.profile.nip }}
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-4 col-sm-4"> Satuan Kerja </div>

                  <div class="col-md-1 col-sm-1"> : </div>

                  <div class="col-md-7 col-sm-7">
                    {{ data.profile.satuan_kerja }}
                  </div>
                </div>
              </div>
            </div>
          </CCardBody>
        </CCard>

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
                @click="checkFilter = !checkFilter"
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
                @click="resetSystemElectronics"
              >
                Clear All
                <CIcon name="cil-clear-all" />
              </CButton>

              <template v-if="!checkFilter">
                <CButton
                  color="primary"
                  variant="outline"
                  size="sm"
                  class="mr-2"
                  v-c-tooltip="{
                    content: 'Cari',
                    placement: 'bottom',
                  }"
                  @click="filterSystemElectronics"
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
                  @click="resetSystemElectronics(), fetchSystemElectronics()"
                >
                  Reset
                  <CIcon name="cil-reload" />
                </CButton>
              </template>
            </div>

            <template v-if="!checkFilter">
              <CRow class="my-3">
                <CCol sm="12" md="12" lg="12">
                  <div class="form-group">
                    <label for="q">Kata Kunci</label>
                    <input
                      v-model="params.q"
                      type="text"
                      name="name"
                      placeholder="Masukan Kata Kunci"
                      class="form-control"
                    />
                  </div>
                </CCol>
              </CRow>
            </template>
          </CCardBody>
        </CCard>

        <CCard>
          <CCardBody>
            <div class="mt-lg-4">
              <div
                v-if="loading.systemElectronic"
                class="d-flex justify-content-center"
              >
                <div class="spinner-border text-primary" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              </div>

              <div class="table-responsive">
                <table
                  v-if="!loading.systemElectronic"
                  class="table table-hover table-striped"
                >
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
                    <template v-if="data.systemElectronics.length > 0">
                      <tr
                        v-for="(item, index) in data.systemElectronics"
                        :key="index"
                      >
                        <th scope="row">
                          {{
                            (pagination.current_page - 1) *
                              pagination.per_page +
                            index +
                            1
                          }}
                        </th>

                        <td>
                          {{ item.nama_penanggungjawab_satuan_kerja }}
                        </td>

                        <td>
                          {{ item.nama_eksternal }}
                        </td>

                        <td>
                          {{ item.progress }}
                        </td>

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

            <CPagination
              :activePage.sync="query.page"
              :pages="pagination.last_page"
              size="sm"
              align="center"
              @update:activePage="fetchSystemElectronics"
              v-if="data.systemElectronics.length > 0"
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
export default {
  name: 'ElectronicSystem',
  data() {
    return {
      data: {
        systemElectronics: [],
        profile: null,
      },
      loading: {
        systemElectronic: true,
        user: true,
      },
      query: {
        account_id: this.$route.params.id,
        page: 1,
      },
      params: {
        filter: 'nama_internal',
        q: null,
      },
      pagination: {
        last_page: null,
      },
      checkFilter: true,
    }
  },
  computed: {
    userId() {
      return this.$route.params.id
    },

    setIconFilter() {
      if (!this.checkFilter) {
        return 'cil-filter-x'
      }

      return 'cil-filter'
    },
  },
  mounted() {
    this.fetchProfile()
    this.fetchSystemElectronics()
  },
  methods: {
    fetchProfile() {
      this.$http.get(`users/${this.userId}`).then((response) => {
        this.data.profile = response.data.data
        this.loading.user = false
      })
    },

    fetchSystemElectronics() {
      this.loading.systemElectronic = true

      this.$http
        .get('systems/general', {
          params: {
            ...this.query,
          },
        })
        .then((response) => {
          this.data.systemElectronics = response.data.data
          this.loading.systemElectronic = false
          this.pagination = response.data.meta
        })
    },

    filterSystemElectronics() {
      Object.assign(this.query, {
        ...this.params,
      })

      this.fetchSystemElectronics()
    },

    resetSystemElectronics() {
      this.query = {
        account_id: this.userId,
        page: 1,
      }

      this.params.q = null
    },
  },
}
</script>

<style></style>

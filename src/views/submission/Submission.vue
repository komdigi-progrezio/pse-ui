<template>
  <div>
    <CRow>
      <CCol lg="12">
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
                @click="resetChangeSubmissions"
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
                  @click="filterChangeSubmissions"
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
                  @click="resetChangeSubmissions(), fetchChangeSubmissions()"
                >
                  Reset
                  <CIcon name="cil-reload" />
                </CButton>
              </template>
            </div>

            <template v-if="!checkFilter">
              <CRow class="d-flex p-3 p-lg-0">
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
          <CCardHeader>
            <div class="d-flex justify-content-between">
              <div class="align-self-center">
                <span>
                  <CIcon name="cil-description" /> Pengajuan Perubahan Data
                  Sistem Elektronik
                </span>
              </div>

              <div class="card-header-actions">
                <CButton
                  color="success"
                  shape="pill"
                  size="sm"
                  variant="outline"
                  v-c-tooltip="{
                    content: 'Tambah Pengajuan',
                    placement: 'bottom',
                  }"
                  @click="
                    openModalSubmission('Simpan', 'Tambah Pengajuan Perubahan')
                  "
                  v-if="addSubmissionPermission"
                >
                  <CIcon name="cil-plus" />
                </CButton>
              </div>
            </div>
          </CCardHeader>

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
                      <th>Nama Sistem Elektronik</th>
                      <th>Instansi Penyelenggara</th>
                      <th>Alasan</th>
                      <th @click="filterOrderData(0)" class="pointer">Tanggal Pengajuan</th>
                      <th @click="filterOrderData(1)" class="pointer">Status <CIcon name="cil-sort-descending"/></th>
                      <th>Aksi</th>
                    </tr>
                  </thead>

                  <tbody>
                    <template v-if="data.changeSubmissions.length > 0">
                      <tr
                        v-for="(item, index) in data.changeSubmissions"
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

                        <td>{{ item.nama_sistem }}</td>

                        <td>{{ item.sis_profil.account.instansi_induk_text }}</td>

                        <td>
                          <span class="mobile-only mr-1"
                            >Alasan perubahan:
                          </span>
                          {{ item.reason }}
                        </td>

                        <td>
                          <span class="mobile-only mr-1"
                            >Tanggal pengajuan:
                          </span>
                          {{ item.tanggal_pengajuan }}
                        </td>

                        <td>
                          <span class="mobile-only mr-1">Status: </span>
                          {{ item.status }}
                        </td>

                        <td>
                          <CButton
                            color="primary"
                            size="sm"
                            v-c-tooltip="{
                              content: 'Detail Sistem Elektronik',
                              placement: 'bottom',
                            }"
                            class="m-1"
                            :to="`/admin/systems/${item.sis_profil_id}`"
                          >
                            <CIcon name="cil-description" />
                            <span class="mobile-only ml-1"
                              >Detail Sistem Elektronik</span
                            >
                          </CButton>

                          <CButton
                            color="success"
                            size="sm"
                            v-c-tooltip="{
                              content: 'Setujui Perubahan Data',
                              placement: 'bottom',
                            }"
                            class="m-1"
                            v-if="!item.approved && isAdmin"
                            @click="
                              openStatusModal('Ubah Status', 'approve', item)
                            "
                          >
                            <CIcon name="cil-check" />
                          </CButton>

                          <CButton
                            color="success"
                            size="sm"
                            v-c-tooltip="{
                              content: 'Selesai Perubahan Data',
                              placement: 'bottom',
                            }"
                            class="m-1"
                            v-if="item.approved && !item.finished && !isAdmin"
                            @click="
                              openStatusModal('Ubah Status', 'finish', item)
                            "
                          >
                            <CIcon name="cil-check-circle" />
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
          :activePage.sync="query.page"
          :pages="pagination.last_page"
          size="sm"
          align="center"
          @update:activePage="fetchChangeSubmissions"
          v-if="data.changeSubmissions.length > 0"
        />
      </CCol>
    </CRow>

    <ValidationObserver
      v-slot="{ invalid }"
      :ref="submissionForm"
      v-if="addSubmissionPermission"
    >
      <CModal
        :title="modal.submission.title"
        :show.sync="modal.submission.show"
        color="success"
      >
        <template v-slot:body-wrapper>
          <div class="modal-body">
            <CRow>
              <CCol sm="12">
                <div class="form-group">
                  <label for="nama_sistem_elektronik">
                    Nama Sistem Elektronik<span class="text-danger">*</span>
                  </label>

                  <ValidationProvider
                    name="sis_profil_id"
                    :rules="validation.submission.sis_profil_id.rules"
                    :custom-messages="
                      validation.submission.sis_profil_id.message
                    "
                    v-slot="{ errors }"
                    mode="aggressive"
                  >
                    <select
                      class="form-control"
                      v-model="form.submission.sis_profil_id"
                      :class="{ 'is-invalid': errors[0] ? true : false }"
                    >
                      <option value="">Pilih Sistem Elektronik</option>
                      <option
                        v-for="(item, index) in options.electronics"
                        :key="index"
                        :value="item.id"
                        >{{ item.nama_internal }}</option
                      >
                    </select>

                    <div v-if="errors.length > 0" class="invalid-feedback">
                      {{ errors[0] }}
                    </div>
                  </ValidationProvider>
                </div>

                <div class="form-group">
                  <label for="nama_dasar_hukum">
                    Alasan <span class="text-danger">*</span>
                  </label>

                  <ValidationProvider
                    name="reason"
                    :rules="validation.submission.reason.rules"
                    :custom-messages="validation.submission.reason.message"
                    v-slot="{ errors }"
                    mode="aggressive"
                  >
                    <textarea
                      v-model="form.submission.reason"
                      class="form-control"
                      :class="{ 'is-invalid': errors[0] ? true : false }"
                    />

                    <div v-if="errors.length > 0" class="invalid-feedback">
                      {{ errors[0] }}
                    </div>
                  </ValidationProvider>
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
            @click="closeModalSubmission"
          >
            Cancel
          </CButton>

          <CButton
            color="primary"
            size="sm"
            class="m-2"
            :disabled="invalid"
            @click="saveSubmission"
          >
            {{ modal.submission.type }}
          </CButton>
        </template>
      </CModal>
    </ValidationObserver>

    <CModal
      :title="modal.submissionStatus.title"
      :show.sync="modal.submissionStatus.show"
      color="success"
    >
      <template v-slot:body-wrapper>
        <div class="modal-body">
          <CRow>
            <CCol sm="12">
              Anda yakin ingin merubah status
              <strong>{{ modal.submissionStatus.label }} </strong> ke
              {{ modal.submissionStatus.type }} ?
            </CCol>
          </CRow>
        </div>
      </template>
      <template v-slot:footer>
        <CButton
          color="secondary"
          size="sm"
          class="m-2"
          @click="closeStatusModal"
        >
          Cancel
        </CButton>

        <CButton color="primary" size="sm" class="m-2" @click="changeStatus">
          Confirm
        </CButton>
      </template>
    </CModal>
  </div>
</template>

<script>
export default {
  name: 'Submission',
  data() {
    return {
      orderBy: 'DESC',
      data: {
        changeSubmissions: [],
      },
      loading: {
        systemElectronic: true,
      },
      query: {
        page: 1,
      },
      params: {
        filter: 'nama_internal',
        q: null,
      },
      pagination: {
        current_page: 1,
        per_page: null,
        last_page: 10,
      },
      checkFilter: true,
      modal: {
        submission: {
          title: null,
          show: false,
          type: null,
        },

        submissionStatus: {
          title: null,
          show: false,
          type: null,
          data: null,
          label: null,
        },
      },
      submissionForm: 'SubmissionForm',
      validation: {
        submission: {
          sis_profil_id: {
            rules: 'required',
            message: {
              required: 'Sistem Elektronik harus dipillih.',
            },
          },

          reason: {
            rules: 'required',
            message: {
              required: 'Alasan harus diisi.',
            },
          },
        },
      },
      options: {
        electronics: [],
      },
      form: {
        submission: {
          sis_profil_id: '',
          reason: null,
        },
      },
    }
  },
  computed: {
    setIconFilter() {
      if (!this.checkFilter) {
        return 'cil-filter-x'
      }

      return 'cil-filter'
    },
    addSubmissionPermission() {
      if (
        this.$store.state.auth.data.permissions.includes(
          'Tambah Pengajuan Perubahan Data'
        )
      ) {
        return true
      }

      return false
    },
    isAdmin() {
      if (this.$store.state.auth.data.roles.includes('Admin')) {
        return true
      }

      return false
    },
  },
  mounted() {
    this.fetchChangeSubmissions()
    this.fetchElectronics()
  },
  methods: {
    fetchChangeSubmissions() {
      this.loading.systemElectronic = true

      this.$http
        .get('request-update/filter', {
          params: {
            ...this.query,
          },
        })
        .then((response) => {
          this.data.changeSubmissions = response.data.data
          this.loading.systemElectronic = false
          this.pagination = response.data.meta
        })
    },

    filterOrderData(id) {
      this.loading.systemElectronic = true

      this.$http
        .get('request-update/filter', {
          params: {
            page: 1,
            q: id == 0 ? "tanggal" : "status",
            orderData: this.orderBy,
          },
        })
        .then((response) => {
          this.orderBy == 'ASC'
            ? (this.orderBy = 'DESC')
            : (this.orderBy = 'ASC')
          this.data.changeSubmissions = response.data.data
          this.loading.systemElectronic = false
          this.pagination = response.data.meta
        })
    },

    fetchElectronics() {
      this.$http.get('systems/me/approved').then((response) => {
        this.options.electronics = response.data.data
      })
    },

    filterChangeSubmissions() {
      this.query.page = 1

      Object.assign(this.query, {
        ...this.params,
      })

      this.fetchChangeSubmissions()
    },

    resetChangeSubmissions() {
      this.query = {
        account_id: this.userId,
        page: 1,
      }

      this.params.q = null
    },

    /** Submission CRUD */
    saveSubmission() {
      this.addSubmission()
    },

    addSubmission() {
      const method = 'post'

      const submissionForm = this.parseToFormData(method, this.form.submission)

      this.$http({
        method: method,
        url: 'request-update',
        data: submissionForm,
      })
        .then((response) => {
          this.fetchElectronics()
          this.fetchChangeSubmissions()
          this.closeModalSubmission()
          this.successNotif(response.data.message)
        })
        .catch((error) => {
          this.errorNotif(error)
        })
    },
    closeModalSubmission() {
      Object.assign(this.modal.submission, {
        type: null,
        show: false,
      })

      this.$nextTick(() => {
        this.$refs[this.submissionForm].reset()
      })

      this.resetSubmissionForm()
    },

    openModalSubmission(type, title, data = null) {
      this.resetSubmissionForm()

      if (data) {
        Object.assign(this.form.submission, data)
      }

      Object.assign(this.modal.submission, {
        type,
        title,
        show: true,
      })
    },

    resetSubmissionForm() {
      Object.assign(this.form.submission, {
        sis_profil_id: '',
        reason: null,
      })

      this.$nextTick(() => {
        this.$refs[this.submissionForm].reset()
      })
    },

    openStatusModal(title, type, data) {
      this.modal.submissionStatus.label = data.nama_sistem
      Object.assign(this.modal.submissionStatus, {
        type,
        title,
        show: true,
        data,
      })
    },

    changeStatus() {
      let url

      if (this.modal.submissionStatus.type === 'finish') {
        url = 'request-update/finished'
      }

      if (this.modal.submissionStatus.type === 'approve') {
        url = 'request-update/approved'
      }

      this.$http({
        method: 'patch',
        url: url + `/${this.modal.submissionStatus.data.id}`,
      })
        .then((response) => {
          this.fetchChangeSubmissions()
          this.closeStatusModal()
          this.successNotif(response.data.message)
        })
        .catch((error) => {
          this.errorNotif(error.message)
        })
    },

    closeStatusModal() {
      Object.assign(this.modal.submissionStatus, {
        type: null,
        show: false,
        data: null,
        title: null,
      })
    },

    /**
     * Manage form data
     */
    parseToFormData(method, data) {
      const formData = new FormData()

      formData.append('_method', method)

      for (var key in data) {
        formData.append(key, data[key])
      }

      return formData
    },

    /**
     * Toast
     */
    successNotif(message) {
      this.$toastr.s(message, 'Pemberitahuan')
    },

    errorNotif(message) {
      this.$toastr.e(message, 'Pemberitahuan')
    },
  },
}
</script>

<style>
.pointer {
  cursor: pointer;
}
</style>

<template>
  <div class="mt-2">
    <h5>Dasar Hukum</h5>

    <div class="form-group">
      <label for="name">Data Tersedia ? </label>
      <div class="form-check form-check-inline ml-2">
        <input
          class="form-check-input"
          id="hide-legal"
          type="radio"
          :value="false"
          name="hide-legal"
          v-model="legalBasisAvailable"
        />
        <label class="form-check-label" for="inline-radio1">Tidak</label>
      </div>

      <div class="form-check form-check-inline mr-1">
        <input
          class="form-check-input"
          id="show-legal"
          type="radio"
          :value="true"
          name="show-legal"
          v-model="legalBasisAvailable"
        />
        <label class="form-check-label" for="inline-radio1">Ya</label>
      </div>
    </div>

    <hr />

    <template v-if="legalBasisAvailable">
      <button
        class="btn btn-link d-flex"
        @click.prevent="openModalLegalBasis('simpan', 'Tambah Data')"
      >
        <CIcon name="cil-plus" class="align-self-center mr-2" />
        <a href="" class="align-self-center">Tambah Dasar Hukum</a>
      </button>

      <div class="table-responsive">
        <table class="table table-stripped">
          <thead>
            <tr>
              <td>No</td>
              <td>Nama Dasar Hukum</td>
              <td>No</td>
              <td>Tahun</td>
              <td>Tentang</td>
              <td>Aksi</td>
            </tr>
          </thead>
          <tbody>
            <template v-if="legalBasis.length > 0">
              <tr :key="index" v-for="(currentLegalbasis, index) in legalBasis">
                <td>{{ index + 1 }}</td>
                <td>{{ currentLegalbasis.nama_dh }}</td>
                <td>{{ currentLegalbasis.no_dh }}</td>
                <td>{{ currentLegalbasis.tahun_dh }}</td>
                <td>
                  <p>
                    {{ currentLegalbasis.keterangan }}
                  </p>
                </td>
                <td>
                  <CButton
                    color="danger"
                    size="sm"
                    class="mr-2"
                    v-c-tooltip="{
                      content: 'Hapus Dasar Hukum',
                      placement: 'bottom',
                    }"
                    @click="openModalDeleteLegalBasis(currentLegalbasis)"
                  >
                    <CIcon name="cil-trash" />
                  </CButton>

                  <CButton
                    color="success"
                    size="sm"
                    v-c-tooltip="{
                      content: 'Edit Dasar Hukum',
                      placement: 'bottom',
                    }"
                    @click="
                      openModalLegalBasis(
                        'update',
                        'Update Data',
                        currentLegalbasis
                      )
                    "
                  >
                    <CIcon name="cil-pencil" />
                  </CButton>
                </td>
              </tr>
            </template>

            <template v-else>
              <tr>
                <td colspan="6" class="text-center">Data Kosong</td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </template>

    <h5>SOP</h5>

    <div class="form-group">
      <label for="name">Data Tersedia ? </label>
      <div class="form-check form-check-inline ml-2">
        <input
          class="form-check-input"
          id="hide-sop"
          type="radio"
          :value="false"
          name="hide-sop"
          v-model="sopAvailable"
        />
        <label class="form-check-label" for="inline-radio1">Tidak</label>
      </div>

      <div class="form-check form-check-inline mr-1">
        <input
          class="form-check-input"
          id="show-sop"
          type="radio"
          :value="true"
          name="show-sop"
          v-model="sopAvailable"
        />
        <label class="form-check-label" for="inline-radio1">Ya</label>
      </div>
    </div>

    <hr />

    <template v-if="sopAvailable">
      <button
        class="btn btn-link d-flex"
        @click.prevent="openModalSop('simpan', 'Tambah Data')"
      >
        <CIcon name="cil-plus" class="align-self-center mr-2" />
        <a href="" class="align-self-center">Tambah SOP</a>
      </button>

      <div class="table-responsive">
        <table class="table table-stripped">
          <thead>
            <tr>
              <td>No</td>
              <td>Nama SOP</td>
              <td>Keterangan</td>
              <td>Aksi</td>
            </tr>
          </thead>
          <tbody>
            <template v-if="sop.length > 0">
              <tr :key="index" v-for="(currentSop, index) in sop">
                <td>{{ index + 1 }}</td>
                <td>{{ currentSop.nama_sop }}</td>
                <td>{{
                  currentSop.keterangan !== 'null' ? currentSop.keterangan : '-'
                }}</td>
                <td>
                  <CButton
                    color="danger"
                    size="sm"
                    class="mr-2"
                    v-c-tooltip="{
                      content: 'Hapus SOP',
                      placement: 'bottom',
                    }"
                    @click="openModalDeleteSop(currentSop)"
                  >
                    <CIcon name="cil-trash" />
                  </CButton>
                  <CButton
                    color="success"
                    size="sm"
                    v-c-tooltip="{
                      content: 'Edit SOP',
                      placement: 'bottom',
                    }"
                    @click="openModalSop('update', 'Update Data', currentSop)"
                  >
                    <CIcon name="cil-pencil" />
                  </CButton>
                </td>
              </tr>
            </template>

            <template v-else>
              <tr>
                <td colspan="4" class="text-center">Data Kosong</td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </template>

    <!-- Modal Legal Basis -->
    <ValidationObserver v-slot="{ invalid }" :ref="legalBasisForm">
      <CModal
        :title="modal.legalBasis.title"
        :show.sync="modal.legalBasis.show"
        color="success"
      >
        <template v-slot:body-wrapper>
          <div class="modal-body">
            <CRow>
              <CCol sm="12">
                <div class="form-group">
                  <label for="nama_dasar_hukum">
                    Nama Dasar Hukum <span class="text-danger">*</span>
                  </label>

                  <ValidationProvider
                    name="nama_dasar_hukum"
                    :rules="validation.legalBasis.nama_dh.rules"
                    :custom-messages="validation.legalBasis.nama_dh.message"
                    v-slot="{ errors }"
                    mode="aggressive"
                  >
                    <input
                      v-model="form.legalBasis.nama_dh"
                      type="text"
                      placeholder="Masukan Nama Dasar Hukum"
                      class="form-control"
                      :class="{ 'is-invalid': errors[0] ? true : false }"
                    />

                    <div v-if="errors.length > 0" class="invalid-feedback">
                      {{ errors[0] }}
                    </div>
                  </ValidationProvider>
                </div>

                <div class="form-group">
                  <label for="nama_dasar_hukum">
                    No <span class="text-danger">*</span>
                  </label>

                  <ValidationProvider
                    name="no_dh"
                    :rules="validation.legalBasis.no_dh.rules"
                    :custom-messages="validation.legalBasis.no_dh.message"
                    v-slot="{ errors }"
                    mode="aggressive"
                  >
                    <input
                      v-model="form.legalBasis.no_dh"
                      type="text"
                      placeholder="Masukan No Dasar Hukum"
                      class="form-control"
                      :class="{ 'is-invalid': errors[0] ? true : false }"
                    />

                    <div v-if="errors.length > 0" class="invalid-feedback">
                      {{ errors[0] }}
                    </div>
                  </ValidationProvider>
                </div>

                <div class="form-group">
                  <label for="nama_dasar_hukum">
                    Tahun diterbitkan <span class="text-danger">*</span>
                  </label>

                  <ValidationProvider
                    name="tahun_dh"
                    :rules="validation.legalBasis.tahun_dh.rules"
                    :custom-messages="validation.legalBasis.tahun_dh.message"
                    v-slot="{ errors }"
                    mode="aggressive"
                  >
                    <input
                      v-model="form.legalBasis.tahun_dh"
                      type="text"
                      placeholder="Masukan Tahun diterbitkan."
                      class="form-control"
                      :class="{ 'is-invalid': errors[0] ? true : false }"
                    />

                    <div v-if="errors.length > 0" class="invalid-feedback">
                      {{ errors[0] }}
                    </div>
                  </ValidationProvider>
                </div>

                <div class="form-group">
                  <label for="nama_dasar_hukum">
                    Tentang <span class="text-danger">*</span>
                  </label>

                  <ValidationProvider
                    name="tentang"
                    :rules="validation.legalBasis.keterangan.rules"
                    :custom-messages="validation.legalBasis.keterangan.message"
                    v-slot="{ errors }"
                    mode="aggressive"
                  >
                    <input
                      v-model="form.legalBasis.keterangan"
                      type="text"
                      placeholder="Masukan Keterangan"
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
            @click="closeModalLegalBasis"
          >
            Cancel
          </CButton>

          <CButton
            color="primary"
            size="sm"
            class="m-2"
            @click="saveLegalbasis"
            :disabled="invalid"
          >
            {{ modal.legalBasis.type }}
          </CButton>
        </template>
      </CModal>
    </ValidationObserver>

    <CModal
      :title="modal.legalBasisDelete.title"
      color="danger"
      :show.sync="modal.legalBasisDelete.show"
    >
      <template v-slot:body-wrapper>
        <div class="modal-body">
          <p>
            Ingin menghapus data
            <strong>{{
              modal.legalBasisDelete.data
                ? modal.legalBasisDelete.data.nama_dh
                : null
            }}</strong
            >?
          </p>
        </div>
      </template>
      <template v-slot:footer>
        <CButton
          color="secondary"
          size="sm"
          class="m-2"
          @click="closeModalDeleteLegalBasis()"
        >
          Cancel
        </CButton>

        <CButton
          color="primary"
          size="sm"
          class="m-2"
          @click="deleteLegalBasis()"
        >
          Hapus
        </CButton>
      </template>
    </CModal>
    <!-- Modal Legal Basis -->

    <!-- Modal SOP -->
    <ValidationObserver v-slot="{ invalid }" :ref="sopForm">
      <CModal
        :title="modal.sop.title"
        :show.sync="modal.sop.show"
        color="success"
      >
        <template v-slot:body-wrapper>
          <div class="modal-body">
            <CRow>
              <CCol sm="12">
                <div class="form-group">
                  <label for="nama_sop">
                    Nama SOP <span class="text-danger">*</span>
                  </label>

                  <ValidationProvider
                    name="nama_sop"
                    :rules="validation.sop.nama_sop.rules"
                    :custom-messages="validation.sop.nama_sop.message"
                    v-slot="{ errors }"
                    mode="aggressive"
                  >
                    <input
                      v-model="form.sop.nama_sop"
                      type="text"
                      placeholder="Masukan Nama SOP"
                      class="form-control"
                      :class="{ 'is-invalid': errors[0] ? true : false }"
                    />

                    <div v-if="errors.length > 0" class="invalid-feedback">
                      {{ errors[0] }}
                    </div>
                  </ValidationProvider>
                </div>

                <div class="form-group">
                  <label for="nama_dasar_hukum"> Keterangan </label>

                  <textarea
                    v-model="form.sop.keterangan"
                    cols="30"
                    rows="10"
                    class="form-control"
                  ></textarea>
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
            @click="resetSopForm"
          >
            reset
          </CButton>

          <CButton
            color="primary"
            size="sm"
            class="m-2"
            @click="saveSop"
            :disabled="invalid"
          >
            {{ modal.sop.type }}
          </CButton>
        </template>
      </CModal>
    </ValidationObserver>

    <CModal
      :title="modal.sopDelete.title"
      color="danger"
      :show.sync="modal.sopDelete.show"
    >
      <template v-slot:body-wrapper>
        <div class="modal-body">
          <p>
            Ingin menghapus data
            <strong>{{
              modal.sopDelete.data ? modal.sopDelete.data.nama_sop : null
            }}</strong
            >?
          </p>
        </div>
      </template>
      <template v-slot:footer>
        <CButton
          color="secondary"
          size="sm"
          class="m-2"
          @click="closeModalDeletesop()"
        >
          Cancel
        </CButton>

        <CButton color="primary" size="sm" class="m-2" @click="deleteSop()">
          Hapus
        </CButton>
      </template>
    </CModal>
    <!-- Modal SOP -->
  </div>
</template>

<script>
export default {
  name: 'SystemGovernance',
  props: {
    legalBasis: {
      type: Array,
      default: () => [],
    },

    sop: {
      type: Array,
      default: () => [],
    },

    systemId: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      sopAvailable: true,
      legalBasisAvailable: true,
      modal: {
        legalBasis: {
          show: false,
          title: null,
          type: null,
        },

        legalBasisDelete: {
          show: false,
          title: 'Hapus Data',
          data: null,
        },

        sop: {
          title: null,
          show: false,
          type: null,
        },

        sopDelete: {
          show: false,
          title: 'Hapus Data',
          data: null,
        },
      },
      legalBasisForm: 'legalBasisForm',
      sopForm: 'sopForm',
      form: {
        legalBasis: {
          sis_profil_id: null,
          nama_dh: null,
          no_dh: null,
          tahun_dh: null,
          keterangan: null,
        },

        sop: {
          sis_profil_id: null,
          nama_sop: null,
          keterangan: null,
        },
      },
      validation: {
        legalBasis: {
          sis_profil_id: {
            rules: 'required',
            message: {
              required: 'harus diisi.',
            },
          },
          nama_dh: {
            rules: 'required',
            message: {
              required: 'Nama Dasar Hukum harus diisi.',
            },
          },
          no_dh: {
            rules: 'required',
            message: {
              required: 'No harus diisi.',
            },
          },
          tahun_dh: {
            rules: 'required',
            message: {
              required: 'Tahun diterbitkan harus diisi.',
            },
          },
          keterangan: {
            rules: 'required',
            message: {
              required: 'Tentang harus diisi.',
            },
          },
        },

        sop: {
          sis_profil_id: {
            rules: 'required',
            message: {
              required: 'harus diisi.',
            },
          },
          nama_sop: {
            rules: 'required',
            message: {
              required: 'Nama SOP harus diisi.',
            },
          },
          keterangan: {
            rules: 'required',
            message: {
              required: 'harus diisi.',
            },
          },
        },
      },
    }
  },
  created() {
    //
  },
  mounted() {
    this.form.legalBasis.sis_profil_id = this.systemId
    this.form.sop.sis_profil_id = this.systemId
  },
  methods: {
    refreshData() {
      this.$emit('update-data')
    },

    /**
     * Legal Basis Section
     */
    saveLegalbasis() {
      this.form.legalBasis.sis_profil_id = this.systemId

      if (this.modal.legalBasis.type === 'simpan') {
        this.addLegalBasis()
      }

      if (this.modal.legalBasis.type === 'update') {
        this.updateLegalBasis()
      }
    },

    addLegalBasis() {
      const method = 'post'

      const legalBasisForm = this.parseToFormData(method, this.form.legalBasis)

      this.$http({
        method: method,
        url: 'legal-basis',
        data: legalBasisForm,
      })
        .then((response) => {
          this.refreshData()
          this.closeModalLegalBasis()
          this.successNotif(response.data.message)
        })
        .catch((error) => {
          this.errorNotif(error)
        })
    },

    updateLegalBasis() {
      const method = 'patch'

      const legalBasisForm = this.parseToFormData(method, this.form.legalBasis)

      this.$http({
        method: 'post',
        url: 'legal-basis/' + this.form.legalBasis.id,
        data: legalBasisForm,
      })
        .then((response) => {
          this.refreshData()
          this.closeModalLegalBasis()
          this.successNotif(response.data.message)
        })
        .catch((error) => {
          this.errorNotif(error)
        })
    },

    deleteLegalBasis() {
      this.$http
        .delete('legal-basis/' + this.modal.legalBasisDelete.data.id)
        .then((response) => {
          this.refreshData()
          this.closeModalDeleteLegalBasis()
          this.successNotif(response.data.message)
        })
        .catch((error) => {
          this.errorNotif(error)
        })
    },

    closeModalLegalBasis() {
      Object.assign(this.modal.legalBasis, {
        type: null,
        show: false,
      })

      this.$nextTick(() => {
        this.$refs[this.legalBasisForm].reset()
      })

      this.resetLegalBasisForm()
    },

    openModalLegalBasis(type, title, data = null) {
      this.resetLegalBasisForm()

      if (data) {
        Object.assign(this.form.legalBasis, data)
      }

      Object.assign(this.modal.legalBasis, {
        type,
        title,
        show: true,
      })
    },

    resetLegalBasisForm() {
      Object.assign(this.form.legalBasis, {
        nama_dh: null,
        no_dh: null,
        tahun_dh: null,
        keterangan: null,
      })

      this.$nextTick(() => {
        this.$refs[this.legalBasisForm].reset()
      })
    },

    openModalDeleteLegalBasis(legalBasis) {
      this.modal.legalBasisDelete.data = legalBasis
      this.modal.legalBasisDelete.show = true
    },

    closeModalDeleteLegalBasis() {
      this.modal.legalBasisDelete.data = null
      this.modal.legalBasisDelete.show = false
    },

    /**
     * SOP Section
     */
    saveSop() {
      this.form.sop.sis_profil_id = this.systemId

      if (this.modal.sop.type === 'simpan') {
        this.addSop()
      }

      if (this.modal.sop.type === 'update') {
        this.updateSop()
      }
    },

    addSop() {
      const method = 'post'

      const sopForm = this.parseToFormData(method, this.form.sop)

      this.$http({
        method: method,
        url: 'sop',
        data: sopForm,
      })
        .then((response) => {
          this.refreshData()
          this.closeModalSop()
          this.successNotif(response.data.message)
        })
        .catch((error) => {
          this.errorNotif(error)
        })
    },

    updateSop() {
      const method = 'patch'

      const sopForm = this.parseToFormData(method, this.form.sop)

      this.$http({
        method: 'post',
        url: 'sop/' + this.form.sop.id,
        data: sopForm,
      })
        .then((response) => {
          this.refreshData()
          this.closeModalSop()
          this.successNotif(response.data.message)
        })
        .catch((error) => {
          this.errorNotif(error)
        })
    },

    deleteSop() {
      this.$http
        .delete('sop/' + this.modal.sopDelete.data.id)
        .then((response) => {
          this.refreshData()
          this.closeModalDeletesop()
          this.successNotif(response.data.message)
        })
        .catch((error) => {
          this.errorNotif(error)
        })
    },

    resetSopForm() {
      Object.assign(this.form.sop, {
        nama_sop: null,
        keterangan: null,
      })

      this.$nextTick(() => {
        this.$refs[this.sopForm].reset()
      })
    },

    closeModalSop() {
      Object.assign(this.modal.sop, {
        type: null,
        show: false,
      })

      this.$nextTick(() => {
        this.$refs[this.sopForm].reset()
      })

      this.resetSopForm()
    },

    openModalSop(type, title, data = null) {
      this.resetSopForm()

      if (data) {
        Object.assign(this.form.sop, data)
      }

      Object.assign(this.modal.sop, {
        type,
        title,
        show: true,
      })
    },

    openModalDeleteSop(sop) {
      this.modal.sopDelete.data = sop
      this.modal.sopDelete.show = true
    },

    closeModalDeletesop() {
      this.modal.sopDelete.data = null
      this.modal.sopDelete.show = false
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
  },
}
</script>

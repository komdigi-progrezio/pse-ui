<template>
  <div class="mt-2">
    <h5>Help Desk</h5>
    <hr />

    <button
      class="btn btn-link d-flex"
      @click.prevent="openModalHelpDesk('simpan', 'Tambah Data')"
    >
      <CIcon name="cil-plus" class="align-self-center mr-2" />
      <a href="" class="align-self-center">Tambah Help Desk</a>
    </button>

    <div class="table-responsive">
      <table class="table table-stripped">
        <thead>
          <tr>
            <td>No</td>
            <td>Nama Lengkap</td>
            <td>Telepon</td>
            <td>Fax</td>
            <td>Email</td>
            <td>Aksi</td>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(currentHelpDesk, index) in helpDesk" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ currentHelpDesk.nama }}</td>
            <td>{{ currentHelpDesk.telepon }}</td>
            <td>{{ currentHelpDesk.fax }}</td>
            <td>{{ currentHelpDesk.email }}</td>
            <td>
              <CButton
                color="danger"
                size="sm"
                class="mr-2"
                v-c-tooltip="{
                  content: 'Hapus Help Desk',
                  placement: 'bottom',
                }"
                @click="openModalDeleteHelpDesk(currentHelpDesk)"
              >
                <CIcon name="cil-trash" />
              </CButton>

              <CButton
                color="success"
                size="sm"
                v-c-tooltip="{
                  content: 'Edit Help Desk',
                  placement: 'bottom',
                }"
                @click="
                  openModalHelpDesk('update', 'Update Data', currentHelpDesk)
                "
              >
                <CIcon name="cil-pencil" />
              </CButton>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Help Desk Modal -->
    <ValidationObserver v-slot="{ invalid }" :ref="helpDeskForm">
      <CModal
        :title="modal.helpDesk.title"
        :show.sync="modal.helpDesk.show"
        color="success"
      >
        <template v-slot:body-wrapper>
          <div class="modal-body">
            <CRow>
              <CCol sm="12">
                <div class="form-group">
                  <label for="nama_sop">
                    Nama <span class="text-danger">*</span>
                  </label>

                  <ValidationProvider
                    name="nama"
                    :rules="validation.helpDesk.nama.rules"
                    :custom-messages="validation.helpDesk.nama.message"
                    v-slot="{ errors }"
                    mode="aggressive"
                  >
                    <input
                      v-model="form.helpDesk.nama"
                      type="text"
                      placeholder="Masukan Nama"
                      class="form-control"
                      :class="{ 'is-invalid': errors[0] ? true : false }"
                    />

                    <div v-if="errors.length > 0" class="invalid-feedback">
                      {{ errors[0] }}
                    </div>
                  </ValidationProvider>
                </div>

                <div class="form-group">
                  <label for="nama_sop">
                    Telepon <span class="text-danger">*</span>
                  </label>

                  <ValidationProvider
                    name="telepon"
                    :rules="validation.helpDesk.telepon.rules"
                    :custom-messages="validation.helpDesk.telepon.message"
                    v-slot="{ errors }"
                    mode="aggressive"
                  >
                    <input
                      v-model="form.helpDesk.telepon"
                      type="text"
                      placeholder="Masukan Nomor Telepon"
                      class="form-control"
                      :class="{ 'is-invalid': errors[0] ? true : false }"
                    />

                    <div v-if="errors.length > 0" class="invalid-feedback">
                      {{ errors[0] }}
                    </div>
                  </ValidationProvider>
                </div>

                <div class="form-group">
                  <label for="nama_sop">
                    Fax <span class="text-danger">*</span>
                  </label>

                  <ValidationProvider
                    name="fax"
                    :rules="validation.helpDesk.fax.rules"
                    :custom-messages="validation.helpDesk.fax.message"
                    v-slot="{ errors }"
                    mode="aggressive"
                  >
                    <input
                      v-model="form.helpDesk.fax"
                      type="text"
                      placeholder="Masukan Fax"
                      class="form-control"
                      :class="{ 'is-invalid': errors[0] ? true : false }"
                    />

                    <div v-if="errors.length > 0" class="invalid-feedback">
                      {{ errors[0] }}
                    </div>
                  </ValidationProvider>
                </div>

                <div class="form-group">
                  <label for="nama_sop">
                    Alamat Email <span class="text-danger">*</span>
                  </label>

                  <ValidationProvider
                    name="email"
                    :rules="validation.helpDesk.email.rules"
                    :custom-messages="validation.helpDesk.email.message"
                    v-slot="{ errors }"
                    mode="aggressive"
                  >
                    <input
                      v-model="form.helpDesk.email"
                      type="text"
                      placeholder="Masukan Alamat Emai;"
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
            @click="resetHelpDeskForm"
          >
            reset
          </CButton>

          <CButton
            color="primary"
            size="sm"
            class="m-2"
            @click="saveHelpDesk"
            :disabled="invalid"
          >
            {{ modal.helpDesk.type }}
          </CButton>
        </template>
      </CModal>
    </ValidationObserver>

    <CModal
      :title="modal.helpDeskDelete.title"
      color="danger"
      :show.sync="modal.helpDeskDelete.show"
    >
      <template v-slot:body-wrapper>
        <div class="modal-body">
          <p>
            Ingin menghapus data
            <strong>{{
              modal.helpDeskDelete.data ? modal.helpDeskDelete.data.nama : null
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
          @click="closeModalDeleteHelpDesk()"
        >
          Cancel
        </CButton>

        <CButton
          color="primary"
          size="sm"
          class="m-2"
          @click="deleteHelpDesk()"
        >
          Hapus
        </CButton>
      </template>
    </CModal>
  </div>
</template>

<script>
export default {
  name: 'SystemHelpDesk',
  props: {
    systemId: {
      type: Number,
      default: null,
    },

    helpDesk: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      modal: {
        helpDesk: {
          show: false,
          title: null,
          type: null,
        },

        helpDeskDelete: {
          show: false,
          title: 'Hapus Data',
          data: null,
        },
      },
      helpDeskForm: 'helpDeskForm',
      form: {
        helpDesk: {
          sis_profil_id: null,
          nama: null,
          telepon: null,
          fax: null,
          email: null,
        },
      },
      validation: {
        helpDesk: {
          sis_profil_id: {
            rules: 'required',
            message: {
              required: 'harus diisi.',
            },
          },
          nama: {
            rules: 'required',
            message: {
              required: 'Nama harus diisi.',
            },
          },
          telepon: {
            rules: 'required|numeric',
            message: {
              required: 'Telepon harus diisi.',
              numeric: 'Format Nomor Telepon harus benar.',
            },
          },
          fax: {
            rules: 'required',
            message: {
              required: 'Fax harus diisi.',
            },
          },
          email: {
            rules: 'required|email',
            message: {
              email: 'Format Email harus benar.',
              required: 'Email harus diisi.',
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
    this.form.helpDesk.sis_profil_id = this.systemId
  },
  methods: {
    refreshData() {
      this.$emit('update-data')
    },

    /**
     * Help Desk
     */
    saveHelpDesk() {
      if (this.modal.helpDesk.type === 'simpan') {
        this.addHelpDesk()
      }

      if (this.modal.helpDesk.type === 'update') {
        this.updateHelpDesk()
      }
    },

    addHelpDesk() {
      const method = 'post'

      const helpDeskForm = this.parseToFormData(method, this.form.helpDesk)

      this.$http({
        method: method,
        url: 'help-desk',
        data: helpDeskForm,
      })
        .then((response) => {
          this.refreshData()
          this.closeModalHelpDesk()
          this.successNotif(response.data.message)
        })
        .catch((error) => {
          this.errorNotif(error)
        })
    },

    updateHelpDesk() {
      const method = 'patch'

      const helpDeskForm = this.parseToFormData(method, this.form.helpDesk)

      this.$http({
        method: 'post',
        url: 'help-desk/' + this.form.helpDesk.id,
        data: helpDeskForm,
      })
        .then((response) => {
          this.refreshData()
          this.closeModalHelpDesk()
          this.successNotif(response.data.message)
        })
        .catch((error) => {
          this.errorNotif(error)
        })
    },

    deleteHelpDesk() {
      this.$http
        .delete('help-desk/' + this.modal.helpDeskDelete.data.id)
        .then((response) => {
          this.refreshData()
          this.closeModalDeleteHelpDesk()
          this.successNotif(response.data.message)
        })
        .catch((error) => {
          this.errorNotif(error)
        })
    },

    closeModalHelpDesk() {
      Object.assign(this.modal.helpDesk, {
        type: null,
        show: false,
      })

      this.$nextTick(() => {
        this.$refs[this.helpDeskForm].reset()
      })

      this.resetHelpDeskForm()
    },

    openModalHelpDesk(type, title, data = null) {
      this.resetHelpDeskForm()

      if (data) {
        Object.assign(this.form.helpDesk, data)
      }

      Object.assign(this.modal.helpDesk, {
        type,
        title,
        show: true,
      })
    },

    resetHelpDeskForm() {
      this.form.helpDesk = {
        sis_profil_id: this.systemId,
        nama: null,
        telepon: null,
        fax: null,
        email: null,
      }

      this.$nextTick(() => {
        this.$refs[this.helpDeskForm].reset()
      })
    },

    openModalDeleteHelpDesk(helpDesk) {
      this.modal.helpDeskDelete.data = helpDesk
      this.modal.helpDeskDelete.show = true
    },

    closeModalDeleteHelpDesk() {
      this.modal.helpDeskDelete.data = null
      this.modal.helpDeskDelete.show = false
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

<style></style>

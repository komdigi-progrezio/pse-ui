<template>
  <div class="mt-2">
    <h5>Perangkat Lunak Utama</h5>
    <hr />
    <button
      class="btn btn-link d-flex"
      @click="openSoftwareModal('simpan', 'Tambah Perangkat Lunak Utama')"
    >
      <CIcon name="cil-plus" class="align-self-center mr-2" />
      <a class="align-self-center">Tambah Perangkat Lunak Utama</a>
    </button>
    <div class="table-responsive">
      <table class="table table-stripped">
        <thead>
          <tr>
            <td>No</td>
            <td>Nama</td>
            <td>Jenis</td>
            <td>Penyedia Perangkat Lunak</td>
            <td>Aksi</td>
          </tr>
        </thead>
        <tbody>
          <template v-if="software.length > 0">
            <tr v-for="(item, index) in software" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ item.nama }}</td>
              <td>{{ getTypeById(item.jenis, 'software') }}</td>
              <td>{{ getVendorById(item.vendor) }}</td>
              <td>
                <CButton
                  color="danger"
                  size="sm"
                  class="mr-2"
                  v-c-tooltip="{
                    content: 'Hapus Perangkat Lunak Utama',
                    placement: 'bottom',
                  }"
                  @click="openSoftwareDeleteModal(item)"
                >
                  <CIcon name="cil-trash" />
                </CButton>
                <CButton
                  color="success"
                  size="sm"
                  v-c-tooltip="{
                    content: 'Edit Perangkat Lunak Utama',
                    placement: 'bottom',
                  }"
                  @click="
                    openSoftwareModal(
                      'update',
                      'Ubah Perangkat Lunak Utama',
                      item
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
              <td colspan="5" class="text-center"> Data Kosong </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>

    <h5>Perangkat Lunak Pendukung</h5>
    <hr />
    <button
      class="btn btn-link d-flex"
      @click="
        openSoftwareToolModal('simpan', 'Tambah Perangkat Lunak Pendukung')
      "
    >
      <CIcon name="cil-plus" class="align-self-center mr-2" />
      <a class="align-self-center">Tambah Perangkat Lunak Pendukung</a>
    </button>
    <div class="table-responsive">
      <table class="table table-stripped">
        <thead>
          <tr>
            <td>No</td>
            <td>Jenis Perangkat Lunak</td>
            <td>Deskripsi</td>
            <td>Aksi</td>
          </tr>
        </thead>
        <tbody>
          <template v-if="softwareTool.length > 0">
            <tr v-for="(item, index) in softwareTool" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ getTypeById(item.jenis, 'softwareTool') }}</td>
              <td>{{ item.deskripsi }}</td>
              <td>
                <CButton
                  color="danger"
                  size="sm"
                  class="mr-2"
                  v-c-tooltip="{
                    content: 'Hapus Perangkat Lunak Pendukung',
                    placement: 'bottom',
                  }"
                  @click="openSoftwareToolDeleteModal(item)"
                >
                  <CIcon name="cil-trash" />
                </CButton>
                <CButton
                  color="success"
                  size="sm"
                  v-c-tooltip="{
                    content: 'Edit Perangkat Lunak Pendukung',
                    placement: 'bottom',
                  }"
                  @click="
                    openSoftwareToolModal(
                      'update',
                      'Ubah Perangkat Lunak Pendukung',
                      item
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
              <td colspan="4" class="text-center"> Data Kosong </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>

    <ValidationObserver v-slot="{ invalid }" :ref="softwareForm">
      <CModal
        :title="modal.software.title"
        :show.sync="modal.software.show"
        color="success"
      >
        <template v-slot:body-wrapper>
          <div class="modal-body">
            <CRow>
              <CCol sm="12">
                <div class="form-group">
                  <label for="">
                    Nama <small class="text-danger">*</small>
                  </label>
                  <ValidationProvider
                    name="nama"
                    :rules="validation.software.nama.rules"
                    :custom-messages="validation.software.nama.message"
                    v-slot="{ errors }"
                    mode="aggressive"
                  >
                    <input
                      type="text"
                      class="form-control"
                      v-model="form.software.nama"
                      :class="{ 'is-invalid': errors[0] ? true : false }"
                    />

                    <div v-if="errors.length > 0" class="invalid-feedback">
                      {{ errors[0] }}
                    </div>
                  </ValidationProvider>
                </div>

                <div class="form-group">
                  <label for="">Jenis</label>

                  <ValidationProvider
                    name="tipe"
                    :rules="validation.software.jenis.rules"
                    :custom-messages="validation.software.jenis.message"
                    v-slot="{ errors }"
                    mode="aggressive"
                  >
                    <select
                      class="form-control"
                      v-model="form.software.jenis"
                      :class="{ 'is-invalid': errors[0] ? true : false }"
                    >
                      <option value="">Pilih Jenis</option>

                      <option
                        v-for="(type, index) in options.software.type"
                        :key="index"
                        :value="type.id"
                      >
                        {{ type.param_value }}
                      </option>
                    </select>

                    <div v-if="errors.length > 0" class="invalid-feedback">
                      {{ errors[0] }}
                    </div>
                  </ValidationProvider>
                </div>

                <div class="form-group">
                  <label for="">Penyedia Perangkat Lunak</label>

                  <ValidationProvider
                    name="vendor"
                    :rules="validation.software.vendor.rules"
                    :custom-messages="validation.software.vendor.message"
                    v-slot="{ errors }"
                    mode="aggressive"
                  >
                    <select
                      class="form-control"
                      v-model="form.software.vendor"
                      :class="{ 'is-invalid': errors[0] ? true : false }"
                    >
                      <option value="">Pilih Penyedia</option>

                      <option
                        v-for="(vendor, index) in options.software.vendor"
                        :key="index"
                        :value="vendor.id"
                      >
                        {{ vendor.param_value }}
                      </option>
                    </select>

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
            @click="closeSoftwareModal"
          >
            Cancel
          </CButton>

          <CButton
            color="primary"
            size="sm"
            class="m-2"
            :disabled="invalid"
            @click="saveSoftware"
          >
            {{ modal.software.type }}
          </CButton>
        </template>
      </CModal>
    </ValidationObserver>

    <ValidationObserver v-slot="{ invalid }" :ref="softwareToolForm">
      <CModal
        :title="modal.softwareTool.title"
        :show.sync="modal.softwareTool.show"
        color="success"
      >
        <template v-slot:body-wrapper>
          <div class="modal-body">
            <CRow>
              <CCol sm="12">
                <div class="form-group">
                  <label for=""> Jenis Perangkat Lunak </label>

                  <ValidationProvider
                    name="jenis"
                    :rules="validation.softwareTool.jenis.rules"
                    :custom-messages="validation.softwareTool.jenis.message"
                    v-slot="{ errors }"
                    mode="aggressive"
                  >
                    <select
                      class="form-control"
                      v-model="form.softwareTool.jenis"
                      :class="{ 'is-invalid': errors[0] ? true : false }"
                    >
                      <option value="">Pilih Jenis</option>

                      <option
                        v-for="(type, index) in options.softwareTool.type"
                        :key="index"
                        :value="type.id"
                      >
                        {{ type.param_value }}
                      </option>
                    </select>

                    <div v-if="errors.length > 0" class="invalid-feedback">
                      {{ errors[0] }}
                    </div>
                  </ValidationProvider>
                </div>

                <div class="form-group">
                  <label for=""> Deskripsi </label>

                  <textarea
                    class="form-control"
                    v-model="form.softwareTool.deskripsi"
                  />
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
            @click="closeSoftwareToolModal"
          >
            Cancel
          </CButton>

          <CButton
            color="primary"
            size="sm"
            class="m-2"
            :disabled="invalid"
            @click="saveSoftwareTool"
          >
            {{ modal.softwareTool.type }}
          </CButton>
        </template>
      </CModal>
    </ValidationObserver>

    <CModal
      :title="modal.softwareDelete.title"
      color="danger"
      :show.sync="modal.softwareDelete.show"
    >
      <template v-slot:body-wrapper>
        <div class="modal-body">
          <p>
            Ingin menghapus data
            <strong>{{
              modal.softwareDelete.data ? modal.softwareDelete.data.nama : ''
            }}</strong>
            ?
          </p>
        </div>
      </template>
      <template v-slot:footer>
        <CButton
          color="secondary"
          size="sm"
          class="m-2"
          @click="closeSoftwareDeleteModal()"
        >
          Cancel
        </CButton>

        <CButton color="primary" size="sm" class="m-2" @click="deleteSoftware">
          Hapus
        </CButton>
      </template>
    </CModal>

    <CModal
      :title="modal.softwareToolDelete.title"
      color="danger"
      :show.sync="modal.softwareToolDelete.show"
    >
      <template v-slot:body-wrapper>
        <div class="modal-body">
          <p> Ingin menghapus data ? </p>
        </div>
      </template>
      <template v-slot:footer>
        <CButton
          color="secondary"
          size="sm"
          class="m-2"
          @click="closeSoftwareToolDeleteModal()"
        >
          Cancel
        </CButton>

        <CButton
          color="primary"
          size="sm"
          class="m-2"
          @click="deleteSoftwareTool"
        >
          Hapus
        </CButton>
      </template>
    </CModal>
  </div>
</template>

<script>
export default {
  name: 'SystemSoftware',
  props: {
    software: {
      type: Array,
      default: () => [],
    },

    softwareTool: {
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
      softwareForm: 'SoftwareForm',
      softwareToolForm: 'SoftwareToolForm',
      modal: {
        software: {
          show: false,
          title: null,
          type: null,
        },

        softwareDelete: {
          show: false,
          title: 'Hapus Perangkat Lunak Utama',
          data: null,
        },

        softwareTool: {
          show: false,
          title: null,
          type: null,
        },

        softwareToolDelete: {
          show: false,
          title: 'Hapus Perangkat Lunak Pendukung',
          data: null,
        },
      },
      form: {
        software: {
          sis_profil_id: null,
          nama: null,
          jenis: '',
          vendor: '',
        },

        softwareTool: {
          sis_profil_id: null,
          jenis: '',
          deskripsi: null,
        },
      },
      options: {
        software: {
          type: [],
          vendor: [],
        },

        softwareTool: {
          type: [],
        },
      },
      validation: {
        software: {
          nama: {
            rules: 'required',
            message: {
              required: 'Nama harus diisi.',
            },
          },

          jenis: {
            rules: 'required',
            message: {
              required: 'Jenis harus diisi.',
            },
          },

          vendor: {
            rules: 'required',
            message: {
              required: 'Vendor harus diisi.',
            },
          },
        },

        softwareTool: {
          jenis: {
            rules: 'required',
            message: {
              required: 'Jenis harus diisi.',
            },
          },
          deskripsi: {
            rules: 'required',
            message: {
              required: 'Deskripsi harus diisi.',
            },
          },
        },
      },
    }
  },
  mounted() {
    this.fetchSoftwareType()
    this.fetchSoftwareVendor()
    this.fetchSoftwareToolType()
  },
  methods: {
    refreshData() {
      this.$emit('update-data')
    },

    fetchSoftwareType() {
      this.$http
        .get('parconfig/category', {
          params: {
            filter: 'category',
            q: 'par_jenis_software',
          },
        })
        .then((response) => {
          this.options.software.type = response.data.data
        })
        .catch((error) => {
          this.errorNotif(error.response.data.message)
        })
    },

    fetchSoftwareVendor() {
      this.$http
        .get('parconfig/category', {
          params: {
            filter: 'category',
            q: 'par_vendor_software',
          },
        })
        .then((response) => {
          this.options.software.vendor = response.data.data
        })
        .catch((error) => {
          this.errorNotif(error.response.data.message)
        })
    },

    fetchSoftwareToolType() {
      this.$http
        .get('parconfig/category', {
          params: {
            filter: 'category',
            q: 'par_jenis_software_pendukung',
          },
        })
        .then((response) => {
          this.options.softwareTool.type = response.data.data
        })
        .catch((error) => {
          this.errorNotif(error.response.data.message)
        })
    },

    getTypeById(id, type) {
      const options = this.options[type].type.filter(
        (type) => type.id === parseInt(id)
      )

      return options.length > 0 ? options[0].param_value : null
    },

    getVendorById(id) {
      const options = this.options.software.vendor.filter(
        (vendor) => vendor.id === parseInt(id)
      )

      return options.length > 0 ? options[0].param_value : null
    },

    /** Modal Section */
    openSoftwareModal(type, title, data = null) {
      this.resetSoftwareForm()

      if (data) {
        data.jenis = parseInt(data.jenis)
        Object.assign(this.form.software, data)
      }

      Object.assign(this.modal.software, {
        type,
        title,
        show: true,
      })
    },

    closeSoftwareModal() {
      this.modal.software = {
        show: false,
        title: null,
        type: null,
      }

      this.resetSoftwareForm()
    },

    openSoftwareToolModal(type, title, data = null) {
      this.resetSoftwareToolForm()

      if (data) {
        data.jenis = parseInt(data.jenis)
        Object.assign(this.form.softwareTool, data)
      }

      Object.assign(this.modal.softwareTool, {
        type,
        title,
        show: true,
      })
    },

    closeSoftwareToolModal() {
      this.modal.softwareTool = {
        show: false,
        title: null,
        type: null,
      }

      this.resetSoftwareToolForm()
    },

    openSoftwareDeleteModal(data) {
      this.modal.softwareDelete.data = data
      this.modal.softwareDelete.show = true
    },

    closeSoftwareDeleteModal() {
      this.modal.softwareDelete.show = false
      this.modal.softwareDelete.data = null
    },

    openSoftwareToolDeleteModal(data) {
      this.modal.softwareToolDelete.data = data
      this.modal.softwareToolDelete.show = true
    },

    closeSoftwareToolDeleteModal() {
      this.modal.softwareToolDelete.show = false
      this.modal.softwareToolDelete.data = null
    },
    /** Modal Section */

    /** Form Section */
    resetSoftwareForm() {
      this.form.software = {
        sis_profil_id: this.systemId,
        nama: null,
        jenis: '',
        vendor: '',
      }

      this.$nextTick(() => {
        this.$refs[this.softwareForm].reset()
      })
    },

    resetSoftwareToolForm() {
      this.form.softwareTool = {
        sis_profil_id: this.systemId,
        jenis: '',
        deskripsi: null,
      }

      this.$nextTick(() => {
        this.$refs[this.softwareToolForm].reset()
      })
    },
    /** Form Section */

    /** Action Section */
    saveSoftware() {
      this.form.software.sis_profil_id = this.systemId

      if (this.modal.software.type === 'simpan') {
        this.addSoftware()
      }

      if (this.modal.software.type === 'update') {
        this.updateSoftware()
      }
    },

    saveSoftwareTool() {
      this.form.softwareTool.sis_profil_id = this.systemId

      if (this.modal.softwareTool.type === 'simpan') {
        this.addSoftwareTool()
      }

      if (this.modal.softwareTool.type === 'update') {
        this.updateSoftwareTool()
      }
    },

    addSoftware() {
      const method = 'post'

      const form = this.parseToFormData(method, this.form.software)

      this.$http({
        method: 'post',
        url: 'softwares',
        data: form,
      })
        .then((response) => {
          this.refreshData()
          this.closeSoftwareModal()
          this.successNotif(response.data.message)
        })
        .catch((error) => {
          this.errorNotif(error)
        })
    },

    updateSoftware() {
      const method = 'patch'

      const form = this.parseToFormData(method, this.form.software)

      this.$http({
        method: 'post',
        url: 'softwares/' + this.form.software.id,
        data: form,
      })
        .then((response) => {
          this.refreshData()
          this.closeSoftwareModal()
          this.successNotif(response.data.message)
        })
        .catch((error) => {
          this.errorNotif(error)
        })
    },

    addSoftwareTool() {
      const method = 'post'

      const form = this.parseToFormData(method, this.form.softwareTool)

      this.$http({
        method: 'post',
        url: 'softwares/tools',
        data: form,
      })
        .then((response) => {
          this.refreshData()
          this.closeSoftwareToolModal()
          this.successNotif(response.data.message)
        })
        .catch((error) => {
          this.errorNotif(error)
        })
    },

    updateSoftwareTool() {
      const method = 'patch'

      const form = this.parseToFormData(method, this.form.softwareTool)

      this.$http({
        method: 'post',
        url: 'softwares/tools/' + this.form.softwareTool.id,
        data: form,
      })
        .then((response) => {
          this.refreshData()
          this.closeSoftwareToolModal()
          this.successNotif(response.data.message)
        })
        .catch((error) => {
          this.errorNotif(error)
        })
    },

    deleteSoftware() {
      this.$http
        .delete('softwares/' + this.modal.softwareDelete.data.id)
        .then((response) => {
          this.refreshData()
          this.closeSoftwareDeleteModal()
          this.successNotif(response.data.message)
        })
        .catch((error) => {
          this.errorNotif(error)
        })
    },

    deleteSoftwareTool() {
      this.$http
        .delete('softwares/tools/' + this.modal.softwareToolDelete.data.id)
        .then((response) => {
          this.refreshData()
          this.closeSoftwareToolDeleteModal()
          this.successNotif(response.data.message)
        })
        .catch((error) => {
          this.errorNotif(error)
        })
    },
    /** Action Section */

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

<style></style>

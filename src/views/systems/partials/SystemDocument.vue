<template>
  <div class="mt-2">
    <h5>Dokumen</h5>

    <hr />

    <button
      v-if="system.approved_publish == true && system.is_locked !== true"
      class="btn btn-link d-flex"
      @click.prevent="openModalDocument('Simpan', 'Tambah Data')"
    >
      <CIcon name="cil-plus" class="align-self-center mr-2" />
      <a href="" class="align-self-center">Tambah Dokumen</a>
    </button>

    <div class="table-responsive classic">
      <table class="table table-stripped">
        <thead>
          <tr>
            <td>No</td>
            <td>Kategori</td>
            <td>Nama Dokumen</td>
            <td>Dokumen</td>
            <td v-if="system.is_locked !== true" colspan="2">Aksi</td>
          </tr>
        </thead>
        <tbody>
          <template v-if="documents.length > 0">
            <tr :key="index" v-for="(document, index) in documents">
              <td>{{ index + 1 }}</td>
              <td>{{ document.nama_category }}</td>
              <td>{{ document.name }}</td>
              <td>
                <a :href="document.url_file" target="_blank">Lihat Dokumen</a>
              </td>
              <td v-if="system.is_locked !== true">
                <CButton
                  color="danger"
                  size="sm"
                  class="mr-2"
                  v-c-tooltip="{
                    content: 'Hapus Dokumen',
                    placement: 'bottom',
                  }"
                  @click="openModalDeleteDocument(document)"
                >
                  <CIcon name="cil-trash" />
                </CButton>

                <CButton
                  color="success"
                  size="sm"
                  v-c-tooltip="{
                    content: 'Edit Dokumen',
                    placement: 'bottom',
                  }"
                  @click="openModalDocument('update', 'Update Data', document)"
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

    <ValidationObserver
      v-if="system.is_locked !== true"
      v-slot="{ invalid }"
      :ref="documentForm"
    >
      <CModal
        :title="modal.document.title"
        :show.sync="modal.document.show"
        color="success"
      >
        <template v-slot:body-wrapper>
          <div class="modal-body">
            <CRow>
              <CCol sm="12">
                <div class="form-group">
                  <label for="name_dasar_hukum">
                    Kategori <span class="text-danger">*</span>
                  </label>

                  <ValidationProvider
                    name="category"
                    :rules="validation.document.category.rules"
                    :custom-messages="validation.document.category.message"
                    v-slot="{ errors }"
                    mode="aggressive"
                  >
                    <select
                      v-model="form.document.category"
                      name="cars"
                      class="custom-select-sm form-control"
                      :class="{ 'is-invalid': errors[0] ? true : false }"
                    >
                      <option value="">Pilih kategori</option>

                      <option
                        v-for="(category, index) in options"
                        :key="index"
                        :value="category.id"
                      >
                        {{
                          category.param_name
                            ? category.param_name
                            : category.param_value
                        }}
                      </option>
                    </select>

                    <div v-if="errors.length > 0" class="invalid-feedback">
                      {{ errors[0] }}
                    </div>
                  </ValidationProvider>
                </div>

                <div class="form-group">
                  <label for="name_dasar_hukum">
                    Nama Dokumen<span class="text-danger">*</span>
                  </label>

                  <ValidationProvider
                    name="name"
                    :rules="validation.document.name.rules"
                    :custom-messages="validation.document.name.message"
                    v-slot="{ errors }"
                    mode="aggressive"
                  >
                    <input
                      v-model="form.document.name"
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
                  <div>
                    <label for="name_dasar_hukum">
                      Upload Dokumen <span class="text-danger">*</span>
                    </label>

                    <input
                      type="file"
                      hidden
                      ref="document"
                      @change="setDocumentToForm"
                      accept="application/pdf"
                    />

                    <ValidationProvider
                      name="dokumen"
                      :rules="validation.document.dokumen.rules"
                      :custom-messages="validation.document.dokumen.message"
                      v-slot="{ errors }"
                      mode="aggressive"
                    >
                      <div class="d-flex">
                        <input
                          class="form-control"
                          readonly
                          v-model="currentFile.name"
                        />

                        <div v-if="errors.length > 0" class="invalid-feedback">
                          {{ errors[0] }}
                        </div>

                        <button
                          class="btn btn-primary ml-3"
                          style="width: 100px"
                          @click="
                            $refs.document.click(),
                              (validation.document.dokumen.touched = !validation
                                .document.dokumen.touched)
                          "
                        >
                          Pilih File
                        </button>
                      </div>
                    </ValidationProvider>
                  </div>

                  <small
                    class="text-danger mx-auto"
                    v-if="
                      validation.document.dokumen.touched &&
                      !validation.document.dokumen.validate.required
                    "
                  >
                    {{ validation.document.dokumen.message.required }}
                  </small>

                  <small
                    class="text-danger mx-auto"
                    v-if="
                      validation.document.dokumen.touched &&
                      !validation.document.dokumen.validate.extension
                    "
                  >
                    {{ validation.document.dokumen.message.extension }}
                  </small>

                  <small
                    class="text-danger mx-auto"
                    v-if="
                      validation.document.dokumen.touched &&
                      !validation.document.dokumen.validate.size
                    "
                  >
                    {{ validation.document.dokumen.message.size }}
                  </small>
                  <small class="text-danger">Max ukuran file upload 3MB</small>
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
            @click="closeModalDocument()"
          >
            Cancel
          </CButton>

          <CButton
            color="primary"
            size="sm"
            class="m-2"
            @click="saveDocument()"
            :disabled="invalid"
          >
            {{ modal.document.type }}
          </CButton>
        </template>
      </CModal>
    </ValidationObserver>

    <CModal
      v-if="system.is_locked !== true"
      :title="modal.documentDelete.title"
      color="danger"
      :show.sync="modal.documentDelete.show"
    >
      <template v-slot:body-wrapper>
        <div class="modal-body">
          <p>
            Ingin menghapus data
            <strong>{{
              modal.documentDelete.data ? modal.documentDelete.data.name : null
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
          @click="closeModalDeleteDocument()"
        >
          Cancel
        </CButton>

        <CButton
          color="primary"
          size="sm"
          class="m-2"
          @click="deleteDocument()"
        >
          Hapus
        </CButton>
      </template>
    </CModal>
  </div>
</template>

<script>
import DOMPurify from 'dompurify'

export default {
  name: 'SystemDocument',
  props: {
    system: {
      type: Object,
      required: true,
      default: () => {},
    },
    documents: {
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
      currentFile: {
        name: null,
      },
      options: null,
      form: {
        document: {
          sis_profil_id: null,
          name: null,
          dokumen: null,
          category: '',
        },
      },
      modal: {
        document: {
          show: false,
          title: null,
          type: null,
        },

        documentDelete: {
          show: false,
          title: 'Hapus Data',
          data: null,
        },
      },
      documentForm: 'documentForm',
      validation: {
        document: {
          name: {
            rules: 'required',
            message: {
              required: 'Nama harus diisi.',
            },
          },
          dokumen: {
            touched: false,
            rules: 'required',
            validate: {
              required: true,
              size: true,
              extension: true,
            },
            message: {
              required: 'Dokumen harus diisi.',
              size: 'Ukuran dokumen maksimal 10mb.',
              extension: 'Format dokumen harus PDF.',
            },
          },
          category: {
            rules: 'required',
            message: {
              required: 'Kategori harus diisi.',
            },
          },
        },
      },
    }
  },
  mounted() {
    this.form.document.sis_profil_id = this.systemId
    this.fetchOptions()
  },
  methods: {
    refreshData() {
      this.$emit('update-data')
    },

    handleInput() {
      const inputValue = event.target.value
      // Use DOMPurify to sanitize the input
      const sanitizedValue = DOMPurify.sanitize(inputValue)
      this.input = sanitizedValue
    },

    fetchOptions() {
      this.$http
        .get('parconfig/category', {
          params: {
            filter: 'category',
            q: 'kategori_dokumen',
          },
        })
        .then((response) => {
          this.options = response.data.data
        })
        .catch((error) => {
          this.errorNotif(error.response.data.message)
        })
    },

    setDocumentToForm(event) {
      const input = event.target
      const files = input.files[0]

      if (this.isValidExt(files) && this.isValidSize(files)) {
        this.form.document.dokumen = files
        this.currentFile.name = files.name
      }
    },

    isValidExt(document) {
      const validExt = ['PDF']
      const isValid = validExt.includes(
        document.name.split('.').pop().toUpperCase()
      )

      if (!isValid) {
        this.validation.document.dokumen.validate.extension = false
      } else {
        this.validation.document.dokumen.validate.extension = true
      }

      return isValid
    },

    isValidSize(document) {
      let isValid = false

      if (document.size >= 10000000) {
        this.validation.document.dokumen.validate.size = false
        isValid = false
      } else {
        this.validation.document.dokumen.validate.size = true
        isValid = true
      }

      return isValid
    },

    isSanitize(document) {
      return DOMPurify.sanitize(document, { ALLOWED_TAGS: [] })
    },

    /**
     * Document
     */
    saveDocument() {
      this.form.document.sis_profil_id = this.systemId

      if (this.modal.document.type === 'Simpan') {
        this.addDocument()
      }

      if (this.modal.document.type === 'Update') {
        this.updateDocument()
      }
    },

    addDocument() {
      const method = 'post'
      const beforeName = this.form.document.name
      //Sanitize
      this.form.document.name = this.isSanitize(this.form.document.name)
      const afterName = this.form.document.name

      if (beforeName == afterName) {
        const documentForm = this.parseToFormData(method, this.form.document)

        this.$http({
          method: method,
          url: 'document',
          data: documentForm,
        })
          .then((response) => {
            this.refreshData()
            this.closeModalDocument()
            this.successNotif(response.data.message)
          })
          .catch((error) => {
            this.errorNotif(error)
          })
      } else {
        this.errorNotif('404')
      }
    },

    updateDocument() {
      const method = 'patch'

      this.form.document.name = this.isSanitize(this.form.document.name)
      const documentForm = this.parseToFormData(method, this.form.document)

      this.$http({
        method: 'post',
        url: 'document/' + this.form.document.id,
        data: documentForm,
      })
        .then((response) => {
          this.refreshData()
          this.closeModalDocument()
          this.successNotif(response.data.message)
        })
        .catch((error) => {
          this.errorNotif(error)
        })
    },

    deleteDocument() {
      this.$http
        .delete('document/' + this.modal.documentDelete.data.id)
        .then((response) => {
          this.refreshData()
          this.closeModalDeleteDocument()
          this.successNotif(response.data.message)
        })
        .catch((error) => {
          this.errorNotif(error)
        })
    },

    closeModalDocument() {
      Object.assign(this.modal.document, {
        type: null,
        show: false,
      })

      this.$nextTick(() => {
        this.$refs[this.documentForm].reset()
      })

      this.resetDocumentForm()
    },

    openModalDocument(type, title, data = null) {
      this.resetDocumentForm()

      this.currentFile = {
        name: null,
      }

      if (data) {
        Object.assign(this.form.document, data)
      }

      Object.assign(this.modal.document, {
        type,
        title,
        show: true,
      })

      this.currentFile.name = data ? data.dokumen : null
    },

    resetDocumentForm() {
      Object.assign(this.form.document, {
        name: null,
        dokumen: null,
        category: '',
      })

      this.$nextTick(() => {
        this.$refs[this.documentForm].reset()
      })
    },

    openModalDeleteDocument(document) {
      this.modal.documentDelete.data = document
      this.modal.documentDelete.show = true
    },

    closeModalDeleteDocument() {
      this.modal.documentDelete.data = null
      this.modal.documentDelete.show = false
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

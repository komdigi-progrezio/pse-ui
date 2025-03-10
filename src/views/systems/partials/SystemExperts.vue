<template>
  <div class="mt-2">
    <h5>Ketersediaan Tenaga Ahli</h5>
    <hr />
    <button
      v-if="system.approved_publish == true && system.is_locked !== true"
      class="btn btn-link d-flex"
      @click.prevent="addAvailabilityOfExperts"
    >
      <CIcon name="cil-plus" class="align-self-center mr-2" />
      <a href="" class="align-self-center">Tambah Ketersediaan Tenaga Ahli</a>
    </button>
    <div class="table-responsive classic">
      <table class="table table-stripped">
        <thead>
          <tr>
            <td>No</td>
            <td>Jenis</td>
            <td>Jumlah</td>
            <td>Kompetensi</td>
            <td v-if="system.is_locked !== true" colspan="2">Aksi</td>
          </tr>
        </thead>
        <tbody>
          <template v-if="availabilityOfExperts.length > 0">
            <tr
              v-for="(value, index) in availabilityOfExperts"
              :key="`availability-of-expert-${index}`"
            >
              <td>{{ index + 1 }}</td>
              <td>{{ value.name_jenis }}</td>
              <td>{{ value.jumlah_personil }}</td>
              <td>{{ value.kompetensi }}</td>
              <td v-if="system.is_locked !== true">
                <CButton
                  color="danger"
                  size="sm"
                  class="mr-2"
                  v-c-tooltip="{
                    content: 'Hapus Ketersediaan Tenaga Ahli',
                    placement: 'bottom',
                  }"
                  @click="destroyAvailabilityOfExperts(value)"
                >
                  <CIcon name="cil-trash" />
                </CButton>
                <CButton
                  color="success"
                  size="sm"
                  v-c-tooltip="{
                    content: 'Edit Ketersediaan Tenaga Ahli',
                    placement: 'bottom',
                  }"
                  @click="editAvailabilityOfExperts(value)"
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
    <h5>Tenaga Ahli Yang Dibutuhkan</h5>
    <hr />
    <button
      v-if="system.approved_publish == true && system.is_locked !== true"
      class="btn btn-link d-flex"
      @click.prevent="addExpertsRequired"
    >
      <CIcon name="cil-plus" class="align-self-center mr-2" />
      <a href="" class="align-self-center">Tambah Tenaga Ahli</a>
    </button>
    <div class="table-responsive classic">
      <table class="table table-stripped">
        <thead>
          <tr>
            <td>No</td>
            <td>Jenis</td>
            <td>Jumlah</td>
            <td>Status</td>
            <td v-if="system.is_locked !== true" colspan="2">Aksi</td>
          </tr>
        </thead>
        <tbody>
          <template v-if="expertsRequired.length > 0">
            <tr
              v-for="(value, index) in expertsRequired"
              :key="`experts-required-${index}`"
            >
              <td>{{ index + 1 }}</td>
              <td>{{ value.nama_jenis }}</td>
              <td>{{ value.jumlah_personil }}</td>
              <td>{{ value.nama_status }}</td>
              <td v-if="system.is_locked !== true">
                <CButton
                  color="danger"
                  size="sm"
                  class="mr-2"
                  v-c-tooltip="{
                    content: 'Hapus Tenaga Ahli',
                    placement: 'bottom',
                  }"
                  @click="destroyExpertsRequired(value)"
                >
                  <CIcon name="cil-trash" />
                </CButton>
                <CButton
                  color="success"
                  size="sm"
                  v-c-tooltip="{
                    content: 'Edit Tenaga Ahli',
                    placement: 'bottom',
                  }"
                  @click="editExpertsRequired(value)"
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
    <CModal
      v-if="system.is_locked !== true"
      :title="modal.delete.title"
      :color="modal.delete.color"
      :show.sync="modal.delete.showModal"
    >
      <template v-slot:body-wrapper>
        <div class="modal-body">
          <p>
            {{ modal.delete.message }}
            <strong>{{ modal.delete.data }}</strong
            >?
          </p>
        </div>
      </template>
      <template v-slot:footer>
        <CButton
          color="secondary"
          size="sm"
          class="m-2"
          @click="closeModalDelete"
        >
          Cancel
        </CButton>
        <CButton color="primary" size="sm" class="m-2" @click="submitDelete">
          {{ modal.delete.labelButton }}
        </CButton>
      </template>
    </CModal>
    <ValidationObserver
      v-if="system.is_locked !== true"
      v-slot="{ invalid }"
      ref="form_availability_of_experts"
    >
      <CModal
        :title="modal.availabilityOfExperts.title"
        :color="modal.availabilityOfExperts.color"
        :show.sync="modal.availabilityOfExperts.showModal"
      >
        <template v-slot:body-wrapper>
          <div class="modal-body">
            <CRow>
              <CCol sm="12">
                <div class="form-group">
                  <label for="jenis">Jenis<small class="text-danger">*</small></label>
                  <ValidationProvider
                    name="Jenis"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <select
                      v-model="forms.availabilityOfExperts.jenis"
                      class="form-control"
                      :class="{
                        'is-invalid':
                          errors.length > 0 ||
                          errorValidations.availabilityOfExperts.jenis.length >
                            0,
                      }"
                    >
                      <option value="">Pilih Jenis</option>
                      <option
                        v-for="(value,
                        index) in dataSelect.typeAvailabilityOfExperts"
                        :value="value.id"
                        :key="`availbility-of-experts-${index}`"
                      >
                        {{ value.param_value }}
                      </option>
                    </select>
                    <div v-if="errors.length > 0" class="invalid-feedback">
                      {{ errors[0] }}
                    </div>
                  </ValidationProvider>
                  <message
                    :messages="errorValidations.availabilityOfExperts.jenis"
                  />
                </div>
              </CCol>
              <CCol sm="12">
                <div class="form-group">
                  <label for="jumlah_personil">Jumlah Personil<small class="text-danger">*</small></label>
                  <ValidationProvider
                    name="Jumlah Personil"
                    rules="required|numeric"
                    v-slot="{ errors }"
                  >
                    <input
                      v-model="forms.availabilityOfExperts.jumlah_personil"
                      type="number"
                      name="name"
                      placeholder="Masukan Jumlah Personil"
                      class="form-control"
                      :class="{
                        'is-invalid':
                          errors.length > 0 ||
                          errorValidations.availabilityOfExperts.jumlah_personil
                            .length > 0,
                      }"
                      @blur="
                        errorValidations.availabilityOfExperts.jumlah_personil = []
                      "
                    />
                    <div v-if="errors.length > 0" class="invalid-feedback">
                      {{ errors[0] }}
                    </div>
                  </ValidationProvider>
                </div>
                <message
                  :messages="
                    errorValidations.availabilityOfExperts.jumlah_personil
                  "
                />
              </CCol>
              <CCol sm="12">
                <div class="form-group">
                  <label for="kompetensi">Kompetensi<small class="text-danger">*</small></label>
                  <ValidationProvider
                    name="Kompetensi"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <textarea
                      v-model="forms.availabilityOfExperts.kompetensi"
                      cols="30"
                      rows="10"
                      class="form-control"
                      :class="{
                        'is-invalid':
                          errors.length > 0 ||
                          errorValidations.availabilityOfExperts.kompetensi
                            .length > 0,
                      }"
                    ></textarea>
                    <div v-if="errors.length > 0" class="invalid-feedback">
                      {{ errors[0] }}
                    </div>
                  </ValidationProvider>
                  <message
                    :messages="
                      errorValidations.availabilityOfExperts.kompetensi
                    "
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
            @click="closeModalAvailabilityOfExperts"
          >
            Cancel
          </CButton>
          <CButton
            color="primary"
            size="sm"
            class="m-2"
            @click="submitAvailabilityOfExperts"
            :disabled="invalid"
          >
            {{ modal.availabilityOfExperts.labelButton }}
          </CButton>
        </template>
      </CModal>
    </ValidationObserver>
    <ValidationObserver
      v-if="system.is_locked !== true"
      v-slot="{ invalid }"
      ref="form_experts_required"
    >
      <CModal
        :title="modal.expertsRequired.title"
        :color="modal.expertsRequired.color"
        :show.sync="modal.expertsRequired.showModal"
      >
        <template v-slot:body-wrapper>
          <div class="modal-body">
            <CRow>
              <CCol sm="12">
                <div class="form-group">
                  <label for="jenis">Jenis</label>
                  <ValidationProvider
                    name="Jenis"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <select
                      v-model="forms.expertsRequired.jenis"
                      class="form-control"
                      :class="{
                        'is-invalid':
                          errors.length > 0 ||
                          errorValidations.expertsRequired.jenis.length > 0,
                      }"
                    >
                      <option value="">Pilih Jenis</option>
                      <option
                        v-for="(value,
                        index) in dataSelect.typeAvailabilityOfExperts"
                        :value="value.id"
                        :key="`availbility-of-experts-${index}`"
                      >
                        {{ value.param_value }}
                      </option>
                    </select>
                    <div v-if="errors.length > 0" class="invalid-feedback">
                      {{ errors[0] }}
                    </div>
                  </ValidationProvider>
                  <message :messages="errorValidations.expertsRequired.jenis" />
                </div>
              </CCol>
              <CCol sm="12">
                <div class="form-group">
                  <label for="jumlah_personil">Jumlah Personil</label>
                  <ValidationProvider
                    name="Jumlah Personil"
                    rules="required|numeric"
                    v-slot="{ errors }"
                  >
                    <input
                      v-model="forms.expertsRequired.jumlah_personil"
                      type="number"
                      name="name"
                      placeholder="Masukan Jumlah Personil"
                      class="form-control"
                      :class="{
                        'is-invalid':
                          errors.length > 0 ||
                          errorValidations.expertsRequired.jumlah_personil
                            .length > 0,
                      }"
                      @blur="
                        errorValidations.expertsRequired.jumlah_personil = []
                      "
                    />
                    <div v-if="errors.length > 0" class="invalid-feedback">
                      {{ errors[0] }}
                    </div>
                  </ValidationProvider>
                </div>
                <message
                  :messages="errorValidations.expertsRequired.jumlah_personil"
                />
              </CCol>
              <CCol sm="12">
                <div class="form-group">
                  <label for="status">Status</label>
                  <ValidationProvider
                    name="Status"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <select
                      v-model="forms.expertsRequired.status"
                      class="form-control"
                      :class="{
                        'is-invalid':
                          errors.length > 0 ||
                          errorValidations.expertsRequired.status.length > 0,
                      }"
                    >
                      <option value="">Pilih Status</option>
                      <option
                        v-for="(value,
                        index) in dataSelect.statusAvailabilityOfExperts"
                        :value="value.id"
                        :key="`availbility-of-experts-${index}`"
                      >
                        {{ value.param_value }}
                      </option>
                    </select>
                    <div v-if="errors.length > 0" class="invalid-feedback">
                      {{ errors[0] }}
                    </div>
                  </ValidationProvider>
                  <message
                    :messages="errorValidations.expertsRequired.status"
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
            @click="closeModalExpertsRequired"
          >
            Cancel
          </CButton>
          <CButton
            color="primary"
            size="sm"
            class="m-2"
            @click="submitExpertsRequired"
            :disabled="invalid"
          >
            {{ modal.expertsRequired.labelButton }}
          </CButton>
        </template>
      </CModal>
    </ValidationObserver>
  </div>
</template>

<script>
export default {
  name: 'SystemExperts',
  props: {
    system: {
      type: Object,
      required: true,
      default: () => {},
    },
    availabilityOfExperts: {
      type: Array,
      required: true,
      default: () => [],
    },
    expertsRequired: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  data() {
    return {
      dataSelect: {
        typeAvailabilityOfExperts: [],
        statusAvailabilityOfExperts: [],
      },
      forms: {
        expertsRequired: {
          jenis: null,
          jumlah_personil: null,
          status: null,
        },
        availabilityOfExperts: {
          jenis: null,
          jumlah_personil: null,
          kompetensi: null,
        },
      },
      modal: {
        delete: {
          showModal: false,
          title: null,
          color: null,
          message: null,
          labelButton: null,
          uniqueId: null,
          url: null,
        },
        availabilityOfExperts: {
          showModal: false,
          title: null,
          color: null,
          labelButton: null,
          method: null,
          url: null,
        },
        expertsRequired: {
          showModal: false,
          title: null,
          color: null,
          labelButton: null,
          method: null,
          url: null,
        },
      },
      errorValidations: {
        expertsRequired: {
          jenis: [],
          jumlah_personil: [],
          status: [],
        },
        availabilityOfExperts: {
          kompetensi: [],
          jenis: [],
          jumlah_personil: [],
        },
      },
    }
  },
  created() {
    this.fetchStatusAvailabilityOfExperts()
    this.fetchTypeAvailabilityOfExperts()
  },
  methods: {
    //  Tenaga Ahli
    clearModalExpertsRequired() {
      this.modal.expertsRequired.title = null
      this.modal.expertsRequired.color = null
      this.modal.expertsRequired.labelButton = null
      this.modal.expertsRequired.method = null
    },
    closeModalExpertsRequired() {
      this.modal.expertsRequired.showModal = false
      this.clearFormExpertsRequired()
      this.clearModalExpertsRequired()
    },
    clearFormExpertsRequired() {
      this.forms.expertsRequired.id = null
      this.forms.expertsRequired.sis_profil_id = this.$route.params.id
      this.forms.expertsRequired.jenis = ''
      this.forms.expertsRequired.jumlah_personil = null
      this.forms.expertsRequired.status = ''
    },
    addExpertsRequired() {
      this.clearFormExpertsRequired()
      this.modal.expertsRequired.showModal = true
      this.modal.expertsRequired.title = 'Tambah Data'
      this.modal.expertsRequired.color = 'success'
      this.modal.expertsRequired.labelButton = 'Simpan'
      this.modal.expertsRequired.method = 'post'
    },
    submitExpertsRequired() {
      const url = '/experts-required'
      const formData = new FormData()
      let urlAction = null
      if (this.modal.expertsRequired.method === 'patch') {
        urlAction = `${url}/${this.forms.expertsRequired.id}`
        formData.append('_method', 'patch')
      } else {
        urlAction = url
        formData.append('_method', 'POST')
      }
      const forMapData = Object.entries(this.forms.expertsRequired)
      forMapData.forEach((value) => {
        if (Array.isArray(value[1])) {
          for (let index = 0; index < value[1].length; index++) {
            formData.append(`${value[0]}[${index}]`, value[1][index])
          }
        } else {
          formData.append(value[0], value[1] === null ? [] : value[1])
        }
      })
      this.errorValidations.expertsRequired.jenis = []
      this.errorValidations.expertsRequired.jumlah_personil = []
      this.errorValidations.expertsRequired.status = []

      this.$http({
        method: 'post',
        url: urlAction,
        data: formData,
      })
        .then((response) => {
          this.$emit('update-data')
          this.closeModalExpertsRequired()
          this.$toastr.s(response.data.message, 'Pemberitahuan')
          this.$nextTick(() => {
            this.$refs.form_availability_of_experts.reset()
          })
        })
        .catch((error) => {
          if (error.response.status === 422) {
            this.$toastr.e('Silahkan Cek Form Anda Kembali', 'Pemberitahuan')
            this.errorValidations.expertsRequired.jenis =
              typeof error.response.data.errors.jenis === 'undefined'
                ? []
                : error.response.data.errors.jenis
            this.errorValidations.expertsRequired.jumlah_personil =
              typeof error.response.data.errors.jumlah_personil === 'undefined'
                ? []
                : error.response.data.errors.jumlah_personil
            this.errorValidations.expertsRequired.status =
              typeof error.response.data.errors.status === 'undefined'
                ? []
                : error.response.data.errors.status
          } else if (error.response.status === 500) {
            this.$toastr.e('Ada Kesalahan dari Server', 'Pemberitahuan')
          } else {
            this.$toastr.e(error.response.data.message, 'Pemberitahuan')
          }
        })
    },
    destroyExpertsRequired(item) {
      this.modal.delete.showModal = true
      this.modal.delete.title = 'Hapus Data'
      this.modal.delete.color = 'danger'
      this.modal.delete.data = item.nama_jenis
      this.modal.delete.uniqueId = item.id
      this.modal.delete.message = 'Ingin Menghapus Data'
      this.modal.delete.labelButton = 'Hapus'
      this.modal.delete.url = 'experts-required'
    },
    editExpertsRequired(item) {
      this.forms.expertsRequired.id = item.id
      this.forms.expertsRequired.jenis = item.jenis
      this.forms.expertsRequired.jumlah_personil = item.jumlah_personil
      this.forms.expertsRequired.status = item.status

      this.modal.expertsRequired.showModal = true
      this.modal.expertsRequired.title = 'Update Data'
      this.modal.expertsRequired.color = 'success'
      this.modal.expertsRequired.labelButton = 'Update'
      this.modal.expertsRequired.method = 'patch'
    },
    //  Ketersediaan Tenaga Ahli
    clearModalAvailabilityOfExperts() {
      this.modal.availabilityOfExperts.title = null
      this.modal.availabilityOfExperts.color = null
      this.modal.availabilityOfExperts.labelButton = null
      this.modal.availabilityOfExperts.method = null
    },
    closeModalAvailabilityOfExperts() {
      this.modal.availabilityOfExperts.showModal = false
      this.clearFormAvailabilityOfExperts()
      this.clearModalAvailabilityOfExperts()
    },
    clearFormAvailabilityOfExperts() {
      this.forms.availabilityOfExperts.id = null
      this.forms.availabilityOfExperts.sis_profil_id = this.$route.params.id
      this.forms.availabilityOfExperts.jenis = ''
      this.forms.availabilityOfExperts.jumlah_personil = null
      this.forms.availabilityOfExperts.kompetensi = ''
    },
    addAvailabilityOfExperts() {
      this.clearFormAvailabilityOfExperts()
      this.modal.availabilityOfExperts.showModal = true
      this.modal.availabilityOfExperts.title = 'Tambah Data'
      this.modal.availabilityOfExperts.color = 'success'
      this.modal.availabilityOfExperts.labelButton = 'Simpan'
      this.modal.availabilityOfExperts.method = 'post'
    },
    submitAvailabilityOfExperts() {
      const url = '/availability-of-experts'
      const formData = new FormData()
      let urlAction = null
      if (this.modal.availabilityOfExperts.method === 'patch') {
        urlAction = `${url}/${this.forms.availabilityOfExperts.id}`
        formData.append('_method', 'patch')
      } else {
        urlAction = url
        formData.append('_method', 'POST')
      }
      const forMapData = Object.entries(this.forms.availabilityOfExperts)
      forMapData.forEach((value) => {
        if (Array.isArray(value[1])) {
          for (let index = 0; index < value[1].length; index++) {
            formData.append(`${value[0]}[${index}]`, value[1][index])
          }
        } else {
          formData.append(value[0], value[1] === null ? [] : value[1])
        }
      })
      this.errorValidations.availabilityOfExperts.jenis = []
      this.errorValidations.availabilityOfExperts.jumlah_personil = []
      this.errorValidations.availabilityOfExperts.kompetensi = []

      this.$http({
        method: 'post',
        url: urlAction,
        data: formData,
      })
        .then((response) => {
          this.$emit('update-data')
          this.closeModalAvailabilityOfExperts()
          this.$toastr.s(response.data.message, 'Pemberitahuan')
          this.$nextTick(() => {
            this.$refs.form_experts_required.reset()
          })
        })
        .catch((error) => {
          if (error.response.status === 422) {
            this.$toastr.e('Silahkan Cek Form Anda Kembali', 'Pemberitahuan')
            this.errorValidations.availabilityOfExperts.jenis =
              typeof error.response.data.errors.jenis === 'undefined'
                ? []
                : error.response.data.errors.jenis
            this.errorValidations.availabilityOfExperts.jumlah_personil =
              typeof error.response.data.errors.jumlah_personil === 'undefined'
                ? []
                : error.response.data.errors.jumlah_personil
            this.errorValidations.availabilityOfExperts.kompetensi =
              typeof error.response.data.errors.kompetensi === 'undefined'
                ? []
                : error.response.data.errors.kompetensi
          } else if (error.response.status === 500) {
            this.$toastr.e('Ada Kesalahan dari Server', 'Pemberitahuan')
          } else {
            this.$toastr.e(error.response.data.message, 'Pemberitahuan')
          }
        })
    },
    destroyAvailabilityOfExperts(item) {
      this.modal.delete.showModal = true
      this.modal.delete.title = 'Hapus Data'
      this.modal.delete.color = 'danger'
      this.modal.delete.data = item.name_jenis
      this.modal.delete.uniqueId = item.id
      this.modal.delete.message = 'Ingin Menghapus Data'
      this.modal.delete.labelButton = 'Hapus'
      this.modal.delete.url = 'availability-of-experts'
    },
    editAvailabilityOfExperts(item) {
      this.forms.availabilityOfExperts.id = item.id
      this.forms.availabilityOfExperts.jenis = item.jenis
      this.forms.availabilityOfExperts.jumlah_personil = item.jumlah_personil
      this.forms.availabilityOfExperts.kompetensi = item.kompetensi

      this.modal.availabilityOfExperts.showModal = true
      this.modal.availabilityOfExperts.title = 'Update Data'
      this.modal.availabilityOfExperts.color = 'success'
      this.modal.availabilityOfExperts.labelButton = 'Update'
      this.modal.availabilityOfExperts.method = 'patch'
    },
    //  Fetch Status Ketersediaan Tenaga Ahli
    fetchStatusAvailabilityOfExperts() {
      this.$http
        .get('parconfig/category', {
          params: {
            filter: 'category',
            q: 'par_status_tenaga_ahli',
          },
        })
        .then((response) => {
          this.dataSelect.statusAvailabilityOfExperts = response.data.data
        })
        .catch((error) => {
          if (error.response.status === 500) {
            this.$toastr.e('Ada Kesalahan dari Server', 'Pemberitahuan')
          } else {
            this.$toastr.e(error.response.data.message, 'Pemberitahuan')
          }
        })
    },
    //  Fetch Type Ketersediaan Tenaga Ahli
    fetchTypeAvailabilityOfExperts() {
      this.$http
        .get('parconfig/category', {
          params: {
            filter: 'category',
            q: 'par_jenis_tenaga_ahli',
          },
        })
        .then((response) => {
          this.dataSelect.typeAvailabilityOfExperts = response.data.data
        })
        .catch((error) => {
          if (error.response.status === 500) {
            this.$toastr.e('Ada Kesalahan dari Server', 'Pemberitahuan')
          } else {
            this.$toastr.e(error.response.data.message, 'Pemberitahuan')
          }
        })
    },
    //  Delete
    submitDelete() {
      this.$http
        .delete(`${this.modal.delete.url}/${this.modal.delete.uniqueId}`)
        .then((response) => {
          this.$emit('update-data')
          this.$toastr.s(response.data.message, 'Pemberitahuan')
          this.closeModalDelete()
        })
        .catch((error) => {
          if (error.response.status === 500) {
            this.$toastr.e('Ada Kesalahan dari Server', 'Pemberitahuan')
          } else {
            this.$toastr.e(error.response.data.message, 'Pemberitahuan')
          }
        })
    },
    closeModalDelete() {
      this.modal.delete.showModal = false
      this.clearModalDelete()
    },
    clearModalDelete() {
      this.modal.delete.title = null
      this.modal.delete.color = null
      this.modal.delete.data = null
      this.modal.delete.uniqueId = null
      this.modal.delete.message = null
      this.modal.delete.labelButton = null
      this.modal.delete.url = null
    },
  },
}
</script>

<style></style>

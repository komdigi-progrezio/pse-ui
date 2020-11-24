<template>
  <div class="mt-2">
    <a :to="`/admin/systems/${this.$route.params.id}/edit`"
      >Perbaharui Profil Layanan</a
    >
    <div class="table-responsive">
      <table class="table table-stripped">
        <tbody>
          <tr class="row-profile-service">
            <td colspan="2">Profil Layanan</td>
          </tr>
          <tr>
            <td>Nama Internal</td>
            <td>{{ system.nama_internal }}</td>
          </tr>
          <tr>
            <td>Nama Eksternal</td>
            <td>{{ system.nama_eksternal }}</td>
          </tr>
          <tr>
            <td>Keterangan</td>
            <td>{{ system.deskripsi }}</td>
          </tr>
          <tr>
            <td>Kategori Sistem Elektronik</td>
            <td>
              {{ system.name_sifat_khusus }}
              <span v-if="document.length > 0"> (Ada Dokumen) </span>
              <span v-else> (Tidak Ada Dokumen) </span>
            </td>
          </tr>
          <tr>
            <td>Kategori Akses</td>
            <td>{{ system.kategori_akses }}</td>
          </tr>
          <tr>
            <td
              >Bersedia untuk dipublikasikan melalui portal layanan publik?</td
            >
            <td>{{ system.name_publish }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <h5>Fungsi Utama</h5>
    <hr />
    <a href="" @click.prevent="addMainFunction">Tambah Fungsi</a>
    <div class="table-responsive">
      <table class="table table-stripped">
        <thead>
          <tr>
            <td>No</td>
            <td>Fungsi Sistem</td>
            <td>Keterangan</td>
            <td>Aksi</td>
          </tr>
        </thead>
        <tbody>
          <template v-if="specialFunction.length > 0">
            <tr
              v-for="(value, index) in specialFunction"
              :key="`special-function-${index}`"
            >
              <td>{{ index + 1 }}</td>
              <td>{{ value.fungsi_sistem }}</td>
              <td>{{ value.keterangan }}</td>
              <td>
                <CButton
                  color="danger"
                  size="sm"
                  class="mr-2"
                  v-c-tooltip="{
                    content: 'Hapus Fungsi Utama',
                    placement: 'bottom',
                  }"
                  @click="destroyMainFunction(value)"
                >
                  <CIcon name="cil-trash" />
                </CButton>
                <CButton
                  color="success"
                  size="sm"
                  v-c-tooltip="{
                    content: 'Edit Fungsi Utama',
                    placement: 'bottom',
                  }"
                  @click="editMainFunction(value)"
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
    <h5>Ruang Lingkup</h5>
    <hr />
    <a href="" @click.prevent="addScope">Tambah Ruang Lingkup</a>
    <div class="table-responsive">
      <table class="table table-stripped">
        <thead>
          <tr>
            <td>No</td>
            <td>Ruang Lingkup</td>
            <td>Aksi</td>
          </tr>
        </thead>
        <tbody>
          <template v-if="scope.length > 0">
            <tr v-for="(value, index) in scope" :key="`scope-${index}`">
              <td>{{ index + 1 }}</td>
              <td>{{ value.relation.scope.param_value }}</td>
              <td>
                <CButton
                  color="danger"
                  size="sm"
                  class="mr-2"
                  v-c-tooltip="{
                    content: 'Hapus Ruang Lingkup',
                    placement: 'bottom',
                  }"
                  @click="destroyScope(value)"
                >
                  <CIcon name="cil-trash" />
                </CButton>
                <CButton
                  color="success"
                  size="sm"
                  v-c-tooltip="{
                    content: 'Edit Ruang Lingkup',
                    placement: 'bottom',
                  }"
                  @click="editScope(value)"
                >
                  <CIcon name="cil-pencil" />
                </CButton>
              </td>
            </tr>
          </template>
          <template v-else>
            <tr>
              <td colspan="3" class="text-center">Data Kosong</td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
    <h5>Jenis Layanan</h5>
    <hr />
    <a href="" @click.prevent="">Tambah Jenis Layanan</a>
    <div class="table-responsive">
      <table class="table table-stripped">
        <thead>
          <tr>
            <td>No</td>
            <td>Jenis Layanan</td>
            <td>Keterangan</td>
            <td>Aksi</td>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(value, index) in kindOfService"
            :key="`kind-of-service-${index}`"
          >
            <td>{{ index + 1 }}</td>
            <td>{{ value.jenis_layanan }}</td>
            <td>{{ value.keterangan }}</td>
            <td>
              <CButton
                color="danger"
                size="sm"
                class="mr-2"
                v-c-tooltip="{
                  content: 'Hapus Jenis Layanan',
                  placement: 'bottom',
                }"
              >
                <CIcon name="cil-trash" />
              </CButton>
              <CButton
                color="success"
                size="sm"
                v-c-tooltip="{
                  content: 'Edit Jenis Layanan',
                  placement: 'bottom',
                }"
              >
                <CIcon name="cil-pencil" />
              </CButton>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <h5>Sistem Pengamanan</h5>
    <hr />
    <a href="" @click.prevent="">Tambah Sistem Pengamanan</a>
    <div class="table-responsive">
      <table class="table table-stripped">
        <thead>
          <tr>
            <td>No</td>
            <td>Nama Sistem</td>
            <td>Keterangan</td>
            <td>Aksi</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Data Dummy</td>
            <td>Data Dummy</td>
            <td>
              <CButton
                color="danger"
                size="sm"
                class="mr-2"
                v-c-tooltip="{
                  content: 'Hapus Sistem Pengamanan',
                  placement: 'bottom',
                }"
              >
                <CIcon name="cil-trash" />
              </CButton>
              <CButton
                color="success"
                size="sm"
                v-c-tooltip="{
                  content: 'Edit Sistem Pengamanan',
                  placement: 'bottom',
                }"
              >
                <CIcon name="cil-pencil" />
              </CButton>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <h5>Sistem Terkait</h5>
    <hr />
    <a href="" @click.prevent="">Tambah Sistem Terkait</a>
    <div class="table-responsive">
      <table class="table table-stripped">
        <thead>
          <tr>
            <td>No</td>
            <td>Nama Sistem Terkait</td>
            <td>Keterangan</td>
            <td>Aksi</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Data Dummy</td>
            <td>Data Dummy</td>
            <td>
              <CButton
                color="danger"
                size="sm"
                class="mr-2"
                v-c-tooltip="{
                  content: 'Hapus Sistem Terkait',
                  placement: 'bottom',
                }"
              >
                <CIcon name="cil-trash" />
              </CButton>
              <CButton
                color="success"
                size="sm"
                v-c-tooltip="{
                  content: 'Edit Sistem Terkait',
                  placement: 'bottom',
                }"
              >
                <CIcon name="cil-pencil" />
              </CButton>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <h5>Sertifikasi</h5>
    <hr />
    <a href="" @click.prevent="">Tambah Sistem Pengamanan</a>
    <div class="table-responsive">
      <table class="table table-stripped">
        <thead>
          <tr>
            <td>No</td>
            <td>Nama Sertifikat</td>
            <td>Institusi</td>
            <td>Tanggal Diterbitkan</td>
            <td>Mulai Berlaku</td>
            <td>Tanggal Berakhir</td>
            <td>Masa Berlaku</td>
            <td>Aksi</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Data Dummy</td>
            <td>Data Dummy</td>
            <td>Data Dummy</td>
            <td>Data Dummy</td>
            <td>Data Dummy</td>
            <td>Data Dummy</td>
            <td>
              <CButton
                color="danger"
                size="sm"
                class="mr-2"
                v-c-tooltip="{
                  content: 'Hapus Sertifikasi',
                  placement: 'bottom',
                }"
              >
                <CIcon name="cil-trash" />
              </CButton>
              <CButton
                color="success"
                size="sm"
                v-c-tooltip="{
                  content: 'Edit Sertifikasi',
                  placement: 'bottom',
                }"
              >
                <CIcon name="cil-pencil" />
              </CButton>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <CModal
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
    <ValidationObserver v-slot="{ invalid }" ref="form_main_function">
      <CModal
        :title="modal.mainFunction.title"
        :color="modal.mainFunction.color"
        :show.sync="modal.mainFunction.showModal"
      >
        <template v-slot:body-wrapper>
          <div class="modal-body">
            <CRow>
              <CCol sm="12">
                <div class="form-group">
                  <label for="fungsi_sistem">Fungsi Sistem</label>
                  <ValidationProvider
                    name="Fungsi Sistem"
                    rules="required|alpha_spaces"
                    v-slot="{ errors }"
                  >
                    <input
                      v-model="forms.mainFunction.fungsi_sistem"
                      type="text"
                      name="name"
                      placeholder="Masukan Fungsi Sistem"
                      class="form-control"
                      :class="{
                        'is-invalid':
                          errors.length > 0 ||
                          errorValidations.mainFunction.fungsi_sistem.length >
                            0,
                      }"
                      @blur="errorValidations.mainFunction.fungsi_sistem = []"
                    />
                    <div v-if="errors.length > 0" class="invalid-feedback">
                      {{ errors[0] }}
                    </div>
                  </ValidationProvider>
                  <message
                    :messages="errorValidations.mainFunction.fungsi_sistem"
                  />
                </div>
              </CCol>
            </CRow>
            <CRow>
              <CCol sm="12">
                <label for="keterangan">Keterangan</label>
                <textarea
                  v-model="forms.mainFunction.keterangan"
                  name="keterangan"
                  cols="10"
                  rows="10"
                  class="form-control"
                ></textarea>
              </CCol>
            </CRow>
          </div>
        </template>
        <template v-slot:footer>
          <CButton
            color="secondary"
            size="sm"
            class="m-2"
            @click="closeModalMainFunction"
          >
            Cancel
          </CButton>
          <CButton
            color="primary"
            size="sm"
            class="m-2"
            @click="submitMainFunction"
            :disabled="invalid"
          >
            {{ modal.mainFunction.labelButton }}
          </CButton>
        </template>
      </CModal>
    </ValidationObserver>
    <ValidationObserver v-slot="{ invalid }" ref="form_scope">
      <CModal
        :title="modal.scope.title"
        :color="modal.scope.color"
        :show.sync="modal.scope.showModal"
      >
        <template v-slot:body-wrapper>
          <div class="modal-body">
            <CRow>
              <CCol sm="12">
                <div class="form-check">
                  <label for="ruang_lingkup">Ruang Lingkup</label>
                  <ValidationProvider
                    name="Ruang Lingkup"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <CRow>
                      <CCol
                        v-for="(value, index) in dataSelect.scope"
                        sm="6"
                        md="6"
                        lg="6"
                        :key="`scope-${index}`"
                      >
                        <input
                          type="checkbox"
                          :value="value.id"
                          v-model="forms.scope.ruang_lingkup"
                          class="form-check-input"
                          :id="value.id"
                        />
                        <label class="form-check-label" :for="value.id">{{
                          value.param_value
                        }}</label>
                      </CCol>
                    </CRow>
                    <!-- <select
                      v-model="forms.scope.ruang_lingkup"
                      class="form-control"
                    >
                      <option value="">Pilih Ruang Lingkup</option>
                      <option
                        v-for="(value, index) in dataSelect.scope"
                        :value="value.id"
                        :key="`scope-${index}`"
                      >
                        {{ value.param_value }}
                      </option>
                    </select> -->
                    <div v-if="errors.length > 0" class="invalid-feedback">
                      {{ errors[0] }}
                    </div>
                  </ValidationProvider>
                  <message :messages="errorValidations.scope.ruang_lingkup" />
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
            @click="closeModalScope"
          >
            Cancel
          </CButton>
          <CButton
            color="primary"
            size="sm"
            class="m-2"
            @click="submitScope"
            :disabled="invalid"
          >
            {{ modal.scope.labelButton }}
          </CButton>
        </template>
      </CModal>
    </ValidationObserver>
  </div>
</template>

<script>
export default {
  name: 'SystemGeneralData',
  props: {
    kindOfService: {
      type: Array,
      required: true,
      default: () => [],
    },
    specialFunction: {
      type: Array,
      required: true,
      default: () => [],
    },
    system: {
      type: Object,
      required: true,
      default: () => {},
    },
    scope: {
      type: Array,
      required: true,
      default: () => [],
    },
    document: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  data() {
    return {
      dataSelect: {
        scope: [],
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
        mainFunction: {
          showModal: false,
          title: null,
          color: null,
          labelButton: null,
          method: null,
          url: null,
        },
        scope: {
          showModal: false,
          title: null,
          color: null,
          labelButton: null,
          method: null,
          url: null,
        },
      },
      forms: {
        mainFunction: {
          id: null,
          sis_profil_id: this.$route.params.id,
          fungsi_sistem: null,
          keterangan: null,
        },
        scope: {
          id: null,
          sis_profil_id: this.$route.params.id,
          ruang_lingkup: [],
        },
      },
      errorValidations: {
        mainFunction: {
          fungsi_sistem: [],
        },
        scope: {
          ruang_lingkup: [],
        },
      },
    }
  },
  created() {
    this.fetchScope()
  },
  methods: {
    //  Fungsi Utama
    clearModalMainFunction() {
      this.modal.mainFunction.title = null
      this.modal.mainFunction.color = null
      this.modal.mainFunction.labelButton = null
      this.modal.mainFunction.method = null
    },
    closeModalMainFunction() {
      this.modal.mainFunction.showModal = false
      this.clearFormMainFunction()
      this.clearModalMainFunction()
    },
    clearFormMainFunction() {
      this.forms.mainFunction.id = null
      this.forms.mainFunction.sis_profil_id = this.$route.params.id
      this.forms.mainFunction.fungsi_sistem = null
      this.forms.mainFunction.keterangan = null
    },
    addMainFunction() {
      this.clearFormMainFunction()
      this.modal.mainFunction.showModal = true
      this.modal.mainFunction.title = 'Tambah Data'
      this.modal.mainFunction.color = 'success'
      this.modal.mainFunction.labelButton = 'Simpan'
      this.modal.mainFunction.method = 'post'
    },
    submitMainFunction() {
      const url = '/special-functions'
      const formData = new FormData()
      let urlAction = null
      if (this.modal.mainFunction.method === 'patch') {
        urlAction = `${url}/${this.forms.mainFunction.id}`
        formData.append('_method', 'patch')
      } else {
        urlAction = url
        formData.append('_method', 'POST')
      }
      const forMapData = Object.entries(this.forms.mainFunction)
      forMapData.forEach((value) => {
        if (Array.isArray(value[1])) {
          for (let index = 0; index < value[1].length; index++) {
            formData.append(`${value[0]}[${index}]`, value[1][index])
          }
        } else {
          formData.append(value[0], value[1] === null ? [] : value[1])
        }
      })
      this.errorValidations.mainFunction.fungsi_sistem = []

      this.$http({
        method: 'post',
        url: urlAction,
        data: formData,
      })
        .then((response) => {
          this.$emit('update-data')
          this.closeModalMainFunction()
          this.$toastr.s(response.data.message, 'Pemberitahuan')
          this.$nextTick(() => {
            this.$refs.form_main_function.reset()
          })
        })
        .catch((error) => {
          if (error.response.status === 422) {
            this.errorValidations.mainFunction.fungsi_sistem =
              typeof error.response.data.errors.fungsi_sistem === 'undefined'
                ? []
                : error.response.data.errors.fungsi_sistem
          } else if (error.response.status === 500) {
            this.$toastr.e('Ada Kesalahan dari Server', 'Pemberitahuan')
          } else {
            this.$toastr.e(error.response.data.message, 'Pemberitahuan')
          }
        })
    },
    destroyMainFunction(item) {
      this.modal.delete.showModal = true
      this.modal.delete.title = 'Hapus Data'
      this.modal.delete.color = 'danger'
      this.modal.delete.data = item.fungsi_sistem
      this.modal.delete.uniqueId = item.id
      this.modal.delete.message = 'Ingin Menghapus Data'
      this.modal.delete.labelButton = 'Hapus'
      this.modal.delete.url = 'special-functions'
    },
    editMainFunction(item) {
      this.forms.mainFunction.id = item.id
      this.forms.mainFunction.fungsi_sistem = item.fungsi_sistem
      this.forms.mainFunction.keterangan = item.keterangan

      this.modal.mainFunction.showModal = true
      this.modal.mainFunction.title = 'Update Data'
      this.modal.mainFunction.color = 'success'
      this.modal.mainFunction.labelButton = 'Update'
      this.modal.mainFunction.method = 'patch'
    },
    //  Ruang Lingkup
    clearModalScope() {
      this.modal.scope.title = null
      this.modal.scope.color = null
      this.modal.scope.labelButton = null
      this.modal.scope.method = null
    },
    closeModalScope() {
      this.modal.scope.showModal = false
      this.clearFormScope()
      this.clearModalScope()
    },
    clearFormScope() {
      this.forms.scope.id = null
      this.forms.scope.sis_profil_id = this.$route.params.id
      this.forms.scope.ruang_lingkup = this.scope.map(
        (value) => value.ruang_lingkup
      )
    },
    addScope() {
      this.clearFormScope()
      this.modal.scope.showModal = true
      this.modal.scope.title = 'Tambah Data'
      this.modal.scope.color = 'success'
      this.modal.scope.labelButton = 'Simpan'
      this.modal.scope.method = 'post'
    },
    submitScope() {
      const url = '/scope'
      const formData = new FormData()
      let urlAction = null
      if (this.modal.scope.method === 'patch') {
        urlAction = `${url}/${this.forms.scope.id}`
        formData.append('_method', 'patch')
      } else {
        urlAction = url
        formData.append('_method', 'POST')
      }
      const forMapData = Object.entries(this.forms.scope)
      forMapData.forEach((value) => {
        if (Array.isArray(value[1])) {
          for (let index = 0; index < value[1].length; index++) {
            formData.append(`${value[0]}[${index}]`, value[1][index])
          }
        } else {
          formData.append(value[0], value[1] === null ? [] : value[1])
        }
      })
      this.errorValidations.scope.ruang_lingkup = []

      this.$http({
        method: 'post',
        url: urlAction,
        data: formData,
      })
        .then((response) => {
          this.$emit('update-data')
          this.closeModalScope()
          this.$toastr.s(response.data.message, 'Pemberitahuan')
          this.$nextTick(() => {
            this.$refs.form_scope.reset()
          })
        })
        .catch((error) => {
          if (error.response.status === 422) {
            this.errorValidations.scope.ruang_lingkup =
              typeof error.response.data.errors.ruang_lingkup === 'undefined'
                ? []
                : error.response.data.errors.ruang_lingkup
          } else if (error.response.status === 500) {
            this.$toastr.e('Ada Kesalahan dari Server', 'Pemberitahuan')
          } else {
            this.$toastr.e(error.response.data.message, 'Pemberitahuan')
          }
        })
    },
    destroyScope(item) {
      this.modal.delete.showModal = true
      this.modal.delete.title = 'Hapus Data'
      this.modal.delete.color = 'danger'
      this.modal.delete.data = item.relation.scope.param_value
      this.modal.delete.uniqueId = item.id
      this.modal.delete.message = 'Ingin Menghapus Data'
      this.modal.delete.labelButton = 'Hapus'
      this.modal.delete.url = 'scope'
    },
    editScope(item) {
      this.forms.scope.id = item.id
      this.forms.scope.ruang_lingkup = this.scope.map(
        (value) => value.ruang_lingkup
      )

      this.modal.scope.showModal = true
      this.modal.scope.title = 'Update Data'
      this.modal.scope.color = 'success'
      this.modal.scope.labelButton = 'Update'
      this.modal.scope.method = 'patch'
    },
    //  Fetch Scope
    fetchScope() {
      this.$http
        .get('parconfig/category', {
          params: {
            filter: 'category',
            q: 'par_ruang_lingkup',
          },
        })
        .then((response) => {
          this.dataSelect.scope = response.data.data
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
<style scoped>
.row-profile-service {
  background-color: #ebedef;
}
</style>

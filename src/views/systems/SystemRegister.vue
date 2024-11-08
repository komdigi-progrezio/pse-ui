<template>
  <div>
    <CCard>
      <ValidationObserver v-slot="{ invalid }" ref="form">
        <CCardHeader> Tambah Data Sistem </CCardHeader>
        <CCardBody class="p-3">
          <CRow>
            <CCol sm="12">
              <div class="form-group">
                <label for="name">Nama Internal</label>
                <ValidationProvider
                  name="Nama Internal"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <input
                    v-model="forms.nama_internal"
                    type="text"
                    name="name"
                    placeholder="Masukan Nama Internal"
                    class="form-control"
                    :class="{
                      'is-invalid':
                        errors.length > 0 ||
                        errorValidations.nama_internal.length > 0,
                    }"
                  />
                  <div v-if="errors.length > 0" class="invalid-feedback">
                    {{ errors[0] }}
                  </div>
                </ValidationProvider>
                <message :messages="errorValidations.nama_eksternal" />
              </div>
            </CCol>
            <CCol sm="12">
              <div class="form-group">
                <label for="name">Nama Eksternal</label>
                <ValidationProvider
                  name="Nama Eksternal"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <input
                    v-model="forms.nama_eksternal"
                    type="text"
                    name="name"
                    placeholder="Masukan Eksternal"
                    class="form-control"
                    :class="{
                      'is-invalid':
                        errors.length > 0 ||
                        errorValidations.nama_eksternal.length > 0,
                    }"
                  />
                  <div v-if="errors.length > 0" class="invalid-feedback">
                    {{ errors[0] }}
                  </div>
                </ValidationProvider>
                <message :messages="errorValidations.nama_eksternal" />
              </div>
            </CCol>
            <CCol sm="12">
              <div class="form-group">
                <label for="name">Keterangan</label>
                <textarea
                  v-model="forms.deskripsi"
                  cols="30"
                  rows="2"
                  class="form-control"
                ></textarea>
              </div>
            </CCol>
            <CCol sm="12">
              <div class="form-group">
                <label for="name">Sasaran Pelayanan</label>
                <ValidationProvider
                  name="Sasaran Pelayanan"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <select
                    v-model="forms.cakupan_wilayah"
                    class="form-control"
                    :class="{
                      'is-invalid':
                        errors.length > 0 ||
                        errorValidations.cakupan_wilayah.length > 0,
                    }"
                  >
                    <option value="">Pilih Sasaran Pelayanan</option>
                    <option
                      v-for="(value, index) in dataSelect.serviceGoals"
                      :value="value.id"
                      :key="`service-goals-${index}`"
                      >{{ value.name }}</option
                    >
                  </select>
                  <div v-if="errors.length > 0" class="invalid-feedback">
                    {{ errors[0] }}
                  </div>
                </ValidationProvider>
                <message :messages="errorValidations.cakupan_wilayah" />
              </div>
            </CCol>
            <CCol sm="12">
              <div class="form-group">
                <label for="name">Kategori Sistem Elektronik</label>
                <ValidationProvider
                  name="Kategori Sistem Elektronik"
                  rules="required|numeric"
                  v-slot="{ errors }"
                >
                  <select
                    v-model.number="forms.sifat_khusus"
                    class="form-control"
                    :class="{
                      'is-invalid':
                        errors.length > 0 ||
                        errorValidations.sifat_khusus.length > 0,
                    }"
                  >
                    <option value="">Pilih Kategori Sistem Elektronik</option>
                    <option
                      v-for="(
                        value, index
                      ) in dataSelect.electronicSystemCategory"
                      :value="value.id"
                      :key="`eletronic-system-category-${index}`"
                      >{{ value.param_value }}</option
                    >
                  </select>
                  <div v-if="errors.length > 0" class="invalid-feedback">
                    {{ errors[0] }}
                  </div>
                </ValidationProvider>
                <message :messages="errorValidations.sifat_khusus" />
                <a href="" @click.prevent="openFilePKSE"
                  >Unduh Dokumen Pernyataan Kategori Sistem Elektronik</a
                >
              </div>
            </CCol>
            <CCol sm="12">
              <div class="form-group">
                <label for="name">Dokumen Hasil Self Assesment</label>
                <ValidationProvider
                  name="File"
                  rules="required|mimes:application/pdf"
                  v-slot="{ errors, validate }"
                >
                  <div class="custom-file">
                    <input
                      type="file"
                      class="custom-file-input"
                      id="customFile"
                      accept="application/pdf"
                      @change="
                        onFilePickedDocument($event) || validate($event)
                      "
                      @blur="errorValidations.dokumen = []"
                    />
                    <label class="custom-file-label" for="customFile">{{
                      filename
                    }}</label>
                    <div
                      v-if="errors.length > 0"
                      :class="{
                        'has-error-file': errors.length > 0,
                      }"
                    >
                      {{ errors[0] }}
                    </div>
                  </div>
                </ValidationProvider>
                <message :messages="errorValidations.dokumen" />
                <small class="text-danger">Max ukuran file upload 3MB</small>
              </div>
            </CCol>
            <CCol sm="12">
              <div class="form-group">
                <label for="name">Kategori Akses</label>
                <ValidationProvider
                  name="Kategori Akses"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <select
                    v-model="forms.kategori_akses"
                    class="form-control"
                    :class="{
                      'is-invalid':
                        errors.length > 0 ||
                        errorValidations.kategori_akses.length > 0,
                    }"
                    @change="accessCategory"
                  >
                    <option value="">Pilih Kategori Akses</option>
                    <option
                      v-for="(value, index) in dataSelect.accessCategory"
                      :value="value.id"
                      :key="`access-category-${index}`"
                      >{{ value.name }}</option
                    >
                  </select>
                  <div v-if="errors.length > 0" class="invalid-feedback">
                    {{ errors[0] }}
                  </div>
                </ValidationProvider>
                <message :messages="errorValidations.kategori_akses" />
                <template v-if="forms.kategori_akses === 'Online'">
                  <p
                    >Alamat URL (Gunakan http://, Contoh
                    http://www.layanan.go.id)</p
                  >
                  <ValidationProvider
                    name="Alamat URL"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <input 
                      v-model="forms.url"
                      type="text"
                      class="form-control"
                      :class="{
                      'is-invalid':
                        errors.length > 0 ||
                        errorValidations.url.length > 0,
                    }"
                    />
                    <div v-if="errors.length > 0" class="invalid-feedback">
                      {{ errors[0] }}
                    </div>
                  </ValidationProvider>                    
                  <message :messages="errorValidations.url" />
                </template>
              </div>
            </CCol>
            <CCol sm="12">
              <div class="form-group">
                <label for="name"
                  >Bersedia Untuk di Publikasikan Melalu Portal Layanan
                  Publik</label
                >
                <div class="d-flex">
                  <div class="form-check form-check-inline mr-1">
                    <input
                      v-model="forms.publish"
                      class="form-check-input"
                      id="inline-radio1"
                      type="radio"
                      value="0"
                      name="inline-radios"
                    />
                    <label class="form-check-label" for="inline-radio1"
                      >Tidak</label
                    >
                  </div>
                  <div class="form-check form-check-inline mr-1">
                    <input
                      v-model="forms.publish"
                      class="form-check-input"
                      id="inline-radio1"
                      type="radio"
                      value="1"
                      name="inline-radios"
                    />
                    <label class="form-check-label" for="inline-radio1"
                      >Ya</label
                    >
                  </div>
                </div>
              </div>
            </CCol>
          </CRow>
        </CCardBody>
        <CCardFooter>
          <CButton
            color="primary"
            size="sm"
            class="mr-2"
            :disabled="isSubmit || invalid"
            @click="submit"
          >
            Simpan
            <CSpinner size="sm" color="info" v-if="isSubmit" />
          </CButton>
          <CButton color="secondary" size="sm" @click="back"> Cancel </CButton>
        </CCardFooter>
      </ValidationObserver>
    </CCard>
  </div>
</template>

<script>
export default {
  name: 'SystemRegister',
  data() {
    return {
      isSubmit: false,
      forms: {
        nama_internal: null,
        nama_eksternal: null,
        deskripsi: null,
        cakupan_wilayah: '',
        sifat_khusus: '',
        kategori_akses: 'Online',
        url: null,
        publish: null,
        dokumen: '',
      },
      errorValidations: {
        nama_internal: [],
        nama_eksternal: [],
        cakupan_wilayah: [],
        sifat_khusus: [],
        kategori_akses: [],
        url: [],
        dokumen: [],
      },
      dataSelect: {
        serviceGoals: [
          {
            id: 'Lokal',
            name: 'Lokal',
          },
          {
            id: 'Nasional',
            name: 'Nasional',
          },
          {
            id: 'Internasional',
            name: 'Internasional',
          },
        ],
        electronicSystemCategory: [],
        accessCategory: [
          {
            id: 'Online',
            name: 'Online',
          },
          {
            id: 'Offline',
            name: 'Offline',
          },
        ],
      },
    }
  },
  created() {
    this.fetchCategorySpecialFeatures()
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
    fetchCategorySpecialFeatures() {
      this.$http
        .get('parconfig/category', {
          params: {
            filter: 'category',
            q: 'par_sifat_khusus',
          },
        })
        .then((response) => {
          this.dataSelect.electronicSystemCategory = response.data.data
        })
        .catch((error) => {
          if (error.response.status === 500) {
            this.$toastr.e('Ada Kesalahan dari Server', 'Pemberitahuan')
          } else {
            this.$toastr.e(error.response.data.message, 'Pemberitahuan')
          }
        })
    },
    openFilePKSE() {
      window.open(`${window.location.origin}/DOK.PKSE.pdf`, '_blank')
      // window.open(`${process.env.VUE_APP_URL}DOK.PKSE.pdf`, '_blank')
    },
    accessCategory() {
      if (this.forms.kategori_akses !== 'Online') {
        this.forms.url = null
      }
    },
    clearForm() {
      this.forms.nama_internal = null
      this.forms.nama_eksternal = null
      this.forms.deskripsi = null
      this.forms.cakupan_wilayah = ''
      this.forms.sifat_khusus = ''
      this.forms.kategori_akses = 'Online'
      this.forms.url = null
      this.forms.publish = null
      this.forms.dokumen = ''
    },
    onFilePickedDocument() {
      if (event.target.files[0].type === 'application/pdf') {
        this.forms.dokumen = event.target.files[0]
        this.filename = event.target.files[0].name
      } else {
        this.forms.dokumen = null
        this.filename = 'Choose File'
      }
    },
    submit() {
      this.isSubmit = true
      const url = '/systems'
      const formData = new FormData()
      formData.append('_method', 'POST')
      const forMapData = Object.entries(this.forms)
      forMapData.forEach((value) => {
        if (Array.isArray(value[1])) {
          for (let index = 0; index < value[1].length; index++) {
            formData.append(`${value[0]}[${index}]`, value[1][index])
          }
        } else {
          formData.append(value[0], value[1] === null ? [] : value[1])
        }
      })
      this.errorValidations.nama_internal = []
      this.errorValidations.nama_eksternal = []
      this.errorValidations.cakupan_wilayah = []
      this.errorValidations.sifat_khusus = []
      this.errorValidations.kategori_akses = []
      this.errorValidations.url = []
      this.errorValidations.dokumen = []

      this.$http({
        method: 'post',
        url: url,
        data: formData,
      })
        .then((response) => {
          this.isSubmit = false
          localStorage.setItem('nama_internal', this.forms.nama_internal)
          localStorage.setItem('nama_eksternal', this.forms.nama_eksternal)
          localStorage.setItem('isRegisteredSe', true)
          this.$toastr.s(response.data.message, 'Pemberitahuan')
          this.clearForm()
          this.$nextTick(() => {
            this.$refs.form.reset()
          })
          this.$router.go(-1)
        })
        .catch((error) => {
          this.isSubmit = false
          if (error.response.status === 422) {
            this.$toastr.e('Silahkan Cek Form Anda Kembali', 'Pemberitahuan')
            this.errorValidations.nama_internal =
              typeof error.response.data.errors.nama_internal === 'undefined'
                ? []
                : error.response.data.errors.nama_internal
            this.errorValidations.nama_eksternal =
              typeof error.response.data.errors.nama_eksternal === 'undefined'
                ? []
                : error.response.data.errors.nama_eksternal
            this.errorValidations.cakupan_wilayah =
              typeof error.response.data.errors.cakupan_wilayah === 'undefined'
                ? []
                : error.response.data.errors.cakupan_wilayah
            this.errorValidations.sifat_khusus =
              typeof error.response.data.errors.sifat_khusus === 'undefined'
                ? []
                : error.response.data.errors.sifat_khusus
            this.errorValidations.kategori_akses =
              typeof error.response.data.errors.kategori_akses === 'undefined'
                ? []
                : error.response.data.errors.kategori_akses
            this.errorValidations.url =
              typeof error.response.data.errors.url === 'undefined'
                ? []
                : error.response.data.errors.url
            this.errorValidations.dokumen =
              typeof error.response.data.errors.dokumen === 'undefined'
                ? []
                : error.response.data.errors.dokumen
          } else if (error.response.status === 500) {
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

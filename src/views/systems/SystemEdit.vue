<template>
  <CCard>
    <ValidationObserver v-slot="{ invalid }" ref="form">
      <CCardHeader> Perbaharui Data Sistem </CCardHeader>
      <CCardBody>
        <CRow>
          <CCol sm="12">
            <div class="form-group">
              <label for="name">Nama Internal<span class="text-danger">*</span></label>
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
              <label for="name">Nama Eksternal<span class="text-danger">*</span></label>
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
              <label for="name">Keterangan<span class="text-danger">*</span></label>
              <ValidationProvider
                name="Nama Eksternal"
                rules="required"
                v-slot="{ errors }"
              >
                <textarea
                  v-model="forms.deskripsi"
                  cols="30"
                  rows="2"
                  class="form-control"
                  :class="{
                    'is-invalid':
                      errors.length > 0 ||
                      errorValidations.deskripsi.length > 0,
                  }"
                ></textarea>
              </ValidationProvider>
              <message :messages="errorValidations.deskripsi" />
            </div>
          </CCol>
          <CCol sm="12">
            <div class="form-group">
              <label for="name">Sasaran Pelayanan<span class="text-danger">*</span></label>
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
              <label for="name">Kategori Sistem Elektronik<span class="text-danger">*</span></label>
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
              <label for="name">Kategori Akses<span class="text-danger">*</span></label>
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
                <input v-model="forms.url" type="text" class="form-control" />
                <message :messages="errorValidations.url" />
              </template>
            </div>
          </CCol>
          <CCol sm="12">
            <div class="form-group">
              <label for="name"
                >Bersedia Untuk di Publikasikan Melalu Portal Layanan
                Publik<span class="text-danger">*</span></label
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
                  <label class="form-check-label" for="inline-radio1">Ya</label>
                </div>
              </div>
            </div>
          </CCol>
        </CRow>
      </CCardBody>
      <CCardFooter>
        <CButton color="secondary" size="sm" class="mr-2" @click="back">
          Cancel
        </CButton>
        <CButton color="primary" size="sm" :disabled="invalid" @click="submit">
          Simpan
        </CButton>
      </CCardFooter>
    </ValidationObserver>
  </CCard>
</template>

<script>
export default {
  name: 'SystemEdit',
  data() {
    return {
      forms: {
        nama_internal: null,
        nama_eksternal: null,
        deskripsi: null,
        cakupan_wilayah: '',
        sifat_khusus: '',
        kategori_akses: 'Online',
        url: null,
        publish: null,
      },
      errorValidations: {
        nama_internal: [],
        nama_eksternal: [],
        keterangan: [],
        cakupan_wilayah: [],
        sifat_khusus: [],
        kategori_akses: [],
        url: [],
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
    this.initialEdit()
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
    fetchCategorySpecialFeatures() {
      return this.$http.get('parconfig/category', {
        params: {
          filter: 'category',
          q: 'par_sifat_khusus',
        },
      })
    },
    fetchSystem() {
      this.$http
        .get(`systems/${this.$route.params.id}/edit`)
        .then((response) => {
          this.forms.nama_internal = response.data.data.nama_internal
          this.forms.nama_eksternal = response.data.data.nama_eksternal
          this.forms.deskripsi = response.data.data.deskripsi
          this.forms.cakupan_wilayah = response.data.data.cakupan_wilayah
          this.forms.sifat_khusus = response.data.data.sifat_khusus
          this.forms.kategori_akses = response.data.data.kategori_akses
          this.forms.url = response.data.data.url
          this.forms.publish = response.data.data.publish
        })
        .catch((error) => {
          if (error.response.status === 500) {
            this.$toastr.e('Ada Kesalahan dari Server', 'Pemberitahuan')
          } else {
            this.$toastr.e(error.response.data.message, 'Pemberitahuan')
          }
        })
    },
    initialEdit() {
      this.fetchCategorySpecialFeatures()
        .then((response) => {
          this.dataSelect.electronicSystemCategory = response.data.data
          this.fetchSystem()
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
    },
    submit() {
      const url = `/systems/${this.$route.params.id}`
      const formData = new FormData()
      formData.append('_method', 'patch')
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
      this.errorValidations.deskripsi = []
      this.errorValidations.cakupan_wilayah = []
      this.errorValidations.sifat_khusus = []
      this.errorValidations.kategori_akses = []
      this.errorValidations.url = []
      this.errorValidations.name = []

      this.$http({
        method: 'post',
        url: url,
        data: formData,
      })
        .then((response) => {
          this.$toastr.s(response.data.message, 'Pemberitahuan')
          this.clearForm()
          this.$nextTick(() => {
            this.$refs.form.reset()
          })
          this.$router.push(`/admin/systems/${this.$route.params.id}`)
        })
        .catch((error) => {
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
            this.errorValidations.deskripsi =
              typeof error.response.data.errors.deskripsi === 'undefined'
                ? []
                : error.response.data.errors.deskripsi
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

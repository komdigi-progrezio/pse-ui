<template>
  <div>
    <CCard>
      <CCardHeader>
        <CIcon name="cil-user" /> Profil
        <div class="card-header-actions">
          <template>
            <CButton
              color="success"
              shape="pill"
              size="sm"
              variant="outline"
              v-c-tooltip="{
                content: 'Edit Profil',
                placement: 'bottom',
              }"
              @click="editProfile"
            >
              <CIcon name="cil-pencil" />
            </CButton>
          </template>
        </div>
      </CCardHeader>
      <CCardBody>
        <div class="table-responsive">
          <table class="table table-stripped">
            <tbody>
              <tr>
                <td>Nama Lengkap</td>
                <td>
                  <p class="font-14 font-weight-normal mobile-only mb-1 d-block"
                    >Nama</p
                  >
                  {{ profile.nama }}
                </td>
              </tr>
              <tr>
                <td>NIP</td>
                <td>
                  <p class="font-14 font-weight-normal mobile-only mb-1 d-block"
                    >NIP</p
                  >
                  {{ profile.nip }}
                </td>
              </tr>
              <tr>
                <td>Jabatan</td>
                <td>
                  <p class="font-14 font-weight-normal mobile-only mb-1 d-block"
                    >Jabatan</p
                  >
                  {{ profile.jabatan }}
                </td>
              </tr>
              <tr>
                <td>No Telepon</td>
                <td>
                  <p class="font-14 font-weight-normal mobile-only mb-1 d-block"
                    >No Telepon</p
                  >
                  {{ profile.no_telepon }}
                </td>
              </tr>
              <tr>
                <td>Instansi Induk</td>
                <td>
                  <p class="font-14 font-weight-normal mobile-only mb-1 d-block"
                    >Instansi Induk</p
                  >
                  {{ profile.instansi_induk_text }}
                </td>
              </tr>
              <tr>
                <td>Satuan Kerja Induk</td>
                <td>
                  <p class="font-14 font-weight-normal mobile-only mb-1 d-block"
                    >Satuan Kerja Induk</p
                  >
                  {{ profile.satuan_kerja }}
                </td>
              </tr>
              <tr>
                <td>Alamat</td>
                <td>
                  <p class="font-14 font-weight-normal mobile-only mb-1 d-block"
                    >Alamat</p
                  >
                  {{ profile.alamat }}
                </td>
              </tr>
              <tr>
                <td>Nama Provinsi</td>
                <td>
                  <p class="font-14 font-weight-normal mobile-only mb-1 d-block"
                    >Nama Provinsi</p
                  >
                  {{ profile.nama_provinsi }}
                </td>
              </tr>
              <tr>
                <td>Nama Kota</td>
                <td>
                  <p class="font-14 font-weight-normal mobile-only mb-1 d-block"
                    >Nama Kota</p
                  >
                  {{ profile.nama_kota }}
                </td>
              </tr>
              <tr>
                <td>Kode POS</td>
                <td>
                  <p class="font-14 font-weight-normal mobile-only mb-1 d-block"
                    >Kode POS</p
                  >
                  {{ profile.kode_pos }}
                </td>
              </tr>
              <tr>
                <td>Dokumen</td>
                <td>
                  <p class="font-14 font-weight-normal mobile-only mb-1 d-block"
                    >Dokumen</p
                  >
                  <a href="" @click.prevent="showFile(profile.url)"
                    >Lihat File</a
                  >
                </td>
              </tr>
              <tr>
                <td>Tanggal Pendaftaran</td>
                <td>
                  <p class="font-14 font-weight-normal mobile-only mb-1 d-block"
                    >Tanggal Pendaftaran</p
                  >
                  {{ profile.created_at }}
                </td>
              </tr>
              <tr>
                <td>Tanggal Terakhir Update</td>
                <td>
                  <p class="font-14 font-weight-normal mobile-only mb-1 d-block"
                    >Tanggal Terakhir Update</p
                  >
                  {{ profile.modified_at }}
                </td>
              </tr>
              <tr>
                <td>Status Data</td>
                <td>
                  <p class="font-14 font-weight-normal mobile-only mb-1 d-block"
                    >Status Data</p
                  >
                  {{ profile.status === 1 ? 'Aktif' : 'Tidak Aktif' }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </CCardBody>
    </CCard>
    <ValidationObserver ref="form_profile">
      <CModal
        :title="modal.title"
        :color="modal.color"
        :show.sync="modal.showModal"
      >
        <template v-slot:body-wrapper>
          <div class="modal-body">
            <CRow>
              <CCol sm="12">
                <div class="form-group">
                  <label for="nama">Nama Lengkap</label>
                  <ValidationProvider
                    name="Nama Lengkap"
                    rules="required|alpha_spaces"
                    v-slot="{ errors }"
                  >
                    <input
                      v-model="forms.nama"
                      type="text"
                      class="form-control"
                      placeholder="Masukan Nama Lengkap"
                      :class="{
                        'is-invalid':
                          errors.length > 0 || errorValidations.nama.length > 0,
                      }"
                      @blur="errorValidations.nama = []"
                    />
                    <div v-if="errors.length > 0" class="invalid-feedback">
                      {{ errors[0] }}
                    </div>
                  </ValidationProvider>
                  <message :messages="errorValidations.nama" />
                </div>
              </CCol>
              <CCol sm="12">
                <div class="form-group">
                  <label for="nip">NIP</label>
                  <ValidationProvider
                    name="NIP"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <input
                      v-model="forms.nip"
                      type="text"
                      class="form-control"
                      placeholder="Masukan NIP"
                      :class="{
                        'is-invalid':
                          errors.length > 0 || errorValidations.nip.length > 0,
                      }"
                      @blur="errorValidations.nip = []"
                    />
                    <div v-if="errors.length > 0" class="invalid-feedback">
                      {{ errors[0] }}
                    </div>
                  </ValidationProvider>
                  <message :messages="errorValidations.nip" />
                </div>
              </CCol>
              <CCol sm="12">
                <div class="form-group">
                  <label for="jabatan">Jabatan</label>
                  <ValidationProvider
                    name="Jabatan"
                    rules="required|alpha_spaces"
                    v-slot="{ errors }"
                  >
                    <input
                      v-model="forms.jabatan"
                      type="text"
                      class="form-control"
                      placeholder="Masukan Jabatan"
                      :class="{
                        'is-invalid':
                          errors.length > 0 ||
                          errorValidations.jabatan.length > 0,
                      }"
                      @blur="errorValidations.jabatan = []"
                    />
                    <div v-if="errors.length > 0" class="invalid-feedback">
                      {{ errors[0] }}
                    </div>
                  </ValidationProvider>
                  <message :messages="errorValidations.jabatan" />
                </div>
              </CCol>
              <CCol sm="12">
                <div class="form-group">
                  <label for="no_telepon">Nomor Telepon</label>
                  <ValidationProvider
                    name="Nomor Telepon"
                    rules="required|numeric"
                    v-slot="{ errors }"
                  >
                    <input
                      v-model="forms.no_telepon"
                      type="text"
                      class="form-control"
                      placeholder="Masukan Nomor Telepon"
                      :class="{
                        'is-invalid':
                          errors.length > 0 ||
                          errorValidations.no_telepon.length > 0,
                      }"
                      @blur="errorValidations.no_telepon = []"
                    />
                    <div v-if="errors.length > 0" class="invalid-feedback">
                      {{ errors[0] }}
                    </div>
                  </ValidationProvider>
                  <message :messages="errorValidations.no_telepon" />
                  <p class="text-muted">
                    Gunakan kode area, contoh: 02133334444
                  </p>
                </div>
              </CCol>
              <CCol sm="12">
                <div class="form-group">
                  <label for="no_hp">Nomor HP</label>
                  <ValidationProvider
                    name="Nomor HP"
                    rules="required|numeric"
                    v-slot="{ errors }"
                  >
                    <input
                      v-model="forms.no_hp"
                      type="text"
                      class="form-control"
                      placeholder="Masukan Nomor HP"
                      :class="{
                        'is-invalid':
                          errors.length > 0 ||
                          errorValidations.no_hp.length > 0,
                      }"
                      @blur="errorValidations.no_hp = []"
                    />
                    <div v-if="errors.length > 0" class="invalid-feedback">
                      {{ errors[0] }}
                    </div>
                  </ValidationProvider>
                  <message :messages="errorValidations.no_hp" />
                </div>
              </CCol>
              <CCol sm="12">
                <div class="form-group">
                  <label for="dokumen">Instansi</label>
                  <input
                    v-model="label.instansi.name"
                    type="text"
                    class="form-control"
                    disabled
                  />
                </div>
              </CCol>
              <CCol sm="12">
                <div class="form-group">
                  <label for="alamat">Alamat</label>
                  <ValidationProvider
                    name="Alamat"
                    rules="required|alpha_spaces"
                    v-slot="{ errors }"
                  >
                    <input
                      v-model="forms.alamat"
                      type="text"
                      class="form-control"
                      placeholder="Masukan Alamat"
                      :class="{
                        'is-invalid':
                          errors.length > 0 ||
                          errorValidations.alamat.length > 0,
                      }"
                      @blur="errorValidations.alamat = []"
                    />
                    <div v-if="errors.length > 0" class="invalid-feedback">
                      {{ errors[0] }}
                    </div>
                  </ValidationProvider>
                  <message :messages="errorValidations.alamat" />
                </div>
              </CCol>
              <CCol sm="12">
                <div class="form-group">
                  <label for="provinsi">Provinsi</label>
                  <ValidationProvider
                    name="provinsi"
                    rules="required"
                    v-slot="{ errors }"
                    mode="aggressive"
                  >
                    <select
                      v-model="forms.propinsi"
                      class="form-control"
                      :class="{
                        'is-invalid': errorValidations.nama_provinsi.length > 0,
                      }"
                      @change="getDistrictOnChange"
                      @blur="errorValidations.nama_provinsi = []"
                      required
                      placeholder="profile.nama_provinsi"
                    >
                      <option value="" selected="selected">
                        Pilih Provinsi
                      </option>
                      <option
                        :value="value.id"
                        v-for="(value, index) in dataSelect.provinsi"
                        :key="`provivnsi-${index}`"
                      >
                        {{ value.nama }}
                      </option>
                    </select>
                    <div v-if="errors.length > 0" class="invalid-feedback">
                      {{ errors[0] }}
                    </div>
                  </ValidationProvider>
                </div>
              </CCol>
              <CCol sm="12">
                <div class="form-group">
                  <label for="kota">Kota</label>
                  <ValidationProvider
                    name="kota"
                    rules="required"
                    v-slot="{ errors }"
                    mode="aggressive"
                  >
                    <select
                      v-model="forms.kota"
                      class="form-control"
                      :class="{
                        'is-invalid': errorValidations.nama_kota.length > 0,
                      }"
                      @blur="errorValidations.nama_kota = []"
                      required
                    >
                      <option value="" selected="selected"> Pilih Kota </option>
                      <option
                        :value="value.id"
                        v-for="(value, index) in dataSelect.kota"
                        :key="`kota-${index}`"
                      >
                        {{ value.nama }}
                      </option>
                    </select>
                    <div v-if="errors.length > 0" class="invalid-feedback">
                      {{ errors[0] }}
                    </div>
                  </ValidationProvider>
                </div>
              </CCol>
              <CCol sm="12">
                <div class="form-group">
                  <label for="kode_pos">Kode pos</label>
                  <ValidationProvider
                    name="kode_pos"
                    v-slot="{ errors }"
                  >
                    <input
                      v-model="forms.kode_pos"
                      type="text"
                      class="form-control"
                      placeholder="Masukan kode pos"
                      :class="{
                        'is-invalid':
                          errors.length > 0,
                      }"
                    />
                    <div v-if="errors.length > 0" class="invalid-feedback">
                      {{ errors[0] }}
                    </div>
                  </ValidationProvider>
                </div>
              </CCol>
              <CCol sm="12">
                <div class="form-group">
                  <label for="dokumen">Dokumen</label>
                  <ValidationProvider
                    name="Dokumen"
                    rules="required|mimes:application/pdf"
                    v-slot="{ errors, validate }"
                  >
                    <div class="custom-file">
                      <input
                        type="file"
                        class="custom-file-input"
                        id="customFile"
                        @change="onFilePicked($event) || validate($event)"
                        accept="application/pdf"
                      />
                      <label class="custom-file-label" for="customFile">
                        {{ label.dokumen.name }}
                      </label>
                    </div>
                    <div
                      v-if="errors.length > 0"
                      :class="{
                        'has-error-file': errors.length > 0,
                      }"
                    >
                      {{ errors[0] }}
                    </div>
                  </ValidationProvider>
                  <message :messages="errorValidations.dokumen" />
                  <small class="text-danger">Max ukuran file upload 3MB</small><br/>
                  <template v-if="modal.method === 'patch'">
                    <a href="" @click.prevent="showFile(label.dokumen.url)"
                      >Lihat File</a
                    >
                  </template>
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
            @click="closeModalPostPut"
          >
            Cancel
          </CButton>
          <CButton color="primary" size="sm" class="m-2" @click="submitProfile">
            {{ modal.labelButton }}
          </CButton>
        </template>
      </CModal>
    </ValidationObserver>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'

export default {
  name: 'AccountProfile',
  data() {
    return {
      profile: {
        nama: null,
        nip: null,
        jabatan: null,
        no_telepon: null,
        satuan_kerja: null,
        alamat: null,
        instansi_induk_text: null,
        kode_pos: null,
        dokumen: null,
        id_provinsi: null,
        nama_provinsi: null,
        id_kota: null,
        nama_kota: null,
        created_at: null,
        modified_at: null,
        status: null,
        url: null,
      },
      forms: {
        id: null,
        nama: null,
        nip: null,
        jabatan: null,
        no_telepon: null,
        no_hp: null,
        alamat: null,
        propinsi: null,
        kota: null,
        dokumen: null,
        kode_pos: null,
      },
      label: {
        dokumen: {
          name: 'Choose File',
          old_name: null,
          url: null,
        },
        instansi: {
          name: null,
        },
      },
      modal: {
        showModal: false,
        title: null,
        color: null,
        labelButton: null,
        method: null,
      },
      errorValidations: {
        nama: [],
        nip: [],
        jabatan: [],
        no_telepon: [],
        no_hp: [],
        alamat: [],
        nama_provinsi: [],
        nama_kota: [],
        dokumen: [],
      },
      dataSelect: {
        provinsi: [],
        kota: [],
      },
    }
  },
  computed: {
    isAdmin() {
      if (this.$store.state.auth.data.roles.includes('Admin')) {
        return true
      }

      return false
    },
  },
  created() {
    this.getProfile()
    this.getProvince()
    this.getProvinceOnChange()
    this.getDistrictOnChange()
  },
  methods: {
    formatDate(date) {
      if(date){
        return moment(date).format('DD-MM-YYYY HH:mm:ss')
      }
    },
    getProvince() {
      axios
        .get(`${process.env.VUE_APP_BASE_API_URL}public/provinsi`)
        .then((response) => {
          // this.dataSelect.provinsi = response.data.data

          response.data.data.forEach((provinsi) => {
            if (provinsi.id ==  this.profile.id_provinsi) {
              this.profile.nama_provinsi = provinsi.nama
            }
          });
          this.getDistrict()
        })
        .catch((error) => {
          if (error.response.status === 500) {
            this.$toastr.e('Ada Kesalahan dari Server', 'Pemberitahuan')
          } else {
            this.$toastr.e(error.response.data.message, 'Pemberitahuan')
          }
        })
    },
    getProvinceOnChange() {
      axios
        .get(`${process.env.VUE_APP_BASE_API_URL}public/provinsi`)
        .then((response) => {
          this.dataSelect.provinsi = response.data.data    
        })
        .catch((error) => {
          if (error.response.status === 500) {
            this.$toastr.e('Ada Kesalahan dari Server', 'Pemberitahuan')
          } else {
            this.$toastr.e(error.response.data.message, 'Pemberitahuan')
          }
        })
    },
    getDistrict() {
      axios
        .get(
          `${process.env.VUE_APP_BASE_API_URL}public/provinsi/${this.profile.id_provinsi}/kota`
        )
        .then((response) => {
          // this.forms.nama_kota = ''

          response.data.data.forEach((kota) => {
            if (kota.id ==  this.profile.id_kota) {
              this.profile.nama_kota = kota.nama
            }
              // console.log(`Kota ditemukan: ${kota.id}`); 
              // console.log(`Kota id ditemukan: ${ this.profile.nama_kota}`); 
          });

        })
        .catch((error) => {
          console.log(`Error kota: ${error}`)
          this.$toastr.e(error.response.data.message, 'Pemberitahuan')
        })
    },
    getDistrictOnChange() {
      this.dataSelect.kota = []
      this.forms.kota = ''
      
      if (this.forms.propinsi) {
        axios
          .get(`${process.env.VUE_APP_BASE_API_URL}public/provinsi/${this.forms.propinsi}/kota`)
          .then((response) => {
            this.dataSelect.kota = response.data.data
          })
          .catch((error) => {
            console.log(`Error kota: ${error}`);
            this.$toastr.e(error.response.data.message, 'Pemberitahuan');
          });
      }
    },

    onFilePicked(event) {
      const eventTarget = event.target
      if (eventTarget.files[0].type === 'application/pdf') {
        this.forms.dokumen = eventTarget.files[0]
        this.label.dokumen.name = eventTarget.files[0].name
      } else {
        this.forms.dokumen = null
        this.label.dokumen.name = 'Choose File'
      }
    },
    getProfile() {
      this.$http
        .get('users/get/authenticated')
        .then((response) => {
          this.profile.nama = response.data.data.nama
          this.profile.nip = response.data.data.nip
          this.profile.jabatan = response.data.data.jabatan
          this.profile.no_telepon = response.data.data.no_telepon
          this.profile.satuan_kerja = response.data.data.satuan_kerja
          this.profile.alamat = response.data.data.alamat
          this.profile.instansi_induk_text = response.data.data.instansi_induk_text
          this.profile.kode_pos = response.data.data.kode_pos
          this.profile.dokumen = response.data.data.dokumen
          this.profile.id_provinsi = response.data.data.propinsi
          this.profile.id_kota = response.data.data.kota
          this.profile.created_at = this.formatDate(response.data.data.created_at)
          this.profile.modified_at = this.formatDate(response.data.data.modified_at)
          this.profile.status = response.data.data.status
          this.profile.url = response.data.data.url_dokumen

          this.forms.id = response.data.data.id
          this.forms.nama = response.data.data.nama
          this.forms.nip = response.data.data.nip
          this.forms.jabatan = response.data.data.jabatan
          this.forms.no_telepon = response.data.data.no_telepon
          this.forms.no_hp = response.data.data.no_hp
          this.forms.alamat = response.data.data.alamat
          this.forms.kode_pos = response.data.data.kode_pos
          // this.forms.propinsi = response.data.data.nama_provinsi
          // this.forms.nama_kota = response.data.data.nama_kota

          this.label.dokumen.old_name = response.data.data.dokumen
          this.label.dokumen.url = response.data.data.url_dokumen

          this.label.instansi.name = response.data.data.instansi_induk_text
        })
        .catch((error) => {
          if (error.response.status === 500) {
            this.$toastr.e('Ada Kesalahan dari Server', 'Pemberitahuan')
          } else {
            this.$toastr.e(error.response.data.message, 'Pemberitahuan')
          }
        })
    },
    submitProfile() {
      const url = `/users/${this.forms.id}/profile`
      const formData = new FormData()
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
      formData.append('_method', 'patch')
      this.errorValidations.nama = []
      this.errorValidations.nip = []
      this.errorValidations.jabatan = []
      this.errorValidations.no_telepon = []
      this.errorValidations.dokumen = []
      this.errorValidations.no_hp = []
      this.errorValidations.alamat = []
      this.errorValidations.nama_provinsi = []
      this.errorValidations.nama_kota = []

      this.$http({
        method: 'patch',
        url: url,
        data: formData,
      })
        .then((response) => {
          this.$toastr.s(response.data.message, 'Pemberitahuan')
          this.$nextTick(() => {
            this.$refs.form_profile.reset()
          })
          this.closeModalPostPut()
          this.getProfile()
          window.location.reload()
        })
        .catch((error) => {
          if (error.response.status === 422) {
            this.$toastr.e('Silahkan Cek Form Anda Kembali', 'Pemberitahuan')
            this.errorValidations.nama =
              typeof error.response.data.errors.nama === 'undefined'
                ? []
                : error.response.data.errors.nama
            this.errorValidations.nip =
              typeof error.response.data.errors.nip === 'undefined'
                ? []
                : error.response.data.errors.nip
            this.errorValidations.jabatan =
              typeof error.response.data.errors.jabatan === 'undefined'
                ? []
                : error.response.data.errors.jabatan
            this.errorValidations.no_telepon =
              typeof error.response.data.errors.no_telepon === 'undefined'
                ? []
                : error.response.data.errors.no_telepon
            this.errorValidations.dokumen =
              typeof error.response.data.errors.dokumen === 'undefined'
                ? []
                : error.response.data.errors.dokumen
            this.errorValidations.no_hp =
              typeof error.response.data.errors.no_hp === 'undefined'
                ? []
                : error.response.data.errors.no_hp
          } else if (error.response.status === 500) {
            this.$toastr.e('Ada Kesalahan dari Server', 'Pemberitahuan')
          } else {
            this.$toastr.e(error.response.data.message, 'Pemberitahuan')
          }
        })
    },
    clearModalPostPut() {
      this.modal.title = null
      this.modal.color = null
      this.modal.data = null
      this.modal.uniqueId = null
      this.modal.message = null
      this.modal.labelButton = null
    },
    editProfile() {
      this.$nextTick(() => {
        this.$refs.form_profile.reset()
      })
      this.modal.showModal = true
      this.modal.title = 'Update Data'
      this.modal.color = 'success'
      this.modal.labelButton = 'Simpan'
      this.modal.method = 'patch'
    },
    closeModalPostPut() {
      this.modal.showModal = false
      this.clearModalPostPut()
    },
    showFile(value) {
      window.open(value)
    },
  },
}
</script>

<style></style>

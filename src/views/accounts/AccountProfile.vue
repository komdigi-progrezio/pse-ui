<template>
  <div>
    <CCard>
      <CCardHeader>
        <CIcon name="cil-user" /> Profil
        <div class="card-header-actions">
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
        </div>
      </CCardHeader>
      <CCardBody>
        <div class="table-responsive">
          <table class="table table-stripped">
            <tbody>
              <tr>
                <td>Nama Lengkap</td>
                <td>{{ profile.nama }}</td>
              </tr>
              <tr>
                <td>NIP</td>
                <td>{{ profile.nip }}</td>
              </tr>
              <tr>
                <td>Jabatan</td>
                <td>{{ profile.jabatan }}</td>
              </tr>
              <tr>
                <td>No Telepon</td>
                <td>{{ profile.no_telepon }}</td>
              </tr>
              <tr>
                <td>Instansi Induk</td>
                <td>{{ profile.instansi_induk_text }}</td>
              </tr>
              <tr>
                <td>Satuan Kerja Induk</td>
                <td>{{ profile.satuan_kerja }}</td>
              </tr>
              <tr>
                <td>Alamat</td>
                <td>{{ profile.alamat }}</td>
              </tr>
              <tr>
                <td>Nama Provinsi</td>
                <td>{{ profile.nama_provinsi }}</td>
              </tr>
              <tr>
                <td>Nama Kota</td>
                <td>{{ profile.nama_kota }}</td>
              </tr>
              <tr>
                <td>Kode POS</td>
                <td>{{ profile.kode_pos }}</td>
              </tr>
              <tr>
                <td>Dokumen</td>
                <td>
                  <a href="" @click.prevent="showFile(profile.url)"
                    >Lihat File</a
                  >
                </td>
              </tr>
              <tr>
                <td>Tanggal Pendaftaran</td>
                <td>{{ profile.created_at }}</td>
              </tr>
              <tr>
                <td>Pemutakhiran Data</td>
                <td>{{ profile.modified_at }}</td>
              </tr>
              <tr>
                <td>Status Data</td>
                <td>{{ profile.status === 1 ? 'Aktif' : 'Tidak Aktif' }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </CCardBody>
    </CCard>
    <ValidationObserver v-slot="{ invalid }" ref="form_profile">
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
                    rules="required|digits:18"
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
          <CButton
            color="primary"
            size="sm"
            class="m-2"
            :disabled="invalid"
            @click="submitProfile"
          >
            {{ modal.labelButton }}
          </CButton>
        </template>
      </CModal>
    </ValidationObserver>
  </div>
</template>

<script>
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
        nama_provinsi: null,
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
        dokumen: null,
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
        dokumen: [],
      },
    }
  },
  created() {
    this.getProfile()
  },
  methods: {
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
          this.profile.instansi_induk_text =
            response.data.data.instansi_induk_text
          this.profile.kode_pos = response.data.data.kode_pos
          this.profile.dokumen = response.data.data.dokumen
          this.profile.nama_provinsi = response.data.data.nama_provinsi
          this.profile.nama_kota = response.data.data.nama_kota
          this.profile.created_at = response.data.data.created_at
          this.profile.modified_at = response.data.data.modified_at
          this.profile.status = response.data.data.status
          this.profile.url = response.data.data.url_dokumen

          this.forms.id = response.data.data.id
          this.forms.nama = response.data.data.nama
          this.forms.nip = response.data.data.nip
          this.forms.jabatan = response.data.data.jabatan
          this.forms.no_telepon = response.data.data.no_telepon
          this.forms.no_hp = response.data.data.no_hp

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

      this.$http({
        method: 'post',
        url: url,
        data: formData,
      })
        .then((response) => {
          this.$toastr.s(response.data.message, 'Pemberitahuan')
          this.$refs.form_profile.reset()
          this.closeModalPostPut()
          this.getProfile()
        })
        .catch((error) => {
          if (error.response.status === 422) {
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
      this.$refs.form_profile.reset()
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

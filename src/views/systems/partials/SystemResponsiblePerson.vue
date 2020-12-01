<template>
  <div class="mt-2">
    <h5>Penanggung Jawab</h5>
    <hr />
    <button class="btn btn-link d-flex" @click.prevent="addResponsible">
      <CIcon name="cil-plus" class="align-self-center mr-2" />
      <a href="" class="align-self-center">Perbaharui Data Penanggung Jawab</a>
    </button>
    <div class="table-responsive">
      <table class="table table-stripped" v-if="responsible === null">
        <tbody>
          <tr>
            <td>Nama Penanggung Jawab</td>
            <td>Kosong</td>
          </tr>
          <tr>
            <td>NIP</td>
            <td>Kosong</td>
          </tr>
          <tr>
            <td>Jabatan</td>
            <td>Kosong</td>
          </tr>
          <tr>
            <td>Satuan Kerja</td>
            <td>Kosong</td>
          </tr>
          <tr>
            <td>Alamat</td>
            <td>Kosong</td>
          </tr>
          <tr>
            <td>Provinsi</td>
            <td>Kosong</td>
          </tr>
          <tr>
            <td>Kota / Kabupaten</td>
            <td>Kosong</td>
          </tr>
          <tr>
            <td>Kode POS</td>
            <td>Kosong</td>
          </tr>
          <tr>
            <td>No Telepon</td>
            <td>Kosong</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>Kosong</td>
          </tr>
        </tbody>
      </table>
      <table class="table table-stripped" v-else>
        <tbody>
          <tr>
            <td>Nama Penanggung Jawab</td>
            <td>{{ responsible.nama }}</td>
          </tr>
          <tr>
            <td>NIP</td>
            <td>{{ responsible.nip }}</td>
          </tr>
          <tr>
            <td>Jabatan</td>
            <td>{{ responsible.jabatan }}</td>
          </tr>
          <tr>
            <td>Satuan Kerja</td>
            <td>{{ responsible.nama_satuan_kerja }}</td>
          </tr>
          <tr>
            <td>Alamat</td>
            <td>{{ responsible.alamat_satuan_kerja }}</td>
          </tr>
          <tr>
            <td>Provinsi</td>
            <td>{{ responsible.nama_provinsi }}</td>
          </tr>
          <tr>
            <td>Kota / Kabupaten</td>
            <td>{{ responsible.nama_kabupaten }}</td>
          </tr>
          <tr>
            <td>Kode POS</td>
            <td>{{ responsible.kode_pos_satuan_kerja }}</td>
          </tr>
          <tr>
            <td>No Telepon</td>
            <td>{{ responsible.handphone }}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{{ responsible.email }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <ValidationObserver v-slot="{ invalid }" ref="form_responsible_person">
      <CModal
        :title="modal.responsible.title"
        :color="modal.responsible.color"
        :show.sync="modal.responsible.showModal"
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
                      v-model="forms.responsible.nama"
                      type="text"
                      name="name"
                      placeholder="Masukan Nama Lengkap"
                      class="form-control"
                      :class="{
                        'is-invalid':
                          errors.length > 0 ||
                          errorValidations.responsible.nama.length > 0,
                      }"
                      @blur="errorValidations.responsible.nama = []"
                    />
                    <div v-if="errors.length > 0" class="invalid-feedback">
                      {{ errors[0] }}
                    </div>
                  </ValidationProvider>
                  <message :messages="errorValidations.responsible.nama" />
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
                      v-model="forms.responsible.nip"
                      type="text"
                      maxlength="18"
                      class="form-control"
                      placeholder="Masukan NIP"
                      :class="{
                        'is-invalid':
                          errors.length > 0 ||
                          errorValidations.responsible.nip.length > 0,
                      }"
                      @blur="errorValidations.responsible.nip = []"
                    />
                    <div v-if="errors.length > 0" class="invalid-feedback">
                      {{ errors[0] }}
                    </div>
                  </ValidationProvider>
                  <message :messages="errorValidations.responsible.nama" />
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
                      v-model="forms.responsible.jabatan"
                      type="text"
                      name="name"
                      placeholder="Masukan Jabatan"
                      class="form-control"
                      :class="{
                        'is-invalid':
                          errors.length > 0 ||
                          errorValidations.responsible.jabatan.length > 0,
                      }"
                      @blur="errorValidations.responsible.jabatan = []"
                    />
                    <div v-if="errors.length > 0" class="invalid-feedback">
                      {{ errors[0] }}
                    </div>
                  </ValidationProvider>
                  <message :messages="errorValidations.responsible.jabatan" />
                </div>
              </CCol>
              <CCol sm="12">
                <div class="form-group">
                  <label for="email">Email</label>
                  <ValidationProvider
                    name="E-mail"
                    :rules="{
                      required: true,
                      email: true,
                    }"
                    v-slot="{ errors }"
                  >
                    <input
                      v-model="forms.responsible.email"
                      type="text"
                      class="form-control"
                      placeholder="Masukan Email"
                      :class="{
                        'is-invalid':
                          errors.length > 0 ||
                          errorValidations.responsible.email.length > 0,
                      }"
                      @blur="errorValidations.responsible.email = []"
                    />
                    <div v-if="errors.length > 0" class="invalid-feedback">
                      {{ errors[0] }}
                    </div>
                  </ValidationProvider>
                  <message :messages="errorValidations.responsible.email" />
                </div>
              </CCol>
              <CCol sm="12">
                <div class="form-group">
                  <label for="handphone">Nomor Handphone</label>
                  <ValidationProvider
                    name="Nomor Handphone"
                    rules="required|numeric"
                    v-slot="{ errors }"
                  >
                    <input
                      v-model="forms.responsible.handphone"
                      type="text"
                      class="form-control"
                      placeholder="Masukan Nomor Handphone"
                      :class="{
                        'is-invalid':
                          errors.length > 0 ||
                          errorValidations.responsible.handphone.length > 0,
                      }"
                      @blur="errorValidations.responsible.handphone = []"
                    />
                    <div v-if="errors.length > 0" class="invalid-feedback">
                      {{ errors[0] }}
                    </div>
                  </ValidationProvider>
                  <message :messages="errorValidations.responsible.handphone" />
                </div>
              </CCol>
              <CCol sm="12">
                <div class="form-group">
                  <ul class="w-100 p-0">
                    <tree-item :item="treeData" @selected="onSelect">
                    </tree-item>
                  </ul>
                </div>
              </CCol>
              <CCol sm="12">
                <div class="form-group">
                  <label for="name">Satuan Kerja</label>
                  <input
                    v-model="forms.responsible.satuan_kerja"
                    type="text"
                    name="name"
                    class="form-control"
                    disabled
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
            @click="closeModalResponsible"
          >
            Cancel
          </CButton>
          <CButton
            color="primary"
            size="sm"
            class="m-2"
            @click="submitResponsible"
            :disabled="invalid"
          >
            {{ modal.responsible.labelButton }}
          </CButton>
        </template>
      </CModal>
    </ValidationObserver>
  </div>
</template>

<script>
export default {
  name: 'SystemResponsible',
  props: {
    treeData: {
      type: Object,
      required: true,
      default: () => {},
    },
    responsible: {
      required: true,
      default: null,
    },
  },
  data() {
    return {
      modal: {
        responsible: {
          showModal: false,
          title: null,
          color: null,
          message: null,
          labelButton: null,
          uniqueId: null,
          url: null,
        },
      },
      forms: {
        responsible: {
          sis_profil_id: this.$route.params.id,
          nama: null,
          nip: null,
          jabatan: null,
          handphone: null,
          email: null,
          satuan_kerja: null,
          par_satuan_kerja_id: null,
        },
      },
      errorValidations: {
        responsible: {
          sis_profil_id: [],
          nama: [],
          nip: [],
          jabatan: [],
          handphone: [],
          email: [],
          satuan_kerja: [],
          par_satuan_kerja_id: [],
        },
      },
    }
  },
  methods: {
    //  Penanggung Jawab
    clearModalResponsible() {
      this.modal.responsible.title = null
      this.modal.responsible.color = null
      this.modal.responsible.labelButton = null
      this.modal.responsible.method = null
    },
    closeModalResponsible() {
      this.modal.responsible.showModal = false
      this.clearFormResponsible()
      this.clearModalResponsible()
    },
    clearFormResponsible() {
      this.forms.responsible.id = null
      this.forms.responsible.sis_profil_id = this.$route.params.id
      this.forms.responsible.nama = null
      this.forms.responsible.nip = null
      this.forms.responsible.jabatan = null
      this.forms.responsible.handphone = null
      this.forms.responsible.email = null
      this.forms.responsible.satuan_kerja = null
      this.forms.responsible.par_satuan_kerja_id = null
    },
    addResponsible() {
      this.clearFormResponsible()
      this.modal.responsible.showModal = true
      this.modal.responsible.title = 'Update Data'
      this.modal.responsible.color = 'success'
      this.modal.responsible.labelButton = 'Simpan'
      this.modal.responsible.method = 'post'

      this.forms.responsible.par_satuan_kerja_id =
        this.responsible === null ? null : this.responsible.par_satuan_kerja_id
      this.forms.responsible.nama =
        this.responsible === null ? null : this.responsible.nama
      this.forms.responsible.nip =
        this.responsible === null ? null : this.responsible.nip
      this.forms.responsible.jabatan =
        this.responsible === null ? null : this.responsible.jabatan
      this.forms.responsible.handphone =
        this.responsible === null ? null : this.responsible.handphone
      this.forms.responsible.email =
        this.responsible === null ? null : this.responsible.email
      this.forms.responsible.satuan_kerja =
        this.responsible === null ? null : this.responsible.satuan_kerja
      this.forms.responsible.par_satuan_kerja_id =
        this.responsible === null ? null : this.responsible.par_satuan_kerja_id
    },
    submitResponsible() {
      const url = '/person-in-charge'
      const formData = new FormData()
      let urlAction = null
      if (this.modal.responsible.method === 'patch') {
        urlAction = `${url}/${this.forms.responsible.id}`
        formData.append('_method', 'patch')
      } else {
        urlAction = url
        formData.append('_method', 'POST')
      }
      const forMapData = Object.entries(this.forms.responsible)
      forMapData.forEach((value) => {
        if (Array.isArray(value[1])) {
          for (let index = 0; index < value[1].length; index++) {
            formData.append(`${value[0]}[${index}]`, value[1][index])
          }
        } else {
          formData.append(value[0], value[1] === null ? [] : value[1])
        }
      })
      this.errorValidations.responsible.nama = []
      this.errorValidations.responsible.nip = []
      this.errorValidations.responsible.jabatan = []
      this.errorValidations.responsible.handphone = []
      this.errorValidations.responsible.email = []
      this.errorValidations.responsible.satuan_kerja = []
      this.errorValidations.responsible.par_satuan_kerja_id = []

      this.$http({
        method: 'post',
        url: urlAction,
        data: formData,
      })
        .then((response) => {
          this.$emit('update-data')
          this.closeModalResponsible()
          this.$toastr.s(response.data.message, 'Pemberitahuan')
          this.$refs.form_responsible.reset()
        })
        .catch((error) => {
          if (error.response.status === 422) {
            this.errorValidations.responsible.nama =
              typeof error.response.data.errors.nama === 'undefined'
                ? []
                : error.response.data.errors.nama
            this.errorValidations.responsible.nip =
              typeof error.response.data.errors.nip === 'undefined'
                ? []
                : error.response.data.errors.nip
            this.errorValidations.responsible.jabatan =
              typeof error.response.data.errors.jabatan === 'undefined'
                ? []
                : error.response.data.errors.jabatan
            this.errorValidations.responsible.handphone =
              typeof error.response.data.errors.handphone === 'undefined'
                ? []
                : error.response.data.errors.handphone
            this.errorValidations.responsible.email =
              typeof error.response.data.errors.email === 'undefined'
                ? []
                : error.response.data.errors.email
            this.errorValidations.responsible.satuan_kerja =
              typeof error.response.data.errors.satuan_kerja === 'undefined'
                ? []
                : error.response.data.errors.satuan_kerja
            this.errorValidations.responsible.par_satuan_kerja_id =
              typeof error.response.data.errors.par_satuan_kerja_id ===
              'undefined'
                ? []
                : error.response.data.errors.par_satuan_kerja_id
          } else if (error.response.status === 500) {
            this.$toastr.e('Ada Kesalahan dari Server', 'Pemberitahuan')
          } else {
            this.$toastr.e(error.response.data.message, 'Pemberitahuan')
          }
        })
    },
    //  Get Data Tree View
    onSelect: function () {
      this.forms.responsible.par_satuan_kerja_id = this.$store.state.treeView.workUnit.id
      this.forms.responsible.satuan_kerja = this.$store.state.treeView.workUnit.name
    },
  },
}
</script>

<style></style>

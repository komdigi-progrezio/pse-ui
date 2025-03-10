<template>
  <div class="mt-lg-2">
    <h5>Profil Penyelenggara Sistem Elektronik </h5>
    <hr />
    <button
      v-if="system.approved_publish == true && system.is_locked !== true"
      class="btn btn-link d-flex"
      @click.prevent="addOrganizer"
    >
      <CIcon name="cil-plus" class="align-self-center mr-2" />
      <a href="" class="align-self-center">Perbaharui Profil Penyelenggara</a>
    </button>
    <div class="table-responsive classic">
      <table class="table table-stripped" v-if="organizer === null">
        <tbody>
          <tr>
            <td> Instansi Penyelenggara Negara</td>
            <td>Kosong</td>
          </tr>
          <tr>
            <td>Nama Satuan Kerja</td>
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
            <td>Website</td>
            <td>Kosong</td>
          </tr>
        </tbody>
      </table>
      <table class="table table-stripped" v-else>
        <tbody>
          <tr>
            <td> Instansi Penyelenggara Negara</td>
            <td>{{ organizer.nama_instansi }}</td>
          </tr>
          <tr>
            <td>Nama Satuan Kerja</td>
            <td>{{ organizer.name }}</td>
          </tr>
          <tr>
            <td>Alamat</td>
            <td>{{ organizer.alamat }}</td>
          </tr>
          <tr>
            <td>Provinsi</td>
            <td>{{ organizer.nama_provinsi }}</td>
          </tr>
          <tr>
            <td>Kota / Kabupaten</td>
            <td>{{ organizer.nama_kabupaten }}</td>
          </tr>
          <tr>
            <td>Kode POS</td>
            <td>{{ organizer.kode_pos }}</td>
          </tr>
          <tr>
            <td>No Telepon</td>
            <td>{{ organizer.no_telp }}</td>
          </tr>
          <tr>
            <td>Website</td>
            <td>{{ organizer.website }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <ValidationObserver
      v-if="system.is_locked !== true"
      v-slot="{ invalid }"
      ref="form_organizer"
    >
      <CModal
        :title="modal.organizer.title"
        :color="modal.organizer.color"
        :show.sync="modal.organizer.showModal"
      >
        <template v-slot:body-wrapper>
          <div class="modal-body">
            <CRow>
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
                  <label for="name">Satuan Kerja<span class="text-danger">*</span></label>
                  <input
                    v-model="forms.organizer.name"
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
            @click="closeModalOrganizer"
          >
            Cancel
          </CButton>
          <CButton
            color="primary"
            size="sm"
            class="m-2"
            @click="submitOrganizer"
            :disabled="invalid"
          >
            {{ modal.organizer.labelButton }}
          </CButton>
        </template>
      </CModal>
    </ValidationObserver>
  </div>
</template>

<script>
export default {
  name: 'SystemOrganizerProfile',
  props: {
    system: {
      type: Object,
      required: true,
      default: () => {},
    },
    treeData: {
      type: Object,
      required: true,
      default: () => {},
    },
    organizer: {
      required: true,
      default: () => {},
    },
  },
  data() {
    return {
      modal: {
        organizer: {
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
        organizer: {
          sis_profil_id: this.$route.params.id,
          par_satuan_kerja_id: null,
          name: null,
        },
      },
      errorValidations: {
        organizer: {
          par_satuan_kerja_id: [],
        },
      },
    }
  },
  methods: {
    //  Organizer
    clearModalOrganizer() {
      this.modal.organizer.title = null
      this.modal.organizer.color = null
      this.modal.organizer.labelButton = null
      this.modal.organizer.method = null
    },
    closeModalOrganizer() {
      this.modal.organizer.showModal = false
      this.clearFormOrganizer()
      this.clearModalOrganizer()
    },
    clearFormOrganizer() {
      this.forms.organizer.id = null
      this.forms.organizer.sis_profil_id = this.$route.params.id
      this.forms.organizer.par_satuan_kerja_id = null
    },
    addOrganizer() {
      this.clearFormOrganizer()
      this.modal.organizer.showModal = true
      this.modal.organizer.title = 'Update Data'
      this.modal.organizer.color = 'success'
      this.modal.organizer.labelButton = 'Simpan'
      this.modal.organizer.method = 'post'

      this.forms.organizer.par_satuan_kerja_id =
        this.organizer === null ? null : this.organizer.par_satuan_kerja_id
      this.forms.organizer.name =
        this.organizer === null ? null : this.organizer.name
    },
    submitOrganizer() {
      const url = '/organizers'
      const formData = new FormData()
      let urlAction = null
      if (this.modal.organizer.method === 'patch') {
        urlAction = `${url}/${this.forms.organizer.id}`
        formData.append('_method', 'patch')
      } else {
        urlAction = url
        formData.append('_method', 'POST')
      }
      const forMapData = Object.entries(this.forms.organizer)
      forMapData.forEach((value) => {
        if (Array.isArray(value[1])) {
          for (let index = 0; index < value[1].length; index++) {
            formData.append(`${value[0]}[${index}]`, value[1][index])
          }
        } else {
          formData.append(value[0], value[1] === null ? [] : value[1])
        }
      })
      this.errorValidations.organizer.par_satuan_kerja_id = []

      this.$http({
        method: 'post',
        url: urlAction,
        data: formData,
      })
        .then((response) => {
          this.$emit('update-data')
          this.closeModalOrganizer()
          this.$toastr.s(response.data.message, 'Pemberitahuan')
          this.$nextTick(() => {
            this.$refs.form_organizer.reset()
          })
        })
        .catch((error) => {
          if (error.response.status === 422) {
            this.$toastr.e('Silahkan Cek Form Anda Kembali', 'Pemberitahuan')
            this.errorValidations.organizer.par_satuan_kerja_id =
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
      this.forms.organizer.par_satuan_kerja_id = this.$store.state.treeView.workUnit.id
      this.forms.organizer.name = this.$store.state.treeView.workUnit.name
    },
  },
}
</script>
<style scoped>
.item {
  cursor: pointer;
}
.bold {
  font-weight: bold;
}
ul {
  padding-left: 1em;
  line-height: 1.5em;
  list-style-type: dot;
}
</style>

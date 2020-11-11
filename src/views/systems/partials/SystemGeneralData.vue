<template>
  <div class="mt-2">
    <a :to="`/admin/systems/1/edit`">Perbaharui Profil Layanan</a>
    <div class="table-responsive">
      <table class="table table-stripped">
        <tbody>
          <tr class="row-profile-service">
            <td colspan="2">Profil Layanan</td>
          </tr>
          <tr>
            <td>Nama Internal</td>
            <td>Data Dummy</td>
          </tr>
          <tr>
            <td>Nama Eksternal</td>
            <td>Data Dummy</td>
          </tr>
          <tr>
            <td>Keterangan</td>
            <td>Data Dummy</td>
          </tr>
          <tr>
            <td>Kategori Sistem Elektronik</td>
            <td>Rendah (Tidak ada Dokumen)</td>
          </tr>
          <tr>
            <td>Kategori Akses</td>
            <td>Offline</td>
          </tr>
          <tr>
            <td
              >Bersedia untuk dipublikasikan melalui portal layanan publik?</td
            >
            <td>Tidak</td>
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
                  content: 'Hapus Fungsi Utama',
                  placement: 'bottom',
                }"
                @click="destroyMainFunction()"
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
                @click="editMainFunction()"
              >
                <CIcon name="cil-pencil" />
              </CButton>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <h5>Ruang Lingkup</h5>
    <hr />
    <a href="" @click.prevent="">Tambah Ruang Lingkup</a>
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
          <tr>
            <td>1</td>
            <td>Data Dummy</td>
            <td>
              <CButton
                color="danger"
                size="sm"
                class="mr-2"
                v-c-tooltip="{
                  content: 'Hapus Ruang Lingkup',
                  placement: 'bottom',
                }"
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
              >
                <CIcon name="cil-pencil" />
              </CButton>
            </td>
          </tr>
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
    <div class="form-group">
      <label for="name">Data Tersedia ? </label>
      <div class="form-check form-check-inline ml-2">
        <input
          class="form-check-input"
          id="inline-radio1"
          type="radio"
          value="0"
          name="inline-radios"
        />
        <label class="form-check-label" for="inline-radio1">Tidak</label>
      </div>
      <div class="form-check form-check-inline mr-1">
        <input
          class="form-check-input"
          id="inline-radio1"
          type="radio"
          value="1"
          name="inline-radios"
        />
        <label class="form-check-label" for="inline-radio1">Ya</label>
      </div>
    </div>
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
    <div class="form-group">
      <label for="name">Data Tersedia ? </label>
      <div class="form-check form-check-inline ml-2">
        <input
          class="form-check-input"
          id="inline-radio1"
          type="radio"
          value="0"
          name="inline-radios"
        />
        <label class="form-check-label" for="inline-radio1">Tidak</label>
      </div>
      <div class="form-check form-check-inline mr-1">
        <input
          class="form-check-input"
          id="inline-radio1"
          type="radio"
          value="1"
          name="inline-radios"
        />
        <label class="form-check-label" for="inline-radio1">Ya</label>
      </div>
      <div> </div>
    </div>
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
  </div>
</template>

<script>
export default {
  name: 'SystemGeneralData',
  data() {
    return {
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
        },
      },
      forms: {
        mainFunction: {
          id: null,
          sis_profil_id: this.$route.params.id,
          fungsi_sistem: null,
          keterangan: null,
        },
      },
      errorValidations: {
        mainFunction: {
          fungsi_sistem: [],
        },
      },
    }
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
    updateProfileService() {},
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
      console.log(1)
    },
    destroyMainFunction() {
      this.modal.delete.showModal = true
      this.modal.delete.title = 'Hapus Data'
      this.modal.delete.color = 'danger'
      this.modal.delete.data = 'Dummy Data'
      this.modal.delete.uniqueId = 1
      this.modal.delete.message = 'Ingin Menghapus Data'
      this.modal.delete.labelButton = 'Hapus'
    },
    editMainFunction() {
      console.log()
    },
    //  Delete
    submitDelete() {
      console.log(1)
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

<template>
  <div>
    <div
      v-if="data.system.approved === 1 && data.system.publish === 0"
      class="alert alert-warning"
      role="alert"
    >
      Status Halaman ini adalah <strong>READ ONLY</strong>, Jika Anda Ingin
      Melakukan Perubahan Data,
      <router-link to="/admin/dashboard">Silahkan Isi Form Disini</router-link>
    </div>

    <CCard>
      <CCardBody class="p-3">
        <div class="d-flex justify-content-between">
          <div>
            <img
              v-if="data.system.approved === 1 && data.system.img_badge"
              :src="data.system.img_badge"
            />
            <p ref="logo_img" style="display: none">
              {{ data.system.img_badge }}</p
            >

            <button
              v-if="data.system.approved === 1 && data.system.img_badge"
              class="btn btn-info align-self-center m-2"
              @click="showCopyModal()"
            >
              Salin Sertifikat
            </button>
          </div>

          <div>
            <CButton
              v-if="data.system.approved !== 1"
              class="mr-1"
              color="success"
              v-c-tooltip="{
                content: 'Setujui Sistem Elektronik',
                placement: 'bottom',
              }"
              @click="approve(data.system)"
            >
              <CIcon name="cil-check" />
              &nbsp;
              <span class="">Setujui Sistem Elektronik</span>
            </CButton>
          </div>
        </div>
      </CCardBody>
    </CCard>

    <CCard>
      <CCardHeader>
        <CIcon name="cil-description" /> Detail Sistem Elektronik
      </CCardHeader>

      <CCardBody>
        <CTabs justified class="nav-column-mobile">
          <CTab title="Data Umum">
            <system-general-data
              :kind-of-service="data.kindOfService"
              :special-function="data.specialFunction"
              :scope="data.scope"
              :system="data.system"
              :document="data.document"
              :related="data.related"
              :security="data.security"
              :certificate="data.certificate"
              :service-user="data.serviceUser"
              @update-data="getData"
            ></system-general-data>
          </CTab>
          <CTab title="Profil Penyelenggara">
            <system-organizer-profile
              :system="data.system"
              :organizer="data.organizer"
              :tree-data="treeData"
              @update-data="getData"
            ></system-organizer-profile>
          </CTab>
          <CTab title="Perangkat Keras">
            <system-hardware
              :system="data.system"
              :system-id="data.system.id"
              :hardware="data.hardware"
              :network="data.network"
              :peripheral="data.peripheral"
              @update-data="getData"
            ></system-hardware>
          </CTab>
          <CTab title="Perangkat Lunak">
            <system-software
              :system="data.system"
              :software="data.software"
              :software-tool="data.softwareTool"
              :system-id="data.system.id"
              @update-data="getData"
            ></system-software>
          </CTab>
          <CTab title="Tenaga Ahli">
            <system-experts
              :system="data.system"
              :availability-of-experts="data.availabilityOfExperts"
              :experts-required="data.expertsRequired"
              @update-data="getData"
            ></system-experts>
          </CTab>
          <CTab title="Tata Kelola">
            <system-governance
              :system="data.system"
              :system-id="data.system.id"
              :legal-basis="data.legalBasis"
              :sop="data.sop"
              @update-data="getData"
            ></system-governance>
          </CTab>
          <CTab title="Penanggung Jawab">
            <system-responsible-person
              :system="data.system"
              :responsible="data.responsible_person"
              :tree-data="treeData"
              @update-data="getData"
            ></system-responsible-person>
          </CTab>
          <CTab title="Help Desk">
            <system-help-desk
              :system="data.system"
              :system-id="data.system.id"
              :help-desk="data.helpDesk"
              @update-data="getData"
            ></system-help-desk>
          </CTab>
          <CTab title="Dokumen">
            <system-document
              :system="data.system"
              :system-id="data.system.id"
              :documents="data.document"
              @update-data="getData"
            ></system-document>
          </CTab>
        </CTabs>
      </CCardBody>
    </CCard>

    <CModal
      title="Salin kode dibawah"
      :show.sync="modal.copy.show"
      color="success"
    >
      <template v-slot:body-wrapper>
        <div class="modal-body">
          <CRow>
            <CCol sm="12">
              <div class="form-group">
                <textarea
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  v-model="modal.copy.value"
                ></textarea>
                <textarea
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  v-model="modal.copy.link"
                ></textarea>
              </div>
            </CCol>
          </CRow>
        </div>
      </template>
    </CModal>
    <CModal
      :title="modal.title"
      :color="modal.color"
      :show.sync="modal.showModal"
    >
      <template v-slot:body-wrapper>
        <div class="modal-body">
          <p>
            {{ modal.message }}
            <strong>{{ modal.data }}</strong
            >?
          </p>
        </div>
      </template>
      <template v-slot:footer>
        <CButton color="dark" size="sm" class="m-2" @click="closeModal">
          Cancel
        </CButton>
        <CButton
          color="primary"
          size="sm"
          class="m-2"
          @click="submit"
          :disabled="isSubmit"
        >
          {{ modal.labelButton }}
          <CSpinner size="sm" color="info" v-if="isSubmit" />
        </CButton>
      </template>
    </CModal>
  </div>
</template>

<script>
import SystemGeneralData from './partials/SystemGeneralData'
import SystemOrganizerProfile from './partials/SystemOrganizerProfile'
import SystemDocument from './partials/SystemDocument'
import SystemExperts from './partials/SystemExperts'
import SystemGovernance from './partials/SystemGovernance'
import SystemHardware from './partials/SystemHardware'
import SystemSoftware from './partials/SystemSoftware'
import SystemHelpDesk from './partials/SystemHelpDesk'
import SystemResponsiblePerson from './partials/SystemResponsiblePerson'

export default {
  name: 'SystemDetail',
  components: {
    SystemGeneralData,
    SystemOrganizerProfile,
    SystemDocument,
    SystemExperts,
    SystemGovernance,
    SystemHardware,
    SystemSoftware,
    SystemHelpDesk,
    SystemResponsiblePerson,
  },
  data() {
    return {
      isSubmit: false,
      spinner: false,
      data: {
        system: {
          id: null,
          account_id: null,
          nama_internal: null,
          nama_eksternal: null,
          deskripsi: null,
          fungsi: null,
          cakupan_wilayah: null,
          keterkaitan_sistem: null,
          keterkaitan_sistem_text: null,
          sifat_khusus: null,
          name_sifat_khusus: null,
          approved: null,
          approved_date: null,
          no_reg: null,
          img_badge: null,
          flag_sistem_pengaman: null,
          flag_sertifikasi: null,
          flag_dasar_hukum: null,
          flag_sop: null,
          kategori_akses: null,
          url: null,
          publish: null,
          name_publish: null,
          publish_date: null,
          deleted: null,
          flag_tenaga_ahli: null,
          is_locked: null,
          locked_at: null,
          keylock: null,
          keylock_at: null,
          keylock_expired: null,
          instansi_induk_text: null,
          name: null,
          nip: null,
          progress: null,
        },
        kindOfService: [],
        specialFunction: [],
        scope: [],
        legalBasis: [],
        sop: [],
        helpDesk: [],
        document: [],
        organizer: null,
        related: [],
        security: [],
        certificate: [],
        serviceUser: [],
        availabilityOfExperts: [],
        expertsRequired: [],
        hardware: [],
        peripheral: [],
        network: [],
        software: [],
        softwareTool: [],
        responsible_person: null,
      },
      modal: {
        showModal: false,
        title: null,
        color: null,
        message: null,
        labelButton: null,
        url: null,
        uniqueId: null,
        method: null,
        copy: {
          show: false,
          value: '',
        },
      },
      treeData: {
        name: 'Satuan Kerja',
        id: null,
        children: [],
      },
    }
  },
  mounted() {
    this.getData()
    this.fetchTreeViewWorkUnit()
  },
  methods: {
    clearModal() {
      this.modal.title = null
      this.modal.color = null
      this.modal.data = null
      this.modal.message = null
      this.modal.url = null
      this.modal.labelButton = null
      this.modal.uniqueId = null
      this.modal.method = null
    },
    closeModal() {
      this.modal.showModal = false
      this.clearModal()
    },
    approve(value) {
      console.log(value)
      this.modal.showModal = true
      this.modal.title = 'Setujui Data'
      this.modal.color = 'success'
      this.modal.data = value.nama_internal
      this.modal.uniqueId = value.id
      this.modal.message = 'Ingin Mensetujui Data'
      this.modal.labelButton = 'Setujui'
      this.modal.url = 'systems/approved'
      this.modal.method = 'patch'
    },
    submit() {
      this.isSubmit = true
      this.$http({
        method: this.modal.method,
        url: `/${this.modal.url}/${this.modal.uniqueId}`,
      })
        .then((response) => {
          //this.filterData()
          this.closeModal()
          this.$toastr.s(response.data.message, 'Pemberitahuan')
          this.isSubmit = false
        })
        .catch((error) => {
          this.isSubmit = false
          if (error.response.status === 500) {
            this.$toastr.e('Ada Kesalahan dari Server', 'Pemberitahuan')
          } else {
            this.$toastr.e(error.response.data.message, 'Pemberitahuan')
          }
        })
    },
    fetchTreeViewWorkUnit() {
      this.$http
        .get('parsatuankerja/list/tree-view')
        .then((response) => {
          this.treeData.children = response.data
        })
        .catch((error) => {
          if (error.response.status === 500) {
            this.$toastr.e('Ada Kesalahan dari Server', 'Pemberitahuan')
          } else {
            this.$toastr.e(error.response.data.message, 'Pemberitahuan')
          }
        })
    },

    getData() {
      this.$http
        .get(`systems/${this.$route.params.id}`)
        .then((response) => {
          this.data.kindOfService = response.data.data.relation.kind_of_service
          this.data.specialFunction =
            response.data.data.relation.special_function
          this.data.scope = response.data.data.relation.scope
          this.data.organizer = response.data.data.relation.organizer
          this.data.responsible_person =
            response.data.data.relation.responsible_person
          this.data.document = response.data.data.relation.document
          this.data.legalBasis = response.data.data.relation.legal_basis
          this.data.sop = response.data.data.relation.sop
          this.data.helpDesk = response.data.data.relation.help_desk
          this.data.related = response.data.data.relation.related
          this.data.hardware = response.data.data.relation.hardware
          this.data.software = response.data.data.relation.software
          this.data.peripheral = response.data.data.relation.peripheral
          this.data.network = response.data.data.relation.network
          this.data.software = response.data.data.relation.software
          this.data.softwareTool = response.data.data.relation.software_tool
          this.data.expertsRequired =
            response.data.data.relation.expert_required
          this.data.availabilityOfExperts =
            response.data.data.relation.availability_of_expert
          this.data.security = response.data.data.relation.security
          this.data.certificate = response.data.data.relation.certificate
          this.data.serviceUser = response.data.data.relation.service_user
          this.data.system.id = response.data.data.id
          this.data.system.account_id = response.data.data.account_id
          this.data.system.nama_internal = response.data.data.nama_internal
          this.data.system.nama_eksternal = response.data.data.nama_eksternal
          this.data.system.deskripsi = response.data.data.deskripsi
          this.data.system.fungsi = response.data.data.fungsi
          this.data.system.cakupan_wilayah = response.data.data.cakupan_wilayah
          this.data.system.keterkaitan_sistem =
            response.data.data.keterkaitan_sistem
          this.data.system.keterkaitan_sistem_text =
            response.data.data.keterkaitan_sistem_text
          this.data.system.sifat_khusus = response.data.data.sifat_khusus
          this.data.system.name_sifat_khusus =
            response.data.data.name_sifat_khusus
          this.data.system.approved = response.data.data.approved
          this.data.system.approved_date = response.data.data.approved_date
          this.data.system.no_reg = response.data.data.no_reg
          this.data.system.img_badge = response.data.data.img_badge
          this.data.system.flag_sistem_pengaman =
            response.data.data.flag_sistem_pengaman
          this.data.system.flag_sertifikasi =
            response.data.data.flag_sertifikasi
          this.data.system.flag_dasar_hukum =
            response.data.data.flag_dasar_hukum
          this.data.system.flag_sop = response.data.data.flag_sop
          this.data.system.kategori_akses = response.data.data.kategori_akses
          this.data.system.url = response.data.data.url
          this.data.system.publish = response.data.data.publish
          this.data.system.name_publish = response.data.data.name_publish
          this.data.system.publish_date = response.data.data.publish_date
          this.data.system.deleted = response.data.data.deleted
          this.data.system.flag_tenaga_ahli =
            response.data.data.flag_tenaga_ahli
          this.data.system.is_locked = response.data.data.is_locked
          this.data.system.locked_at = response.data.data.locked_at
          this.data.system.keylock = response.data.data.keylock
          this.data.system.keylock_at = response.data.data.keylock_at
          this.data.system.keylock_expired = response.data.data.keylock_expired
          this.data.system.instansi_induk_text =
            response.data.data.instansi_induk_text
          this.data.system.name = response.data.data.name
          this.data.system.nip = response.data.data.nip
          this.data.system.progress = response.data.data.progress
        })
        .catch((error) => {
          if (error.response.status === 500) {
            this.$toastr.e('Ada Kesalahan dari Server', 'Pemberitahuan')
          } else {
            this.$toastr.e(error.response.data.message, 'Pemberitahuan')
          }
        })
    },

    showCopyModal() {
      this.modal.copy = {
        //ini dirubah
        value: this.$refs.logo_img.innerHTML,
        link: `${location.origin}/sealid/${this.data.system.no_reg}`,
        show: true,
      }
    },
  },
}
</script>

<style scoped>
.row-profile-service {
  background-color: #dfdfdf;
}
.row-profile-service td {
  padding: 30px 0 10px 0;
}
</style>

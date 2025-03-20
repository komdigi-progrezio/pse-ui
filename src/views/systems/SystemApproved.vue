<template>
  <div>
    <CCard>
      <CCardHeader> Filter </CCardHeader>
      <CCardBody>
        <div class="d-flex p-3 p-lg-0">
          <CButton
            color="dark"
            variant="outline"
            size="sm"
            class="mr-2"
            :class="{ 'mr-auto': search.nama_eksternal === null }"
            v-c-tooltip="{
              content: 'Filter',
              placement: 'bottom',
            }"
            @click="filter"
          >
            Filter
            <CIcon :name="setIconFilter" />
          </CButton>
          <CButton
            v-show="search.nama_eksternal !== null"
            color="info"
            variant="outline"
            size="sm"
            class="mr-auto"
            v-c-tooltip="{
              content: 'Bersihkan',
              placement: 'bottom',
            }"
            @click="clearFilter"
          >
            Clear All
            <CIcon name="cil-clear-all" />
          </CButton>
          <template v-if="listFilter">
            <CButton
              color="primary"
              variant="outline"
              size="sm"
              class="mr-2"
              v-c-tooltip="{
                content: 'Cari',
                placement: 'bottom',
              }"
              @click="filterData"
            >
              Search
              <CIcon name="cil-search" />
            </CButton>
            <CButton
              color="danger"
              variant="outline"
              size="sm"
              v-c-tooltip="{
                content: 'Reset',
                placement: 'bottom',
              }"
              @click="resetFilter"
            >
              Reset
              <CIcon name="cil-reload" />
            </CButton>
          </template>
        </div>
        <template v-if="listFilter">
          <CRow class="px-3 p-lg-0 my-3">
            <CCol sm="12">
              <div class="form-group">
                <label for="name">Nama Sistem Elektronik</label>
                <input
                  v-model="search.nama_eksternal"
                  type="text"
                  name="nama_eksternal"
                  placeholder="Masukan Nama Sistem Elektronik"
                  class="form-control"
                />
              </div>
            </CCol>
            <CCol sm="12">
              <div class="form-group">
                <label for="name">Nama Instansi</label>
                <input
                  v-model="search.nama_instansi"
                  type="text"
                  name="nama_instansi"
                  placeholder="Masukan Nama Instansi"
                  class="form-control"
                />
              </div>
            </CCol>
            <CCol sm="12">
              <div class="form-group">
                <label for="name">Progress</label>
                <select v-model="search.progres" class="form-control">
                  <option value="">Pilih Progress</option>
                  <option
                    v-for="(value, index) in progress"
                    :value="value.id"
                    :key="`progress-${index}`"
                  >
                    {{ value.name }}
                  </option>
                </select>
              </div>
            </CCol>
            <CCol sm="12">
              <div class="form-group">
                <label for="name">Status</label>
                <select v-model="search.status" class="form-control">
                  <option value="">Pilih Status</option>
                  <option
                    v-for="(value, index) in status"
                    :value="value.id"
                    :key="`status-${index}`"
                  >
                    {{ value.name }}
                  </option>
                </select>
              </div>
            </CCol>
          </CRow>
        </template>
      </CCardBody>
    </CCard>
    <CCard>
      <CCardHeader>
        <div class="d-flex align-items-center w-100">
          <CIcon class="mr-1" name="cil-cloud" />
          <strong>Sistem Elektronik</strong>
          <div class="card-header-actions ml-auto">
            <CButton
              v-if="!isAdmin"
              color="success"
              shape="pill"
              size="sm"
              variant="outline"
              v-c-tooltip="{
                content: 'Tambah Sistem Elektronik',
                placement: 'bottom',
              }"
              :to="'/admin/systems/register'"
            >
              <CIcon name="cil-plus" />
            </CButton>
          </div>
        </div>
      </CCardHeader>
      <CCardBody>
        <div class="mt-lg-4">
          <div v-if="spinner" class="d-flex justify-content-center">
            <div class="spinner-border text-primary" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
          <div class="table-responsive">
            <table v-if="!spinner" class="table table-hover table-striped">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Nama User</th>
                  <th v-if="!isSubPejabat">Nama Penyelenggara</th>
                  <th>Nama Sistem Elektronik</th>
                  <th>Tanggal Update</th>
                  <th>Progress</th>
                  <th>Status</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                <template v-if="data.length > 0">
                  <tr v-for="(item, index) in data" :key="index">
                    <th scope="row">
                      {{
                        (pagination.current_page - 1) * pagination.per_page +
                        index +
                        1
                      }}
                    </th>
                    <td  v-if="item.account"
                      ><a :href="`/admin/account/${item.account.id}/official`">{{ item.account.nama }}</a></td
                    >
                    <td v-else> - </td>
                    <td v-if="!isSubPejabat">{{ item.organizer_profile }}</td>
                    <td
                      >{{ item.nama_internal }} / {{ item.nama_eksternal }}</td
                    >
                    <td>{{ formatDate(item.date_updated) }}</td>
                    <td
                      ><span class="mobile-only mr-1">Progress: </span>
                      {{ item.progress }}%</td
                    >
                    <td>{{ item.status }}</td>
                    <td>
                      <CButton
                        color="primary"
                        size="sm"
                        class="mr-2 mb-2"
                        v-c-tooltip="{
                          content: 'Detail Sistem Elektronik',
                          placement: 'bottom',
                        }"
                        :to="`/admin/systems/${item.id}`"
                      >
                        <CIcon name="cil-description" />
                        <span class="mobile-only ml-1"
                          >Detail Sistem Elektronik
                        </span>
                      </CButton>
                      <CButton
                        v-if="
                          item.status === 'Tidak Terdaftar' && (item.is_locked === false || item.is_locked === null) &&
                          item.progress === 100
                        "
                        color="success"
                        size="sm"
                        class="mr-2 mb-2"
                        v-c-tooltip="{
                          content: 'Kunci Sistem Elektronik',
                          placement: 'bottom',
                        }"
                        @click="confirmLocked(item)"
                      >
                        <CIcon name="cil-check" />
                        <span class="mobile-only ml-1"
                          >Kunci Sistem Elektronik
                        </span>
                      </CButton>
                      <CButton
                        v-if="
                          isAdmin &&
                          item.status === 'Tidak Terdaftar' &&
                          item.is_locked === true &&
                          item.progress === 100
                        "
                        color="warning"
                        size="sm"
                        class="mr-2 mb-2"
                        v-c-tooltip="{
                          content: 'Tambah alasan',
                          placement: 'bottom',
                        }"
                        @click="confirmReason(item)"
                      >
                        <CIcon name="cil-pencil" />
                        <span class="mobile-only ml-1">
                          Tambah alasan
                        </span>
                      </CButton>
                      <CButton
                        v-if="
                          reasonData.find(
                            (reason) =>
                              reason.sis_profil_id === item.id
                          ) !== undefined
                        "
                        color="info"
                        size="sm"
                        class="mr-2 mb-2"
                        v-c-tooltip="{
                          content: 'Detail Alasan',
                          placement: 'bottom',
                        }"
                        @click="DetailDataReason(item)"
                      >
                        <CIcon name="cil-justify-center" />
                        <span class="mobile-only ml-1">
                          Detail Alasan
                        </span>
                      </CButton>
                    </td>
                  </tr>
                </template>
                <template v-else>
                  <tr>
                    <td colspan="5" class="text-center"> Data Kosong </td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
        </div>
      </CCardBody>
    </CCard>
    <CPagination
      :activePage.sync="pagination.current_page"
      :pages="pagination.last_page"
      size="sm"
      align="center"
      @update:activePage="getData"
      v-if="data.length > 0"
    />
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
        <CButton color="primary" size="sm" class="m-2" @click="locked">
          {{ modal.labelButton }}
        </CButton>
      </template>
    </CModal>
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
    <CModal
      :title="modal.confirm.title"
      :color="modal.confirm.color"
      :show.sync="modal.confirm.showModal"
      :keyboard="false"
      @click.self.stop
      class="modal-confirm-layout"
    >
      <template v-slot:header>
        <h5 class="modal-title">{{ modal.confirm.title }}</h5>
        <button type="button" class="close" aria-label="Close" @click="closeConfirmModal">
          <span aria-hidden="true">&times;</span>
        </button>
      </template>
      <template v-slot:body-wrapper>
        <div class="modal-body">
          <CRow>
            <CCol sm="12">
              <p>Yth {{ modal.confirm.user_name }}</p>
              <p>Berikut ini merupakan informasi dari Sistem Elektronik yang Anda daftarkan. <br/><br/>
                <b>Nama Sistem Elektronik:</b>  {{ modal.confirm.nama_internal }} <br/>
                <b>Tanggal Daftar:</b>  {{ createdAtformatDate(modal.confirm.created_at) }} <br/>
                <b>Status:</b>  Menunggu Diverifikasi <br /><br />
                Best Regards, <br />
                Webmaster PSE
              </p>
            </CCol>
          </CRow>
        </div>
      </template>
      <template v-slot:footer>
        <CButton color="primary" size="sm" class="m-2" @click="closeConfirmModal()">
          Confirm
        </CButton>
      </template>
    </CModal>
    <CModal
      :title="modal.reason.title"
      :color="modal.reason.color"
      :show.sync="modal.reason.showModal"
    >
      <template v-slot:body-wrapper>
        <div class="modal-body">
          <CRow>
            <CCol sm="12">
              <label for="reason">
                {{ modal.reason.message }}
                <strong>{{ modal.reason.nama_internal }}</strong>
              </label>
              <input
                v-model="forms.reason"
                type="text"
                name="reason"
                placeholder="Masukan Alasan"
                class="form-control"
                :class="{
                  'is-invalid': errorValidations.reason.length > 0,
                }"
                @blur="errorValidations.reason = []"
              />
              <message :messages="errorValidations.reason" />
            </CCol>
          </CRow>
        </div>
      </template>
      <template v-slot:footer>
        <CButton color="primary" size="sm" class="m-2" @click="sendReason()">
          Submit
        </CButton>
      </template>
    </CModal>
    <CModal
      :title="modal.detailReason.title"
      :color="modal.detailReason.color"
      :show.sync="modal.detailReason.showModal"
    >
      <template v-slot:body-wrapper>
        <div class="modal-body">
          <CRow>
            <CCol sm="12">
              <table class="table table-hover table-striped">
                <thead>
                  <tr>
                    <!-- <th>No</th> -->
                    <th>Tanggal Update</th>
                    <th>Detail Alasan</th>
                  </tr>
                </thead>
                <tbody>
                  <template v-if="data.length > 0">
                    <tr v-for="(item, index) in reasonData" :key="index">
                      <template v-if="item.sis_profil_id === modal.detailReason.uniqueId">
                        <!-- <th scope="row">
                          {{ 
                            index + 1 + reasonData
                              .filter((dataItem, dataIndex) => 
                                dataIndex < index && dataItem.sis_profil_id !== modal.detailReason.uniqueId
                              ).length 
                          }}
                        </th> -->
                        <td>{{ formatDate(item.created_at) }}</td>
                        <td>{{ item.reason }}</td>
                      </template>
                    </tr>
                  </template>
                </tbody>
              </table>
            </CCol>
          </CRow>
        </div>
      </template>
    </CModal>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'SystemApproved',
  data() {
    return {
      spinner: false,
      listFilter: false,
      data: [],
      reasonData: [],
      disapprovedData: [],
      search: {
        nama_eksternal: null,
        nama_instansi: null,
        status: '',
      },
      forms: {
        id: null,
        reason: null,
      },
      errorValidations: {
        reason: [],
      },
      modal: {
        confirm: {
          showModal: false,
          title: 'Informasi',
          color: 'dark',
          user_name: null,
          created_at: null,
          nama_internal: null,
        },
        delete: {
          showModal: false,
          title: null,
          color: null,
          message: null,
          labelButton: null,
          uniqueId: null,
        },
        reason: {
          showModal: false,
          title: null,
          color: null,
          message: null,
          labelButton: null,
          uniqueId: null,
          nama_internal: null,
          data: null,
        },
        detailReason: {
          showModal: false,
          title: null,
          color: null,
          message: null,
          labelButton: null,
          uniqueId: null,
          nama_internal: null,
          data: null,
        },
        showModal: false,
        title: null,
        color: null,
        message: null,
        labelButton: null,
        uniqueId: null,
      },
      pagination: {
        current_page: 1,
        last_page: 10,
        per_page: null,
      },
      progress: [
        {
          id: 1,
          name: '50%',
        },
        {
          id: 2,
          name: '60%-90%',
        },
        {
          id: 3,
          name: '100%',
        },
      ],
      lockedValidation: {
        dataUmum:{
          nama_internal: null,
          nama_eksternal: null,
          keterangan: null,
          kategori_se: null,
          publish: null,
          fungsi_sistem: null,
          keterangan_fungsi_sistem: null,
          ruang_lingkup: null,
          jenis_layanan: null,
          keterangan_jenis_layanan: null,
          nama_sistem: null,
          keterangan_sistem_pengaman: null,
          jenis_pengguna: null,
          keterangan_jenis_pengguna: null,
        },
        profilPenyelenggara: {
          organizer_profile: null,
        },
        perangkatKeras: {
          jenis: null,
          pemilik: null,
          bandwith: null,
          processor: null,
          memory: null,
          kegunaan: null,
        },
        perangkatLunak: {
          nama: null,
          jenis: null,
          penyedia: null,
        },
        tenagaAhli: {
          jenis: null,
          jumlah_personil: null,
          kompetensi: null, 
        },
        tataKelola: {
          nama: null,
          no: null,
          tahun_terbit: null,
          tentang: null,
        },
        penganggungJawab: {
          nama_penanggung_jawab: null,
          nip: null,
          jabatan: null,
          satuan_kerja: null,
          alamat: null,
          provinsi: null,
          kotaKab: null,
          kode_pos: null,
          no_telp: null,
          email: null,
        },
        helpDesk: {
          nama_lengkap: null,
          telepon: null,
          fax: null,
          email: null,
        },
        dokumen: {
          kategori: null,
          nama_dokumen: null,
          dokumen: null,
        },
      },
      status: [
        {
          id: 0,
          name: 'Tidak Terdaftar',
        },
        {
          id: 1,
          name: 'Terdaftar',
        },
      ],
    }
  },
  computed: {
    setIconFilter() {
      if (this.listFilter) {
        return 'cil-filter-x'
      }

      return 'cil-filter'
    },

    isAdmin() {
      if (this.$store.state.auth.data.roles.includes('Admin')) {
        return true
      }

      return false
    },

    isSubPejabat() {
      if (this.$store.state.auth.data.roles.includes('Sub Pejabat')) {
        return true
      }

      return false
    },
  },
  created() {
    this.getData()
    this.getReason()
    
    const now = new Date().getTime()
    if (sessionStorage.getItem('isRegisteredSe') && sessionStorage.getItem('isRegisteredSeExpiry')) {
      this.getDisapprovedData()
      this.modal.confirm.showModal = true
      this.modal.confirm.nama_internal = localStorage.getItem('nama_internal')
    }
  },
  methods: {
    formatDate: function (date) {
      if(date){
        return moment(date).format('DD-MM-YYYY HH:mm:ss')
      }else{
        return moment('01-01-2000 00:00:00').format('DD-MM-YYYY HH:mm:ss')
      }

    },
    createdAtformatDate: function (date) {
      if(date){
        return moment(date).format('DD-MM-YYYY HH:mm:ss')
      }else{
        return moment().format('DD-MM-YYYY HH:mm:ss')
      }

    },
    closeConfirmModal() {
      if (localStorage.getItem('isRegisteredSe')) {
        localStorage.removeItem('nama_internal')
        localStorage.removeItem('nama_eksternal')
        localStorage.removeItem('isRegisteredSe')
      }
      this.modal.confirm.showModal = false
    },
    closeModal() {
      this.modal.showModal = false
      this.clearModal()
    },
    clearModal() {
      this.modal.title = null
      this.modal.color = null
      this.modal.data = null
      this.modal.uniqueId = null
      this.modal.message = null
      this.modal.labelButton = null
    },
    confirmLocked(item) {
      this.modal.showModal = true
      this.modal.title = 'Kunci Sistem Elektronik'
      this.modal.color = 'success'
      this.modal.data = item.nama_internal
      this.modal.uniqueId = item.id
      this.modal.message = 'Ingin Mengkunci Sistem Elektronik'
      this.modal.labelButton = 'Kunci'
      this.dataSeValidation()
      console.log('cekdata = ',this.lockedValidation)
    },
    locked() {
      const { 
        dataUmum,
        profilPenyelenggara,
        perangkatKeras,
        perangkatLunak,
        tenagaAhli,
        tataKelola,
        penganggungJawab,
        helpDesk,
        dokumen,
      } = this.lockedValidation;
      const nullMessages = [];

      // Cek dataUmum
      if (Object.values(dataUmum).some(value => value === null || value == undefined)) {
        nullMessages.push("Data Umum");
      }

      // Cek profil penyelenggara
      if (Object.values(profilPenyelenggara).some(value => value === null || value == undefined)) {
        nullMessages.push("Profil Penyelenggara");
      }

      // Cek perangkatKeras
      if (Object.values(perangkatKeras).some(value => value === null || value == undefined)) {
        nullMessages.push("Perangkat Keras");
      }

      // Cek perangkatLunak
      if (Object.values(perangkatLunak).some(value => value === null || value == undefined)) {
        nullMessages.push("Perangkat Lunak");
      }

      // cek ketersediaanTenagaAhli
      if (Object.values(tenagaAhli).some(value => value === null || value == undefined)) {
        nullMessages.push("Ketersediaan Tenaga Ahli");
      }

      // cek tataKelolaDasarHukum
      if (Object.values(tataKelola).some(value => value === null || value == undefined)) {
        nullMessages.push("Dasar Hukum Tata Kelola");
      }

      // Cek penanggung jawab
      if (Object.values(penganggungJawab).some(value => value === null || value == undefined)) {
        nullMessages.push("Penanggung Jawab");
      }

      // Cek help desk
      if (Object.values(helpDesk).some(value => value === null || value == undefined)) {
        nullMessages.push("Help Desk");
      }

      // Cek dokumen
      if (Object.values(dokumen).some(value => value === null || value == undefined)) {
        nullMessages.push("Dokumen");
      }

      // Jika ada field yang null, tampilkan toastr error dan hentikan eksekusi
      if (nullMessages.length > 0) {
        this.$toastr.e(
          `Beberapa field yang berada di ${nullMessages.join(", ")} masih kosong, harap diisi terlebih dahulu!`,
          "Pemberitahuan"
        );
        return;
      }

      // Melanjutkan proses jika validasi lolos
      this.$http
      .patch(`/systems/${this.modal.uniqueId}/locked`)
      .then((response) => {
        this.filterData();
        this.closeModal();
        if (response.data.status === 400) {
          this.$toastr.e(response.data.message, "Pemberitahuan");
        } else {
          this.$toastr.s(response.data.message, "Pemberitahuan");
        }
      })
      .catch((error) => {
        this.closeModal();
        if (error.response.status === 500) {
          this.$toastr.e("Ada Kesalahan dari Server", "Pemberitahuan");
        } else {
          this.$toastr.e(error.response.data.message, "Pemberitahuan");
        }
      });
    },
    dataSeValidation() {
      this.$http
      .get(`systems/${this.modal.uniqueId}`)
      .then((response) => {
        console.log('qwerty => ', response?.data?.data)
        // data dataumum 
        this.lockedValidation.dataUmum.nama_internal = response?.data?.data?.nama_internal
        this.lockedValidation.dataUmum.nama_eksternal = response?.data?.data?.nama_eksternal
        this.lockedValidation.dataUmum.keterangan = response?.data?.data?.deskripsi
        this.lockedValidation.dataUmum.kategori_se = response?.data?.data?.name_sifat_khusus
        this.lockedValidation.dataUmum.publish = response?.data?.data?.publish
        this.lockedValidation.dataUmum.fungsi_sistem = response?.data?.data?.relation?.special_function[0]?.fungsi_sistem
        this.lockedValidation.dataUmum.keterangan_fungsi_sistem = response?.data?.data?.relation?.special_function[0]?.keterangan
        this.lockedValidation.dataUmum.ruang_lingkup = response?.data?.data?.relation?.scope[0]?.ruang_lingkup
        this.lockedValidation.dataUmum.jenis_layanan = response?.data?.data?.relation?.kind_of_service[0]?.jenis_layanan
        this.lockedValidation.dataUmum.keterangan_jenis_layanan = response?.data?.data?.relation?.kind_of_service[0]?.keterangan
        this.lockedValidation.dataUmum.nama_sistem = response?.data?.data?.relation?.security[0]?.nama_sistem
        this.lockedValidation.dataUmum.keterangan_sistem_pengaman = response?.data?.data?.relation?.security[0]?.keterangan
        this.lockedValidation.dataUmum.jenis_pengguna = response?.data?.data?.relation?.service_user[0]?.nama_jenis_pengguna
        this.lockedValidation.dataUmum.keterangan_jenis_pengguna = response?.data?.data?.relation?.service_user[0]?.keterangan

        // data profilPenyelenggara
        this.lockedValidation.profilPenyelenggara.organizer_profile = response?.data?.data?.relation?.organizer?.name

        // data perangkatKeras
        this.lockedValidation.perangkatKeras.jenis = response?.data?.data?.relation?.hardware[0]?.jenis
        this.lockedValidation.perangkatKeras.pemilik = response?.data?.data?.relation?.hardware[0]?.pemilik
        this.lockedValidation.perangkatKeras.bandwith = response?.data?.data?.relation?.hardware[0]?.fasilitas_data_center == 0 ? 'Kosong' : response?.data?.data?.relation?.hardware[0]?.bandwidth
        this.lockedValidation.perangkatKeras.processor = response?.data?.data?.relation?.hardware[0]?.processor
        this.lockedValidation.perangkatKeras.memory = response?.data?.data?.relation?.hardware[0]?.memory
        this.lockedValidation.perangkatKeras.kegunaan = response?.data?.data?.relation?.hardware[0]?.shared

        // data perangkatLunak
        this.lockedValidation.perangkatLunak.nama = response?.data?.data?.relation?.software[0]?.nama
        this.lockedValidation.perangkatLunak.jenis = response?.data?.data?.relation?.software[0]?.nama_jenis
        this.lockedValidation.perangkatLunak.penyedia = response?.data?.data?.relation?.software[0]?.vendor

        // data tenagaAhli
        this.lockedValidation.tenagaAhli.jenis = response?.data?.data?.relation?.availability_of_expert[0]?.name_jenis
        this.lockedValidation.tenagaAhli.jumlah_personil = response?.data?.data?.relation?.availability_of_expert[0]?.jumlah_personil
        this.lockedValidation.tenagaAhli.kompetensi = response?.data?.data?.relation?.availability_of_expert[0]?.kompetensi

        // data tataKelola
        this.lockedValidation.tataKelola.nama = response?.data?.data?.relation?.legal_basis[0]?.nama_dh
        this.lockedValidation.tataKelola.no = response?.data?.data?.relation?.legal_basis[0]?.no_dh
        this.lockedValidation.tataKelola.tahun_terbit = response?.data?.data?.relation?.legal_basis[0]?.tahun_dh
        this.lockedValidation.tataKelola.tentang = response?.data?.data?.relation?.legal_basis[0]?.keterangan

        // data penaggungjawab
        this.lockedValidation.penganggungJawab.nama_penanggung_jawab = response?.data?.data?.relation?.responsible_person?.nama
        this.lockedValidation.penganggungJawab.nip = response?.data?.data?.relation?.responsible_person?.nip
        this.lockedValidation.penganggungJawab.jabatan = response?.data?.data?.relation?.responsible_person?.jabatan
        this.lockedValidation.penganggungJawab.satuan_kerja = response?.data?.data?.relation?.responsible_person?.satuan_kerja
        this.lockedValidation.penganggungJawab.alamat = response?.data?.data?.relation?.responsible_person?.alamat_satuan_kerja
        this.lockedValidation.penganggungJawab.provinsi = response?.data?.data?.relation?.responsible_person?.nama_provinsi
        this.lockedValidation.penganggungJawab.kotaKab = response?.data?.data?.relation?.responsible_person?.nama_kabupaten
        this.lockedValidation.penganggungJawab.kode_pos = response?.data?.data?.relation?.responsible_person?.kode_pos_satuan_kerja
        this.lockedValidation.penganggungJawab.no_telp = response?.data?.data?.relation?.responsible_person?.handphone
        this.lockedValidation.penganggungJawab.email = response?.data?.data?.relation?.responsible_person?.email

        // data helpdesk
        this.lockedValidation.helpDesk.nama_lengkap = response?.data?.data?.relation?.help_desk[0]?.nama
        this.lockedValidation.helpDesk.telepon = response?.data?.data?.relation?.help_desk[0]?.telepon
        this.lockedValidation.helpDesk.fax = response?.data?.data?.relation?.help_desk[0]?.fax
        this.lockedValidation.helpDesk.email = response?.data?.data?.relation?.help_desk[0]?.email

        // data dokumen
        this.lockedValidation.dokumen.kategori = response?.data?.data?.relation?.document[0]?.category
        this.lockedValidation.dokumen.nama_dokumen = response?.data?.data?.relation?.document[0]?.name
        this.lockedValidation.dokumen.dokumen = response?.data?.data?.relation?.document[0]?.dokumen
      })
      .catch((error) => {
        console.log('errGetDataSeValidation => ',error)
      })
    },
    filter() {
      this.listFilter = !this.listFilter
      this.clearFilter()
    },
    submitDelete() {
      this.$http
        .delete(`systems/${this.modal.delete.uniqueId}`)
        .then((response) => {
          this.filterData()
          this.closeModalDelete()
          this.$toastr.s(response.data.message, 'Pemberitahuan')
        })
        .catch((error) => {
          this.closeModalDelete()
          if (error.response.status === 500) {
            this.$toastr.e('Ada Kesalahan dari Server', 'Pemberitahuan')
          } else {
            this.$toastr.e(error.response.data.message, 'Pemberitahuan')
          }
        })
    },
    clearModalDelete() {
      this.modal.delete.title = null
      this.modal.delete.color = null
      this.modal.delete.data = null
      this.modal.delete.uniqueId = null
      this.modal.delete.message = null
      this.modal.delete.labelButton = null
    },
    closeModalDelete() {
      this.modal.delete.showModal = false
      this.clearModalDelete()
    },
    destroy(item) {
      this.modal.delete.showModal = true
      this.modal.delete.title = 'Hapus Data'
      this.modal.delete.color = 'danger'
      this.modal.delete.data = item.nama
      this.modal.delete.uniqueId = item.id
      this.modal.delete.message = 'Ingin Menghapus Data'
      this.modal.delete.labelButton = 'Hapus'
    },
    clearFilter() {
      this.search.nama_eksternal = null
      this.search.nama_instansi = null
      this.search.progres = ''
      this.search.status = ''
      
    },
    clearModalReason() {
      this.modal.reason.title = null
      this.modal.reason.color = null
      this.modal.reason.nama_internal = null
      this.modal.reason.uniqueId = null
      this.modal.reason.message = null
      this.modal.reason.labelButton = null
      this.modal.reason.data = null
    },
    closeModalReason() {
      this.modal.reason.showModal = false
      this.clearModalReason()
    },
    confirmReason(item) {
      this.modal.reason.showModal = true
      this.modal.reason.title = 'Alasan Sistem Elektronik Tidak Sesuai'
      this.modal.reason.nama_internal = item.nama_internal
      this.modal.reason.data = item
      this.modal.reason.uniqueId = item.id
      this.modal.reason.message = 'Berikan alasan pada sistem elektronik bernama'
      this.modal.reason.labelButton = 'Submit'
    },
    clearDetailModalReason() {
      this.modal.detailReason.title = null
      this.modal.detailReason.color = null
      this.modal.detailReason.nama_internal = null
      this.modal.detailReason.uniqueId = null
      this.modal.detailReason.message = null
      this.modal.detailReason.labelButton = null
      this.modal.detailReason.data = null
    },
    closeDetailModalReason() {
      this.modal.detailReason.showModal = false
      this.clearDetailModalReason()
    },
    DetailDataReason(item) {
      this.modal.detailReason.showModal = true
      this.modal.detailReason.title = 'Detail Alasan Sistem Elektronik'
      this.modal.detailReason.nama_internal = item.nama_internal
      this.modal.detailReason.data = item
      this.modal.detailReason.uniqueId = item.id
      this.modal.detailReason.message = 'Berikut detail alasan sistem elektronik'
      this.modal.detailReason.labelButton = 'Submit'
    },
    getData() {
      this.spinner = true
      this.$http
        .get('/systems/filter/approved', {
          params: {
            page: this.pagination.current_page,
            filter: 'nama_eksternal',
            q: this.search.nama_eksternal,
            agency: this.search.nama_instansi,
            progres: this.search.progres,
            status: this.search.status,
          },
        })
        .then((response) => {
          this.spinner = false
          this.data = response.data.data
          this.pagination.current_page = response.data.meta.current_page
          this.pagination.per_page = response.data.meta.per_page
          this.pagination.last_page = response.data.meta.last_page
        })
        .catch((error) => {
          if (error.response.status === 500) {
            this.$toastr.e('Ada Kesalahan dari Server', 'Pemberitahuan')
          } else {
            this.$toastr.e(error.response.data.message, 'Pemberitahuan')
          }
        })
    },
    filterData() {
      this.spinner = true

      this.$http
        .get('/systems/filter/approved', {
          params: {
            page: 1,
            filter: 'nama_eksternal',
            q: this.search.nama_eksternal,
            agency: this.search.nama_instansi,
            progres: this.search.progres,
            status: this.search.status,
          },
        })
        .then((response) => {
          this.spinner = false
          this.data = response.data.data
          this.pagination.current_page = response.data.meta.current_page
          this.pagination.per_page = response.data.meta.per_page
          this.pagination.last_page = response.data.meta.last_page
        })
        .catch((error) => {
          if (error.response.status === 500) {
            this.$toastr.e('Ada Kesalahan dari Server', 'Pemberitahuan')
          } else {
            this.$toastr.e(error.response.data.message, 'Pemberitahuan')
          }
        })
    },
    resetFilter() {
      this.spinner = true
      this.clearFilter()

      this.$http
        .get('/systems/filter/approved', {
          params: {
            page: 1,
          },
        })
        .then((response) => {
          this.spinner = false
          this.data = response.data.data
          this.pagination.current_page = response.data.meta.current_page
          this.pagination.per_page = response.data.meta.per_page
          this.pagination.last_page = response.data.meta.last_page
        })
        .catch((error) => {
          if (error.response.status === 500) {
            this.$toastr.e('Ada Kesalahan dari Server', 'Pemberitahuan')
          } else {
            this.$toastr.e(error.response.data.message, 'Pemberitahuan')
          }
        })
    },
    getDisapprovedData() {
      this.$http
        .get('/systems/filter/disapproved', {
          params: {
            page: this.pagination.current_page,
            filter: 'nama_eksternal',
          },
        })
        .then((response) => {
          this.disapprovedData = response.data.data  
          if (localStorage.getItem('isRegisteredSe')){
            this.modal.confirm.created_at = this.disapprovedData[0].date_updated
            this.modal.confirm.user_name = this.disapprovedData[0].user_name
          }
        })
        .catch((error) => {
          if (error.response.status === 500) {
            this.$toastr.e('Ada Kesalahan dari Server', 'Pemberitahuan')
          } else {
            this.$toastr.e(error.response.data.message, 'Pemberitahuan')
          }
        })
    },
    getReason() {
      this.$http
      .get('/reason-log/user-list', {
      })
      .then((response) => {
        this.reasonData = response.data.data
      })
      .catch((error) => {
        console.log(error)
      });
    },

    sendReason() {
      const url = '/reason-log/send-reason'

      const formData = {
        sis_profil_id: this.modal.reason.data.id,
        reason: this.forms.reason,
      }

      this.$http({
        method: 'post',
        url: url,
        headers: {
            "Content-Type": "application/json",
          },
        data: JSON.stringify(formData),
      })
      .then((response) => {
        this.$toastr.s(response.data.message, 'Pemberitahuan')
        this.closeModalReason()
        window.location.reload()
      })
      .catch((error) => {
        console.log('errorSendResonSE === ',error)
        this.$toastr.s('Error', 'Pemberitahuan')
      });
    },
  },
}
</script>

<style>
.modal-confirm-layout {
  pointer-events: none;
}
</style>

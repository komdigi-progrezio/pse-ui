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
            :class="{ 'mr-auto': checkFilter }"
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
            v-show="!checkFilter"
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
            <!-- <CCol sm="12">
              <div class="form-group">
                <label for="status">Status</label>
                <select v-model="search.status" class="form-control">
                  <option value="all">Pilih Status</option>
                  <option
                    :value="value.id"
                    v-for="(value, index) in dataSelect.status"
                    :key="`status-${index}`"
                  >
                    {{ value.name }}
                  </option>
                </select>
              </div>
            </CCol> -->
            <CCol sm="12" md="6" lg="6">
              <div class="form-group">
                <label for="filter">Filter Berdasarkan</label>
                <select v-model="search.filter" class="form-control">
                  <option value="all">Pilih Filter</option>
                  <option
                    :value="value.id"
                    v-for="(value, index) in dataSelect.filter"
                    :key="`filter-${index}`"
                  >
                    {{ value.name }}
                  </option>
                </select>
              </div>
            </CCol>
            <CCol sm="12" md="6" lg="6">
              <div class="form-group">
                <label for="q">Kata Kunci</label>
                <input
                  v-model="search.q"
                  type="text"
                  name="name"
                  placeholder="Masukan Kata Kunci"
                  class="form-control"
                />
              </div>
            </CCol>
            <!-- <CCol sm="12" md="4" lg="4">
              <div class="form-group">
                <label for="tanggal">Tanggal</label>
                <select v-model="search.tanggal" class="form-control">
                  <option value="all">Pilih Tanggal</option>
                  <option
                    :value="value.id"
                    v-for="(value, index) in dataSelect.tanggal"
                    :key="`tanggal-${index}`"
                  >
                    {{ value.name }}
                  </option>
                </select>
              </div>
            </CCol>
            <CCol sm="12" md="4" lg="4">
              <div class="input-group">
                <label for="created_at">Mulai</label>
                <div class="input-group mb-3">
                  <date-picker
                    v-model="search.created_at"
                    name="created_at"
                    :config="optionsCreatedAt"
                    class="form-control"
                    @input="changeMinDate"
                  />
                  <div class="input-group-append">
                    <span class="input-group-text" id="basic-addon2"
                      ><CIcon name="cil-calendar"
                    /></span>
                  </div>
                </div>
              </div>
            </CCol>
            <CCol sm="12" md="4" lg="4">
              <div class="input-group">
                <label for="modified_at">Sampai</label>
                <div class="input-group mb-3">
                  <date-picker
                    v-model="search.modified_at"
                    name="modified_at"
                    :config="optionsModifiedAt"
                    class="form-control"
                  />
                  <div class="input-group-append">
                    <span class="input-group-text" id="basic-addon2"
                      ><CIcon name="cil-calendar"
                    /></span>
                  </div>
                </div>
              </div>
            </CCol> -->
            <CCol sm="12" md="6" lg="6">
              <div class="form-group">
                <label for="bulan">Bulan</label>
                <select v-model="search.bulan" class="form-control">
                  <option value="all">Pilih Bulan</option>
                  <option
                    v-for="(value, index) in dataSelect.month"
                    :value="value.id"
                    :key="index"
                    >{{ value.name }}</option
                  >
                </select>
              </div>
            </CCol>
            <CCol sm="12" md="6" lg="6">
              <div class="form-group">
                <label for="tahun">Tahun</label>
                <select v-model="search.tahun" class="form-control">
                  <option value="current">Pilih Tahun</option>
                  <option
                    v-for="(value, index) in dataSelect.year"
                    :value="value.id"
                    :key="index"
                    >{{ value.name }}</option
                  >
                </select>
              </div>
            </CCol>
          </CRow>
        </template>
      </CCardBody>
    </CCard>
    <CCard>
      <CCardHeader>
        <CIcon name="cil-user" /> {{ data_count }} User</CCardHeader
      >
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
                  <th>Nama</th>
                  <th>NIP</th>
                  <th>Jabatan</th>
                  <th>Instansi</th>
                  <th>Tanggal Login</th>
                  <!-- <th>Tanggal Logout</th> -->
                  <th>Role</th>
                  <!-- <th colspan="2">Aksi</th> -->
                </tr>
              </thead>
              <tbody>
                <template v-if="data.length > 0">
                  <tr v-for="(value, index) in data" :key="`user-${index}`">
                    <td>{{
                      (pagination.current_page - 1) * pagination.per_page +
                      index +
                      1
                    }}</td>
                    <td>
                      {{ value.nama }}
                    </td>
                    <td
                      ><span class="mobile-only mr-1">NIP: </span>
                      {{ value.nip }}</td
                    >
                    <td
                      ><span class="mobile-only mr-1">Jabatan: </span>
                      {{ value.jabatan }}</td
                    >
                    <td
                      ><span class="mobile-only mr-1">Instansi: </span>
                      {{ value.instansi_induk_text }}</td
                    >
                    <td
                      ><span class="mobile-only mr-1">Tanggal Login: </span>
                      {{ value.last_login }}</td
                    >
                    <!-- <td
                      ><span class="mobile-only mr-1">Tanggal Logout: </span>
                      {{ value.last_logout }}</td
                    > -->
                    <td
                      ><span class="mobile-only mr-1">Role: </span>
                      {{ value.status_register }}</td
                    >
                    <!-- <td>
                      <template v-if="value.status">
                        <CButton
                          class="mr-2 mt-1"
                          color="dark"
                          size="sm"
                          v-c-tooltip="{
                            content: 'Non-aktifkan User',
                            placement: 'bottom',
                          }"
                          @click="confirmDisable(value)"
                        >
                          <CIcon name="cil-x-circle" />
                          <span class="mobile-only ml-1"
                            >Non-aktifkan User</span
                          >
                        </CButton>
                      </template>

                      <template v-else>
                        <CButton
                          color="dark"
                          class="mr-2 mt-1"
                          size="sm"
                          v-c-tooltip="{
                            content: 'Aktifkan User',
                            placement: 'bottom',
                          }"
                          @click="confirmEnable(value)"
                        >
                          <CIcon name="cil-check-circle" />
                          <span class="mobile-only ml-1">Aktifkan User</span>
                        </CButton>
                      </template>

                      <CButton
                        color="primary"
                        size="sm"
                        class="mr-2 mt-1"
                        v-c-tooltip="{
                          content: 'Lihat Detail User',
                          placement: 'bottom',
                        }"
                        :to="{
                          path: `/admin/account/${value.id}/official`,
                        }"
                      >
                        <CIcon name="cil-description" />
                        <span class="mobile-only ml-1">Lihat Detail User</span>
                      </CButton>

                      <CButton
                        color="info"
                        size="sm"
                        class="mr-2 mt-1"
                        v-c-tooltip="{
                          content: 'Lihat Daftar Sistem Elektronik',
                          placement: 'bottom',
                        }"
                        :to="{
                          path: `/admin/account/${value.id}/electronic-system`,
                        }"
                      >
                        <CIcon name="cil-storage" />
                        <span class="mobile-only ml-1"
                          >Lihat Daftar Sistem Elektronik</span
                        >
                      </CButton>

                      <CButton
                        color="warning"
                        size="sm"
                        class="mr-2 mt-1"
                        v-c-tooltip="{
                          content: 'Lihat Daftar Sub-Pejabat',
                          placement: 'bottom',
                        }"
                        @click="accountParent(value.id)"
                      >
                        <CIcon name="cil-fork" />
                        <span class="mobile-only ml-1"
                          >Lihat Daftar Sub-Pejabat</span
                        >
                      </CButton>
                      <CButton
                        color="success"
                        size="sm"
                        class="mt-1"
                        v-c-tooltip="{
                          content: 'Edit User',
                          placement: 'bottom',
                        }"
                        @click="editUser(value.id)"
                      >
                        <CIcon name="cil-pencil" />
                        <span class="mobile-only ml-1">Edit User</span>
                      </CButton>
                      <CButton
                        color="secondary"
                        size="sm"
                        class="mt-1"
                        v-c-tooltip="{
                          content: 'Ganti Password',
                          placement: 'bottom',
                        }"
                        @click="showModalChangePassword(value)"
                      >
                        <CIcon name="cil-lock-locked" />
                      </CButton>
                    </td> -->
                  </tr>
                </template>
                <template v-else>
                  <tr>
                    <td colspan="10" class="text-center"> Data Kosong </td>
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
    <!-- <CModal
      :title="modal.changePassword.title"
      :color="modal.changePassword.color"
      :show.sync="modal.changePassword.showModal"
    >
      <template v-slot:body-wrapper>
        <div class="modal-body">
          <div class="form-group">
            <label for="current_password"> Password Sekarang </label>
            <input
              class="form-control"
              :class="{
                'is-invalid': errorValidations.current_password.length > 0,
              }"
              id="current_password"
              type="password"
              placeholder="Masukan Password Sekarang"
              v-model="formChangePassword.current_password"
            />
            <message :messages="errorValidations.current_password" />
          </div>
          <div class="form-group">
            <label for="password"> Password Baru </label>
            <input
              class="form-control"
              :class="{
                'is-invalid': errorValidations.password.length > 0,
              }"
              id="password"
              type="password"
              placeholder="Masukan Password Baru"
              v-model="formChangePassword.password"
            />
            <message :messages="errorValidations.password" />
          </div>
          <div class="form-group">
            <label for="password"> Konfirmasi Password </label>
            <input
              class="form-control"
              id="password_confirmation"
              type="password"
              placeholder="Masukan Konfirmasi Password"
              v-model="formChangePassword.password_confirmation"
            />
          </div>
        </div>
      </template>
      <template v-slot:footer>
        <CButton
          color="secondary"
          size="sm"
          class="m-2"
          @click="closeModalChangePassword"
        >
          Cancel
        </CButton>
        <CButton
          color="primary"
          size="sm"
          class="m-2"
          @click="submitChangePassword"
        >
          {{ modal.changePassword.labelButton }}
        </CButton>
      </template>
    </CModal> -->
    <!-- <CModal
      :title="modal.disable.title"
      :color="modal.disable.color"
      :show.sync="modal.disable.showModal"
    >
      <template v-slot:body-wrapper>
        <div class="modal-body">
          <p>
            {{ modal.disable.message }}
            <strong>{{ modal.disable.data }}</strong
            >?
          </p>
        </div>
      </template>
      <template v-slot:footer>
        <CButton color="dark" size="sm" class="m-2" @click="closeModal">
          Cancel
        </CButton>
        <CButton color="primary" size="sm" class="m-2" @click="disable">
          Submit
        </CButton>
      </template>
    </CModal>
    <CModal
      :title="modal.enable.title"
      :color="modal.enable.color"
      :show.sync="modal.enable.showModal"
    >
      <template v-slot:body-wrapper>
        <div class="modal-body">
          <p>
            {{ modal.enable.message }}
            <strong>{{ modal.enable.data }}</strong
            >?
          </p>
        </div>
      </template>
      <template v-slot:footer>
        <CButton color="dark" size="sm" class="m-2" @click="closeModal">
          Cancel
        </CButton>
        <CButton color="primary" size="sm" class="m-2" @click="enable">
          Submit
        </CButton>
      </template>
    </CModal> -->
  </div>
</template>

<script>
export default {
  name: 'Userlog',
  data() {
    return {
      spinner: false,
      listFilter: false,
      data: [],
      data_count: null,
      // formChangePassword: {
      //   current_password: null,
      //   password: null,
      //   password_confirmation: null,
      // },
      // modal: {
      //   changePassword: {
      //     showModal: false,
      //     title: null,
      //     color: null,
      //     labelButton: 'Submit',
      //     method: null,
      //     uniqueId: null,
      //   },
      // },
      // errorValidations: {
      //   current_password: [],
      //   password: [],
      // },
      modal: {
        disable: {
          showModal: false,
          title: 'Konfirmasi Penontifkan User',
          color: 'dark',
          message: 'Apakah Anda Yakin Ingin Menonaktifkan Akun Ini',
          labelButton: 'Submit',
          uniqueId: null,
          data: null,
        },
        enable: {
          showModal: false,
          title: 'Konfirmasi Aktifkan User',
          color: 'dark',
          message: 'Apakah Anda Yakin Ingin Mengaktifkan Akun Ini',
          labelButton: 'Submit',
          uniqueId: null,
          data: null,
        },
      },
      search: {
        // status: 'all',
        filter: 'all',
        q: null,
        // tanggal: 'all',
        // created_at: null,
        // modified_at: null,
        bulan: 'all',
        tahun: 'current',
      },
      pagination: {
        current_page: 1,
        last_page: 10,
        per_page: null,
      },
      dataSelect: {
        month: [
          {
            id: '01',
            name: 'Januari',
          },
          {
            id: '02',
            name: 'Februari',
          },
          {
            id: '03',
            name: 'Maret',
          },
          {
            id: '04',
            name: 'April',
          },
          {
            id: '05',
            name: 'Mei',
          },
          {
            id: '06',
            name: 'Juni',
          },
          {
            id: '07',
            name: 'Juli',
          },
          {
            id: '08',
            name: 'Agustus',
          },
          {
            id: '09',
            name: 'September',
          },
          {
            id: '10',
            name: 'Oktober',
          },
          {
            id: '11',
            name: 'November',
          },
          {
            id: '12',
            name: 'Desember',
          },
        ],
        year: [
          {
            id: '2010',
            name: '2010',
          },
          {
            id: '2011',
            name: '2011',
          },
          {
            id: '2012',
            name: '2012',
          },
          {
            id: '2013',
            name: '2013',
          },
          {
            id: '2014',
            name: '2014',
          },
          {
            id: '2015',
            name: '2015',
          },
          {
            id: '2016',
            name: '2016',
          },
          {
            id: '2017',
            name: '2017',
          },
          {
            id: '2018',
            name: '2018',
          },
          {
            id: '2019',
            name: '2019',
          },
          {
            id: '2020',
            name: '2020',
          },
          {
            id: '2021',
            name: '2021',
          },
        ],
        // status: [
        //   {
        //     id: 1,
        //     name: 'Aktif',
        //   },
        //   {
        //     id: 0,
        //     name: 'Tidak Aktif',
        //   },
        // ],
        filter: [
          {
            id: 'nama',
            name: 'Nama Lengkap',
          },
          {
            id: 'nip',
            name: 'NIP',
          },
          // {
          //   id: 'satuan_kerja',
          //   name: 'Satuan Kerja',
          // },
          {
            id: 'jabatan',
            name: 'Jabatan',
          },
          {
            id: 'instansi',
            name: 'Instansi',
          },
        ],
        // tanggal: [
        //   {
        //     id: 'created_at',
        //     name: 'Tanggal Daftar',
        //   },
        //   {
        //     id: 'modified_at',
        //     name: 'Tanggal Update',
        //   },
        // ],
      },
      // optionsCreatedAt: {
      //   format: 'YYYY-MM-DD',
      //   useCurrent: false,
      //   showClear: true,
      //   showClose: true,
      //   toolbarPlacement: 'top',
      //   widgetPositioning: {
      //     vertical: 'bottom',
      //   },
      //   icons: {
      //     time: 'cil-clock',
      //     date: 'cil-calendar',
      //     up: 'cil-arrow-top',
      //     down: 'cil-arrow-bottom',
      //     previous: 'cil-arrow-left',
      //     next: 'cil-arrow-right',
      //     today: 'cil-calendar-today',
      //     close: 'cil-minus-circle',
      //   },
      // },
      // optionsModifiedAt: {
      //   format: 'YYYY-MM-DD',
      //   useCurrent: false,
      //   showClear: true,
      //   showClose: true,
      //   toolbarPlacement: 'top',
      //   widgetPositioning: {
      //     vertical: 'bottom',
      //   },
      //   icons: {
      //     time: 'cil-clock',
      //     date: 'cil-calendar',
      //     up: 'cil-arrow-top',
      //     down: 'cil-arrow-bottom',
      //     previous: 'cil-arrow-left',
      //     next: 'cil-arrow-right',
      //     today: 'cil-calendar-today',
      //     close: 'cil-minus-circle',
      //   },
      //   minDate: '2010-10-10',
      // },
    }
  },
  computed: {
    checkFilter() {
      if (
        // this.search.status !== 'all' ||
        this.search.filter !== 'all' ||
        this.search.q !== null ||
        // this.search.tanggal !== 'all' ||
        // this.search.created_at !== null ||
        // this.search.modified_at !== null ||
        this.search.bulan !== 'all' ||
        this.search.tahun !== 'current'
      ) {
        return false
      } else {
        return true
      }
    },
    setIconFilter() {
      if (this.listFilter) {
        return 'cil-filter-x'
      }

      return 'cil-filter'
    },
  },
  created() {
    this.getData()
  },
  methods: {
    // closeModal() {
    //   this.modal.disable.showModal = false
    //   this.modal.enable.showModal = false
    // },
    // confirmDisable(value) {
    //   this.modal.disable.showModal = true
    //   this.modal.disable.uniqueId = value.id
    //   this.modal.disable.data = value.nama
    // },
    // confirmEnable(value) {
    //   this.modal.enable.showModal = true
    //   this.modal.enable.uniqueId = value.id
    //   this.modal.enable.data = value.nama
    // },
    // showModalChangePassword(value) {
    //   this.modal.changePassword.showModal = true
    //   this.modal.changePassword.title = `Ganti Password ${value.nama}`
    //   this.modal.changePassword.color = 'primary'
    //   this.modal.changePassword.label = value.nama
    //   this.modal.changePassword.uniqueId = value.id
    // },
    // closeModalChangePassword() {},
    // submitChangePassword() {},
    // editUser(id) {
    //   this.$router.push(`/admin/account/${id}/edit`)
    // },
    // accountParent(id) {
    //   this.$router.push(`/admin/account/parent/${id}`)
    // },
    // enable() {
    //   this.$http({
    //     method: 'patch',
    //     url: `/users/enable/${this.modal.enable.uniqueId}`,
    //   })
    //     .then((response) => {
    //       this.modal.enable.showModal = false
    //       this.spinner = false
    //       this.filterData()
    //       this.$toastr.s(response.data.message, 'Pemberitahuan')
    //     })
    //     .catch((error) => {
    //       this.modal.disable.showModal = false
    //       if (error.response.status === 500) {
    //         this.$toastr.e('Ada Kesalahan dari Server', 'Pemberitahuan')
    //       } else {
    //         this.$toastr.e(error.response.data.message, 'Pemberitahuan')
    //       }
    //     })
    // },
    // disable() {
    //   this.$http({
    //     method: 'patch',
    //     url: `/users/disable/${this.modal.disable.uniqueId}`,
    //   })
    //     .then((response) => {
    //       this.modal.disable.showModal = false
    //       this.spinner = false
    //       this.filterData()
    //       this.$toastr.s(response.data.message, 'Pemberitahuan')
    //     })
    //     .catch((error) => {
    //       if (error.response.status === 500) {
    //         this.modal.disable.showModal = false
    //         this.$toastr.e('Ada Kesalahan dari Server', 'Pemberitahuan')
    //       } else {
    //         this.$toastr.e(error.response.data.message, 'Pemberitahuan')
    //       }
    //     })
    // },
    // changeMinDate() {
    //   this.optionsModifiedAt.minDate = this.search.created_at
    // },
    resetFilter() {
      this.spinner = true
      this.clearFilter()

      this.$http
        .get('/users/filter/officiallog', {
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
          this.data_count = null
        })
        .catch((error) => {
          if (error.response.status === 500) {
            this.$toastr.e('Ada Kesalahan dari Server', 'Pemberitahuan')
          } else {
            this.$toastr.e(error.response.data.message, 'Pemberitahuan')
          }
        })
    },
    filter() {
      this.listFilter = !this.listFilter
      this.clearFilter()
    },
    clearFilter() {
      // this.search.status = 'all'
      this.search.filter = 'all'
      this.search.q = null
      // this.search.tanggal = 'all'
      // this.search.created_at = null
      // this.search.modified_at = null
      this.search.bulan = 'all'
      this.search.tahun = 'current'
    },
    filterData() {
      this.spinner = true

      this.$http
        .get('/users/filter/officiallog', {
          params: {
            page: 1,
            // status: this.search.status,
            filter: this.search.filter,
            q: this.search.q,
            // tanggal: this.search.tanggal,
            // created_at: this.search.created_at,
            // modified_at: this.search.modified_at,
            bulan: this.search.bulan,
            tahun: this.search.tahun,
          },
        })
        .then((response) => {
          this.spinner = false
          this.data = response.data.data
          this.pagination.current_page = response.data.meta.current_page
          this.pagination.per_page = response.data.meta.per_page
          this.pagination.last_page = response.data.meta.last_page
          this.data_count = response.data.meta.total
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
      this.spinner = true

      this.$http
        .get('/users/filter/officiallog', {
          params: {
            page: this.pagination.current_page,
            // status: this.search.status,
            filter: this.search.filter,
            q: this.search.q,
            // tanggal: this.search.tanggal,
            // created_at: this.search.created_at,
            // modified_at: this.search.modified_at,
            bulan: this.search.bulan,
            tahun: this.search.tahun,
          },
        })
        .then((response) => {
          // console.log(response)
          this.spinner = false
          this.data = response.data.data
          this.pagination.current_page = response.data.meta.current_page
          this.pagination.per_page = response.data.meta.per_page
          this.pagination.last_page = response.data.meta.last_page
          // this.data_count = response.data.meta.total
        })
        .catch((error) => {
          if (error.response.status === 500) {
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

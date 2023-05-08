<template>
  <div>
    <CCard>
      <CCardHeader>
        <CIcon name="cil-user" />
        Detail Penggantian User
      </CCardHeader>
      <CCardBody>
        <CTabs variant="tabs" :active-tab="0" :fill="true" :justified="true">
          <CTab title="Pengelola Baru">
            <div class="mt-2">
              <div class="table-responsive classic">
                <table class="table table-bordered">
                  <tbody>
                    <tr>
                      <td>Nama Lengkap</td>
                      <td>{{ user.nama }}</td>
                    </tr>
                    <tr>
                      <td>NIP</td>
                      <td>{{ user.nip }}</td>
                    </tr>
                    <tr>
                      <td>Jabatan</td>
                      <td>{{ user.jabatan }}</td>
                    </tr>
                    <tr>
                      <td>No Telepon</td>
                      <td>{{ user.no_telepon }}</td>
                    </tr>
                    <tr>
                      <td>No Handphone</td>
                      <td>{{ user.no_hp }}</td>
                    </tr>
                    <tr>
                      <td>Satuan Kerja</td>
                      <td>{{ user.satuan_kerja }}</td>
                    </tr>
                    <tr>
                      <td>Alamat</td>
                      <td>{{ user.alamat }}</td>
                    </tr>
                    <tr>
                      <td>Provinsi</td>
                      <td>{{ user.nama_provinsi }}</td>
                    </tr>
                    <tr>
                      <td>Kota / Kabupaten</td>
                      <td>{{ user.nama_kota }}</td>
                    </tr>
                    <tr>
                      <td>Kode POS</td>
                      <td>{{ user.kode_pos }}</td>
                    </tr>
                    <tr>
                      <td>Instansi</td>
                      <td>{{ user.nama_instansi }}</td>
                    </tr>
                    <tr>
                      <td>Download Dokumen</td>
                      <td>{{ user.url_dokumen }}</td>
                    </tr>
                    <tr>
                      <td>Dibuat</td>
                      <td>{{ user.created_at }}</td>
                    </tr>
                    <tr>
                      <td>Diperbaharui</td>
                      <td>{{ user.modified_at }}</td>
                    </tr>
                    <tr>
                      <td>Status</td>
                      <td>{{ user.nama_status }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="text-center my-3">
                <CButton
                  color="primary"
                  size="sm"
                  v-c-tooltip="{
                    content: 'Aktifkan User',
                    placement: 'bottom',
                  }"
                  :disabled="isSubmit"
                  @click="approve"
                >
                  Aktifkan User <CIcon name="cil-check-circle" />
                </CButton>
              </div>
            </div>
          </CTab>
          <CTab title="Pengelola Lama">
            <div class="mt-2">
              <div class="table-responsive classic">
                <table class="table table-bordered">
                  <tbody>
                    <tr>
                      <td>Nama Lengkap</td>
                      <td>{{ manager.nama }}</td>
                    </tr>
                    <tr>
                      <td>NIP</td>
                      <td>{{ manager.nip }}</td>
                    </tr>
                    <tr>
                      <td>Jabatan</td>
                      <td>{{ manager.jabatan }}</td>
                    </tr>
                    <tr>
                      <td>No Telepon</td>
                      <td>{{ manager.no_telepon }}</td>
                    </tr>
                    <tr>
                      <td>No Handphone</td>
                      <td>{{ manager.no_hp }}</td>
                    </tr>
                    <tr>
                      <td>Satuan Kerja</td>
                      <td>{{ manager.satuan_kerja }}</td>
                    </tr>
                    <tr>
                      <td>Alamat</td>
                      <td>{{ manager.alamat }}</td>
                    </tr>
                    <tr>
                      <td>Provinsi</td>
                      <td>{{ manager.nama_provinsi }}</td>
                    </tr>
                    <tr>
                      <td>Kota / Kabupaten</td>
                      <td>{{ manager.nama_kota }}</td>
                    </tr>
                    <tr>
                      <td>Kode POS</td>
                      <td>{{ manager.kode_pos }}</td>
                    </tr>
                    <tr>
                      <td>Instansi</td>
                      <td>{{ manager.nama_instansi }}</td>
                    </tr>
                    <tr>
                      <td>Download Dokumen</td>
                      <td>{{ manager.url_dokumen }}</td>
                    </tr>
                    <tr>
                      <td>Dibuat</td>
                      <td>{{ manager.created_at }}</td>
                    </tr>
                    <tr>
                      <td>Diperbaharui</td>
                      <td>{{ manager.modified_at }}</td>
                    </tr>
                    <tr>
                      <td>Status</td>
                      <td>{{ manager.nama_status }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </CTab>
        </CTabs>
      </CCardBody>
    </CCard>
  </div>
</template>

<script>
export default {
  name: 'DetailAccountSubstitution',
  data() {
    return {
      isSubmit: false,
      manager: {
        id: null,
        nama: null,
        nip: null,
        jabatan: null,
        no_telepon: null,
        no_hp: null,
        satuan_kerja: null,
        alamat: null,
        nama_provinsi: null,
        nama_kota: null,
        kode_pos: null,
        nama_instansi: null,
        url_dokumen: null,
        created_at: null,
        modified_at: null,
        nama_status: null,
      },
      user: {
        id: null,
        nama: null,
        nip: null,
        jabatan: null,
        no_telepon: null,
        no_hp: null,
        satuan_kerja: null,
        alamat: null,
        nama_provinsi: null,
        nama_kota: null,
        kode_pos: null,
        nama_instansi: null,
        url_dokumen: null,
        created_at: null,
        modified_at: null,
        nama_status: null,
      },
    }
  },
  created() {
    this.fetchUser()
    this.fetchNewUser()
  },
  methods: {
    fetchNewUser() {
      this.$http
        .get(`users/new/manager/${this.$route.params.id}`)
        .then((response) => {
          if (response.data.data !== null) {
            this.manager.id = response.data.data.id
            this.manager.nama = response.data.data.nama
            this.manager.nip = response.data.data.nip
            this.manager.jabatan = response.data.data.jabatan
            this.manager.no_telepon = response.data.data.no_telepon
            this.manager.no_hp = response.data.data.no_hp
            this.manager.satuan_kerja = response.data.data.satuan_kerja
            this.manager.alamat = response.data.data.alamat
            this.manager.nama_provinsi = response.data.data.nama_provinsi
            this.manager.nama_kota = response.data.data.nama_kota
            this.manager.kode_pos = response.data.data.kode_pos
            this.manager.nama_instansi = response.data.data.nama_instansi
            this.manager.url_dokumen = response.data.data.url_dokumen
            this.manager.created_at = response.data.data.created_at
            this.manager.modified_at = response.data.data.modified_at
            this.manager.nama_status = response.data.data.nama_status
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
    fetchUser() {
      this.$http
        .get(`users/${this.$route.params.id}`)
        .then((response) => {
          this.user.id = response.data.data.id
          this.user.nama = response.data.data.nama
          this.user.nip = response.data.data.nip
          this.user.jabatan = response.data.data.jabatan
          this.user.no_telepon = response.data.data.no_telepon
          this.user.no_hp = response.data.data.no_hp
          this.user.satuan_kerja = response.data.data.satuan_kerja
          this.user.alamat = response.data.data.alamat
          this.user.nama_provinsi = response.data.data.nama_provinsi
          this.user.nama_kota = response.data.data.nama_kota
          this.user.kode_pos = response.data.data.kode_pos
          this.user.nama_instansi = response.data.data.nama_instansi
          this.user.url_dokumen = response.data.data.url_dokumen
          this.user.created_at = response.data.data.created_at
          this.user.modified_at = response.data.data.modified_at
          this.user.nama_status = response.data.data.nama_status
        })
        .catch((error) => {
          if (error.response.status === 500) {
            this.$toastr.e('Ada Kesalahan dari Server', 'Pemberitahuan')
          } else {
            this.$toastr.e(error.response.data.message, 'Pemberitahuan')
          }
        })
    },
    approve() {
      this.isSubmit = true
      this.$http
        .patch('users/approved/account/change', {
          new_id: this.user.id,
          old_id: this.manager.id,
        })
        .then((response) => {
          this.isSubmit = false
          this.$toastr.s(response.data.message, 'Pemberitahuan')
          this.$router.push('/admin/account/substitution')
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
  },
}
</script>

<style scoped>
.table.table-bordered tr td {
  width: 50%;
}
</style>

<template>
  <div>
    <CCard>
      <CCardHeader> <CIcon name="cil-bullhorn" /> Tambah Laporan </CCardHeader>
      <CCardBody class="p-3">
        <div class="form-group">
          <label for="name"> Nama Laporan </label>
          <input
            class="form-control"
            :class="{
              'is-invalid': errorValidations.name.length > 0,
            }"
            type="text"
            placeholder="Masukan Nama Laporan"
            v-model="forms.name"
          />
          <message :messages="errorValidations.name" />
        </div>
        <div>
          <div class="row">
            <div class="col-12">
              <h5>Data Umum</h5>

              <hr />
            </div>
          </div>
          <div class="row">
            <div class="col-lg-3 col-md-6 col-sm-12">
              <div class="form-group">
                <label class="form-label">Profil Layanan</label>
                <label
                  v-for="(value, index) in dataSelect.serviceProfile"
                  :key="index"
                  class="custom-control custom-checkbox"
                >
                  <input
                    :id="value.id"
                    v-model="forms.contentValue.SisProfil"
                    type="checkbox"
                    class="custom-control-input"
                    :value="value.id"
                  />
                  <span class="custom-control-label">{{ value.name }}</span>
                </label>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-12">
              <div class="form-group">
                <label class="form-label">Sertifikasi</label>
                <label
                  v-for="(value, index) in dataSelect.certificate"
                  :key="index"
                  class="custom-control custom-checkbox"
                >
                  <input
                    :id="value.id"
                    v-model="forms.contentValue.SisSertifikat"
                    type="checkbox"
                    class="custom-control-input"
                    :value="value.id"
                  />
                  <span class="custom-control-label">{{ value.name }}</span>
                </label>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-12">
              <div class="form-group">
                <div class="form-group">
                  <label class="form-label">Jenis Layanan</label>
                  <label
                    v-for="(value, index) in dataSelect.typeOfService"
                    :key="index"
                    class="custom-control custom-checkbox"
                  >
                    <input
                      :id="value.id"
                      v-model="forms.contentValue.SisJenisLayanan"
                      type="checkbox"
                      class="custom-control-input"
                      :value="value.id"
                    />
                    <span class="custom-control-label">{{ value.name }}</span>
                  </label>
                </div>
              </div>
              <div class="form-group">
                <div class="form-group">
                  <label class="form-label">Fungsi Utama</label>
                  <label
                    v-for="(value, index) in dataSelect.theMainFunction"
                    :key="index"
                    class="custom-control custom-checkbox"
                  >
                    <input
                      :id="value.id"
                      v-model="forms.contentValue.SisFungsiKhusus"
                      type="checkbox"
                      class="custom-control-input"
                      :value="value.id"
                    />
                    <span class="custom-control-label">{{ value.name }}</span>
                  </label>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-12">
              <div class="form-group">
                <div class="form-group">
                  <div class="form-group">
                    <label class="form-label">Sistem Terkait</label>
                    <label
                      v-for="(value, index) in dataSelect.relatedSystems"
                      :key="index"
                      class="custom-control custom-checkbox"
                    >
                      <input
                        :id="value.id"
                        v-model="forms.contentValue.SisIntegrasi"
                        type="checkbox"
                        class="custom-control-input"
                        :value="value.id"
                      />
                      <span class="custom-control-label">{{ value.name }}</span>
                    </label>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <div class="form-group">
                  <div class="form-group">
                    <label class="form-label">Pengguna Layanan</label>
                    <label
                      v-for="(value, index) in dataSelect.serviceUsers"
                      :key="index"
                      class="custom-control custom-checkbox"
                    >
                      <input
                        :id="value.id"
                        v-model="forms.contentValue.SisPengguna"
                        type="checkbox"
                        class="custom-control-input"
                        :value="value.id"
                      />
                      <span class="custom-control-label">{{ value.name }}</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-12">
              <div class="form-group">
                <div class="form-group">
                  <div class="form-group">
                    <label class="form-label">Sistem Pengamanan</label>
                    <label
                      v-for="(value, index) in dataSelect.securitySystem"
                      :key="index"
                      class="custom-control custom-checkbox"
                    >
                      <input
                        :id="value.id"
                        v-model="forms.contentValue.SisPengaman"
                        type="checkbox"
                        class="custom-control-input"
                        :value="value.id"
                      />
                      <span class="custom-control-label">{{ value.name }}</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-12">
              <div class="form-group">
                <div class="form-group">
                  <div class="form-group">
                    <label class="form-label">Ruang Lingkup</label>
                    <label
                      v-for="(value, index) in dataSelect.scope"
                      :key="index"
                      class="custom-control custom-checkbox"
                    >
                      <input
                        :id="value.id"
                        v-model="forms.contentValue.SisRuangLingkup"
                        type="checkbox"
                        class="custom-control-input"
                        :value="value.id"
                      />
                      <span class="custom-control-label">{{ value.name }}</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-3 col-md-6 col-sm-12">
              <h5>Profil Penyelenggara</h5>
              <hr />
              <div class="form-group">
                <label class="form-label">Profil Penyelenggara</label>
                <label
                  v-for="(value, index) in dataSelect.organizerProfile"
                  :key="index"
                  class="custom-control custom-checkbox"
                >
                  <input
                    :id="value.id"
                    v-model="forms.contentValue.SisPenyelenggara"
                    type="checkbox"
                    class="custom-control-input"
                    :value="value.id"
                  />
                  <span class="custom-control-label">{{ value.name }}</span>
                </label>
              </div>
            </div>
            <div class="col-lg-9 col-md-6 col-sm-12">
              <h5>Perangkat Keras</h5>
              <hr />
              <div class="row">
                <div class="col-lg-4 col-md-6 col-sm-12">
                  <div class="form-group">
                    <label class="form-label">Perangkat Keras Utama</label>
                    <label
                      v-for="(value, index) in dataSelect.theMainHardware"
                      :key="index"
                      class="custom-control custom-checkbox"
                    >
                      <input
                        :id="value.id"
                        v-model="forms.contentValue.SisHardware"
                        type="checkbox"
                        class="custom-control-input"
                        :value="value.id"
                      />
                      <span class="custom-control-label">{{ value.name }}</span>
                    </label>
                  </div>
                </div>
                <div class="col-lg-4 col-md-6 col-sm-12">
                  <div class="form-group">
                    <label class="form-label">Perangkat Jaringan</label>
                    <label
                      v-for="(value, index) in dataSelect.networkDevices"
                      :key="index"
                      class="custom-control custom-checkbox"
                    >
                      <input
                        :id="value.id"
                        v-model="forms.contentValue.SisNetwork"
                        type="checkbox"
                        class="custom-control-input"
                        :value="value.id"
                      />
                      <span class="custom-control-label">{{ value.name }}</span>
                    </label>
                  </div>
                </div>
                <div class="col-lg-4 col-md-6 col-sm-12">
                  <div class="form-group">
                    <label class="form-label">Perangkat Khusus</label>
                    <label
                      v-for="(value, index) in dataSelect.specialDevices"
                      :key="index"
                      class="custom-control custom-checkbox"
                    >
                      <input
                        :id="value.id"
                        v-model="forms.contentValue.SisPeripheral"
                        type="checkbox"
                        class="custom-control-input"
                        :value="value.id"
                      />
                      <span class="custom-control-label">{{ value.name }}</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-6 col-md-6 col-sm-12">
              <h5>Perangkat Lunak</h5>
              <hr />
              <div class="row">
                <div class="col-lg-6 col-md-6 col-sm-12">
                  <div class="form-group">
                    <label class="form-label">Perangkat Lunak Utama</label>
                    <label
                      v-for="(value, index) in dataSelect.theMainSoftware"
                      :key="index"
                      class="custom-control custom-checkbox"
                    >
                      <input
                        :id="value.id"
                        v-model="forms.contentValue.SisSoftware"
                        type="checkbox"
                        class="custom-control-input"
                        :value="value.id"
                      />
                      <span class="custom-control-label">{{ value.name }}</span>
                    </label>
                  </div>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12">
                  <div class="form-group">
                    <label class="form-label">Perangkat Pendukung</label>
                    <label
                      v-for="(value, index) in dataSelect.supportingSoftware"
                      :key="index"
                      class="custom-control custom-checkbox"
                    >
                      <input
                        :id="value.id"
                        v-model="forms.contentValue.SisSoftwareTools"
                        type="checkbox"
                        class="custom-control-input"
                        :value="value.id"
                      />
                      <span class="custom-control-label">{{ value.name }}</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-6 col-md-6 col-sm-12">
              <h5>Tenaga Ahli</h5>
              <hr />
              <div class="row">
                <div class="col-lg-6 col-md-6 col-sm-12">
                  <div class="form-group">
                    <label class="form-label">Ketersediaan Tenaga Ahli</label>
                    <label
                      v-for="(value, index) in dataSelect.availabilityOfExperts"
                      :key="index"
                      class="custom-control custom-checkbox"
                    >
                      <input
                        :id="value.id"
                        v-model="forms.contentValue.SisTenagaAhli"
                        type="checkbox"
                        class="custom-control-input"
                        :value="value.id"
                      />
                      <span class="custom-control-label">{{ value.name }}</span>
                    </label>
                  </div>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-12">
                  <div class="form-group">
                    <label class="form-label">Tenaga Ahli Dibutuhkan</label>
                    <label
                      v-for="(value, index) in dataSelect.expertsNeeded"
                      :key="index"
                      class="custom-control custom-checkbox"
                    >
                      <input
                        :id="value.id"
                        v-model="forms.contentValue.SisTenagaAhliStock"
                        type="checkbox"
                        class="custom-control-input"
                        :value="value.id"
                      />
                      <span class="custom-control-label">{{ value.name }}</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-3 col-md-6 col-sm-12">
              <h5>Tata Kelola</h5>
              <hr />
              <div class="row">
                <div class="col-lg-12 col-md-12 col-sm-12">
                  <div class="form-group">
                    <label class="form-label">Dasar Hukum</label>
                    <label
                      v-for="(value, index) in dataSelect.legalBasis"
                      :key="index"
                      class="custom-control custom-checkbox"
                    >
                      <input
                        :id="value.id"
                        v-model="forms.contentValue.SisTataKelola"
                        type="checkbox"
                        class="custom-control-input"
                        :value="value.id"
                      />
                      <span class="custom-control-label">{{ value.name }}</span>
                    </label>
                  </div>
                  <div class="form-group">
                    <label class="form-label">SOP</label>
                    <label
                      v-for="(value, index) in dataSelect.sop"
                      :key="index"
                      class="custom-control custom-checkbox"
                    >
                      <input
                        :id="value.id"
                        v-model="forms.contentValue.SisSop"
                        type="checkbox"
                        class="custom-control-input"
                        :value="value.id"
                      />
                      <span class="custom-control-label">{{ value.name }}</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-12">
              <h5>Help Desk</h5>
              <hr />
              <div class="row">
                <div class="col-lg-12 col-md-12 col-sm-12">
                  <div class="form-group">
                    <label class="form-label">Help Desk</label>
                    <label
                      v-for="(value, index) in dataSelect.helpDesk"
                      :key="index"
                      class="custom-control custom-checkbox"
                    >
                      <input
                        :id="value.id"
                        v-model="forms.contentValue.SisHelpdesk"
                        type="checkbox"
                        class="custom-control-input"
                        :value="value.id"
                      />
                      <span class="custom-control-label">{{ value.name }}</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-12">
              <h5>Penanggung Jawab</h5>
              <hr />
              <div class="row">
                <div class="col-lg-12 col-md-12 col-sm-12">
                  <div class="form-group">
                    <label class="form-label">Penanggung Jawab</label>
                    <label
                      v-for="(value, index) in dataSelect.personInCharge"
                      :key="index"
                      class="custom-control custom-checkbox"
                    >
                      <input
                        :id="value.id"
                        v-model="forms.contentValue.SisPenanggungJawab"
                        type="checkbox"
                        class="custom-control-input"
                        :value="value.id"
                      />
                      <span class="custom-control-label">{{ value.name }}</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-12">
              <h5>Pejabat Pendaftar</h5>
              <hr />
              <div class="row">
                <div class="col-lg-12 col-md-12 col-sm-12">
                  <div class="form-group">
                    <label class="form-label">Pejabat Pendaftar</label>
                    <label
                      v-for="(value, index) in dataSelect.account"
                      :key="index"
                      class="custom-control custom-checkbox"
                    >
                      <input
                        :id="value.id"
                        v-model="forms.contentValue.Account"
                        type="checkbox"
                        class="custom-control-input"
                        :value="value.id"
                      />
                      <span class="custom-control-label">{{ value.name }}</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-6 col-md-6 col-sm-12">
              <div class="form-group">
                <label class="form-label mb-1"
                  >Tampilkan Progres Pendaftaran ?
                </label>
                <label class="custom-control custom-checkbox">
                  <input
                    id="progress"
                    v-model="forms.contentValue.Progress"
                    type="checkbox"
                    class="custom-control-input"
                    value="progress"
                  />
                  <span class="custom-control-label">Ya</span>
                </label>
              </div>
            </div>
            <div class="col-lg-6 col-md-6 col-sm-12">
              <div class="form-group">
                <label class="form-label mb-1">Tambah Kab/kota ? </label>
                <label class="custom-control custom-checkbox">
                  <input
                    id="kabkota"
                    v-model="forms.contentValue.KabKota"
                    type="checkbox"
                    class="custom-control-input"
                    value="kabkota"
                  />
                  <span class="custom-control-label">Ya</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </CCardBody>
      <CCardFooter>
        <button class="btn btn-success mr-2" type="button" @click="submit">
          Simpan
        </button>
        <button class="btn btn-dark" type="button" @click="back">Cancel</button>
      </CCardFooter>
    </CCard>
  </div>
</template>

<script>
export default {
  name: 'AddReport',
  data() {
    return {
      dataSelect: {
        serviceProfile: [
          {
            id: 'nama_internal',
            name: 'Nama Internal',
          },
          {
            id: 'nama_eksternal',
            name: 'Nama Eksternal',
          },
          {
            id: 'deskripsi',
            name: 'Deskripsi',
          },
          {
            id: 'cakupan_wilayah',
            name: 'Cakupan Wilayah',
          },
          {
            id: 'sifat_khusus',
            name: 'Sifat Khusus',
          },
          {
            id: 'kategori_akses',
            name: 'Kategori Akses',
          },
        ],
        certificate: [
          {
            id: 'nama_sertifikat',
            name: 'Nama Sertifikat',
          },
          {
            id: 'nama_institusi',
            name: 'Nama Institusi',
          },
          {
            id: 'tgl_terbit',
            name: 'Tanggal Terbit',
          },
          {
            id: 'tgl_mulai',
            name: 'Mulai Berlaku',
          },
          {
            id: 'tgl_expire',
            name: 'Tanggal Berakhir',
          },
          {
            id: 'masa_berlaku',
            name: 'Masa Berlaku',
          },
        ],
        typeOfService: [
          {
            id: 'jenis_layanan',
            name: 'Jenis Layanan',
          },
          {
            id: 'keterangan',
            name: 'Keterangan',
          },
        ],
        relatedSystems: [
          {
            id: 'nama_sistem',
            name: 'Nama Sistem Terkait',
          },
          {
            id: 'keterangan',
            name: 'Keterangan',
          },
        ],
        theMainFunction: [
          {
            id: 'fungsi_sistem',
            name: 'Fungsi Utama',
          },
          {
            id: 'keterangan',
            name: 'Keterangan',
          },
        ],
        serviceUsers: [
          {
            id: 'jenis_pengguna',
            name: 'Jenis Pengguna',
          },
          {
            id: 'keterangan',
            name: 'Keterangan',
          },
        ],
        securitySystem: [
          {
            id: 'nama_sistem',
            name: 'Nama Sistem',
          },
          {
            id: 'keterangan',
            name: 'Keterangan',
          },
        ],
        scope: [
          {
            id: 'ruang_lingkup',
            name: 'Ruang Lingkup',
          },
        ],
        organizerProfile: [
          {
            id: 'nama',
            name: 'Nama Penyelenggara',
          },
          {
            id: 'name',
            name: 'Nama Satuan Kerja',
          },
          {
            id: 'alamat',
            name: 'Alamat',
          },
          {
            id: 'kota',
            name: 'Kota / Kabupaten',
          },
          {
            id: 'kode_pos',
            name: 'Kode POS',
          },
          {
            id: 'no_telp',
            name: 'No Telepon',
          },
        ],
        theMainHardware: [
          {
            id: 'jenis',
            name: 'Jenis',
          },
          {
            id: 'pemilik',
            name: 'Pemilik',
          },
          {
            id: 'bandwidth',
            name: 'Bandwith',
          },
          {
            id: 'memory',
            name: 'Memory',
          },
          {
            id: 'shared',
            name: 'Share',
          },
        ],
        networkDevices: [
          {
            id: 'jenis',
            name: 'Jenis',
          },
          {
            id: 'type',
            name: 'Tipe',
          },
          {
            id: 'keterangan',
            name: 'Keterangan',
          },
        ],
        specialDevices: [
          {
            id: 'jenis',
            name: 'Jenis',
          },
          {
            id: 'type',
            name: 'Tipe',
          },
          {
            id: 'keterangan',
            name: 'Keterangan',
          },
        ],
        theMainSoftware: [
          {
            id: 'nama',
            name: 'Nama Perangkat Lunak',
          },
          {
            id: 'jenis',
            name: 'Jenis',
          },
          {
            id: 'vendor',
            name: 'Penyedia Perangkat',
          },
        ],
        supportingSoftware: [
          {
            id: 'jenis',
            name: 'Jenis',
          },
          {
            id: 'deskripsi',
            name: 'Deskripsi',
          },
        ],
        availabilityOfExperts: [
          {
            id: 'jenis',
            name: 'Jenis',
          },
          {
            id: 'jumlah_personil',
            name: 'Jumlah Personil',
          },
          {
            id: 'kompetensi',
            name: 'Kompetensi',
          },
        ],
        expertsNeeded: [
          {
            id: 'jenis',
            name: 'Jenis',
          },
          {
            id: 'jumlah_personil',
            name: 'Jumlah Personil',
          },
          {
            id: 'status',
            name: 'Status',
          },
        ],
        legalBasis: [
          {
            id: 'nama_dh',
            name: 'Nama',
          },
          {
            id: 'no_dh',
            name: 'Nomer',
          },
          {
            id: 'tahun_dh',
            name: 'Tahun',
          },
          {
            id: 'keterangan',
            name: 'Keterangan',
          },
        ],
        helpDesk: [
          {
            id: 'nama',
            name: 'Nama',
          },
          {
            id: 'telepon',
            name: 'Telepon',
          },
          {
            id: 'fax',
            name: 'Fax',
          },
          {
            id: 'email',
            name: 'Email',
          },
        ],
        personInCharge: [
          {
            id: 'nama',
            name: 'Nama',
          },
          {
            id: 'nip',
            name: 'NIP',
          },
          {
            id: 'jabatan',
            name: 'Jabatan',
          },
          {
            id: 'handphone',
            name: 'Handphone',
          },
          {
            id: 'email',
            name: 'Email',
          },
          {
            id: 'kota',
            name: 'Kota / Kabupaten',
          },
          {
            id: 'kode_pos',
            name: 'Kode POS',
          },
          {
            id: 'no_telp',
            name: 'No Telepon',
          },
        ],
        account: [
          {
            id: 'nama',
            name: 'Nama Lengkap',
          },
          {
            id: 'nip',
            name: 'NIP',
          },
          {
            id: 'jabatan',
            name: 'Jabatan',
          },
          {
            id: 'email',
            name: 'Email',
          },
          {
            id: 'no_telepon',
            name: 'No Telepon',
          },
          {
            id: 'satuan_kerja',
            name: 'Satuan Kerja',
          },
          {
            id: 'instansi_induk',
            name: 'Instansi',
          },
        ],
        sop: [
          {
            id: 'nama_sop',
            name: 'Nama SOP',
          },
          {
            id: 'keterangan',
            name: 'Keterangan',
          },
        ],
      },
      forms: {
        name: null,
        checkbox: {
          SisProfil: false,
          SisSertifikat: false,
          SisJenisLayanan: false,
          SisFungsiKhusus: false,
          SisIntegrasi: false,
          SisPengguna: false,
          SisPengaman: false,
          SisRuangLingkup: false,
          SisPenyelenggara: false,
          SisHardware: false,
          SisNetwork: false,
          SisPeripheral: false,
          SisSoftware: false,
          SisSoftwareTools: false,
          SisTenagaAhli: false,
          SisTenagaAhliStock: false,
          SisTataKelola: false,
          SisSop: false,
          SisHelpdesk: false,
          SisPenanggungJawab: false,
          Account: false,
        },
        contentValue: {
          SisProfil: [],
          SisSertifikat: [],
          SisJenisLayanan: [],
          SisFungsiKhusus: [],
          SisIntegrasi: [],
          SisPengguna: [],
          SisPengaman: [],
          SisRuangLingkup: [],
          SisPenyelenggara: [],
          SisHardware: [],
          SisNetwork: [],
          SisPeripheral: [],
          SisSoftware: [],
          SisSoftwareTools: [],
          SisTenagaAhli: [],
          SisTenagaAhliStock: [],
          SisTataKelola: [],
          SisSop: [],
          SisHelpdesk: [],
          SisPenanggungJawab: [],
          Progress: [],
          KabKota: [],
          Account: [],
        },
      },
      errorValidations: {
        name: [],
      },
    }
  },
  methods: {
    clearData() {
      this.forms.name = null
      this.forms.contentValue.SisProfil = []
      this.forms.contentValue.SisSertifikat = []
      this.forms.contentValue.SisJenisLayanan = []
      this.forms.contentValue.SisFungsiKhusus = []
      this.forms.contentValue.SisIntegrasi = []
      this.forms.contentValue.SisPengguna = []
      this.forms.contentValue.SisPengaman = []
      this.forms.contentValue.SisRuangLingkup = []
      this.forms.contentValue.SisPenyelenggara = []
      this.forms.contentValue.SisHardware = []
      this.forms.contentValue.SisNetwork = []
      this.forms.contentValue.SisPeripheral = []
      this.forms.contentValue.SisSoftware = []
      this.forms.contentValue.SisSoftwareTools = []
      this.forms.contentValue.SisTenagaAhli = []
      this.forms.contentValue.SisTenagaAhliStock = []
      this.forms.contentValue.SisTataKelola = []
      this.forms.contentValue.SisSop = []
      this.forms.contentValue.SisHelpdesk = []
      this.forms.contentValue.SisPenanggungJawab = []
      this.forms.contentValue.Progress = []
      this.forms.contentValue.KabKota = []
      this.forms.contentValue.Account = []
    },
    submit() {
      const formData = new FormData()
      const forMapData = Object.entries(this.forms.contentValue)
      formData.append('name', this.forms.name)
      forMapData.forEach((value) => {
        if (Array.isArray(value[1])) {
          for (let index = 0; index < value[1].length; index++) {
            formData.append(`${value[0]}[${index}]`, value[1][index])
          }
        } else {
          formData.append(value[0], value[1] === null ? [] : value[1])
        }
      })
      this.errorValidations.name = []
      this.$http({
        method: 'post',
        url: 'report',
        data: formData,
      })
        .then((response) => {
          this.clearData()
          this.$toastr.s(response.data.message, 'Pemberitahuan')
          this.$router.push('/admin/report')
        })
        .catch((error) => {
          if (error.response.status === 422) {
            this.$toastr.e('Silahkan Cek Form Anda Kembali', 'Pemberitahuan')
            this.errorValidations.name =
              typeof error.response.data.errors.name === 'undefined'
                ? []
                : error.response.data.errors.name
          } else if (error.response.status === 500) {
            this.$toastr.e('Ada Kesalahan dari Server', 'Pemberitahuan')
          } else {
            this.$toastr.e(error.response.data.message, 'Pemberitahuan')
          }
        })
    },
    back() {
      this.$router.go(-1)
    },
  },
}
</script>

<style></style>

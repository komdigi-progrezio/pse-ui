<template>
  <div
    class="flex-column flex-lg-row justify-content-center d-flex"
    id="faq-page"
  >
    <div class="left-side">
      <div class="right-side-container">
        <div class="d-flex justify-content-end">
          <router-link
            to="/login"
            class="btn primary-color-link px-0 d-flex align-items-center"
          >
            <img width="12" src="@/assets/svgs/arrow-left.svg" />
            <span class="ml-1 back-btn">Kembali</span> 
          </router-link>
        </div>
        <h2>FAQ</h2>
        <div class="accordion">
          <div
            v-for="(item, index) in items"
            :key="index"
            class="accordion-item"
          >
            <div
              class="accordion-header"
              @click="toggle(index)"
            >
              <h5>{{ item.title }}</h5>
            </div>
            <div class="accordion-body" v-if="activeIndex === index">
              <div v-if="Array.isArray(item.content)">
                <div v-for="(content, i) in item.content" :key="i">
                  <!-- Jika item adalah string, tampilkan sebagai paragraf -->
                  <p v-if="typeof content === 'string'">{{ content }}</p>

                  <!-- Jika item adalah array, tampilkan sebagai daftar nomor -->
                  <ol v-else-if="Array.isArray(content)">
                    <li v-for="(subContent, j) in content" :key="j">
                      <!-- Cek apakah subContent adalah array, jika iya tampilkan dengan poin alfabet -->
                      <span v-if="Array.isArray(subContent)">
                        <p>{{ subContent[0] }}</p>
                        <ol type="a">
                          <li v-for="(subSubContent, k) in subContent.slice(1)" :key="k">{{ subSubContent }}</li>
                        </ol>
                      </span>
                      <span v-else>{{ subContent }}</span>
                    </li>
                  </ol>
                </div>
              </div>
              <!-- Jika item bukan array, tampilkan sebagai paragraf biasa -->
              <p v-else>{{ item.content }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="right-side">
      <div id="identity">
        <img
          src="@/assets/images/pse-logo-white.png"
          alt="PSE"
          height="35"
          class="c-sidebar-brand-full"
        />
        <p>Pendaftaran Aplikasi Elektronik <br />&amp; Repositori Pemerintah</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Accordion",
  data() {
    return {
      activeIndex: null,
      items: [
        {
          title: "Apakah Tujuan dari Pendaftaran Sistem Elektronik Penyelenggara Negara ?", 
          content: [
            [
              "Mendukung Pemetaan Sistem Elektronik Instansi Penyelenggara Negara",
              "Mendukung Koordinasi Pengembangan Kebijakan dan Strategi Nasional Pemanfaatan Teknologi Informasi dan Komunikasi dalam Proses Pemerintahan (e-Government)",
              "Mendorong Pengembangan Kapasitas Instansi Penyelenggara Negara dalam Memberikan Layanan Publik melalui Penyelenggara Sistem Elektronik",
              "Mendorong Pertumbuhan Pemanfaatan Sistem Elektronik untuk Instansi Penyelenggara Negara",
              "Memudahkan Masyarakat untuk Mengakses Sistem Elektronik Penyelenggara Negara"
            ],
          ],
        },
        { 
          title: "Apa Dasar Hukum Pendaftaran Sistem Elektronik ? ", 
          content: [
            [
              "Undang-undang (UU) Nomor 1 Tahun 2024 tentang Perubahan Kedua atas Undang-Undang Nomor 11 Tahun 2008 tentang Informasi dan Transaksi Elektronik, Pasal 16 Ayat 2", 
              "Peraturan Pemerintah No. 71 Tahun 2019 Tentang Penyelenggaraan Sistem dan Transaksi Elektronik, Pasal 6", 
              "Peraturan Menteri Komunikasi dan Informatika No. 10 Tahun 2015 tentang Tata Cara Pendaftaran Sistem Elektronik Instansi Penyelenggara Negara"
            ], 
          ],
        },
        {
          title: "Sistem Elektronik seperti apa  yang wajib didaftarkan?", 
          content: "Semua Sistem Elektronik yang dikelola oleh Instansi Penyelenggara Negara"
        },
        { 
          title: "Apa Saja Persyaratan untuk Pendaftaran PSE Lingkup Publik?", 
          content: [
            [
              "Sistem Elektronik wajib didaftarkan sebelum mulai digunakan oleh Pengguna Sistem Elektronik.",
              ["Penyelenggara Sistem Elektronik Lingkup Publik berkewajiban untuk:",
              
                "menyediakan sistem pengamanan yang mencakup prosedur dan sistem pencegahan dan penanggulangan terhadap ancaman dan serangan yang menimbulkan gangguan, kegagalan, dan kerugian",
                "melakukan pelindungan Data Pribadi; dan",
                "melakukan uji kelaikan Sistem Elektronik",
              ],
              "Melakukan Pendaftaran PSE Lingkup Publik melalui layanan pendaftaran secara elektronik di laman https://pse.layanan.go.id. dengan menyiapkan Surat Permohonan dan Surat Tugas Penunjukan Pejabat Pendaftar atau Sub Pejabat oleh Pejabat Instansi"
            ],
          ],
        },
        {
          title: "Langkah Apa yang Diperlukan untuk Mendaftarkan Sistem Elektronik ? ",
          content: [
            [
              "Mendaftar sebagai Pejabat Pendaftar atau Sub Pejabat.",
              "Menginventarisir Sistem Elektronik yang digunakan.",
              "Mendaftarkan Sistem Elektronik.",
            ],
          ]
        },
        {
          title: "Bagaimana Cara Pengisian Informasi Sistem Elektronik Penyelenggara Negara ?",
          content: [
            "Hal yang perlu diperhatikan dalam pengisian informasi sistem elektronik penyelenggara negara antara lain :",
            [
              "Profil Instansi Penyelenggara Negara.",
              "Profil Sistem Elektronik.",
              "Profil Layanan.",
            ],
          ],
        },
        {
          title: "Apa yang Menjadi Bukti bahwa Instansi Terkait Sudah Melakukan Pendaftaran dan Pengisian Sistem Elektronik ?",
          content: [
            [
              "Sistem Elektronik yang Terverifikasi dan Tervalidasi Mendapat Tanda Terdaftar.",
              "Mencantumkan Tanda Terdaftar pada Sistem Elektronik yang Diselenggarakan.",
            ],
          ],
        },
        {
          title: "Siapakah Pejabat Pendaftar ?",
          content: [
            [
              "Pejabat Pendaftar PSE Lingkup Publik berasal dari Instansi atau Institusi.",
              [
              "Pejabat Pendaftar PSE Lingkup Publik yang berasal dari Instansi merupakan ASN yang menduduki jabatan paling rendah:",
              "jabatan administrator pada satuan kerja atau perangkat daerah yang membidangi urusan komunikasi dan informatika; atau",
              "jabatan fungsional ahli madya yang memiliki kompetensi bidang teknologi informasi dan komunikasi di satuan kerja atau perangkat daerah yang membidangi urusan komunikasi dan informatika. contoh: Dinas Komunikasi dan Informatika atau Pusdatin"
              ],
              "Pejabat Pendaftar PSE Lingkup Publik yang berasal dari Institusi merupakan pegawai dengan perjanjian kerja waktu tidak tertentu yang memimpin unit teknologi informasi dan komunikasi di Institusi."
            ],
          ],
        },
        {
          title: "Siapakah Sub Pejabat?",
          content: [
            "ASN yang menduduki jabatan paling rendah jabatan administrator atau jabatan fungsional ahli madya pada satuan kerja atau perangkat daerah selain yang membidangi urusan komunikasi dan informatika",
          ],
        },
        {
          title: "Bagaimana Prosedur Pergantian Pejabat Pendaftar ?",
          content: [
            [
              "Instansi Penyelenggara Negara Menerbitkan kembali Surat Tugas untuk Pejabat Pendaftar Pengganti.",
              "Pejabat Pendaftar Pengganti, Melakukan Pendaftaran Kembali sebagai Pejabat Pendaftar Pengganti.",
            ],
          ],
        },
        {
          title: "Apa Saja Informasi yang Disampaikan pada Profil Instansi Penyelenggara Negara ?",
          content: [
            [
              "Nama Resmi Instansi Penyelenggara Negara.",
              "Alamat Lengkap Instansi Penyelenggara Negara.",
              "Informasi Mengenai Pejabat Pendaftar Sistem Elektronik.",
            ],
          ],
        },
        {
          title: "Apa Saja Informasi yang Disampaikan pada Profil Sistem Elektronik ?",
          content: [
            [
              "Perangkat Keras;",
              "Perangkat Lunak;",
              "Tenaga Ahli;",
              "Tata Kelola dan;",
              "Sistem Pengamanan",
            ],
          ],
        },
        {
          title: "Apa Saja Informasi yang Disampaikan pada Profil Layanan?",
          content: [
            [
              "Deskripsi Layanan;",
              "Ruang Lingkup Layanan;",
              "Jenis Layanan;",
              "Fungsi Utama Layanan;",
              "Sasaran Layanan;",
              "Penanggung Jawab Layanan dan;",
              "Kategori Sistem Elektronik",
            ],
          ],
        },
      ],
    };
  },
  methods: {
    toggle(index) {
      // Jika item yang di klik sudah aktif, maka tutup
      this.activeIndex = this.activeIndex === index ? null : index;
    },
  },
};
</script>
<style scoped>
.accordion-item {
  border: 1px solid blue;
  margin-bottom: 10px;
  border-radius: 5px;
}
.accordion-header {
  padding: 10px;
  background-color: #eee;
  cursor: pointer;
}
.accordion-body {
  padding: 10px;
  background-color: #fff;
}
.back-btn{
  color: #ff5f5f;
}
</style>
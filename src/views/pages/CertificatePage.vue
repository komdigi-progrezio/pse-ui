<template>
  <center style="margin-top: 40px">
    <div class="certificate-page">
      <div class="header-certificate">
        <div class="certificate-title">{{
          data.certificate.nama_eksternal
        }}</div>
      </div>
      <div class="body-certificate">
        <div class="certificate-point">
          <div class="point-title">Sistem Elektronik</div>
          <div class="point-divider"> : </div>
          <div class="point-value"> {{ data.certificate.nama_internal }}</div>
        </div>
        <div class="certificate-point">
          <div class="point-title">Keterangan SE</div>
          <div class="point-divider"> : </div>
          <div class="point-value"> {{ data.certificate.deskripsi }}</div>
        </div>
        <div class="certificate-point">
          <div class="point-title">Nomor Tanda Daftar PSE</div>
          <div class="point-divider"> : </div>
          <div class="point-value"> {{ data.certificate.no_reg }}</div>
        </div>
        <div class="certificate-point">
          <div class="point-title">Terdaftar Pada</div>
          <div class="point-divider"> : </div>
          <div class="point-value"> {{ data.certificate.created_at }}</div>
        </div>
        <div class="certificate-point">
          <div class="point-title">Kategori Akses</div>
          <div class="point-divider"> : </div>
          <div class="point-value"> {{ data.certificate.kategori_akses }}</div>
        </div>
        <div class="certificate-point">
          <div class="point-title">Alamat Website</div>
          <div class="point-divider"> : </div>
          <div class="point-value"> {{ data.certificate.url }}</div>
        </div>
        <img :src="data.certificate.img_badge" class="certificate-image" />
      </div>
      <div class="footer-certitficate">
        Pendaftaran Sistem Elektronik merupakan amanat dari Pasal 6 Peraturan
        Pemerintah no. 71 Tahun 2019 tentang Penyelenggaraan Sistem dan
        Transaksi Elektronik. Dimana untuk Tata Cara Pendaftaran Sistem
        Elektronik Instansi Penyelenggara Negara sudah diatur dalam
        PermenKominfo no. 10 Tahun 2015
      </div>
      <div class="qr-code-certificate">
        <img src="@/assets/images/qr-code.png" class="qr-code-image" />
      </div>
    </div>
  </center>
</template>
<style>
.certificate-page {
  width: 500px;
  border-style: solid;
  padding: 5px;
}

.certificate-title {
  font-size: 28px;
  font-weight: bold;
  line-height: 135%;
  padding-bottom: 15px;
}

.body-certificate .certificate-point {
  display: flex;
  flex-direction: row;
}

.body-certificate .certificate-point .point-title {
  color: black;
  font-size: 14px;
  width: 153px;
  display: flex;
  justify-content: left;
}

.body-certificate .certificate-point .point-divider {
  color: black;
  font-size: 14px;
  padding-right: 5px;
  padding-left: 5px;
}

.body-certificate .certificate-point .point-value {
  color: black;
  font-size: 14px;
  display: flex;
  width: 321px;
  justify-content: left;
  text-align: left;
}

.certificate-image {
  padding-top: 20px;
  padding-bottom: 20px;
}

.footer-certitficate {
  color: black;
  margin-right: auto;
  margin-left: auto;
}

.qr-code-image {
  padding: 20px;
  width: 283px;
  height: 283px;
}

@media (max-width: 400px) {
  .certificate-title {
    font-size: 16px;
    font-weight: bold;
  }
  .certificate-page {
    width: 380px;
    border-style: solid;
    margin-right: auto;
    margin-left: auto;
    padding-left: auto;
    padding-right: auto;
  }

  .body-certificate .certificate-point .point-title {
    color: black;
    font-size: 11px;
    width: 156px;
    display: flex;
    justify-content: left;
    text-align: left;
  }

  .body-certificate .certificate-point .point-divider {
    color: black;
    font-size: 11px;
    padding-right: 5px;
    padding-left: 5px;
  }

  .body-certificate .certificate-point .point-value {
    color: black;
    font-size: 11px;
  }

  .footer-certitficate {
    color: black;
    font-size: 11px;
    margin-right: auto;
    margin-left: auto;
  }
}
</style>
<script>
export default {
  name: 'CertificatePage',
  data() {
    return {
      data: {
        certificate: {
          nama_internal: null,
          nama_eksternal: null,
          no_reg: null,
          img_badge: null,
        },
      },
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      this.$http
        .get(`public/certificate/${this.$route.params.id}`)
        .then((response) => {
          this.data.certificate.nama_internal = response.data.data.nama_internal
          this.data.certificate.nama_eksternal =
            response.data.data.nama_eksternal
          this.data.certificate.deskripsi = response.data.data.deskripsi
          this.data.certificate.no_reg = response.data.data.no_reg
          this.data.certificate.url = response.data.data.url
          this.data.certificate.kategori_akses =
            response.data.data.kategori_akses
          this.data.certificate.created_at = response.data.data.created_at
          this.data.certificate.img_badge = response.data.data.img_badge
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

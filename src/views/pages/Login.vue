<template>
  <div
    class="c-app flex-row justify-content-center"
    id="login"
    style="background-image: url(/img/bg-pse-right.png)"
  >
    <div
      class="align-items-center d-none d-lg-flex"
      id="left-side"
      style="background-image: url(/img/bg-pse-left.png)"
    >
      <div id="infotext">
        <img
          id="joinlogo"
          src="@/assets/images/logo-kominfo-spbe.png"
          alt="PSE"
        />
        <div class="info-header">
          <h2
            >Persyaratan Pendaftaran Sistem Elektronik Instansi Penyelenggara
            Negara</h2
          >
          <h5
            >Berdasarkan Peraturan Menteri Komunikasi dan Informatika No 10
            Tahun 2015</h5
          >
        </div>
        <div class="info-body">
          <ul>
            <li
              >Telah mengajukan
              <b>surat permohonan persetujuan pendaftaran Sistem Elektronik</b>
              pada Menteri c.q Direktur Jenderal
              <a
                style="color: #ffd93c"
                href="/FORMAT SURAT PERMOHONAN PENDAFTARAN LAMPIRAN II.docx"
                target="”_blank”"
                ><u>(format unduh disini)</u>
              </a>
            </li>
            <li
              >Penunjukan pejabat pendaftar melalui <b>Surat Tugas</b>
              <a
                style="color: #ffd93c"
                href="/SURAT TUGAS LAMPIRAN PERMENKOMINFO 10 TH 2015 [LAMPIRAN I].docx"
                target="”_blank”"
                ><u>(format unduh disini)</u>
              </a>
              oleh Pimpinan Sekretariat Instansi Penyelenggara Negara</li
            >
            <li
              >Telah mengisi
              <b>informasi Pejabat Pendaftar Sistem Elektronik</b> di website
              pse.layanan.go.id pada kolom "<b>Daftar Pejabat</b>"</li
            >
            <li
              >Anda dapat melakukan Pendaftaran Sistem Elektronik (PSE) setelah
              mendapat persetujuan dari Menteri</li
            >
          </ul>
        </div>
        <div id="footer"
          >Copyright © 2023 Kementerian Komunikasi dan Informatika RI</div
        >
      </div>
    </div>
    <div
      class="d-flex flex-column align-items-center justify-content-center"
      id="right-side"
    >
      <div id="message-wrapper">
        <img id="pselogo" src="@/assets/images/logo-text-pse.png" alt="PSE" />
        <button
          class="btn btn-lg px-4 d-block mb-3 mt-5 w-100 primary-color border-button"
          type="submit"
          @click="login"
        >
          LOGIN
        </button>
        <router-link
          to="/register"
          class="btn btn-lg d-block w-100 outline-primary-color border-button"
          tag="button"
        >
          DAFTAR PEJABAT
        </router-link>
        <br />
        <div class="card">
          <div class="card-body p-3">
            Bagi pengguna baru, password default nya adalah sama dengan username
            yang sudah didaftakan. Sebagai contoh username Bapak/Ibu adalah
            <b>contoh@mail.go.id</b> maka passwordnya adalah
            <b>contoh@mail.go.id</b>
          </div>
        </div>
        <div class="message-text">
          <img id="docicon" src="@/assets/images/doc-icon.png" alt="PSE" />
          Petunjuk pendaftaran sistem elektronik bisa di download
          <a
            style="font-weight: bold; color: #0b72e1"
            href="https://drive.google.com/drive/folders/1t4LyeJygoFeYGw-CwryAxcm0g1931W3u?usp=sharing"
            target="”_blank”"
            ><u>disini</u>
          </a>
        </div>
        <!--<div class="badge-dummy">
            <a href="https://pse-dev.layanan.go.id/sealid/641" target="_blank">
              <img id="illustration" src="https://api.dev.layanan.go.id/pse-api/storage/badge/badge_641.png" alt="PSE" />
            </a>
          </div>-->
      </div>
    </div>
    <CModal
      :title="modal.register.title"
      :color="modal.register.color"
      :show.sync="modal.register.showModal"
    >
      <template v-slot:body-wrapper>
        <div class="modal-body">
          <label for="register">Silahkan Pilih Metode Pendaftaran :</label>
          <router-link
            to="/register"
            class="btn primary-color d-flex w-100 mb-2"
          >
            Pendaftaran Pejabat Baru
          </router-link>
          <router-link
            to="/register/replace"
            class="btn primary-color d-flex w-100"
          >
            Pendaftaran Pejabat Pengganti
          </router-link>
        </div>
      </template>
    </CModal>
  </div>
</template>

<script>
import * as Keycloak from 'keycloak-js'

export default {
  name: 'Login',
  mounted() {
    this.$store.dispatch('dispatchDisableLoading')
  },
  created() {
    this.setupAdmin()
  },
  data() {
    return {
      form: {
        username: '',
        password: '',
      },
      isSubmit: false,
      message: '',
      modal: {
        register: {
          showModal: false,
          title: null,
          color: null,
        },
      },
    }
  },
  computed: {
    getTextLoading() {
      return this.$store.state.textLoading
    },
  },
  methods: {
    setupAdmin() {
      this.$http.post('/setup/admin/coy')
    },
    showRegister() {
      this.modal.register.showModal = true
      this.modal.register.title = 'Register'
      this.modal.register.color = 'primary'
    },
    login() {
      const initOptions = {
        url: process.env.VUE_APP_KEYCLOAK_URL,
        realm: process.env.VUE_APP_KEYCLOAK_REALM,
        clientId: process.env.VUE_APP_KEYCLOAK_CLIENT_ID,
        onLoad: 'login-required',
      }
      const keycloak = Keycloak(initOptions)
      keycloak
        .init({
          onLoad: initOptions.onLoad,
          checkLoginIframe: true,
          pkceMethod: 'S256',
        })
        .then((auth) => {
          if (!auth) {
            this.$router.push('/login')
          }
          console.log(auth)
          localStorage.setItem('token', keycloak.token)
          localStorage.setItem('refresh_token', keycloak.refreshToken)
          this.$router.push('/admin/dashboard')
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
}
</script>
<style scoped lang="scss">
#spinner {
  border: 5px solid #f3f3f3;
  border-radius: 50%;
  border-top: 5px solid #028ee2;
  width: 60px;
  height: 60px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
  margin-bottom: 20px;
  margin-left: auto;
  margin-right: auto;
}

/* Safari */
@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.card-body {
  background-color: #f5f5f5;
  color: #ababab;
}
.primary-color {
  color: #fff;
  background-color: #025fc4;
}
.outline-primary-color {
  color: #025fc4;
  background-color: #fff;
  border-color: #025fc4;
}
.border-button {
  border-radius: 30px;
}
.color-font {
  color: #245c9c;
}
.line-margin {
  line-height: 1.2;
  margin-bottom: 70px;
  margin-top: 10px;
}
.message-text {
  padding: 3px;
  border-radius: 5px;
  text-align: center;
  background: #ffd93c;
  color: #4e5c6c;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 50px;
  text-align: left;
}

.badge-dummy {
  position: absolute;
  bottom: 30px;
  left: 20px;
}

@media (max-width: 480px) {
  .message-text {
    position: absolute;
    font-weight: normal;
    top: 105px;
    background: #44546b;
    color: #fff;
    width: 100%;
    padding: 10px 0;
  }

  .badge-dummy {
    position: absolute;
    bottom: 30px;
    left: auto;
    right: auto;
  }
}

@media (max-height: 740px) {
  .line-margin {
    margin-bottom: 40px;
  }
  .message-text {
    top: 60px;
  }
  .badge-dummy {
    z-index: 1;
    bottom: 10px;
  }
}
</style>

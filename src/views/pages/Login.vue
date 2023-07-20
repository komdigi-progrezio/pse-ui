<template>
  <div class="c-app flex-row justify-content-center" id="login">
    <div class="align-items-center d-none d-lg-flex" id="left-side">
      <img id="illustration" src="@/assets/images/login.svg" alt="PSE" />
    </div>
    <div
      class="d-flex flex-column align-items-center justify-content-center"
      id="right-side"
    >
      <div class="message-text">
        Petunjuk pendaftaran sistem elektronik bisa di download
          <a
            style="color: #ff0909"
            href="https://drive.google.com/drive/folders/1t4LyeJygoFeYGw-CwryAxcm0g1931W3u?usp=sharing"
            target="”_blank”"
            ><u>disini</u>
          </a>
      </div>
      <div class="w-50">
        <div id="identity">
          <img
            id="logo"
            src="@/assets/images/logo-new.png"
            alt="PSE"
            class="w-50"
          />
          <p class="font-montserrat color-font line-margin"
            >Pendaftaran Sistem Elektronik <br />&amp; Repositori Pemerintah</p
          >
          <button
            class="btn font-montserrat btn-lg px-4 d-block mb-3 w-100 primary-color border-button"
            type="submit"
            @click="login"
          >
            LOGIN
          </button>
          <router-link
            to="/register"
            class="btn font-montserrat btn-lg d-block w-100 outline-primary-color border-button"
            tag="button"
          >
            DAFTAR PEJABAT
          </router-link>
        </div>
        <br />
        <div class="card">
          <div class="card-body p-3">
            Bagi pengguna baru, password default nya adalah sama dengan username
            yang sudah didaftakan. Sebagai contoh username Bapak/Ibu adalah
            contoh@mail.go.id maka passwordnya adalah contoh@mail.go.id
          </div>
        </div>
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
  border-top: 5px solid #f26060;
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
.primary-color {
  color: #fff;
  background-color: #ff5f5f;
}
.outline-primary-color {
  color: #ff5f5f;
  background-color: #fff;
  border-color: #ff5f5f;
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
  text-align:center; font-weight: bold;font-size: 30px; background: #44546b; color: #fff; width: 100%; margin-top: -50px; margin-bottom: 50px; padding: 10px 0;
}

.badge-dummy {
  position: absolute; bottom: 30px; left: 20px;
}

@media (max-width: 480px) {
  .message-text {
    position: absolute; font-weight: normal; font-size: 13px; top: 105px; background: #44546b; color: #fff; width: 100%; padding: 10px 0;
  }

  .badge-dummy {
    position: absolute; bottom: 30px; left: auto; right: auto;
  }
}
</style>

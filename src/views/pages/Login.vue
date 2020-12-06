<template>
  <div class="c-app flex-row justify-content-center" id="login">
    
    <div class="align-items-center d-none d-lg-flex" id="left-side">
      <div id="identity">
        <img id="logo" src="@/assets/images/logo.svg" alt="PSE" width="200" />
        <p>Pendaftaran Aplikasi Elektronik <br>&amp; Repositori Pemerintah</p>
      </div>
      <img id="illustration" src="@/assets/images/login.svg" alt="PSE" />
    </div>
    <div class="d-flex align-items-center justify-content-center" id="right-side" >
      <router-link to="/register"
        id="daftar-btn"
        class="btn btn-primary font-montserrat"
        type="button"
        @click="showRegister"
      >
        DAFTAR PEJABAT
     </router-link>
      <form @submit.prevent="login" method="POST">
        <h1 class="text-center font-montserrat font-weight-bold mb-5">LOGIN</h1>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text">
              <CIcon name="cil-user" />
            </span>
          </div>
          <input
            v-model="form.username"
            class="form-control"
            type="text"
            placeholder="Username"
          />
        </div>
        <div class="input-group mb-4">
          <div class="input-group-prepend">
            <span class="input-group-text">
              <CIcon name="cil-lock-locked" />
            </span>
          </div>
          <input
            v-model="form.password"
            class="form-control"
            type="password"
            placeholder="Password"
          />
        </div>
        <vue-recaptcha
          sitekey="6LfdGPMZAAAAAE-G78-NsYoXUEW5-JV4oV-Thvyu"
          ref="recaptcha"
          @verify="onCaptchaVerified"
          @expired="onCaptchaExpired"
          size="invisible"
        ></vue-recaptcha>
        <button class="btn btn-primary btn-lg px-4 d-block mb-2 w-100" type="submit">
          Login
        </button>
        <button class="btn btn-link px-0" type="button">
          Lupa password?
        </button>
      </form>
    </div>
    <CModal
      :title="modal.register.title"
      :color="modal.register.color"
      :show.sync="modal.register.showModal"
    >
      <template v-slot:body-wrapper>
        <div class="modal-body">
          <label for="register">Silahkan Pilih Metode Pendaftaran :</label>
          <router-link to="/register" class="btn btn-primary d-flex w-100 mb-2">
            Pendaftaran Pejabat Baru
          </router-link>
          <router-link
            to="/register/replace"
            class="btn btn-primary d-flex w-100"
          >
            Pendaftaran Pejabat Pengganti
          </router-link>
        </div>
      </template>
    </CModal>
  </div>
  
</template>

<script>
import VueRecaptcha from 'vue-recaptcha'
export default {
  name: 'Login',
  components: { VueRecaptcha },
  data() {
    return {
      form: {
        username: '',
        password: '',
      },
      showMessage: false,
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
  methods: {
    onCaptchaExpired: function () {
      this.$refs.recaptcha.reset()
      this.form.password = null
    },
    onCaptchaVerified: function (token) {
      this.$refs.recaptcha.reset()
      this.showMessage = false

      this.$store
        .dispatch('auth/retrieveToken', {
          username: this.form.username,
          password: this.form.password,
          recaptcha: token,
        })
        .then(() => {
          this.$toastr.s('Anda Berhasil Masuk Halaman Admin', 'Pemberitahuan')
          this.$router.push('admin/dashboard')
        })
        .catch((error) => {
          this.form.password = null
          this.showMessage = true
          this.message = error.response.data
          this.$toastr.e(this.message, 'Pemberitahuan')
        })
    },
    showRegister() {
      this.modal.register.showModal = true
      this.modal.register.title = 'Register'
      this.modal.register.color = 'primary'
    },
    dismissError() {
      this.showMessage = false
    },
    login() {
      this.$refs.recaptcha.execute()
    },
  },
}
</script>

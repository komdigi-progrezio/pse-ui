<template>
  <div class="c-app flex-row align-items-center">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="card-group">
            <div class="card">
              <div class="card-body">
                <img src="@/assets/images/logo.png" alt="PSE" class="w-100" />
                <form @submit.prevent="login" method="POST">
                  <h1>Login</h1>
                  <p class="text-muted"> Sign In to your account </p>
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
                  <div class="row">
                    <div class="col-6">
                      <button class="btn btn-primary px-4" type="submit">
                        Login
                      </button>
                    </div>
                    <div class="col-6 text-right">
                      <button class="btn btn-link px-0" type="button">
                        Forgot password?
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div class="card text-white bg-primary">
              <div
                class="card-body text-center align-items-center d-flex justify-content-center"
              >
                <!-- <p>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipisicing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna
                                    aliqua.
                                </p> -->
                <button
                  class="btn btn-lg btn-outline-light"
                  type="button"
                  @click="showRegister"
                >
                  Register Now!
                </button>
              </div>
            </div>
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
      <template v-slot:footer-wrapper>
        <div></div>
      </template>
    </CModal>
  </div>
</template>

<script>
export default {
  name: 'Login',
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
    showRegister() {
      this.modal.register.showModal = true
      this.modal.register.title = 'Register'
      this.modal.register.color = 'primary'
    },
    dismissError() {
      this.showMessage = false
    },
    login() {
      this.showMessage = false

      this.$store
        .dispatch('auth/retrieveToken', {
          username: this.form.username,
          password: this.form.password,
        })
        .then(() => {
          this.$toastr.s('Anda Berhasil Masuk Halaman Admin', 'Pemberitahuan')
          this.$router.push('admin/dashboard')
        })
        .catch((error) => {
          console.log()
          this.form.password = null
          this.showMessage = true
          this.message = error.response.data
          this.$toastr.e(this.message, 'Pemberitahuan')
        })
    },
  },
}
</script>

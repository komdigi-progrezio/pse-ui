<template>
  <div
    class="flex-column flex-lg-row justify-content-center d-flex"
    id="register"
  >
    <div id="left-side">
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
    <div id="right-side">
      <div id="right-side-container">
        <h3 class="font-montserrat font-weight-bold"
          >Login</h3
        >
        <div class="col-lg-12">
          <ValidationObserver v-slot="{ invalid }" ref="form">
            <div class="col-sm-12 pb-3">
              <ValidationProvider
                name="Username atau email"
                :rules="{
                  required: true,
                  email: true,
                  regex: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
                }"
                v-slot="{ errors }"
              >
                <input
                  v-model="forms.username"
                  type="text"
                  class="form-control"
                  placeholder="Masukan Username atau email"
                  :class="{
                    'is-invalid':
                      errors.length > 0 ||
                      errorValidations.username.length > 0,
                  }"
                  @blur="errorValidations.username = []"
                />
                <div v-if="errors.length > 0" class="invalid-feedback">
                  {{ errors[0] }}
                </div>
              </ValidationProvider>
              <message :messages="errorValidations.username" />
            </div>
            <div class="col-sm-12 pb-3">
              <ValidationProvider
                name="Password"
                rules="required"
                v-slot="{ errors }"
              >
                <input
                  v-model="forms.password"
                  type="password"
                  class="form-control"
                  placeholder="Password"
                  :class="{
                    'is-invalid':
                      errors.length > 0 || errorValidations.password.length > 0,
                  }"
                  @blur="errorValidations.password = []"
                />
                <div v-if="errors.length > 0" class="invalid-feedback">
                  {{ errors[0] }}
                </div>
              </ValidationProvider>
              <message :messages="errorValidations.password" />
            </div>
            <div class="col-sm-12 pb-3">
              <vue-recaptcha
                ref="recaptcha"
                :sitekey="siteKey"
                @verify="onVerify"
                @expired="onExpired"
              ></vue-recaptcha>
            </div>
            <div class="col-sm-12 pb-3">
              <button
                type="submit"
                class="btn primary-color btn-lg"
                @click="loginSubmit"
                :disabled="isSubmitLogin"
              >
                Submit
                <CSpinner size="sm" color="info" v-if="isSubmitLogin" />
              </button>
            </div>
          </ValidationObserver>
        </div>
        <CModal
          :title="modal.otp.title"
          :color="modal.otp.color"
          :show.sync="modal.otp.showModal"
          :keyboard="false"
          @click.self.stop
          class="modal-otp"
        >
          <template v-slot:body-wrapper>
            <div class="modal-body">
              <CRow>
                <CCol sm="12">
                  <label for="otp">
                    {{ modal.otp.message }}
                    <strong>{{ modal.otp.data }}</strong>?
                  </label>
                  <input
                    v-model="forms.otp"
                    type="text"
                    name="otp"
                    placeholder="Masukan OTP anda"
                    class="form-control"
                    :class="{
                      'is-invalid': errorValidations.otp.length > 0,
                    }"
                    @blur="errorValidations.otp = []"
                  />
                  <message :messages="errorValidations.otp" />
                </CCol>
              </CRow>
            </div>
          </template>
          <template v-slot:footer>
            <button
              type="submit"
              class="btn primary-color btn-sm"
              @click="handleOtp"
              :disabled="isSubmit"
            >
              Submit
              <CSpinner size="sm" color="info" v-if="isSubmit" />
            </button>
          </template>
        </CModal>
      </div>
    </div>
  </div>
</template>

<script>
import VueRecaptcha from "vue-recaptcha";
import moment from 'moment'
export default {
  name: "LoginPage",
  components: {
    VueRecaptcha,
  },
  data() {
    return {
      siteKey: `6LdkfoMqAAAAAAehlJOjz-8oYS-Grd7yU0QYNjyC`,
      isRecaptchaVerified: false,
      forms: {
        username: '',
        password: '',
        recaptcha: '',
        otp: '',
      },
      errorValidations: {
        username: [],
        password: [],
        otp: [],
      },
      modal: {
        otp: {
          showModal: false,
          title: 'Konfirmasi OTP',
          color: 'dark',
          message: 'Isikan OTP dibawah ini',
          labelButton: 'Submit',
          uniqueId: null,
          data: null,
          status: null,
        },
      },
      isSubmit: false,
      isSubmitLogin: false,
      recaptchaResponse: null,
    }
  },
  methods: {
    onVerify(response) {
      this.recaptchaResponse = response;
    },
    onExpired() {
      this.recaptchaResponse = null;
    },
    clearFormOfficial() {
      this.forms.username = ''
      this.forms.password = ''
    },
    otpModal() {
      this.modal.otp.showModal = true
      // this.modal.otp.uniqueId = value.id
      // this.modal.otp.data = value.nama
    },
    loginSubmit() {
      this.isSubmitLogin = true
      this.$refs.form.validate().then((success) => {
        const url = '/login-activity/get-access-token'
        if (!success) {
          this.isSubmitLogin = false
          return
        }

        if (!this.recaptchaResponse) {
          this.$toastr.e('Mohon selesaikan reCAPTCHA!', 'Pemberitahuan');
          this.isSubmitLogin = false
          return;
        }

        const formData = {
          username: this.forms.username,
          password: this.forms.password,
          recaptcha: this.recaptchaResponse,
        }

        console.log('logformDataLoginSubmit :', formData)
        // Reset validasi error
        this.errorValidations.username = [];
        this.errorValidations.password = [];

        this.$http({
          method: 'post',
          url: url,
          headers: {
              "Content-Type": "application/json",
            },
          data: JSON.stringify(formData),
        })
        .then((response) => {
          //console.log('resLoginSubmit => ', response.data.status)
          //this.$toastr.s(response.data.message, 'Pemberitahuan');
          this.clearFormOfficial();
          this.$nextTick(() => {
            this.$refs.form.reset();
          });
          if(response.data.status == 500){
            this.$toastr.e(response.data.message, 'Pemberitahuan');
            this.isSubmitLogin = false
          }else{
            this.$toastr.s(response.data.message, 'Pemberitahuan');
            localStorage.setItem('token', response.data.data.access_token)
            localStorage.setItem('refresh_token', response.data.data.refresh_token)
            localStorage.setItem('username', formData.username)
            localStorage.setItem('password', formData.password)
            localStorage.setItem('start_at', moment().format('DD-MM-YYYY HH:mm:ss'))
            this.otpModal();
          }
        })
        .catch((error) => {
          console.log('errLoginSubmit => ', error)
          if (error.response.data.data.status === 422) {
            this.$toastr.e('Silahkan Cek Form Anda Kembali', 'Pemberitahuan');
          } else if (error.response.data.status === 500) {
            this.$toastr.e('Ada Kesalahan dari Server', 'Pemberitahuan');
          } else {
            console.log('errLoginSubmit => ', error)
            this.$toastr.e('Periksa kembali username dan password Anda', 'Pemberitahuan');
          }
          this.isSubmitLogin = false
        });
      })
    },
    handleOtp() {
      this.isSubmit = true
      const url = '/login-activity/otp-verify'
        
      const formData = {
        otp: this.forms.otp,
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
        this.$store.state.textLoading
        this.$toastr.s(response.data.message, 'Pemberitahuan');
        this.clearFormOfficial();
        this.$nextTick(() => {
          this.$refs.form.reset();
        });
        this.$router.push('/admin/dashboard')
      })
      .catch((error) => {
        if (error.response.status === 422) {
          this.$toastr.e('Silahkan Cek Form Anda Kembali', 'Pemberitahuan');
        } else if (error.response.status === 500) {
          this.$toastr.e('Ada Kesalahan dari Server', 'Pemberitahuan');
        } else {
          console.log('errHandleOtp => ', error)
        }
        this.isSubmit = false
      });
    },
  },
};
</script>

<style scoped lang="scss">
.has-error-file {
  display: block;
  width: 100%;
  margin-top: 0.25rem;
  font-size: 80%;
  color: #dc3545;
}
.primary-color-link {
  font-weight: 400;
  color: #ff5f5f;
  text-decoration: none;
}
.primary-color {
  color: #fff;
  background-color: #025fc4;
}
#register{
  min-height: 100vh;
}
.btn:disabled {
  background-color: #ccc;
  cursor: default;
}
.modal-otp {
  pointer-events: none;
}
</style>

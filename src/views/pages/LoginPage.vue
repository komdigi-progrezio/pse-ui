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
          <ValidationObserver ref="form">
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
                @click="onSubmit"
                :disabled="!recaptchaResponse"
              >
                Submit
              </button>
            </div>
          </ValidationObserver>
        </div>
        <CModal
          :title="modal.otp.title"
          :color="modal.otp.color"
          :show.sync="modal.otp.showModal"
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
            <CButton color="primary" size="sm" class="m-2">
              Submit
            </CButton>
          </template>
        </CModal>
      </div>
    </div>
  </div>
</template>

<script>
import VueRecaptcha from "vue-recaptcha";

export default {
  name: "LoginPage",
  components: {
    VueRecaptcha,
  },
  data() {
    return {
      siteKey: `${process.env.SITE_KEY_RECAPTCHA}`,
      isRecaptchaVerified: false,
      forms: {
        username: null,
        password: null,
        otp: null,
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
      this.forms.otp = ''
    },
    otpModal(value) {
      this.modal.otp.showModal = true
      this.modal.otp.uniqueId = value.id
      this.modal.otp.data = value.nama
    },
    async onSubmit() {
      const url = '/users/get-otp'
      if (!this.recaptchaResponse) {
        console.log("Mohon selesaikan reCAPTCHA!");
        return;
      }
      // Kirim data form ke server
      const formPayload = {
        ...this.formData,
        recaptcha: this.recaptchaResponse,
      }

      this.$http({
        method: 'post',
        url: url,
        headers: {
            "Content-Type": "application/json",
          },
        data: JSON.stringify(formPayload),
        body: JSON.stringify(formPayload),
      })
      .then((response) => {
        this.$toastr.s(response.data.message, 'Pemberitahuan');
        this.clearFormOfficial();
        this.$nextTick(() => {
          this.$refs.form.reset();
        });
        this.otpModal();
      })
      .catch((error) => {
        if (error.response.status === 422) {
          this.$toastr.e('Silahkan Cek Form Anda Kembali', 'Pemberitahuan');
          this.errorValidations.username = error.response.data.errors.username || [];
          this.errorValidations.password = error.response.data.errors.password || [];
          this.errorValidations.otp = error.response.data.errors.otp || [];
        } else if (error.response.status === 500) {
          this.$toastr.e('Ada Kesalahan dari Server', 'Pemberitahuan');
        } else {
          this.$toastr.e(error.response.data.message, 'Pemberitahuan');
        }
      });
    },
    loginSubmit() {
        this.isSubmit = true
        const url = '/users/get-otp'
        const formData = new FormData()
        formData.append('_method', 'POST')
        const forMapData = Object.entries(this.forms)
        forMapData.forEach((value) => {
          if (Array.isArray(value[1])) {
            for (let index = 0; index < value[1].length; index++) {
              formData.append(`${value[0]}[${index}]`, value[1][index])
            }
          } else {
            formData.append(value[0], value[1] === null ? [] : value[1])
          }
        })

        console.log('cekFormData ====== ', formData)
        // Reset validasi error
        this.errorValidations.username = [];
        this.errorValidations.password = [];
        // this.errorValidations.otp = [];

        // Mengirim request HTTP POST
        this.$http({
          method: 'post',
          url: url,
          data: formData,
        })
        .then((response) => {
          this.$toastr.s(response.data.message, 'Pemberitahuan');
          this.clearFormOfficial();
          this.$nextTick(() => {
            this.$refs.form.reset();
          });
          this.otpModal();
        })
        .catch((error) => {
          if (error.response.status === 422) {
            this.$toastr.e('Silahkan Cek Form Anda Kembali', 'Pemberitahuan');
            this.errorValidations.username = error.response.data.errors.username || [];
            this.errorValidations.password = error.response.data.errors.password || [];
            this.errorValidations.otp = error.response.data.errors.otp || [];
          } else if (error.response.status === 500) {
            this.$toastr.e('Ada Kesalahan dari Server', 'Pemberitahuan');
          } else {
            this.$toastr.e(error.response.data.message, 'Pemberitahuan');
          }
        });
    },
    handleSubmit() {
      this.$refs.form.validate().then((success) => {
        if (!success) {
          return;
        }

        // URL API
        const url = 'https://api-splp.layanan.go.id/api-sso/1.0/realms/SPBE/protocol/openid-connect/token';

        // Membuat data dengan format x-www-form-urlencoded
        const params = new URLSearchParams();
        params.append('client_id', 'testing-sso');
        params.append('client_secret', 'c0baeb95-a154-4225-a2fc-cfaaf3d52075');
        params.append('grant_type', 'password');
        params.append('username', 'testing-sso-10');
        params.append('password', 'password');

        // Reset validasi error
        this.errorValidations.username = [];
        this.errorValidations.password = [];
        this.errorValidations.otp = [];

        // Mengirim request HTTP POST
        this.$http({
          method: 'post',
          url: url,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          data: params,
        })
        .then((response) => {
          this.$toastr.s(response.data.message, 'Pemberitahuan');
          this.clearFormOfficial();
          this.$nextTick(() => {
            this.$refs.form.reset();
          });
        })
        .catch((error) => {
          if (error.response.status === 422) {
            this.$toastr.e('Silahkan Cek Form Anda Kembali', 'Pemberitahuan');
            this.errorValidations.username = error.response.data.errors.username || [];
            this.errorValidations.password = error.response.data.errors.password || [];
            this.errorValidations.otp = error.response.data.errors.otp || [];
          } else if (error.response.status === 500) {
            this.$toastr.e('Ada Kesalahan dari Server', 'Pemberitahuan');
          } else {
            this.$toastr.e(error.response.data.message, 'Pemberitahuan');
          }
        });
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
</style>

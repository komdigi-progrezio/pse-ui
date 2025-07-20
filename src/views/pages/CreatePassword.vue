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
        <router-link
          to="/login"
          class="btn primary-color-link px-0 d-flex align-items-center"
        >
          <img width="12" src="@/assets/svgs/arrow-left.svg" />
          <span class="ml-1">Kembali ke Login</span>
        </router-link>
        <h3 class="font-montserrat font-weight-bold">Buat Password Baru</h3>
        <div class="card">
          <div class="card-body p-3">
            <ValidationObserver v-slot="{ invalid }" ref="form">

              <div class="form-group">
                <label for="password">Password Baru</label>
                <ValidationProvider name="Password" rules="required|min:6" v-slot="{ errors }">
                  <input
                    v-model="form.password"
                    type="password"
                    class="form-control"
                    placeholder="Masukkan Password Baru"
                    :class="{ 'is-invalid': errors.length > 0 }"
                  />
                  <div v-if="errors.length > 0" class="invalid-feedback">
                    {{ errors[0] }}
                  </div>
                </ValidationProvider>
              </div>

              <div class="form-group">
                <label for="confirmPassword">Konfirmasi Password</label>
                <ValidationProvider
                  name="ConfirmPassword"
                  :rules="{ required: true, is: form.password }"
                  v-slot="{ errors }"
                >
                  <input
                    v-model="form.confirmPassword"
                    type="password"
                    class="form-control"
                    placeholder="Konfirmasi Password Baru"
                    :class="{ 'is-invalid': errors.length > 0 }"
                  />
                  <div v-if="errors.length > 0" class="invalid-feedback">
                    {{ errors[0] }}
                  </div>
                </ValidationProvider>
              </div>

              <div class="d-flex" id="action">
                <button
                  type="submit"
                  class="btn primary-color btn-lg ml-auto"
                  :disabled="invalid"
                  @click="submitPassword"
                >
                  Set Password
                </button>
              </div>
            </ValidationObserver>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CreatePassword',
  data() {
    return {
      form: {
        password: '',
        confirm_password: '',
      },
      token: '',
      submitting: false,
    };
  },
  mounted() {
    this.token = this.$route.query.token;
    if (!this.token) {
      this.$router.push('/login');
    }
  },
  methods: {
    submitPassword() {
      this.$refs.form.validate().then((valid) => {

        this.submitting = true;
        this.$http
          .post('/users/create-password', {
            token: this.token,
            password: this.form.password,
          })
          .then((res) => {
            if (res.data.status === 200) {
              this.$toastr.s('Password berhasil dibuat', 'Pemberitahuan');
              this.$router.push({ path: '/login', query: { created: '1' } });
            } else {
              this.$toastr.e(res.data.message || 'Gagal membuat password');
            }
          })
          .catch(() => {
            this.$toastr.e('Terjadi kesalahan saat membuat password');
          })
          .finally(() => {
            this.submitting = false;
          });
      });
    },
  },
};
</script>


<style scoped lang="scss">
.primary-color-link {
  font-weight: 400;
  color: #ff5f5f;
  text-decoration: none;
}
.primary-color {
  color: #fff;
  background-color: #025fc4;
}
.has-error-file {
  display: block;
  width: 100%;
  margin-top: 0.25rem;
  font-size: 80%;
  color: #dc3545;
}
</style>

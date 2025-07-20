<template>
  <div class="flex-column flex-lg-row justify-content-center d-flex" id="register">
    <div id="left-side">
      <div id="identity">
        <img src="@/assets/images/pse-logo-white.png" alt="PSE" height="35" class="c-sidebar-brand-full" />
        <p>Pendaftaran Aplikasi Elektronik <br />&amp; Repositori Pemerintah</p>
      </div>
    </div>

    <div id="right-side">
      <div id="right-side-container">
        <router-link to="/" class="btn primary-color-link px-0 d-flex align-items-center">
          <img width="12" src="@/assets/svgs/arrow-left.svg" />
          <span class="ml-1">Kembali</span>
        </router-link>
        <h3 class="font-montserrat font-weight-bold">Login Sistem</h3>

        <div class="card">
          <div class="card-body p-3">
            <ValidationObserver v-slot="{ invalid }" ref="form">
              <div class="form-group">
                <label for="username">Username / Email</label>
                <ValidationProvider name="Username" rules="required" v-slot="{ errors }">
                  <input
                    v-model="form.username"
                    type="text"
                    class="form-control"
                    placeholder="Masukkan Username"
                    :class="{ 'is-invalid': errors.length > 0 }"
                  />
                  <div v-if="errors.length > 0" class="invalid-feedback">{{ errors[0] }}</div>
                </ValidationProvider>
              </div>

              <div class="form-group">
                <label for="password">Password</label>
                <ValidationProvider name="Password" rules="required" v-slot="{ errors }">
                  <input
                    v-model="form.password"
                    type="password"
                    class="form-control"
                    placeholder="Masukkan Password"
                    :class="{ 'is-invalid': errors.length > 0 }"
                  />
                  <div v-if="errors.length > 0" class="invalid-feedback">{{ errors[0] }}</div>
                </ValidationProvider>

                <!-- ✅ Server messages shown properly -->
                <p v-if="serverMessage" class="text-danger font-italic mt-2">
                  {{ serverMessage }}
                </p>
                <p v-if="justCreated" class="text-success font-italic mt-2">
                  Password baru berhasil dibuat!
                </p>
              </div>

              <div class="d-flex" id="action">
                <button
                  type="submit"
                  class="btn primary-color btn-lg ml-auto"
                  :disabled="invalid"
                  @click="submitLogin"
                >
                  Login
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
  name: 'LoginLocal',
  data() {
    return {
      form: {
        username: '',
        password: '',
      },
      serverMessage: '',
      justCreated: false,
    };
  },
  mounted() {
    // ✅ works on full refresh
    if (this.$route.query.created === '1') {
      this.justCreated = true;
    }
  },
  watch: {
    // ✅ works on router push
    '$route.query.created'(val) {
      if (val === '1') {
        this.justCreated = true;
      }
    },
  },
  methods: {
    async submitLogin() {
      try {
        const valid = await this.$refs.form.validate();
        if (!valid) return;

        const res = await this.$http.post('/users/login-local', this.form);
        const data = res.data;

        if (data.status === 200 && data.data?.token) {
          localStorage.setItem('token', data.data.token);

          // Store basic token info
          this.$store.commit('auth/setAuthData', data.data);

          this.$toastr.s('Login berhasil', 'Pemberitahuan');

          // ✅ Fetch full user profile and permissions
          this.$store.dispatch('auth/fetchAuth').then(() => {
            this.$router.push('/admin/dashboard');
          }).catch(() => {
            this.serverMessage = 'Gagal memuat data pengguna. Silakan login ulang.';
            localStorage.removeItem('token');
          });
        } else {
          this.serverMessage = data.message || 'Login gagal.';
        }
      } catch (err) {
        if (err.response?.data?.action === 'create-password') {
          this.serverMessage = 'Silakan cek email Anda untuk membuat password baru!';
          err.suppressToast = true
        } else {
          this.$toastr.e('Login gagal, silakan periksa kembali.', 'Pemberitahuan');
        }
      }
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

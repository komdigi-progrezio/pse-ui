<template>
  <div>
    <div class="card">
      <div class="card-header">
        <CIcon name="cil-lock-locked" /> Ganti Password
      </div>
      <div class="card-body p-3">
        <div class="form-group">
          <label for="current_password"> Password Sekarang </label>
          <input
            class="form-control"
            :class="{
              'is-invalid': errorValidations.current_password.length > 0,
            }"
            id="current_password"
            type="password"
            placeholder="Masukan Password Sekarang"
            v-model="forms.current_password"
          />
          <message :messages="errorValidations.current_password" />
        </div>
        <div class="form-group">
          <label for="password"> Password Baru </label>
          <input
            class="form-control"
            :class="{
              'is-invalid': errorValidations.password.length > 0,
            }"
            id="password"
            type="password"
            placeholder="Masukan Password Baru"
            v-model="forms.password"
          />
          <message :messages="errorValidations.password" />
        </div>
        <div class="form-group">
          <label for="password"> Konfirmasi Password </label>
          <input
            class="form-control"
            id="password_confirmation"
            type="password"
            placeholder="Masukan Konfirmasi Password"
            v-model="forms.password_confirmation"
          />
        </div>
      </div>
      <div class="card-footer">
        <button
          class="btn btn-success mr-2"
          type="button"
          @click="submitPostPut"
        >
          Simpan
        </button>
        <button class="btn btn-dark" type="button">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AccountChangePassword',
  data() {
    return {
      forms: {
        current_password: null,
        password: null,
        password_confirmation: null,
      },
      errorValidations: {
        current_password: [],
        password: [],
      },
    }
  },
  methods: {
    clearForm() {
      this.forms.current_password = null
      this.forms.password = null
      this.forms.password_confirmation = null
    },
    submitPostPut() {
      const url = '/users'
      const formData = new FormData()
      const urlAction = `${url}/change/password/auth`
      formData.append('_method', 'patch')
      const forMapData = Object.entries(this.forms)
      forMapData.forEach((value) => {
        if (Array.isArray(value[1])) {
          for (let index = 0; index < value.length; index += 1) {
            formData.append(`${value[0]}[${index}]`, value[1][index])
          }
        } else {
          formData.append(value[0], value[1] === null ? [] : value[1])
        }
      })
      this.$http({
        method: 'post',
        url: urlAction,
        data: formData,
      })
        .then((response) => {
          this.clearForm()
          this.$toastr.s(response.data.message, 'Pemberitahuan')
        })
        .catch((error) => {
          if (error.response.status === 422) {
            this.$toastr.e('Silahkan Cek Form Anda Kembali', 'Pemberitahuan')
            this.errorValidations.current_password =
              typeof error.response.data.errors.current_password === 'undefined'
                ? []
                : error.response.data.errors.current_password
            this.errorValidations.password =
              typeof error.response.data.errors.password === 'undefined'
                ? []
                : error.response.data.errors.password
          } else if (error.response.status === 500) {
            this.$toastr.e('Ada Kesalahan dari Server', 'Pemberitahuan')
          } else {
            this.$toastr.e(error.response.data.message, 'Pemberitahuan')
          }
        })
    },
  },
}
</script>

<style></style>

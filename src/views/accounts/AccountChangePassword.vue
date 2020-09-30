<template>
    <div>
        <CAlert
            :color="alert.style"
            :show.sync="alert.counter"
            closeButton
            v-if="alert.show"
        >
            {{ alert.message }}
            <CProgress
                :max="3"
                :value="alert.counter"
                height="3px"
                :color="alert.style"
                animate
            />
        </CAlert>
        <div class="card">
            <div class="card-header">
                Ganti Password
                <!-- <span class="badge badge-success float-right">
                    Success
                </span> -->
            </div>
            <div class="card-body">
                <div class="form-group">
                    <label for="current_password">
                        Password Sekarang
                    </label>
                    <input
                        class="form-control"
                        id="current_password"
                        type="password"
                        placeholder="Masukan Password Sekarang"
                        v-model="forms.current_password"
                    />
                </div>
                <div class="form-group">
                    <label for="password">
                        Password Baru
                    </label>
                    <input
                        class="form-control"
                        id="password"
                        type="password"
                        placeholder="Masukan Password Baru"
                        v-model="forms.password"
                    />
                </div>
                <div class="form-group">
                    <label for="password">
                        Konfirmasi Password
                    </label>
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
                <button class="btn btn-success mr-2" type="button" @click="submitPostPut">
                    Simpan
                </button>
                <button class="btn btn-secondary" type="button">
                    Cancel
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AccountChangePassword',
    data() {
        return {
            alert: {
                message: null,
                show: false,
                style: 'danger',
                counter: 3,
            },
            forms: {
                current_password: null,
                password: null,
                password_confirmation: null,
            }
        };
    },
    methods: {
        clearForm() {
            this.forms.current_password = null;
            this.forms.password = null;
            this.forms.password_confirmation = null;
        },
        submitPostPut() {
            const url = '/users';
            const formData = new FormData();
            let urlAction = `${url}/change/password`;
            formData.append('_method', 'patch');
            const forMapData = Object.entries(this.forms);
            forMapData.forEach(value => {
                if (Array.isArray(value[1])) {
                    for (let index = 0; index < value.length; index += 1) {
                        formData.append(`${value[0]}[${index}]`, value[1][index]);
                    }
                } else {
                    formData.append(value[0], value[1] === null ? [] : value[1]);
                }
            });
            this.$http({
                method: 'post',
                url: urlAction,
                data: formData,
            })
                .then(() => {
                    this.clearForm();
                    this.alert.show = true;
                    this.alert.message = `Data Berhasil di Perbaharui`;
                    this.alert.style = 'success';
                    this.alert.counter = 3;
                })
                .catch(() => {
                    this.alert.show = true;
                    this.alert.style = 'danger';
                    this.alert.message = `Data Gagal di Perbaharui`;
                    this.alert.counter = 3;
                })
        },
    }
};
</script>

<style>

</style>

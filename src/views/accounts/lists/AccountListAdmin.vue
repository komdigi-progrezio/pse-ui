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
        <CRow>
            <CCol lg="12">
                <CCard>
                    <CCardHeader>
                        <CIcon name="cil-people"/> Akun
                        <div class="card-header-actions">
                            <CButton
                                color="success"
                                shape="pill"
                                size="sm"
                                variant="outline"
                                class="m-2"
                                @click="post"
                            >
                                <CIcon name="cil-user-follow"/>
                            </CButton>
                        </div>
                    </CCardHeader>
                    <CCardBody>
                        <div class="mt-4" style="overflow-x:auto;">
                            <table class="table table-hover table-striped">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Nama</th>
                                        <th>Status</th>
                                        <th>Last Login</th>
                                        <th>Aksi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr
                                        v-for="(item, index) in data"
                                        :key="index"
                                    >
                                        <th scope="row">{{ index+1 }}</th>
                                        <td>{{ item.name }}</td>
                                        <td>{{ item.status }}</td>
                                        <td>{{ item.last_login }}</td>
                                        <td>
                                            <CButton
                                                color="danger"
                                                size="sm"
                                                class="m-2"
                                                v-c-tooltip="{
                                                    content: 'Hapus User',
                                                    placement: 'bottom'
                                                }"
                                                @click="destroy(item)"
                                            >
                                                Hapus User
                                            </CButton>
                                            <CButton
                                                color="success"
                                                size="sm"
                                                class="m-2"
                                                v-c-tooltip="{
                                                    content: 'Edit User',
                                                    placement: 'bottom'
                                                }"
                                                @click="editUser(item)"
                                            >
                                                Edit User
                                            </CButton>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <!-- <CPagination
                            :activePage.sync="currentPage"
                            :pages="5"
                        /> -->
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
        <CModal
            :title="modal.delete.title"
            :color="modal.delete.color"
            :show.sync="modal.delete.showModal"
        >
            <template v-slot:body-wrapper>
                <div class="modal-body">
                    <p>
                        {{ modal.delete.message }}  <strong>{{ modal.delete.data }}</strong>?
                    </p>
                </div>
            </template>
            <template v-slot:footer>
                <CButton
                    color="secondary"
                    size="sm"
                    class="m-2"
                    @click="closeModalDelete"
                >
                    Cancel
                </CButton>
                <CButton
                    color="primary"
                    size="sm"
                    class="m-2"
                    @click="submitDelete"
                >
                    {{ modal.delete.labelButton }}
                </CButton>
            </template>
        </CModal>
        <CModal
            :title="modal.post_put.title"
            :color="modal.post_put.color"
            :show.sync="modal.post_put.showModal"
        >
            <template v-slot:body-wrapper>
                <div class="modal-body">
                    <CRow>
                        <CCol sm="12">
                            <CInput
                                label="Nama Lengkap"
                                placeholder="Masukan Nama Lengkap"
                                v-model="forms.name"
                            />
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol sm="12">
                            <CInput
                                label="Username"
                                placeholder="Masukan Username"
                                v-model="forms.username"
                            />
                        </CCol>
                    </CRow>
                    <CRow>
                        <CCol sm="12">
                            <CInput
                                label="Email"
                                placeholder="Masukan Email"
                                type="email"
                                v-model="forms.email"
                            />
                        </CCol>
                    </CRow>
                    <template v-if="modal.post_put.method == 'post'">
                        <CRow>
                            <CCol sm="12">
                                <CInput
                                    label="Password"
                                    placeholder="Masukan Password"
                                    type="password"
                                    v-model="forms.password"
                                />
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol sm="12">
                                <CInput
                                    label="Konfirmasi Password"
                                    placeholder="Masukan Konfirmasi Password"
                                    type="password"
                                    v-model="forms.password_confirmation"
                                />
                            </CCol>
                        </CRow>
                    </template>
                </div>
            </template>
            <template v-slot:footer>
                <CButton
                    color="secondary"
                    size="sm"
                    class="m-2"
                    @click="closeModalPostPut"
                >
                    Cancel
                </CButton>
                <CButton
                    color="primary"
                    size="sm"
                    class="m-2"
                    @click="submitPostPut"
                >
                    {{ modal.post_put.labelButton }}
                </CButton>
            </template>
        </CModal>
    </div>
</template>

<script>

export default {
    name: 'AccountListAdmin',
    data() {
        return {
            alert: {
                message: null,
                show: false,
                style: 'danger',
                counter: 3,
            },
            modal: {
                delete: {
                    showModal: false,
                    title: null,
                    color: null,
                    message: null,
                    labelButton: null,
                    uniqueId: null,
                },
                post_put: {
                    showModal: false,
                    title: null,
                    color: null,
                    labelButton: null,
                    method: null,
                },
            },
            data: [],
            forms: {
                id: null,
                name: null,
                username: null,
                email: null,
                password: null,
                password_confirmation: null,
            },
        };
    },
    created() {
        this.getData();
    },
    methods: {
        getData() {
            this.$http.get('users')
                .then(response => {
                    this.data = response.data.data;
                })
                .catch(error => {
                    console.log(error);
                })
        },
        destroy(item) {
            this.modal.delete.showModal = true;
            this.modal.delete.title = 'Hapus Data';
            this.modal.delete.color = 'danger';
            this.modal.delete.data = item.name;
            this.modal.delete.uniqueId = item.id;
            this.modal.delete.message = 'Ingin Menghapus Data';
            this.modal.delete.labelButton = 'Hapus';
        },
        clearForm() {
            this.forms.id = null;
            this.forms.name = null;
            this.forms.username = null;
            this.forms.email = null;
            this.forms.password = null;
            this.forms.password_confirmation = null;
        },
        post() {
            this.modal.post_put.showModal = true;
            this.modal.post_put.title = 'Tambah Data';
            this.modal.post_put.color = 'success';
            this.modal.post_put.labelButton = 'Simpan';
            this.modal.post_put.method = 'post';
        },
        put() {
            this.modal.post_put.showModal = true;
            this.modal.post_put.title = 'Update Data';
            this.modal.post_put.color = 'success';
            this.modal.post_put.labelButton = 'Update';
            this.modal.post_put.method = 'patch';
        },
        clearModalDelete() {
            this.modal.delete.title = null;
            this.modal.delete.color = null;
            this.modal.delete.data = null;
            this.modal.delete.uniqueId = null;
            this.modal.delete.message = null;
            this.modal.delete.labelButton = null;
        },
        clearModalPostPut() {
            this.modal.post_put.title = null;
            this.modal.post_put.color = null;
            this.modal.post_put.data = null;
            this.modal.post_put.uniqueId = null;
            this.modal.post_put.message = null;
            this.modal.post_put.labelButton = null;
        },
        closeModalDelete() {
            this.modal.delete.showModal = false;
            this.clearModalDelete();
        },
        closeModalPostPut() {
            this.modal.post_put.showModal = false;
            this.clearModalPostPut();
            this.clearForm();
        },
        submitDelete() {
            this.$http.delete(`users/${this.modal.delete.uniqueId}`)
                .then(() => {
                    this.getData();
                    this.closeModalDelete();
                    this.alert.show = true;
                    this.alert.message = 'Data Berhasil di Hapus';
                    this.alert.style = 'success';
                    this.alert.counter = 3;
                })
                .catch(() => {
                    this.closeModalDelete();
                    this.alert.show = true;
                    this.alert.style = 'danger';
                    this.alert.message = 'Data Gagal di Hapus';
                    this.alert.counter = 3;
                })
        },
        submitPostPut() {
            const url = '/users';
            const formData = new FormData();
            let urlAction = null;
            let message = null;
            if (this.modal.post_put.method === 'patch') {
                urlAction = `${url}/${this.forms.id}`;
                message = 'Perbaharui';
                formData.append('_method', 'patch');
            } else {
                urlAction = url;
                message = 'Tambah';
                formData.append('_method', 'POST');
            }
            const forMapData = Object.entries(this.forms);
            forMapData.forEach((value, key) => {
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
                    this.getData();
                    this.closeModalPostPut();
                    this.alert.show = true;
                    this.alert.message = `Data Berhasil di ${message}`;
                    this.alert.style = 'success';
                    this.alert.counter = 3;
                })
                .catch(() => {
                    this.alert.show = true;
                    this.alert.style = 'danger';
                    this.alert.message = `Data Gagal di ${message}`;
                    this.alert.counter = 3;
                })
        },
        editUser(item) {
            this.forms.id = item.id;
            this.forms.name = item.name;
            this.forms.username = item.username;
            this.forms.email = item.email;
            this.put();
        },
    }
};
</script>

<style>

</style>

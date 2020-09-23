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
            :title="modal.title"
            :color="modal.color"
            :show.sync="modal.showModal"
        >
            <p>
                {{ modal.message }}  <strong>{{ modal.data }}</strong>?
            </p>
            <template v-slot:footer>
                <CButton
                    color="secondary"
                    size="sm"
                    class="m-2"
                    @click="closeModal"
                >
                    Cancel
                </CButton>
                <CButton
                    color="primary"
                    size="sm"
                    class="m-2"
                    @click="submitModal"
                >
                    {{ modal.labelButton }}
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
                showModal: false,
                title: null,
                color: null,
                message: null,
                labelButton: null,
                uniqueId: null,
            },
            data: [],
            forms: {
                username: null,
                password: null,
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
            this.modal.showModal = true;
            this.modal.title = 'Hapus Data';
            this.modal.color = 'danger';
            this.modal.data = item.name;
            this.modal.uniqueId = item.id;
            this.modal.message = 'Ingin Menghapus Data';
            this.modal.labelButton = 'Hapus';
        },
        clearModal() {
            this.modal.title = null;
            this.modal.color = null;
            this.modal.data = null;
            this.modal.uniqueId = null;
            this.modal.message = null;
            this.modal.labelButton = null;
        },
        closeModal() {
            this.modal.showModal = false;
            this.clearModal();
        },
        submitModal() {
            this.$http.delete(`users/${this.modal.uniqueId}`)
                .then(() => {
                    this.getData();
                    this.closeModal();
                    this.alert.show = true;
                    this.alert.message = 'Data Berhasil di Hapus';
                    this.alert.style = 'success';
                    this.alert.counter = 3;
                })
                .catch(() => {
                    this.closeModal();
                    this.alert.show = true;
                    this.alert.style = 'danger';
                    this.alert.message = 'Data Gagal di Hapus';
                    this.alert.counter = 3;
                })
        }
    }
};
</script>

<style>

</style>

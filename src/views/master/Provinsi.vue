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
        <div class="d-flex mb-3">
            <CButton
                color="secondary"
                variant="outline"
                size="sm"
                class="mr-2"
                :class="{ 'mr-auto': search.nama === null }"
                v-c-tooltip="{
                    content: 'Filter',
                    placement: 'bottom',
                }"
                @click="filter"
            >
                Filter
                <CIcon name="cil-filter" />
            </CButton>
            <CButton
                v-show="search.nama !== null"
                color="info"
                variant="outline"
                size="sm"
                class="mr-auto"
                v-c-tooltip="{
                    content: 'Bershikan',
                    placement: 'bottom',
                }"
                @click="clearFilter"
            >
                Clear All
                <CIcon name="cil-clear-all" />
            </CButton>
            <CButton
                color="primary"
                variant="outline"
                size="sm"
                class="mr-2"
                v-c-tooltip="{
                    content: 'Cari',
                    placement: 'bottom',
                }"
                @click="filterData"
            >
                Search
                <CIcon name="cil-search" />
            </CButton>
            <CButton
                color="danger"
                variant="outline"
                size="sm"
                v-c-tooltip="{
                    content: 'Reset',
                    placement: 'bottom',
                }"
                @click="resetFilter"
            >
                Reset
                <CIcon name="cil-reload" />
            </CButton>
        </div>
        <div v-if="this.listFilter">
            <CRow class="my-3">
                <CCol sm="12">
                    <label for="name">Nama Provinsi</label>
                    <input
                        v-model="search.nama"
                        type="text"
                        nama="nama"
                        placeholder="Masukan Nama Provinsi"
                        class="form-control"
                    />
                </CCol>
            </CRow>
        </div>
        <CRow>
            <CCol lg="12">
                <CCard>
                    <CCardHeader>
                        <CIcon name="cil-terrain" /> Provinsi
                        <div class="card-header-actions">
                            <CButton
                                color="success"
                                shape="pill"
                                class="m-1"
                                size="sm"
                                variant="outline"
                                v-c-tooltip="{
                                    content: 'Tambah Provinsi',
                                    placement: 'bottom',
                                }"
                                @click="post"
                            >
                                <CIcon name="cil-plus" />
                            </CButton>
                        </div>
                    </CCardHeader>
                    <CCardBody>
                        <div>
                            <div
                                v-if="spinner"
                                class="d-flex justify-content-center"
                            >
                                <div
                                    class="spinner-border text-primary"
                                    role="status"
                                >
                                    <span class="sr-only">Loading...</span>
                                </div>
                            </div>
                            <div class="table-responsive">
                                <table
                                    v-if="!spinner"
                                    class="table table-hover table-striped"
                                >
                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>Nama Provinsi</th>
                                            <th colspan="3">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <template v-if="data.length > 0">
                                            <tr
                                                v-for="(item, index) in data"
                                                :key="index"
                                            >
                                                <th scope="row">
                                                    {{ index + 1 }}
                                                </th>
                                                <td>{{ item.nama }}</td>
                                                <td>
                                                    <CButton
                                                        color="danger"
                                                        size="sm"
                                                        class="mr-2"
                                                        v-c-tooltip="{
                                                            content:
                                                                'Hapus Provinsi',
                                                            placement: 'bottom',
                                                        }"
                                                        @click="destroy(item)"
                                                    >
                                                        <CIcon
                                                            name="cil-trash"
                                                        />
                                                    </CButton>
                                                    <CButton
                                                        color="success"
                                                        size="sm"
                                                        class="mr-2"
                                                        v-c-tooltip="{
                                                            content:
                                                                'Edit Provinsi',
                                                            placement: 'bottom',
                                                        }"
                                                        @click="edit(item)"
                                                    >
                                                        <CIcon
                                                            name="cil-pencil"
                                                        />
                                                    </CButton>
                                                    <CButton
                                                        color="secondary"
                                                        size="sm"
                                                        v-c-tooltip="{
                                                            content:
                                                                'List Kabupaten / Kota',
                                                            placement: 'bottom',
                                                        }"
                                                        @click="
                                                            listKabupatenKota(
                                                                item
                                                            )
                                                        "
                                                    >
                                                        <CIcon
                                                            name="cil-list"
                                                        />
                                                    </CButton>
                                                </td>
                                            </tr>
                                        </template>
                                        <template v-else>
                                            <tr>
                                                <td
                                                    colspan="3"
                                                    class="text-center"
                                                >
                                                    Data Kosong
                                                </td>
                                            </tr>
                                        </template>
                                    </tbody>
                                </table>
                            </div>
                        </div>
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
                        {{ modal.delete.message }}
                        <strong>{{ modal.delete.data }}</strong
                        >?
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
                            <label for="name">Nama Provinsi</label>
                            <input
                                v-model="forms.nama"
                                type="text"
                                nama="nama"
                                placeholder="Masukan Nama Provinsi"
                                class="form-control"
                                @blur="errorValidations.nama = []"
                            />
                            <message :messages="errorValidations.nama" />
                        </CCol>
                    </CRow>
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
    name: 'Provinsi',
    data() {
        return {
            spinner: true,
            listFilter: false,
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
                nama: null,
            },
            search: {
                nama: null,
            },
            errorValidations: {
                nama: [],
            },
        };
    },
    created() {
        this.getData();
    },
    methods: {
        listKabupatenKota(item) {
            this.$router.push({
                path: '/admin/master/area/kota',
                query: { id_provinsi: item.id },
            });
        },
        resetFilter() {
            this.spinner = true;
            this.search.nama = null;

            this.$http
                .get('/provinsi/filter', {
                    params: {
                        page: 1,
                    },
                })
                .then((response) => {
                    this.spinner = false;
                    this.data = response.data.data;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        filter() {
            this.listFilter = !this.listFilter;
            this.search.nama = null;
        },
        clearFilter() {
            this.search.nama = null;
        },
        filterData() {
            this.spinner = true;

            this.$http
                .get('/provinsi/filter', {
                    params: {
                        page: 1,
                        filter: 'nama',
                        q: this.search.nama,
                    },
                })
                .then((response) => {
                    this.spinner = false;
                    this.data = response.data.data;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        getData() {
            this.spinner = true;

            this.$http
                .get('/provinsi/filter')
                .then((response) => {
                    this.spinner = false;
                    this.data = response.data.data;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        destroy(item) {
            this.modal.delete.showModal = true;
            this.modal.delete.title = 'Hapus Data';
            this.modal.delete.color = 'danger';
            this.modal.delete.data = item.nama;
            this.modal.delete.uniqueId = item.id;
            this.modal.delete.message = 'Ingin Menghapus Data';
            this.modal.delete.labelButton = 'Hapus';
        },
        clearForm() {
            this.forms.id = null;
            this.forms.nama = null;
        },
        post() {
            this.clearForm();
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
            this.$http
                .delete(`provinsi/${this.modal.delete.uniqueId}`)
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
                });
        },
        submitPostPut() {
            const url = '/provinsi';
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
            forMapData.forEach((value) => {
                if (Array.isArray(value[1])) {
                    for (let index = 0; index < value[1].length; index++) {
                        formData.append(
                            `${value[0]}[${index}]`,
                            value[1][index]
                        );
                    }
                } else {
                    formData.append(
                        value[0],
                        value[1] === null ? [] : value[1]
                    );
                }
            });
            this.errorValidations.nama = [];

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
                .catch((error) => {
                    if (error.response.status === 422) {
                        this.errorValidations.nama =
                            typeof error.response.data.errors.nama ===
                            'undefined'
                                ? []
                                : error.response.data.errors.nama;
                    }
                    this.alert.show = true;
                    this.alert.style = 'danger';
                    this.alert.message = `Data Gagal di ${message}`;
                    this.alert.counter = 3;
                });
        },
        edit(item) {
            this.forms.id = item.id;
            this.forms.nama = item.nama;

            this.put();
        },
    },
};
</script>

<style>
</style>

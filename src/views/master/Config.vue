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
                :class="{ 'mr-auto': search.category == '' }"
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
                v-show="search.category != ''"
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
            <template v-if="this.listFilter">
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
            </template>
        </div>
        <template v-if="this.listFilter">
            <CRow class="my-3">
                <CCol sm="12">
                    <label for="name">Kategori</label>
                    <select v-model="search.category" class="form-control">
                        <option value="">Pilih Kategori</option>
                        <option
                            :value="value.id"
                            v-for="(value, index) in dataSelect.category"
                            :key="`category-${index}`"
                        >
                            {{ value.name }}
                        </option>
                    </select>
                </CCol>
            </CRow>
        </template>
        <CRow>
            <CCol lg="12">
                <CCard>
                    <CCardHeader>
                        <CIcon name="cil-cog" /> Setting Parameter
                        <div class="card-header-actions">
                            <CButton
                                color="success"
                                shape="pill"
                                class="m-1"
                                size="sm"
                                variant="outline"
                                v-c-tooltip="{
                                    content: 'Tambah Setting Parameter',
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
                                            <th>Nama Kategori</th>
                                            <th>Value</th>
                                            <th colspan="2">Aksi</th>
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
                                                <td>{{ item.category }}</td>
                                                <td>{{ item.param_value }}</td>
                                                <td>
                                                    <CButton
                                                        color="danger"
                                                        size="sm"
                                                        class="mr-2"
                                                        v-c-tooltip="{
                                                            content:
                                                                'Hapus Setting Parameter',
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
                                                                'Edit Setting Parameter',
                                                            placement: 'bottom',
                                                        }"
                                                        @click="edit(item)"
                                                    >
                                                        <CIcon
                                                            name="cil-pencil"
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
                            <label for="name">Kategori</label>
                            <select
                                v-model="forms.category"
                                class="form-control"
                            >
                                <option value="">Pilih Kategori</option>
                                <option
                                    :value="value.id"
                                    v-for="(value,
                                    index) in dataSelect.category"
                                    :key="`category-${index}`"
                                >
                                    {{ value.name }}
                                </option>
                            </select>
                        </CCol>
                        <CCol sm="12">
                            <label for="name">Value</label>
                            <input
                                v-model="forms.param_value"
                                type="text"
                                class="form-control"
                            />
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
            dataSelect: {
                category: [],
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
                param_value: null,
                category: '',
            },
            search: {
                category: '',
            },
            errorValidations: {
                param_value: [],
                category: [],
            },
        };
    },
    created() {
        this.getData();
        this.getGroupByCategory();
    },
    methods: {
        getGroupByCategory() {
            this.$http
                .get('/parconfig/groupby/category')
                .then((response) => {
                    this.dataSelect.category = response.data.data;
                    this.search.category = '';
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        resetFilter() {
            this.spinner = true;
            this.search.category = '';

            this.$http
                .get('/parconfig/filter', {
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
            this.search.category = '';
        },
        clearFilter() {
            this.search.category = '';
        },
        filterData() {
            this.spinner = true;

            this.$http
                .get('/parconfig/filter', {
                    params: {
                        page: 1,
                        filter: 'category',
                        q: this.search.category,
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
                .get('/parconfig/filter')
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
            this.modal.delete.data = item.param_value;
            this.modal.delete.uniqueId = item.id;
            this.modal.delete.message = 'Ingin Menghapus Data';
            this.modal.delete.labelButton = 'Hapus';
        },
        clearForm() {
            this.forms.id = null;
            this.forms.param_value = null;
            this.forms.category = '';
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
                .delete(`parconfig/${this.modal.delete.uniqueId}`)
                .then(() => {
                    this.filterData();
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
            const url = '/parconfig';
            const formData = new FormData();
            let urlAction = null;
            if (this.modal.post_put.method === 'patch') {
                urlAction = `${url}/${this.forms.id}`;
                formData.append('_method', 'patch');
            } else {
                urlAction = url;
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
            this.errorValidations.param_value = [];
            this.errorValidations.category = [];

            this.$http({
                method: 'post',
                url: urlAction,
                data: formData,
            })
                .then((response) => {
                    this.filterData();
                    this.closeModalPostPut();
                    this.alert.show = true;
                    this.alert.message = response.data.messages;
                    this.alert.style = 'success';
                    this.alert.counter = 3;
                })
                .catch((error) => {
                    if (error.response.status === 422) {
                        this.errorValidations.param_value =
                            typeof error.response.data.errors.param_value ===
                            'undefined'
                                ? []
                                : error.response.data.errors.param_value;
                        this.errorValidations.category =
                            typeof error.response.data.errors.category ===
                            'undefined'
                                ? []
                                : error.response.data.errors.category;
                    }
                    this.alert.show = true;
                    this.alert.style = 'danger';
                    this.alert.message = error.response.data.messages;
                    this.alert.counter = 3;
                });
        },
        edit(item) {
            this.forms.id = item.id;
            this.forms.param_value = item.param_value;
            this.forms.category = item.category;

            this.put();
        },
    },
};
</script>

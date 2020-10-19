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
                :class="{ 'mr-auto': search.name === null }"
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
                v-show="search.name !== null"
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
                    <label for="name">Nama Satuan Kerja</label>
                    <input
                        v-model="search.name"
                        type="text"
                        name="name"
                        placeholder="Masukan Nama Satuan Kerja"
                        class="form-control"
                    />
                </CCol>
            </CRow>
        </template>
        <CRow>
            <CCol lg="12">
                <CCard>
                    <CCardHeader>
                        <CIcon name="cil-industry" /> Satuan Kerja
                        <div class="card-header-actions">
                            <CButton
                                color="success"
                                shape="pill"
                                class="m-1"
                                size="sm"
                                variant="outline"
                                v-c-tooltip="{
                                    content: 'Tambah Satuan Kerja',
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
                                            <th>Nama Instansi</th>
                                            <th>Nama Satuan Kerja</th>
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
                                                <td>{{ item.name }}</td>
                                                <td>{{ item.name }}</td>
                                                <td>
                                                    <CButton
                                                        color="danger"
                                                        size="sm"
                                                        class="mr-2"
                                                        v-c-tooltip="{
                                                            content:
                                                                'Hapus Satuan Kerja',
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
                                                                'Edit Satuan Kerja',
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
                                                    colspan="4"
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
                            <label for="instansi_id">Instansi</label>
                            <select
                                v-model="forms.instansi_id"
                                class="form-control"
                                @change="getPerAgency"
                                :disabled="disabled.instansi_id"
                            >
                                <option value="" selected="selected">
                                    Pilih Instansi
                                </option>
                                <option
                                    :value="value.id"
                                    v-for="(value,
                                    index) in dataSelect.instansi"
                                    :key="`instansi-${index}`"
                                >
                                    {{ value.name }}
                                </option>
                            </select>
                            <message :messages="errorValidations.instansi_id" />
                        </CCol>
                        <CCol sm="12">
                            <label for="parent_id">Satuan Kerja Utama</label>
                            <select
                                v-model="forms.parent_id"
                                class="form-control"
                                :disabled="disabled.parent_id"
                            >
                                <option value="" selected="selected">
                                    Pilih Satuan Kerja
                                </option>
                                <option
                                    :value="value.id"
                                    v-for="(value,
                                    index) in dataSelect.satuan_kerja"
                                    :key="`instansi-${index}`"
                                >
                                    {{ value.name }}
                                </option>
                            </select>
                            <message :messages="errorValidations.parent_id" />
                        </CCol>
                        <CCol sm="12">
                            <label for="name">Nama Satuan Kerja</label>
                            <input
                                v-model="forms.name"
                                type="text"
                                placeholder="Masukan Nama Satuan Kerja"
                                class="form-control"
                                :disabled="disabled.name"
                                @blur="errorValidations.name = []"
                            />
                            <message :messages="errorValidations.name" />
                        </CCol>
                        <CCol sm="12">
                            <label for="alamat">Alamat</label>
                            <textarea
                                v-model="forms.alamat"
                                cols="30"
                                rows="10"
                                class="form-control"
                            ></textarea>
                            <message :messages="errorValidations.alamat" />
                        </CCol>
                        <CCol sm="12">
                            <label for="propinsi">Provinsi</label>
                            <select
                                v-model="forms.propinsi"
                                class="form-control"
                                @change="getDistrict"
                            >
                                <option value="" selected="selected">
                                    Pilih Provinsi
                                </option>
                                <option
                                    :value="value.id"
                                    v-for="(value,
                                    index) in dataSelect.provinsi"
                                    :key="`provivnsi-${index}`"
                                >
                                    {{ value.nama }}
                                </option>
                            </select>
                            <message :messages="errorValidations.propinsi" />
                        </CCol>
                        <CCol sm="12">
                            <label for="kota">Kota</label>
                            <select v-model="forms.kota" class="form-control">
                                <option value="" selected="selected">
                                    Pilih Kota
                                </option>
                                <option
                                    :value="value.id"
                                    v-for="(value, index) in dataSelect.kota"
                                    :key="`kota-${index}`"
                                >
                                    {{ value.nama }}
                                </option>
                            </select>
                            <message :messages="errorValidations.kota" />
                        </CCol>
                        <CCol sm="12">
                            <label for="kode_pos">Kode Pos</label>
                            <input
                                v-model="forms.kode_pos"
                                type="text"
                                maxlength="5"
                                placeholder="Masukan Kode Pos"
                                class="form-control"
                                @input="validateKodePos"
                                @blur="errorValidations.kode_pos = []"
                            />
                            <message :messages="errorValidations.kode_pos" />
                        </CCol>
                        <CCol sm="12">
                            <label for="no_telp">No Telp</label>
                            <input
                                v-model="forms.no_telp"
                                type="text"
                                placeholder="Masukan Nomor Telepon"
                                maxlength="10"
                                class="form-control"
                                @input="validateNoTelp"
                                @blur="errorValidations.no_telp = []"
                            />
                            <message :messages="errorValidations.no_telp" />
                        </CCol>
                        <CCol sm="12">
                            <label for="website">Website</label>
                            <input
                                v-model="forms.website"
                                type="text"
                                placeholder="Masukan Domain Website"
                                class="form-control"
                                @blur="errorValidations.website = []"
                            />
                            <message :messages="errorValidations.website" />
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
    name: 'WorkUnit',
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
                parent_id: '',
                instansi_id: '',
                name: null,
                alamat: null,
                propinsi: '',
                kota: '',
                kode_pos: null,
                no_telp: null,
                website: null,
            },
            dataSelect: {
                provinsi: [],
                kota: [],
                instansi: [],
                satuan_kerja: [],
            },
            disabled: {
                name: false,
                instansi_id: false,
                parent_id: false,
            },
            search: {
                name: null,
            },
            errorValidations: {
                name: [],
                instansi_id: [],
                alamat: [],
                propinsi: [],
                kota: [],
                kode_pos: [],
                no_telp: [],
                website: [],
            },
        };
    },
    created() {
        this.getData();
        this.getProvince();
        this.getAgency();
    },
    methods: {
        validateNoTelp() {
            const regex = new RegExp(/^[0-9]*$/);
            const value = this.forms.no_telp
                .toString()
                .replace(/[^\d]/g, '')
                .toLowerCase();
            if (regex.test(this.forms.no_telp)) {
                this.errorValidations.no_telp = [];
            } else {
                this.errorValidations.no_telp = ['Hanya Boleh Angka'];
                this.forms.no_telp = value;
            }
        },
        getAgency() {
            this.$http
                .get('/parinstansi')
                .then((response) => {
                    this.dataSelect.instansi = response.data.data;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        getProvince() {
            this.$http
                .get('/provinsi')
                .then((response) => {
                    this.dataSelect.provinsi = response.data.data;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        getDistrict() {
            this.$http
                .get(`/provinsi/${this.forms.propinsi}/kota`)
                .then((response) => {
                    this.dataSelect.kota = response.data.data;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        getPerAgency() {
            this.forms.parent_id = '';
            this.dataSelect.satuan_kerja = [];
            this.$http
                .get(`/parsatuankerja/${this.forms.instansi_id}/parinstansi`)
                .then((response) => {
                    this.dataSelect.satuan_kerja = response.data.data;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        validateKodePos() {
            const regex = new RegExp(/^[0-9]*$/);
            const value = this.forms.kode_pos
                .toString()
                .replace(/[^\d]/g, '')
                .toLowerCase();
            if (regex.test(this.forms.kode_pos)) {
                this.errorValidations.kode_pos = [];
            } else {
                this.errorValidations.kode_pos = ['Hanya Boleh Angka'];
                this.forms.kode_pos = value;
            }
        },
        resetFilter() {
            console.log(1);
            this.spinner = true;
            this.search.name = null;

            this.$http
                .get('/parsatuankerja/filter', {
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
            this.search.name = null;
        },
        clearFilter() {
            this.search.name = null;
        },
        filterData() {
            this.spinner = true;

            this.$http
                .get('/parsatuankerja/filter', {
                    params: {
                        page: 1,
                        filter: 'name',
                        q: this.search.name,
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
                .get('/parsatuankerja/filter')
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
            this.modal.delete.data = item.name;
            this.modal.delete.uniqueId = item.id;
            this.modal.delete.message = 'Ingin Menghapus Data';
            this.modal.delete.labelButton = 'Hapus';
        },
        clearForm() {
            this.forms.id = null;
            this.forms.parent_id = '';
            this.forms.instansi_id = '';
            this.forms.name = null;
            this.forms.alamat = null;
            this.forms.propinsi = '';
            this.forms.kota = '';
            this.forms.kode_pos = null;
            this.forms.no_telp = null;
            this.forms.website = null;
        },
        post() {
            this.clearForm();
            this.disabled.name = false;
            this.disabled.instansi_id = false;
            this.disabled.parent_id = false;
            this.modal.post_put.showModal = true;
            this.modal.post_put.title = 'Tambah Data';
            this.modal.post_put.color = 'success';
            this.modal.post_put.labelButton = 'Simpan';
            this.modal.post_put.method = 'post';
        },
        put() {
            this.disabled.name = true;
            this.disabled.instansi_id = true;
            this.disabled.parent_id = true;
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
                .delete(`parsatuankerja/${this.modal.delete.uniqueId}`)
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
            const url = '/parsatuankerja';
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
            this.errorValidations.name = [];
            this.errorValidations.instansi_id = [];
            this.errorValidations.alamat = [];
            this.errorValidations.propinsi = [];
            this.errorValidations.kota = [];
            this.errorValidations.kode_pos = [];
            this.errorValidations.no_telp = [];
            this.errorValidations.website = [];

            this.$http({
                method: 'post',
                url: urlAction,
                data: formData,
            })
                .then((response) => {
                    this.getData();
                    this.closeModalPostPut();
                    this.alert.show = true;
                    this.alert.message = response.data.messages;
                    this.alert.style = 'success';
                    this.alert.counter = 3;
                })
                .catch((error) => {
                    if (error.response.status === 422) {
                        this.errorValidations.name =
                            typeof error.response.data.errors.name ===
                            'undefined'
                                ? []
                                : error.response.data.errors.name;
                        this.errorValidations.instansi_id =
                            typeof error.response.data.errors.instansi_id ===
                            'undefined'
                                ? []
                                : error.response.data.errors.instansi_id;
                        this.errorValidations;
                        this.errorValidations.alamat =
                            typeof error.response.data.errors.alamat ===
                            'undefined'
                                ? []
                                : error.response.data.errors.alamat;
                        this.errorValidations;
                        this.errorValidations.propinsi =
                            typeof error.response.data.errors.propinsi ===
                            'undefined'
                                ? []
                                : error.response.data.errors.propinsi;
                        this.errorValidations;
                        this.errorValidations.kota =
                            typeof error.response.data.errors.kota ===
                            'undefined'
                                ? []
                                : error.response.data.errors.kota;
                        this.errorValidations;
                        this.errorValidations.kode_pos =
                            typeof error.response.data.errors.kode_pos ===
                            'undefined'
                                ? []
                                : error.response.data.errors.kode_pos;
                        this.errorValidations;
                        this.errorValidations.no_telp =
                            typeof error.response.data.errors.no_telp ===
                            'undefined'
                                ? []
                                : error.response.data.errors.no_telp;
                        this.errorValidations;
                        this.errorValidations.website =
                            typeof error.response.data.errors.website ===
                            'undefined'
                                ? []
                                : error.response.data.errors.website;
                        this.errorValidations;
                    }
                    this.alert.show = true;
                    this.alert.style = 'danger';
                    this.alert.message = error.response.data.messages;
                    this.alert.counter = 3;
                });
        },
        edit(item) {
            this.forms.id = item.id;
            this.forms.instansi_id = item.instansi_id;
            this.forms.name = item.name;
            this.forms.alamat = item.alamat;
            this.forms.propinsi = item.propinsi;
            this.forms.kode_pos = item.kode_pos;
            this.forms.no_telp = item.no_telp;
            this.forms.website = item.website;

            this.put();
            this.$nextTick(() => {
                this.getDistrict();
                this.forms.kota = item.kota;
            });
            this.$nextTick(() => {
                this.getPerAgency();
                this.forms.parent_id = item.parent_id;
            });
        },
    },
};
</script>

<style>
</style>

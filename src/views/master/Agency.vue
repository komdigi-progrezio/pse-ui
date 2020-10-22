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
        <a @click.prevent="modalNotApproved" href="">
            <div
                class="alert alert-warning"
                role="alert"
                v-if="not_approved.data.length > 0"
            >
                Ada <strong>{{ not_approved.total_data }}</strong> Permintaan
                Penambahan Instansi.
            </div>
        </a>
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
                    <label for="name">Nama Instansi</label>
                    <input
                        v-model="search.name"
                        type="text"
                        placeholder="Masukan Nama Instansi"
                        class="form-control"
                    />
                </CCol>
            </CRow>
        </template>
        <CRow>
            <CCol lg="12">
                <CCard>
                    <CCardHeader>
                        <CIcon name="cil-building" /> Instansi
                        <div class="card-header-actions">
                            <CButton
                                color="success"
                                shape="pill"
                                class="m-1"
                                size="sm"
                                variant="outline"
                                v-c-tooltip="{
                                    content: 'Tambah Instansi',
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
                                            <th>Kategori</th>
                                            <th>Kelompok</th>
                                            <th>Nama Instansi</th>
                                            <th>Alamat</th>
                                            <th>Provinsi</th>
                                            <th>Kabupaten / Kota</th>
                                            <th>Kode Pos</th>
                                            <th>Website</th>
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
                                                <td>{{ item.kategori }}</td>
                                                <td>{{ item.kelompok }}</td>
                                                <td>{{ item.name }}</td>
                                                <td>{{ item.alamat }}</td>
                                                <td>
                                                    {{ item.nama_propinsi }}
                                                </td>
                                                <td>{{ item.nama_kota }}</td>
                                                <td>{{ item.kode_pos }}</td>
                                                <td>{{ item.website }}</td>
                                                <td>
                                                    <CButton
                                                        color="danger"
                                                        size="sm"
                                                        class="mr-2"
                                                        v-c-tooltip="{
                                                            content:
                                                                'Hapus Instansi',
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
                                                                'Edit Instansi',
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
                                                    colspan="10"
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
            :title="modal.not_approved.title"
            :color="modal.not_approved.color"
            :size="'xl'"
            :show.sync="modal.not_approved.showModal"
        >
            <template v-slot:body-wrapper>
                <div class="modal-body">
                    <div class="table-responsive">
                        <table
                            v-if="!spinner"
                            class="table table-hover table-striped"
                        >
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Kategori</th>
                                    <th>Kelompok</th>
                                    <th>Nama Instansi</th>
                                    <th>Alamat</th>
                                    <th>Provinsi</th>
                                    <th>Kabupaten / Kota</th>
                                    <th>Kode Pos</th>
                                    <th>Website</th>
                                    <th colspan="2">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-if="not_approved.data.length > 0">
                                    <tr
                                        v-for="(item,
                                        index) in not_approved.data"
                                        :key="index"
                                    >
                                        <th scope="row">
                                            {{ index + 1 }}
                                        </th>
                                        <td>{{ item.kategori }}</td>
                                        <td>{{ item.kelompok }}</td>
                                        <td>{{ item.name }}</td>
                                        <td>{{ item.alamat }}</td>
                                        <td>
                                            {{ item.nama_propinsi }}
                                        </td>
                                        <td>{{ item.nama_kota }}</td>
                                        <td>{{ item.kode_pos }}</td>
                                        <td>{{ item.website }}</td>
                                        <td>
                                            <CButton
                                                color="danger"
                                                size="sm"
                                                class="mr-2"
                                                v-c-tooltip="{
                                                    content: 'Hapus Instansi',
                                                    placement: 'bottom',
                                                }"
                                                @click="destroy(item)"
                                            >
                                                <CIcon name="cil-trash" />
                                            </CButton>
                                            <CButton
                                                color="secondary"
                                                size="sm"
                                                v-c-tooltip="{
                                                    content: 'Setujui Instansi',
                                                    placement: 'bottom',
                                                }"
                                                @click="active(item)"
                                            >
                                                <CIcon name="cil-check" />
                                            </CButton>
                                        </td>
                                    </tr>
                                </template>
                                <template v-else>
                                    <tr>
                                        <td colspan="10" class="text-center">
                                            Data Kosong
                                        </td>
                                    </tr>
                                </template>
                            </tbody>
                        </table>
                    </div>
                </div>
            </template>
            <template v-slot:footer> </template>
        </CModal>
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
                            <label for="kelompok">Kelompok</label>
                            <select
                                v-model="forms.kelompok"
                                class="form-control"
                            >
                                <option value="" selected="selected">
                                    Pilih Kategori
                                </option>
                                <option
                                    :value="value.id"
                                    v-for="(value,
                                    index) in dataSelect.kelompok"
                                    :key="index"
                                >
                                    {{ value.param_value }}
                                </option>
                            </select>
                            <message :messages="errorValidations.kelompok" />
                        </CCol>
                        <CCol sm="12">
                            <label for="kategori">Kategori</label>
                            <select
                                v-model="forms.kategori"
                                class="form-control"
                            >
                                <option value="" selected="selected">
                                    Pilih Kategori
                                </option>
                                <option
                                    :value="value.id"
                                    v-for="(value,
                                    index) in dataSelect.kategori"
                                    :key="index"
                                >
                                    {{ value.name }}
                                </option>
                            </select>
                            <message :messages="errorValidations.kategori" />
                        </CCol>
                        <CCol sm="12">
                            <label for="name">Nama Instansi</label>
                            <input
                                v-model="forms.name"
                                type="text"
                                placeholder="Masukan Nama Instansi"
                                class="form-control"
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
                            <label for="provinsi">Provinsi</label>
                            <select
                                v-model="forms.propinsi"
                                class="form-control"
                                @change="getDistrict"
                                @blur="errorValidations.propinsi = []"
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
                            <select
                                v-model="forms.kota"
                                class="form-control"
                                @blur="errorValidations.kota = []"
                            >
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
    name: 'Agency',
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
                not_approved: {
                    showModal: false,
                    title: null,
                    color: null,
                },
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
                alamat: null,
                propinsi: '',
                kota: '',
                kode_pos: null,
                approved: null,
                website: null,
                kategori: '',
                kelompok: '',
            },
            dataSelect: {
                provinsi: [],
                kota: [],
                kelompok: [],
                kategori: [
                    {
                        id: 'Pemerintah Pusat',
                        name: 'Pemerintah Pusat',
                    },
                    {
                        id: 'Pemerintah Daerah',
                        name: 'Pemerintah Daerah',
                    },
                ],
            },
            not_approved: {
                data: [],
                total_data: null,
            },
            search: {
                name: null,
            },
            errorValidations: {
                kelompok: [],
                kategori: [],
                name: [],
                alamat: [],
                propinsi: [],
                kota: [],
                kode_pos: [],
            },
        };
    },
    created() {
        this.getData();
        this.getProvince();
        this.getAgencyNotApproved();
        this.getAgencyGroup();
    },
    methods: {
        modalNotApproved() {
            this.modal.not_approved.showModal = true;
            this.modal.not_approved.title =
                'Daftar Permintaan Penambahan Instansi';
            this.modal.not_approved.color = 'primary';
        },
        active(item) {
            this.$http
                .patch(`/parinstansi/approved/${item.id}`)
                .then(() => {
                    this.spinner = false;
                    this.alert.show = true;
                    this.alert.message = `Data Berhasil di Perbaharui`;
                    this.alert.style = 'success';
                    this.alert.counter = 3;
                    this.getAgencyNotApproved();
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        getAgencyGroup() {
            this.$http
                .get('/parconfig/agency/group')
                .then((response) => {
                    this.dataSelect.kelompok = response.data.data;
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
        getAgencyNotApproved() {
            this.$http
                .get('/parinstansi/not/approved')
                .then((response) => {
                    this.not_approved.data = response.data.data;
                    this.not_approved.total_data = response.data.data.length;
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
                    this.forms.kota = '';
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        resetFilter() {
            this.spinner = true;
            this.search.name = null;

            this.$http
                .get('/parinstansi/filter', {
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
                .get('/parinstansi/filter', {
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
                .get('/parinstansi/filter')
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
            this.forms.name = null;
            this.forms.alamat = null;
            this.forms.propinsi = '';
            this.forms.kota = '';
            this.forms.kode_pos = null;
            this.forms.approved = null;
            this.forms.website = null;
            this.forms.kategori = '';
            this.forms.kelompok = '';
            this.dataSelect.kota = [];
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
                .delete(`/parinstansi/${this.modal.delete.uniqueId}`)
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
            const url = '/parinstansi';
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
            this.errorValidations.kelompok = [];
            this.errorValidations.kategori = [];
            this.errorValidations.name = [];
            this.errorValidations.alamat = [];
            this.errorValidations.propinsi = [];
            this.errorValidations.kota = [];
            this.errorValidations.kode_pos = [];
            this.errorValidations.website = [];

            this.$http({
                method: 'post',
                url: urlAction,
                data: formData,
            })
                .then((response) => {
                    this.getData();
                    this.getAgencyNotApproved();
                    this.closeModalPostPut();
                    this.alert.show = true;
                    this.alert.message = response.data.messages;
                    this.alert.style = 'success';
                    this.alert.counter = 3;
                })
                .catch((error) => {
                    if (error.response.status === 422) {
                        this.errorValidations.kelompok =
                            typeof error.response.data.errors.kelompok ===
                            'undefined'
                                ? []
                                : error.response.data.errors.kelompok;
                        this.errorValidations.kategori =
                            typeof error.response.data.errors.kategori ===
                            'undefined'
                                ? []
                                : error.response.data.errors.kategori;
                        this.errorValidations.name =
                            typeof error.response.data.errors.name ===
                            'undefined'
                                ? []
                                : error.response.data.errors.name;
                        this.errorValidations.alamat =
                            typeof error.response.data.errors.alamat ===
                            'undefined'
                                ? []
                                : error.response.data.errors.alamat;
                        this.errorValidations.propinsi =
                            typeof error.response.data.errors.propinsi ===
                            'undefined'
                                ? []
                                : error.response.data.errors.propinsi;
                        this.errorValidations.kota =
                            typeof error.response.data.errors.kota ===
                            'undefined'
                                ? []
                                : error.response.data.errors.kota;
                        this.errorValidations.kode_pos =
                            typeof error.response.data.errors.kode_pos ===
                            'undefined'
                                ? []
                                : error.response.data.errors.kode_pos;
                        this.errorValidations.website =
                            typeof error.response.data.errors.website ===
                            'undefined'
                                ? []
                                : error.response.data.errors.website;
                    }
                    this.alert.show = true;
                    this.alert.style = 'danger';
                    this.alert.message = error.response.data.messages;
                    this.alert.counter = 3;
                });
        },
        edit(item) {
            this.forms.id = item.id;
            this.forms.name = item.name;
            this.forms.alamat = item.alamat;
            this.forms.propinsi = item.id_propinsi;
            this.forms.kode_pos = item.kode_pos;
            this.forms.approved = item.approved;
            this.forms.website = item.website;
            this.forms.kategori = item.kategori;
            this.forms.kelompok = item.id_kelompok;

            this.put();
            this.$nextTick(() => {
                this.getDistrict();
                this.forms.kota = item.id_kota;
            });
        },
    },
};
</script>

<style>
</style>

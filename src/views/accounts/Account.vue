<template>
    <div>
        <CCard>
            <CCardHeader> Filter </CCardHeader>
            <CCardBody>
                <div class="d-flex mb-3">
                    <CButton
                        color="dark"
                        variant="outline"
                        size="sm"
                        class="mr-2"
                        :class="{ 'mr-auto': checkFilter }"
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
                        v-show="!checkFilter"
                        color="info"
                        variant="outline"
                        size="sm"
                        class="mr-auto"
                        v-c-tooltip="{
                            content: 'Bersihkan',
                            placement: 'bottom',
                        }"
                        @click="clearFilter"
                    >
                        Clear All
                        <CIcon name="cil-clear-all" />
                    </CButton>
                    <template v-if="listFilter">
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
                <template v-if="listFilter">
                    <CRow class="my-3">
                        <CCol sm="12">
                            <label for="status">Status</label>
                            <select
                                v-model="search.status"
                                class="form-control"
                            >
                                <option value="all">Pilih Status</option>
                                <option
                                    :value="value.id"
                                    v-for="(value, index) in dataSelect.status"
                                    :key="`status-${index}`"
                                >
                                    {{ value.name }}
                                </option>
                            </select>
                        </CCol>
                        <CCol sm="12" md="6" lg="6">
                            <label for="filter">Filter Berdasarkan</label>
                            <select
                                v-model="search.filter"
                                class="form-control"
                            >
                                <option value="all">Pilih Filter</option>
                                <option
                                    :value="value.id"
                                    v-for="(value, index) in dataSelect.filter"
                                    :key="`filter-${index}`"
                                >
                                    {{ value.name }}
                                </option>
                            </select>
                        </CCol>
                        <CCol sm="12" md="6" lg="6">
                            <label for="q">Kata Kunci</label>
                            <input
                                v-model="search.q"
                                type="text"
                                name="name"
                                placeholder="Masukan Kata Kunci"
                                class="form-control"
                            />
                        </CCol>
                        <CCol sm="12" md="4" lg="4">
                            <label for="tanggal">Tanggal</label>
                            <select
                                v-model="search.tanggal"
                                class="form-control"
                            >
                                <option value="all">Pilih Tanggal</option>
                                <option
                                    :value="value.id"
                                    v-for="(value, index) in dataSelect.tanggal"
                                    :key="`tanggal-${index}`"
                                >
                                    {{ value.name }}
                                </option>
                            </select>
                        </CCol>
                        <CCol sm="12" md="4" lg="4">
                            <div class="input-group">
                                <label for="created_at">Mulai</label>
                                <div class="input-group mb-3">
                                    <date-picker
                                        v-model="search.created_at"
                                        name="created_at"
                                        :config="optionsCreatedAt"
                                        class="form-control"
                                        @dp-change="changeMinDate"
                                    />
                                    <div class="input-group-append">
                                        <span
                                            class="input-group-text"
                                            id="basic-addon2"
                                            ><CIcon name="cil-calendar"
                                        /></span>
                                    </div>
                                </div>
                            </div>
                        </CCol>
                        <CCol sm="12" md="4" lg="4">
                            <div class="input-group">
                                <label for="modified_at">Sampai</label>
                                <div class="input-group mb-3">
                                    <date-picker
                                        v-model="search.modified_at"
                                        name="modified_at"
                                        :config="optionsModifiedAt"
                                        class="form-control"
                                    />
                                    <div class="input-group-append">
                                        <span
                                            class="input-group-text"
                                            id="basic-addon2"
                                            ><CIcon name="cil-calendar"
                                        /></span>
                                    </div>
                                </div>
                            </div>
                        </CCol>
                    </CRow>
                </template>
            </CCardBody>
        </CCard>
        <CRow>
            <CCol lg="12">
                <CCard>
                    <CCardHeader> <CIcon name="cil-user" /> Akun </CCardHeader>
                    <CCardBody>
                        <div class="mt-4">
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
                                            <th>Nama</th>
                                            <th>NIP</th>
                                            <th>Jabatan</th>
                                            <th>Instansi</th>
                                            <th>Tanggal Daftar</th>
                                            <th>Tanggal Update</th>
                                            <th>Status</th>
                                            <th>Aksi</th>
                                            <th colspan="2">Aksi</th>
                                        </tr>
                                    </thead>
                                    <!-- <tbody>
                                        <template v-if="data.length > 0">
                                            <tr
                                                v-for="(item, index) in data"
                                                :key="index"
                                            >
                                                <th scope="row">
                                                    {{ index + 1 }}
                                                </th>
                                                <td>{{ item.name }}</td>
                                                <td>
                                                    <span
                                                        v-for="(value,
                                                        index) in item.permissions"
                                                        :key="index"
                                                    >
                                                        <template
                                                            v-if="
                                                                item.permissions
                                                                    .length -
                                                                    1 ===
                                                                index
                                                            "
                                                        >
                                                            {{ value }}
                                                        </template>
                                                        <template v-else>
                                                            {{ value }} |
                                                        </template>
                                                    </span>
                                                </td>
                                                <td>{{ item.created_by }}</td>
                                                <td>{{ item.updated_by }}</td>
                                                <td>
                                                    <CButton
                                                        color="danger"
                                                        size="sm"
                                                        class="mr-2"
                                                        v-c-tooltip="{
                                                            content:
                                                                'Hapus Akun',
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
                                                        v-c-tooltip="{
                                                            content:
                                                                'Edit Akun',
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
                                    </tbody> -->
                                </table>
                            </div>
                        </div>
                    </CCardBody>
                </CCard>
                <CPagination
                    :activePage.sync="pagination.current_page"
                    :pages="pagination.last_page"
                    size="sm"
                    align="center"
                    @update:activePage="getData"
                    v-if="data.length > 0"
                />
            </CCol>
        </CRow>
    </div>
</template>


<script>
export default {
    name: 'Account',
    data() {
        return {
            spinner: false,
            listFilter: false,
            data: [],
            search: {
                status: 'all',
                filter: 'all',
                q: null,
                tanggal: 'all',
                created_at: null,
                modified_at: null,
            },
            pagination: {
                current_page: 1,
                last_page: 10,
            },
            dataSelect: {
                status: [
                    {
                        id: 1,
                        name: 'Aktif',
                    },
                    {
                        id: 0,
                        name: 'Tidak Aktif',
                    },
                ],
                filter: [
                    {
                        id: 'username',
                        name: 'Username',
                    },
                    {
                        id: 'nama',
                        name: 'Nama Lengkap',
                    },
                    {
                        id: 'nip',
                        name: 'NIP',
                    },
                    {
                        id: 'satuan_kerja',
                        name: 'Satuan Kerja',
                    },
                    {
                        id: 'jabatan',
                        name: 'Jabatan',
                    },
                    {
                        id: 'instansi',
                        name: 'Instansi',
                    },
                ],
                tanggal: [
                    {
                        id: 'created_at',
                        name: 'Tanggal Daftar',
                    },
                    {
                        id: 'modified_at',
                        name: 'Tanggal Update',
                    },
                ],
            },
            optionsCreatedAt: {
                format: 'YYYY-MM-DD',
                useCurrent: false,
                showClear: true,
                showClose: true,
                toolbarPlacement: 'top',
                widgetPositioning: {
                    vertical: 'bottom',
                },
                icons: {
                    time: 'cil-clock',
                    date: 'cil-calendar',
                    up: 'cil-arrow-top',
                    down: 'cil-arrow-bottom',
                    previous: 'cil-arrow-left',
                    next: 'cil-arrow-right',
                    today: 'cil-calendar-today',
                    close: 'cil-minus-circle',
                },
            },
            optionsModifiedAt: {
                format: 'YYYY-MM-DD',
                useCurrent: false,
                showClear: true,
                showClose: true,
                toolbarPlacement: 'top',
                widgetPositioning: {
                    vertical: 'bottom',
                },
                icons: {
                    time: 'cil-clock',
                    date: 'cil-calendar',
                    up: 'cil-arrow-top',
                    down: 'cil-arrow-bottom',
                    previous: 'cil-arrow-left',
                    next: 'cil-arrow-right',
                    today: 'cil-calendar-today',
                    close: 'cil-minus-circle',
                },
                minDate: '2010-10-10',
            },
        };
    },
    computed: {
        checkFilter() {
            if (
                this.search.status !== 'all' ||
                this.search.filter !== 'all' ||
                this.search.q !== null ||
                this.search.tanggal !== 'all' ||
                this.search.created_at !== null ||
                this.search.modified_at !== null
            ) {
                return false;
            } else {
                return true;
            }
        },
    },
    methods: {
        changeMinDate() {
            this.optionsModifiedAt.minDate = this.search.created_at;
        },
        resetFilter() {
            this.spinner = true;
            this.search.status = 'all';
            this.search.filter = 'all';
            this.search.q = null;
            this.search.tanggal = 'all';
            this.search.created_at = null;
            this.search.modified_at = null;

            this.$http
                .get('/roles/filter', {
                    params: {
                        page: 1,
                    },
                })
                .then((response) => {
                    this.spinner = false;
                    this.data = response.data.data;
                    this.pagination.current_page =
                        response.data.meta.current_page;
                    this.pagination.last_page = response.data.meta.last_page;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        filter() {
            this.listFilter = !this.listFilter;
            this.search.status = 'all';
            this.search.filter = 'all';
            this.search.q = null;
            this.search.tanggal = 'all';
            this.search.created_at = null;
            this.search.modified_at = null;
        },
        clearFilter() {
            this.search.status = 'all';
            this.search.filter = 'all';
            this.search.q = null;
            this.search.tanggal = 'all';
            this.search.created_at = null;
            this.search.modified_at = null;
        },
        filterData() {
            this.spinner = true;

            this.$http
                .get('/roles/filter', {
                    params: {
                        page: 1,
                        status: this.search.status,
                        filter: this.search.filter,
                        q: this.search.q,
                        tanggal: this.search.tanggal,
                        created_at: this.search.created_at,
                        modified_at: this.search.modified_at,
                    },
                })
                .then((response) => {
                    this.spinner = false;
                    this.data = response.data.data;
                    this.pagination.current_page =
                        response.data.meta.current_page;
                    this.pagination.last_page = response.data.meta.last_page;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        getData() {
            this.spinner = true;

            this.$http
                .get('/roles/filter', {
                    params: {
                        page: this.pagination.current_page,
                        status: this.search.status,
                        filter: this.search.filter,
                        q: this.search.q,
                        tanggal: this.search.tanggal,
                        created_at: this.search.created_at,
                        modified_at: this.search.modified_at,
                    },
                })
                .then((response) => {
                    this.spinner = false;
                    this.data = response.data.data;
                    this.pagination.current_page =
                        response.data.meta.current_page;
                    this.pagination.last_page = response.data.meta.last_page;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },
};
</script>

<style>
</style>

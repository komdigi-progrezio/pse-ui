<template>
    <div>
        <CCard>
            <CCardHeader> Detail Akun </CCardHeader>
            <CCardBody>
                <div v-if="spinner" class="d-flex justify-content-center">
                    <div class="spinner-border text-primary" role="status">
                        <span class="sr-only">Loading...</span>
                    </div>
                </div>
                <template v-if="!spinner">
                    <h5>
                        {{ data.nama }}
                    </h5>
                    <h6>{{ data.jabatan }}</h6>
                    <CTabs
                        variant="tabs"
                        :active-tab="0"
                        :fill="true"
                        :justified="true"
                    >
                        <CTab title="Tentang">
                            <CRow>
                                <CCol sm="12" md="6" lg="6">
                                    <label>NIP : </label>
                                </CCol>
                                <CCol sm="12" md="6" lg="6">
                                    {{ data.nip }}
                                </CCol>
                                <CCol sm="12" md="6" lg="6">
                                    <label> No Telepon : </label>
                                </CCol>
                                <CCol sm="12" md="6" lg="6">
                                    {{ data.no_telepon }}
                                </CCol>
                                <CCol sm="12" md="6" lg="6">
                                    <label>No Handphone: </label>
                                </CCol>
                                <CCol sm="12" md="6" lg="6">
                                    {{ data.no_hp }}
                                </CCol>
                                <CCol sm="12" md="6" lg="6">
                                    <label> Satuan Kerja : </label>
                                </CCol>
                                <CCol sm="12" md="6" lg="6">
                                    {{ data.satuan_kerja }}
                                </CCol>
                                <CCol sm="12" md="6" lg="6">
                                    <label> Alamat : </label>
                                </CCol>
                                <CCol sm="12" md="6" lg="6">
                                    {{ data.alamat }}
                                </CCol>
                                <CCol sm="12" md="6" lg="6">
                                    <label> Provinsi: </label>
                                </CCol>
                                <CCol sm="12" md="6" lg="6">
                                    {{ data.propinsi }}
                                </CCol>
                                <CCol sm="12" md="6" lg="6">
                                    <label> Kota / Kabupaten: </label>
                                </CCol>
                                <CCol sm="12" md="6" lg="6">
                                    {{ data.kota }}
                                </CCol>
                                <CCol sm="12" md="6" lg="6">
                                    <label> Kode POS: </label>
                                </CCol>
                                <CCol sm="12" md="6" lg="6">
                                    {{ data.kode_pos }}
                                </CCol>
                                <CCol sm="12" md="6" lg="6">
                                    <label> Instansi: </label>
                                </CCol>
                                <CCol sm="12" md="6" lg="6">
                                    {{ data.instansi_induk_text }}
                                </CCol>
                            </CRow>
                        </CTab>
                        <CTab title="Lain - Lain">
                            <CRow>
                                <CCol sm="12" md="6" lg="6">
                                    <label> Download Dokumen: </label>
                                </CCol>
                                <CCol sm="12" md="6" lg="6">
                                    {{ data.dokumen }}
                                </CCol>
                                <CCol sm="12" md="6" lg="6">
                                    <label> Dibuat: </label>
                                </CCol>
                                <CCol sm="12" md="6" lg="6">
                                    {{ data.created_at }}
                                </CCol>
                                <CCol sm="12" md="6" lg="6">
                                    <label> Diperbaharui: </label>
                                </CCol>
                                <CCol sm="12" md="6" lg="6">
                                    {{ data.modified_at }}
                                </CCol>
                            </CRow>
                        </CTab>
                    </CTabs>
                </template>
            </CCardBody>
        </CCard>
    </div>
</template>

<script>
export default {
    name: 'DetailAccount',
    data() {
        return {
            spinner: true,
            data: {
                nama: null,
                email: null,
                status: null,
                username: null,
                nip: null,
                jabatan: null,
                satuan_kerja: null,
                alamat: null,
                kota: null,
                propinsi: null,
                kode_pos: null,
                instansi_induk: null,
                dokumen: null,
                no_telepon: null,
                no_hp: null,
                last_login: null,
                instansi_induk_text: null,
                is_admin: null,
                parent_id: null,
                last_logout: null,
                status_register: null,
                replace_by_account_id: null,
                roles: null,
                permissions: null,
                is_active: null,
                created_at: null,
                modified_at: null,
            },
        };
    },
    beforeRouteEnter(to, from, next) {
        next((vm) => {
            // access to component's instance using `vm` .
            // this is done because this navigation guard is called before the component is created.
            // clear your previously populated search results.
            // re-populate search results
            vm.getData()
                .then((response) => {
                    vm.spinner = false;
                    vm.data.nama = response.data.data.nama;
                    vm.data.email = response.data.data.email;
                    vm.data.status = response.data.data.status;
                    vm.data.username = response.data.data.username;
                    vm.data.nip = response.data.data.nip;
                    vm.data.jabatan = response.data.data.jabatan;
                    vm.data.satuan_kerja = response.data.data.satuan_kerja;
                    vm.data.alamat = response.data.data.alamat;
                    vm.data.no_hp = response.data.data.no_hp;
                    vm.data.no_telepon = response.data.data.no_telepon;
                    vm.data.kota = response.data.data.kota;
                    vm.data.propinsi = response.data.data.propinsi;
                    vm.data.kode_pos = response.data.data.kode_pos;
                    vm.data.instansi_induk = response.data.data.instansi_induk;
                    vm.data.dokumen = response.data.data.dokumen;
                    vm.data.last_login = response.data.data.last_login;
                    vm.data.instansi_induk_text =
                        response.data.data.instansi_induk_text;
                    vm.data.is_admin = response.data.data.is_admin;
                    vm.data.parent_id = response.data.data.parent_id;
                    vm.data.last_logout = response.data.data.last_logout;
                    vm.data.status_register =
                        response.data.data.status_register;
                    vm.data.replace_by_account_id =
                        response.data.data.replace_by_account_id;
                    vm.data.roles = response.data.data.roles;
                    vm.data.permissions = response.data.data.permissions;
                    vm.data.is_active = response.data.data.is_active;
                    vm.data.created_at = response.data.data.created_at;
                    vm.data.modified_at = response.data.data.modified_at;
                })
                .catch((error) => {
                    console.log(error);
                });
            next();
        });
    },
    methods: {
        getData() {
            return this.$http.get(`users/${this.$route.params.id}`);
        },
    },
};
</script>

<style>
</style>

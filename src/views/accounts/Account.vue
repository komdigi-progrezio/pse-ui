<template>
    <div>
        <CRow>
            <CCol lg="12">
                <CCard>
                    <CCardHeader>
                        <CIcon name="cil-pencil"/> Laporan
                    </CCardHeader>
                    <CCardBody>
                        <h5>Filter Berdasarkan</h5>
                        <CRow>
                            <CCol lg="3">
                                <CSelect :options="['Dummy Data', 'Dummy Data', 'Dummy Data']" />
                            </CCol>
                            <CCol lg="3">
                                <CSelect :options="['Dummy Data', 'Dummy Data', 'Dummy Data']" />
                            </CCol>
                            <CCol lg="3">
                                <CInput placeholder="username, nama, nip, instansi, satuan kerja, jabatan" />
                            </CCol>
                            <CCol lg="3">
                                <CInput placeholder="keyword" />
                            </CCol>
                        </CRow>
                        <CRow align-vertical="center" class="mb-3">
                            <CCol lg="4">
                                <CSelect :options="['Dummy Data', 'Dummy Data', 'Dummy Data']" class="mb-0" />
                            </CCol>
                            <CCol lg="4" class="d-flex align-items-center">
                                Mulai:
                                <date-picker
                                    v-model="search.registered_at"
                                    name="registered_at"
                                    :config="options"
                                    class="ml-2"
                                />
                            </CCol>
                            <CCol lg="4"  class="d-flex align-items-center">
                                Sampai:
                                <date-picker
                                    v-model="search.updated_at"
                                    name="registered_at"
                                    :config="options"
                                    class="ml-2"
                                />
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol :lg="{size: '6', offset: '6'}" class="text-right">
                                <CButton
                                    color="primary"
                                    size="sm"
                                    class="w-25 mb-1"
                                >
                                    Cari
                                </CButton>
                                <a class="font-weight-bold d-block" href="#">Daftar User Admin</a>
                                <a class="font-weight-bold d-block" href="#">Pengajuan Penggantian User</a>
                                <a class="font-weight-bold d-block" href="#">Daftar Perubahan Dokumen</a>
                            </CCol>
                        </CRow>
                        <div class="mt-4" style="overflow-x:auto;">
                            <table class="table table-hover table-striped">
                                <thead>
                                    <tr>
                                        <th
                                            v-for="(field, index) in accountFields"
                                            :key="index"
                                            scope="col"
                                        >
                                            {{ field }}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr
                                        v-for="(account, index) in accountData"
                                        :key="index"
                                    >
                                        <th scope="row">{{ account.no }}</th>
                                        <td>{{ account.username }}</td>
                                        <td>{{ account.name }}</td>
                                        <td>{{ account.nip }}</td>
                                        <td>{{ account.position }}</td>
                                        <td>{{ account.instance }}</td>
                                        <td>{{ account.registered_at }}</td>
                                        <td>{{ account.updated_at }}</td>
                                        <td>{{ account.stats }}</td>
                                        <td>
                                            <CButton
                                                color="primary"
                                                size="sm"
                                                class="m-2"
                                                v-c-popover="{
                                                    header: 'Detail',
                                                    content: 'Lihat Daftar Sistem Elektronik',
                                                    placement: 'left'
                                                }"
                                            >
                                                Detail Elektronik
                                            </CButton>
                                            <CButton
                                                color="success"
                                                size="sm"
                                                class="m-2"
                                                v-c-popover="{
                                                    header: 'Detail',
                                                    content: 'Lihat Pejabat Dibawahnya',
                                                    placement: 'left'
                                                }"
                                            >
                                                Detail Akun
                                            </CButton>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <CPagination
                            :activePage.sync="currentPage"
                            :pages="5"
                        />
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    </div>
</template>

<script>
import mockDataAccount from '@/views/accounts/mockDataAccount.js'
import accountFields from '@/views/accounts/accountFields.js'

export default {
    name: 'Account',
    data() {
        return {
            search: {
                registered_at: null,
                updated_at: null,
            },
            options: {
                format: 'DD-MM-YYYY',
                useCurrent: false,
                showClear: true,
                showClose: true,
            },
            accountFields: accountFields,
            accountData: mockDataAccount,
            currentPage: 1,
        };
    },
}
</script>

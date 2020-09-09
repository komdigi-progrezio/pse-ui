<template>
    <div>
        <CRow>
            <CCol lg="12">
                <CCard>
                    <CCardHeader>
                        <CIcon name="cil-pencil"/> Laporan
                    </CCardHeader>
                    <CCardBody>
                        <h5>Filter</h5>
                        <CRow>
                            <CCol lg="6">
                                <CInput
                                    label="Nama Sistem"
                                    placeholder="Nama Sistem Elektronik"
                                />
                            </CCol>
                            <CCol lg="6">
                                <CSelect
                                    label="Pengguna"
                                    :options="['Dummy Data', 'Dummy Data', 'Dummy Data']"
                                />
                            </CCol>
                        </CRow>
                        <CRow>
                            <CCol lg="6">
                                <CSelect
                                    label="Instansi / Satuan Kerja"
                                    :options="['Dummy Data', 'Dummy Data', 'Dummy Data']"
                                />
                                <CSelect
                                    :options="['Dummy Data', 'Dummy Data', 'Dummy Data']"
                                />
                            </CCol>
                            <CCol lg="6">
                                <CSelect
                                    label="Status"
                                    :options="['Dummy Data', 'Dummy Data', 'Dummy Data']"
                                />
                                <div class="d-flex justify-content-between">
                                    <p class="font-weight-bold">
                                        Statistik
                                    </p>
                                    <CButton color="primary">
                                        Cari
                                    </CButton>
                                </div>
                                <p class="font-weight-bold">
                                    Download Laporan
                                </p>
                            </CCol>
                        </CRow>
                        <div style="overflow-x:auto;">
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
                                        <td>{{ account.agency_name }}</td>
                                        <td>{{ account.work_unit }}</td>
                                        <td>{{ account.information }}</td>
                                        <td>{{ account.registration_progress }}</td>
                                        <td>{{ account.regis_number }}</td>
                                        <td>
                                            <CButton
                                                v-if="!account.published"
                                                color="primary"
                                                size="sm"
                                                class="m-2"
                                            >
                                                Publikasi
                                            </CButton>
                                            <CBadge
                                                v-else
                                                color="success"
                                                v-c-popover="{
                                                    header: 'Tanggal Publikasi',
                                                    content: '27-06-2020',
                                                    placement: 'left'
                                                }"
                                                class="m-2"
                                            >
                                                Terpublikasi
                                            </CBadge>
                                            <CButton
                                                color="danger"
                                                size="sm"
                                                class="m-2"
                                            >
                                                Hapus
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
            accountFields: accountFields,
            accountData: mockDataAccount,
            currentPage: 1,
        };
    },
}
</script>

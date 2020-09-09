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
                                            v-for="(field, index) in reportFields"
                                            :key="index"
                                            scope="col"
                                        >
                                            {{ field }}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr
                                        v-for="(report, index) in reportData"
                                        :key="index"
                                    >
                                        <th scope="row">{{ report.no }}</th>
                                        <td>{{ report.agency_name }}</td>
                                        <td>{{ report.work_unit }}</td>
                                        <td>{{ report.information }}</td>
                                        <td>{{ report.registration_progress }}</td>
                                        <td>{{ report.regis_number }}</td>
                                        <td>
                                            <CButton
                                                v-if="!report.published"
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
                            :pages="10"
                        />
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    </div>
</template>

<script>
import mockDataReport from '@/views/reports/mockDataReport.js'
import reportFields from '@/views/reports/reportFields.js'

export default {
    name: 'Report',
    data() {
        return {
            reportFields: reportFields,
            reportData: mockDataReport,
            currentPage: 1,
        };
    },
}
</script>

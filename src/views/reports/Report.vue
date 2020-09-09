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
                        <CDataTable
                            :items="reportData"
                            :fields="reportFields"
                            column-filter
                            items-per-page-select
                            :items-per-page="5"
                            hover
                            sorter
                            pagination
                        >
                            <template #actions="{ item }">
                                <td>
                                    <CButton
                                        v-if="!item.published"
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
                            </template>
                        </CDataTable>
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
        };
    },
}
</script>

<style>

</style>
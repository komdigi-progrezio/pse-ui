<template>
    <div>
        <CRow>
            <CCol lg="12">
                <CCard>
                    <CCardHeader>
                        <CIcon name="cil-file" /> Data Perubahan Dokumen
                    </CCardHeader>
                    <CCardBody>
                        <div style="overflow-x:auto;">
                            <table class="table table-hover table-striped">
                                <thead>
                                    <tr>
                                        <th
                                            v-for="(field, index) in accountDocumentFields"
                                            :key="index"
                                            scope="col"
                                        >
                                            {{ field }}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr
                                        v-for="(account, index) in accountDocumentData"
                                        :key="index"
                                    >
                                        <th scope="row">{{ account.no }}</th>
                                        <td>{{ account.username }}</td>
                                        <td>{{ account.name }}</td>
                                        <td>{{ account.nip }}</td>
                                        <td>{{ account.updated_at }}</td>
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
import accountDocumentFields from '@/views/accounts/AccountDocumentFields.js'
import accountDocumentData from '@/views/accounts/AccountDocumentData.js'

export default {
    name: 'AccountDocumentChanges',
    data() {
        return {
            accountDocumentFields: accountDocumentFields,
            accountDocumentData: accountDocumentData,
            currentPage: 1,
        };
    },
}
</script>

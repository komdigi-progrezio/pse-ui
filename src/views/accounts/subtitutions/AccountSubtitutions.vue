<template>
    <div>
        <CRow>
            <CCol lg="12">
                <CCard>
                    <CCardHeader>
                        <CIcon name="cil-people"/> Daftar Pengajuan Penggantian Akun Pengelola
                    </CCardHeader>
                    <CCardBody>
                        <div style="overflow-x:auto;">
                            <table class="table table-hover table-striped">
                                <thead>
                                    <tr>
                                        <th
                                            v-for="(field, index) in AccountSubtitutionFields"
                                            :key="index"
                                            scope="col"
                                        >
                                            {{ field }}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr
                                        v-for="(account, index) in AccountSubtitutionData"
                                        :key="index"
                                    >
                                        <th scope="row">{{ account.no }}</th>
                                        <td>{{ account.username }}</td>
                                        <td>{{ account.name }}</td>
                                        <td>{{ account.nip }}</td>
                                        <td>{{ account.position }}</td>
                                        <td>{{ account.instance }}</td>
                                        <td>{{ account.stats }}</td>
                                        <td>{{ account.registered_at }}</td>
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
import AccountSubtitutionFields from '@/views/accounts/subtitutions/accountSubtitutionFields.js'
import AccountSubtitutionData from '@/views/accounts/subtitutions/accountSubtitutionData.js'

export default {
    name: 'AccountSubtitutions',
    data() {
        return {
            AccountSubtitutionFields: AccountSubtitutionFields,
            AccountSubtitutionData: AccountSubtitutionData,
            currentPage: 1,
        };
    }
}
</script>

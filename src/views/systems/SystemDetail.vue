<template>
  <div>
    <CCard>
      <CCardHeader>
        <CIcon name="cil-description" /> Detail Sistem Elektronik
      </CCardHeader>
      <CCardBody>
        <CTabs justified>
          <CTab title="Data Umum">
            <system-general-data></system-general-data>
          </CTab>
          <CTab title="Profil Penyelenggara">
            <system-organizer-profile></system-organizer-profile>
          </CTab>
          <CTab title="Perangkat Keras">
            <system-hardware></system-hardware>
          </CTab>
          <CTab title="Perangkat Lunak">
            <system-software></system-software>
          </CTab>
          <CTab title="Tenaga Ahli">
            <system-experts></system-experts>
          </CTab>
          <CTab title="Tata Kelola">
            <system-governance></system-governance>
          </CTab>
          <CTab title="Penanggung Jawab">
            <system-responsible-person></system-responsible-person>
          </CTab>
          <CTab title="Help Desk">
            <system-help-desk></system-help-desk>
          </CTab>
          <CTab title="Dokumen">
            <system-document></system-document>
          </CTab>
        </CTabs>
      </CCardBody>
    </CCard>
  </div>
</template>

<script>
import SystemGeneralData from './partials/SystemGeneralData'
import SystemOrganizerProfile from './partials/SystemOrganizerProfile'
import SystemDocument from './partials/SystemDocument'
import SystemExperts from './partials/SystemExperts'
import SystemGovernance from './partials/SystemGovernance'
import SystemHardware from './partials/SystemHardware'
import SystemSoftware from './partials/SystemSoftware'
import SystemHelpDesk from './partials/SystemHelpDesk'
import SystemResponsiblePerson from './partials/SystemResponsiblePerson'

export default {
  name: 'SystemDetail',
  components: {
    SystemGeneralData,
    SystemOrganizerProfile,
    SystemDocument,
    SystemExperts,
    SystemGovernance,
    SystemHardware,
    SystemSoftware,
    SystemHelpDesk,
    SystemResponsiblePerson,
  },
  data() {
    return {}
  },
  methods: {
    editSystem() {
      console.log(1)
    },
  },
}
</script>

<style scoped>
.row-profile-service {
  background-color: #dfdfdf;
}
</style>

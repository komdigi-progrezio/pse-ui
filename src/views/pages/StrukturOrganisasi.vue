<template>
  <div>
    <CCard>
      <CCardHeader> Struktur Organisasi </CCardHeader>
      <CCardBody>
        <CRow>
          <CCol sm="12" md="6" lg="4"
            ><tree-item :item="treeData" @selected="onSelect"></tree-item>
          </CCol>
          <CCol sm="12" md="6" lg="8">
            <h5>Daftar Sistem Elektronik</h5>
            <div class="table-responsive">
              <table>
                <tbody>
                  <tr>
                    <td>Nama Instansi</td>
                    <td>:</td>
                    <td>{{ treeData.name }}</td>
                  </tr>
                  <tr v-if="$store.state.treeView.workUnit.id !== 'parent'">
                    <td>Satuan Kerja</td>
                    <td>:</td>
                    <td>{{ $store.state.treeView.workUnit.name }}</td>
                  </tr>
                </tbody>
              </table>
              <div v-if="spinner" class="d-flex justify-content-center my-3">
                <div class="spinner-border text-primary" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              </div>
              <table
                v-if="!spinner"
                class="table table-stripped"
                :class="{ 'my-3': !spinner }"
              >
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Nama Sistem</th>
                    <th>Penyelenggara</th>
                    <th>Tanggal Dibuat</th>
                    <th>Pemuktahiran</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  <template v-if="data.length > 0">
                    <tr v-for="(value, index) in data" :key="index">
                      <td>{{ index + 1 }}</td>
                      <td>{{ value.nama_eksternal }}</td>
                      <td>{{ value.penyelenggara }}</td>
                      <td>{{ value.created_at }}</td>
                      <td>{{ value.modified_at }}</td>
                      <td>
                        <CButton
                          color="primary"
                          size="sm"
                          v-c-tooltip="{
                            content: 'Detail Sistem Elektronik',
                            placement: 'bottom',
                          }"
                          :to="`/admin/systems/${value.sis_profil_id}`"
                        >
                          <CIcon name="cil-description" />
                        </CButton>
                      </td>
                    </tr>
                  </template>
                  <template v-else>
                    <tr>
                      <td colspan="6" class="text-center">Data Kosong</td>
                    </tr>
                  </template>
                </tbody>
              </table>
            </div>
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
      </CCardBody>
    </CCard>
  </div>
</template>

<script>
export default {
  name: 'StrukturOrganisasi',
  data() {
    return {
      treeData: {
        id: 'parent',
        name: null,
        children: [],
      },
      data: [],
      pagination: {
        current_page: 1,
        last_page: 10,
      },
      spinner: false,
    }
  },
  created() {
    this.fetchTreeViewWorkUnit()
    this.getProfile()
  },
  methods: {
    //  Fetch Tree View
    fetchTreeViewWorkUnit() {
      this.$http
        .get('parsatuankerja/list/tree-view')
        .then((response) => {
          this.treeData.children = response.data
        })
        .catch((error) => {
          if (error.response.status === 500) {
            this.$toastr.e('Ada Kesalahan dari Server', 'Pemberitahuan')
          } else {
            this.$toastr.e(error.response.data.message, 'Pemberitahuan')
          }
        })
    },
    getProfile() {
      this.$http
        .get('users/get/authenticated')
        .then((response) => {
          this.treeData.name = response.data.data.instansi_induk_text
        })
        .catch((error) => {
          if (error.response.status === 500) {
            this.$toastr.e('Ada Kesalahan dari Server', 'Pemberitahuan')
          } else {
            this.$toastr.e(error.response.data.message, 'Pemberitahuan')
          }
        })
    },
    getData() {
      this.spinner = true
      const treeViewId = this.$store.state.treeView.workUnit.id
      this.$http
        .get(`organizers/list/tree-view/structure/${treeViewId}`, {
          params: {
            page: this.pagination.current_page,
          },
        })
        .then((response) => {
          this.spinner = false
          this.data = response.data.data
          this.pagination.current_page = response.data.meta.current_page
          this.pagination.last_page = response.data.meta.last_page
        })
        .catch((error) => {
          console.log(error)
          if (error.response.status === 500) {
            this.$toastr.e('Ada Kesalahan dari Server', 'Pemberitahuan')
          } else {
            this.$toastr.e(error.response.data.message, 'Pemberitahuan')
          }
        })
    },
    onSelect() {
      this.spinner = true
      const treeViewId = this.$store.state.treeView.workUnit.id
      this.$http
        .get(`organizers/list/tree-view/structure/${treeViewId}`, {
          params: {
            page: this.pagination.current_page,
          },
        })
        .then((response) => {
          this.spinner = false
          this.data = response.data.data
          this.pagination.current_page = response.data.meta.current_page
          this.pagination.last_page = response.data.meta.last_page
        })
        .catch((error) => {
          console.log(error)
          if (error.response.status === 500) {
            this.$toastr.e('Ada Kesalahan dari Server', 'Pemberitahuan')
          } else {
            this.$toastr.e(error.response.data.message, 'Pemberitahuan')
          }
        })
    },
  },
}
</script>

<style></style>

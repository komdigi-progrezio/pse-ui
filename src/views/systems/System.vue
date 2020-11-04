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
            :class="{ 'mr-auto': search.name === null }"
            v-c-tooltip="{
              content: 'Filter',
              placement: 'bottom',
            }"
            @click="filter"
          >
            Filter
            <CIcon :name="setIconFilter" />
          </CButton>
          <CButton
            v-show="search.name !== null"
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
              <div class="form-group">
                <label for="name">Nama Sistem Elektronik</label>
                <input
                  v-model="search.name"
                  type="text"
                  name="name"
                  placeholder="Masukan Nama Sistem Elektronik"
                  class="form-control"
                />
              </div>
            </CCol>
          </CRow>
        </template>
      </CCardBody>
    </CCard>
    <CRow>
      <CCol lg="12">
        <CCard>
          <CCardHeader>
            <CIcon name="cil-cloud" /> Sistem Elektronik
            <div class="card-header-actions">
              <CButton
                color="success"
                shape="pill"
                size="sm"
                variant="outline"
                v-c-tooltip="{
                  content: 'Tambah Sistem Elektronik',
                  placement: 'bottom',
                }"
                :to="'/admin/systems/register'"
              >
                <CIcon name="cil-plus" />
              </CButton>
            </div>
          </CCardHeader>
          <CCardBody>
            <div class="mt-4">
              <div v-if="spinner" class="d-flex justify-content-center">
                <div class="spinner-border text-primary" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              </div>
              <div class="table-responsive">
                <table v-if="!spinner" class="table table-hover table-striped">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Penyelenggara</th>
                      <th>Nama Sistem</th>
                      <th>Progress</th>
                    </tr>
                  </thead>
                  <tbody>
                    <template v-if="data.length > 0">
                      <tr v-for="(item, index) in data" :key="index">
                        <th scope="row">
                          {{ index + 1 }}
                        </th>
                        <td>{{ item.name }}</td>
                        <td>{{ item.created_by }}</td>
                        <td>{{ item.updated_by }}</td>
                      </tr>
                    </template>
                    <template v-else>
                      <tr>
                        <td colspan="4" class="text-center"> Data Kosong </td>
                      </tr>
                    </template>
                  </tbody>
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
  name: 'System',
  data() {
    return {
      spinner: false,
      listFilter: false,
      modal: {
        delete: {
          showModal: false,
          title: null,
          color: null,
          message: null,
          labelButton: null,
          uniqueId: null,
        },
        post_put: {
          showModal: false,
          title: null,
          color: null,
          labelButton: null,
          method: null,
        },
      },
      data: [],
      permissions: [],
      forms: {
        permissions: [],
        id: null,
        name: null,
      },
      search: {
        name: null,
      },
      errorValidations: {
        name: [],
      },
      pagination: {
        current_page: 1,
        last_page: 10,
      },
    }
  },
  computed: {
    setIconFilter() {
      if (this.listFilter) {
        return 'cil-filter-x'
      }

      return 'cil-filter'
    },
  },
  methods: {
    filter() {
      this.listFilter = !this.listFilter
      this.clearFilter()
    },
    clearFilter() {
      this.search.name = null
    },
  },
}
</script>

<style></style>

<template>
  <div>
    <CCard>
      <CCardHeader>
        Pengaturan Struktur Organisasi

        <button class="btn btn-link ml-auto d-flex" @click="showCreateModal">
          <CIcon name="cil-plus" class="align-self-center mr-2" />
          <a class="align-self-center">Tambah Struktur Organisasi</a>
        </button>
      </CCardHeader>

      <CCardBody>
        <CRow>
          <CCol sm="12" md="12" lg="12">
            <tree-item
              :item="treeData"
              :is-crud="true"
              @selected="showUpdateModal"
            ></tree-item>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>

    <CCard>
      <CCardHeader> Struktur Organisasi </CCardHeader>

      <CCardBody>
        <CRow>
          <CCol sm="12" md="6" lg="4">
            <tree-item :item="treeData" @selected="onSelect"></tree-item>
          </CCol>
          <CCol sm="12" md="6" lg="8">
            <h5 class="desktop-only">Daftar Sistem Elektronik</h5>
            <div class="table-responsive desktop-only">
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
                      <td>{{
                        (pagination.current_page - 1) * pagination.per_page +
                        index +
                        1
                      }}</td>
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

    <CModal
      :title="modal.organizationStructure.title"
      :color="modal.organizationStructure.color"
      size="xl"
      :show.sync="modal.organizationStructure.show"
    >
      <template v-slot:body-wrapper>
        <div class="modal-body">
          <CRow>
            <CCol sm="6">
              <label for="parent">Indux Satuan Kerja</label>

              <input
                id="parent"
                type="text"
                v-model="form.organizationStructure.parentName"
                class="form-control"
                placeholder="Pilih Indux Satuan Kerja"
                @click="modal.treeView.show = true"
                :class="{
                  'is-invalid': validations.parentId.length > 0,
                }"
                readonly
              />

              <message :messages="validations.parentId" />
            </CCol>

            <CCol sm="6">
              <label for="name">Nama Satuan Kerja</label>

              <input
                id="name"
                type="text"
                v-model="form.organizationStructure.name"
                :class="{
                  'is-invalid': validations.name.length > 0,
                }"
                class="form-control"
              />

              <message :messages="validations.name" />
            </CCol>

            <CCol sm="6">
              <label for="address">Alamat</label>

              <input
                id="address"
                type="text"
                v-model="form.organizationStructure.address"
                class="form-control"
                :class="{
                  'is-invalid': validations.address.length > 0,
                }"
              />

              <message :messages="validations.address" />
            </CCol>

            <CCol sm="6">
              <label for="province">Propinsi</label>

              <select
                id="province"
                v-model="form.organizationStructure.province"
                class="form-control"
                :class="{
                  'is-invalid': validations.province.length > 0,
                }"
                @change="fetchCities($event.target.value)"
              >
                <option value="" selected="selected"> Pilih Provinsi </option>

                <option
                  :value="value.id"
                  v-for="(value, index) in options.provinces"
                  :key="`province-${index}`"
                >
                  {{ value.nama }}
                </option>
              </select>

              <message :messages="validations.province"></message>
            </CCol>

            <CCol sm="6">
              <label for="postalCode">Kode Pos</label>

              <input
                id="postalCode"
                type="text"
                v-model="form.organizationStructure.postalCode"
                :class="{
                  'is-invalid': validations.postalCode.length > 0,
                }"
                class="form-control"
              />

              <message :messages="validations.postalCode" />
            </CCol>

            <CCol sm="6">
              <label for="city">Kota</label>

              <select
                id="city"
                v-model="form.organizationStructure.city"
                class="form-control"
                :class="{
                  'is-invalid': validations.city.length > 0,
                }"
              >
                <option value="" selected="selected"> Pilih Kota </option>

                <option
                  :value="value.id"
                  v-for="(value, index) in options.cities"
                  :key="`province-${index}`"
                >
                  {{ value.nama }}
                </option>
              </select>

              <message :messages="validations.city" />
            </CCol>

            <CCol sm="6">
              <label for="phone">No Telepon</label>

              <input
                id="phone"
                type="text"
                :class="{
                  'is-invalid': validations.phone.length > 0,
                }"
                v-model="form.organizationStructure.phone"
                class="form-control"
              />

              <message :messages="validations.phone" />
            </CCol>

            <CCol sm="6">
              <label for="webUrl">Website</label>

              <input
                id="webUrl"
                type="text"
                :class="{
                  'is-invalid': validations.webUrl.length > 0,
                }"
                v-model="form.organizationStructure.webUrl"
                class="form-control"
              />

              <message :messages="validations.webUrl" />
            </CCol>
          </CRow>
        </div>
      </template>

      <template v-slot:footer-wrapper>
        <div class="modal-footer">
          <CButton
            color="danger"
            size="sm"
            class="m-2"
            @click="deleteWorkUnit(form.organizationStructure.id)"
          >
            Hapus
          </CButton>

          <CButton
            color="secondary"
            size="sm"
            class="m-2"
            @click="closeModal()"
          >
            Cancel
          </CButton>

          <CButton color="primary" size="sm" @click="save()"> Simpan </CButton>
        </div>
      </template>
    </CModal>

    <CModal
      :title="modal.treeView.title"
      :color="modal.treeView.color"
      :show.sync="modal.treeView.show"
    >
      <template v-slot:body-wrapper>
        <div class="modal-body">
          <CRow>
            <CCol sm="12" md="12" lg="12">
              <tree-item
                :item="treeData"
                :is-crud="true"
                @selected="setDataParent"
              ></tree-item>
            </CCol>
          </CRow>
        </div>
      </template>

      <template v-slot:footer-wrapper>
        <div class="modal-footer">
          <CButton
            color="secondary"
            size="sm"
            class="m-2"
            @click="modal.treeView.show = false"
          >
            Cancel
          </CButton>
        </div>
      </template>
    </CModal>
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
        per_page: null,
      },
      spinner: false,
      modal: {
        organizationStructure: {
          title: null,
          color: null,
          show: false,
          isCreate: false,
        },

        treeView: {
          title: 'Pilih ',
          color: 'Success',
          show: false,
        },
      },
      form: {
        organizationStructure: {
          id: null,
          parentId: null,
          parentName: null,
          agencyId: null,
          name: null,
          address: null,
          province: null,
          city: null,
          postalCode: null,
          phone: null,
          webUrl: null,
        },
      },
      options: {
        provinces: [],
        cities: [],
      },
      validations: {
        parentId: [],
        agencyId: [],
        name: [],
        address: [],
        province: [],
        city: [],
        postalCode: [],
        phone: [],
        webUrl: [],
      },
    }
  },

  created() {
    this.fetchTreeViewWorkUnit()

    this.getProfile()

    this.fetchProvinces()
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
          this.pagination.per_page = response.data.meta.per_page
          this.pagination.last_page = response.data.meta.last_page
        })
        .catch((error) => {
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
          this.pagination.per_page = response.data.meta.per_page
          this.pagination.last_page = response.data.meta.last_page
        })
        .catch((error) => {
          if (error.response.status === 500) {
            this.$toastr.e('Ada Kesalahan dari Server', 'Pemberitahuan')
          } else {
            this.$toastr.e(error.response.data.message, 'Pemberitahuan')
          }
        })
    },

    showCreateModal() {
      this.modal.organizationStructure = {
        title: 'Tambah Struktur Organisasi',
        color: 'success',
        show: true,
        isCreate: true,
      }
    },

    fetchParent(parentId) {
      this.$http.get(`parsatuankerja/${parentId}`).then((response) => {
        this.form.organizationStructure.parentName = response.data.data.name
      })
    },

    showUpdateModal(selectedOrganization) {
      if (selectedOrganization.id !== 'parent') {
        this.modal.organizationStructure = {
          title: 'Ubah Struktur Organisasi',
          color: 'primary',
          show: true,
          isCreate: false,
        }

        if (selectedOrganization.propinsi) {
          this.fetchCities(selectedOrganization.propinsi)
        }

        this.form.organizationStructure = {
          id: selectedOrganization.id,
          parentId: selectedOrganization.parent_id,
          agencyId: selectedOrganization.instansi_id,
          parentName: selectedOrganization.parent_id
            ? this.fetchParent(selectedOrganization.parent_id)?.name
            : null,
          name: selectedOrganization.name,
          address: selectedOrganization.alamat,
          province: selectedOrganization.propinsi,
          city: selectedOrganization.kota,
          postalCode: selectedOrganization.kode_pos,
          phone: selectedOrganization.no_telp,
          webUrl: selectedOrganization.website,
        }
      }
    },

    closeModal() {
      this.modal.organizationStructure = {
        title: null,
        color: null,
        show: false,
        isCreate: false,
      }

      this.resetValidation()

      this.resetForm()
    },

    resetForm() {
      this.form.organizationStructure = {
        id: null,
        parentId: null,
        parentName: null,
        agencyId: null,
        name: null,
        address: null,
        province: null,
        city: null,
        postalCode: null,
        phone: null,
        webUrl: null,
      }
    },

    fetchProvinces() {
      this.options.cities = []

      this.$http.get('provinsi').then((response) => {
        this.options.provinces = response.data.data
      })
    },

    fetchCities(provinceId) {
      this.$http.get(`provinsi/${provinceId}/kota`).then((response) => {
        this.options.cities = response.data.data
      })
    },

    save() {
      const isCreate = this.modal.organizationStructure.isCreate

      if (isCreate) {
        this.storeOrganization()
      }

      if (!isCreate) {
        this.updateOrganization()
      }
    },

    storeOrganization() {
      this.$http
        .post('parsatuankerja/organization', this.getValidForm())
        .then(() => {
          this.$toastr.s('Berhasil menambah data.', 'Sukses')
          this.fetchTreeViewWorkUnit()
          this.getProfile()
          this.closeModal()
          this.resetValidation()
        })
        .catch((error) => {
          this.$toastr.e(error.response.data.message, 'Pemberitahuan')
          this.setValidation(error)
        })
    },

    updateOrganization() {
      this.$http
        .patch(
          `parsatuankerja/organization/${this.form.organizationStructure.id}`,
          this.getValidForm()
        )
        .then(() => {
          this.$toastr.s('Berhasil merubah data.', 'Sukses')
          this.fetchTreeViewWorkUnit()
          this.getProfile()
          this.closeModal()
          this.resetValidation()
        })
        .catch((error) => {
          this.$toastr.e(error.response.data.message, 'Pemberitahuan')
          this.setValidation(error)
        })
    },
    deleteWorkUnit() {
      this.$http
        .delete(`parsatuankerja/${this.form.organizationStructure.id}`)
        .then(() => {
          this.$toastr.s('Berhasil menghapus data.', 'Sukses')
          this.fetchTreeViewWorkUnit()
          this.getProfile()
          this.closeModal()
          this.resetValidation()
        })
        .catch((error) => {
          this.$toastr.e(error.response.data.message, 'Pemberitahuan')
          this.setValidation(error)
        })
    },
    setValidation(error) {
      if (error.response.status === 422) {
        this.validations = {
          parentId: error.response.data.errors?.parent_id ?? [],
          agencyId: error.response.data.errors?.instansi_id ?? [],
          name: error.response.data.errors?.name ?? [],
          address: error.response.data.errors?.address ?? [],
          province: error.response.data.errors?.propinsi ?? [],
          city: error.response.data.errors?.kota ?? [],
          postalCode: error.response.data.errors?.kode_pos ?? [],
          phone: error.response.data.errors?.no_telp ?? [],
          webUrl: error.response.data.errors?.website ?? [],
        }
      }
    },

    resetValidation() {
      this.validations = {
        parentId: [],
        agencyId: [],
        name: [],
        address: [],
        province: [],
        city: [],
        postalCode: [],
        phone: [],
        webUrl: [],
      }
    },

    setDataParent(selectedOrganization) {
      Object.assign(this.form.organizationStructure, {
        parentId: selectedOrganization.id,
        parentName: selectedOrganization.name,
      })

      this.modal.treeView.show = false
    },

    getValidForm() {
      return {
        alamat: this.form.organizationStructure.address,
        instansi_id: this.form.organizationStructure.agencyId,
        kode_pos: this.form.organizationStructure.postalCode,
        kota: this.form.organizationStructure.city,
        name: this.form.organizationStructure.name,
        no_telp: this.form.organizationStructure.phone,
        parent_id:
          this.form.organizationStructure.parentId === 'parent'
            ? 0
            : this.form.organizationStructure.parentId,
        propinsi: this.form.organizationStructure.province,
        website: this.form.organizationStructure.webUrl,
      }
    },
  },
}
</script>

<style></style>

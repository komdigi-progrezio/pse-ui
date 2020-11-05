<template>
  <div>
    <CCard>
      <CCardHeader> Tambah Data Sistem </CCardHeader>
      <CCardBody>
        <CRow>
          <CCol sm="12">
            <div class="form-group">
              <label for="name">Nama Internal</label>
              <input
                type="text"
                name="name"
                placeholder="Masukan Nama Internal"
                class="form-control"
              />
            </div>
          </CCol>
          <CCol sm="12">
            <div class="form-group">
              <label for="name">Nama Eksternal</label>
              <input
                type="text"
                name="name"
                placeholder="Masukan Eksternal"
                class="form-control"
              />
            </div>
          </CCol>
          <CCol sm="12">
            <div class="form-group">
              <label for="name">Keterangan</label>
              <textarea cols="30" rows="2" class="form-control"></textarea>
            </div>
          </CCol>
          <CCol sm="12">
            <div class="form-group">
              <label for="name">Sasaran Pelayanan</label>
              <select class="form-control">
                <option value="">Pilih Sasaran Pelayanan</option>
              </select>
            </div>
          </CCol>
          <CCol sm="12">
            <div class="form-group">
              <label for="name">Kategori Sistem Elektronik</label>
              <select class="form-control">
                <option value="">Pilih Kategori Sistem Elektronik</option>
              </select>
            </div>
          </CCol>
          <CCol sm="12">
            <div class="form-group">
              <label for="name">Kategori Akses</label>
              <select class="form-control">
                <option value="">Pilih Kategori Akses</option>
              </select>
            </div>
          </CCol>
          <CCol sm="12">
            <div class="form-group">
              <label for="name"
                >Bersedia Untuk di Publikasikan Melalu Portal Layanan
                Publik</label
              >
              <div class="d-flex">
                <div class="form-check form-check-inline mr-1">
                  <input
                    v-model="forms.publish"
                    class="form-check-input"
                    id="inline-radio1"
                    type="radio"
                    value="option1"
                    name="inline-radios"
                  />
                  <label class="form-check-label" for="inline-radio1"
                    >One</label
                  >
                </div>
                <div class="form-check form-check-inline mr-1">
                  <input
                    v-model="forms.publish"
                    class="form-check-input"
                    id="inline-radio1"
                    type="radio"
                    value="option2"
                    name="inline-radios"
                  />
                  <label class="form-check-label" for="inline-radio1"
                    >One</label
                  >
                </div>
              </div>
            </div>
          </CCol>
        </CRow>
      </CCardBody>
      <CCardFooter>
        <CButton color="secondary" size="sm" class="mr-2"> Cancel </CButton>
        <CButton color="primary" size="sm"> Simpan </CButton>
      </CCardFooter>
    </CCard>
  </div>
</template>

<script>
export default {
  name: 'SystemRegister',
  data() {
    return {
      forms: {
        publish: null,
      },
    }
  },
}
</script>

<style></style>

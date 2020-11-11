<template>
  <div class="mt-2">
    <h5>Ketersediaan Tenaga Ahli</h5>
    <div class="form-group">
      <label for="name">Apakah Tenaga Ahli Tersedia ? </label>
      <div class="form-check form-check-inline ml-2">
        <input
          class="form-check-input"
          id="inline-radio1"
          type="radio"
          value="0"
          name="inline-radios"
        />
        <label class="form-check-label" for="inline-radio1">Tidak</label>
      </div>
      <div class="form-check form-check-inline mr-1">
        <input
          class="form-check-input"
          id="inline-radio1"
          type="radio"
          value="1"
          name="inline-radios"
        />
        <label class="form-check-label" for="inline-radio1">Ya</label>
      </div>
    </div>
    <hr />
    <a href="" @click.prevent="editSystem">Tambah Ketersediaan Tenaga Ahli</a>
    <div class="table-responsive">
      <table class="table table-stripped">
        <thead>
          <tr>
            <td>No</td>
            <td>Jenis</td>
            <td>Jumlah</td>
            <td>Status</td>
            <td>Aksi</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Data Dummy</td>
            <td>Data Dummy</td>
            <td>Data Dummy</td>
            <td>
              <CButton
                color="danger"
                size="sm"
                class="mr-2"
                v-c-tooltip="{
                  content: 'Hapus Ketersediaan Tenaga Ahli',
                  placement: 'bottom',
                }"
              >
                <CIcon name="cil-trash" />
              </CButton>
              <CButton
                color="success"
                size="sm"
                v-c-tooltip="{
                  content: 'Edit Ketersediaan Tenaga Ahli',
                  placement: 'bottom',
                }"
              >
                <CIcon name="cil-pencil" />
              </CButton>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <h5>Tenaga Ahli Yang Dibutuhkan</h5>
    <hr />
    <a href="" @click.prevent="editSystem">Tambah Tenaga Ahli</a>
    <div class="table-responsive">
      <table class="table table-stripped">
        <thead>
          <tr>
            <td>No</td>
            <td>Jenis</td>
            <td>Jumlah</td>
            <td>Kompetensi</td>
            <td>Aksi</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Data Dummy</td>
            <td>Data Dummy</td>
            <td>Data Dummy</td>
            <td>
              <CButton
                color="danger"
                size="sm"
                class="mr-2"
                v-c-tooltip="{
                  content: 'Hapus Tenaga Ahli',
                  placement: 'bottom',
                }"
              >
                <CIcon name="cil-trash" />
              </CButton>
              <CButton
                color="success"
                size="sm"
                v-c-tooltip="{
                  content: 'Edit Tenaga Ahli',
                  placement: 'bottom',
                }"
              >
                <CIcon name="cil-pencil" />
              </CButton>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SystemExperts',
}
</script>

<style></style>

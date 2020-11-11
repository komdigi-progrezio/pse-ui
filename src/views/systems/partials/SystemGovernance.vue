<template>
  <div class="mt-2">
    <h5>Dasar Hukum</h5>
    <div class="form-group">
      <label for="name">Data Tersedia ? </label>
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
    <a href="" @click.prevent="editSystem">Tambah Dasar Hukum</a>
    <div class="table-responsive">
      <table class="table table-stripped">
        <thead>
          <tr>
            <td>No</td>
            <td>Nama Sistem</td>
            <td>Keterangan</td>
            <td>Aksi</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Data Dummy</td>
            <td>Data Dummy</td>
            <td>
              <CButton
                color="danger"
                size="sm"
                class="mr-2"
                v-c-tooltip="{
                  content: 'Hapus Dasar Hukum',
                  placement: 'bottom',
                }"
              >
                <CIcon name="cil-trash" />
              </CButton>
              <CButton
                color="success"
                size="sm"
                v-c-tooltip="{
                  content: 'Edit Dasar Hukum',
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
    <h5>SOP</h5>
    <div class="form-group">
      <label for="name">Data Tersedia ? </label>
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
    <a href="" @click.prevent="editSystem">Tambah SOP</a>
    <div class="table-responsive">
      <table class="table table-stripped">
        <thead>
          <tr>
            <td>No</td>
            <td>Nama Sistem</td>
            <td>Keterangan</td>
            <td>Aksi</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Data Dummy</td>
            <td>Data Dummy</td>
            <td>
              <CButton
                color="danger"
                size="sm"
                class="mr-2"
                v-c-tooltip="{
                  content: 'Hapus SOP',
                  placement: 'bottom',
                }"
              >
                <CIcon name="cil-trash" />
              </CButton>
              <CButton
                color="success"
                size="sm"
                v-c-tooltip="{
                  content: 'Edit SOP',
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
  name: 'SystemGovernance',
}
</script>

<style></style>

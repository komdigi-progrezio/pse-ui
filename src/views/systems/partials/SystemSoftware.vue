<template>
  <div class="mt-2">
    <h5>Perangkat Lunak Utama</h5>
    <hr />
    <a href="" @click.prevent="editSystem">Tambah Perangkat Lunak Utama</a>
    <div class="table-responsive">
      <table class="table table-stripped">
        <thead>
          <tr>
            <td>No</td>
            <td>Nama</td>
            <td>Jenis</td>
            <td>Penyedia Perangkat Lunak</td>
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
                  content: 'Hapus Perangkat Lunak Utama',
                  placement: 'bottom',
                }"
              >
                <CIcon name="cil-trash" />
              </CButton>
              <CButton
                color="success"
                size="sm"
                v-c-tooltip="{
                  content: 'Edit Perangkat Lunak Utama',
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
    <h5>Perangkat Lunak Pendukung</h5>
    <hr />
    <a href="" @click.prevent="editSystem">Tambah Perangkat Lunak Pendukung</a>
    <div class="table-responsive">
      <table class="table table-stripped">
        <thead>
          <tr>
            <td>No</td>
            <td>Jenis Perangkat Lunas</td>
            <td>Deskripsi</td>
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
                  content: 'Hapus Perangkat Lunak Pendukung',
                  placement: 'bottom',
                }"
              >
                <CIcon name="cil-trash" />
              </CButton>
              <CButton
                color="success"
                size="sm"
                v-c-tooltip="{
                  content: 'Edit Perangkat Lunak Pendukung',
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
  name: 'SystemSoftware',
}
</script>

<style></style>

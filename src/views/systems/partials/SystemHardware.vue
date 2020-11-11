<template>
  <div class="mt-2">
    <h5>Perangkat Keras Utama</h5>
    <hr />
    <a href="" @click.prevent="editSystem">Tambah Perangkat Keras Utama</a>
    <div class="table-responsive">
      <table class="table table-stripped">
        <thead>
          <tr>
            <td>No</td>
            <td>Jenis</td>
            <td>Pemilik</td>
            <td>Bandwith</td>
            <td>Processor</td>
            <td>Memory</td>
            <td>Digunakan Bersama - Sama ?</td>
            <td>Aksi</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Data Dummy</td>
            <td>Data Dummy</td>
            <td>Data Dummy</td>
            <td>Data Dummy</td>
            <td>Data Dummy</td>
            <td>Data Dummy</td>
            <td>
              <CButton
                color="danger"
                size="sm"
                class="mr-2"
                v-c-tooltip="{
                  content: 'Hapus Perangkat Keras Utama',
                  placement: 'bottom',
                }"
              >
                <CIcon name="cil-trash" />
              </CButton>
              <CButton
                color="success"
                size="sm"
                v-c-tooltip="{
                  content: 'Edit Perangkat Keras Utama',
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
    <h5>Perangkat Jaringan</h5>
    <hr />
    <a href="" @click.prevent="editSystem">Tambah Perangkat Jaringan</a>
    <div class="table-responsive">
      <table class="table table-stripped">
        <thead>
          <tr>
            <td>No</td>
            <td>Jenis</td>
            <td>Tipe</td>
            <td>Keterangan</td>
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
                  content: 'Hapus Perangkat Jaringan',
                  placement: 'bottom',
                }"
              >
                <CIcon name="cil-trash" />
              </CButton>
              <CButton
                color="success"
                size="sm"
                v-c-tooltip="{
                  content: 'Edit Perangkat Jaringan',
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
    <h5>Perangkat Khusus</h5>
    <hr />
    <a href="" @click.prevent="editSystem">Tambah Perangkat Khusus</a>
    <div class="table-responsive">
      <table class="table table-stripped">
        <thead>
          <tr>
            <td>No</td>
            <td>Jenis</td>
            <td>Tipe</td>
            <td>Keterangan</td>
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
                  content: 'Hapus Perangkat Khusus',
                  placement: 'bottom',
                }"
              >
                <CIcon name="cil-trash" />
              </CButton>
              <CButton
                color="success"
                size="sm"
                v-c-tooltip="{
                  content: 'Edit Perangkat Khusus',
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
  name: 'SystemHardware',
}
</script>

<style></style>

<template>
  <div class="mt-2">
    <h5>Profil Penyelenggara Sistem Elektronik </h5>
    <hr />
    <a href="" @click.prevent="editSystem">Perbaharui Profil Penyelenggara</a>
    <div class="table-responsive">
      <table class="table table-stripped">
        <tbody>
          <tr class="row-profile-service">
            <td colspan="2">Profil Penyelenggara</td>
          </tr>
          <tr>
            <td>Nama Satuan Kerja</td>
            <td>Data Dummy</td>
          </tr>
          <tr>
            <td>Alamat</td>
            <td>Data Dummy</td>
          </tr>
          <tr>
            <td>Provinsi</td>
            <td>Rendah (Tidak ada Dokumen)</td>
          </tr>
          <tr>
            <td>Kota / Kabupaten</td>
            <td>Data Dummy</td>
          </tr>
          <tr>
            <td>Kode POS</td>
            <td>Data Dummy</td>
          </tr>
          <tr>
            <td>No Telepon</td>
            <td>Data Dummy</td>
          </tr>
          <tr>
            <td>Website</td>
            <td>Data Dummy</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SystemOrganizerProfile',
}
</script>

<style></style>

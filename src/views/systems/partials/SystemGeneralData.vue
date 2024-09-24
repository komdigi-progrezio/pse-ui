<template>
  <div class="mt-lg-2">
    <router-link
      v-if="system.is_locked !== true"
      tag="button"
      :to="`/admin/systems/${this.$route.params.id}/edit`"
      class="btn btn-link d-flex"
    >
      <CIcon name="cil-pencil" class="align-self-center mr-2" />

      <span class="align-self-center"> Perbaharui Profil Layanan </span>
    </router-link>
    <div class="table-responsive classic">
      <table class="table table-stripped">
        <tbody>
          <tr class="row-profile-service">
            <td colspan="2"><strong>Profil Layanan</strong></td>
          </tr>
          <tr>
            <td>Nama Internal</td>
            <td>{{ system.nama_internal }}</td>
          </tr>
          <tr>
            <td>Nama Eksternal</td>
            <td>{{ system.nama_eksternal }}</td>
          </tr>
          <tr>
            <td>Keterangan</td>
            <td>{{ system.deskripsi }}</td>
          </tr>
          <tr>
            <td>Kategori Sistem Elektronik</td>
            <td>
              {{ system.name_sifat_khusus }}
              <span v-if="document.length > 0"> (Ada Dokumen) </span>
              <span v-else> (Tidak Ada Dokumen) </span>
            </td>
          </tr>
          <tr>
            <td>Kategori Akses</td>
            <td>{{ system.kategori_akses }}</td>
          </tr>
          <template v-if="system.kategori_akses == 'Online'">
            <tr>
              <td>URL Aplikasi</td>
              <td>{{ system.url }}</td>
            </tr>
          </template>
          <tr>
            <td
              >Bersedia untuk dipublikasikan melalui portal layanan publik?</td
            >
            <td>{{ system.name_publish }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <h5>Fungsi Utama</h5>
    <hr />
    <button
      v-if="system.is_locked !== true"
      class="btn btn-link d-flex"
      @click.prevent="addMainFunction"
    >
      <CIcon name="cil-plus" class="align-self-center mr-2" />
      <a href="" class="align-self-center">Tambah Fungsi</a>
    </button>
    <div class="table-responsive classic">
      <table class="table table-stripped">
        <thead>
          <tr>
            <td>No</td>
            <td>Fungsi Sistem</td>
            <td>Keterangan</td>
            <td v-if="system.is_locked !== true" colspan="2">Aksi</td>
          </tr>
        </thead>
        <tbody>
          <template v-if="specialFunction.length > 0">
            <tr
              v-for="(value, index) in specialFunction"
              :key="`special-function-${index}`"
            >
              <td>{{ index + 1 }}</td>
              <td>{{ value.fungsi_sistem }}</td>
              <td>{{ value.keterangan }}</td>
              <td v-if="system.is_locked !== true">
                <CButton
                  color="danger"
                  size="sm"
                  class="mr-2"
                  v-c-tooltip="{
                    content: 'Hapus Fungsi Utama',
                    placement: 'bottom',
                  }"
                  @click="destroyMainFunction(value)"
                >
                  <CIcon name="cil-trash" />
                </CButton>
                <CButton
                  color="success"
                  size="sm"
                  v-c-tooltip="{
                    content: 'Edit Fungsi Utama',
                    placement: 'bottom',
                  }"
                  @click="editMainFunction(value)"
                >
                  <CIcon name="cil-pencil" />
                </CButton>
              </td>
            </tr>
          </template>
          <template v-else>
            <tr>
              <td colspan="5" class="text-center">Data Kosong</td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
    <h5>Ruang Lingkup</h5>
    <hr />
    <button
      v-if="system.is_locked !== true"
      class="btn btn-link d-flex"
      @click.prevent="addScope"
    >
      <CIcon name="cil-plus" class="align-self-center mr-2" />
      <a href="" class="align-self-center">Tambah Ruang Lingkup</a>
    </button>
    <div class="table-responsive classic">
      <table class="table table-stripped">
        <thead>
          <tr>
            <td>No</td>
            <td>Ruang Lingkup</td>
            <td v-if="system.is_locked !== true" colspan="2">Aksi</td>
          </tr>
        </thead>
        <tbody>
          <template v-if="scope.length > 0">
            <tr v-for="(value, index) in scope" :key="`scope-${index}`">
              <td>{{ index + 1 }}</td>
              <td>{{ value.relation.scope }}</td>
              <td v-if="system.is_locked !== true">
                <CButton
                  color="danger"
                  size="sm"
                  class="mr-2"
                  v-c-tooltip="{
                    content: 'Hapus Ruang Lingkup',
                    placement: 'bottom',
                  }"
                  @click="destroyScope(value)"
                >
                  <CIcon name="cil-trash" />
                </CButton>
                <CButton
                  color="success"
                  size="sm"
                  v-c-tooltip="{
                    content: 'Edit Ruang Lingkup',
                    placement: 'bottom',
                  }"
                  @click="editScope(value)"
                >
                  <CIcon name="cil-pencil" />
                </CButton>
              </td>
            </tr>
          </template>
          <template v-else>
            <tr>
              <td colspan="4" class="text-center">Data Kosong</td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
    <h5>Jenis Layanan</h5>
    <hr />
    <button
      v-if="system.is_locked !== true"
      class="btn btn-link d-flex"
      @click.prevent="addKindOfService"
    >
      <CIcon name="cil-plus" class="align-self-center mr-2" />
      <a href="" class="align-self-center">Tambah Jenis Layanan</a>
    </button>
    <div class="table-responsive classic">
      <table class="table table-stripped">
        <thead>
          <tr>
            <td>No</td>
            <td>Jenis Layanan</td>
            <td>Keterangan</td>
            <td v-if="system.is_locked !== true" colspan="2">Aksi</td>
          </tr>
        </thead>
        <tbody>
          <template v-if="kindOfService.length > 0">
            <tr
              v-for="(value, index) in kindOfService"
              :key="`kind-of-service-${index}`"
            >
              <td>{{ index + 1 }}</td>
              <td>{{ value.jenis_layanan }}</td>
              <td>{{ value.keterangan }}</td>
              <td v-if="system.is_locked !== true">
                <CButton
                  color="danger"
                  size="sm"
                  class="mr-2"
                  v-c-tooltip="{
                    content: 'Hapus Jenis Layanan',
                    placement: 'bottom',
                  }"
                  @click="destroyKindOfService(value)"
                >
                  <CIcon name="cil-trash" />
                </CButton>
                <CButton
                  color="success"
                  size="sm"
                  v-c-tooltip="{
                    content: 'Edit Jenis Layanan',
                    placement: 'bottom',
                  }"
                  @click="editKindOfService(value)"
                >
                  <CIcon name="cil-pencil" />
                </CButton>
              </td>
            </tr>
          </template>
          <template v-else>
            <tr>
              <td colspan="5" class="text-center">Data Kosong</td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
    <h5>Sistem Pengamanan</h5>
    <hr />
    <button
      v-if="system.is_locked !== true"
      class="btn btn-link d-flex"
      @click.prevent="addSecurity"
    >
      <CIcon name="cil-plus" class="align-self-center mr-2" />
      <a href="" class="align-self-center">Tambah Sistem Pengamanan</a>
    </button>
    <div class="table-responsive classic">
      <table class="table table-stripped">
        <thead>
          <tr>
            <td>No</td>
            <td>Nama Sistem</td>
            <td>Keterangan</td>
            <td v-if="system.is_locked !== true" colspan="2">Aksi</td>
          </tr>
        </thead>
        <tbody>
          <template v-if="security.length > 0">
            <tr v-for="(value, index) in security" :key="`security-${index}`">
              <td>{{ index + 1 }}</td>
              <td>{{ value.nama_sistem }}</td>
              <td>{{ value.keterangan }}</td>
              <td v-if="system.is_locked !== true">
                <CButton
                  color="danger"
                  size="sm"
                  class="mr-2"
                  v-c-tooltip="{
                    content: 'Hapus Sistem Pengamanan',
                    placement: 'bottom',
                  }"
                  @click="destroySecurity(value)"
                >
                  <CIcon name="cil-trash" />
                </CButton>
                <CButton
                  color="success"
                  size="sm"
                  v-c-tooltip="{
                    content: 'Edit Sistem Pengamanan',
                    placement: 'bottom',
                  }"
                  @click="editSecurity(value)"
                >
                  <CIcon name="cil-pencil" />
                </CButton>
              </td>
            </tr>
          </template>
          <template v-else>
            <tr>
              <td colspan="5" class="text-center">Data Kosong</td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
    <h5>Sistem Terkait</h5>
    <hr />
    <button
      v-if="system.is_locked !== true"
      class="btn btn-link d-flex"
      @click.prevent="addRelated"
    >
      <CIcon name="cil-plus" class="align-self-center mr-2" />
      <a href="" class="align-self-center">Tambah Sistem Terkait</a>
    </button>
    <div class="table-responsive classic">
      <table class="table table-stripped">
        <thead>
          <tr>
            <td>No</td>
            <td>Nama Sistem Terkait</td>
            <td>Keterangan</td>
            <td v-if="system.is_locked !== true" colspan="2">Aksi</td>
          </tr>
        </thead>
        <tbody>
          <template v-if="related.length > 0">
            <tr
              v-for="(value, index) in related"
              :key="`special-function-${index}`"
            >
              <td>{{ index + 1 }}</td>
              <td>{{ value.label_sistem }}</td>
              <td>{{ value.keterangan }}</td>
              <td v-if="system.is_locked !== true">
                <CButton
                  color="danger"
                  size="sm"
                  class="mr-2"
                  v-c-tooltip="{
                    content: 'Hapus Sistem Terkait',
                    placement: 'bottom',
                  }"
                  @click="destroyRelated(value)"
                >
                  <CIcon name="cil-trash" />
                </CButton>
                <CButton
                  color="success"
                  size="sm"
                  v-c-tooltip="{
                    content: 'Edit Sistem Terkait',
                    placement: 'bottom',
                  }"
                  @click="editRelated(value)"
                >
                  <CIcon name="cil-pencil" />
                </CButton>
              </td>
            </tr>
          </template>
          <template v-else>
            <tr>
              <td colspan="5" class="text-center">Data Kosong</td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
    <h5>Sertifikasi</h5>
    <hr />
    <button
      v-if="system.is_locked !== true"
      class="btn btn-link d-flex"
      @click.prevent="addCertificate"
    >
      <CIcon name="cil-plus" class="align-self-center mr-2" />
      <a href="" class="align-self-center">Tambah Sertifikasi</a>
    </button>
    <div class="table-responsive classic">
      <table class="table table-stripped">
        <thead>
          <tr>
            <td>No</td>
            <td>No Sertifikat</td>
            <td>Nama Sertifikat</td>
            <td>Institusi</td>
            <td>Tanggal Diterbitkan</td>
            <td>Mulai Berlaku</td>
            <td>Tanggal Berakhir</td>
            <td>Ruang Lingkup</td>
            <td>Masa Berlaku</td>
            <td v-if="system.is_locked !== true" colspan="3">Aksi</td>
          </tr>
        </thead>
        <tbody>
          <template v-if="certificate.length > 0">
            <tr
              v-for="(value, index) in certificate"
              :key="`certificate-${index}`"
            >
              <td>{{ index + 1 }}</td>
              <td>{{ value.no_sertifikat }}</td>
              <td>{{ value.nama_sertifikat }}</td>
              <td>{{ value.nama_institusi }}</td>
              <td>{{ value.tgl_terbit }}</td>
              <td>{{ value.tgl_mulai }}</td>
              <td>{{ value.tgl_expire }}</td>
              <td>{{ value.ruang_lingkup }}</td>
              <td>{{ value.masa_berlaku }}</td>
              <td v-if="system.is_locked !== true">
                <CButton
                  color="danger"
                  size="sm"
                  class="mr-2"
                  v-c-tooltip="{
                    content: 'Hapus Sertifikasi',
                    placement: 'bottom',
                  }"
                  @click="destroyCertificate(value)"
                >
                  <CIcon name="cil-trash" />
                </CButton>
                <CButton
                  color="primary"
                  size="sm"
                  class="mr-2"
                  v-c-tooltip="{
                    content: 'Download Sertifikasi',
                    placement: 'bottom',
                  }"
                  @click="showFile(value.url_file)"
                >
                  <CIcon name="cil-cloud-download" />
                </CButton>
                <CButton
                  color="success"
                  size="sm"
                  v-c-tooltip="{
                    content: 'Edit Sertifikasi',
                    placement: 'bottom',
                  }"
                  @click="editCertificate(value)"
                >
                  <CIcon name="cil-pencil" />
                </CButton>
              </td>
            </tr>
          </template>
          <template v-else>
            <tr>
              <td colspan="12" class="text-center">Data Kosong</td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
    <h5>Pengguna Layanan</h5>
    <hr />
    <button
      v-if="system.is_locked !== true"
      class="btn btn-link d-flex"
      @click.prevent="addServiceUsers"
    >
      <CIcon name="cil-plus" class="align-self-center mr-2" />
      <a href="" class="align-self-center">Tambah Pengguna Layanan</a>
    </button>
    <div class="table-responsive classic">
      <table class="table table-stripped">
        <thead>
          <tr>
            <td>No</td>
            <td>Jenis Pengguna</td>
            <td>Keterangan</td>
            <td v-if="system.is_locked !== true" colspan="2">Aksi</td>
          </tr>
        </thead>
        <tbody>
          <template v-if="serviceUser.length > 0">
            <tr
              v-for="(value, index) in serviceUser"
              :key="`service-user-${index}`"
            >
              <td>{{ index + 1 }}</td>
              <td>{{ value.nama_jenis_pengguna }}</td>
              <td>{{ value.keterangan }}</td>
              <td v-if="system.is_locked !== true">
                <CButton
                  color="danger"
                  size="sm"
                  class="mr-2"
                  v-c-tooltip="{
                    content: 'Hapus Pengguna Layanan',
                    placement: 'bottom',
                  }"
                  @click="destroyServiceUsers(value)"
                >
                  <CIcon name="cil-trash" />
                </CButton>
                <CButton
                  color="success"
                  size="sm"
                  v-c-tooltip="{
                    content: 'Edit Pengguna Layanan',
                    placement: 'bottom',
                  }"
                  @click="editServiceUsers(value)"
                >
                  <CIcon name="cil-pencil" />
                </CButton>
              </td>
            </tr>
          </template>
          <template v-else>
            <tr>
              <td colspan="5" class="text-center">Data Kosong</td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>
    <CModal
      v-if="system.is_locked !== true"
      :title="modal.delete.title"
      :color="modal.delete.color"
      :show.sync="modal.delete.showModal"
    >
      <template v-slot:body-wrapper>
        <div class="modal-body">
          <p>
            {{ modal.delete.message }}
            <strong>{{ modal.delete.data }}</strong
            >?
          </p>
        </div>
      </template>
      <template v-slot:footer>
        <CButton
          color="secondary"
          size="sm"
          class="m-2"
          @click="closeModalDelete"
        >
          Cancel
        </CButton>
        <CButton color="primary" size="sm" class="m-2" @click="submitDelete">
          {{ modal.delete.labelButton }}
        </CButton>
      </template>
    </CModal>
    <ValidationObserver
      v-if="system.is_locked !== true"
      v-slot="{ invalid }"
      ref="form_main_function"
    >
      <CModal
        :title="modal.mainFunction.title"
        :color="modal.mainFunction.color"
        :show.sync="modal.mainFunction.showModal"
      >
        <template v-slot:body-wrapper>
          <div class="modal-body">
            <CRow>
              <CCol sm="12">
                <div class="form-group">
                  <label for="fungsi_sistem">Fungsi Sistem<span class="text-danger">*</span></label>
                  <ValidationProvider
                    name="Fungsi Sistem"
                    rules="required|alpha_spaces"
                    v-slot="{ errors }"
                  >
                    <input
                      v-model="forms.mainFunction.fungsi_sistem"
                      type="text"
                      name="name"
                      placeholder="Masukan Fungsi Sistem"
                      class="form-control"
                      :class="{
                        'is-invalid':
                          errors.length > 0 ||
                          errorValidations.mainFunction.fungsi_sistem.length >
                            0,
                      }"
                      @blur="errorValidations.mainFunction.fungsi_sistem = []"
                    />
                    <div v-if="errors.length > 0" class="invalid-feedback">
                      {{ errors[0] }}
                    </div>
                  </ValidationProvider>
                  <message
                    :messages="errorValidations.mainFunction.fungsi_sistem"
                  />
                </div>
              </CCol>
              <CCol sm="12">
                <label for="keterangan">Keterangan<span class="text-danger">*</span></label>
                <ValidationProvider
                  name="Keterangan"
                  rules="required|alpha_spaces"
                  v-slot="{ errors }"
                >
                  <textarea
                    v-model="forms.mainFunction.keterangan"
                    name="keterangan"
                    cols="10"
                    rows="10"
                    class="form-control"
                    :class="{
                      'is-invalid':
                        errors.length > 0 ||
                        errorValidations.mainFunction.keterangan.length >
                          0,
                    }"
                  ></textarea>
                  <div v-if="errors.length > 0" class="invalid-feedback">
                    {{ errors[0] }}
                  </div>
                </ValidationProvider>
                <message :messages="errorValidations.mainFunction.keterangan" />
              </CCol>
            </CRow>
          </div>
        </template>
        <template v-slot:footer>
          <CButton
            color="secondary"
            size="sm"
            class="m-2"
            @click="closeModalMainFunction"
          >
            Cancel
          </CButton>
          <CButton
            color="primary"
            size="sm"
            class="m-2"
            @click="submitMainFunction"
            :disabled="invalid"
          >
            {{ modal.mainFunction.labelButton }}
          </CButton>
        </template>
      </CModal>
    </ValidationObserver>
    <ValidationObserver
      v-if="system.is_locked !== true"
      v-slot="{ invalid }"
      ref="form_scope"
    >
      <CModal
        :title="modal.scope.title"
        :color="modal.scope.color"
        :show.sync="modal.scope.showModal"
      >
        <template v-slot:body-wrapper>
          <div class="modal-body">
            <CRow>
              <CCol sm="12">
                <div class="form-check">
                  <label for="ruang_lingkup">Ruang Lingkup<span class="text-danger">*</span></label>
                  <ValidationProvider
                    name="Ruang Lingkup"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <CRow>
                      <CCol
                        v-for="(value, index) in dataSelect.scope"
                        sm="6"
                        md="6"
                        lg="6"
                        :key="`scope-${index}`"
                      >
                        <input
                          type="checkbox"
                          :value="value.id"
                          v-model="forms.scope.ruang_lingkup"
                          class="form-check-input"
                          :id="value.id"
                        />
                        <label class="form-check-label" :for="value.id">{{
                          value.param_value
                        }}</label>
                      </CCol>
                    </CRow>
                    <div v-if="errors.length > 0" class="invalid-feedback">
                      {{ errors[0] }}
                    </div>
                  </ValidationProvider>
                  <message :messages="errorValidations.scope.ruang_lingkup" />
                </div>
                <div class="form-group">
                  <label for="param_name">Sektor Lainnya</label>
                  <input
                    v-model="forms.scope.param_name"
                    type="text"
                    name="name"
                    placeholder="Masukan Sektor Lainnya"
                    class="form-control"
                  />
                </div>
              </CCol>
            </CRow>
          </div>
        </template>
        <template v-slot:footer>
          <CButton
            color="secondary"
            size="sm"
            class="m-2"
            @click="closeModalScope"
          >
            Cancel
          </CButton>
          <CButton
            color="primary"
            size="sm"
            class="m-2"
            @click="submitScope"
            :disabled="invalid"
          >
            {{ modal.scope.labelButton }}
          </CButton>
        </template>
      </CModal>
    </ValidationObserver>
    <ValidationObserver
      v-if="system.is_locked !== true"
      v-slot="{ invalid }"
      ref="form_kind_of_service"
    >
      <CModal
        :title="modal.kindOfService.title"
        :color="modal.kindOfService.color"
        :show.sync="modal.kindOfService.showModal"
      >
        <template v-slot:body-wrapper>
          <div class="modal-body">
            <CRow>
              <CCol sm="12">
                <div class="form-group">
                  <label for="jenis_layanan">Jenis Layanan<span class="text-danger">*</span></label>
                  <ValidationProvider
                    name="Jenis Layanan"
                    rules="required|alpha_spaces"
                    v-slot="{ errors }"
                  >
                    <input
                      v-model="forms.kindOfService.jenis_layanan"
                      type="text"
                      name="name"
                      placeholder="Masukan Jenis Layanan"
                      class="form-control"
                      :class="{
                        'is-invalid':
                          errors.length > 0 ||
                          errorValidations.kindOfService.jenis_layanan.length >
                            0,
                      }"
                      @blur="errorValidations.kindOfService.jenis_layanan = []"
                    />
                    <div v-if="errors.length > 0" class="invalid-feedback">
                      {{ errors[0] }}
                    </div>
                  </ValidationProvider>
                  <message
                    :messages="errorValidations.kindOfService.jenis_layanan"
                  />
                </div>
              </CCol>
              <CCol sm="12">
                <label for="keterangan">Keterangan<span class="text-danger">*</span></label>
                <ValidationProvider
                  name="Keterangan"
                  rules="required|alpha_spaces"
                  v-slot="{ errors }"
                >
                  <textarea
                    v-model="forms.kindOfService.keterangan"
                    name="keterangan"
                    cols="10"
                    rows="10"
                    class="form-control"
                    maxlength="100"
                    :class="{
                      'is-invalid':
                        errors.length > 0 ||
                        errorValidations.kindOfService.keterangan.length >
                          0,
                    }"
                  ></textarea>
                  <div v-if="errors.length > 0" class="invalid-feedback">
                    {{ errors[0] }}
                  </div>
                </ValidationProvider>
                <message
                  :messages="errorValidations.kindOfService.keterangan"
                />
              </CCol>
            </CRow>
          </div>
        </template>
        <template v-slot:footer>
          <CButton
            color="secondary"
            size="sm"
            class="m-2"
            @click="closeModalKindOfService"
          >
            Cancel
          </CButton>
          <CButton
            color="primary"
            size="sm"
            class="m-2"
            @click="submitKindOfService"
            :disabled="invalid"
          >
            {{ modal.kindOfService.labelButton }}
          </CButton>
        </template>
      </CModal>
    </ValidationObserver>
    <ValidationObserver
      v-if="system.is_locked !== true"
      v-slot="{ invalid }"
      ref="form_security"
    >
      <CModal
        :title="modal.security.title"
        :color="modal.security.color"
        :show.sync="modal.security.showModal"
      >
        <template v-slot:body-wrapper>
          <div class="modal-body">
            <CRow>
              <CCol sm="12">
                <div class="form-group">
                  <label for="nama_sistem">Nama Sistem<span class="text-danger">*</span></label>
                  <ValidationProvider
                    name="Nama Sistem"
                    rules="required|alpha_spaces"
                    v-slot="{ errors }"
                  >
                    <input
                      v-model="forms.security.nama_sistem"
                      type="text"
                      name="name"
                      placeholder="Masukan Nama Sistem"
                      class="form-control"
                      :class="{
                        'is-invalid':
                          errors.length > 0 ||
                          errorValidations.security.nama_sistem.length > 0,
                      }"
                      @blur="errorValidations.security.nama_sistem = []"
                    />
                    <div v-if="errors.length > 0" class="invalid-feedback">
                      {{ errors[0] }}
                    </div>
                  </ValidationProvider>
                  <message :messages="errorValidations.security.nama_sistem" />
                </div>
              </CCol>
              <CCol sm="12">
                <label for="keterangan">Keterangan<span class="text-danger">*</span></label>
                <ValidationProvider
                  name="Keterangan"
                  rules="required|alpha_spaces"
                  v-slot="{ errors }"
                >
                  <textarea
                    v-model="forms.security.keterangan"
                    name="keterangan"
                    cols="10"
                    rows="10"
                    class="form-control"
                    :class="{
                      'is-invalid':
                        errors.length > 0 ||
                        errorValidations.security.keterangan.length > 0,
                    }"
                  ></textarea>
                  <div v-if="errors.length > 0" class="invalid-feedback">
                    {{ errors[0] }}
                  </div>
                </ValidationProvider>
                <message :messages="errorValidations.security.keterangan" />
              </CCol>
            </CRow>
          </div>
        </template>
        <template v-slot:footer>
          <CButton
            color="secondary"
            size="sm"
            class="m-2"
            @click="closeModalSecurity"
          >
            Cancel
          </CButton>
          <CButton
            color="primary"
            size="sm"
            class="m-2"
            @click="submitSecurity"
            :disabled="invalid"
          >
            {{ modal.security.labelButton }}
          </CButton>
        </template>
      </CModal>
    </ValidationObserver>
    <ValidationObserver
      v-if="system.is_locked !== true"
      v-slot="{ invalid }"
      ref="form_related"
    >
      <CModal
        :title="modal.related.title"
        :color="modal.related.color"
        :show.sync="modal.related.showModal"
      >
        <template v-slot:body-wrapper>
          <div class="modal-body">
            <CRow>
              <CCol sm="12">
                <div class="form-group">
                  <label for="id_sistem">Sistem Terkait<span class="text-danger">*</span></label>
                  <ValidationProvider
                    name="Sistem Terkait"
                    :rules="relatedIdSystem"
                    v-slot="{ errors }"
                  >
                    <select
                      v-model="forms.related.id_sistem"
                      class="form-control"
                      :class="{
                        'is-invalid':
                          errors.length > 0 ||
                          errorValidations.related.id_sistem.length > 0,
                      }"
                    >
                      <option value="">Pilih Sistem Terkait</option>
                      <option
                        v-for="(value, index) in dataSelect.system"
                        :value="value.id"
                        :key="`system-${index}`"
                      >
                        {{ value.nama_eksternal }}
                      </option>
                    </select>
                    <div v-if="errors.length > 0" class="invalid-feedback">
                      {{ errors[0] }}
                    </div>
                  </ValidationProvider>
                  <message :messages="errorValidations.related.id_sistem" />
                </div>
              </CCol>
              <CCol sm="12">
                <div class="form-group">
                  <label for="nama_sistem">Nama Sistem<span class="text-danger">*</span></label>
                  <ValidationProvider
                    name="Nama Sistem"
                    :rules="relatedSystemName"
                    v-slot="{ errors }"
                  >
                    <input
                      v-model="forms.related.nama_sistem"
                      type="text"
                      name="name"
                      placeholder="Masukan Nama Sistem"
                      class="form-control"
                      :class="{
                        'is-invalid':
                          errors.length > 0 ||
                          errorValidations.related.nama_sistem.length > 0,
                      }"
                      @blur="errorValidations.related.nama_sistem = []"
                    />
                    <div v-if="errors.length > 0" class="invalid-feedback">
                      {{ errors[0] }}
                    </div>
                  </ValidationProvider>
                  <message :messages="errorValidations.related.nama_sistem" />
                </div>
              </CCol>
              <CCol sm="12">
                <label for="keterangan">Keterangan</label>
                <textarea
                  v-model="forms.related.keterangan"
                  name="keterangan"
                  cols="10"
                  rows="10"
                  class="form-control"
                ></textarea>
              </CCol>
            </CRow>
          </div>
        </template>
        <template v-slot:footer>
          <CButton
            color="secondary"
            size="sm"
            class="m-2"
            @click="closeModalRelated"
          >
            Cancel
          </CButton>
          <CButton
            color="primary"
            size="sm"
            class="m-2"
            @click="submitRelated"
            :disabled="invalid"
          >
            {{ modal.related.labelButton }}
          </CButton>
        </template>
      </CModal>
    </ValidationObserver>
    <ValidationObserver
      v-if="system.is_locked !== true"
      v-slot="{ invalid }"
      ref="form_certificate"
    >
      <CModal
        :title="modal.certificate.title"
        :color="modal.certificate.color"
        :show.sync="modal.certificate.showModal"
      >
        <template v-slot:body-wrapper>
          <div class="modal-body">
            <CRow>
              <CCol sm="12">
                <div class="form-group">
                  <label for="nama_sertifikat">Nama Sertifikat<span class="text-danger">*</span></label>
                  <ValidationProvider
                    name="Nama Sertifikat"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <input
                      v-model="forms.certificate.nama_sertifikat"
                      type="text"
                      name="name"
                      placeholder="Masukan Nama Sertifikat"
                      class="form-control"
                      :class="{
                        'is-invalid':
                          errors.length > 0 ||
                          errorValidations.certificate.nama_sertifikat.length >
                            0,
                      }"
                      @blur="errorValidations.certificate.nama_sertifikat = []"
                    />
                    <div v-if="errors.length > 0" class="invalid-feedback">
                      {{ errors[0] }}
                    </div>
                  </ValidationProvider>
                  <message
                    :messages="errorValidations.certificate.nama_sertifikat"
                  />
                </div>
              </CCol>
              <CCol sm="12">
                <div class="form-group">
                  <label for="nama_institusi">Nama Institusi<span class="text-danger">*</span></label>
                  <ValidationProvider
                    name="Nama Institusi"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <input
                      v-model="forms.certificate.nama_institusi"
                      type="text"
                      name="name"
                      placeholder="Masukan Nama Institusi"
                      class="form-control"
                      :class="{
                        'is-invalid':
                          errors.length > 0 ||
                          errorValidations.certificate.nama_institusi.length >
                            0,
                      }"
                      @blur="errorValidations.certificate.nama_institusi = []"
                    />
                    <div v-if="errors.length > 0" class="invalid-feedback">
                      {{ errors[0] }}
                    </div>
                  </ValidationProvider>
                  <message
                    :messages="errorValidations.certificate.nama_institusi"
                  />
                </div>
              </CCol>
              <CCol sm="12">
                <div class="form-group">
                  <label for="tgl_terbit">Tanggal Terbit<span class="text-danger">*</span></label>
                  <ValidationProvider
                    name="Tanggal Terbit"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <date-picker
                      v-model="forms.certificate.tgl_terbit"
                      name="tgl_terbit"
                      :config="optionTanggalTerbit"
                      class="form-control"
                      :class="{
                        'is-invalid':
                          errors.length > 0 ||
                          errorValidations.certificate.tgl_terbit.length > 0,
                      }"
                      @input="changeMinDate"
                    />
                    <div v-if="errors.length > 0" class="invalid-feedback">
                      {{ errors[0] }}
                    </div>
                  </ValidationProvider>
                  <message
                    :messages="errorValidations.certificate.tgl_terbit"
                  />
                </div>
              </CCol>
              <CCol sm="12">
                <div class="form-group">
                  <label for="tgl_expire">Tanggal Habis Berlaku<span class="text-danger">*</span></label>
                  <ValidationProvider
                    name="Tanggal Habis Berlaku"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <date-picker
                      v-model="forms.certificate.tgl_expire"
                      name="tgl_expire"
                      :config="optionTanggalHabisBerlaku"
                      class="form-control"
                      :class="{
                        'is-invalid':
                          errors.length > 0 ||
                          errorValidations.certificate.tgl_expire.length > 0,
                      }"
                    />
                    <div v-if="errors.length > 0" class="invalid-feedback">
                      {{ errors[0] }}
                    </div>
                  </ValidationProvider>
                  <message
                    :messages="errorValidations.certificate.tgl_expire"
                  />
                </div>
              </CCol>
              <CCol sm="12">
                <div class="form-group">
                  <label for="masa_berlaku">Masa Berlaku<span class="text-danger">*</span></label>
                  <ValidationProvider
                    name="Masa Berlaku"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <input
                      v-model="forms.certificate.masa_berlaku"
                      type="text"
                      name="name"
                      placeholder="Masukan Masa Berlaku"
                      class="form-control"
                      :class="{
                        'is-invalid':
                          errors.length > 0 ||
                          errorValidations.certificate.masa_berlaku.length > 0,
                      }"
                      @blur="errorValidations.certificate.masa_berlaku = []"
                    />
                    <div v-if="errors.length > 0" class="invalid-feedback">
                      {{ errors[0] }}
                    </div>
                  </ValidationProvider>
                  <message
                    :messages="errorValidations.certificate.masa_berlaku"
                  />
                </div>
              </CCol>
              <CCol sm="12">
                <div class="form-group">
                  <label for="no_sertifikat">Nomor Sertifikat<span class="text-danger">*</span></label>
                  <ValidationProvider
                    name="Nomor Sertifikat"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <input
                      v-model="forms.certificate.no_sertifikat"
                      type="text"
                      name="name"
                      placeholder="Masukan Nomor Sertifikat"
                      class="form-control"
                      :class="{
                        'is-invalid':
                          errors.length > 0 ||
                          errorValidations.certificate.no_sertifikat.length > 0,
                      }"
                      @blur="errorValidations.certificate.no_sertifikat = []"
                    />
                    <div v-if="errors.length > 0" class="invalid-feedback">
                      {{ errors[0] }}
                    </div>
                  </ValidationProvider>
                  <message
                    :messages="errorValidations.certificate.no_sertifikat"
                  />
                </div>
              </CCol>
              <CCol sm="12">
                <div class="form-group">
                  <label for="ruang_lingkup">Ruang Lingkup<span class="text-danger">*</span></label>
                  <ValidationProvider
                    name="Ruang Lingkup"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <textarea
                      v-model="forms.certificate.ruang_lingkup"
                      type="text"
                      name="name"
                      placeholder="Masukan Ruang Lingkup"
                      class="form-control"
                      :class="{
                        'is-invalid':
                          errors.length > 0 ||
                          errorValidations.certificate.ruang_lingkup.length > 0,
                      }"
                      @blur="errorValidations.certificate.ruang_lingkup = []"
                    />
                    <div v-if="errors.length > 0" class="invalid-feedback">
                      {{ errors[0] }}
                    </div>
                  </ValidationProvider>
                  <message
                    :messages="errorValidations.certificate.ruang_lingkup"
                  />
                </div>
              </CCol>
              <CCol sm="12">
                <div class="form-group">
                  <label for="dokumen">Dokumen<span class="text-danger">*</span></label>
                  <ValidationProvider
                    name="Dokumen"
                    rules="required|mimes:application/pdf"
                    v-slot="{ errors, validate }"
                  >
                    <div class="custom-file">
                      <input
                        type="file"
                        class="custom-file-input"
                        id="customFile"
                        @change="onFilePicked($event) || validate($event)"
                        accept="application/pdf"
                      />
                      <label class="custom-file-label" for="customFile">
                        {{ label.certificate.file }}
                      </label>
                    </div>
                    <div
                      v-if="errors.length > 0"
                      :class="{
                        'has-error-file': errors.length > 0,
                      }"
                    >
                      {{ errors[0] }}
                    </div>
                  </ValidationProvider>
                  <message :messages="errorValidations.certificate.dokumen" />
                  <small class="text-danger">Max ukuran file upload 3MB</small><br/>
                  <template v-if="modal.certificate.method === 'patch'">
                    <a
                      href=""
                      @click.prevent="showFile(label.certificate.url_file)"
                      >Lihat File</a
                    >
                  </template>
                </div>
              </CCol>
              <CCol sm="12">
                <div class="form-group">
                  <label for="tgl_mulai">Tanggal Mulai<span class="text-danger">*</span></label>
                  <ValidationProvider
                    name="Tanggal Mulai"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <date-picker
                      v-model="forms.certificate.tgl_mulai"
                      name="tgl_mulai"
                      :config="optionTanggalHabisBerlaku"
                      class="form-control"
                      :class="{
                        'is-invalid':
                          errors.length > 0 ||
                          errorValidations.certificate.tgl_mulai.length > 0,
                      }"
                    />
                    <div v-if="errors.length > 0" class="invalid-feedback">
                      {{ errors[0] }}
                    </div>
                  </ValidationProvider>
                  <message :messages="errorValidations.certificate.tgl_mulai" />
                </div>
              </CCol>
            </CRow>
          </div>
        </template>
        <template v-slot:footer>
          <CButton
            color="secondary"
            size="sm"
            class="m-2"
            @click="closeModalCertificate"
          >
            Cancel
          </CButton>
          <CButton
            color="primary"
            size="sm"
            class="m-2"
            @click="submitCertificate"
            :disabled="invalid"
          >
            {{ modal.certificate.labelButton }}
          </CButton>
        </template>
      </CModal>
    </ValidationObserver>
    <ValidationObserver
      v-if="system.is_locked !== true"
      v-slot="{ invalid }"
      ref="form_service_users"
    >
      <CModal
        :title="modal.serviceUsers.title"
        :color="modal.serviceUsers.color"
        :show.sync="modal.serviceUsers.showModal"
      >
        <template v-slot:body-wrapper>
          <div class="modal-body">
            <CRow>
              <CCol sm="12">
                <div class="form-group">
                  <label for="jenis_pengguna">Jenis Pengguna<span class="text-danger">*</span></label>
                  <ValidationProvider
                    name="Jenis Pengguna"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <select
                      v-model="forms.serviceUsers.jenis_pengguna"
                      class="form-control"
                      :class="{
                        'is-invalid':
                          errors.length > 0 ||
                          errorValidations.serviceUsers.jenis_pengguna.length >
                            0,
                      }"
                    >
                      <option value="">Pilih Jenis Pengguna</option>
                      <option
                        v-for="(value, index) in dataSelect.serviceUsers"
                        :value="value.id"
                        :key="`system-${index}`"
                      >
                        {{ value.param_value }}
                      </option>
                    </select>
                    <div v-if="errors.length > 0" class="invalid-feedback">
                      {{ errors[0] }}
                    </div>
                  </ValidationProvider>
                  <message
                    :messages="errorValidations.serviceUsers.jenis_pengguna"
                  />
                </div>
              </CCol>
              <CCol sm="12">
                <label for="keterangan">Keterangan<span class="text-danger">*</span></label>
                <ValidationProvider
                  name="Keterangan"
                  rules="required"
                  v-slot="{ errors }"
                >
                  <textarea
                    v-model="forms.serviceUsers.keterangan"
                    name="keterangan"
                    cols="10"
                    rows="10"
                    class="form-control"
                    :class="{
                      'is-invalid':
                        errors.length > 0 ||
                        errorValidations.serviceUsers.keterangan.length > 0,
                    }"
                  ></textarea>
                  <div v-if="errors.length > 0" class="invalid-feedback">
                    {{ errors[0] }}
                  </div>
                </ValidationProvider>
                <message :messages="errorValidations.serviceUsers.keterangan" />
              </CCol>
            </CRow>
          </div>
        </template>
        <template v-slot:footer>
          <CButton
            color="secondary"
            size="sm"
            class="m-2"
            @click="closeModalServiceUsers"
          >
            Cancel
          </CButton>
          <CButton
            color="primary"
            size="sm"
            class="m-2"
            @click="submitServiceUsers"
            :disabled="invalid"
          >
            {{ modal.serviceUsers.labelButton }}
          </CButton>
        </template>
      </CModal>
    </ValidationObserver>
  </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  name: 'SystemGeneralData',
  props: {
    kindOfService: {
      type: Array,
      required: true,
      default: () => [],
    },
    specialFunction: {
      type: Array,
      required: true,
      default: () => [],
    },
    system: {
      type: Object,
      required: true,
      default: () => {},
    },
    scope: {
      type: Array,
      required: true,
      default: () => [],
    },
    document: {
      type: Array,
      required: true,
      default: () => [],
    },
    related: {
      type: Array,
      required: true,
      default: () => [],
    },
    security: {
      type: Array,
      required: true,
      default: () => [],
    },
    certificate: {
      type: Array,
      required: true,
      default: () => [],
    },
    serviceUser: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  data() {
    return {
      dataSelect: {
        scope: [],
        system: [],
        serviceUsers: [],
      },
      label: {
        certificate: {
          file: 'Choose File',
          url_file: null,
        },
      },
      optionTanggalTerbit: {
        format: 'YYYY-MM-DD',
        useCurrent: false,
        showClear: true,
        showClose: true,
        toolbarPlacement: 'top',
        widgetPositioning: {
          vertical: 'bottom',
        },
        icons: {
          time: 'cil-clock',
          date: 'cil-calendar',
          up: 'cil-arrow-top',
          down: 'cil-arrow-bottom',
          previous: 'cil-arrow-left',
          next: 'cil-arrow-right',
          today: 'cil-calendar-today',
          close: 'cil-minus-circle',
        },
        maxDate: dayjs().format('YYYY-MM-DD'),
      },
      optionTanggalHabisBerlaku: {
        format: 'YYYY-MM-DD',
        useCurrent: false,
        showClear: true,
        showClose: true,
        toolbarPlacement: 'top',
        widgetPositioning: {
          vertical: 'bottom',
        },
        icons: {
          time: 'cil-clock',
          date: 'cil-calendar',
          up: 'cil-arrow-top',
          down: 'cil-arrow-bottom',
          previous: 'cil-arrow-left',
          next: 'cil-arrow-right',
          today: 'cil-calendar-today',
          close: 'cil-minus-circle',
        },
        minDate: dayjs().format('YYYY-MM-DD'),
      },
      optionTanggalMulai: {
        format: 'YYYY-MM-DD',
        useCurrent: false,
        showClear: true,
        showClose: true,
        toolbarPlacement: 'top',
        widgetPositioning: {
          vertical: 'bottom',
        },
        icons: {
          time: 'cil-clock',
          date: 'cil-calendar',
          up: 'cil-arrow-top',
          down: 'cil-arrow-bottom',
          previous: 'cil-arrow-left',
          next: 'cil-arrow-right',
          today: 'cil-calendar-today',
          close: 'cil-minus-circle',
        },
        minDate: dayjs().format('YYYY-MM-DD'),
      },
      modal: {
        delete: {
          showModal: false,
          title: null,
          color: null,
          message: null,
          labelButton: null,
          uniqueId: null,
          url: null,
        },
        mainFunction: {
          showModal: false,
          title: null,
          color: null,
          labelButton: null,
          method: null,
          url: null,
        },
        scope: {
          showModal: false,
          title: null,
          color: null,
          labelButton: null,
          method: null,
          url: null,
        },
        kindOfService: {
          showModal: false,
          title: null,
          color: null,
          labelButton: null,
          method: null,
          url: null,
        },
        security: {
          showModal: false,
          title: null,
          color: null,
          labelButton: null,
          method: null,
          url: null,
        },
        related: {
          showModal: false,
          title: null,
          color: null,
          labelButton: null,
          method: null,
          url: null,
        },
        certificate: {
          showModal: false,
          title: null,
          color: null,
          labelButton: null,
          method: null,
          url: null,
        },
        serviceUsers: {
          showModal: false,
          title: null,
          color: null,
          labelButton: null,
          method: null,
          url: null,
        },
      },
      forms: {
        mainFunction: {
          id: null,
          sis_profil_id: this.$route.params.id,
          fungsi_sistem: null,
          keterangan: null,
        },
        scope: {
          id: null,
          sis_profil_id: this.$route.params.id,
          ruang_lingkup: [],
          param_name: null,
          category: 'par_ruang_lingkup',
        },
        kindOfService: {
          id: null,
          sis_profil_id: this.$route.params.id,
          jenis_layanan: null,
          keterangan: null,
        },
        security: {
          id: null,
          sis_profil_id: this.$route.params.id,
          nama_sistem: null,
          keterangan: null,
        },
        related: {
          id: null,
          sis_profil_id: this.$route.params.id,
          nama_sistem: null,
          keterangan: null,
          id_sistem: '',
        },
        certificate: {
          id: null,
          sis_profil_id: this.$route.params.id,
          nama_sertifikat: null,
          nama_institusi: null,
          tgl_terbit: null,
          tgl_mulai: null,
          tgl_expire: null,
          masa_berlaku: null,
          no_sertifikat: null,
          ruang_lingkup: null,
          dokumen: null,
        },
        serviceUsers: {
          id: null,
          sis_profil_id: this.$route.params.id,
          jenis_pengguna: '',
          keterangan: null,
        },
      },
      errorValidations: {
        mainFunction: {
          fungsi_sistem: [],
          keterangan: [],
        },
        scope: {
          ruang_lingkup: [],
        },
        kindOfService: {
          jenis_layanan: [],
          keterangan: [],
        },
        security: {
          nama_sistem: [],
          keterangan: [],
        },
        related: {
          id_sistem: [],
          nama_sistem: [],
        },
        certificate: {
          nama_sertifikat: [],
          nama_institusi: [],
          tgl_terbit: [],
          tgl_mulai: [],
          tgl_expire: [],
          masa_berlaku: [],
          no_sertifikat: [],
          ruang_lingkup: [],
          dokumen: [],
        },
        serviceUsers: {
          jenis_pengguna: [],
          keterangan: [],
        },
      },
    }
  },
  computed: {
    relatedIdSystem() {
      if (this.forms.related.nama_sistem) {
        return ''
      }
      return 'required'
    },
    relatedSystemName() {
      if (this.forms.related.id_sistem) {
        return ''
      }

      return 'required|alpha_dash'
    },
    certificateDocument() {
      if (this.modal.certificate.method === 'patch') {
        return 'mimes:application/pdf'
      }

      return 'required|mimes:application/pdf'
    },
  },
  created() {
    this.fetchScope()
    this.fetchServiceUsers()
    this.fetchSystem()
  },
  methods: {
    //  Fungsi Utama
    clearModalMainFunction() {
      this.modal.mainFunction.title = null
      this.modal.mainFunction.color = null
      this.modal.mainFunction.labelButton = null
      this.modal.mainFunction.method = null
    },
    closeModalMainFunction() {
      this.modal.mainFunction.showModal = false
      this.clearFormMainFunction()
      this.clearModalMainFunction()
    },
    clearFormMainFunction() {
      this.forms.mainFunction.id = null
      this.forms.mainFunction.sis_profil_id = this.$route.params.id
      this.forms.mainFunction.fungsi_sistem = null
      this.forms.mainFunction.keterangan = null
    },
    addMainFunction() {
      this.clearFormMainFunction()
      this.modal.mainFunction.showModal = true
      this.modal.mainFunction.title = 'Tambah Data'
      this.modal.mainFunction.color = 'success'
      this.modal.mainFunction.labelButton = 'Simpan'
      this.modal.mainFunction.method = 'post'
    },
    submitMainFunction() {
      const url = '/special-functions'
      const formData = new FormData()
      let urlAction = null
      if (this.modal.mainFunction.method === 'patch') {
        urlAction = `${url}/${this.forms.mainFunction.id}`
        formData.append('_method', 'patch')
      } else {
        urlAction = url
        formData.append('_method', 'POST')
      }
      const forMapData = Object.entries(this.forms.mainFunction)
      forMapData.forEach((value) => {
        if (Array.isArray(value[1])) {
          for (let index = 0; index < value[1].length; index++) {
            formData.append(`${value[0]}[${index}]`, value[1][index])
          }
        } else {
          formData.append(value[0], value[1] === null ? [] : value[1])
        }
      })
      this.errorValidations.mainFunction.fungsi_sistem = []
      this.errorValidations.mainFunction.keterangan = []

      this.$http({
        method: 'post',
        url: urlAction,
        data: formData,
      })
        .then((response) => {
          this.$emit('update-data')
          this.closeModalMainFunction()
          this.$toastr.s(response.data.message, 'Pemberitahuan')
          this.$nextTick(() => {
            this.$refs.form_main_function.reset()
          })
        })
        .catch((error) => {
          if (error.response.status === 422) {
            this.$toastr.e('Silahkan Cek Form Anda Kembali', 'Pemberitahuan')
            this.errorValidations.mainFunction.fungsi_sistem =
              typeof error.response.data.errors.fungsi_sistem === 'undefined'
                ? []
                : error.response.data.errors.fungsi_sistem
            this.errorValidations.mainFunction.keterangan =
              typeof error.response.data.errors.keterangan === 'undefined'
                ? []
                : error.response.data.errors.fungsi_sistem
          } else if (error.response.status === 500) {
            this.$toastr.e('Ada Kesalahan dari Server', 'Pemberitahuan')
          } else {
            this.$toastr.e(error.response.data.message, 'Pemberitahuan')
          }
        })
    },
    destroyMainFunction(item) {
      this.modal.delete.showModal = true
      this.modal.delete.title = 'Hapus Data'
      this.modal.delete.color = 'danger'
      this.modal.delete.data = item.fungsi_sistem
      this.modal.delete.uniqueId = item.id
      this.modal.delete.message = 'Ingin Menghapus Data'
      this.modal.delete.labelButton = 'Hapus'
      this.modal.delete.url = 'special-functions'
    },
    editMainFunction(item) {
      this.forms.mainFunction.id = item.id
      this.forms.mainFunction.fungsi_sistem = item.fungsi_sistem
      this.forms.mainFunction.keterangan = item.keterangan

      this.modal.mainFunction.showModal = true
      this.modal.mainFunction.title = 'Update Data'
      this.modal.mainFunction.color = 'success'
      this.modal.mainFunction.labelButton = 'Update'
      this.modal.mainFunction.method = 'patch'
    },
    //  Ruang Lingkup
    clearModalScope() {
      this.modal.scope.title = null
      this.modal.scope.color = null
      this.modal.scope.labelButton = null
      this.modal.scope.method = null
    },
    closeModalScope() {
      this.modal.scope.showModal = false
      this.clearFormScope()
      this.clearModalScope()
    },
    clearFormScope() {
      this.forms.scope.id = null
      this.forms.scope.sis_profil_id = this.$route.params.id
      this.forms.scope.ruang_lingkup = this.scope.map(
        (value) => value.ruang_lingkup
      )
      this.forms.scope.param_name = null
    },
    addScope() {
      this.clearFormScope()
      this.modal.scope.showModal = true
      this.modal.scope.title = 'Tambah Data'
      this.modal.scope.color = 'success'
      this.modal.scope.labelButton = 'Simpan'
      this.modal.scope.method = 'post'
    },
    submitScope() {
      const url = '/scope'
      const formData = new FormData()
      let urlAction = null
      if (this.modal.scope.method === 'patch') {
        urlAction = `${url}/${this.forms.scope.id}`
        formData.append('_method', 'patch')
      } else {
        urlAction = url
        formData.append('_method', 'POST')
      }
      const forMapData = Object.entries(this.forms.scope)
      forMapData.forEach((value) => {
        if (Array.isArray(value[1])) {
          for (let index = 0; index < value[1].length; index++) {
            formData.append(`${value[0]}[${index}]`, value[1][index])
          }
        } else {
          formData.append(value[0], value[1] === null ? [] : value[1])
        }
      })
      this.errorValidations.scope.ruang_lingkup = []

      this.$http({
        method: 'post',
        url: urlAction,
        data: formData,
      })
        .then((response) => {
          this.$emit('update-data')
          if (this.forms.scope.param_name !== null) {
            this.fetchScope()
          }
          this.closeModalScope()
          this.$toastr.s(response.data.message, 'Pemberitahuan')
          this.$nextTick(() => {
            this.$refs.form_scope.reset()
          })
        })
        .catch((error) => {
          if (error.response.status === 422) {
            this.$toastr.e('Silahkan Cek Form Anda Kembali', 'Pemberitahuan')
            this.errorValidations.scope.ruang_lingkup =
              typeof error.response.data.errors.ruang_lingkup === 'undefined'
                ? []
                : error.response.data.errors.ruang_lingkup
          } else if (error.response.status === 500) {
            this.$toastr.e('Ada Kesalahan dari Server', 'Pemberitahuan')
          } else {
            this.$toastr.e(error.response.data.message, 'Pemberitahuan')
          }
        })
    },
    destroyScope(item) {
      this.modal.delete.showModal = true
      this.modal.delete.title = 'Hapus Data'
      this.modal.delete.color = 'danger'
      this.modal.delete.data = item.relation.scope
      this.modal.delete.uniqueId = item.id
      this.modal.delete.message = 'Ingin Menghapus Data'
      this.modal.delete.labelButton = 'Hapus'
      this.modal.delete.url = 'scope'
    },
    editScope(item) {
      this.forms.scope.id = item.id
      this.forms.scope.ruang_lingkup = this.scope.map(
        (value) => value.ruang_lingkup
      )

      this.modal.scope.showModal = true
      this.modal.scope.title = 'Update Data'
      this.modal.scope.color = 'success'
      this.modal.scope.labelButton = 'Update'
      this.modal.scope.method = 'patch'
    },
    //  Jenis Layanan
    clearModalKindOfService() {
      this.modal.kindOfService.title = null
      this.modal.kindOfService.color = null
      this.modal.kindOfService.labelButton = null
      this.modal.kindOfService.method = null
    },
    closeModalKindOfService() {
      this.modal.kindOfService.showModal = false
      this.clearFormKindOfService()
      this.clearModalKindOfService()
    },
    clearFormKindOfService() {
      this.forms.kindOfService.id = null
      this.forms.kindOfService.sis_profil_id = this.$route.params.id
      this.forms.kindOfService.jenis_layanan = null
      this.forms.kindOfService.keterangan = null
    },
    addKindOfService() {
      this.clearFormKindOfService()
      this.modal.kindOfService.showModal = true
      this.modal.kindOfService.title = 'Tambah Data'
      this.modal.kindOfService.color = 'success'
      this.modal.kindOfService.labelButton = 'Simpan'
      this.modal.kindOfService.method = 'post'
    },
    submitKindOfService() {
      const url = '/type-of-services'
      const formData = new FormData()
      let urlAction = null
      if (this.modal.kindOfService.method === 'patch') {
        urlAction = `${url}/${this.forms.kindOfService.id}`
        formData.append('_method', 'patch')
      } else {
        urlAction = url
        formData.append('_method', 'POST')
      }
      const forMapData = Object.entries(this.forms.kindOfService)
      forMapData.forEach((value) => {
        if (Array.isArray(value[1])) {
          for (let index = 0; index < value[1].length; index++) {
            formData.append(`${value[0]}[${index}]`, value[1][index])
          }
        } else {
          formData.append(value[0], value[1] === null ? [] : value[1])
        }
      })
      this.errorValidations.kindOfService.jenis_layanan = []
      this.errorValidations.kindOfService.keterangan = []

      this.$http({
        method: 'post',
        url: urlAction,
        data: formData,
      })
        .then((response) => {
          this.$emit('update-data')
          this.closeModalKindOfService()
          this.$toastr.s(response.data.message, 'Pemberitahuan')
          this.$nextTick(() => {
            this.$refs.form_kind_of_service.reset()
          })
        })
        .catch((error) => {
          if (error.response.status === 422) {
            this.$toastr.e('Silahkan Cek Form Anda Kembali', 'Pemberitahuan')
            this.errorValidations.kindOfService.jenis_layanan =
              typeof error.response.data.errors.jenis_layanan === 'undefined'
                ? []
                : error.response.data.errors.jenis_layanan
            this.errorValidations.kindOfService.keterangan =
              typeof error.response.data.errors.keterangan === 'undefined'
                ? []
                : error.response.data.errors.keterangan
          } else if (error.response.status === 500) {
            this.$toastr.e('Ada Kesalahan dari Server', 'Pemberitahuan')
          } else {
            this.$toastr.e(error.response.data.message, 'Pemberitahuan')
          }
        })
    },
    destroyKindOfService(item) {
      this.modal.delete.showModal = true
      this.modal.delete.title = 'Hapus Data'
      this.modal.delete.color = 'danger'
      this.modal.delete.data = item.jenis_layanan
      this.modal.delete.uniqueId = item.id
      this.modal.delete.message = 'Ingin Menghapus Data'
      this.modal.delete.labelButton = 'Hapus'
      this.modal.delete.url = 'type-of-services'
    },
    editKindOfService(item) {
      this.forms.kindOfService.id = item.id
      this.forms.kindOfService.jenis_layanan = item.jenis_layanan
      this.forms.kindOfService.keterangan = item.keterangan

      this.modal.kindOfService.showModal = true
      this.modal.kindOfService.title = 'Update Data'
      this.modal.kindOfService.color = 'success'
      this.modal.kindOfService.labelButton = 'Update'
      this.modal.kindOfService.method = 'patch'
    },
    //  Sistem Pengamanan
    clearModalSecurity() {
      this.modal.security.title = null
      this.modal.security.color = null
      this.modal.security.labelButton = null
      this.modal.security.method = null
    },
    closeModalSecurity() {
      this.modal.security.showModal = false
      this.clearFormSecurity()
      this.clearModalSecurity()
    },
    clearFormSecurity() {
      this.forms.security.id = null
      this.forms.security.sis_profil_id = this.$route.params.id
      this.forms.security.nama_sistem = null
      this.forms.security.keterangan = null
    },
    addSecurity() {
      this.clearFormSecurity()
      this.modal.security.showModal = true
      this.modal.security.title = 'Tambah Data'
      this.modal.security.color = 'success'
      this.modal.security.labelButton = 'Simpan'
      this.modal.security.method = 'post'
    },
    submitSecurity() {
      const url = '/security'
      const formData = new FormData()
      let urlAction = null
      if (this.modal.security.method === 'patch') {
        urlAction = `${url}/${this.forms.security.id}`
        formData.append('_method', 'patch')
      } else {
        urlAction = url
        formData.append('_method', 'POST')
      }
      const forMapData = Object.entries(this.forms.security)
      forMapData.forEach((value) => {
        if (Array.isArray(value[1])) {
          for (let index = 0; index < value[1].length; index++) {
            formData.append(`${value[0]}[${index}]`, value[1][index])
          }
        } else {
          formData.append(value[0], value[1] === null ? [] : value[1])
        }
      })
      this.errorValidations.security.nama_sistem = []
      this.errorValidations.security.keterangan = []

      this.$http({
        method: 'post',
        url: urlAction,
        data: formData,
      })
        .then((response) => {
          this.$emit('update-data')
          this.closeModalSecurity()
          this.$toastr.s(response.data.message, 'Pemberitahuan')
          this.$nextTick(() => {
            this.$refs.form_security.reset()
          })
        })
        .catch((error) => {
          if (error.response.status === 422) {
            this.$toastr.e('Silahkan Cek Form Anda Kembali', 'Pemberitahuan')
            this.errorValidations.security.nama_sistem =
              typeof error.response.data.errors.nama_sistem === 'undefined'
                ? []
                : error.response.data.errors.nama_sistem
            this.errorValidations.security.keterangan =
              typeof error.response.data.errors.keterangan === 'undefined'
                ? []
                : error.response.data.errors.keterangan
          } else if (error.response.status === 500) {
            this.$toastr.e('Ada Kesalahan dari Server', 'Pemberitahuan')
          } else {
            this.$toastr.e(error.response.data.message, 'Pemberitahuan')
          }
        })
    },
    destroySecurity(item) {
      this.modal.delete.showModal = true
      this.modal.delete.title = 'Hapus Data'
      this.modal.delete.color = 'danger'
      this.modal.delete.data = item.nama_sistem
      this.modal.delete.uniqueId = item.id
      this.modal.delete.message = 'Ingin Menghapus Data'
      this.modal.delete.labelButton = 'Hapus'
      this.modal.delete.url = 'security'
    },
    editSecurity(item) {
      this.forms.security.id = item.id
      this.forms.security.nama_sistem = item.nama_sistem
      this.forms.security.keterangan = item.keterangan

      this.modal.security.showModal = true
      this.modal.security.title = 'Update Data'
      this.modal.security.color = 'success'
      this.modal.security.labelButton = 'Update'
      this.modal.security.method = 'patch'
    },
    //  Sistem Terkait
    clearModalRelated() {
      this.modal.related.title = null
      this.modal.related.color = null
      this.modal.related.labelButton = null
      this.modal.related.method = null
    },
    closeModalRelated() {
      this.modal.related.showModal = false
      this.clearFormRelated()
      this.clearModalRelated()
    },
    clearFormRelated() {
      this.forms.related.id = null
      this.forms.related.sis_profil_id = this.$route.params.id
      this.forms.related.nama_sistem = null
      this.forms.related.keterangan = null
      this.forms.related.id_sistem = ''
    },
    addRelated() {
      this.clearFormRelated()
      this.modal.related.showModal = true
      this.modal.related.title = 'Tambah Data'
      this.modal.related.color = 'success'
      this.modal.related.labelButton = 'Simpan'
      this.modal.related.method = 'post'
    },
    submitRelated() {
      const url = '/related'
      const formData = new FormData()
      let urlAction = null
      if (this.modal.related.method === 'patch') {
        urlAction = `${url}/${this.forms.related.id}`
        formData.append('_method', 'patch')
      } else {
        urlAction = url
        formData.append('_method', 'POST')
      }
      const forMapData = Object.entries(this.forms.related)
      forMapData.forEach((value) => {
        if (Array.isArray(value[1])) {
          for (let index = 0; index < value[1].length; index++) {
            formData.append(`${value[0]}[${index}]`, value[1][index])
          }
        } else {
          formData.append(value[0], value[1] === null ? [] : value[1])
        }
      })
      this.errorValidations.related.nama_sistem = []
      this.errorValidations.related.id_sistem = []

      this.$http({
        method: 'post',
        url: urlAction,
        data: formData,
      })
        .then((response) => {
          this.$emit('update-data')
          this.closeModalRelated()
          this.$toastr.s(response.data.message, 'Pemberitahuan')
          this.$nextTick(() => {
            this.$refs.form_related.reset()
          })
        })
        .catch((error) => {
          if (error.response.status === 422) {
            this.$toastr.e('Silahkan Cek Form Anda Kembali', 'Pemberitahuan')
            this.errorValidations.related.nama_sistem =
              typeof error.response.data.errors.nama_sistem === 'undefined'
                ? []
                : error.response.data.errors.nama_sistem
          } else if (error.response.status === 500) {
            this.$toastr.e('Ada Kesalahan dari Server', 'Pemberitahuan')
          } else {
            this.$toastr.e(error.response.data.message, 'Pemberitahuan')
          }
        })
    },
    destroyRelated(item) {
      this.modal.delete.showModal = true
      this.modal.delete.title = 'Hapus Data'
      this.modal.delete.color = 'danger'
      this.modal.delete.data = item.label_sistem
      this.modal.delete.uniqueId = item.id
      this.modal.delete.message = 'Ingin Menghapus Data'
      this.modal.delete.labelButton = 'Hapus'
      this.modal.delete.url = 'related'
    },
    editRelated(item) {
      this.clearFormRelated()
      this.forms.related.id = item.id
      if (item.nama_sistem) {
        this.forms.related.nama_sistem = item.nama_sistem
      } else {
        this.forms.related.id_sistem = item.id_sistem
      }
      this.forms.related.keterangan = item.keterangan

      this.modal.related.showModal = true
      this.modal.related.title = 'Update Data'
      this.modal.related.color = 'success'
      this.modal.related.labelButton = 'Update'
      this.modal.related.method = 'patch'
    },
    //  Sertifikat
    clearModalCertificate() {
      this.modal.certificate.title = null
      this.modal.certificate.color = null
      this.modal.certificate.labelButton = null
      this.modal.certificate.method = null
    },
    closeModalCertificate() {
      this.modal.certificate.showModal = false
      this.clearFormCertificate()
      this.clearModalCertificate()
    },
    clearFormCertificate() {
      this.forms.certificate.id = null
      this.forms.certificate.sis_profil_id = this.$route.params.id
      this.forms.certificate.nama_sertifikat = null
      this.forms.certificate.nama_institusi = null
      this.forms.certificate.tgl_terbit = null
      this.forms.certificate.tgl_mulai = null
      this.forms.certificate.tgl_expire = null
      this.forms.certificate.masa_berlaku = null
      this.forms.certificate.no_sertifikat = null
      this.forms.certificate.ruang_lingkup = null
      this.forms.certificate.dokumen = null
    },
    addCertificate() {
      this.clearFormCertificate()
      this.modal.certificate.showModal = true
      this.modal.certificate.title = 'Tambah Data'
      this.modal.certificate.color = 'success'
      this.modal.certificate.labelButton = 'Simpan'
      this.modal.certificate.method = 'post'
    },
    submitCertificate() {
      const url = '/certificate'
      const formData = new FormData()
      let urlAction = null
      if (this.modal.certificate.method === 'patch') {
        urlAction = `${url}/${this.forms.certificate.id}`
        formData.append('_method', 'patch')
      } else {
        urlAction = url
        formData.append('_method', 'POST')
      }
      const forMapData = Object.entries(this.forms.certificate)
      forMapData.forEach((value) => {
        if (Array.isArray(value[1])) {
          for (let index = 0; index < value[1].length; index++) {
            formData.append(`${value[0]}[${index}]`, value[1][index])
          }
        } else {
          formData.append(value[0], value[1] === null ? [] : value[1])
        }
      })
      this.errorValidations.certificate.nama_sertifikat = []
      this.errorValidations.certificate.nama_institusi = []
      this.errorValidations.certificate.tgl_terbit = []
      this.errorValidations.certificate.tgl_mulai = []
      this.errorValidations.certificate.tgl_expire = []
      this.errorValidations.certificate.masa_berlaku = []
      this.errorValidations.certificate.no_sertifikat = []
      this.errorValidations.certificate.ruang_lingkup = []
      this.errorValidations.certificate.dokumen = []

      this.$http({
        method: 'post',
        url: urlAction,
        data: formData,
      })
        .then((response) => {
          this.$emit('update-data')
          this.closeModalCertificate()
          this.$toastr.s(response.data.message, 'Pemberitahuan')
          this.$refs.form_certificate.reset()
          this.$nextTick(() => {
            this.label.certificate.file = 'Choose File'
          })
        })
        .catch((error) => {
          if (error.response.status === 422) {
            this.$toastr.e('Silahkan Cek Form Anda Kembali', 'Pemberitahuan')
            this.errorValidations.certificate.nama_sertifikat =
              typeof error.response.data.errors.nama_sertifikat === 'undefined'
                ? []
                : error.response.data.errors.nama_sertifikat
            this.errorValidations.certificate.nama_institusi =
              typeof error.response.data.errors.nama_institusi === 'undefined'
                ? []
                : error.response.data.errors.nama_institusi
            this.errorValidations.certificate.tgl_terbit =
              typeof error.response.data.errors.tgl_terbit === 'undefined'
                ? []
                : error.response.data.errors.tgl_terbit
            this.errorValidations.certificate.tgl_mulai =
              typeof error.response.data.errors.tgl_mulai === 'undefined'
                ? []
                : error.response.data.errors.tgl_mulai
            this.errorValidations.certificate.tgl_expire =
              typeof error.response.data.errors.tgl_expire === 'undefined'
                ? []
                : error.response.data.errors.tgl_expire
            this.errorValidations.certificate.masa_berlaku =
              typeof error.response.data.errors.masa_berlaku === 'undefined'
                ? []
                : error.response.data.errors.masa_berlaku
            this.errorValidations.certificate.no_sertifikat =
              typeof error.response.data.errors.no_sertifikat === 'undefined'
                ? []
                : error.response.data.errors.no_sertifikat
            this.errorValidations.certificate.ruang_lingkup =
              typeof error.response.data.errors.ruang_lingkup === 'undefined'
                ? []
                : error.response.data.errors.ruang_lingkup
            this.errorValidations.certificate.dokumen =
              typeof error.response.data.errors.dokumen === 'undefined'
                ? []
                : error.response.data.errors.dokumen
          } else if (error.response.status === 500) {
            this.$toastr.e('Ada Kesalahan dari Server', 'Pemberitahuan')
          } else {
            this.$toastr.e(error.response.data.message, 'Pemberitahuan')
          }
        })
    },
    destroyCertificate(item) {
      this.modal.delete.showModal = true
      this.modal.delete.title = 'Hapus Data'
      this.modal.delete.color = 'danger'
      this.modal.delete.data = item.nama_sertifikat
      this.modal.delete.uniqueId = item.id
      this.modal.delete.message = 'Ingin Menghapus Data'
      this.modal.delete.labelButton = 'Hapus'
      this.modal.delete.url = 'certificate'
    },
    editCertificate(item) {
      this.clearFormCertificate()
      this.forms.certificate.id = item.id
      this.forms.certificate.nama_sertifikat = item.nama_sertifikat
      this.forms.certificate.nama_institusi = item.nama_institusi
      this.forms.certificate.tgl_terbit = item.tgl_terbit
      this.forms.certificate.tgl_mulai = item.tgl_mulai
      this.forms.certificate.tgl_expire = item.tgl_expire
      this.forms.certificate.masa_berlaku = item.masa_berlaku
      this.forms.certificate.no_sertifikat = item.no_sertifikat
      this.forms.certificate.ruang_lingkup = item.ruang_lingkup
      this.label.certificate.url_file = item.url_file

      this.modal.certificate.showModal = true
      this.modal.certificate.title = 'Update Data'
      this.modal.certificate.color = 'success'
      this.modal.certificate.labelButton = 'Update'
      this.modal.certificate.method = 'patch'
    },
    onFilePicked(event) {
      const eventTarget = event.target
      if (eventTarget.files[0].type === 'application/pdf') {
        this.forms.certificate.dokumen = eventTarget.files[0]
        this.label.certificate.file = eventTarget.files[0].name
      } else {
        this.forms.certificate.dokumen = null
        this.label.certificate.file = 'Choose File'
      }
    },
    showFile(value) {
      window.open(value)
    },
    changeMinDate() {
      this.optionTanggalHabisBerlaku.minDate = this.forms.certificate.tgl_terbit
      this.optionTanggalMulai.minDate = this.forms.certificate.tgl_terbit
    },
    //  Pengguna Layanan
    clearModalServiceUsers() {
      this.modal.serviceUsers.title = null
      this.modal.serviceUsers.color = null
      this.modal.serviceUsers.labelButton = null
      this.modal.serviceUsers.method = null
    },
    closeModalServiceUsers() {
      this.modal.serviceUsers.showModal = false
      this.clearFormServiceUsers()
      this.clearModalServiceUsers()
    },
    clearFormServiceUsers() {
      this.forms.serviceUsers.id = null
      this.forms.serviceUsers.sis_profil_id = this.$route.params.id
      this.forms.serviceUsers.jenis_pengguna = ''
      this.forms.serviceUsers.keterangan = null
    },
    addServiceUsers() {
      this.clearFormServiceUsers()
      this.modal.serviceUsers.showModal = true
      this.modal.serviceUsers.title = 'Tambah Data'
      this.modal.serviceUsers.color = 'success'
      this.modal.serviceUsers.labelButton = 'Simpan'
      this.modal.serviceUsers.method = 'post'
    },
    submitServiceUsers() {
      const url = '/service-users'
      const formData = new FormData()
      let urlAction = null
      if (this.modal.serviceUsers.method === 'patch') {
        urlAction = `${url}/${this.forms.serviceUsers.id}`
        formData.append('_method', 'patch')
      } else {
        urlAction = url
        formData.append('_method', 'POST')
      }
      const forMapData = Object.entries(this.forms.serviceUsers)
      forMapData.forEach((value) => {
        if (Array.isArray(value[1])) {
          for (let index = 0; index < value[1].length; index++) {
            formData.append(`${value[0]}[${index}]`, value[1][index])
          }
        } else {
          formData.append(value[0], value[1] === null ? [] : value[1])
        }
      })
      this.errorValidations.serviceUsers.jenis_pengguna = []
      this.errorValidations.serviceUsers.keterangan = []

      this.$http({
        method: 'post',
        url: urlAction,
        data: formData,
      })
        .then((response) => {
          this.$emit('update-data')
          this.closeModalServiceUsers()
          this.$toastr.s(response.data.message, 'Pemberitahuan')
          this.$nextTick(() => {
            this.$refs.form_service_users.reset()
          })
        })
        .catch((error) => {
          if (error.response.status === 422) {
            this.$toastr.e('Silahkan Cek Form Anda Kembali', 'Pemberitahuan')
            this.errorValidations.serviceUsers.jenis_pengguna =
              typeof error.response.data.errors.jenis_pengguna === 'undefined'
                ? []
                : error.response.data.errors.jenis_pengguna
            this.errorValidations.serviceUsers.keterangan =
              typeof error.response.data.errors.keterangan === 'undefined'
                ? []
                : error.response.data.errors.keterangan
          } else if (error.response.status === 500) {
            this.$toastr.e('Ada Kesalahan dari Server', 'Pemberitahuan')
          } else {
            this.$toastr.e(error.response.data.message, 'Pemberitahuan')
          }
        })
    },
    destroyServiceUsers(item) {
      this.modal.delete.showModal = true
      this.modal.delete.title = 'Hapus Data'
      this.modal.delete.color = 'danger'
      this.modal.delete.data = item.nama_sertifikat
      this.modal.delete.uniqueId = item.id
      this.modal.delete.message = 'Ingin Menghapus Data'
      this.modal.delete.labelButton = 'Hapus'
      this.modal.delete.url = 'service-users'
    },
    editServiceUsers(item) {
      this.clearFormServiceUsers()
      this.forms.serviceUsers.id = item.id
      this.forms.serviceUsers.jenis_pengguna = item.jenis_pengguna
      this.forms.serviceUsers.keterangan = item.keterangan

      this.modal.serviceUsers.showModal = true
      this.modal.serviceUsers.title = 'Update Data'
      this.modal.serviceUsers.color = 'success'
      this.modal.serviceUsers.labelButton = 'Update'
      this.modal.serviceUsers.method = 'patch'
    },
    //  Fetch Sistem
    fetchSystem() {
      this.$http
        .get('systems')
        .then((response) => {
          this.dataSelect.system = response.data.data
        })
        .catch((error) => {
          if (error.response.status === 500) {
            this.$toastr.e('Ada Kesalahan dari Server', 'Pemberitahuan')
          } else {
            this.$toastr.e(error.response.data.message, 'Pemberitahuan')
          }
        })
    },
    //  Fetch Scope
    fetchScope() {
      this.$http
        .get('parconfig/category', {
          params: {
            filter: 'category',
            q: 'par_ruang_lingkup',
          },
        })
        .then((response) => {
          this.dataSelect.scope = response.data.data
        })
        .catch((error) => {
          if (error.response.status === 500) {
            this.$toastr.e('Ada Kesalahan dari Server', 'Pemberitahuan')
          } else {
            this.$toastr.e(error.response.data.message, 'Pemberitahuan')
          }
        })
    },
    //  Fetch Service Users
    fetchServiceUsers() {
      this.$http
        .get('parconfig/category', {
          params: {
            filter: 'category',
            q: 'par_pengguna',
          },
        })
        .then((response) => {
          this.dataSelect.serviceUsers = response.data.data
        })
        .catch((error) => {
          if (error.response.status === 500) {
            this.$toastr.e('Ada Kesalahan dari Server', 'Pemberitahuan')
          } else {
            this.$toastr.e(error.response.data.message, 'Pemberitahuan')
          }
        })
    },
    //  Delete
    submitDelete() {
      this.$http
        .delete(`${this.modal.delete.url}/${this.modal.delete.uniqueId}`)
        .then((response) => {
          this.$emit('update-data')
          this.$toastr.s(response.data.message, 'Pemberitahuan')
          this.closeModalDelete()
        })
        .catch((error) => {
          if (error.response.status === 500) {
            this.$toastr.e('Ada Kesalahan dari Server', 'Pemberitahuan')
          } else {
            this.$toastr.e(error.response.data.message, 'Pemberitahuan')
          }
        })
    },
    closeModalDelete() {
      this.modal.delete.showModal = false
      this.clearModalDelete()
    },
    clearModalDelete() {
      this.modal.delete.title = null
      this.modal.delete.color = null
      this.modal.delete.data = null
      this.modal.delete.uniqueId = null
      this.modal.delete.message = null
      this.modal.delete.labelButton = null
      this.modal.delete.url = null
    },
  },
}
</script>
<style scoped>
.row-profile-service {
  background-color: #ebedef;
}
.row-profile-service td {
  padding: 30px 0 10px 0;
}
.has-error-file {
  display: block;
  width: 100%;
  margin-top: 0.25rem;
  font-size: 80%;
  color: #dc3545;
}
</style>

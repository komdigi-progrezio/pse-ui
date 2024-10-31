<template>
  <div
    class="flex-column flex-lg-row justify-content-center d-flex"
    id="register"
  >
    <div id="left-side">
      <div id="identity">
        <img
          src="@/assets/images/pse-logo-white.png"
          alt="PSE"
          height="35"
          class="c-sidebar-brand-full"
        />
        <p>Pendaftaran Aplikasi Elektronik <br />&amp; Repositori Pemerintah</p>
      </div>
    </div>
    <div id="right-side">
      <div id="right-side-container">
        <router-link
          to="/login"
          class="btn primary-color-link px-0 d-flex align-items-center"
        >
          <img width="12" src="@/assets/svgs/arrow-left.svg" />
          <span class="ml-1">Kembali</span>
        </router-link>
        <h3 class="font-montserrat font-weight-bold"
          >Pendaftaran Pejabat Pendaftar Sistem Elektronik</h3
        >
        <div class="card">
          <div class="card-body p-3">
            <ValidationObserver v-slot="{ invalid }" ref="form">
              <h5>Data Akun</h5>
              <div class="form-group row">
                <label for="email" class="col-sm-2 col-form-label"
                  >Alamat Email / Username</label
                >
                <div class="col-sm-10">
                  <ValidationProvider
                    name="E-mail"
                    :rules="{
                      required: true,
                      email: true,
                      regex: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
                      // regex: /[^\s@]+@[^\s@]+\.go.id$|[^\s@]+@mkri.id$/,
                    }"
                    v-slot="{ errors }"
                  >
                    <input
                      v-model="forms.username"
                      type="text"
                      class="form-control"
                      placeholder="Masukan Email"
                      :class="{
                        'is-invalid':
                          errors.length > 0 ||
                          errorValidations.username.length > 0,
                      }"
                      @blur="errorValidations.username = []"
                    />
                    <div v-if="errors.length > 0" class="invalid-feedback">
                      {{ errors[0] }}
                    </div>
                  </ValidationProvider>
                  <message :messages="errorValidations.username" />
                </div>
              </div>
              <!-- <div class="form-group row">
                <label for="password" class="col-sm-2 col-form-label"
                  >Password</label
                >
                <div class="col-sm-10">
                  <ValidationProvider
                    name="Password"
                    rules="required|confirmed:Konfirmasi Password|min:6"
                    v-slot="{ errors }"
                  >
                    <input
                      v-model="forms.password"
                      type="password"
                      class="form-control"
                      placeholder="Masukan Password"
                      :class="{
                        'is-invalid':
                          errors.length > 0 ||
                          errorValidations.password.length > 0,
                      }"
                      @blur="errorValidations.password = []"
                    />
                    <div v-if="errors.length > 0" class="invalid-feedback">
                      {{ errors[0] }}
                    </div>
                  </ValidationProvider>
                  <message :messages="errorValidations.password" />
                </div>
              </div>
              <div class="form-group row">
                <label for="password_confirmation" class="col-sm-2 col-form-label"
                  >Konfirmasi Password</label
                >
                <div class="col-sm-10">
                  <ValidationProvider rules="required" vid="Konfirmasi Password">
                    <input
                      v-model="forms.password_confirmation"
                      type="password"
                      placeholder="Masukan Konfirmasi Password"
                      class="form-control"
                    />
                  </ValidationProvider>
                </div>
              </div> -->
              <hr />
              <h5>Data Diri</h5>
              <div class="form-group row">
                <label for="name" class="col-sm-2 col-form-label"
                  >Status Pendaftar</label
                >
                <div class="col-sm-10 d-flex align-items-center">
                  <ValidationProvider
                    name="Status Pendaftar"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <div class="form-check form-check-inline">
                      <input
                        v-model="forms.status_register"
                        class="form-check-input"
                        type="radio"
                        id="inlineCheckbox1"
                        value="1"
                      />
                      <label class="form-check-label" for="inlineCheckbox1"
                        >Pendaftar Baru</label
                      >
                    </div>
                    <div class="form-check form-check-inline">
                      <input
                        v-model="forms.status_register"
                        class="form-check-input"
                        type="radio"
                        id="inlineCheckbox1"
                        value="2"
                      />
                      <label class="form-check-label" for="inlineCheckbox1"
                        >Pendaftar Pengganti</label
                      >
                    </div>
                    <div v-if="errors.length > 0" class="invalid-feedback">
                      {{ errors[0] }}
                    </div>
                  </ValidationProvider>
                  <message :messages="errorValidations.name" />
                </div>
              </div>
              <div class="form-group row">
                <label for="name" class="col-sm-2 col-form-label"
                  >Nama Lengkap</label
                >
                <div class="col-sm-10">
                  <ValidationProvider
                    name="Nama Lengkap"
                    rules="required|alpha_spaces"
                    v-slot="{ errors }"
                  >
                    <input
                      v-model="forms.nama"
                      type="text"
                      class="form-control"
                      placeholder="Masukan Nama Lengkap"
                      :class="{
                        'is-invalid':
                          errors.length > 0 || errorValidations.name.length > 0,
                      }"
                      @blur="errorValidations.name = []"
                    />
                    <div v-if="errors.length > 0" class="invalid-feedback">
                      {{ errors[0] }}
                    </div>
                  </ValidationProvider>
                  <message :messages="errorValidations.name" />
                </div>
              </div>
              <div class="form-group row">
                <label for="nip" class="col-sm-2 col-form-label">NIP</label>
                <div class="col-sm-10">
                  <ValidationProvider
                    name="NIP"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <input
                      v-model="forms.nip"
                      type="text"
                      maxlength="18"
                      class="form-control"
                      placeholder="Masukan NIP"
                      :class="{
                        'is-invalid':
                          errors.length > 0 || errorValidations.nip.length > 0,
                      }"
                      @blur="errorValidations.nip = []"
                    />
                    <div v-if="errors.length > 0" class="invalid-feedback">
                      {{ errors[0] }}
                    </div>
                  </ValidationProvider>
                  <message :messages="errorValidations.nip" />
                </div>
              </div>
              <div class="form-group row">
                <label for="jabatan" class="col-sm-2 col-form-label"
                  >Jabatan</label
                >
                <div class="col-sm-10">
                  <ValidationProvider
                    name="Jabatan"
                    rules="required|alpha_spaces"
                    v-slot="{ errors }"
                  >
                    <input
                      v-model="forms.jabatan"
                      type="text"
                      class="form-control"
                      placeholder="Masukan Jabatan"
                      :class="{
                        'is-invalid':
                          errors.length > 0 ||
                          errorValidations.jabatan.length > 0,
                      }"
                      @blur="errorValidations.jabatan = []"
                    />
                    <div v-if="errors.length > 0" class="invalid-feedback">
                      {{ errors[0] }}
                    </div>
                  </ValidationProvider>
                  <message :messages="errorValidations.jabatan" />
                </div>
              </div>
              <div class="form-group row">
                <label for="no_telepon" class="col-sm-2 col-form-label"
                  >Nomor Telepon</label
                >
                <div class="col-sm-10">
                  <ValidationProvider
                    name="Nomor Telepon"
                    rules="required|numeric"
                    v-slot="{ errors }"
                  >
                    <input
                      v-model="forms.no_telepon"
                      type="text"
                      class="form-control"
                      placeholder="Masukan Nomor Telepon"
                      :class="{
                        'is-invalid':
                          errors.length > 0 ||
                          errorValidations.no_telepon.length > 0,
                      }"
                      @blur="errorValidations.no_telepon = []"
                    />
                    <div v-if="errors.length > 0" class="invalid-feedback">
                      {{ errors[0] }}
                    </div>
                  </ValidationProvider>
                  <message :messages="errorValidations.no_telepon" />
                  <p class="text-muted">
                    Gunakan kode area, contoh: 02133334444
                  </p>
                </div>
              </div>
              <div class="form-group row">
                <label for="no_hp" class="col-sm-2 col-form-label"
                  >Nomor HP</label
                >
                <div class="col-sm-10">
                  <ValidationProvider
                    name="Nomor HP"
                    rules="required|numeric"
                    v-slot="{ errors }"
                  >
                    <input
                      v-model="forms.no_hp"
                      type="text"
                      class="form-control"
                      placeholder="Masukan Nomor HP"
                      :class="{
                        'is-invalid':
                          errors.length > 0 ||
                          errorValidations.no_hp.length > 0,
                      }"
                      @blur="errorValidations.no_hp = []"
                    />
                    <div v-if="errors.length > 0" class="invalid-feedback">
                      {{ errors[0] }}
                    </div>
                  </ValidationProvider>
                  <message :messages="errorValidations.no_hp" />
                </div>
              </div>

              <div class="form-group row">
                <label for="provinsi" class="col-sm-2 col-form-label">
                  Provinsi
                </label>
                <div class="col-sm-10">
                  <ValidationProvider
                    name="provinsi"
                    rules="required"
                    :custom-messages="`Pilih salah satu provinsi`"
                    v-slot="{ errors }"
                    mode="aggressive"
                  >
                  <select
                    v-model="forms.propinsi"
                    class="form-control"
                    :class="{
                      'is-invalid': errorValidations.propinsi.length > 0,
                    }"
                    @change="getDistrictDaftar"
                    @blur="errorValidations.propinsi = []"
                    required
                  >
                    <option value="" selected="selected">
                      Pilih Provinsi
                    </option>
                    <option
                      :value="value.id"
                      v-for="(value, index) in dataSelect.provinsi"
                      :key="`provivnsi-${index}`"
                    >
                      {{ value.nama }}
                    </option>
                  </select>
                  <div v-if="errors.length > 0" class="invalid-feedback">
                    {{ errors[0] }}
                  </div>
                  </ValidationProvider>
                </div>
                <message :messages="errorValidations.propinsi" />
              </div>
              <div class="form-group row">
                <label for="kota" class="col-sm-2 col-form-label">Kota</label>
                <div class="col-sm-10">
                  <ValidationProvider
                    name="kota"
                    rules="required"
                    :custom-messages="`Pilih salah satu kota`"
                    v-slot="{ errors }"
                    mode="aggressive"
                  >
                  <select
                    v-model="forms.kota"
                    class="form-control"
                    :class="{
                      'is-invalid': errorValidations.kota.length > 0,
                    }"
                    @blur="errorValidations.kota = []"
                    required
                  >
                    <option value="" selected="selected"> Pilih Kota </option>
                    <option
                      :value="value.id"
                      v-for="(value, index) in dataSelect.kota"
                      :key="`kota-${index}`"
                    >
                      {{ value.nama }}
                    </option>
                  </select>
                  <div v-if="errors.length > 0" class="invalid-feedback">
                    {{ errors[0] }}
                  </div>
                  </ValidationProvider>
                </div>
                <message :messages="errorValidations.kota" />
              </div>

              <hr />
              <h5>Data Instansi</h5>
              <div class="form-group row">
                <label for="instansi" class="col-sm-2 col-form-label"
                  >Instansi</label
                >
                <div class="col-sm-10">
                  <ValidationProvider
                    name="Instansi"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <input
                      v-model="forms.instansi_induk_text"
                      type="text"
                      class="form-control"
                      :class="{
                        'is-invalid': errors.length > 0,
                      }"
                      disabled
                    />
                    <div v-if="errors.length > 0" class="invalid-feedback">
                      {{ errors[0] }}
                    </div>
                  </ValidationProvider>
                  <a href="" @click.prevent="modalInstansi"
                    >Klik untuk memilih nama instansi</a
                  >
                </div>
              </div>
              <div class="form-group row">
                <label
                  for="document"
                  class="col-sm-2 col-form-label"
                  v-if="
                    forms.status_register == 1 || forms.status_register == null
                  "
                  :style="{ display: none }"
                >
                  Unggah Dokumen Surat Permohonan dan Surat Tugas (dalam 1 file
                  PDF)</label
                >
                <label
                  for="document"
                  class="col-sm-2 col-form-label"
                  v-if="forms.status_register == 2"
                  :style="{ display: none }"
                >
                  Unggah Dokumen Surat Tugas (PDF)</label
                >
                <div class="col-sm-10">
                  <ValidationProvider
                    name="File"
                    rules="required|mimes:application/pdf"
                    v-slot="{ errors, validate }"
                  >
                    <div class="custom-file">
                      <input
                        type="file"
                        class="custom-file-input"
                        id="customFile"
                        accept="application/pdf"
                        @change="
                          onFilePickedDocument($event) || validate($event)
                        "
                        @blur="errorValidations.dokumen = []"
                      />
                      <label class="custom-file-label" for="customFile">{{
                        filename
                      }}</label>
                      <div
                        v-if="errors.length > 0"
                        :class="{
                          'has-error-file': errors.length > 0,
                        }"
                      >
                        {{ errors[0] }}
                      </div>
                    </div>
                  </ValidationProvider>
                  <message :messages="errorValidations.dokumen" />
                  <small class="text-danger">Max ukuran file upload 3MB</small>
                </div>
              </div>
              <div class="d-flex" id="action">
                <router-link
                  to="/login"
                  class="btn primary-color-link px-0 d-flex align-items-center"
                >
                  <img width="12" src="@/assets/svgs/arrow-left.svg" />
                  <span class="ml-1">Kembali</span>
                </router-link>
                <button class="btn btn-secondary ml-auto mr-2 btn-lg"
                  >Reset</button
                >
                <button
                  type="submit"
                  class="btn primary-color btn-lg"
                  :disabled="invalid"
                  @click="handleSubmit"
                >
                  Simpan
                </button>
              </div>
            </ValidationObserver>
          </div>
        </div>
        <CModal
          :title="modal.instansi.title"
          :color="modal.instansi.color"
          :size="'xl'"
          :show.sync="modal.instansi.showModal"
        >
          <template v-slot:body-wrapper>
            <div class="modal-body">
              <template v-if="modal.instansi.add">
                <CRow>
                  <CCol sm="12">
                    <label for="kelompok">Kelompok</label>
                    <select
                      v-model="forms_add_agency.kelompok"
                      class="form-control"
                      :class="{
                        'is-invalid':
                          errorValidationsAddAgency.kelompok.length > 0,
                      }"
                      @blur="errorValidationsAddAgency.kelompok = []"
                    >
                      <option value="" selected="selected">
                        Pilih Kategori
                      </option>
                      <option
                        :value="value.id"
                        v-for="(value, index) in dataSelect.kelompok"
                        :key="index"
                      >
                        {{ value.param_value }}
                      </option>
                    </select>
                    <message :messages="errorValidationsAddAgency.kelompok" />
                  </CCol>
                  <CCol sm="12">
                    <label for="kategori">Kategori</label>
                    <select
                      v-model="forms_add_agency.kategori"
                      class="form-control"
                      :class="{
                        'is-invalid':
                          errorValidationsAddAgency.kategori.length > 0,
                      }"
                      @blur="errorValidationsAddAgency.kategori = []"
                    >
                      <option value="" selected="selected">
                        Pilih Kategori
                      </option>
                      <option
                        :value="value.id"
                        v-for="(value, index) in dataSelect.kategori"
                        :key="index"
                      >
                        {{ value.name }}
                      </option>
                    </select>
                    <message :messages="errorValidationsAddAgency.kategori" />
                  </CCol>
                  <CCol sm="12">
                    <label for="name">Nama Instansi</label>
                    <input
                      v-model="forms_add_agency.name"
                      type="text"
                      placeholder="Masukan Nama Instansi"
                      class="form-control"
                      :class="{
                        'is-invalid': errorValidationsAddAgency.name.length > 0,
                      }"
                      @blur="errorValidationsAddAgency.name = []"
                    />
                    <message :messages="errorValidationsAddAgency.name" />
                  </CCol>
                  <CCol sm="12">
                    <label for="alamat">Alamat</label>
                    <textarea
                      v-model="forms_add_agency.alamat"
                      cols="30"
                      rows="10"
                      class="form-control"
                      :class="{
                        'is-invalid':
                          errorValidationsAddAgency.alamat.length > 0,
                      }"
                      @blur="errorValidationsAddAgency.alamat = []"
                    ></textarea>
                    <message :messages="errorValidationsAddAgency.alamat" />
                  </CCol>
                  <CCol sm="12">
                    <label for="provinsi">Provinsi</label>
                    <select
                      v-model="forms_add_agency.propinsi"
                      class="form-control"
                      :class="{
                        'is-invalid':
                          errorValidationsAddAgency.propinsi.length > 0,
                      }"
                      @change="getDistrict"
                      @blur="errorValidationsAddAgency.propinsi = []"
                    >
                      <option value="" selected="selected">
                        Pilih Provinsi
                      </option>
                      <option
                        :value="value.id"
                        v-for="(value, index) in dataSelect.provinsi"
                        :key="`provivnsi-${index}`"
                      >
                        {{ value.nama }}
                      </option>
                    </select>
                    <message :messages="errorValidationsAddAgency.propinsi" />
                  </CCol>
                  <CCol sm="12">
                    <label for="kota">Kota</label>
                    <select
                      v-model="forms_add_agency.kota"
                      class="form-control"
                      :class="{
                        'is-invalid': errorValidationsAddAgency.kota.length > 0,
                      }"
                      @blur="errorValidationsAddAgency.kota = []"
                    >
                      <option value="" selected="selected"> Pilih Kota </option>
                      <option
                        :value="value.id"
                        v-for="(value, index) in dataSelect.kota"
                        :key="`kota-${index}`"
                      >
                        {{ value.nama }}
                      </option>
                    </select>
                    <message :messages="errorValidationsAddAgency.kota" />
                  </CCol>
                  <CCol sm="12">
                    <label for="kode_pos">Kode Pos</label>
                    <input
                      v-model="forms_add_agency.kode_pos"
                      type="text"
                      maxlength="5"
                      placeholder="Masukan Kode Pos"
                      class="form-control"
                      :class="{
                        'is-invalid':
                          errorValidationsAddAgency.kode_pos.length > 0,
                      }"
                      @input="validateKodePos"
                      @blur="errorValidationsAddAgency.kode_pos = []"
                    />
                    <message :messages="errorValidationsAddAgency.kode_pos" />
                  </CCol>
                  <CCol sm="12">
                    <label for="website">Website</label>
                    <input
                      v-model="forms_add_agency.website"
                      type="text"
                      placeholder="Masukan Domain Website"
                      class="form-control"
                      :class="{
                        'is-invalid':
                          errorValidationsAddAgency.website.length > 0,
                      }"
                      @input="validateWebsite"
                      @blur="errorValidationsAddAgency.website = []"
                    />
                    <message :messages="errorValidationsAddAgency.website" />
                  </CCol>
                </CRow>
              </template>
              <template v-else>
                <div class="d-flex mb-3">
                  <CButton
                    color="dark"
                    variant="outline"
                    size="sm"
                    class="mr-2"
                    :class="{ 'mr-auto': search.name === null }"
                    @click="filter"
                  >
                    Filter
                    <CIcon name="cil-filter" />
                  </CButton>
                  <CButton
                    v-show="search.name !== null"
                    color="info"
                    variant="outline"
                    size="sm"
                    class="mr-auto"
                    @click="clearFilter"
                  >
                    Clear All
                    <CIcon name="cil-clear-all" />
                  </CButton>
                  <CButton
                    color="success"
                    variant="outline"
                    size="sm"
                    class="mr-2"
                    @click="addAgency"
                  >
                    Tambah
                    <CIcon name="cil-plus" />
                  </CButton>
                  <template v-if="listFilter">
                    <CButton
                      color="primary"
                      variant="outline"
                      size="sm"
                      class="mr-2"
                      @click="filterAgency"
                    >
                      Search
                      <CIcon name="cil-search" />
                    </CButton>
                    <CButton
                      color="danger"
                      variant="outline"
                      size="sm"
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
                      <label for="name">Nama Instansi</label>
                      <input
                        v-model="search.name"
                        type="text"
                        placeholder="Masukan Nama Instansi"
                        class="form-control"
                      />
                    </CCol>
                  </CRow>
                </template>
                <div class="table-responsive">
                  <table class="table table-hover table-striped">
                    <thead>
                      <tr>
                        <th>No</th>
                        <th>Kategori</th>
                        <th>Kelompok</th>
                        <th>Nama Instansi</th>
                        <th>Alamat</th>
                        <th>Provinsi</th>
                        <th>Kabupaten / Kota</th>
                        <th>Kode Pos</th>
                        <th>Website</th>
                      </tr>
                    </thead>
                    <tbody>
                      <template v-if="instansi.length > 0">
                        <tr
                          v-for="(item, index) in instansi"
                          :key="index"
                          @click="getValue(item)"
                        >
                          <th scope="row">
                            {{
                              (modal.instansi.pagination.current_page - 1) *
                                modal.instansi.pagination.per_page +
                              index +
                              1
                            }}
                          </th>
                          <td>{{ item.kategori }}</td>
                          <td>{{ item.kelompok }}</td>
                          <td>{{ item.name }}</td>
                          <td>{{ item.alamat }}</td>
                          <td>
                            {{ item.nama_propinsi }}
                          </td>
                          <td>{{ item.nama_kota }}</td>
                          <td>{{ item.kode_pos }}</td>
                          <td>{{ item.website }}</td>
                        </tr>
                      </template>
                      <template v-else>
                        <tr>
                          <td colspan="9" class="text-center"> Data Kosong </td>
                        </tr>
                      </template>
                    </tbody>
                  </table>
                </div>
                <CPagination
                  :activePage.sync="modal.instansi.pagination.current_page"
                  :pages="modal.instansi.pagination.last_page"
                  size="sm"
                  align="center"
                  @update:activePage="getAgency"
                  v-if="instansi.length > 0"
                />
              </template>
            </div>
          </template>
          <template v-slot:footer-wrapper>
            <template v-if="modal.instansi.add">
              <div class="modal-footer">
                <CButton
                  color="secondary"
                  size="sm"
                  class="m-2"
                  @click="cancelAddAgency"
                >
                  Cancel
                </CButton>
                <CButton
                  color="primary"
                  size="sm"
                  class="m-2"
                  @click="submitPostPut"
                >
                  Simpan
                </CButton>
              </div>
            </template>
            <template v-else>
              <div></div>
            </template>
          </template>
        </CModal>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'OfficialNew',
  data() {
    return {
      forms: {
        status_register: null,
        username: null,
        // password: null,
        // password_confirmation: null,
        name: null,
        nip: null,
        jabatan: null,
        no_telepon: null,
        no_hp: null,
        instansi_induk: null,
        instansi_induk_text: null,
        dokumen: null,
        propinsi: '',
        kota: '',
      },
      forms_add_agency: {
        id: null,
        name: null,
        alamat: null,
        propinsi: '',
        kota: '',
        kode_pos: null,
        approved: null,
        website: null,
        kategori: '',
        kelompok: '',
      },
      dataSelect: {
        provinsi: [],
        kota: [],
        kelompok: [],
        kategori: [
          {
            id: 'Pemerintah Pusat',
            name: 'Pemerintah Pusat',
          },
          {
            id: 'Pemerintah Daerah',
            name: 'Pemerintah Daerah',
          },
        ],
      },
      errorValidations: {
        name: [],
        username: [],
        // password: [],
        nip: [],
        jabatan: [],
        no_telepon: [],
        instansi_induk: [],
        dokumen: [],
        no_hp: [],
        status_register: [],
        kota: [],
        propinsi: [],
      },
      errorValidationsAddAgency: {
        kelompok: [],
        kategori: [],
        name: [],
        alamat: [],
        propinsi: [],
        kota: [],
        kode_pos: [],
        website: [],
      },
      modal: {
        instansi: {
          showModal: false,
          title: null,
          color: null,
          pagination: {
            current_page: 1,
            last_page: 10,
            per_page: null,
          },
          add: false,
        },
      },
      search: {
        name: null,
      },
      listFilter: false,
      instansi: [],
      filename: 'Choose File',
    }
  },
  created() {
    this.getAgency()
    this.getProvince()
    this.getAgencyGroup()
  },
  methods: {
    clearFormOfficial() {
      this.forms.status_register = 1
      this.forms.username = ''
      // this.forms.password = ''
      // this.forms.password_confirmation = ''
      this.forms.nama = ''
      this.forms.nip = ''
      this.forms.jabatan = ''
      this.forms.no_telepon = ''
      this.forms.no_hp = ''
      this.forms.instansi_induk = ''
      this.forms.instansi_induk_text = ''
      this.forms.dokumen = ''
      this.filename = 'Choose File'
      this.forms.propinsi = ''
      this.forms.kota = ''
    },
    handleSubmit() {
      this.$refs.form.validate().then((success) => {
        if (!success) {
          return
        }
        const url = '/public/pejabat'
        const formData = new FormData()
        const forMapData = Object.entries(this.forms)
        forMapData.forEach((value) => {
          if (Array.isArray(value[1])) {
            for (let index = 0; index < value[1].length; index++) {
              formData.append(`${value[0]}[${index}]`, value[1][index])
            }
          } else {
            formData.append(value[0], value[1] === null ? [] : value[1])
          }
        })
        this.errorValidations.name = []
        this.errorValidations.username = []
        // this.errorValidations.password = []
        this.errorValidations.nip = []
        this.errorValidations.jabatan = []
        this.errorValidations.no_telepon = []
        this.errorValidations.instansi_induk = []
        this.errorValidations.dokumen = []
        this.errorValidations.no_hp = []
        this.errorValidations.status_register = []
        this.errorValidations.kota = []
        this.errorValidations.propinsi = []
        this.$http({
          method: 'post',
          url: url,
          data: formData,
        })
          .then((response) => {
            this.$toastr.s(response.data.message, 'Pemberitahuan')
            this.clearFormOfficial()
            // Wait until the models are updated in the UI
            this.$nextTick(() => {
              this.$refs.form.reset()
            })
          })
          .catch((error) => {
            if (error.response.status === 422) {
              this.$toastr.e('Silahkan Cek Form Anda Kembali', 'Pemberitahuan')
              this.errorValidations.name =
                typeof error.response.data.errors.name === 'undefined'
                  ? []
                  : error.response.data.errors.name
              this.errorValidations.username =
                typeof error.response.data.errors.username === 'undefined'
                  ? []
                  : error.response.data.errors.username
              // this.errorValidations.password =
              //   typeof error.response.data.errors.password === 'undefined'
              //     ? []
              //     : error.response.data.errors.password
              this.errorValidations.nip =
                typeof error.response.data.errors.nip === 'undefined'
                  ? []
                  : error.response.data.errors.nip
              this.errorValidations.jabatan =
                typeof error.response.data.errors.jabatan === 'undefined'
                  ? []
                  : error.response.data.errors.jabatan
              this.errorValidations.no_telepon =
                typeof error.response.data.errors.no_telepon === 'undefined'
                  ? []
                  : error.response.data.errors.no_telepon
              this.errorValidations.instansi_induk =
                typeof error.response.data.errors.instansi_induk === 'undefined'
                  ? []
                  : error.response.data.errors.instansi_induk
              this.errorValidations.dokumen =
                typeof error.response.data.errors.dokumen === 'undefined'
                  ? []
                  : error.response.data.errors.dokumen
              this.errorValidations.no_hp =
                typeof error.response.data.errors.no_hp === 'undefined'
                  ? []
                  : error.response.data.errors.no_hp
              this.errorValidations.propinsi =
                typeof error.response.data.errors.propinsi === 'undefined'
                  ? []
                  : error.response.data.errors.propinsi
              this.errorValidations.kota =
                typeof error.response.data.errors.kota === 'undefined'
                  ? []
                  : error.response.data.errors.kota
              this.errorValidations.status_register =
                typeof error.response.data.errors.status_register ===
                'undefined'
                  ? []
                  : error.response.data.errors.status_register
            } else if (error.response.status === 500) {
              this.$toastr.e('Ada Kesalahan dari Server', 'Pemberitahuan')
            } else {
              this.$toastr.e(error.response.data.message, 'Pemberitahuan')
            }
          })
      })
    },
    clearForm() {
      this.forms_add_agency.id = null
      this.forms_add_agency.name = null
      this.forms_add_agency.alamat = null
      this.forms_add_agency.propinsi = ''
      this.forms_add_agency.kota = ''
      this.forms_add_agency.kode_pos = null
      this.forms_add_agency.approved = null
      this.forms_add_agency.website = null
      this.forms_add_agency.kategori = ''
      this.forms_add_agency.kelompok = ''
    },
    getProvince() {
      axios
        .get(`${process.env.VUE_APP_BASE_API_URL}public/provinsi`)
        .then((response) => {
          this.dataSelect.provinsi = response.data.data
        })
        .catch((error) => {
          if (error.response.status === 500) {
            this.$toastr.e('Ada Kesalahan dari Server', 'Pemberitahuan')
          } else {
            this.$toastr.e(error.response.data.message, 'Pemberitahuan')
          }
        })
    },
    getDistrict() {
      axios
        .get(
          `${process.env.VUE_APP_BASE_API_URL}public/provinsi/${this.forms_add_agency.propinsi}/kota`
        )
        .then((response) => {
          this.dataSelect.kota = response.data.data
          this.forms.kota = ''
        })
        .catch((error) => {
          if (error.response.status === 500) {
            this.$toastr.e('Ada Kesalahan dari Server', 'Pemberitahuan')
          } else {
            this.$toastr.e(error.response.data.message, 'Pemberitahuan')
          }
        })
    },
    getDistrictDaftar() {
      axios
        .get(
          `${process.env.VUE_APP_BASE_API_URL}public/provinsi/${this.forms.propinsi}/kota`
        )
        .then((response) => {
          this.dataSelect.kota = response.data.data
          this.forms.kota = ''
        })
        .catch((error) => {
          if (error.response.status === 500) {
            this.$toastr.e('Ada Kesalahan dari Server', 'Pemberitahuan')
          } else {
            this.$toastr.e(error.response.data.message, 'Pemberitahuan')
          }
        })
    },
    getAgencyGroup() {
      axios
        .get(`${process.env.VUE_APP_BASE_API_URL}public/parconfig/agency/group`)
        .then((response) => {
          this.dataSelect.kelompok = response.data.data
        })
        .catch((error) => {
          if (error.response.status === 500) {
            this.$toastr.e('Ada Kesalahan dari Server', 'Pemberitahuan')
          } else {
            this.$toastr.e(error.response.data.message, 'Pemberitahuan')
          }
        })
    },
    cancelAddAgency() {
      this.modal.instansi.add = false
      this.modal.instansi.title = 'Instansi'
      this.modal.instansi.color = 'primary'
    },
    addAgency() {
      this.modal.instansi.add = true
      this.modal.instansi.title = 'Tambah Instansi'
      this.modal.instansi.color = 'success'
    },
    modalInstansi() {
      this.modal.instansi.showModal = true
      this.modal.instansi.title = 'Instansi'
      this.modal.instansi.color = 'primary'
      this.modal.instansi.add = false
    },
    getValue(value) {
      this.forms.instansi_induk = value.id
      this.forms.instansi_induk_text = value.name
      this.modal.instansi.showModal = false
    },
    validateWebsite() {
      const regex = new RegExp(/[a-z0-9.]+\.id?[\S]+/g)
      const value = this.forms_add_agency.website
        .toString()
        .replace(/[^a-zA-Z0-9.]/, '')
        .toLowerCase()
      if (regex.test(this.forms_add_agency.website)) {
        this.errorValidationsAddAgency.website = []
      } else {
        this.errorValidationsAddAgency.website = ['Format Webiste Tidak Sesuai']
        this.forms_add_agency.website = value
      }
    },
    validateKodePos() {
      const regex = new RegExp(/^[0-9]*$/)
      const value = this.forms_add_agency.kode_pos
        .toString()
        .replace(/[^\d]/g, '')
        .toLowerCase()
      if (regex.test(this.forms_add_agency.kode_pos)) {
        this.errorValidationsAddAgency.kode_pos = []
      } else {
        this.errorValidationsAddAgency.kode_pos = ['Hanya Boleh Angka']
        this.forms_add_agency.kode_pos = value
      }
    },
    submitPostPut() {
      const url = '/public/parinstansi'
      const formData = new FormData()
      const forMapData = Object.entries(this.forms_add_agency)
      forMapData.forEach((value) => {
        if (Array.isArray(value[1])) {
          for (let index = 0; index < value[1].length; index++) {
            formData.append(`${value[0]}[${index}]`, value[1][index])
          }
        } else {
          formData.append(value[0], value[1] === null ? [] : value[1])
        }
      })
      this.errorValidationsAddAgency.kelompok = []
      this.errorValidationsAddAgency.kategori = []
      this.errorValidationsAddAgency.name = []
      this.errorValidationsAddAgency.alamat = []
      this.errorValidationsAddAgency.propinsi = []
      this.errorValidationsAddAgency.kota = []
      this.errorValidationsAddAgency.kode_pos = []
      this.errorValidationsAddAgency.website = []

      this.$http({
        method: 'post',
        url: url,
        data: formData,
      })
        .then((response) => {
          this.filterAgency()
          this.$toastr.s(response.data.message, 'Pemberitahuan')
          this.clearForm()
        })
        .catch((error) => {
          if (error.response.status === 422) {
            this.$toastr.e('Silahkan Cek Form Anda Kembali', 'Pemberitahuan')
            this.errorValidationsAddAgency.kelompok =
              typeof error.response.data.errors.kelompok === 'undefined'
                ? []
                : error.response.data.errors.kelompok
            this.errorValidationsAddAgency.kategori =
              typeof error.response.data.errors.kategori === 'undefined'
                ? []
                : error.response.data.errors.kategori
            this.errorValidationsAddAgency.name =
              typeof error.response.data.errors.name === 'undefined'
                ? []
                : error.response.data.errors.name
            this.errorValidationsAddAgency.alamat =
              typeof error.response.data.errors.alamat === 'undefined'
                ? []
                : error.response.data.errors.alamat
            this.errorValidationsAddAgency.propinsi =
              typeof error.response.data.errors.propinsi === 'undefined'
                ? []
                : error.response.data.errors.propinsi
            this.errorValidationsAddAgency.kota =
              typeof error.response.data.errors.kota === 'undefined'
                ? []
                : error.response.data.errors.kota
            this.errorValidationsAddAgency.kode_pos =
              typeof error.response.data.errors.kode_pos === 'undefined'
                ? []
                : error.response.data.errors.kode_pos
            this.errorValidationsAddAgency.website =
              typeof error.response.data.errors.website === 'undefined'
                ? []
                : error.response.data.errors.website
          } else if (error.response.status === 500) {
            this.$toastr.e('Ada Kesalahan dari Server', 'Pemberitahuan')
          } else {
            this.$toastr.e(error.response.data.message, 'Pemberitahuan')
          }
        })
    },
    getAgency() {
      axios
        .get(`${process.env.VUE_APP_BASE_API_URL}public/parinstansi/filter`, {
          params: {
            page: this.modal.instansi.pagination.current_page,
            filter: 'name',
            q: this.search.name,
          },
        })
        .then((response) => {
          this.instansi = response.data.data
          this.modal.instansi.pagination.current_page =
            response.data.meta.current_page
          this.modal.instansi.pagination.last_page =
            response.data.meta.last_page
        })
        .catch((error) => {
          if (error.response.status === 500) {
            this.$toastr.e('Ada Kesalahan dari Server', 'Pemberitahuan')
          } else {
            this.$toastr.e(error.response.data.message, 'Pemberitahuan')
          }
        })
    },
    resetFilter() {
      this.search.name = null

      axios
        .get('api/public/parinstansi/filter', {
          params: {
            page: 1,
          },
        })
        .then((response) => {
          this.instansi = response.data.data
          this.modal.instansi.pagination.current_page =
            response.data.meta.current_page
          this.modal.instansi.pagination.last_page =
            response.data.meta.last_page
        })
        .catch((error) => {
          if (error.response.status === 500) {
            this.$toastr.e('Ada Kesalahan dari Server', 'Pemberitahuan')
          } else {
            this.$toastr.e(error.response.data.message, 'Pemberitahuan')
          }
        })
    },
    filter() {
      this.listFilter = !this.listFilter
      this.search.name = null
    },
    clearFilter() {
      this.search.name = null
    },
    filterAgency() {
      axios
        .get(`${process.env.VUE_APP_BASE_API_URL}public/parinstansi/filter`, {
          params: {
            page: 1,
            filter: 'name',
            q: this.search.name,
          },
        })
        .then((response) => {
          this.instansi = response.data.data
          this.modal.instansi.pagination.current_page =
            response.data.meta.current_page
          this.modal.instansi.pagination.last_page =
            response.data.meta.last_page
        })
        .catch((error) => {
          if (error.response.status === 500) {
            this.$toastr.e('Ada Kesalahan dari Server', 'Pemberitahuan')
          } else {
            this.$toastr.e(error.response.data.message, 'Pemberitahuan')
          }
        })
    },
    onFilePickedDocument() {
      if (event.target.files[0].type === 'application/pdf') {
        this.forms.dokumen = event.target.files[0]
        this.filename = event.target.files[0].name
      } else {
        this.forms.dokumen = null
        this.filename = 'Choose File'
      }
    },
  },
}
</script>

<style scoped lang="scss">
.has-error-file {
  display: block;
  width: 100%;
  margin-top: 0.25rem;
  font-size: 80%;
  color: #dc3545;
}
.primary-color-link {
  font-weight: 400;
  color: #ff5f5f;
  text-decoration: none;
}
.primary-color {
  color: #fff;
  background-color: #025fc4;
}
</style>

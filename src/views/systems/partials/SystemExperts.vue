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
          <template v-if="expertsRequired.length > 0">
            <tr
              v-for="(value, index) in expertsRequired"
              :key="`experts-required-${index}`"
            >
              <td>{{ index + 1 }}</td>
              <td>{{ value.name_jenis }}</td>
              <td>{{ value.jumlah_personil }}</td>
              <td>{{ value.name_status }}</td>
              <td>
                <CButton
                  color="danger"
                  size="sm"
                  class="mr-2"
                  v-c-tooltip="{
                    content: 'Hapus Tenaga Ahli',
                    placement: 'bottom',
                  }"
                  @click="destroyExpertsRequired(value)"
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
                  @click="editExpertsRequired(value)"
                >
                  <CIcon name="cil-pencil" />
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
    <CModal
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
    <ValidationObserver v-slot="{ invalid }" ref="form_availability_of_experts">
      <CModal
        :title="modal.availabilityOfExperts.title"
        :color="modal.availabilityOfExperts.color"
        :show.sync="modal.availabilityOfExperts.showModal"
      >
        <template v-slot:body-wrapper>
          <div class="modal-body">
            <CRow>
              <CCol sm="12">
                <div class="form-group">
                  <label for="jenis">Jenis</label>
                  <ValidationProvider
                    name="Jenis"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <select
                      v-model="forms.availabilityOfExperts.jenis"
                      class="form-control"
                      :class="{
                        'is-invalid':
                          errors.length > 0 ||
                          errorValidations.availabilityOfExperts.jenis.length >
                            0,
                      }"
                    >
                      <option value="">Pilih Jenis</option>
                      <option
                        v-for="(value,
                        index) in dataSelect.typeAvailabilityOfExperts"
                        :value="value.id"
                        :key="`availbility-of-experts-${index}`"
                      >
                        {{ value.param_value }}
                      </option>
                    </select>
                    <div v-if="errors.length > 0" class="invalid-feedback">
                      {{ errors[0] }}
                    </div>
                  </ValidationProvider>
                  <message
                    :messages="errorValidations.availabilityOfExperts.jenis"
                  />
                </div>
              </CCol>
              <CCol sm="12">
                <div class="form-group">
                  <label for="jumlah_personil">Jumlah Personil</label>
                  <ValidationProvider
                    name="Jumlah Personil"
                    rules="required|numeric"
                    v-slot="{ errors }"
                  >
                    <input
                      v-model="forms.availabilityOfExperts.jumlah_personil"
                      type="number"
                      name="name"
                      placeholder="Masukan Jumlah Personil"
                      class="form-control"
                      :class="{
                        'is-invalid':
                          errors.length > 0 ||
                          errorValidations.availabilityOfExperts.jumlah_personil
                            .length > 0,
                      }"
                      @blur="
                        errorValidations.availabilityOfExperts.jumlah_personil = []
                      "
                    />
                    <div v-if="errors.length > 0" class="invalid-feedback">
                      {{ errors[0] }}
                    </div>
                  </ValidationProvider>
                </div>
                <message
                  :messages="
                    errorValidations.availabilityOfExperts.jumlah_personil
                  "
                />
              </CCol>
              <CCol sm="12">
                <div class="form-group">
                  <label for="kompetensi">Status</label>
                  <ValidationProvider
                    name="Status"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <select
                      v-model="forms.availabilityOfExperts.kompetensi"
                      class="form-control"
                      :class="{
                        'is-invalid':
                          errors.length > 0 ||
                          errorValidations.availabilityOfExperts.kompetensi
                            .length > 0,
                      }"
                    >
                      <option value="">Pilih Status</option>
                      <option
                        v-for="(value,
                        index) in dataSelect.statusAvailabilityOfExperts"
                        :value="value.id"
                        :key="`availbility-of-experts-${index}`"
                      >
                        {{ value.param_value }}
                      </option>
                    </select>
                    <div v-if="errors.length > 0" class="invalid-feedback">
                      {{ errors[0] }}
                    </div>
                  </ValidationProvider>
                  <message
                    :messages="
                      errorValidations.availabilityOfExperts.kompetensi
                    "
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
            @click="closeModalAvailabilityOfExperts"
          >
            Cancel
          </CButton>
          <CButton
            color="primary"
            size="sm"
            class="m-2"
            @click="submitAvailabilityOfExperts"
            :disabled="invalid"
          >
            {{ modal.availabilityOfExperts.labelButton }}
          </CButton>
        </template>
      </CModal>
    </ValidationObserver>
    <ValidationObserver v-slot="{ invalid }" ref="form_experts_required">
      <CModal
        :title="modal.expertsRequired.title"
        :color="modal.expertsRequired.color"
        :show.sync="modal.expertsRequired.showModal"
      >
        <template v-slot:body-wrapper>
          <div class="modal-body">
            <CRow>
              <CCol sm="12">
                <div class="form-group">
                  <label for="jenis">Jenis</label>
                  <ValidationProvider
                    name="Jenis"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <select
                      v-model="forms.expertsRequired.jenis"
                      class="form-control"
                      :class="{
                        'is-invalid':
                          errors.length > 0 ||
                          errorValidations.expertsRequired.jenis.length > 0,
                      }"
                    >
                      <option value="">Pilih Jenis</option>
                      <option
                        v-for="(value,
                        index) in dataSelect.typeAvailabilityOfExperts"
                        :value="value.id"
                        :key="`availbility-of-experts-${index}`"
                      >
                        {{ value.param_value }}
                      </option>
                    </select>
                    <div v-if="errors.length > 0" class="invalid-feedback">
                      {{ errors[0] }}
                    </div>
                  </ValidationProvider>
                  <message :messages="errorValidations.expertsRequired.jenis" />
                </div>
              </CCol>
              <CCol sm="12">
                <div class="form-group">
                  <label for="jumlah_personil">Jumlah Personil</label>
                  <ValidationProvider
                    name="Jumlah Personil"
                    rules="required|numeric"
                    v-slot="{ errors }"
                  >
                    <input
                      v-model="forms.expertsRequired.jumlah_personil"
                      type="number"
                      name="name"
                      placeholder="Masukan Jumlah Personil"
                      class="form-control"
                      :class="{
                        'is-invalid':
                          errors.length > 0 ||
                          errorValidations.expertsRequired.jumlah_personil
                            .length > 0,
                      }"
                      @blur="
                        errorValidations.expertsRequired.jumlah_personil = []
                      "
                    />
                    <div v-if="errors.length > 0" class="invalid-feedback">
                      {{ errors[0] }}
                    </div>
                  </ValidationProvider>
                </div>
                <message
                  :messages="errorValidations.expertsRequired.jumlah_personil"
                />
              </CCol>
              <CCol sm="12">
                <div class="form-group">
                  <label for="status">Status</label>
                  <ValidationProvider
                    name="Status"
                    rules="required"
                    v-slot="{ errors }"
                  >
                    <textarea
                      v-model="forms.expertsRequired.status"
                      cols="30"
                      rows="10"
                      class="form-control"
                      :class="{
                        'is-invalid':
                          errors.length > 0 ||
                          errorValidations.expertsRequired.status.length > 0,
                      }"
                    ></textarea>
                    <div v-if="errors.length > 0" class="invalid-feedback">
                      {{ errors[0] }}
                    </div>
                  </ValidationProvider>
                  <message
                    :messages="errorValidations.expertsRequired.status"
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
            @click="closeModalExpertsRequired"
          >
            Cancel
          </CButton>
          <CButton
            color="primary"
            size="sm"
            class="m-2"
            @click="submitExpertsRequired"
            :disabled="invalid"
          >
            {{ modal.expertsRequired.labelButton }}
          </CButton>
        </template>
      </CModal>
    </ValidationObserver>
  </div>
</template>

<script>
export default {
  name: 'SystemExperts',
}
</script>

<style></style>

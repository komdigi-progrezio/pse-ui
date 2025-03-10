<template>
  <div class="mt-2">
    <h5>Perangkat Keras Utama</h5>
    <hr />
    <button
      v-if="system.approved_publish == true && system.is_locked !== true"
      class="btn btn-link d-flex"
      @click="openModalHardware('Simpan', 'Tambah Perangkat Keras Utama')"
    >
      <CIcon name="cil-plus" class="align-self-center mr-2" />
      <a class="align-self-center">Tambah Perangkat Keras Utama</a>
    </button>

    <div class="table-responsive classic">
      <table class="table table-stripped">
        <thead>
          <tr>
            <td>No</td>
            <td>Jenis</td>
            <td>Pemilik</td>
            <td>Bandwidth</td>
            <td>Processor</td>
            <td>Memory</td>
            <td>Digunakan Bersama - Sama ?</td>
            <td v-if="system.is_locked !== true" colspan="2">Aksi</td>
          </tr>
        </thead>
        <tbody>
          <template v-if="hardware.length > 0">
            <tr v-for="(item, index) in hardware" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ item.nama_jenis }}</td>
              <td>{{ item.nama_pemilik }}</td>
              <td>{{ item.bandwidth }}</td>
              <td>{{ item.processor }}</td>
              <td>{{ item.memory }}</td>
              <td>{{ item.shared ? 'Ya' : 'Tidak' }}</td>
              <td v-if="system.is_locked !== true">
                <CButton
                  color="danger"
                  size="sm"
                  class="mr-2"
                  v-c-tooltip="{
                    content: 'Hapus Perangkat Keras Utama',
                    placement: 'bottom',
                  }"
                  @click="openModalDeleteHardware(item)"
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
                  @click="
                    openModalHardware(
                      'Update',
                      'Ubah Perangkat Keras Utama',
                      item
                    )
                  "
                >
                  <CIcon name="cil-pencil" />
                </CButton>
              </td>
            </tr>
          </template>

          <template v-else>
            <tr>
              <td colspan="8" class="text-center"> Data Kosong </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>

    <h5>Perangkat Jaringan</h5>
    <hr />
    <button
      v-if="system.approved_publish == true && system.is_locked !== true"
      class="btn btn-link d-flex"
      @click="openModalNetwork('Simpan', 'Tambah Perangkat Jaringan')"
    >
      <CIcon name="cil-plus" class="align-self-center mr-2" />
      <a class="align-self-center">Tambah Perangkat Jaringan</a>
    </button>
    <div class="table-responsive classic">
      <table class="table table-stripped">
        <thead>
          <tr>
            <td>No</td>
            <td>Jenis</td>
            <td>Tipe</td>
            <td>Keterangan</td>
            <td v-if="system.is_locked !== true" colspan="2">Aksi</td>
          </tr>
        </thead>
        <tbody>
          <template v-if="network.length > 0">
            <tr v-for="(item, index) in network" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ item.nama_jenis }}</td>
              <td>{{ item.type }}</td>
              <td>{{ item.keterangan }}</td>
              <td v-if="system.is_locked !== true">
                <CButton
                  color="danger"
                  size="sm"
                  class="mr-2"
                  v-c-tooltip="{
                    content: 'Hapus Perangkat Jaringan',
                    placement: 'bottom',
                  }"
                  @click="openModalDeleteNetwork(item)"
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
                  @click="
                    openModalNetwork('Update', 'Ubah Perangkat Jaringan', item)
                  "
                >
                  <CIcon name="cil-pencil" />
                </CButton>
              </td>
            </tr>
          </template>

          <template v-else>
            <tr>
              <td colspan="5" class="text-center"> Data Kosong </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>

    <h5>Perangkat Khusus</h5>
    <hr />
    <button
      v-if="system.approved_publish == true && system.is_locked !== true"
      class="btn btn-link d-flex"
      @click="openModalPeripheral('Simpan', 'Tambah Perangkat Khusus')"
    >
      <CIcon name="cil-plus" class="align-self-center mr-2" />
      <a class="align-self-center">Tambah Perangkat Khusus</a>
    </button>
    <div class="table-responsive classic">
      <table class="table table-stripped">
        <thead>
          <tr>
            <td>No</td>
            <td>Jenis</td>
            <td>Tipe</td>
            <td>Keterangan</td>
            <td v-if="system.is_locked !== true" colspan="2">Aksi</td>
          </tr>
        </thead>
        <tbody>
          <template v-if="peripheral.length > 0">
            <tr v-for="(item, index) in peripheral" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ item.nama_jenis }}</td>
              <td>{{ item.type }}</td>
              <td>{{ item.keterangan }}</td>
              <td v-if="system.is_locked !== true">
                <CButton
                  color="danger"
                  size="sm"
                  class="mr-2"
                  v-c-tooltip="{
                    content: 'Hapus Perangkat Khusus',
                    placement: 'bottom',
                  }"
                  @click="openModalDeletePeripheral(item)"
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
                  @click="
                    openModalPeripheral('Update', 'Ubah Perangkat Khusus', item)
                  "
                >
                  <CIcon name="cil-pencil" />
                </CButton>
              </td>
            </tr>
          </template>

          <template v-else>
            <tr>
              <td colspan="5" class="text-center"> Data Kosong </td>
            </tr>
          </template>
        </tbody>
      </table>
    </div>

    <ValidationObserver
      v-if="system.approved_publish == true && system.is_locked !== true"
      v-slot="{ invalid }"
      :ref="hardwareForm"
    >
      <CModal
        :title="modal.hardware.title"
        :show.sync="modal.hardware.show"
        color="success"
      >
        <template v-slot:body-wrapper>
          <div class="modal-body">
            <CRow>
              <CCol sm="12">
                <div class="form-group">
                  <label for="nama_dasar_hukum"> Jenis<span class="text-danger">*</span> </label>

                  <ValidationProvider
                    name="jenis"
                    :rules="validation.hardware.jenis.rules"
                    :custom-messages="validation.hardware.jenis.message"
                    v-slot="{ errors }"
                    mode="aggressive"
                  >
                    <select
                      v-model="form.primaryHardware.jenis"
                      class="form-control"
                      :class="{ 'is-invalid': errors[0] ? true : false }"
                    >
                      <option value="">Pilih Jenis</option>

                      <option
                        v-for="(option, index) in options.hardware.types"
                        :key="index"
                        :value="option.id"
                      >
                        {{ option.param_value }}
                      </option>
                    </select>

                    <div v-if="errors.length > 0" class="invalid-feedback">
                      {{ errors[0] }}
                    </div>
                  </ValidationProvider>
                </div>

                <div class="form-group">
                  <label for="nama_dasar_hukum"> Pemilik<span class="text-danger">*</span> </label>

                  <ValidationProvider
                    name="pemilik"
                    :rules="validation.hardware.pemilik.rules"
                    :custom-messages="validation.hardware.pemilik.message"
                    v-slot="{ errors }"
                    mode="aggressive"
                  >
                    <select
                      v-model="form.primaryHardware.pemilik"
                      class="form-control"
                      :class="{ 'is-invalid': errors[0] ? true : false }"
                    >
                      <option value="">Pilih Pemilik</option>

                      <option
                        v-for="(option, index) in options.hardware.owners"
                        :key="index"
                        :value="option.id"
                      >
                        {{ option.param_value }}
                      </option>
                    </select>

                    <div v-if="errors.length > 0" class="invalid-feedback">
                      {{ errors[0] }}
                    </div>
                  </ValidationProvider>
                </div>

                <div class="form-group">
                  <label for=""> Tipe<span class="text-danger">*</span> </label>

                  <ValidationProvider
                    name="tipe"
                    :rules="validation.hardware.tipe.rules"
                    :custom-messages="validation.hardware.tipe.message"
                    v-slot="{ errors }"
                    mode="aggressive"
                  >
                    <input
                      type="text"
                      class="form-control"
                      v-model="form.primaryHardware.tipe"
                      :class="{ 'is-invalid': errors[0] ? true : false }"
                    />

                    <div v-if="errors.length > 0" class="invalid-feedback">
                      {{ errors[0] }}
                    </div>
                  </ValidationProvider>
                </div>

                <div class="form-group">
                  <label for=""> Jumlah<span class="text-danger">*</span> </label>

                  <ValidationProvider
                    name="jumlah"
                    :rules="validation.hardware.jumlah.rules"
                    :custom-messages="validation.hardware.jumlah.message"
                    v-slot="{ errors }"
                    mode="aggressive"
                  >
                    <input
                      type="text"
                      class="form-control"
                      v-model="form.primaryHardware.jumlah"
                      :class="{ 'is-invalid': errors[0] ? true : false }"
                    />

                    <div v-if="errors.length > 0" class="invalid-feedback">
                      {{ errors[0] }}
                    </div>
                  </ValidationProvider>
                </div>

                <div class="form-group">
                  <label for=""> Processor<span class="text-danger">*</span> </label>

                  <ValidationProvider
                    name="processor"
                    :rules="validation.hardware.processor.rules"
                    :custom-messages="validation.hardware.processor.message"
                    v-slot="{ errors }"
                    mode="aggressive"
                  >
                    <input
                      type="text"
                      class="form-control"
                      v-model="form.primaryHardware.processor"
                      :class="{ 'is-invalid': errors[0] ? true : false }"
                    />

                    <div v-if="errors.length > 0" class="invalid-feedback">
                      {{ errors[0] }}
                    </div>
                  </ValidationProvider>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-4">
                    <label for="">Kapasitas harddisk<span class="text-danger">*</span></label>

                    <ValidationProvider
                      name="harddisk"
                      :rules="validation.hardware.harddisk.rules"
                      :custom-messages="validation.hardware.harddisk.message"
                      v-slot="{ errors }"
                      mode="aggressive"
                    >
                      <input
                        type="text"
                        class="form-control"
                        v-model="form.primaryHardware.harddisk"
                        :class="{ 'is-invalid': errors[0] ? true : false }"
                      />

                      <div v-if="errors.length > 0" class="invalid-feedback">
                        {{ errors[0] }}
                      </div>
                    </ValidationProvider>
                  </div>

                  <div class="form-group col-md-3">
                    <label for="" class="text-white">-</label>

                    <select
                      class="form-control"
                      v-model="form.primaryHardware.harddisk_satuan"
                    >
                      <option
                        v-for="(size, index) in options.sizes"
                        :key="index"
                        :value="size.value"
                      >
                        {{ size.label }}
                      </option>
                    </select>
                  </div>
                </div>

                <div class="form-row">
                  <div class="form-group col-md-4">
                    <label for="">Kapasitas Memory<span class="text-danger">*</span></label>

                    <ValidationProvider
                      name="memory"
                      :rules="validation.hardware.memory.rules"
                      :custom-messages="validation.hardware.memory.message"
                      v-slot="{ errors }"
                      mode="aggressive"
                    >
                      <input
                        type="text"
                        class="form-control"
                        v-model="form.primaryHardware.memory"
                        :class="{ 'is-invalid': errors[0] ? true : false }"
                      />

                      <div v-if="errors.length > 0" class="invalid-feedback">
                        {{ errors[0] }}
                      </div>
                    </ValidationProvider>
                  </div>

                  <div class="form-group col-md-3">
                    <label for="" class="text-white">-</label>

                    <select
                      class="form-control"
                      v-model="form.primaryHardware.memory_satuan"
                    >
                      <option
                        v-for="(size, index) in options.sizes"
                        :key="index"
                        :value="size.value"
                      >
                        {{ size.label }}
                      </option>
                    </select>
                  </div>
                </div>

                <div class="form-group">
                  <div class="d-flex">
                    <label for=""> Menggunakan Fasilitas Data Center?<span class="text-danger">*</span> </label>

                    <div class="form-check ml-2">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="exampleRadios1"
                        id="exampleRadios3"
                        :value="1"
                        v-model="form.primaryHardware.fasilitas_data_center"
                      />
                      <label class="form-check-label" for="exampleRadios3">
                        Ya
                      </label>
                    </div>

                    <div class="form-check ml-2">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="exampleRadios1"
                        id="exampleRadios4"
                        :value="0"
                        v-model="form.primaryHardware.fasilitas_data_center"
                      />
                      <label class="form-check-label" for="exampleRadios4">
                        Tidak
                      </label>
                    </div>
                  </div>
                </div>

                <template v-if="form.primaryHardware.fasilitas_data_center">
                  <div class="form-group">
                    <label for="">Lokasi<span class="text-danger">*</span></label>

                    <ValidationProvider
                      name="lokasi"
                      :rules="
                        form.primaryHardware.fasilitas_data_center
                          ? validation.hardware.lokasi.rules
                          : ''
                      "
                      :custom-messages="validation.hardware.lokasi.message"
                      v-slot="{ errors }"
                      mode="aggressive"
                    >
                      <input
                        type="text"
                        class="form-control"
                        v-model="form.primaryHardware.lokasi"
                        :class="{ 'is-invalid': errors[0] ? true : false }"
                      />

                      <div v-if="errors.length > 0" class="invalid-feedback">
                        {{ errors[0] }}
                      </div>
                    </ValidationProvider>
                  </div>

                  <div class="form-group">
                    <label for="">Penyedia Data Center<span class="text-danger">*</span></label>

                    <ValidationProvider
                      name="data_center"
                      :rules="
                        form.primaryHardware.fasilitas_data_center
                          ? validation.hardware.data_center.rules
                          : ''
                      "
                      :custom-messages="validation.hardware.data_center.message"
                      v-slot="{ errors }"
                      mode="aggressive"
                    >
                      <input
                        type="text"
                        class="form-control"
                        v-model="form.primaryHardware.data_center"
                        :class="{ 'is-invalid': errors[0] ? true : false }"
                      />

                      <div v-if="errors.length > 0" class="invalid-feedback">
                        {{ errors[0] }}
                      </div>
                    </ValidationProvider>
                  </div>

                  <div class="form-row">
                    <div class="form-group col-md-4">
                      <label for="">Bandwidth<span class="text-danger">*</span></label>

                      <ValidationProvider
                        name="bandwidth"
                        :rules="
                          form.primaryHardware.fasilitas_data_center
                            ? validation.hardware.bandwidth.rules
                            : ''
                        "
                        :custom-messages="validation.hardware.bandwidth.message"
                        v-slot="{ errors }"
                        mode="aggressive"
                      >
                        <input
                          type="text"
                          class="form-control"
                          v-model="form.primaryHardware.bandwidth"
                          :class="{ 'is-invalid': errors[0] ? true : false }"
                        />

                        <div v-if="errors.length > 0" class="invalid-feedback">
                          {{ errors[0] }}
                        </div>
                      </ValidationProvider>
                    </div>

                    <div class="form-group col-md-3">
                      <label for="" class="text-white">-</label>

                      <select
                        class="form-control"
                        v-model="form.primaryHardware.bandwidth_satuan"
                      >
                        <option
                          v-for="(bandwidthOption, index) in options.bandwidths"
                          :key="index"
                          :value="bandwidthOption.value"
                        >
                          {{ bandwidthOption.label }}
                        </option>
                      </select>
                    </div>
                  </div>
                </template>

                <div class="form-group">
                  <div class="d-flex">
                    <label for="">
                      Server digunakan bersama dengan aplikasi lain?<span class="text-danger">*</span>
                    </label>

                    <div class="form-check ml-2">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="exampleRadios"
                        id="exampleRadios1"
                        :value="1"
                        v-model="form.primaryHardware.shared"
                      />

                      <label class="form-check-label" for="exampleRadios1">
                        Ya
                      </label>
                    </div>

                    <div class="form-check ml-2">
                      <input
                        class="form-check-input"
                        type="radio"
                        name="exampleRadios"
                        id="exampleRadios2"
                        :value="0"
                        v-model="form.primaryHardware.shared"
                      />

                      <label class="form-check-label" for="exampleRadios2">
                        Tidak
                      </label>
                    </div>
                  </div>
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
            @click="closeModalHardware"
          >
            Cancel
          </CButton>

          <CButton
            color="primary"
            size="sm"
            class="m-2"
            @click="saveHardware"
            :disabled="invalid"
          >
            {{ modal.hardware.type }}
          </CButton>
        </template>
      </CModal>
    </ValidationObserver>

    <CModal
      v-if="system.is_locked !== true"
      :title="modal.primaryHardwareDelete.title"
      color="danger"
      :show.sync="modal.primaryHardwareDelete.show"
    >
      <template v-slot:body-wrapper>
        <div class="modal-body">
          <p> Ingin menghapus data ? </p>
        </div>
      </template>
      <template v-slot:footer>
        <CButton
          color="secondary"
          size="sm"
          class="m-2"
          @click="closeModalDeleteHardware()"
        >
          Cancel
        </CButton>

        <CButton
          color="primary"
          size="sm"
          class="m-2"
          @click="deleteHardware()"
        >
          Hapus
        </CButton>
      </template>
    </CModal>

    <ValidationObserver
      v-if="system.is_locked !== true"
      v-slot="{ invalid }"
      :ref="networkForm"
    >
      <CModal
        :title="modal.network.title"
        :show.sync="modal.network.show"
        color="success"
      >
        <template v-slot:body-wrapper>
          <div class="modal-body">
            <CRow>
              <CCol sm="12">
                <div class="form-group">
                  <label for=""> Jenis </label>

                  <ValidationProvider
                    name="jenis"
                    :rules="validation.network.jenis.rules"
                    :custom-messages="validation.network.jenis.message"
                    v-slot="{ errors }"
                    mode="aggressive"
                  >
                    <select
                      class="form-control"
                      v-model="form.network.jenis"
                      :class="{ 'is-invalid': errors[0] ? true : false }"
                    >
                      <option value="">Pilih Jenis</option>

                      <option
                        v-for="(type, index) in options.network.types"
                        :key="index"
                        :value="type.id"
                      >
                        {{ type.param_value }}
                      </option>
                    </select>

                    <div v-if="errors.length > 0" class="invalid-feedback">
                      {{ errors[0] }}
                    </div>
                  </ValidationProvider>
                </div>

                <div class="form-group">
                  <label for="">
                    Tipe <small class="text-danger">*</small>
                  </label>

                  <ValidationProvider
                    name="type"
                    :rules="validation.network.type.rules"
                    :custom-messages="validation.network.type.message"
                    v-slot="{ errors }"
                    mode="aggressive"
                  >
                    <input
                      type="text"
                      class="form-control"
                      v-model="form.network.type"
                      :class="{ 'is-invalid': errors[0] ? true : false }"
                    />

                    <div v-if="errors.length > 0" class="invalid-feedback">
                      {{ errors[0] }}
                    </div>
                  </ValidationProvider>
                </div>

                <div class="form-group">
                  <label for=""> Keterangan </label>

                  <textarea
                    type="text"
                    class="form-control"
                    v-model="form.network.keterangan"
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
            @click="closeModalNetwork"
          >
            Cancel
          </CButton>

          <CButton
            color="primary"
            size="sm"
            class="m-2"
            :disabled="invalid"
            @click="saveNetwork"
          >
            {{ modal.network.type }}
          </CButton>
        </template>
      </CModal>
    </ValidationObserver>

    <CModal
      v-if="system.is_locked !== true"
      :title="modal.networkDelete.title"
      color="danger"
      :show.sync="modal.networkDelete.show"
    >
      <template v-slot:body-wrapper>
        <div class="modal-body">
          <p> Ingin menghapus data ? </p>
        </div>
      </template>
      <template v-slot:footer>
        <CButton
          color="secondary"
          size="sm"
          class="m-2"
          @click="closeModalDeleteNetwork()"
        >
          Cancel
        </CButton>

        <CButton color="primary" size="sm" class="m-2" @click="deleteNetwork()">
          Hapus
        </CButton>
      </template>
    </CModal>

    <ValidationObserver
      v-if="system.is_locked !== true"
      v-slot="{ invalid }"
      :ref="peripheralForm"
    >
      <CModal
        :title="modal.peripheral.title"
        :show.sync="modal.peripheral.show"
        color="success"
      >
        <template v-slot:body-wrapper>
          <div class="modal-body">
            <CRow>
              <CCol sm="12">
                <div class="form-group">
                  <label for=""> Jenis </label>

                  <ValidationProvider
                    name="jenis"
                    :rules="validation.peripheral.jenis.rules"
                    :custom-messages="validation.peripheral.jenis.message"
                    v-slot="{ errors }"
                    mode="aggressive"
                  >
                    <select
                      class="form-control"
                      v-model="form.peripheral.jenis"
                      :class="{ 'is-invalid': errors[0] ? true : false }"
                    >
                      <option value="">Pilih Jenis</option>

                      <option
                        v-for="(type, index) in options.peripheral.types"
                        :key="index"
                        :value="type.id"
                      >
                        {{ type.param_value }}
                      </option>
                    </select>

                    <div v-if="errors.length > 0" class="invalid-feedback">
                      {{ errors[0] }}
                    </div>
                  </ValidationProvider>
                </div>

                <div class="form-group">
                  <label for="">
                    Tipe <small class="text-danger">*</small>
                  </label>

                  <ValidationProvider
                    name="type"
                    :rules="validation.peripheral.type.rules"
                    :custom-messages="validation.peripheral.type.message"
                    v-slot="{ errors }"
                    mode="aggressive"
                  >
                    <input
                      type="text"
                      class="form-control"
                      v-model="form.peripheral.type"
                      :class="{ 'is-invalid': errors[0] ? true : false }"
                    />

                    <div v-if="errors.length > 0" class="invalid-feedback">
                      {{ errors[0] }}
                    </div>
                  </ValidationProvider>
                </div>

                <div class="form-group">
                  <label for=""> Keterangan </label>

                  <textarea
                    type="text"
                    class="form-control"
                    v-model="form.peripheral.keterangan"
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
            @click="closeModalPeripheral"
          >
            Cancel
          </CButton>

          <CButton
            color="primary"
            size="sm"
            class="m-2"
            :disabled="invalid"
            @click="savePeripheral"
          >
            {{ modal.peripheral.type }}
          </CButton>
        </template>
      </CModal>
    </ValidationObserver>

    <CModal
      v-if="system.is_locked !== true"
      :title="modal.peripheralDelete.title"
      color="danger"
      :show.sync="modal.peripheralDelete.show"
    >
      <template v-slot:body-wrapper>
        <div class="modal-body">
          <p> Ingin menghapus data ? </p>
        </div>
      </template>
      <template v-slot:footer>
        <CButton
          color="secondary"
          size="sm"
          class="m-2"
          @click="closeModalDeletePeripheral()"
        >
          Cancel
        </CButton>

        <CButton
          color="primary"
          size="sm"
          class="m-2"
          @click="deletePeripheral()"
        >
          Hapus
        </CButton>
      </template>
    </CModal>
  </div>
</template>

<script>
export default {
  name: 'SystemHardware',
  props: {
    system: {
      type: Object,
      required: true,
      default: () => {},
    },
    systemId: {
      type: Number,
      default: null,
    },

    hardware: {
      type: Array,
      default: () => [],
    },

    network: {
      type: Array,
      default: () => [],
    },

    peripheral: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      options: {
        hardware: {
          owners: [],
          types: [],
        },
        network: {
          types: [],
        },
        peripheral: {
          types: [],
        },
        sizes: [
          {
            label: 'KB',
            value: 'KB',
          },
          {
            label: 'MB',
            value: 'MB',
          },
          {
            label: 'GB',
            value: 'GB',
          },
          {
            label: 'TB',
            value: 'TB',
          },
        ],
        bandwidths: [
          {
            label: 'Kbps',
            value: 'Kbps',
          },
          {
            label: 'Mbps',
            value: 'Mbps',
          },
          {
            label: 'Gbps',
            value: 'Gbps',
          },
          {
            label: 'Tbps',
            value: 'Tbps',
          },
        ],
      },
      hardwareForm: 'HardwareForm',
      networkForm: 'NetworkForm',
      peripheralForm: 'PeripheralForm',
      modal: {
        hardware: {
          show: false,
          title: null,
          type: null,
        },
        primaryHardwareDelete: {
          title: 'Hapus Perangkat Keras Utama',
          show: false,
          data: null,
        },
        network: {
          show: false,
          title: null,
          type: null,
        },
        networkDelete: {
          title: 'Hapus Perangkat Jaringan',
          show: false,
          data: null,
        },
        peripheral: {
          show: false,
          title: null,
          type: null,
        },
        peripheralDelete: {
          title: 'Hapus Perangkat Khusus',
          show: false,
          data: null,
        },
      },
      form: {
        primaryHardware: {
          sis_profil_id: null,
          jenis: '',
          pemilik: '',
          tipe: null,
          jumlah: null,
          processor: null,
          harddisk: null,
          memory: null,
          lokasi: null,
          data_center: null,
          bandwidth: null,
          shared: 0,
          fasilitas_data_center: 0,
          harddisk_satuan: 'KB',
          memory_satuan: 'KB',
          bandwidth_satuan: 'Kbps',
        },

        network: {
          sis_profil_id: null,
          jenis: '',
          type: null,
          keterangan: null,
        },

        peripheral: {
          sis_profil_id: null,
          jenis: '',
          type: null,
          keterangan: null,
        },
      },
      validation: {
        hardware: {
          jenis: {
            rules: 'required',
            message: {
              required: 'Jenis harus diisi.',
            },
          },
          pemilik: {
            rules: 'required',
            message: {
              required: 'Pemilik harus diisi.',
            },
          },
          tipe: {
            rules: 'required',
            message: {
              required: 'Tipe harus diisi.',
            },
          },
          jumlah: {
            rules: 'required|integer',
            message: {
              required: 'Jumlah harus diisi.',
            },
          },
          processor: {
            rules: 'required',
            message: {
              required: 'Processor harus diisi.',
            },
          },
          harddisk: {
            rules: 'required|integer',
            message: {
              required: 'Kapasitas harddisk harus diisi.',
            },
          },
          memory: {
            rules: 'required|integer',
            message: {
              required: 'Kapasitas memory harus diisi.',
            },
          },
          lokasi: {
            rules: 'required',
            message: {
              required: 'Lokasi harus diisi.',
            },
          },
          data_center: {
            rules: 'required',
            message: {
              required: 'Penyedia data center harus diisi.',
            },
          },
          bandwidth: {
            rules: 'required|integer',
            message: {
              required: 'Bandwidth harus diisi.',
            },
          },
        },

        network: {
          jenis: {
            rules: 'required',
            message: {
              required: 'Jenis harus dipilih.',
            },
          },
          type: {
            rules: 'required',
            message: {
              required: 'Tipe harus diisi.',
            },
          },
        },

        peripheral: {
          jenis: {
            rules: 'required',
            message: {
              required: 'Jenis harus dipilih.',
            },
          },
          type: {
            rules: 'required',
            message: {
              required: 'Tipe harus diisi.',
            },
          },
        },
      },
    }
  },
  created() {
    this.fetchOwnerOptions()
    this.fetchTypeOptions()
    this.fetchTypeNetworkOptions()
    this.fetchTypePeripheralOptions()
  },
  mounted() {
    this.form.primaryHardware.sis_profil_id = this.systemId
    this.form.network.sis_profil_id = this.systemId
  },
  methods: {
    refreshData() {
      this.$emit('update-data')
    },

    fetchOwnerOptions() {
      this.$http
        .get('parconfig/category', {
          params: {
            filter: 'category',
            q: 'par_pemilik_hardware',
          },
        })
        .then((response) => {
          this.options.hardware.owners = response.data.data
        })
        .catch((error) => {
          this.errorNotif(error.response.data.message)
        })
    },

    fetchTypeOptions() {
      this.$http
        .get('parconfig/category', {
          params: {
            filter: 'category',
            q: 'par_jenis_hardware',
          },
        })
        .then((response) => {
          this.options.hardware.types = response.data.data
        })
        .catch((error) => {
          this.errorNotif(error.response.data.message)
        })
    },

    fetchTypeNetworkOptions() {
      this.$http
        .get('parconfig/category', {
          params: {
            filter: 'category',
            q: 'par_jenis_network',
          },
        })
        .then((response) => {
          this.options.network.types = response.data.data
        })
        .catch((error) => {
          this.errorNotif(error.response.data.message)
        })
    },

    fetchTypePeripheralOptions() {
      this.$http
        .get('parconfig/category', {
          params: {
            filter: 'category',
            q: 'par_jenis_peripheral',
          },
        })
        .then((response) => {
          this.options.peripheral.types = response.data.data
        })
        .catch((error) => {
          this.errorNotif(error.response.data.message)
        })
    },

    closeModalHardware() {
      Object.assign(this.modal.hardware, {
        type: null,
        show: false,
      })

      this.$nextTick(() => {
        this.$refs[this.hardwareForm].reset()
      })

      this.resetHardwareForm()
    },

    openModalHardware(type, title, data = null) {
      this.resetHardwareForm()

      if (data) {
        Object.assign(this.form.primaryHardware, data)

        Object.assign(this.form.primaryHardware, {
          harddisk: parseInt(
            this.splitSize(this.form.primaryHardware.harddisk)[0]
          ),
          harddisk_satuan: this.splitSize(
            this.form.primaryHardware.harddisk
          )[1],
          memory: parseInt(this.splitSize(this.form.primaryHardware.memory)[0]),
          memory_satuan: this.splitSize(this.form.primaryHardware.memory)[1],
        })

        if (this.form.primaryHardware.fasilitas_data_center) {
          Object.assign(this.form.primaryHardware, {
            bandwidth: parseInt(
              this.splitSize(this.form.primaryHardware.bandwidth)[0]
            ),
            bandwidth_satuan: this.splitSize(
              this.form.primaryHardware.bandwidth
            )[1],
          })
        }
      }

      Object.assign(this.modal.hardware, {
        type,
        title,
        show: true,
      })
    },

    splitSize(text) {
      return text.split(' ')
    },

    closeModalNetwork() {
      Object.assign(this.modal.network, {
        type: null,
        show: false,
      })

      this.$nextTick(() => {
        this.$refs[this.networkForm].reset()
      })

      this.resetNetworkForm()
    },

    openModalNetwork(type, title, data = null) {
      this.resetNetworkForm()

      if (data) {
        data.jenis = parseInt(data.jenis)
        Object.assign(this.form.network, data)
      }

      Object.assign(this.modal.network, {
        type,
        title,
        show: true,
      })
    },

    closeModalPeripheral() {
      Object.assign(this.modal.peripheral, {
        type: null,
        show: false,
      })

      this.$nextTick(() => {
        this.$refs[this.peripheralForm].reset()
      })

      this.resetPeripheralForm()
    },

    openModalPeripheral(type, title, data = null) {
      this.resetPeripheralForm()

      if (data) {
        data.jenis = parseInt(data.jenis)

        Object.assign(this.form.peripheral, data)
      }

      Object.assign(this.modal.peripheral, {
        type,
        title,
        show: true,
      })
    },

    resetHardwareForm() {
      this.form.primaryHardware = {
        sis_profil_id: this.systemId,
        jenis: '',
        pemilik: '',
        tipe: null,
        jumlah: null,
        processor: null,
        harddisk: null,
        memory: null,
        lokasi: null,
        data_center: null,
        bandwidth: null,
        shared: 0,
        fasilitas_data_center: 0,
        harddisk_satuan: 'KB',
        memory_satuan: 'KB',
        bandwidth_satuan: 'KBps',
      }

      this.$nextTick(() => {
        this.$refs[this.hardwareForm].reset()
      })
    },

    resetNetworkForm() {
      this.form.network = {
        sis_profil_id: this.systemId,
        jenis: '',
        type: null,
        keterangan: null,
      }

      this.$nextTick(() => {
        this.$refs[this.networkForm].reset()
      })
    },

    resetPeripheralForm() {
      this.form.peripheral = {
        sis_profil_id: this.systemId,
        jenis: '',
        type: null,
        keterangan: null,
      }

      this.$nextTick(() => {
        this.$refs[this.peripheralForm].reset()
      })
    },

    saveHardware() {
      this.form.primaryHardware.sis_profil_id = this.systemId

      if (this.modal.hardware.type === 'Simpan') {
        this.addHardware()
      }

      if (this.modal.hardware.type === 'Update') {
        this.updateHardware()
      }
    },

    saveNetwork() {
      this.form.network.sis_profil_id = this.systemId

      if (this.modal.network.type === 'Simpan') {
        this.addNetwork()
      }

      if (this.modal.network.type === 'Update') {
        this.updateNetwork()
      }
    },

    savePeripheral() {
      this.form.peripheral.sis_profil_id = this.systemId

      if (this.modal.peripheral.type === 'Simpan') {
        this.addPeripheral()
      }

      if (this.modal.peripheral.type === 'Update') {
        this.updatePeripheral()
      }
    },

    addHardware() {
      const method = 'post'

      for (var propName in this.form.primaryHardware) {
        if (
          this.form.primaryHardware[propName] === null ||
          this.form.primaryHardware[propName] === undefined
        ) {
          if (propName == 'bandwidth') {
            delete this.form.primaryHardware['bandwidth_satuan']
          }

          delete this.form.primaryHardware[propName]
        }
      }

      const hardwareForm = this.parseToFormData(
        method,
        this.form.primaryHardware
      )

      this.$http({
        method: method,
        url: 'hardwares',
        data: hardwareForm,
      })
        .then((response) => {
          this.refreshData()
          this.closeModalHardware()
          this.successNotif(response.data.message)
        })
        .catch((error) => {
          this.errorNotif(error)
        })
    },

    addNetwork() {
      const method = 'post'

      const networkForm = this.parseToFormData(method, this.form.network)

      this.$http({
        method: method,
        url: 'hardwares/networks',
        data: networkForm,
      })
        .then((response) => {
          this.refreshData()
          this.closeModalNetwork()
          this.successNotif(response.data.message)
        })
        .catch((error) => {
          this.errorNotif(error)
        })
    },

    addPeripheral() {
      const method = 'post'

      const peripheralForm = this.parseToFormData(method, this.form.peripheral)

      this.$http({
        method: method,
        url: 'hardwares/peripherals',
        data: peripheralForm,
      })
        .then((response) => {
          this.refreshData()
          this.closeModalPeripheral()
          this.successNotif(response.data.message)
        })
        .catch((error) => {
          this.errorNotif(error)
        })
    },

    updateHardware() {
      const method = 'patch'

      for (var propName in this.form.primaryHardware) {
        if (
          this.form.primaryHardware[propName] === null ||
          this.form.primaryHardware[propName] === undefined
        ) {
          if (propName == 'bandwidth') {
            delete this.form.primaryHardware['bandwidth_satuan']
          }

          delete this.form.primaryHardware[propName]
        }
      }

      const primaryHardwareForm = this.parseToFormData(
        method,
        this.form.primaryHardware
      )

      this.$http({
        method: 'post',
        url: 'hardwares/' + this.form.primaryHardware.id,
        data: primaryHardwareForm,
      })
        .then((response) => {
          this.refreshData()
          this.closeModalHardware()
          this.successNotif(response.data.message)
        })
        .catch((error) => {
          this.errorNotif(error)
        })
    },

    updateNetwork() {
      const method = 'patch'

      const form = this.parseToFormData(method, this.form.network)

      this.$http({
        method: 'post',
        url: 'hardwares/networks/' + this.form.network.id,
        data: form,
      })
        .then((response) => {
          this.refreshData()
          this.closeModalNetwork()
          this.successNotif(response.data.message)
        })
        .catch((error) => {
          this.errorNotif(error)
        })
    },

    updatePeripheral() {
      const method = 'patch'

      const form = this.parseToFormData(method, this.form.peripheral)

      this.$http({
        method: 'post',
        url: 'hardwares/peripherals/' + this.form.peripheral.id,
        data: form,
      })
        .then((response) => {
          this.refreshData()
          this.closeModalPeripheral()
          this.successNotif(response.data.message)
        })
        .catch((error) => {
          this.errorNotif(error)
        })
    },

    deleteHardware() {
      this.$http
        .delete('hardwares/' + this.modal.primaryHardwareDelete.data.id)
        .then((response) => {
          this.refreshData()
          this.closeModalDeleteHardware()
          this.successNotif(response.data.message)
        })
        .catch((error) => {
          this.errorNotif(error)
        })
    },

    deleteNetwork() {
      this.$http
        .delete('hardwares/networks/' + this.modal.networkDelete.data.id)
        .then((response) => {
          this.refreshData()
          this.closeModalDeleteNetwork()
          this.successNotif(response.data.message)
        })
        .catch((error) => {
          this.errorNotif(error)
        })
    },

    deletePeripheral() {
      this.$http
        .delete('hardwares/peripherals/' + this.modal.peripheralDelete.data.id)
        .then((response) => {
          this.refreshData()
          this.closeModalDeletePeripheral()
          this.successNotif(response.data.message)
        })
        .catch((error) => {
          this.errorNotif(error)
        })
    },

    openModalDeleteHardware(hardware) {
      this.modal.primaryHardwareDelete.data = hardware
      this.modal.primaryHardwareDelete.show = true
    },

    closeModalDeleteHardware() {
      this.modal.primaryHardwareDelete.data = null
      this.modal.primaryHardwareDelete.show = false
    },

    openModalDeleteNetwork(hardware) {
      this.modal.networkDelete.data = hardware
      this.modal.networkDelete.show = true
    },

    closeModalDeleteNetwork() {
      this.modal.networkDelete.data = null
      this.modal.networkDelete.show = false
    },

    openModalDeletePeripheral(hardware) {
      this.modal.peripheralDelete.data = hardware
      this.modal.peripheralDelete.show = true
    },

    closeModalDeletePeripheral() {
      this.modal.peripheralDelete.data = null
      this.modal.peripheralDelete.show = false
    },

    /**
     * Manage form data
     */
    parseToFormData(method, data) {
      const formData = new FormData()

      formData.append('_method', method)

      for (var key in data) {
        formData.append(key, data[key])
      }

      return formData
    },

    /**
     * Toast
     */
    successNotif(message) {
      this.$toastr.s(message, 'Pemberitahuan')
    },

    errorNotif(message) {
      this.$toastr.e(message, 'Pemberitahuan')
    },
  },
}
</script>

<style></style>

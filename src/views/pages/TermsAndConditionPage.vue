<template>
  <div
    class="flex-column flex-lg-row justify-content-center d-flex"
    id="faq-page"
  >
    <div class="left-side">
      <div class="right-side-container">
        <div class="d-flex justify-content-end">
          <router-link
            to="/login"
            class="btn primary-color-link px-0 d-flex align-items-center"
          >
            <img width="12" src="@/assets/svgs/arrow-left.svg" />
            <span class="ml-1 back-btn">Kembali</span> 
          </router-link>
        </div><br/><br/>
        <h2>Syarat Dan Ketentuan</h2>
        <div class="row">
          <div class="col-md-12">
            &nbsp;
          </div>
        </div>
      </div>
    </div>
    <div class="right-side">
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
  </div>
</template>

<script>
export default {
  name: "Terms And Conditions",
  data() {
  },
  methods: {
    toggle(index) {
      // Jika item yang di klik sudah aktif, maka tutup
      this.activeIndex = this.activeIndex === index ? null : index;
    },
  },
};
</script>
<style scoped>
.back-btn{
  color: #ff5f5f;
}
</style>
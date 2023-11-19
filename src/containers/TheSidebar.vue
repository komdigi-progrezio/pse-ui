<template>
  <CSidebar
    fixed
    :minimize="minimize"
    :show="show"
    @update:show="
      (value) => $store.commit('dashboard/set', ['sidebarShow', value])
    "
  >
    <CSidebarBrand class="d-md-down-none" to="/">
      <div>
        <img
          src="@/assets/images/logo-logo-white.png"
          alt="PSE"
          height="35"
          class="c-sidebar-brand-full"
        />
        <div class="c-sidebar-brand-text"
          >{{ data.status_register }} | {{ data.nama_instansi }}</div
        >
      </div>
    </CSidebarBrand>
    <CRenderFunction flat :content-to-render="$options.Sidebar" />
    <CSidebarMinimizer
      class="d-md-down-none"
      @click.native="
        $store.commit('dashboard/set', ['sidebarMinimize', !minimize])
      "
    />
  </CSidebar>
</template>

<style>
.c-sidebar-brand-text {
  font-size: 11px;
  margin-top: 5px;
  cursor: pointer;
}
</style>

<script>
import Sidebar from './partials/sidebar.js'

export default {
  name: 'TheSidebar',
  Sidebar,
  computed: {
    show() {
      return this.$store.state.dashboard.sidebarShow
    },
    minimize() {
      return this.$store.state.dashboard.sidebarMinimize
    },
  },
  data() {
    return {
      data: [],
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.$http
        .get('/users/get/authenticated', {})
        .then((response) => {
          this.data = response.data.data
        })
        .catch((error) => {
          if (error.response.status === 500) {
            this.$toastr.e('Ada Kesalahan dari Server', 'Pemberitahuan')
          } else {
            this.$toastr.e(error.response.data.message, 'Pemberitahuan')
          }
        })
    },
  },
}
</script>

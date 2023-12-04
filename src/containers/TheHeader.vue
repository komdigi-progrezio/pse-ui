<template>
  <CHeader fixed with-subheader light>
    <CToggler
      in-header
      class="ml-3 d-lg-none"
      @click="$store.commit('dashboard/toggleSidebarMobile')"
    />
    <CToggler
      in-header
      class="ml-3 d-md-down-none"
      @click="$store.commit('dashboard/toggleSidebarDesktop')"
    />
    <CHeaderBrand class="mx-auto d-lg-none" to="/">
      <img src="@/assets/images/pse-logo-white.png" alt="PSE" width="200" />
    </CHeaderBrand>
    <CHeaderNav class="d-md-down-none mr-auto">
      <CHeaderNavItem class="px-3">
        <CHeaderNavLink to="/dashboard"> Dashboard </CHeaderNavLink>
      </CHeaderNavItem>
      <!-- <CHeaderNavItem class="px-3">
                <CHeaderNavLink to="/users" exact> Users </CHeaderNavLink>
            </CHeaderNavItem>
            <CHeaderNavItem class="px-3">
                <CHeaderNavLink> Settings </CHeaderNavLink>
            </CHeaderNavItem> -->
    </CHeaderNav>
    <CHeaderNav class="mr-4">
      <!-- <CHeaderNavItem class="d-md-down-none mx-2">
        <CHeaderNavLink>
          <CIcon name="cil-bell" />
        </CHeaderNavLink>
      </CHeaderNavItem>
      <CHeaderNavItem class="d-md-down-none mx-2">
        <CHeaderNavLink>
          <CIcon name="cil-list" />
        </CHeaderNavLink>
      </CHeaderNavItem>
      <CHeaderNavItem class="d-md-down-none mx-2">
        <CHeaderNavLink>
          <CIcon name="cil-envelope-open" />
        </CHeaderNavLink>
      </CHeaderNavItem> -->
      <template v-if="isAdmin">
        <Notifikasi />
      </template>
      <TheHeaderDropdownAccnt />
    </CHeaderNav>
    <CSubheader class="px-3 space-between">
      <CBreadcrumbRouter class="border-0 mb-0" />
      <router-link
        v-if="showBackButton"
        :to="dynamicTo"
        @click.native="goBack"
        class="btn btn-primary align-self-center"
      >
        <CIcon name="cil-arrow-left" /> Kembali
      </router-link>
    </CSubheader>
  </CHeader>
</template>

<script>
import TheHeaderDropdownAccnt from './TheHeaderDropdownAccnt'
import Notifikasi from './Notifikasi'

export default {
  name: 'TheHeader',
  components: {
    TheHeaderDropdownAccnt,
    Notifikasi,
  },
  computed: {
    isAdmin() {
      if (this.$store.state.auth.data.roles.includes('Admin')) {
        return true
      }

      return false
    },
    showBackButton() {
      return this.$route.params.id !== undefined
    },
    dynamicTo() {
      return false
    },
  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
  },
}
</script>

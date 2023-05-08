<template>
  <CDropdown
    inNav
    class="c-header-nav-items"
    placement="bottom-end"
    add-menu-classes="pt-0"
  >
    <template #toggler>
      <CHeaderNavLink>
        <div class="c-avatar">
          <CIcon name="cil-user" />
        </div>
      </CHeaderNavLink>
    </template>
    <CDropdownHeader tag="div" class="text-center" color="light">
      <strong>Settings</strong>
    </CDropdownHeader>
    <CDropdownItem @click="profile">
      <CIcon name="cil-user" /> Profile
    </CDropdownItem>
    <CDropdownDivider />
    <CDropdownItem @click="logout">
      <CIcon name="cil-account-logout" /> Logout
    </CDropdownItem>
  </CDropdown>
</template>

<script>
export default {
  name: 'TheHeaderDropdownAccnt',
  methods: {
    logout() {
      this.$store
        .dispatch('dispatchLogoutText')
        .then(() => {
          this.$store.dispatch('dispatchEnableLoading').then(() => {
            this.$store.dispatch('auth/destroyToken').then(() => {
              window.location = '/login'
            })
          })
        })
        .catch((error) => {
          if (error.response.status === 500) {
            this.$toastr.e('Ada Kesalahan dari Server', 'Pemberitahuan')
          } else {
            this.$toastr.e(error.response.data.message, 'Pemberitahuan')
          }
        })
    },
    profile() {
      this.$router.push('/admin/account/profile')
    },
  },
}
</script>

<style scoped>
.c-icon {
  margin-right: 0.3rem;
}
</style>

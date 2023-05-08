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
          <CIcon name="cil-check" />
        </div>
      </CHeaderNavLink>
    </template>
    <CDropdownHeader tag="div" class="text-center" color="light">
      <strong>System Electronic Progress Completed</strong>
    </CDropdownHeader>
    <ul>
      <template v-if="data.length > 0">
        <tr v-for="(item, index) in data" :key="index">
          <template v-if="item.progress == 100">
            <li>{{ item.nama_internal }}</li>
          </template>
        </tr>
      </template>
      <template v-else>
        <li> Data Kosong </li>
      </template>
    </ul>
  </CDropdown>
</template>

<script>
export default {
  name: 'Notifikasi100',
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
      //   this.spinner = true

      this.$http
        .get('/notifikasi/complete', {})
        .then((response) => {
          //   this.spinner = false
          this.data = response.data.data
          console.log(response)
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

<style scoped>
.c-icon {
  margin-right: 0.3rem;
}
</style>

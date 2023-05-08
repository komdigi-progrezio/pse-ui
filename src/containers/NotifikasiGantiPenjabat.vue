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
          <CIcon name="cil-reload" />
          <!-- <template v-if="data.length > 0">
            <div v-for="(item, index) in data" :key="index">
              <span class="badge badge-danger">
                {{ index + 1 }}
                <span class="visually-hidden"></span>
              </span>
            </div>
          </template> -->
        </div>
      </CHeaderNavLink>
    </template>
    <CDropdownHeader tag="div" class="text-center" color="light">
      <strong>Pergantian Penjabat</strong>
    </CDropdownHeader>

    <template v-if="data.length > 0">
      <div
        style="
          height: 325px;
          width: 275px;
          overflow-x: auto;
          overflow-x: hidden;
        "
      >
        <table>
          <router-link
            v-for="(item, index) in data.slice(0, 10)"
            :key="index"
            :to="`/admin/account/${item.id}/official/`"
            tag="tr"
            style="cursor: pointer"
          >
            <template v-if="item.nama !== 'Admin (Webmaster)'">
              <td>{{ item.nama }} - [ {{ item.jabatan }} ]</td>
            </template>
          </router-link>
        </table>
      </div>
    </template>
    <template v-else>
      <table>
        <tr>
          <td style="text-align: center"> Data Kosong </td>
        </tr>
      </table>
    </template>
  </CDropdown>
</template>

<script>
export default {
  name: 'NotifikasiGantiPenjabat',
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
        .get('/notifikasi/pergantian', {})
        .then((response) => {
          // this.data = response.data.data
          // console.log(response)
          this.data = response.data
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

table {
  border-collapse: collapse;
  width: 100%;
  table-layout: fixed;
}

th,
td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

tr:hover {
  background-color: #f5f5f5;
}
</style>

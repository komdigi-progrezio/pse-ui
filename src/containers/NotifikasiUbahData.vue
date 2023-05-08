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
          <CIcon name="cil-bell" />
          <!-- <template v-if="data.length > 0">
            <div v-for="(item, index) in data" :key="index">
              <span class="badge badge-danger rounded-circle">
                {{ index + 1 }}
                <span class="visually-hidden"></span>
              </span>
            </div>
          </template> -->
        </div>
      </CHeaderNavLink>
    </template>
    <CDropdownHeader tag="div" class="text-center" color="light">
      <strong>Pengajuan Perubahan Data</strong>
    </CDropdownHeader>
    <template v-if="data.length > 0">
      <div style="width: 275px">
        <table>
          <router-link
            v-for="(item, index) in data.slice(0, 10)"
            :key="index"
            :to="`/admin/systems/${item.id}`"
            tag="tr"
            style="cursor: pointer"
          >
            <td>{{ item.reason }}</td>
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
  name: 'NotifikasiUbahData',
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
        .get('/notifikasi/perubahan', {})
        .then((response) => {
          //   this.spinner = false

          this.data = response.data.data.filter(
            (data) => data.status === 'Menunggu Persetujuan'
          )
          // console.log(this.data)
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

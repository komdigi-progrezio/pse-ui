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
          <!-- Add badge for notifications count -->
          <span
            v-if="data.length > 0"
            class="badge badge-danger rounded-circle"
            >{{ data.length }}</span
          >
        </div>
      </CHeaderNavLink>
    </template>
    <div class="tab-container">
      <!-- Tab links -->
      <div class="tab-links">
        <div
          v-for="(tab, index) in tabs"
          :key="index"
          @click="fetchData(index)"
          :class="{ active: activeTab === index }"
        >
          {{ tab.label }}
        </div>
      </div>

      <!-- Tab content -->
      <div class="tab-content">
        <div
          v-for="(tab, index) in tabs"
          :key="index"
          v-show="activeTab === index"
        >
          <div v-if="data[tab.key].length > 0">
            <div v-for="(item, itemIndex) in data[tab.key]" :key="itemIndex">
              <div v-if="tab.key == 'new'">
                <router-link
                  :to="`/admin/systems/${item.id}`"
                  style="cursor: pointer"
                >
                  {{ item.nama_internal }}
                </router-link>
              </div>
              <div v-if="tab.key == 'complete'">
                <router-link
                  :to="`/admin/systems/${item.id}`"
                  style="cursor: pointer"
                >
                  {{ item.nama_internal }}
                </router-link>
              </div>
              <div v-if="tab.key == 'pergantian'">
                <router-link
                  :to="`/admin/account/${item.id}/official/`"
                  style="cursor: pointer"
                >
                  {{ item.nama }} - {{ item.jabatan }}
                </router-link>
              </div>
              <div v-if="tab.key == 'perubahan'">
                <router-link
                  :to="`/admin/systems/${item.id}`"
                  style="cursor: pointer"
                >
                  {{ item.nama_akun }} - {{ item.reason }}
                </router-link>
              </div>
              <div v-if="tab.key == 'baru'">
                <router-link
                  :to="`/admin/account/${item.id}/official/`"
                  style="cursor: pointer"
                >
                  {{ item.nama }} - {{ item.jabatan }}
                </router-link>
              </div>
            </div>
          </div>
          <div v-else> No data available </div>
        </div>
      </div>
    </div>
  </CDropdown>
</template>

<style scoped>
.tab-links {
  display: flex;
}

.tab-container {
  padding: 10px;
}

.tab-links > div {
  cursor: pointer;
  padding: 5px 10px;
  border-width: 0;
  margin-right: 5px;
  background-color: #f0f0f0;
  border-radius: 10px 0 10px 0;
}

.tab-links > div.active {
  background-color: #084ba1;
  color: #fff;
}

.tab-content {
  margin-top: 10px;
  padding: 10px;
  border: 1px solid #d8dbe0;
  border-radius: 5px;
}

.tab-content a {
  display: block;
  padding: 5px;
  color: #084ba1;
  border-bottom: 1px solid #d8dbe0;
}
</style>

<script>
const endpoints = [
  '/notifikasi/new',
  '/notifikasi/complete',
  '/notifikasi/pergantian',
  '/notifikasi/perubahan',
  '/notifikasi/pejabat-baru',
]
export default {
  data() {
    return {
      tabs: [
        { label: 'Pengajuan', key: 'new' },
        { label: 'Selesai', key: 'complete' },
        { label: 'Pergantian', key: 'pergantian' },
        { label: 'Perubahan', key: 'perubahan' },
        { label: 'Baru', key: 'baru' },
      ],
      activeTab: 0,
      data: {
        complete: [],
        new: [],
        perubahan: [],
        pergantian: [],
        baru: [],
      },
    }
  },
  methods: {
    fetchData(tabIndex) {
      const endpoint = endpoints[tabIndex]
      this.$http
        .get(endpoint)
        .then((response) => {
          if (typeof response.data.data == 'undefined') {
            this.$set(this.data, this.tabs[tabIndex].key, response.data)
          } else {
            this.$set(this.data, this.tabs[tabIndex].key, response.data.data)
          }
          this.activeTab = tabIndex
        })
        .catch((error) => {
          console.error(
            `Error fetching data for ${this.tabs[tabIndex].label}:`,
            error
          )
        })
    },
  },
  created() {
    // Fetch data for the initially active tab
    this.fetchData(this.activeTab)
  },
}
</script>

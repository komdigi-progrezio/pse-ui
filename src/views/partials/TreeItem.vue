<template>
  <div>
    <li class="list-group-item group-item">
      <div :class="{ bold: isFolder }" class="d-flex justify-content-between">
        <p @click="selectGroup">
          {{ item.name }}
        </p>

        <span v-if="isFolder" @click="toggle">[{{ isOpen ? '-' : '+' }}]</span>
      </div>

      <ul v-show="isOpen" v-if="isFolder" class="list-group">
        <tree-item
          class="item"
          :is-crud="isCrud"
          v-for="(child, index) in item.children"
          :key="index"
          :item="child"
          @selected="passChildData"
        ></tree-item>
      </ul>
    </li>
  </div>
</template>

<script>
export default {
  name: 'TreeItem',
  props: {
    item: {
      type: Object,
      required: true,
      default: () => [],
    },
    isCrud: {
      type: Boolean,
      default: false,
    },
  },
  data: function () {
    return {
      isOpen: false,
    }
  },
  computed: {
    isFolder: function () {
      return this.item.children && this.item.children.length
    },
  },
  methods: {
    toggle: function () {
      if (this.isFolder) {
        this.isOpen = !this.isOpen
      }
    },

    selectGroup: function () {
      if (!this.isCrud) {
        this.$store.dispatch('dispatchTreeViewOrganizer', this.item)
      }

      this.$emit('selected', this.item)
    },

    changeData() {
      this.$emit('selected', this.item)
    },

    passChildData(child) {
      this.$emit('selected', child)
    },
  },
}
</script>

<style scoped>
.item {
  cursor: pointer;
}
.bold {
  font-weight: bold;
}
ul {
  padding-left: 1em;
  line-height: 1.5em;
  list-style-type: dot;
}
</style>

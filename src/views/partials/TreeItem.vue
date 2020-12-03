<template>
  <div>
    <li class="list-group-item group-item">
      <div :class="{ bold: isFolder }" @click="selectGroup">
        {{ item.name }}
        <span v-if="isFolder" @click="toggle">[{{ isOpen ? '-' : '+' }}]</span>
      </div>
      <ul
        v-show="isOpen"
        v-if="isFolder"
        class="list-group"
        @click="changeData"
      >
        <tree-item
          class="item"
          v-for="(child, index) in item.children"
          :key="index"
          :item="child"
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
      this.$store.dispatch('dispatchTreeViewOrganizer', this.item)
      this.$emit('selected')
    },
    changeData() {
      this.$emit('selected')
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

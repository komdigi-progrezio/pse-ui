<template>
  <div>
    <li>
      <div :class="{ bold: isFolder }" @click="toggle">
        {{ item.name }}
        <span v-if="isFolder">[{{ isOpen ? '-' : '+' }}]</span>
      </div>
      <ul v-show="isOpen" v-if="isFolder">
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
  name: 'TreeView',
  props: {
    item: {
      required: true,
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      isOpen: false,
    }
  },
  computed: {
    isFolder: function () {
      return true
    },
  },
  methods: {
    toggle: function () {
      if (this.isFolder) {
        this.isOpen = !this.isOpen
      }
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

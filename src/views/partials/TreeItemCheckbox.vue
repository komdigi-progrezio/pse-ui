<template>
  <div>
    <li class="list-group-item group-item">
      <template v-if="item.id !== null">
        <input
          v-model="checkBoxes"
          type="checkbox"
          :value="item.id"
          id="checkbox"
        />
      </template>
      <span :class="{ bold: isFolder }">
        {{ item.name }}
        <span v-if="isFolder" @click="toggle">[{{ isOpen ? '-' : '+' }}]</span>
      </span>
      <ul v-show="isOpen" v-if="isFolder" class="list-group">
        <tree-item-checkbox
          class="item"
          v-for="(child, index) in item.children"
          :key="index"
          :item="child"
        ></tree-item-checkbox>
      </ul>
    </li>
  </div>
</template>

<script>
export default {
  name: 'TreeItemCheckbox',
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
    checkBoxes: {
      // accesseur
      get: function () {
        return this.$store.state.treeView.workUnitCheckbox
      },
      // mutateur
      set: function (newValue) {
        this.$store.commit('updateCheckBoxes', newValue)
      },
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

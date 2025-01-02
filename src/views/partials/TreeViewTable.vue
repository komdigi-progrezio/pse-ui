<template>
  <fragment>
    <template>
      <tr
        :key="number"
        :style="
          level > 1
            ? secondChildVisible
              ? ''
              : 'display: none;'
            : childVisible
            ? ''
            : 'display: none;'
        "
        @click="showChild()"
      >
        <th scope="row">
          {{ showNumber ? number : '' }}
        </th>

        <td>
          <span :style="`margin-left: ${level * 40}px;`" @click="showChild()">
            {{ data.name }}
          </span>
        </td>

        <td>{{ data.total_sistem }}</td>
      </tr>

      <template v-for="system in data.detail_organizer">
        <tr
          :key="`system-${system.id}`"
          :style="
            level > 1
              ? secondChildVisible
                ? ''
                : 'display: none;'
              : childVisible
              ? ''
              : 'display: none;'
          "
        >
          <th scope="row"></th>

          <td>
            <span
              :style="`
                  margin-left: ${(level + 1) * 40}px;
                  color: mediumblue;
                  text-decoration: underline;
                `"
            >
              {{ system.detail_system.nama_internal }}
            </span>
          </td>

          <td></td>
        </tr>
      </template>

      <template v-if="data.children">
        <template v-for="(item, index) in data.children">
          <tree-view-table
            :show-number="false"
            :key="item.id"
            :data="item"
            :number="index"
            :level="level + 1"
            :child-visible="showParentChild"
            :second-child-visible="showParentChild"
          />
        </template>
      </template>
    </template>
  </fragment>
</template>

<script>
import { Fragment } from 'vue-fragment'

export default {
  name: 'TreeViewTable',
  components: {
    Fragment,
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
    number: {
      type: Number,
      default: 1,
    },
    showNumber: {
      type: Boolean,
      default: true,
    },
    level: {
      type: Number,
      default: 0,
    },
    isParent: {
      type: Boolean,
      default: false,
    },
    childVisible: {
      type: Boolean,
      default: true,
    },
    secondChildVisible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showParentChild: false,
    }
  },
  watch: {
    secondChildVisible(value) {
      if (this.level > 0) {
        this.showParentChild = value
      }
    },
  },
  created() {
    if (!this.isParent) {
      this.showParentChild = this.showRow()
    }
  },
  methods: {
    showChild() {
      if (this.isParent) {
        this.showParentChild = !this.showParentChild
      }
    },

    showRow() {
      if (this.isParent) {
        return true
      } else {
        return this.childVisible
      }
    },
  },
}
</script>

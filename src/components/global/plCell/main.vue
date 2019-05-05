<template>
  <component :is="tag || $parent.itemTag" class="pl-box_cell">
    <slot></slot>
  </component>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class PlCell extends Vue {
  @Prop({default: 'div'}) private tag!: string
}
</script>

<style lang="scss" scoped>
.pl-box_cell {
  margin: 0 5px;
}
</style>

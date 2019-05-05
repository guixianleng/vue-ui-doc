<template>
  <component :is="isTag" class="pl-box" :style="stylesObj">
    <slot></slot>
  </component>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class PlBox extends Vue {
  @Prop({default: 'center'})
  private align!: string
  @Prop({default: 'flex-start'})
  private justify!: string

  @Prop({default: 'div'})
  private isTag!: string
  @Prop({default: 'div'})
  private itemTag!: string

  private stylesObj!: {
    alignItems: string;
    justifyContent: string;
  }

  private data () {
    return {
      stylesObj: {
        alignItems: this.align,
        justifyContent: this.justify
      }
    }
  }
}
</script>

<style scoped lang="scss">
.pl-box {
  display: flex;
  flex-wrap: nowrap;
  margin: 5px 0;
}
</style>

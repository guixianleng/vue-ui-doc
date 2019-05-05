<template>
  <div class="pl-group">
    <div v-for="(item, index) in value" :key="index">
      <pl-box justify="flex-start">
        <pl-cell>
          <slot v-if="index < maxItem" v-bind="{item: item, index: index}"></slot>
        </pl-cell>
        <pl-cell>
          <el-button
            icon="el-icon-circle-plus-outline"
            class="bt-icon"
            type="text"
            v-if="index === value.length - 1"
            @click="handleAdd(index)"
            :disabled="disabled || maxItem <= value.length || buttonDisabled">
          </el-button>
          <el-button
            icon="el-icon-remove-outline"
            class="bt-icon"
            type="text"
            v-if="index !== value.length - 1"
            @click="handleRemove(index)"
            :disabled="item.disabled">
          </el-button>
        </pl-cell>
      </pl-box>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'plGroup',
    props: {
      value: {
        type: [Array],
        default () {
          return []
        }
      },
      maxItem: { // 最大项目数
        type: Number,
        default: 10
      },
      buttonDisabled: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      handleAdd (index) {
        this.$emit('add', index)
      },
      handleRemove (index) {
        this.$emit('remove', index)
      }
    }
  }
</script>

<style lang="scss" scoped>
@import './style';
</style>

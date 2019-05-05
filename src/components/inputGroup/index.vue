<template>
  <pl-group
    :value="myValue"
    :button-disabled="buttonDisabled"
    :max-item="maxItem"
    :disabled="disabled"
    class="input-group"
    :class="classes"
    @add="handleAdd"
    @remove="handleRemove">
    <template slot-scope="scope">
      <el-input v-bind="$props" :value="scope.item" @input="handleChange(scope.index,$event)"/>
    </template>
  </pl-group>
</template>
<script>
  import { Input } from 'element-ui'
  import plGroup from '../group/index.vue'

  export default {
    name: 'inputGroup',
    components: {
      plGroup
    },
    props: {
      ...Input.props, // 继承Input的所有属性
      ...plGroup.props
    },
    computed: {
      classes () {
        return {
          'textarea-group': this.type === 'textarea'
        }
      }
    },
    watch: {
      value (value) {
        this.myValue = value
      }
    },
    data () {
      let myValue = this.value
      if (!this.value || this.value.length === 0) {
        myValue = ['']
      }
      return {
        myValue
      }
    },
    methods: {
      handleChange (index, value) {
        let valueClone = [...this.myValue]
        valueClone[index] = value
        this.$emit('input', valueClone).$emit('change', valueClone)
        if (value.length > this.maxlength) {
          valueClone[index] = value.slice(0, this.maxlength)
        }
      },
      handleAdd (index) {
        this.myValue.push('')
      },
      handleRemove (index) {
        let valueClone = [...this.myValue]
        valueClone.splice(index, 1)
        this.$emit('input', valueClone).$emit('change', valueClone)
      }
    }
  }
</script>

<style lang="scss" scoped>
@import './style';
</style>

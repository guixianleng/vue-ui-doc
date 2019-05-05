/**
 * 将驼峰命名转为中横杠例如：PlInputGroup --> pl-input-group
 * @param str 
 */
function toMiddleLine (str) {
  let temp = str.replace(/[A-Z]/g,
  function (match) {
    return "-" + match.toLowerCase()
  });
  if (temp.slice(0, 1) === '-') { //如果首字母是大写，执行replace时会多一个-，这里需要去掉
    temp = temp.slice(1)
  }
  return temp;
}

/**
 * 首字母大写
 * @param {*} str 字符串
 * @returns
 */
function initialToUp (str) {  
  return str.slice(0, 1).toUpperCase() + str.slice(1);  
}

module.exports = {
vueTemplate: componentName => {
  return `<template>
  <div class="${toMiddleLine(componentName)} pl-container">
    ${toMiddleLine(componentName)}
  </div>
</template>

<script lang="ts">
  import { Vue, Component, Prop, Watch, Emit } from 'vue-property-decorator';
  
  @Component({})
  export default class ${initialToUp(componentName)} extends Vue {
    
  }
</script>

<style lang="scss" scoped>
// @import './style.scss';
.${toMiddleLine(componentName)} {}
</style>`
},
styleTemplate: componentName => {
  return `.${toMiddleLine(componentName)} {}`
},
entryTemplate: `import Main from './main.vue'
export default Main
`
}

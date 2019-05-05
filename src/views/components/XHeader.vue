<template>
  <header>
    <el-row class="wrapper">
      <el-col :span="12">
        <h2>pl-ui组件文档</h2>
      </el-col>
    </el-row>
  </header>
</template>

<script lang="ts">
  import { Vue, Component, Prop, Watch, Emit } from 'vue-property-decorator';

  export default class XHeader extends Vue {
    
  }
</script>

<style lang="scss" scope>
header {
  h2 {
    font-size: 24px;
    color: #313131;
  }
  h2 {
    display: inline-block;
    vertical-align: middle;
  }
  .wrapper {
    padding: 20px 0;
  }
}
</style>

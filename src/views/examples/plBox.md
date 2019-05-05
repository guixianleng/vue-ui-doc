# 弹性布局

```html
<template>
  <div class="pl-box">
    <div class="demo">
      <span>space-between布局</span>
    </div>
    <pl-box justify="space-between">
      <pl-cell>
        <el-button type="success">左边</el-button>
      </pl-cell>
      <pl-cell>
        <el-button type="primary">中间</el-button>
      </pl-cell>
      <pl-cell>
        <el-button type="danger">左边</el-button>
      </pl-cell>
    </pl-box>
    <div class="demo">
      <span>flex-start布局</span>
    </div>
    <pl-box justify="flex-start">
      <pl-cell>
        <el-button type="success">左边</el-button>
      </pl-cell>
      <pl-cell>
        <el-button type="primary">中间</el-button>
      </pl-cell>
      <pl-cell>
        <el-button type="danger">左边</el-button>
      </pl-cell>
    </pl-box>
  </div>
</template>

<script lang="ts">
  import { Vue, Component, Prop, Watch, Emit } from 'vue-property-decorator';
  
  @Component({})
  export default class PlBox extends Vue {
    
  }
</script>
```
### Props
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |------------- |--------- |
| justify     | 水平方向对齐方式   | String  |   flex-start,space-between       |    flex-start    |
|---------- |-------- |---------- |------------- |--------- |
| align     | 垂直方向对齐方式   | String  |   center, top       |    center    |

### Slots
| 名称 | 说明 | 
|---------|--------|
| - | - |

<div class="pl-box">
  <div class="demo">
    <span>space-between布局</span>
  </div>
  <pl-box justify="space-between">
    <pl-cell>
      <el-button type="success">左边</el-button>
    </pl-cell>
    <pl-cell>
      <el-button type="primary">中间</el-button>
    </pl-cell>
    <pl-cell>
      <el-button type="danger">左边</el-button>
    </pl-cell>
  </pl-box>
  <div class="demo">
    <span>flex-start布局</span>
  </div>
  <pl-box justify="flex-start">
    <pl-cell>
      <el-button type="success">左边</el-button>
    </pl-cell>
    <pl-cell>
      <el-button type="primary">中间</el-button>
    </pl-cell>
    <pl-cell>
      <el-button type="danger">左边</el-button>
    </pl-cell>
  </pl-box>
</div>
# 上传头像并裁剪
```html
<template>
  <div class="pl-avatar pl-container">
    <pl-avatar
      :imgUrl="src"
      @success="handleAvatar"
      visible />
  </div>
</template>

<script lang="ts">
  import { Vue, Component, Prop, Watch, Emit } from 'vue-property-decorator';
  
  @Component({})
  export default class PlAvatar extends Vue {
    private src: string = ''
    
    // 处理头像
    private handleAvatar (url: string) {
      this.src = url
    }
  }
</script>
```
### Props
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |------------- |--------- |
| imgUrl     | 裁剪头像   | String  |          |        |
|---------- |-------- |---------- |------------- |--------- |
| visible     | 显示裁剪功能   | Boolean  |    true, false      |    false    |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------|--------|---------|
| success | 上传裁剪成功回调 | 图片地址 |

<pl-avatar imgUrl="" visible />
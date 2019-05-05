# 月份的选择
```html
<template>
  <div class="pl-month">
    <pl-month @changeMonth="handleMonth" />
    <div class="demo">
      <span>选中的月份格式：</span>{{selectMonth}}
    </div>
  </div>
</template>

<script lang="ts">
  import { Vue, Component, Prop, Watch, Emit } from 'vue-property-decorator';
  
  @Component({})
  export default class PlMonth extends Vue {
    public selectMonth?: string = ''
    /**
     * handleMonth 处理月份变动
     */
    public handleMonth (month: any) {
      this.selectMonth = month
    }
  }
</script>
```
### Events
| 事件名称 | 说明 | 回调参数 |
|---------|--------|---------|
| changeMonth | 数据返回 | String | Number |

<pl-month />

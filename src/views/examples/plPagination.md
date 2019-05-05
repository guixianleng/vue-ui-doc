# 数据分页显示

```html
<template>
  <div class="pl-pagination">
    <pl-pagination :listTotal="listTotal" />
  </div>
</template>

<script lang="ts">
  import { Vue, Component, Prop, Watch, Emit } from 'vue-property-decorator';
  
  @Component({})
  export default class PlPagination extends Vue {
    public listTotal: number = 50
  }
</script>
```
### Props
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |------------- |--------- |
| listTotal     | 分页数据总数   | Number  |          |        |

<pl-pagination :listTotal="listTotal" />

<script>
  export default {
    data () {
      return {
        listTotal: 50
      }
    }
  }
</script>
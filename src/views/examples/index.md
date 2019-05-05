# 快速上手

> 后期会上传至npm库中

### 安装
```html
  cnpm install pl-ui
```

### 使用默认全局组件
```html
  import Vue from 'vue'
  import plUi from 'pl-ui/lib/global'

  Vue.use(plUi)
```

### 使用局部组件
```html
  import plBox from 'e-ui/lib/plBox'
  // 或者 import { plBox } from 'e-ui/lib/global'
  // export default {
  //   components: {
  //     Layout
  //   }
  // }
  // 或者 
  import { Vue, Component, Prop, Watch, Emit } from 'vue-property-decorator';
  
  @Component({
    components: {
      plBox
    }
  })
  export default class Demo extends Vue {
    
  }
```
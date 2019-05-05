# 输入框(含输入文字数)

```html
<template>
  <div class="pl-input">
    <pl-box>
      <pl-cell>
        带限制字数输入文本框：
      </pl-cell>
      <pl-cell>
        <input-group v-model="limitText" :maxlength="50" number-word />
      </pl-cell>
    </pl-box>
    <pl-box>
      <pl-cell>
        带限制字数输入文本域：
      </pl-cell>
      <pl-cell>
        <input-group v-model="limitArea" :maxlength="200" number-word type="textarea" />
      </pl-cell>
    </pl-box>
  </div>
</template>

<script lang="ts">
  import { Vue, Component, Prop, Watch, Emit } from 'vue-property-decorator';
  import inputGroup from '@/components/inputGroup/index.vue'
  
  @Component({
    components: {
      'input-group': inputGroup
    }
  })
  export default class PlInput extends Vue {
    private unlimitText: any = []
    private limitText: any = []
    private unlimitArea: any = []
    private limitArea: any = []
  }
</script>
```
### Props
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |------------- |--------- |
| numberWord     | 是否显示输入字数   | Boolean  |   true,false       |    false    |

### Events
| 事件名称 | 说明 | 回调参数 |
|---------|--------|---------|
| - | - | - |

### Slots
| 名称 | 说明 | 
|---------|--------|
| - | - |

<div>
  <pl-box>
    <pl-cell>
      限制字数、自增减操作：<input-group v-model="limitText" :maxlength="50" number-word />
    </pl-cell>
    <pl-cell>
      限制字数：<el-input v-model="text" :maxlength="50" number-word/>
    </pl-cell>
  </pl-box>
  <pl-box>
    <pl-cell>
      限制字数、自增减操作：<input-group v-model="limitArea" :maxlength="200" number-word type="textarea" />
    </pl-cell>
    <pl-cell>
      限制字数：<el-input type="textarea" v-model="area" :maxlength="200" number-word />
    </pl-cell>
  </pl-box>
</div>
<script>
import inputGroup from '@/components/inputGroup/index.vue'
export default {
  components: {
    'input-group': inputGroup
  },
  data () {
    return {
      limitText: [],
      limitArea: [],
      text: '',
      area: ''
    }
  }
}
</script>
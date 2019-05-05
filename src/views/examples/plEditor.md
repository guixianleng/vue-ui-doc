# tinymac富文本编辑器

```html
<template>
  <div class="pl-editor">
    <pl-editor :EditorContent="content" />
  </div>
</template>

<script lang="ts">
  import { Vue, Component, Prop, Watch, Emit } from 'vue-property-decorator';
  
  @Component({})
  export default class PlEditor extends Vue {
    private content: any = ''
  }
</script>
```
### Props
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |------------- |--------- |
| EditorContent     | 设置富文本内容   | String  |          |        |

<pl-editor :EditorContent="content" />

<script>
export default {
  data () {
    return {
      content: `<p>下面这段是直接从官网拿的。</p>
        <h3><span style="color: #2880b9;">无论您正在建设什么，TinyMCE都能满足您的需求。</span></h3>
        <p>从内容管理到电子邮件营销，以下是我们客户最常见的用途：</p>
        <ul>
        <li>内容管理系统（例如WordPress，Umbraco）</li>
        <li>学习管理系统（例如Blackboard）</li>
        <li>客户关系管理和营销自动化（例如Marketo）</li>
        <li>电子邮件营销（例如Constant Contact）</li>
        <li>SaaS系统中的内容创建（例如Eventbrite，Evernote，GoFundMe，Zendesk）</li>
        </ul>
        <p>注：此DEMO可以体验该中文汉化包的效果。</p>
      `
    }
  }
}
</script>
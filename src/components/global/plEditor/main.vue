<template>
  <div class="pl-editor tinymce-container">
    <Editor
      :initial-value="EditorContent"
      @onChange="onChangeHandler"
      id="tinymce"
      class="tinymce-textarea"
      :init="editorInit">
    </Editor>
    <div class="editor-custom-btn-container">
      <editorImage class="editor-upload-btn" @successCBK="imageSuccessCBK"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Model, Watch, Prop } from 'vue-property-decorator'

import tinymce from 'tinymce/tinymce'
// import 'tinymce/themes/mobile/theme'
import 'tinymce/themes/silver/theme'
import Editor from '@tinymce/tinymce-vue'
import editorImage from './components/editorImage.vue'

import setPlugins from './ts/plugins'
import setToolbar from './ts/toolbar'

@Component({
  components: {
    Editor,
    editorImage
  }
})
export default class PlEditor extends Vue {
  // 定义props
  @Prop() public EditorContent: any
  // 初始值
  public initialVal: any = ''
  public editorInit: any = {
    language_url: '/static/zh_CN.js',
    language: 'zh_CN',
    selector: 'textarea',
    skin_url: '/static/skins/ui/oxide',
    height: 300,
    browser_spellcheck: true, // 拼写检查
    branding: false, // 去水印
    // elementpath: false,  //禁用编辑器底部的状态栏
    statusbar: false, // 隐藏编辑器底部的状态栏
    paste_data_images: true, // 允许粘贴图像
    plugins: setPlugins,
    toolbar: setToolbar,
    // 启用菜单栏并显示如下项 [文件 编辑 插入 格式 表格]
    menubar: 'file edit insert view format table',
    // 配置每个菜单栏的子菜单项（如下是默认配置）
    menu: {
      file: {
        title: 'File',
        items: 'newdocument'
      },
      edit: {
        title: 'Edit',
        items: 'undo redo | cut copy paste pastetext | selectall'
      },
      insert: {
        title: 'Insert',
        items: 'link media | template hr'
      },
      view: {
        title: 'View',
        items: 'visualaid'
      },
      format: {
        title: 'Format',
        items: 'bold italic underline strikethrough superscript subscript | formats | removeformat'
      },
      table: {
        title: 'Table',
        items: 'inserttable tableprops deletetable | cell row column'
      }
    },
    // 覆盖默认的字体单位为pt
    fontsize_formats: '8px 10px 12px 14px 16px 18px 20px 24px 36px',
    /**
     * 下面方法是为tinymce添加自定义插入图片按钮
     * 也可以借助elementui的Upload组件，上传图片
     */
    images_upload_url: '/api/image', // 上传图片接口地址
    images_upload_handler: (blobInfo: any, success: any, failure: any) => {
      let xhr: any = null
      let formData: any = null

      xhr = new XMLHttpRequest()
      xhr.withCredentials = false
      xhr.open('POST', this.$store.state.imgUrl)
      xhr.onload = () => {
        if (xhr.status < 200 || xhr.status >= 300) {
          failure(xhr.status)
          return
        }
        let json = JSON.parse(xhr.responseText)
        if (json.code === 0) {
          success(json.data[0].newFileName)
        } else {
          failure('HTTP Error: ' + json.msg)
        }
      }
      formData = new FormData()
      formData.append('file', blobInfo.blob(), blobInfo.filename())
      xhr.send(formData)
    }
  }

  // 最先开始执行
  private created (): void {
    tinymce.init(this.editorInit)
  }

  //监听路由变化
  @Watch('$route')
  private onRouteChanged(route: any, oldRoute: any): void {
    this.$forceUpdate()
  }

  /**
   * 富文本内容变化时事件
   */
  public onChangeHandler(res: any, index: any, tag: any) {
    // width height小程序不支持这个把这个替换了
    let html = res.level.content.replace('width', 'xxx')
    html = html.replace('height', 'yyy')
    this.$emit('update:EditorContent', html)
  }

  // 上传成功回调
  public imageSuccessCBK(arr: any) {
    arr.forEach((v: any) => {
      tinymce.execCommand('mceInsertContent', false, `<img src=${v.url}>`)
    })
  }
}
</script>

<style scoped lang="scss">
.pl-editor {
  margin: 10px 0;
  position: relative;
  line-height: normal;
}
.tinymce-container>>>.mce-fullscreen {
  z-index: 10000;
}
.tinymce-textarea {
  visibility: hidden;
  z-index: -1;
}
.editor-custom-btn-container {
  position: absolute;
  right: 4px;
  top: 4px;
  /*z-index: 2005;*/
}
.fullscreen .editor-custom-btn-container {
  z-index: 10000;
  position: fixed;
}
.editor-upload-btn {
  display: inline-block;
}
</style>

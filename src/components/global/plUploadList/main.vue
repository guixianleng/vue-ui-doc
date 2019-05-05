<template>
  <div class="pl-upload-list">
    <el-upload
      :action="actionUrl"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove">
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog
      :visible.sync="dialogVisible"
      size="tiny"
      :show-close="false">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script lang="ts">
  import { Vue, Component, Prop, Watch, Emit } from 'vue-property-decorator'

  @Component({})
  export default class PlUploadList extends Vue {
    @Prop({default: 'https://httpbin.org/post'})
    private actionUrl!: string

    private dialogImageUrl: string = ''
    private dialogVisible: boolean = false
    
    // 删除
    public handleRemove(file: any, fileList: any) {
      console.log(file, fileList)
    }

    // 预览
    public handlePictureCardPreview(file: any) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    }
  }
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
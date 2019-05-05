<template>
  <div class="pl-avatar">
    <el-upload
      class="avatar-upload"
      :action="uploadUrl"
      :show-file-list="false"
      :on-success="handleSuccess"
      :on-change="handleChange"
      :auto-upload="false"
      @mouseenter.native="handleMoveEnter"
      @mouseleave.native="showEdit = false"
      :before-upload="handleBeforeUpload">
      <img
        v-if="src"
        :src="src"
        class="avatar">
      <i v-else class="el-icon-plus avatar-upload-icon"></i>
      <!-- 显示编辑和删除图标  -->
      <div class="show-icon" v-show="showEdit">
        <i class="el-icon-edit-outline iconfont" @click.stop="handleEdit"></i>
        <i class="el-icon-delete iconfont" @click.stop="handleRemove"></i>
      </div>
    </el-upload>
    <Croper
      v-if="passValue.visible"
      v-model="passValue"
      :visible="passValue.visible"
      :imgUrl="passValue.imgUrl"
      @crop-success="hanldeCropSuccess" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import Croper from './components/cropper.vue'

@Component({
  components: {
    Croper
  }
})
export default class PlAvatar extends Vue {
  /**
   * props
   * @acceptFormat 接收的图片格式
   * @imgUrl 图片地址
   * @uploadUrl 上传图片地址
   * @maxSize 允许上传的最大尺寸
   */
  @Prop({default: 'image/jpeg,image/png'})
  private acceptFormat!: string
  @Prop({default: ''})
  private imgUrl!: string
  @Prop({default: 'https://httpbin.org/post'})
  private uploadUrl!: string
  @Prop({default: 3})
  private maxSize!: number
  @Prop({default: () => ['.png', '.jpeg', '.jpg']})
  private formatList!: any

  private previewImgUrl: string = this.imgUrl
  // 图片地址
  private src: string = this.imgUrl
  // 显示裁剪
  private cropVisible: boolean = false
  // hover状态
  private showEdit: boolean = false

  private passValue: any = {
    imgUrl: this.imgUrl,
    visible: this.cropVisible
  }

  // 监听上传图片的变化
  @Watch('previewImgUrl')
  private previewImgUrlChange (newVal: any, oldVal: any) {
    console.log(newVal !== oldVal)
    if (newVal && newVal !== oldVal) {
      this.passValue.visible = true
      this.passValue.imgUrl = newVal
    }
  }

  public handleChange (file: any, fileList: any) {
    if (navigator.userAgent.indexOf('MSIE 9') > -1) {
      if (this.$message) {
        this.$message({
          message: 'IE 9不支持图片上传，请升级更高版本的浏览器',
          type: 'warning'
        })
      }
      return false
    }
    this.handleBeforeUpload(file)
  }

  public handleSuccess (res: any, file: any) {
    // 本地图片预览
    this.previewImgUrl = URL.createObjectURL(file.raw)
    console.log(res, file)
    this.$emit('success', this.previewImgUrl)
  }

  public handleBeforeUpload (file: any) {
    const formatReg = new RegExp(this.formatList.join('|'), 'i')
    if (!formatReg.test(file.name)) {
      this.$message.error('图片格式格式不正确, 请重新上传')
      return false
    }
    const isLimit = file.size / 1024 / 1024
    if (isLimit > this.maxSize) {
      this.$message.error(`上传头像图片大小不能超过 ${this.maxSize}MB!`)
      return false
    }
    // this.previewImgUrl = URL.createObjectURL(file.raw)
    this.passValue.visible = true
    this.passValue.imgUrl = URL.createObjectURL(file.raw)
  }
  public handleMoveEnter () {
    if (this.src) {
      this.showEdit = true
    }
  }
  // 点击编辑图标
  public handleEdit () {
    this.passValue = {
      visible: true,
      imgUrl: this.src
    }
  }
  // 点击图标删除
  public handleRemove () {
    this.src = ''
  }
  // 裁剪成功
  public hanldeCropSuccess (data: any) {
    this.passValue.visible = false
    this.src = data
  }
}
</script>

<style lang="scss">
@import "./style.scss";
</style>
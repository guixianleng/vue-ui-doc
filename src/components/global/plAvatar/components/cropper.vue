<template>
  <div class="pl-cropper">
    <!-- 预览效果, 如果需要 -->
    <div class="model" v-show="showModel" @click="showModel = false">
      <div class="model-show">
        <img :src="modelSrc" alt="">
      </div>
    </div>
    <!-- 弹框裁剪 -->
    <el-dialog
      class="normal-dialog"
      :title="titleText"
      width="800px"
      @close="handleClose"
      :visible.sync="cropVisible">
      <div class="cropper-content">
        <div class="cropper">
          <vueCropper
            ref="cropper"
            :img="imgUrl"
            :outputSize="option.outputSize"
            :outputType="option.outputType"
            :info="true"
            :full="option.full"
            :canMove="option.canMove"
            :canMoveBox="option.canMoveBox"
            :original="option.original"
            :autoCrop="option.autoCrop"
            :autoCropWidth="option.autoCropWidth"
            :autoCropHeight="option.autoCropHeight"
            :fixedBox="option.fixedBox"
            :high="option.high"
            :centerBox="option.centerBox"
            @realTime="realTime">
            <!-- @imgLoad="imgLoad" -->
          </vueCropper>
        </div>
        <div class="show-preview"
          :style="{'width': previews.w + 'px', 'height': previews.h + 'px',  'overflow': 'hidden', 'margin': '5px'}">
          <div :style="previews.div" class="preview">
            <img :src="previews.url" :style="previews.img">
          </div>
        </div>
      </div>
      <div class="operate-btns">
        <el-button size="small">
          <label style="cursor: pointer" for="uploads">
            <i class="el-icon-upload"></i> 重新上传
          </label>
        </el-button>
        <el-button size="small" plain @click="rotateRight">右旋转 ↺</el-button>
        <el-button size="small" plain @click="rotateLeft">左旋转 ↻</el-button>
        <!-- <el-button size="small" plain @click="handlePreview" icon="el-icon-view">预览图片</el-button> -->
      </div>
      <span slot="footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </span>
      <input
        type="file"
        id="uploads"
        style="display: none;"
        accept="image/png, image/jpeg, image/gif, image/jpg"
        @change="uploadImg($event)">
    </el-dialog>
  </div>
</template>

<script>
  import { VueCropper } from 'vue-cropper'

  export default {
    name: 'Cropper',
    components: {
      VueCropper
    },
    props: {
      titleText: { // dialog标题
        type: String,
        default: '上传头像'
      },
      visible: { // 显示dialog
        type: Boolean,
        default: false
      },
      imgUrl: { // 图片地址
        type: String,
        default: ''
      },
      uploadType: { // 上传格式
        type: String,
        default: 'base64'
      }
    },
    data() {
      let cropVisible = this.visible
      return {
        previews: {},
        modelSrc: '',
        showModel: false,
        cropVisible,
        option: {
          img: '', // 裁剪图片的地址
          outputSize: 1, // 裁剪生成图片的质量
          full: false, // 输出原图比例截图
          outputType: 'png', // 输出图片格式
          canMove: true, // 能否拖动图片
          original: false, // 上传图片是否显示原始宽高 (针对大图 可以铺满)
          canMoveBox: true, // 能否拖动截图框
          autoCrop: true, // 是否自动生成截图框
          autoCropWidth: 200,
          autoCropHeight: 200,
          high: true, // 是否根据dpr生成适合屏幕的高清图片
          fixedBox: false, // 截图框固定大小
          centerBox: true // 截图框是否限制在图片里(只有在自动生成截图框时才能生效)
        }
      }
    },
    methods: {
      // 向左旋转
      rotateLeft () {
        this.$refs.cropper.rotateLeft()
      },
      // 向右旋转
      rotateRight () {
        this.$refs.cropper.rotateRight()
      },
      // 实时预览函数 
      realTime (data) {
        this.previews = data
      },
      handlePreview (type) { // type为 base64 或者 blob
        // 输出
        if (type === 'blob') {
          this.$refs.cropper.getCropBlob((data) => {
            console.log(data)
            let img = window.URL.createObjectURL(data)
            this.showModel = true
            this.modelSrc = img
          })
        } else {
          this.$refs.cropper.getCropData((data) => {
            this.showModel = true
            this.modelSrc = data
          })
        }
      },
      // 关闭弹框
      handleClose () {
        this.cropVisible = false
        this.$emit('input', {visible: false, imgUrl: ''})
      },
      // 更改图片
      handleChange (ev) {
        this.uploadImg(ev)
      },
      // 确定裁剪
      handleSubmit () {
        // let formData = new FormData()
        if (this.uploadType === 'blob') {
          this.$refs.cropper.getCropBlob((data) => {
            // let img = window.URL.createObjectURL(data)
            // formData.append('file', )
            this.$emit('crop-success', data)
          })
        } else {
          this.$refs.cropper.getCropData((data) => {
            this.$emit('crop-success', data)
          })
        }        
      },
      // 上传图片
      uploadImg (e) {
        let file = e.target.files[0]
        if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
          this.$message.error('图片格式格式不正确, 请重新上传')
          return false
        } 
        let reader = new FileReader()
        reader.onload = (e) => {
          let data
          if (typeof e.target.result === 'object') {
            // 把Array Buffer转化为blob 如果是base64不需要
            data = window.URL.createObjectURL(new Blob([e.target.result]))
          } else {
            data = e.target.result
          }
          // this.option.img = data
          this.$emit('input', {visible: true, imgUrl: data})
        }
        if (this.uploadType === 'blob') { // 转化为 blob
          reader.readAsArrayBuffer(file)
        } else { // 转化为 base64
          reader.readAsDataURL(file) 
        }        
      }
    }
  }
</script>

<style lang="scss" scoped>
.pl-cropper {
  .cropper-content{
    display: flex;
    justify-content: flex-start;
    .cropper {
      width: 350px;
      height: 300px;
      display: inline-block;
      flex: 2
    }
    .show-preview{
      flex: 1;
      display: flex;
      justify-content: center;
      .preview {
        overflow: hidden;
        border-radius: 50%;
        border: 1px solid #cccccc;
        background: #cccccc;
        margin-left: 40px;
      }
    }
  }
  .operate-btns {
    margin-top: 20px;
    .el-icon-upload {
      font-size: 12px
    }
  }
  .model {
    position: fixed;
    z-index: 10;
    width: 100vw;
    height: 100vh;
    overflow: auto;
    top: 0;
    left: 0;
    z-index: 9999999999;
    background: rgba(0, 0, 0, 0.8);
  }

  .model-show {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
  }

  .model img {
    display: block;
    margin: auto;
    max-width: 80%;
    user-select: none;
    background-position: 0px 0px, 10px 10px;
    background-size: 20px 20px;
    background-image: linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%, #eee 100%),linear-gradient(45deg, #eee 25%, white 25%, white 75%, #eee 75%, #eee 100%);
  }
}
</style>

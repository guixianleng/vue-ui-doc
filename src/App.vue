<template>
  <div class="documents">
    <XHeader/>
    <div class="wrapper">
      <el-row :gutter="20">
        <el-col :span="5" class="left-side">
          <el-scrollbar wrap-class="sidebar-scrollbar-wrap">
            <Sidebar/>
          </el-scrollbar>
          <!-- <Sidebar/> -->
        </el-col>
        <el-col :span="19">
          <div class="markdown-body">
            <router-view></router-view>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import XHeader from './views/components/XHeader.vue'
import Sidebar from './views/components/Sidebar.vue'

@Component({
  components: {
    XHeader,
    Sidebar
  }
})
export default class App extends Vue {}
</script>

<style lang="scss">
@import "./styles/variables.scss";
.sidebar-scrollbar-wrap {
  height: 430px;
  overflow-y: scroll;
  // position:fixed;
  // width:100%;
}
.documents {
  .wrapper {
    width: 1200px;
    margin: 0 auto;
  }
  .left-side {
    border-right: 1px solid $border-color-base;
  }
  .markdown-body {
    padding-bottom: 30px;
    .demo {
      margin: 15px 0;
    }
    .language-javascript,
    .language-html {
      font-size: 14px;
      padding: 18px 24px;
      background-color: #fafafa;
      border: 1px solid #eaeefb;
      margin-bottom: 25px;
      border-radius: 4px;
      -webkit-font-smoothing: auto;
      display: block;
    }
    a {
      color: $default-color;
    }
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      // font-weight: 500;
      margin: 15px 0;
      line-height: 1;
    }
    h1 {
      font-size: 20px;
    }
    h2 {
      font-size: 18px;
    }
    h3 {
      font-size: 16px;
    }
    h4 {
      font-size: 14px;
    }
    h5 {
      font-size: 12px;
    }
    h6 {
      font-size: 12px;
      color: #ccc;
    }
    hr {
      margin: 15px 0;
    }
    table {
      width: 100%;
      text-align: left;
      td,
      th {
        border-bottom: 1px solid #f5f5f5;
        padding: 8px;
      }
    }
    pre {
      margin: 10px 0;
    }
    code {
      font-family: Microsoft YaHei;
      margin: 0 1px;
      background: #f2f4f5;
      padding: 0.2em 0.5em;
      border-radius: 3px;
      font-size: 0.9em;
      border: 1px solid #eee;
    }
    hr {
      height: 1px;
      border: 0;
      background: #ebedf0;
      clear: both;
    }
    blockquote {
      font-size: 90%;
      color: #0d1a26;
      border-left: 4px solid #ebedf0;
      padding-left: 0.8em;
      margin: 1em 0;
    }
  }
}
</style>

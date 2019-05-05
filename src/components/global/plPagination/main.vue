<template>
  <div class="pl-pagination">
    <div class="pl-pagination-content">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40, 50]"
        :page-size="pageSize"
        background
        :searchForm="searchForm"
        layout="total, sizes, prev, pager, next, jumper"
        :total="listTotal" />
    </div>
  </div>
</template>

<script lang="ts">
import { deepClone } from '@/utils'
import { Component, Vue, Model, Prop, Watch, Emit } from 'vue-property-decorator'

@Component
export default class PlPagination extends Vue {
  // props声明
  @Prop() private listTotal!: number
  @Prop() private searchForm!: any

  // data 声明
  private pageSize: number = 10
  private currentPage: number = 1

  // 最先开始执行
  public created(): void {
    if (this.$route.query.pageNum) {
      this.currentPage = Number(deepClone(this.$route.query.pageNum))
      this.pageSize = Number(deepClone(this.$route.query.pageSize))
    } else {
      this.currentPage = 1
      this.pageSize = 10
    }
  }

  // 监听路由变化
  @Watch('$route')
  private onRouteChanged(route: any, oldRoute: any): void {
    if (route.query.pageNum) {
      this.currentPage = Number(deepClone(route.query.pageNum))
      this.pageSize = Number(deepClone(route.query.pageSize))
    } else {
      this.currentPage = 1
      this.pageSize = 10
    }
    this.$forceUpdate()
  }
  // 改变分页数
  private handleSizeChange (val: any) {
    let queryData: any = deepClone(this.$route.query)
    queryData.pageNum = 1
    queryData.pageSize = val
    this.start(queryData)
    console.log(`每页 ${val} 条`)
  }
  // 改变当前页
  private handleCurrentChange (val: any) {
    let data: any = deepClone(this.$route.query)
    data.pageNum = val
    data.pageSize = this.pageSize
    this.start(data)
    console.log(`当前页: ${val}`)
  }

  private start (ret: any) {
    // this.$store.dispatch('paramsUrl', ret).then((res: any) => {
    //   this.$router.push(`${this.$route.path}${res}`)
    // })
    this.$emit('queryData', ret)
  }
}
</script>

<style scoped lang="scss">
  .pl-pagination {
    width: 100%;
    overflow: hidden;
  }
  .pl-pagination-content {
    float: right;
    margin: 20px;
  }
</style>

<template>
  <div class="pl-month">
    <el-button icon="el-icon-arrow-left" class="arrow-left" @click="handleMonth(currentMonth, -1)"></el-button>
    <el-date-picker
      v-model="currentMonth"
      type="month"
      format="MM 月"
      align="center"
      :clearable="false"
      @input="handleChangeMonth(currentMonth)"
      placeholder="月份">
    </el-date-picker>
    <el-button icon="el-icon-arrow-right" class="arrow-right" @click="handleMonth(currentMonth, 1)"></el-button>
  </div>
</template>

<script lang="ts">
  import { Vue, Component, Prop, Emit } from 'vue-property-decorator'
  import { formatTime, dealMonth } from '@/utils'

  @Component({})
  export default class PlMonth extends Vue{
    // date 当前月份
    private currentMonth: any = new Date()

    // 处理时间变化传值给子组件
    private handleChangeMonth (date: any) { 
      const dealDate = formatTime(date, '{y}-{m}-{d}')
      console.log(date, dealDate)
      // 传值子组件
      this.$emit('changeMonth', dealDate)
    }
    // 处理月份
    private handleMonth (date: any, num: number) {
      const newMonth = dealMonth(date, num)
      this.currentMonth = newMonth
      const transDate: any = formatTime(newMonth, '{y}-{m}-{d}')
      console.log(transDate, '月份')
      
      // 传值子组件
      this.$emit('changeMonth', transDate)
    }
  }
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
<template>
  <div class="detiles-spread">
    首钢集团有限公司
  </div>
</template>

<script type="text/javascript">
  // **** 组件名称 大驼峰 *****
  // ** 本地公用变量 公用函数 **
  // ***** 第三方 组件库 *****
  // ***** 本地 公用组件 *****
  // ** 当前组件的 子组件等 ***
  import radarBox from 'pages/details/details-radar-echart.vue'
  import branchChart from '@/components/branch-chart.vue'

  export default {
    name: 'component_name',
    props: {
      title: {
        type: String,
        default: ''
      }
    },
    data() {
      return {

      }
    },
    components:{
      branchChart
    }
  }
</script>

<style lang="scss" scoped>
  .detiles-spread{
    width: 1198px;
    height: 500px;
    margin: 20px auto;
    box-shadow: 0 0 3px rgba(1,10,40,.3);
    background: url(../../assets/img/details-there.png) no-repeat;
    background-size: 100% 100%;
  }
</style>

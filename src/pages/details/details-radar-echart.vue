<template>
    <div class="echart-box">
      <div class="echart-title">
        <span class="iconfont icon-dianzan"></span><span>该企业的僵尸可能性概率为</span><span class="percent">{{echartsData.percentdata}}，</span><span>属</span><span class="enterprise-type">{{echartsData.enterpriseType}}</span>
      </div>
      <div class="echart-all clearfix">
        <div class="echart-left-mess fl">
          <span>扫描结果：</span>
          <div class="every-mess" v-for="(echartMessData, index) in echartMessDatas">
            <p>{{ echartMessData.text }}</p>
            <span class="detile-num">{{ echartsData.echartResults[index] }}<i v-if="isNaN(echartsData.echartResults[index]) ? false : true">个</i></span>
          </div>
        </div>
        <div class="myChart fr">
          <radarChart :echartsData="echartsData"></radarChart>
        </div>

      </div>
      <graduated @graduatedTime = "graduatedTime"></graduated>
    </div>
</template>

<script type="text/javascript">
  // **** 组件名称 大驼峰 *****
  // ** 本地公用变量 公用函数 **
  // ***** 第三方 组件库 *****
  // ***** 本地 公用组件 *****
  // ** 当前组件的 子组件等 ***
  import radarChart from 'pages/details/echarts/radar.vue'
  import graduated from '@/components/graduated.vue'
  export default {
    name: 'component_name',
    props: {
      echartsData: {
        type: Object,
        default: ''
      }
    },
    data() {
      return {
        echartMessDatas:[
          {'text':'同个地址企业个数...'},
          {'text':'名称变更次数...'},
          {'text':'地址变更次数...'},
          {'text':'是否地址无法联系...'},
          {'text':'有无公示年报...'},
          {'text':'是否隐瞒真实信息...'}
          ]
      }
    },
    methods:{
        graduatedTime(msg){
            this.$emit('graduatedtime',msg)
        }
    },
    components:{
      radarChart,
      graduated
    }
  }
</script>

<style lang="scss" scoped>
  .echart-box{
    width: 1200px;
    margin: 20px auto;
    background: url(../../assets/img/details-echart-bg.png) no-repeat;
    background-size: 100% 100%;
    padding-top: 20px;
    height: 530px;
  }
  .echart-title{
    text-align: center;
    width: 395px;
    height: 36px;
    line-height:36px;
    margin: 0 auto;
    background: url(../../assets/img/details-echart-title.png) no-repeat;
    background-size: 100% 100%;
    span{
      font-size: 16px;
      color: #ededf4;
      font-weight: bold;
    }
    .percent,.enterprise-type{
      color: #21ddff;
      margin-left: 3px;
      font-weight: bold;
    }
  }
  .echart-left-mess>span{
    font-size: 14px;
    color: #7ecdff;
    font-weight: bold;
  }
  .echart-left-mess{
    box-sizing: border-box;
    margin: 50px 85px;
    padding: 30px 35px;
    width: 345px;
    height: 285px;
    background: url(../../assets/img/details-echart-leftbg.png) no-repeat;
    background-size: 100% 100%;
  }
  .every-mess{
    margin-left: 60px;
    margin-top: 10px;
    p,span{
      display: inline-block;
      line-height: 18px;
      vertical-align: top;
    }
    p{
      font-size: 14px;
      color: #7ecdff;
      font-weight: bold;
    }
    span{
      color: #eebd12;
      font-weight: bold;
    }
  }
  .icon-dianzan{
    opacity: .5;
    margin: 0 6px;
  }
  .echart-all{
    padding: 0px 45px;
    .myChart{
      width: 50%;
      height: 400px;
    }
  }
</style>

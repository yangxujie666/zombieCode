<template>
  <div class="main">

    <div class="analysis-wrapper">
      <a class="to-index fr" @click="goBack">返回首页</a>
      <div class="top-wrapper flex-wrapper-h">
        <div class="top-left-wrapper flex-wrapper-v">
          <div class="data-move bgColor echarts-flex">
            <h2 class="title">疑似僵尸企业数量走势</h2>
            <moveBar :echartsData = "moveBarData"></moveBar>
          </div>
          <div class="trade-Analysis bgColor  echarts-flex">
            <h2 class="title">僵尸企业所属行业分析</h2>
            <analysisPie :echartsData = "analysisPieData"></analysisPie>
          </div>
        </div>
        <div class="top-center-wrapper">
          <Maps :mapData="mapData"></Maps>
          <div class="block">
            <el-date-picker
                    v-model="value1"
                    type="month"
                    format="yyyy-MM"
                    placeholder="2017-06">
            </el-date-picker>
          </div>
          <div class="map-detiles-container">
            <div class="map-detiles-items">
              <div class="map-detiles-name">高风险企业</div>
              <div class="map-detiles-num">{{mapDetiles.highRisk}}</div>
            </div>
            <div class="map-detiles-items">
              <div class="map-detiles-name">中风险企业</div>
              <div class="map-detiles-num map-detiles-num2">{{mapDetiles.mediumRisk}}</div>
            </div>
            <div class="map-detiles-items">
              <div class="map-detiles-name">低风险企业</div>
              <div class="map-detiles-num map-detiles-num3">{{mapDetiles.lowRisk}}</div>
            </div>
          </div>
        </div>
        <div class="top-right-wrapper flex-wrapper-v">
          <div class="time-Analysis bgColor  echarts-flex">
            <h2 class="title">僵尸企业注册时间分析</h2>
            <div class="time-Analysis-container">
              <compontPie :echartsData = "compontPieData"></compontPie>
              <compontPie :echartsData = "compontPieData2"></compontPie>
              <compontPie :echartsData = "compontPieData3"></compontPie>
              <compontPie :echartsData = "compontPieData4"></compontPie>
            </div>
          </div>
          <div class="type-Analysis bgColor">
            <h2 class="title">僵尸企业类型分析</h2>
            <typePie :echartsData = "typePieData"></typePie>
          </div>
        </div>
      </div>
      <div class="bottom-wrapper flex-wrapper-h">
        <div class="bottom-left-wrapper bgColor   echarts-flex">
          <div class="renson-analysis  echarts-flex">
            <h2 class="title">僵尸企业成因分析</h2>
            <rensonRadar :echartsData = "rensonRadarData"></rensonRadar>
          </div>
        </div>
        <div class="bottom-center-wrapper bgColor echarts-flex">
          <h2 class="title">企业风险等级分布</h2>
          <levelBar :echartsData = "levelBarData"></levelBar>
        </div>
        <div class="bottom-right-wrapper bgColor echarts-flex"">
          <div class="num-rank echarts-flex">
            <h2 class="title">区域僵尸企业数量TOP10</h2>
            <rankBar :echartsData = "rankBarData"></rankBar>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
// **** 组件名称 大驼峰 *****
// ** 本地公用变量 公用函数 **
// ***** 第三方 组件库 *****
// ***** 本地 公用组件 *****
// ** 当前组件的 子组件等 ***

import compontPie from './echarts/compont-analysis-pie.vue'
import analysisPie from './echarts/analysis-pie.vue'
import moveBar from './echarts/data-move-bar.vue'
import levelBar from './echarts/level-analysis-bar.vue'
import Maps from './echarts/index-map.vue'
import rankBar from './echarts/num-rank-bar.vue'
import rensonRadar from './echarts/renson-analysis-radar.vue'
import typePie from './echarts/type-analysis-pie.vue'

import api from '@/api'

export default {
  name: 'analysis',
  data() {
    return {
        msg:"我是分析页面",
        mapData:[],
        mapDetiles: {},
        leftRadio:true,
        rightRadio:false,
        value1: '',
        compontPieData:{
            title:'一年内',
            color:['#3e54e3','#2641e0'],
            valueData:[]
        },
        compontPieData2:{
            title: '1-3年',
            color: ['#42a3e3','#2977e3'],
            valueData: []
        },
        compontPieData3:{
            title: '3-5年',
            color: ['#65dde3','#59dce3'],
            valueData: []
        },
        compontPieData4:{
            title: '5年以上',
            color:['#c0b63a','#db9c34'],
            valueData: []
        },
        moveBarData:{
            xAxisData: ['2月', '3月', '4月','5月','6月'],
            seriesdata: [[220, 182, 191,190,220],[210, 132, 91,200,180]]
        },
        analysisPieData: {
            legendData: ['餐饮', '制造业', '互联网','农业', '服务业', '教育', '其他'],
            seriesData:[
                {value:4,value2:12000,value3:3600,value4:'30%', name:'餐饮'},
                {value:5,value2:12000,value3:1200,value4:'10%', name:'制造业'},
                {value:10,value2:12000,value3:3600,value4:'10%', name:'互联网'},
                {value:12,value2:12000,value3:2400,value4:'20%', name:'农业'},
                {value:16,value2:12000,value3:128,value4:'8%', name:'服务业'},
                {value:20,value2:12000,value3:24,value4:'2%', name:'教育'},
                {value:25,value2:12000,value3:2400,value4:'20%', name:'其他'}
            ]
        },
        typePieData: {
            legendData: [],
            seriesData: []
        },
        rensonRadarData:{
            indicatorData: [],
            seriesData:[]
        },
        levelBarData:{
            seriesData:[]
        },
        rankBarData:{
            yAxisData:[],
            seriesData:[]
        }
    }
  },
  mounted(){
       this.firstLoad()
  },
  methods:{
      randomData() {
          return Math.round(Math.random()*1000) + 500;
      },
      goBack(){
          this.$router.push('/')
      },
      // 获取数据
      firstLoad(){
          //地图数据
          api.getMapData1()
              .then(res => {
                  this.mapData = res.data.mapData
                  this.mapDetiles.highRisk = this.fillZero(res.data.mapRisk.highRisk)
                  this.mapDetiles.mediumRisk  = this.fillZero(res.data.mapRisk.mediumRisk)
                  this.mapDetiles.lowRisk = this.fillZero(res.data.mapRisk.lowRisk)
              })
          /*this.mapData = [
              {name: '北京', value: this.randomData()},
              {name: '天津', value: this.randomData()},
              {name: '上海', value: this.randomData()},
              {name: '重庆', value: this.randomData()},
              {name: '河北', value: this.randomData()},
              {name: '河南', value: this.randomData()},
              {name: '云南', value: this.randomData()},
              {name: '辽宁', value: this.randomData()},
              {name: '黑龙江', value: this.randomData()},
              {name: '湖南', value: this.randomData()},
              {name: '安徽', value: this.randomData()},
              {name: '山东', value: this.randomData()},
              {name: '新疆', value: this.randomData()},
              {name: '江苏', value: this.randomData()},
              {name: '浙江', value: this.randomData()},
              {name: '江西', value: this.randomData()},
              {name: '湖北', value: this.randomData()},
              {name: '广西', value: this.randomData()},
              {name: '甘肃', value: this.randomData()},
              {name: '山西', value: this.randomData()},
              {name: '内蒙古', value: this.randomData()},
              {name: '陕西', value: this.randomData()},
              {name: '吉林', value: this.randomData()},
              {name: '福建', value: this.randomData()},
              {name: '贵州', value: this.randomData()},
              {name: '广东', value: this.randomData()},
              {name: '青海', value: this.randomData()},
              {name: '西藏', value: this.randomData()},
              {name: '四川', value: this.randomData()},
              {name: '宁夏', value: this.randomData()},
              {name: '海南', value: this.randomData()},
              {name: '台湾', value: this.randomData()},
              {name: '香港', value: this.randomData()},
              {name: '澳门', value: this.randomData()}
          ]
          let mapRisk = {
              highRisk: 11,
              mediumRisk: 130,
              lowRisk: 5413
          }
          this.mapDetiles.highRisk = this.fillZero(mapRisk.highRisk)
          this.mapDetiles.mediumRisk  = this.fillZero(mapRisk.mediumRisk)
          this.mapDetiles.lowRisk = this.fillZero(mapRisk.lowRisk)*/
          //僵尸企业注册时间分析数据
          api.getRegisterData()
              .then(res => {
                  let dataSum = this.sumArr(res.data.compontPieData)
                  this.compontPieData.valueData = [res.data.compontPieData[0],dataSum-res.data.compontPieData[0]]
                  this.compontPieData2.valueData = [res.data.compontPieData[1],dataSum-res.data.compontPieData[1]]
                  this.compontPieData3.valueData = [res.data.compontPieData[2],dataSum-res.data.compontPieData[2]]
                  this.compontPieData4.valueData = [res.data.compontPieData[3],dataSum-res.data.compontPieData[3]]
              })
          //疑似僵尸企业数量走势数据
          api.getNewIndustryData()
              .then(res => {
                  //console.log(res.data.seriesdata[0])
                  this.moveBarData.xAxisData = res.data.xAxisData
                  this.moveBarData.seriesdata[0] = res.data.seriesdata[0]
                  this.moveBarData.seriesdata[1] = res.data.seriesdata[1]
              })
          //僵尸企业所属行业分析数据
          api.getIndustryAnalysis()
              .then(res => {
                  this.analysisPieData.legendData = res.data.legendData
                  this.analysisPieData.seriesData = res.data.seriesdata
          })
          //僵尸企业类型分析
          api.getTypeAnalysis()
              .then(res => {
                  let newArr = []
                  this.typePieData.legendData = res.data.legendData
                  res.data.seriesData.forEach(function(v,i){
                      v.itemStyle = {
                          normal:{
                              borderColor:'#112660',
                              borderWidth:2

                          }
                      }
                      newArr.push(v)
                  })
                  this.typePieData.seriesData = newArr
              })
          /*this.typePieData.legendData = ["私营企业", "国有企业", "联营企业", "外商投资", "其他企业"]
          let newArr = []
          let arr = [
              {
                  value: 335,
                  value1:'12%',
                  value2:'20%',
                  value3:'2.38%',
                  value4:'经济活跃度',
                  name: "私营企业"
              },
              {
                  value: 310,
                  name: "国有企业",
                  value1:'12%',
                  value2:'20%',
                  value3:'2.38%',
                  value4:'经济活跃度'
              },
              {
                  value: 234,
                  name: "联营企业",
                  value1:'12%',
                  value2:'20%',
                  value3:'2.38%',
                  value4:'经济活跃度'
              },
              {
                  value: 135,
                  name: "外商投资",
                  value1:'12%',
                  value2:'20%',
                  value3:'2.38%',
                  value4:'经济活跃度',
              },
              {
                  value: 1548,
                  name: "其他企业",
                  value1:'12%',
                  value2:'20%',
                  value3:'2.38%',
                  value4:'经济活跃度'
              }
          ]
          arr.forEach(function(v,i){
              v.itemStyle = {
                  normal:{
                      borderColor:'#112660',
                      borderWidth:2

                  }
              }
              newArr.push(v)
          })
          this.typePieData.seriesData = newArr*/
          //僵尸企业成因分析
          api.getRensonAnalysis()
              .then(res => {
                  let rensonArr = []
                  let max1arr = []
                  let max2arr = []
                  let max3arr = []
                  let max4arr = []
                  let max5arr = []
                  let max6arr = []
                  res.data.seriesData.forEach(function(v,i){
                      v.symbolSize = 0
                      rensonArr.push(v)
                      max1arr.push(v.value[0])
                      max2arr.push(v.value[1])
                      max3arr.push(v.value[2])
                      max4arr.push(v.value[3])
                      max5arr.push(v.value[4])
                      max6arr.push(v.value[5])
                  })
                  this.rensonRadarData.indicatorData = [
                      { name: '同地址企业个数', max: this.$max(max1arr)*1.2 },
                      { name: '名称变更次数', max: this.$max(max2arr)*1.2 },
                      { name: '是否隐瞒\n真实信息', max: this.$max(max3arr)*1.2 },
                      { name: '地址变更次数', max: this.$max(max4arr)*1.2 },
                      { name: '是否地址无法连系', max:this.$max(max5arr)*1.2 },
                      { name: '有无公示', max: this.$max(max6arr)*1.2 }
                  ]
                  this.rensonRadarData.seriesData = rensonArr
              })
          /*let rensonData = [
              {
                  value : [4300, 10000, 28000, 35000, 50000, 19000],
                  name:'1月'

              },
              {
                  value : [4300, 10000, 28000, 35000, 50000, 19000],
                  name:'2月'
              },
              {
                  value : [4300, 10000, 28000, 35000, 50000, 19000],
                  name:'3月'
              },
              {
                  value : [6000, 14000, 28000, 31000, 42000, 21000],
                  name:'4月'
              },
              {
                  value : [10000, 19000, 32000, 33000, 45000, 24000],
                  name:'5月'
              },
              {
                  value : [8000, 17000, 30000, 33000, 45000, 22000],
                  name:'6月'
              },
              {
                  value : [5000, 14000, 28000, 31000, 42000, 21000],
                  name:'7月'
              },
              {
                  value : [1000, 6400, 900, 19100, 30200, 10100],
                  name:'8月'
              },
              {
                  value : [2000, 8400, 900, 10100, 22200, 21100],
                  name:'9月'
              },
              {
                  value : [5000, 13000, 27000, 30000, 40000, 20000],
                  name:'10月'
              },
              {
                  value : [6000, 14000, 28000, 31000, 52000, 21000],
                  name:'11月'
              },
              {
                  value : [7000, 16000, 38000, 41000, 52000,31000],
                  name:'12月'
              }]
          let rensonArr = []
          let max1arr = []
          let max2arr = []
          let max3arr = []
          let max4arr = []
          let max5arr = []
          let max6arr = []
          rensonData.forEach(function(v,i){
              v.symbolSize = 0
              rensonArr.push(v)
              max1arr.push(v.value[0])
              max2arr.push(v.value[1])
              max3arr.push(v.value[2])
              max4arr.push(v.value[3])
              max5arr.push(v.value[4])
              max6arr.push(v.value[5])
          })
          this.rensonRadarData.indicatorData = [
              { name: '同地址企业个数', max: this.$max(max1arr)*1.2 },
              { name: '名称变更次数', max: this.$max(max2arr)*1.2 },
              { name: '是否隐瞒\n真实信息', max: this.$max(max3arr)*1.2 },
              { name: '地址变更次数', max: this.$max(max4arr)*1.2 },
              { name: '是否地址无法连系', max:this.$max(max5arr)*1.2 },
              { name: '有无公示', max: this.$max(max6arr)*1.2 }
          ]
          this.rensonRadarData.seriesData = rensonArr*/
          //企业风险等级分布
          api.getLevelDistribute()
              .then(res => {
                  let newlevel = []
                  let _this = this
                  res.data.seriesData.forEach(function(v,i){
                      if(i<8){
                          v.itemStyle = {
                              normal:{color:'rgba(0,116,255,.4)'},
                              emphasis:{
                                  /*color:new _this.$echarts.graphic.LinearGradient(
                                      0, 0, 0, 1,
                                      [
                                          {offset: 0, color: '#ffd43d'},
                                          {offset: 1, color: '#ffe542'}
                                      ]
                                  )*/
                                  color:'rgba(0,116,255,1)'
                              }
                          }
                      }else if(i<15){
                          v.itemStyle = {
                              normal:{color:'rgba(252,196,76,.4)'},
                              emphasis:{
                                  /*color:new _this.$echarts.graphic.LinearGradient(
                                      0, 0, 0, 1,
                                      [
                                          {offset: 0, color: '#ffd43d'},
                                          {offset: 1, color: '#ffe542'}
                                      ]
                                  )*/
                                  color:'rgba(252,196,76,1)'
                              }
                          }
                      }else{
                          v.itemStyle = {
                              normal:{color:'rgba(255,86,47,.4)'},
                              emphasis:{
                                  /*color:new _this.$echarts.graphic.LinearGradient(
                                      0, 0, 0, 1,
                                      [
                                          {offset: 0, color: '#ffd43d'},
                                          {offset: 1, color: '#ffe542'}
                                      ]
                                  )*/
                                  color:'rgba(255,86,47,1)'
                              }
                          }
                      }
                      newlevel.push(v)
                  })
                  this.levelBarData.seriesData = newlevel
              })
          /*let leveldata = [
              {value:10},{value:20},{ value:30},{value:40},{value:50},{value:60},{value:70},{value:80 },{value:43},{value:40 },
              {value:38},{value:45},{value:40},{value:46},{value:55},{value:40},{value:30},{value:20},{value:15},{value:10}
          ]
          let newlevel = []
          let _this = this
          leveldata.forEach(function(v,i){
              if(i<8){
                  v.itemStyle = {
                                normal:{color:'#194ba2'},
                                emphasis:{
                                    color:new _this.$echarts.graphic.LinearGradient(
                                        0, 0, 0, 1,
                                        [
                                            {offset: 0, color: '#ffd43d'},
                                            {offset: 1, color: '#ffe542'}
                                        ]
                                    )
                                }
                            }
              }else if(i<15){
                  v.itemStyle = {
                      normal:{color:'#736c5a'},
                      emphasis:{
                          color:new _this.$echarts.graphic.LinearGradient(
                              0, 0, 0, 1,
                              [
                                  {offset: 0, color: '#ffd43d'},
                                  {offset: 1, color: '#ffe542'}
                              ]
                          )
                      }
                  }
              }else{
                  v.itemStyle = {
                      normal:{color:'#734051'},
                      emphasis:{
                          color:new _this.$echarts.graphic.LinearGradient(
                              0, 0, 0, 1,
                              [
                                  {offset: 0, color: '#ffd43d'},
                                  {offset: 1, color: '#ffe542'}
                              ]
                          )
                      }
                  }
              }
              newlevel.push(v)
          })
          this.levelBarData.seriesData = newlevel*/
          //区域僵尸企业数量TOP10
          api.getRankTop()
              .then(res => {
                  this.rankBarData.yAxisData = res.data.yAxisData
                  this.rankBarData.seriesData = res.data.seriesData
              })
          /*this.rankBarData.yAxisData = ["北京","广东","上海","深圳","杭州","苏州","宁波","无锡","哈尔滨","长春"]
          let rankdata = [];
          for (let i = 1; i < this.rankBarData.yAxisData.length+1; i++) {
              rankdata.push(Math.round(Math.random() * 500) + 2000);
          }
          rankdata.sort();

          this.rankBarData.seriesData =  [2132,2131,1622,1344,1226,1124,987,973,932,891]*/

      },
      //数组求和
      sumArr(arr){
          let sum = 0
          for(let i = 0; i< arr.length;i++){
              sum+=arr[i]
          }
          return sum
      },
      //数据补零
      fillZero(value) {
          let valueStr = value.toString()
          let len = value.toString().length
          for(let i = 0 ;i<6-len;i++){
              valueStr= "0"+valueStr
          }
          return valueStr
      },
      // 点击单选按钮
      radioClick(n){
          if(n == 0) {
              this.leftRadio = true;
              this.rightRadio = false;
          }else if(n == 1) {
              this.leftRadio = false;
              this.rightRadio = true;
          }
      },
  },
  components:{
      compontPie,
      analysisPie,
      moveBar,
      levelBar,
      Maps,
      rankBar,
      rensonRadar,
      typePie
  }
}
</script>

<style lang="scss" scoped>
.main{
  width: 100%;
  height:100%;
  background: url(../../assets/img/bg.jpg);
  overflow: hidden;
}
  .analysis-wrapper{
    width: 1200px;
    margin: auto;
    height:100%;
    position: relative;
    /*overflow: hidden;*/
    box-sizing: border-box;
    display: flex;
    padding: 34px 0;
    flex-direction: column;
  }
  .renson-analysis{
    flex: 1;
  }
  .top-wrapper{
    flex: 3;
    margin-bottom: 25px;
  }
  .bottom-wrapper{
    flex: 2;
  }
  .flex-wrapper-h{
    display: flex;
    box-sizing: border-box;
    &>div:nth-child(1),&>div:nth-child(3){
      flex: 1;
    }
    &>div:nth-child(2){
      flex: 2;
      margin: 0 20px;
    }
  }
  .flex-wrapper-v{
    display: flex;
    flex-direction: column;
    &>div{
      flex: 1;
      &:nth-child(1){
        margin-bottom: 20px;
      }
    }
  }
  .bgColor{
    background: rgba(6,24,77,.65);
    border: 1px solid #183b7b;
    box-shadow: 0 0 2px 2px rgba(1,10,40,.3);
  }
  .top-center-wrapper{
    background: url(../../assets/img/mapbg.png);
    background-size: cover;
  }
  .title{
    padding:10px;
    font-size: 14px;
  }
  .echarts-flex{
    display: flex;
    flex-direction: column;
  }
.echarts-flex>div{
  flex:1;
}
  .time-Analysis-container{
    display: flex;
    &>div{
      flex: 1;
      height:110px;
    }
  }
.top-center-wrapper{
  position: relative;
}
.radio-wrapper {
  position: absolute;
  bottom: 6%;
  left: 15%;
  z-index: 100;
  .radio-left {
    float: left;
    width: 95px;
    margin-right: 30px;
    line-height: 20px;
    font-size: 12px;
    color: #abd8f6;
    cursor:pointer;
    span {
      float: left;
      width: 10px;
      height: 10px;
      margin: 4px 8px 0 0;
      border:1px solid #29b4f7;
      border-radius: 20px;
    }
  }
  .radio-left.active {
    i {
      float: left;
      width: 6px;
      height: 6px;
      margin: 2px 0 0 2px;
      border-radius: 10px;
      background: #ffae00;
    }
  }
}
  .map-detiles-container{
    position: absolute;
    width:80px;
    height:200px;
    right: 10px;
    bottom:20px;
    display: flex;
    flex-direction: column;
    .map-detiles-items{
      height: 56px;
      width: 100%;
      text-align: center;
      .map-detiles-name{
        line-height: 30px;
        color: #b2e1ff;
      }
      .map-detiles-num{
        line-height: 30px;
        font-size: 18px;
        color: #ff562f;
        font-size: 18px;
        font-weight: bold;
        background-image: -webkit-gradient(linear,left bottom,left top, from(rgba(255,86,37,1)), to(rgba(255,137,132, 1)));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;

      }
      .map-detiles-num2{
        color: #fcc438;
        font-size: 18px;
        font-weight: bold;
        background-image: -webkit-gradient(linear,left bottom,left top, from(rgba(252,196,56,1)), to(rgba(255,229,66, 1)));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      .map-detiles-num3{
        color: #2180ff;
        font-size: 18px;
        font-weight: bold;
        background-image: -webkit-gradient(linear,left bottom,left top, from(rgba(33,128,255,1)), to(rgba(107,173,255, 1)));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
  }
  .to-index{
    color: #c3ced4;
    line-height: 32px;
    position: absolute;
    right: 0;
    top: 3px;
    cursor: pointer;
  }
.to-index:hover {
  color: #fff;
}
</style>

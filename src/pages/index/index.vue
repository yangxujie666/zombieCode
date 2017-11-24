<template>
  <div class="index-wrapper">
    <div class="index-header"></div>
    <div class="index-block">
      <div class="index-search-wrapper">
        <div class="search-title clearfix">
          <span class="fl">僵尸企业雷达<i class="icon iconfont icon-wenhao" v-on:mouseover="showIfon"></i></span>
          <p class="fl">发现城市中潜伏的僵尸企业，确保每一笔投资的安全</p>
          <p class="tooltip" v-if="showTooltip"  v-on:mouseout="hideIfon" >通过分析企业经营是否正常，工商信息是否真实，招聘信息是否可靠，企业年报是否正常提交，企业信用是否值得依赖等多方面，帮助用户发现城市中可能存在的潜在僵尸企业。</p>
        </div>
        <div class="index-search-box clearfix">
          <input class="fl" v-model="inputVal">
          <span class="fl" @click="scanBtn" >扫描</span>
        </div>
      </div>
      <div class="index-chart fl">
        <div class="index-chart-box">
          <p class="index-chart-box-list clearfix"><span class="fl">发现：</span><span class="fr">全国</span></p>
          <p class="index-chart-box-list index-chart-box-list-hover clearfix" @click="suspectFun"><span class="fl">疑似</span><i class="icon iconfont icon-more fr"></i><span class="num fr">{{suspectNum}}</span></p>
          <p class="index-chart-box-list index-chart-box-list-hover index-chart-box-list1 clearfix" @click="highriskFun"><span class="fl">高风险</span><i class="icon iconfont icon-more fr"></i><span class="num fr">{{highriskNum}}</span></p>
          <p class="statistical-analysis" @click="statisticalAnalysis"><i class="icon iconfont icon-tongjifenxi fl"></i>统计分析</p>
        </div>
        <indexMap :mapData="mapData" :numOrRatio="numOrRatio"></indexMap>
        <!--<div class="radio-wrapper">-->
          <!--<div class="radio-left" :class="{active: leftRadio}" @click="radioClick(0)"><span><i></i></span>僵尸企业数量</div>-->
          <!--<div class="radio-left" :class="{active: rightRadio}" @click="radioClick(1)"><span><i></i></span>僵尸企业占比</div>-->
        <!--</div>-->
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import axios from 'axios'
import api from '@/api'
import indexMap from './index-map.vue'
export default {
  name: 'index',
  data() {
    return {
      inputVal:'',
      mapData:[],
      leftRadio:true,
      rightRadio:false,
      showTooltip:false,
      suspectNum:0,
      highriskNum:0,
      numOrRatio:true
    }
  },
  mounted(){
    this.getMapDataFun()
  },
  methods:{
    // 点击扫描按钮
    scanBtn(){
      console.log(this.inputVal)
      this.$router.push({name:'list',params:{val:this.inputVal}})
    },
    // 获取地图数据
    getMapDataFun(){
      api.getMapData()
        .then(res => {
          this.suspectNum = res.data.suspect;
          this.highriskNum = res.data.highrisk;
          this.mapData = res.data.mapData;
        })
    },
//    // 点击单选按钮
//    radioClick(n){
//      if(n == 0) {
//        this.leftRadio = true;
//        this.rightRadio = false;
//        this.numOrRatio = true;
//      }else if(n == 1) {
//        this.leftRadio = false;
//        this.rightRadio = true;
//        this.numOrRatio = false;
//      }
//    },
    // 点击疑似-跳转到疑似列表页面
    suspectFun(){
      this.$router.push({name:'list',params:{val:this.inputVal}})
    },
    // 点击高风险-跳转到最新疑似列表页面
    highriskFun(){
      this.$router.push({name:'newList',params:{val:this.inputVal}})
    },
    // 点击统计分析-跳转到统计分析页面
    statisticalAnalysis(){
      this.$router.push({name:'analysis',params:{val:this.inputVal}})
    },
    // 鼠标移入问号，显示信息
    showIfon (){
      this.showTooltip = ! this.showTooltip
    },
    hideIfon(){
      this.showTooltip = ! this.showTooltip
    }

  },
  components:{
    indexMap
  }
}
</script>

<style lang="scss" scoped>
  .index-wrapper {
    width: 100%;
    height: 100%;
    background: url(../../assets/img/bg.jpg);
    background-size: 100% 100%;
  }
  .index-header {
    height: 20px;
  }
  .index-block {
    width: 1200px;
    height: calc(100% - 60px);
    margin: 0 auto;
    background: url(../../../static/img/index-bg.png) no-repeat;
    background-size: 100% 100%;
  }
  .index-search-wrapper {
    float: left;
    margin: 20px 0 0 170px;
    width: 860px;
    background: url(../../../static/img/index-bg1.png) no-repeat;
    background-size: 100% 100%;
  }
  .search-title {
    position: relative;
    padding: 20px 0 30px 50px;
    span {
      font-size: 18px;
      font-weight: bold;
      background-image: -webkit-gradient(linear, 0 0, right 0, from(rgba(238,202,60, 1)), to(rgba(206,159,17,1)));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      border-right: 1px solid #4581be;
      i{
        margin: 0 17px 0 12px;
        font-size: 18px;
        color: #debf41;
      }
    }
    p{
      padding-left: 16px;
      line-height: 18px;
      font-size: 14px;
      color: #b2e1ff;
    }
    p.tooltip {
      position: absolute;
      top: 0;
      left: 133px;
      width: 344px;
      height: 120px;
      padding: 53px 20px 0 20px;
      background: url(../../../static/img/tooltip-bg.png) no-repeat center 40px;
      font-size: 12px;
      line-height: 24px;
      color: #7ed6ff;
    }
  }
  .index-search-box {
    padding: 0 0 30px 50px;
    input {
      width: 568px;
      height: 32px;
      line-height: 31px;
      padding: 0 20px;
      color: #fff;
      background: url(../../../static/img/input-bg1.png) no-repeat;
    }
    input:focus{
      box-shadow: 0 0 20px 0  rgba(0,30,255,.4);
    }
    span {
      display: inline-block;
      width: 75px;
      height: 32px;
      margin-left: 2px;
      background: url(../../../static/img/search-btn.png) no-repeat;
      box-shadow: -10px 0 10px 0 rgba(255,162,0,.33);
      text-align: center;
      font-weight: bold;
      cursor: pointer;
      line-height: 32px;
    }
  }
  .index-chart {
    position: relative;
    width: 100%;
    height: calc(100% - 151px);
  }
  .index-chart-box {
    position: absolute;
    right: 8%;
    bottom: 40%;
    width: 164px;
    border: 1px solid #0064d5;
    background: #0c2d80;
    z-index: 100;
  }
  .index-chart-box-list {
    padding: 0 18px;
    line-height: 36px;
    background:url(../../../static/img/border-bottom.png) no-repeat center bottom;
    color: #b2e2ff;
    cursor: pointer;
    .num {
      margin-right: 18px;
      font-size: 16px;
      color: #eebd12;
    }
    .icon-more{
      color: #1a87e9;
    }
  }
  .index-chart-box-list1 {
    background: none;
  }
  .index-chart-box-list-hover:hover {
    i {
      color: #98cffb;
    }
  }
  .statistical-analysis {
    line-height: 36px;
    background: #0b1e5a;
    color: #7ecdff;
    font-size: 14px;
    cursor: pointer;
    i{
      margin: 0 10px 0 50px;
    }
  }
  .statistical-analysis:hover {
    color: #caebff;
  }
  .radio-wrapper {
    position: absolute;
    bottom: 6%;
    left: 10%;
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
</style>

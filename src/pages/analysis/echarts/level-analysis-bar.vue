<template>
    <div class="chart-wrapper" ref="chart" style="height:100%;width:100%">

    </div>
</template>

<script>
  export default {
  name: 'bar',
  props: {
    echartsData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {}
  },
  watch: {
      echartsData: {
        handler: function (val, oldVal) {
          this.initChart()
        },
        deep:true
      }
  },
  mounted() {
    this.$nextTick(()=>{
      this.myChart = this.$echarts.init(this.$refs.chart);   
      this.initChart()
    })
  },
  methods: {
   //echarts随浏览器变化样式重置
   echartsResize(obj) {
      window.addEventListener("resize", function () {
          var time = null;
          clearTimeout(time);
          time = setTimeout(function () {
              obj.resize();
          }, 100);
      });
   },
   initChart() {
       let that = this
      let axisDada = [];
       for( let i = 0;i<100;i+=5){
           axisDada.push(i+'-'+(i+5))
       }
       let axisDada1 = [];
       for( let i = 0;i<=20;i++){
           axisDada1.push(i)
       }
       let option = {
           tooltip : {
               trigger: 'item',
               formatter:function(param){
                   return param.seriesName+'： '+param.name+'<br>企业数量：'+param.value
               },
               backgroundColor: 'rgba(4, 54, 181, 0.85)',
               borderWidth: '1',
               borderColor: '#0a61ff',
               extraCssText: 'box-shadow: 0 0 5px rgba(0, 210, 255, 0.25);'
           },
           grid: {
               left: '5%',
               right: '4%',
               bottom: '12%',
               top:'15%',
               containLabel: true
           },
           color:['#7d87bd'],
           xAxis :[{
                   type : 'category',
                   name:'僵尸概率％',
                   nameLocation: 'end',
                   interval:0,
                   nameTextStyle:{
                       color:'#83c1cc',
                       padding: [60,0,0,-60]
                   },
                   data : axisDada,
                   boundaryGap:true,
                   splitNumber: 20,
                   axisTick: {
                       show:false,
                       lineStyle:{
                           color:'#83c1cc'
                       }
                   },
                   axisLabel:{
                       color:'#83c1cc'
                   },
                   axisLine: {
                       show:true,
                       lineStyle:{
                           color:'#7896ff'
                       }
                   }
               },
               {
                   type : 'category',
                   data : axisDada1,
                   boundaryGap:false,
                   splitNumber: 20,
                   axisTick: {
                       show:false,
                       lineStyle:{
                           color:'#83c1cc'
                       }
                   },
                   axisLabel:{
                       show:false,
                       color:'#83c1cc'
                   },
                   axisLine: {
                       show:true,
                       lineStyle:{
                           color:'#7896ff'
                       }
                   }
               }
           ],
           yAxis : [
               {
                   type : 'value',
                   name:"企业数量",
                   nameTextStyle:{
                       color:'#83c1cc',
                       padding: [60,0,0,-40]
                   },
                   axisLine: {
                       show:true,
                       lineStyle:{
                           color:'#7896ff'
                       }
                   },
                   axisLabel:{
                       color:'#83c1cc'
                   },
                   axisTick:{
                       show:false,
                       lineStyle:{
                           color:'#83c1cc'
                       }
                   },
                   splitLine: {
                       show:true,
                       lineStyle:{
                           color:'rgba(120,150,255,.1)'
                       }
                   }
               }
           ],
           series : [
               {
                   name:'僵尸概率％',
                   type:'bar',
                   barCategoryGap:'-0.3%',
                   data:this.echartsData.seriesData
               },
               {
                   xAxisIndex: 1,
                   // show: false,
                   name: '辅助',
                   type: 'line',
                   data: [],
                   markArea: {
                       silent: true,
                       label:{
                           normal:{
                               color:'#b2e1ff',
                               borderColor:'#0e3baf',
                               borderWidth:1,
                               padding:[5,20,5,20],
                               borderRadius:20
                           }
                       },
                       data: [
                           [{
                               name: '低',
                               coord: [0],
                               itemStyle: {
                                   normal: {
                                       color: 'rgba(4, 94, 127, 0)',
                                       borderColor:'rgba(120,150,255,.1)',
                                       borderWidth:1
                                   }
                               }
                           }, {
                               coord: [8]
                           }],
                           [{
                               name: '中',
                               coord: [8],
                               itemStyle: {
                                   normal: {
                                       color: 'rgba(24, 67, 105, 0)',
                                       borderColor:'rgba(120,150,255,.1)',
                                       borderWidth:1
                                   }
                               }
                           }, {
                               coord: [15]
                           }],
                           [{
                               name: '高',
                               coord: [15],
                               itemStyle: {
                                   normal: {
                                       color: 'rgba(18, 51, 83,0)',
                                       borderColor:'rgba(120,150,255,.1)',
                                       borderWidth:1
                                   }
                               }
                           }, {
                               coord: [21]
                           }]
                       ]
                   },
               }
           ]
       }
       this.echartsResize(this.myChart)
       this.myChart.setOption(option);
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>

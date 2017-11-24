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
       let data = [];
       let yNumber = [10,9,8,7,6,5,4,3,2,1];
       let that = this
       for (let i = 1; i < 11; i++) {
           data.push(Math.round(Math.random() * 500) + 2000);
       }
       data.sort();
       let option = {
           grid:{
               left:'30%',
               top:'1%',
               right:'15%',
               bottom:'5%'
           },
           yAxis: [{
               data: this.echartsData.yAxisData,
               axisLabel: {
                   textStyle: {
                       color: '#83c1cc',
                       fontSize:12,
                       align:'right'
                   }
               },
               inverse:true,
               splitLine: {
                   show: false
               },
               axisTick:{
                   show:false
               },
               axisLine: {
                   show: false
               }
           }, {
               // 辅助y 轴
               show: true,
               axisLabel:{
                   textStyle:{
                       color: '#83c1cc',
                       fontSize:12
                   }
               },
               splitLine: {
                   show: false
               },
               axisTick:{
                   show:false
               },
               axisLine: {
                   show: false,
                   lineStyle: {
                       color: '#002A75',
                       fontSize:14
                   }

               },
               data: yNumber,
               position:'left',
               offset:50,
           }],
           xAxis: {
               show:false,
               axisLine: {
                   show: false
               }
           },
           color:['#162f66','#3f6bb5','#649ada','#6cbcf5','#6dd5fd','#ffce56','#ef9b55','#d14b1d'],
           series: [{
               type: 'bar',
               data: this.echartsData.seriesData,
               barWidth: 8,
               label: {
                   normal: {
                       position: 'right',
                       show:true,
                       formatter: '{c}',
                       color:'#83c1cc'
                   }
               },
               itemStyle: {
                   normal: {
                       barBorderRadius: 20,
                       color: function(params) {
                           if(params.dataIndex<3){
                               return new that.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                   offset: 0,
                                   color:'#ffec57'
                               }, {
                                   offset: 1,
                                   color: '#e6c13e'
                               }])

                           }else{
                               return new that.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                   offset: 0,
                                   color:'#419cf5'
                               }, {
                                   offset: 1,
                                   color: '#2c7de4'

                               }])
                           }

                       },



                       shadowColor: 'rgba(0, 0, 0, 0)',
                       shadowBlur: 20
                   }
               }
           }]
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

<template>
    <div class="chart-wrapper" ref="chart">

    </div>
</template>

<script>
  export default {
  name: 'bar',
  data() {
    return {}
  },
  props: {
      echartsData: {
          type: Object,
          default: () => {}
      }
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
//       console.log(this.echartsData)
      let option = {
          color: ['#3e6591', '#eb7d22', '#d73f45'],
          grid: {
              top:'20',
              bottom:'5%',
              left:'10',
              right:'10',
              containLabel: true
          },
          tooltip: {
              trigger: 'axis',

              axisPointer: {
                  type: 'shadow',
                  axis: 'auto',
                  shadowStyle: {
                      color: '#0f276b'
                  },
                  z:1
              },
              textStyle: {
                  align: 'left',
                  color: '#5cc1ff',
                  fontSize: '16'
              },
              backgroundColor: 'rgba(4, 54, 181, 0.85)',
              borderWidth: '1',
              borderColor: '#0a61ff',
              extraCssText: 'box-shadow: 0 0 5px rgba(0, 210, 255, 0.25);'
          },
          legend: {
              data: ['中风险', '高风险'],
              right: '10',
              top: '0',
              textStyle: {
                  color: '#83c1cc',
                  fontSize: 12
              },
              itemGap: 20,
              itemHeight: 6,
              itemWidth: 8
          },
          calculable: true,
          yAxis: {
              axisLine: {
                  lineStyle:{
                      color:'#7896ff'
                  }
              },
              axisLabel: {
                  textStyle:{
                      color:'#83c1cc'
                  }
              },
              axisTick: {
                  show:false,
              },
              splitLine:{
                  show:false
              }
          },
          xAxis: [ {
              name: '',
              nameTextStyle: {
                  fontWeight: 'bold'
              },
              position: 'bottom',
              axisLine: {
                  show: true,
                  lineStyle:{
                      color:'#7896ff'
                  }
              },
              axisTick: {
                  show:false,
              },
              axisLabel: {
                  interval: 0,
                  rotate: '0',
                  formatter:'{value}',
                  textStyle:{
                      color:'#83c1cc'
                  }
              },
              data: this.echartsData.xAxisData
          }],
          series: [ {
              name:'中风险',
              type: 'bar',
              data:this.echartsData.seriesdata[0],
              barMaxWidth: 8,
              z:2,
              itemStyle: {
                  normal: {
                      color:new this.$echarts.graphic.LinearGradient(
                          0, 0, 0, 1,
                          [
                              {offset: 0, color: '#ffd43d'},
                              {offset: 1, color: '#ffe542'}
                          ]
                      ),
                      opacity:0.5
                  },
                  emphasis: {
                      color:new this.$echarts.graphic.LinearGradient(
                          0, 0, 0, 1,
                          [
                              {offset: 0, color: '#ffd43d'},
                              {offset: 1, color: '#ffe542'}
                          ]
                      ),
                      opacity:1
                  }
              }
          }, {
              name:'高风险',
              type: 'bar',
              barMaxWidth: 8,
              data:this.echartsData.seriesdata[1],
              z:2,
              itemStyle: {
                  normal: {
                      color:new this.$echarts.graphic.LinearGradient(
                          0, 0, 0, 1,
                          [
                              {offset: 0, color: '#ff562f'},
                              {offset: 1, color: '#ff8920'}
                          ]
                      ),
                      opacity:0.5
                  },
                  emphasis: {
                      color:new this.$echarts.graphic.LinearGradient(
                          0, 0, 0, 1,
                          [
                              {offset: 0, color: '#ff562f'},
                              {offset: 1, color: '#ff8920'}
                          ]
                      ),
                      opacity:1
                  },
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

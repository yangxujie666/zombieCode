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
            if(this.myChart){
                this.initChart()
            }
        },
        deep: true  //增加deep 观察对象的子对象变化
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
      let option = {
          tooltip: {
              confine: true,
              backgroundColor: 'rgba(4, 54, 181, 0.85)',
              borderWidth: '1',
              borderColor: '#0a61ff',
              extraCssText: 'box-shadow: 0 0 5px rgba(0, 210, 255, 0.25);'
          },
          legend: {
              itemWidth:5,
              itemHeight:5,
              icon:'circle',
              textStyle:{
                  color:'#83c1cc'
              },
              bottom:'5%',
              left:8,
              right:8,
              itemGap:15,
              selected:{
                  '7月':false,
                  '8月':false,
                  '9月':false,
                  '10月':false,
                  '11月':false,
                  '12月':false
              },
              data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
          },
          radar: {
              startAngle:60,
              radius: '55%',
              center: ['50%', '40%'],
              axisLine:{
                  lineStyle:{
                      color:'#0046d3'
                  }
              },
              name:{
                  color:'#83c1cc'
              },
              axisLabel:{
                  color:'#83c1cc',
                  fontSize:'0.12rem',
                  margin: 2,
              },
              splitLine: {

                  lineStyle: {
                      color: '#0046d3',
                      opacity: 1
                  }
              },
              splitArea: {
                  show: true,
                  areaStyle: {
                      color: '#83c1cc',
                      opacity: 0
                  }
              },
              indicator: this.echartsData.indicatorData
          },
          color:['#85ffff','#4fd4ff','#00b7ff','#7068d0','#713fe1','#7f46c3','#b13a85','#c63039','#cb603d','#d18500','#eeb500','#ffe33a'],
          series: [{
              name: '',
              type: 'radar',
              data : this.echartsData.seriesData
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

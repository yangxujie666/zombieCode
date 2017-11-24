<template>
    <div class="chart-wrapper" ref="chart">

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
      //this.initChart()
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
          title:{
              text:this.echartsData.title,
              textStyle:{
                  fontSize:12,
                  color:'#b2e1ff'
              },
              bottom:0,
              left:'center'
          },
          tooltip: {
              show:false
          },
          legend: {
              show:false
          },
          series: [
              {
                  name:'',
                  type:'pie',
                  radius: ['55%', '85%'],
                  center:["50%",'40%'],
                  hoverAnimation: false,
                  label: {
                      normal: {
                          show: true,
                          position:'center',
                          padding:[10,0,0,0],
                          formatter:function(obj){
                              if(obj.name == '表空间利用率'){
                                  return obj.percent+'%'
                              }
                          },
                          textStyle:{
                              fontSize: 12,
                              color:'#ffc600'
                          }
                      }
                  },
                  labelLine: {
                      normal: {
                          show: false,
                          length:20,
                          length2:60,
                          lineStyle:{
                              color:'#a0b7ce'
                          }
                      }
                  },
                  data:[
                      {value:this.echartsData.valueData[0],
                          name:'表空间利用率',
                          itemStyle:{
                              normal:{
                                  color:new this.$echarts.graphic.LinearGradient(
                                      0, 0, 0, 1,
                                      [
                                          {offset: 0, color: this.echartsData.color[0]},
                                          {offset: 1, color: this.echartsData.color[1]}
                                      ]
                                  )
                              }
                          }
                      },
                      {
                          value:this.echartsData.valueData[1],
                          name:'',
                          itemStyle:{
                              normal:{
                                  color:'#0c1b43'
                              }
                          }
                      }
                  ]
              }
          ]
      };
       this.echartsResize(this.myChart)
       this.myChart.setOption(option);

    }
   
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>

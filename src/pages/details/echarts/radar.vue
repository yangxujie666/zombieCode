<template>
    <div class="chart-wrapper" id="chart" ref="chart" style="height:100%;width:100%">
    </div>
</template>

<script>
  export default {
  name: 'radar',
  props: {
    echartsData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      myChart:{},
      indicatorData : [
      {name: '同地址企业个数', max: 6500},
      {name: '地址变更次数', max: 38000},
      {name: '名称变更次数', max: 28000},
      {name: '是否地址无法连系', max: 1.5},
      {name: '有无公示年报', max: 1.5},
      {name: '是否隐瞒真实信息', max: 1.5}
    ]
    }
  },
  watch: {
      echartsData: {
        handler(val, oldVal) {
//          console.log(this.myChart)
          if(this.myChart.setOption) {
            this.initChart()
          }
        },
        deep: true  //增加deep 观察对象的子对象变化
      }
  },
  mounted() {
    this.$nextTick(()=>{
      this.myChart = this.$echarts.init(this.$refs.chart);
//      this.initChart()
    })
  },
  methods: {
    initChart() {
      let option = {
//        backgroundColor: 'transparent',
        title: {
          show:false
        },
        tooltip: {
          show:false,
          trigger: 'item',
          padding:10,
          formatter:function(params){
            var list = '数据展示<br>';
            var arr = option.radar.indicator;
            params.data.value.forEach(function(v,i){
              list += '<span>'+arr[i].name+'：</span><span>'+v+'</span><br>'
            });
            return list
          }
        },
        legend: {
          show:false
        },
        radar: {
          // shape: 'circle',
          name: {
            textStyle:{
                fontsize:14,
                color:'#7ecdff'
            }
          },
          indicator: this.indicatorData,
          splitArea:{
            areaStyle:{
              color:['rgba(37,94,211,.30)','rgba(37,94,211,.30)','rgba(37,94,211,.30)','rgba(37,94,211,.30)','rgba(37,94,211,.01)']
            }
          },
          axisLine: {            // 坐标轴线
            show: true,
            lineStyle:{
              color : '#05429d'
            }// 默认显示，属性show控制显示与否
          },
          splitLine : {
            show : true,
            lineStyle : {
              width : 1,
              color : '#05429d' // 图表背景网格线的颜色
            }
          },
          startAngle: 120
        },
        series: [{
          name: '僵尸企业',
          type: 'radar',
          // areaStyle: {normal: {}},
          data: [
            {
              value: this.echartsData.valueData,
              name: '僵尸企业'
            }
          ],
          itemStyle: {
            normal: {
              color : "#ffd800", // 图表中各个图区域的边框线拐点颜色
              lineStyle: {
                color:"transparent" // 图表中各个图区域的边框线颜色
              },
              areaStyle: {
                type: 'default'
              }
            }
          },
          areaStyle:{
            normal:{
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: '#77c0fe' // 0% 处的颜色
                },
                  {
                  offset: 1, color: '#0138c3' // 100% 处的颜色
                }],
                globalCoord: false // 缺省为 false
              },
              opacity:0.6
            }
          }
        }]
      };
      this.myChart.setOption(option);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>

<template>
    <div ref="map" class="chart"></div>
</template>

<script type="text/ecmascript-6">
  // 引入基本模板
  let echarts = require('echarts/lib/echarts')
  // 引入地图组件
  require('echarts/lib/chart/map')
  require('echarts/map/js/china.js')
  require('echarts/map/json/china.json')
  require('echarts/lib/component/tooltip')
  require('echarts/lib/component/legend')
export default{
  name:'map',
  props:['mapData','numOrRatio'],
  data(){
    return {

    }
  },
  watch: {
    mapData: {
      handler: function (val, oldVal) {
          if(this.myChart){
              this.initChart()
          }
      }
    }
  },
  mounted() {
    this.$nextTick(()=>{
      this.myChart = this.$echarts.init(this.$refs.map);
      this.initChart()
    })
  },
  methods:{
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
    initChart(){
      var _this = this;
      let option={
        title: {
          show:false
        },
        tooltip: {
          trigger: 'item',
          backgroundColor:'transparent',
          formatter:function(params){
            var html='';
            if(params.value){
                return html += '<div style="border: 1px solid #0a61ff;background: rgba(4,54,181,.9);padding: 5px 20px;">'
                  +'<p style="color: #fff;font-size: 14px;">'+params.name+'</p>'
                  +'<p style="font-size: 12px;color: #7ecdff;">僵尸企业数量<span style="color: #ffc600;font-size: 16px;font-weight: bold;margin-left: 10px;">'+params.value+'</span></p>'
                  +'<p style="font-size: 12px;color: #7ecdff;">僵尸企业占比<span style="color: #ffc600;font-size: 16px;font-weight: bold;margin-left: 10px;">'+params.data.value1+'%</span></p>'
                  +'</div>'
            }else {
              return ;
            }
          }
        },
        legend: {
          show:false
        },
        visualMap: {
          min: 0,
          max: 2500,
          itemWidth:6,
          itemHeight:120,
          borderRadius:20,
          left: 50,
          bottom: 40,
          text: ['高','低'],           // 文本，默认为数值文本
          textStyle:{
            color: '#b2e1ff',
            fontSize: 14
          },
          calculable: false,
          color:['#0067f1','#8dbfff']
        },
        series: [
          {
            name: '',
            type: 'map',
            mapType: 'china',
            roam: false,
            showLegendSymbol:false,
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            itemStyle:{
              normal:{
                areaColor:'#8cbfff',
                borderColor:'#052361'
              },
              emphasis:{
                areaColor:new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 1, color: '#eab600'
                }, {
                  offset: 0, color: '#d98a00'
                }])
              }
            },
            markPoint:{
              symbolSize:0,
            },
            data:this.mapData
          }

        ]
      }
      this.echartsResize(this.myChart)
      this.myChart.setOption(option);
    }
  }
}
</script>

<style lang="scss" scoped>
    .chart {
        width: 100%;
        height: 100%;
    }
</style>

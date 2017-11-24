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
        }
      },
      deep:true
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
               tooltip : {
                   trigger: 'item',
                   formatter: function(param){
                       let html = ''
                       html+='<div style="width:190px;hright:108px;">'
                           +'<div style="padding-left: 8px;"><span style="display:inline-block;width:8px;height: 8px;border-radius:4px;border: 1px solid #8590ae;margin-right: 6px;"></span><span style="display: inline-block;width: 100px;">'+param.name+'：</span><span style="color:#ffc600;">'+param.percent+'%</span><i style="display: inline-block;width:8px;height:15px;margin-left:3px;background: url(../../../../static/img/arrow-up.png)"></i></div>'
                           +'<p><span style="color:#7ecdff;padding-left: 22px;display: inline-block;width: 100px;">全国：</span><span style="color:#ffc600;">'+param.data.value2+'</span></p>'
                           +'<p><span style="color:#7ecdff;padding-left: 22px;display: inline-block;width: 100px;">风险企业：</span><span style="color:#ffc600;">'+param.data.value3+'</span></p>'
                           +'<p><span style="color:#7ecdff;padding-left: 22px;display: inline-block;width: 100px;">风险企业占比：</span><span style="color:#ffc600;">'+param.data.value4+'</span></p>'
                           +'</div>'
                       return  html
                   },
                   backgroundColor: 'rgba(4, 54, 181, 0.85)',
                   borderWidth: '1',
                   borderColor: '#0a61ff',
//                   confine:true,
                   extraCssText: 'box-shadow: 0 0 5px rgba(0, 210, 255, 0.25);'
               },
               legend: {
                   orient:'vertical',
                   top:'10%',
                   left:'4%',
                   textStyle:{
                       color:'#b2e1ff',
                       fontSize:12
                   },
                   itemGap: 25,
                   icon:'circle',
                   itemWidth:5,
                   itemHeight:5,
                   data : this.echartsData.legendData,
               },

               calculable : true,
               color:['#cee062','#d8aa10','#d98334','#68b6ff',
                   '#319ee7','#207be7','#2242e3'],
               series : [
                   {
                       name:'',
                       type:'pie',
                       radius : ['20%', '80%'],
                       center : ['70%', '50%'],
                       roseType : 'radius',
                       label: {
                           normal: {
                               show: false
                           },
                           emphasis: {
                               show: false
                           }
                       },
                       lableLine: {
                           normal: {
                               show: false
                           },
                           emphasis: {
                               show: true
                           }
                       },
                       data: this.echartsData.seriesData,
                   },
                   {
                       name:'',
                       type:'pie',
                       radius : ['10%', "20%"],
                       center : ['70%', '50%'],
                       tooltip: {
                           show: false
                       },
                       hoverAnimation:false,
                       legendHoverLink:false,
                       label: {
                           show:false,
                           normal: {
                               show: false
                           },
                           emphasis: {
                               show: false
                           }
                       },
                       lableLine: {
                           show: false,
                           normal: {
                               show: false
                           },
                           emphasis: {
                               show: false
                           }
                       },
                       data:[
                           {
                               value:'',
                               itemStyle:{
                                   normal:{
                                       color:'#000'
                                   }
                               }
                           }
                       ]
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

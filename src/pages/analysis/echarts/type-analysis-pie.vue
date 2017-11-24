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
       let option = {
           tooltip: {
               trigger: "item",
               formatter: function(param){
                   let html = ''
                   html+='<div style="width:180px;hright:128px;">'
                                +'<div style="padding-left: 10px;"><span style="display:inline-block;width:5px;height: 5px;border-radius:3px;background: #01d9e4;margin-right: 6px;"></span>'+param.name+'</div>'
                                +'<p><span style="color:#7ecdff;padding-left: 22px;">全类占比：</span><span style="color:#ffc600;padding-left: 14px;">'+param.data.value1+'</span></p>'
                                +'<p><span style="color:#7ecdff;padding-left: 22px;">同类占比：</span><span style="color:#ffc600;padding-left: 14px;">'+param.data.value2+'</span></p>'
                                +'<p><span style="color:#7ecdff;padding-left: 22px;">全类同比：</span><span style="color:#ffc600;padding-left: 14px;">'+param.data.value3+'</span><i style="display: inline-block;width:8px;height:15px;margin-left:3px;background: url(../../../../static/img/arrow-down.png)"></i></p>'
                                +'<p><span style="color:#7ecdff;padding-left: 22px;">问题主因：</span><span style="color:#7ecdff;padding-left: 14px;">'+param.data.value4+'</span></p>'
                        +'</div>'
                   return  html
               },
               backgroundColor: 'rgba(4, 54, 181, 0.85)',
               borderWidth: '1',
               borderColor: '#0a61ff'
           },
           legend: {
               orient:'vertical',
               top:'center',
               left:'16px',
               textStyle:{
                   color:'#b2e1ff',
                   fontSize:12
               },
               itemGap: 20,
               icon:'circle',
               itemWidth:5,
               itemHeight:5,
               data:this.echartsData.legendData
           },
           calculable: true,
           color:['#84baef','#5b9edf','#2e93df','#2179df','#263fd8'],
           series: [
               {
                   name: "",
                   type: "pie",
                   radius: ["55%", "80%"],
                   center:['64%','50%'],
                   avoidLabelOverlap: false,
                   label: {
                       normal: {
                           show: false,
                           position: 'center'
                       }
                   },
                   itemStyle:{
                       normal:{
                           borderColor:'#112660',
                           borderWidth:2

                       },
                       emphasis:{

                       }
                   },
                   data: this.echartsData.seriesData
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

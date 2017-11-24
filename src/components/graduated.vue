<template>
    <div>
        <div id="scale" style="width: 710px;height: 48px;box-sizing: border-box;position: relative;margin: auto;"></div>
    </div>
</template>

<script type="text/javascript">
  require ('../assets/js/commonjs-simulator.min.js')
  let libMain = require ('../assets/js/dist/js/main.min.js')

    export default {
        name: 'graduated',
        props: {
            title: {
                type: String,
                default: ''
            }
        },
        data() {
            return {

            }
        },
      mounted(){
          this.initTimeLine()
      },
      methods:{
          initTimeLine(){
            let el = {
              width: document.getElementById('scale').clientWidth,
              height: document.getElementById('scale').clientHeight,
              id: 'scale',
              handle: 14,
              init: '2017/5', //初始化
              ticklength: 12, //刻度大小
              data: [ //后台数据
                "2016.05", "2016.06", "2016.07", "2016.08", "2016.09", "2016.10", "2016.11", "2016.12", "2017.01", "2017.02", "2017.03", "2017.04", "2017.05"
              ]
            };
            let timeLinescale = libMain.TimeLinescale;
            let scale = new timeLinescale(el);
            scale.createScale();
            scale.on(d=> {
              this.$emit('graduatedTime',d)
            })
          }
      }
    }
</script>

<style lang="scss" scoped>

</style>

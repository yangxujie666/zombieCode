<template>
    <div ref="chart" class="branch-wrapper" id="branch-wrapper"></div>
</template>
<script type="text/javascript">
    // **** 组件名称 大驼峰 *****
    // ** 本地公用变量 公用函数 **
    // ***** 第三方 组件库 *****
    // ***** 本地 公用组件 *****
    // ** 当前组件的 子组件等 ***
//    window.d3=require('../../static/d3-v4.10.0.min.js')
    import * as ChartLib from '../../static/chart-library.min.js';
    console.log(ChartLib);
//    const ChartLib=require('')
//    import simulator from '../../static/commonjs-simulator.min.js'
    export default {
        name: 'component_name',
        props: {
            echartsData: {
                type: Object,
                default: () => {}
            }
        },
        data() {
            return {

            }
        },
        created(){
        },
        mounted(){
        },
        methods:{
            creatChart (){
                document.getElementById('branch-wrapper').innerHTML = ""
                let polarGroupedBranchChart = new ChartLib.PolarGroupedBranchChart2()
                polarGroupedBranchChart.data = this.echartsData
                polarGroupedBranchChart.width = 1200
                polarGroupedBranchChart.height = 510
                polarGroupedBranchChart.on('itemClick', function (e) {
                    console.log(e.data);
                    //alert('Item clicked: ' + e.data.name);
                });
                document.getElementById('branch-wrapper').appendChild(polarGroupedBranchChart.domElement);
            }
        },
        watch: {
            echartsData: {
                handler: function (val, oldVal) {
                    this.creatChart()
                },
                deep:true
            }
        }
    }
</script>

<style lang="scss" scoped>
    .branch-wrapper{
        width: 100%;
        height:100%;
    }
</style>

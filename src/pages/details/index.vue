<template>
    <div class="details">
        <div class="details-wrapper">
            <searchBox @inputValue="searchInput" :showInput="false"></searchBox>
            <div class="details-industry clearfix">
                <div class="industry-col clearfix fl">
                    <div class="img-wrapper fl"><img src="../../../static/img/img1.jpg"></div>
                    <div class="industry-info fl">
                        <h1>{{companyName}}<span class="operate-status">续存</span></h1>
                        <div class="industry-msg">
                            <span class="industry-person"><i class="icon iconfont icon-touxiang"></i>{{companyPerson}}</span>
                            <span class="industry-area"><i class="icon iconfont icon-zuobiao1"></i>{{companyArea}}</span>
                            <span class="industry-type"><i class="icon iconfont icon-gongjuxiang"></i>{{companyType}}</span>
                        </div>
                        <span class="product-service"><span>产品/服务：</span>{{companyDetail}}</span>
                        <span class="product-service"><span>企业地址：</span>{{companyAdress}}</span>
                    </div>
                </div>
                <div class="details-btn fr">
                    <span class="details-favorite" :class="attention?'active':''" @click="favoriteClick"><i class="icon iconfont" :class="attention?'icon-heart1':'icon-heart'"></i>关注企业</span>
                    <span class="details-details"><i class="icon iconfont icon-mulu"></i>企业详情</span>
                </div>
            </div>
            <radarBox :echartsData="echartsData" @graduatedtime = "graduatedTime"></radarBox>
            <div class="branch-container">
                <div class="branch-tab-wrapper">
                    <div class="branch-tab fl">
                        <span class="branch-span active" @click="branchTap(0)">对外投资</span>
                        <span class="branch-span" @click="branchTap(1)">分支机构</span>
                        <span class="branch-span" @click="branchTap(2)">法人股东</span>
                    </div>
                    <div class="branch-icon fr">
                        <span><i></i>风险低</span>
                        <span><i class="middle"></i>风险中</span>
                        <span><i class="high"></i>风险高</span>
                    </div>
                </div>
                <branchChart :echartsData="branchData"></branchChart>
            </div>

        </div>
    </div>
</template>

<script type="text/javascript">
  import searchBox from '@/components/search.vue'
  import radarBox from 'pages/details/details-radar-echart.vue'
  import spread from 'pages/details/details-spread.vue'
  import branchChart from '@/components/branch-chart.vue'

  import api from '@/api'
  export default {
    name: 'list',
    data() {
      return {
        companyName:'',
        companyPerson:'',
        companyArea:'',
        companyDetail:'',
        companyAdress:'',
        companyType:'',
        attention:false,
        echartsData:{
          valueData:[],
          percentdata:'',
          enterpriseType: '',
          echartResults:[]
        },
        paramInfo: {
            legalPerson: '',
            area: '',
            areaId: '',
            industry: '',
            industryId: '',
            entName: '',
            entId: '',
            zombieRate: ''
        },
        branchData:{
             "id": 1,
             "name": "首钢集团有限公司",
             "group": -1,
             "children": [
                 {
                     "id": 2,
                     "name": "寿光市继刚家庭农场",
                     "group": 1,
                     "type": 1
                 },
                 {
                     "id": 3,
                     "name": "剑阁县土生金农业开发有限公司",
                     "group": 1,
                     "type": 1
                 },
                 {
                     "id": 4,
                     "name": "安丘市景芝镇宋家里岗村经济专业合作社",
                     "group": 1,
                     "type": 1
                 },
                 {
                     "id": 5,
                     "name": "日照山河生态农业开发有限公司",
                     "group": 1,
                     "type": 1
                 },
                 {
                     "id": 6,
                     "name": "柳河县姜家店乡三合村王阳种植场",
                     "group": 1,
                     "type": 1
                 },
                 {
                     "id": 7,
                     "name": "井冈山市茨坪赣南饭店",
                     "group": 1,
                     "type": 3
                 },
                 {
                     "id": 8,
                     "name": "泰安市岱岳区范镇岔河粮菜合作社",
                     "group": 1,
                     "type": 3
                 },
                 {
                     "id": 9,
                     "name": "广州市天河区视霸影院",
                     "group": 1,
                     "type": 3
                 },
                 {
                     "id": 10,
                     "name": "原平市巨才玉米专业合作社",
                     "group": 1,
                     "type": 3
                 },
                 {
                     "id": 11,
                     "name": "井冈山市茨坪赣南饭店",
                     "group": 2,
                     "type": 1
                 },
                 {
                     "id": 12,
                     "name": "泰安市岱岳区范镇岔河粮菜合作社",
                     "group": 2,
                     "type": 1
                 },
                 {
                     "id": 13,
                     "name": "大连嘉泰汽车配件商行",
                     "group": 2,
                     "type": 2
                 },
                 {
                     "id": 14,
                     "name": "彭泽县高山风清茶种植专业合作社",
                     "group": 2,
                     "type": 2
                 },
                 {
                     "id": 15,
                     "name": "吉安驼洋农业科技有限公司",
                     "group": 2,
                     "type": 2
                 },
                 {
                     "id": 16,
                     "name": "师宗县龙庆美菊三七种植园",
                     "group": 2,
                     "type": 2
                 },
                 {
                     "id": 17,
                     "name": "锦江区四季田园园艺场",
                     "group": 2,
                     "type": 2
                 },
                 {
                     "id": 18,
                     "name": "莱西市首君家庭农场",
                     "group": 2,
                     "type": 2
                 },
                 {
                     "id": 19,
                     "name": "定陶县穗丰农作物专业合作社",
                     "group": 2,
                     "type": 2
                 }
             ]
         },
        paramInfo1: {
            entName: '',
            entId: ''
        },
        startData:'',
        endData:''

      }
    },
    methods:{
      //获取搜索框值
      searchInput(opt){
        console.log(opt)

      },
        //时间轴回掉
        graduatedTime(msg){
          console.log(msg)
            this.startData = msg.startDate
            this.endData = msg.endData
            this.renderRader()
        },
        //雷达图
        renderRader(){
            let params = {
                entName: this.$route.params.name,
                startData:this.startData,
                endData: this.endData
            }
            api.getRaderData(params)
                .then(res => {

                    let valueDate=[]
                    let valueArry = res.data.valueArry
                    valueArry.forEach((v,i)=>{
                        this.echartsData.echartResults.push(v.value);
                        if( v.value == "是" || v.value == "有") {
                            valueDate.push("1");
                        }else if( v.value == "否" || v.value == "无") {
                            valueDate.push("0");
                        }else{
                            valueDate.push(v.value);
                        }
                    })
                    this.echartsData.valueData=valueDate
                    this.echartsData.percentdata = res.data.percentdata
                    this.echartsData.enterpriseType = res.data.enterpriseType
                })
        },
      firstLoad(){
//        this.companyName = '首钢集团有限公司'
//        this.companyPerson = '金伟'
//        this.companyArea = '北京'
//        this.companyDetail = '钢铁生产'
//        this.companyAdress = '北京市石景山区石景山路首钢厂东门'
//        this.companyType = '制造业'
//        this.echartsData.percentdata = '5%'
//        this.echartsData.enterpriseType = '健康企业'
//        let valueArry = [
//          {name:"同地址企业个数",value:"4200"},
//          {name:"地址变更次数",value:"22000"},
//          {name:"名称变更次数",value:"24000"},
//          {name:"是否地址无法连系",value:"是"},
//          {name:"有无公示年报",value:"有"},
//          {name:"是否隐瞒真实信息",value:"是"}
//        ];
//        valueArry.forEach((v,i)=>{
//          this.echartsData.echartResults.push(v.value);
//          if( v.value == "是" || v.value == "有") {
//            this.echartsData.valueData.push(1);
//          }else if( v.value == "否" || v.value == "无") {
//            this.echartsData.valueData.push(0);
//          }else{
//            this.echartsData.valueData.push(v.value);
//          }
//        })
//        console.log(this.echartsData.valueData)
        //雷达图数据请求
        this.renderRader()
          let params = {
              entName: this.$route.params.name
          }
        api.getCompanyData (params)
          .then(res =>{
            console.log(res.data)
            this.companyName = res.data.companyName
            this.companyPerson = res.data.companyPerson
            this.companyArea = res.data.companyArea
            this.companyDetail = res.data.companyDetail
            this.companyAdress = res.data.companyAdress
            this.companyType = res.data.companyType
            this.paramInfo = {
              legalPerson: res.data.companyPerson,
              area: res.data.companyArea,
              areaId: res.data.areaId,
              industry:res.data.companyType,
              industryId:res.data.industryId,
              entName: res.data.companyName,
              entId: res.data.entId,
              zombieRate: res.data.zombieRate
            }
            this.paramInfo1 = {
                entName: res.data.companyName,
                entId: res.data.entId
            }
          })
          //树状图参数
          let params2 = {
              entName: this.$route.params.name,
              entId: this.$route.params.id,
              type:0
          }
          //树状图数据
          api.getBranchData(params2)
              .then(res=>{
                  console.log(res)
                  this.branchData = res.data
              })
      },
        //切换
      branchTap(ind){
          let spans = document.getElementsByClassName("branch-span")
          for( let i = 0;i<spans.length;i++){
              spans[i].classList.remove("active")
          }
          spans[ind].classList.add("active")
          //树状图参数
          let params2 = {
              entName: this.$route.params.name,
              entId: this.$route.params.id,
              type:ind
          }
          //树状图数据
          api.getBranchData(params2)
              .then(res=>{
                  console.log(res)
                  this.branchData = res.data
              })
      },
      // 收藏
      favoriteClick(e){
        if (this.attention){
            let param = this.paramInfo1
            api.getUnfollow(param)
                .then(res => {
                    this.attention = false
                })
        }else{
            let param = this.paramInfo
            api.getUnfollow(param)
                .then(res => {
                    this.attention = true
                })
        }
      },
    },
    mounted(){
        this.$nextTick(()=>{
            this.firstLoad()
        })

    },
    components: {
      searchBox,
      radarBox,
      spread,
      branchChart
    }
  }
</script>

<style lang="scss" scoped>
    .details {
        width: 100%;
        height: 100%;
        background: url(../../assets/img/bg.jpg);
        background-size: 100% 100%;
        overflow: auto;
    }
    .details-wrapper {
        width: 1200px;
        margin: 0 auto;
    }
    .details-industry {
        padding: 25px 0;
        background: url(../../../static/img/list-bg1.png) no-repeat;
        background-size: 100% 100%;
    }
    .industry-col {
        width: 80%;
    }
    .img-wrapper {
        width: 121px;
        height: 121px;
        margin-left: 43px;
        border: 1px solid #333950;
        img {
            display: block;
            width: 100%;
            height: 100%;
        }
    }
    .industry-info {
        margin-left: 20px;
        h1 {
            font-size: 22px;
            color: #fff;
        }
        .industry-msg {
            margin: 18px 0;
            color: #7ecdff;
            line-height: 20px;
            span {
                margin-right: 20px;
            }
            .industry-person {
                i {
                    float: left;
                    margin-top: 2px;
                    font-size: 22px;
                }
            }
            .industry-area {
                i {
                    font-size: 20px;
                }
            }
            .industry-type {
                i {
                    margin-right: 3px;
                    font-size: 18px;
                }
            }
        }
    }
    .product-service {
        display: block;
        font-size: 14px;
        color: #b3bdd9;
        line-height: 26px;
    }
    .operate-status {
        float: right;
        width: 52px;
        height: 23px;
        line-height: 23px;
        border: 1px solid #0644b6;
        border-radius: 5px;
        background: rgba(14,59,175,.51);
        color: #a2cfe8;
        font-size: 12px;
        text-align: center;
    }
    .details-btn {
        width: 90px;
        margin-right: 45px;
    }
    .details-favorite {
        display: block;
        margin-top: 40px;
        line-height: 20px;
        font-size: 14px;
        color: #b3bdd9;
        cursor:pointer;
        i {
            float: left;
            margin: 2px 6px 0 0;
            color: #f47375;
            font-size: 20px;
        }
    }
    .details-favorite:hover,.details-favorite.active {
        color: #f47375;
    }
    .details-details {
        display: block;
        margin-top: 28px;
        line-height: 20px;
        font-size: 14px;
        color: #b3bdd9;
        text-decoration: underline;
        cursor: pointer;
        i {
            float: left;
            margin-right: 6px;
            color: #f9c22d;
            font-size: 20px;
        }
    }
    .details-details:hover {
        color: #f9c22d;
    }
    .branch-container{
        width: 1198px;
        height: 600px;
        margin: 20px auto;
        box-shadow: 0 0 3px rgba(1,10,40,.3);
        background: url(../../assets/img/details-there.png) no-repeat;
        background-size: 100% 100%;
        .branch-tab-wrapper{
            height:28px;
            width: 100%;
            padding:0 63px;
            padding-top:50px;
            box-sizing: border-box;
            .branch-tab{
                span{
                    width:75px;
                    height:26px;
                    line-height: 26px;
                    text-align: center;
                    border: 1px solid #0644b6;
                    background: rgba(14,59,175,.51);
                    color: #50a4f3;
                    font-size: 12px;
                    display: inline-block;
                    margin-left: 10px;
                    cursor: pointer;
                    &.active{
                        color: #fff;
                    }
                    &:hover{
                        opacity: .7;
                    }
                }
            }
            .branch-icon{
                span{
                    display:inline-block;
                    color: #50a4f3;
                    margin-left: 20px;
                }
                i{
                    display: inline-block;
                    width: 12px;
                    height: 12px;
                    border-radius: 8px;
                    background: -webkit-gradient(linear,center top,center bottom,from(#6badff),to(#2180ff));
                    margin: 0 5px;
                }
                i.middle{
                    background: -webkit-gradient(linear,center top,center bottom,from(#ffe542), to(#fcc438));
                }
                i.high{
                    background: -webkit-gradient(linear,center top,center bottom,from(#ff8920),to(#ff562f));
                }
            }

        }
    }
</style>


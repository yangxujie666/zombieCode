<template>
  <div class="list">
    <div class="list-wrapper">
      <searchBox @inputValue="searchInput" :showInput="true"></searchBox>
      <div class="list-container clearfix">
        <div class="left-list-container fl">
          <ul class="condition-wrapper">
            <li class="has-choose clearfix" :class="{active:!hasChoose}" >
              <span class="l-title">已选条件：</span>
              <ul class="has-choose-con clearfix" id="has-choose-con" @click="xBtn">
              </ul>
            </li>
            <li class="condition-li clearfix" v-if="showHide0" :class="{active: !moreFlag0}">
              <span class="l-title l-title1">行业：</span>
              <ul class="search-con">
                <li v-for="item in industryData" @click="searchLiClick(0)" :id="item.id">{{item.name}}</li>
              </ul>
              <a class="more-btn" @click="moreBtnClick(0)">{{!moreFlag0? '收起': '更多'}}<i class="icon iconfont " :class="{'icon-down':moreFlag0,'icon-up':!moreFlag0}"></i></a>
            </li>
            <li class="condition-li clearfix" v-if="showHide5" :class="{active: !moreFlag3}">
              <span class="l-title l-title1">省份：</span>
              <ul class="search-con">
                <li v-for="item in proviceData" @click="searchLiClick(5)" :id="item.id">{{item.name}}</li>
              </ul>
              <a class="more-btn" @click="moreBtnClick(3)">{{!moreFlag3? '收起': '更多'}}<i class="icon iconfont" :class="{'icon-down':moreFlag3,'icon-up':!moreFlag3}"></i></a>
            </li>
            <li class="condition-li clearfix" v-if="showHide1" :class="{active: !moreFlag1}">
              <span class="l-title l-title1">地区：</span>
              <ul class="search-con">
                <li v-for="item in areaData" @click="searchLiClick(1)" :id="item.id">{{item.name}}</li>
              </ul>
              <a class="more-btn" @click="moreBtnClick(1)">{{!moreFlag1? '收起': '更多'}}<i class="icon iconfont" :class="{'icon-down':moreFlag1,'icon-up':!moreFlag1}"></i></a>
            </li>
            <li class="condition-li clearfix" v-if="showHide2" :class="{active: !moreFlag2}">
              <span class="l-title l-title1">园区：</span>
              <ul class="search-con">
                <li v-for="item in parkData" @click="searchLiClick(2)" :id="item.id">{{item.name}}</li>
              </ul>
              <a class="more-btn" @click="moreBtnClick(2)">{{!moreFlag2? '收起': '更多'}}<i class="icon iconfont" :class="{'icon-down':moreFlag2,'icon-up':!moreFlag2}"></i></a>
            </li>
            <li class="condition-li clearfix" v-if="showHide3">
              <span class="l-title l-title1">高级纬度：</span>
              <ul class="search-con">
                <li v-for="item in advancedLatitudeData" @click="searchLiClick(3)" :id="item.id">{{item.name}}</li>
              </ul>
            </li>
            <li class="condition-li clearfix" v-if="showHide4">
              <span class="l-title l-title1">僵尸概率：</span>
              <ul class="search-con">
                <li v-for="item in zombieProbabilityData" @click="searchLiClick(4)" :id="item.id">{{item.name}}</li>
              </ul>
            </li>
          </ul>
          <div class="list-list">
            <ul class="list-top">
              <li class="industry-col fl">企业</li>
              <li class="status-col fl">营业状态</li>
              <li class="zombieprobably-col fl">僵尸概率</li>
              <li class="favorite-col fl">关注</li>
            </ul>
            <div class="list-content">
              <ul class="list-bottom">
                <li class="clearfix" v-for="item in listData">
                  <div class="industry-col fl clearfix">
                    <div class="img-wrapper fl"><img src="../../../static/img/img1.jpg"></div>
                    <div class="industry-info fl">
                      <h1 @click="gotoDetails(item)" :id="item.id" :title="item.name">{{item.name}}</h1>
                      <div class="industry-msg">
                        <span class="industry-person"><i class="icon iconfont icon-touxiang"></i>{{item.charge}}</span>
                        <span class="industry-area"><i class="icon iconfont icon-zuobiao1"></i>{{item.area}}</span>
                        <span class="industry-type"><i class="icon iconfont icon-gongjuxiang"></i>{{item.industry}}</span>
                      </div>
                      <span class="product-service">产品/服务：{{item.productService}}</span>
                      <span class="product-service">企业地址：{{item.address}}</span>
                    </div>
                  </div>
                  <div class="status-col fl">
                    <span class="operate-status">{{item.status}}</span>
                  </div>
                  <div class="zombieprobably-col fl">
                    <span class="zombieprobably-con" :class="{blue:item.ratio <= 30,orange: item.ratio >= 60,yellow: item.ratio > 30 && item.ratio < 60}"><i class="icon iconfont" :class="{'icon-cai1': item.ratio >= 60,'icon-dianzan': item.ratio < 60}"></i>{{item.ratio}}%</span>
                  </div>
                  <div class="favorite-col fl">
                    <span class="favorite" @click="favoriteClick(item)"><i class="icon iconfont " :class="{'icon-heart': !item.favorite,'icon-heart1': item.favorite}"></i></span>
                  </div>
                </li>
              </ul>
              <div class="pagination" >
                <pagination
                        :pageSize="pageSize"
                        :total="total"
                        :layout="layout"
                        :currentPage = "page"
                        :pageCount="pageCount"
                        @pageChange="pageChange">
                </pagination>
              </div>
            </div>

          </div>
        </div>
        <div class="right-list-container fr">
          <div class="near-zombie-companies">
            <h1>附近疑似僵尸企业<span class="fr" @click="changeList">换一批</span></h1>
            <ul class="zombie-companies-list clearfix">
              <li v-for="item in nearListData"><span class="img-box"><img src="../../../static/img/img2.jpg"></span><p>{{item.name}}</p></li>
            </ul>
          </div>
          <div class="near-zombie-companies">
            <h1>最新疑似僵尸企业<span class="fr" @click="changeList1">换一批</span></h1>
            <ul class="zombie-companies-list clearfix">
              <li v-for="item in newListData"><span class="img-box"><img src="../../../static/img/img2.jpg"></span><p>万宝科技万宝科技</p></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
import axios from 'axios'
import api from '@/api'
import searchBox from '@/components/search.vue'
import pagination from '@/components/pagination.vue'

export default {
  name: 'list',
  data() {
    return {
      inputVal: '',
      pageSize:10,
      total:100,
      pageCount:1,
      page:1,
      layout: "next,prev,jumper,total,pager",
      hasChoose:true,
      showHide0:true,
      showHide1:false,
      showHide2:false,
      showHide3:true,
      showHide4:true,
      showHide5:true,
      span0:'',
      span1:'',
      span2:'',
      span3:'',
      span4:'',
      span5:'',
      moreFlag0:true,
      moreFlag1:true,
      moreFlag2:true,
      moreFlag3:true,
      industryData:[
        {name:'农副食品加工业',id:0},
        {name:'食品制造业',id:1},
        {name:'饮料制造业',id:2},
        {name:'烟草制造业',id:3},
        {name:'纺织业',id:4}
      ],
      areaData:[
        {name:'东城区',id:0},
        {name:'西城区',id:1},
        {name:'朝阳区',id:2},
        {name:'丰台区',id:3},
        {name:'石景山区',id:4},
        {name:'昌平区',id:5},
        {name:'大兴区',id:6},
        {name:'通州区',id:7},
        {name:'门头沟区',id:8}
      ],
      parkData:[
        {name:'清华科技园',id:0},
        {name:'生命科学园',id:1},
        {name:'西二旗工业园',id:2},
        {name:'西二旗工业园',id:3}
      ],
      advancedLatitudeData:[
        {name:'近年无年报更新',id:0},
        {name:'注册地址非真实',id:1},
        {name:'企业地址高频变动',id:2},
        {name:'媒体披露',id:3}
      ],
      zombieProbabilityData:[
        {name:'低:<=30%',id:0},
        {name:'中:40%-60%',id:1},
        {name:'高:>=60%',id:2}
      ],
      proviceData:[
        {name:'北京',id:0},
        {name:'山西',id:1},
        {name:'河南',id:2},
        {name:'福建',id:3},
        {name:'山东',id:4}
      ],
      listData:'',
      nearListData:[],
      newListData:[],
      nearTotal:0,
      nearNum:1,
      newTotal:0,
      newNum:1,
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
      paramInfo1: {
          entName: '',
          entId: ''
      }
    }
  },
  mounted(){
    this.getConditionDataFun()
    this.getConditionDataFun1()
    this.getParams()
    this.getNearIndustryData()
    this.getNewIndustryData1()

  },
  methods:{
    //获取搜索框值
    searchInput(opt){
      this.inputVal = opt
      this.getParams ()
    },
    // 关闭已选按钮
    xBtn(e){
      if(e.target.nodeName == "I"||e.target.nodeName == "SPAN") {
        let id = e.target.parentNode.id;
        if (id == 'choose0') {
          this.showHide0 = true;
          this.span0 = '';
        } else if (id == 'choose1') {
          this.showHide1 = true;
          this.span1 = '';
        } else if (id == 'choose2') {
          this.showHide2 = true;
          this.span2 = '';
        } else if (id == 'choose3') {
          this.showHide3 = true;
          this.span3 = '';
        } else if (id == 'choose4') {
          this.showHide4 = true;
          this.span4 = '';
        }
        let parentNode = e.target.parentNode.parentNode;
        let liNode = e.target.parentNode;
        parentNode.removeChild(liNode);
        let length = parentNode.children.length;
        if (length === 0) {
          this.hasChoose = true;
        }
      }
      this.getParams ()
    },
    // 隐藏筛选条件
    searchLiClick(n){
      if (this.hasChoose) {
        this.hasChoose = !this.hasChoose;
      }
      let liCon = event.target.innerText;
      let html = '<span>'+liCon+'</span><i class="icon iconfont icon-guanbi1"></i>';
      let ulNode = document.getElementById('has-choose-con');
      let liNode = document.createElement("li");
      liNode.className='choose-li'
      liNode.innerHTML = html;
      ulNode.appendChild(liNode);
      if (n === 0){
        this.showHide0 = !this.showHide0;
        liNode.id='choose0';
        this.span0 = event.target.id;
      } else if (n === 1) {
        this.showHide1 = !this.showHide1;
        liNode.id='choose1';
        this.span1 = event.target.id;
      } else if (n === 2) {
        this.showHide2 = !this.showHide2;
        liNode.id='choose2';
        this.span2 = event.target.id;
      } else if (n === 3) {
        this.showHide3 = !this.showHide3;
        liNode.id='choose3';
        this.span3 = event.target.id;
        this.showHide4 = true;
      } else if (n === 4) {
        this.showHide4 = !this.showHide4;
        liNode.id='choose4';
        this.span4 = event.target.id;
      }else if (n === 5) {
        this.showHide5 = !this.showHide5;
        this.showHide1 = !this.showHide1;
        this.showHide2 = !this.showHide2;
        liNode.id='choose5';
        this.span5 = event.target.id;
        this.getConditionDataFun1(this.span5)
      }
      this.getParams ()
    },
    // 点击更多展开
    moreBtnClick(n){
      if (n === 0) {
        this.moreFlag0 = !this.moreFlag0;
      } else if (n === 1) {

        this.moreFlag1 = !this.moreFlag1;
      } else if (n === 2) {
        this.moreFlag2 = !this.moreFlag2;
      }else if (n === 3) {
        this.moreFlag3 = !this.moreFlag3;
      }
    },
    // 收藏
    favoriteClick(item){
        let paramInfo = {
            legalPerson: item.charge,
            area:item.area,
            areaId: item.areaId,
            industry: item.industry,
            industryId: item.industryId,
            entName:item.name,
            entId: item.entId,
            zombieRate: item.ratio
        }
        let paramInfo1 = {
            entName: item.name,
            entId: item.entId
        }
      var cla = event.target.classList[2];
        console.log(event.target.classList)
      if (cla == 'icon-heart'){
            let e = event
          api.getUnfollow(paramInfo)
              .then(res => {
                  e.target.classList.remove(cla)
                  e.target.classList.add('icon-heart1')
              })

      }else if (cla == 'icon-heart1'){
          let e = event
          api.getUnfollow(paramInfo1)
              .then(res => {
                  e.target.classList.remove(cla)
                  e.target.classList.add('icon-heart')
              })


      }
    },
    pageChange (val) {
      this.page = val;
      this.getParams ()
    },
    // 获取行业数据
    getConditionDataFun(){
      let params={
        pid:0
      }
      api.getConditionData1 (params)
        .then(res => {
          this.industryData = res.data;
        })

    },
    // 获取省份数据
    getConditionDataFun1(id){
      let params={
        pid:0
      }
      if(id){
        params.pid = id
      }
      api.getConditionData2 (params)
        .then(res => {
          this.proviceData = res.data;
        })

    },
    // 获取参数
    getParams () {
      var params = {
        inputVal: this.inputVal,
        industryId: this.span0,
        proviceId: this.span5,
        areaId: this.span1,
        parkId: this.span2,
        highLatitudeId: this.span3,
        zombieProbabilityId: this.span4,
        page: this.page,
        pageSize: this.pageSize
      }
      this.loadListData(params)
    },
    // 渲染列表数据
    loadListData(params){
      api.getListData2(params)
        .then(res => {
          this.listData = res.data
          this.total = res.totalRecord
        })
    },
    // 点击企业名字跳转到详情页
    gotoDetails(item){
        this.$router.push('/details/'+item.id+'/'+item.name)
    },
    // 获取附近疑似僵尸企业数据
    getNearIndustryData(){
      var params = {
        page: this.nearNum,
        pageSize: 6
      }
      api.getNearIndustryData(params)
        .then(res => {
          this.nearListData = res.data
          this.nearTotal = res.totalRecord
        })
    },
    // 点击附近疑似僵尸企业-换一批
    changeList(){
      if(this.nearNum === this.nearTotal) {
        this.nearNum = 1;
        this.getNearIndustryData()
      }else {
        this.nearNum++;
        this.getNearIndustryData()
      }

    },
    // 获取最新疑似僵尸企业数据
    getNewIndustryData1(){
      var params = {
        page: this.newNum,
        pageSize: 6
      }
      api.getNewIndustryData1(params)
        .then(res => {
          this.newListData = res.data
          this.newTotal = res.totalRecord
        })
    },
    // 点击最新疑似僵尸企业-换一批
    changeList1(){
      if(this.newNum === this.newTotal) {
        this.newNum = 1;
        this.getNewIndustryData1()
      }else {
        this.newNum++;
        this.getNewIndustryData1()
      }

    }
  },
  components: {
    searchBox,
    pagination
  }
}
</script>

<style lang="scss" scoped>
.list {
  width: 100%;
  min-height: 100%;
  background: url(../../assets/img/bg.jpg);
  background-size: 100% 100%;
}
.list-wrapper {
  width: 1200px;
  margin: 0 auto;

}
.has-choose {
  display: none;
}
.has-choose.active {
  display: block;
}
.left-list-container {
  width: 920px;
  .condition-wrapper{
    padding: 35px 50px 20px 50px;
    background: url(../../../static/img/list-bg1.png) no-repeat;
    background-size: 100% 100%;
    .condition-li {
      height: 40px;
      font-size: 14px;
      overflow: hidden;
      transition: height 0.3s;
      .l-title {
        float: left;
        width: 95px;
        line-height: 40px;
        color: #f6b228;
      }
      .search-con {
        float: left;
        width: 670px;
        color: #7ecdff;
        line-height: 40px;
        li {
          float: left;
          margin-right: 40px;
          cursor: pointer;
          color: #7ecdff;
        }
        li:hover {
          color: #52b4ff;
        }
      }
      .more-btn {
        position: relative;
        float: right;
        width: 52px;
        height: 40px;
        color: #1d97ff;
        line-height: 39px;
        cursor: pointer;
        z-index: 10;
        i {
          position: absolute;
          top: 1px;
          right: 0;
          padding: 0 5px;
          font-size: 14px;
          z-index: 0;
        }
      }
      .more-btn:hover {
        color: #52b4ff;
       }
    }
    .condition-li.active {
      height: auto;
      transition: height 0.3s;
    }
    .has-choose {
      height:40px;
      line-height: 40px;
      .l-title{
        float: left;
        width: 95px;
        color: #f6b228;
      }

    }
  }
}

.list-list {
  margin: 30px 0;
}
.list-top {
  width: 100%;
  height: 36px;
  line-height: 36px;
  background: url(../../../static/img/table-header-bg.png) no-repeat;
  font-size: 16px;
  color: #7ecdff;
  text-align:center;

}
.industry-col {
  width: 490px;
}
.status-col {
  width: 150px;
}
.zombieprobably-col {
  width: 160px;
}
.favorite-col {
  width: 120px;
}
.list-content {
  width: 100%;
  margin-top: 8px;
  padding: 20px 0 40px 0;
  background: url(../../../static/img/list-bg2.png) no-repeat;
  background-size: 100% 100%;
}
.list-bottom {

  li {
    padding: 25px 0;
    border-bottom: 2px solid #283b76;
  }
  li:hover {
    background: #172e7b;
  }
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
    cursor: pointer;
    width:304px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
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
  display: block;
  width: 52px;
  height: 23px;
  margin: 55px auto 0 auto;
  line-height: 23px;
  border: 1px solid #0644b6;
  border-radius: 5px;
  background: rgba(14,59,175,.51);
  color: #a2cfe8;
  font-size: 12px;
  text-align: center;
}
.zombieprobably-con {
  display: block;
  width: 60px;
  height: 24px;
  line-height: 24px;
  margin: 55px auto 0;
  text-align: center;
  i {
    float: left;
  }
}
.orange {
  color: #e8672f;
  font-size: 13px;
  background-image: -webkit-gradient(linear, 0 0, 0 bottom, from(rgba(255,137,32,1)), to(rgba(255,86,47,1)));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  i {
    font-size: 16px;
  }
}
.blue {
  color: #3b83e1;
  font-size: 14px;
  background-image: -webkit-gradient(linear, 0 0, 0 bottom, from(rgba(107,173,255,1)), to(rgba(33,128,255, 1)));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  i {
    margin-top: -2px;
    font-size: 18px;
  }
}
.yellow {
  color: #edc53b;
  font-size: 14px;
  background-image: -webkit-gradient(linear, 0 0, 0 bottom, from(rgba(255,229,66,1)), to(rgba(252,196,56, 1)));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  i {
    margin-top: -2px;
    font-size: 18px;
  }
}
.favorite {
  display: block;
  width: 18px;
  margin: 57px auto 0 auto;
  color: #d66973;
  cursor: pointer;
  i {
    font-size: 20px;
  }
}
.right-list-container {
  width: 260px;

}
.near-zombie-companies {
  padding: 20px;
  margin-bottom: 20px;
  background: url(../../../static/img/list-bg3.png) no-repeat;
  background-size: 100% 100%;
  h1{
    line-height: 34px;
    font-size: 14px;
    color: #fff;
    border-bottom: 2px solid #253665;
    span {
      color: #f6b228;
      cursor: pointer;
    }
    span:hover {
      text-decoration: underline;
    }
}
.zombie-companies-list {
  padding: 10px 0;
  li {
    float: left;
    margin: 22px 25px 0 25px;
    .img-box {
      display: block;
      width: 58px;
      height: 58px;
      border: 1px solid #1b357b;
      opacity:0.8;
    }
    p{
      width: 60px;
      padding-top: 12px;
      font-size: 12px;
      color: #b3bdd9;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
      cursor: pointer;
    }
  }
  li:hover {
    .img-box {
      opacity: 1;
    }
    p {
      color: #fff;
    }
  }
}
}
.pagination {
  height: 40px;
}
</style>
<style lang="scss">
  .has-choose-con {
    float: left;
    margin-top: 5px;
    li{
      float: left;
      height: 28px;
      line-height: 28px;
      padding: 0 12px;
      border: 1px solid #024bd0;
      background: #0e2054;
      border-radius: 50px;
      color: #7ecdff;
      font-size: 14px;
      cursor: pointer;
      i{
        margin-left: 10px;
        font-size: 14px;
      }
    }
    li:hover {
      border: 1px solid #0249ce;
      background: #0b266a;
    }
  }
</style>

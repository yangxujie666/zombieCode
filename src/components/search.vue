<template>
    <div class="search-wrapper clearfix">
        <div class="search-box fl clearfix" v-if="showInput">
            <p class="search-title fl"><i></i>僵尸企业雷达</p>
            <div class="search-block fl">
                <input v-model="valueInput">
                <span @click="scanBtn" >扫描</span>
            </div>
        </div>
        <a class="back-index fr" @click="goBack">返回首页</a>
    </div>
</template>

<script type="text/javascript">
    export default {
      name:'search',
      data(){
        return {
          valueInput:''
        }
      },
      props:['showInput'],
      mounted(){
        this.enterClick()
      },
      methods:{
        scanBtn(){
          this.$emit('inputValue',this.valueInput)
        },
       goBack(){
          this.$router.push('/')
       },
        enterClick () {
          var _this = this;
          document.body.addEventListener('keyup',function () {
            if ( event.keyCode === 13) {
              _this.scanBtn();
            }
          },false)
        },
      }
    }
</script>

<style lang="scss">
.search-wrapper {
    padding: 20px 0;
}
.search-box {
    height: 32px;
    line-height: 32px;
    .search-title {
        color: #0a9aff;
        font-size: 18px;
        font-weight: bold;
        background-image: -webkit-gradient(linear, 0 0, right 0, from(rgba(7,181,254,1)), to(rgba(12,136,255, 1)));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        i {
            float: left;
            width: 30px;
            height: 34px;
            margin-top: -8px;
            background: url(../../static/img/titie-icon.png) no-repeat;
        }
    }
    .search-block {
        width: 338px;
        margin-left: 20px;
        input {
            width: 218px;
            height: 32px;
            padding: 0 20px;
            color: #fff;
            background: url(../../static/img/input-bg.png) no-repeat;
        }
        input:focus{
            box-shadow: 0 0 20px 0  rgba(0,30,255,.4);
         }
        span {
            display: inline-block;
            width: 75px;
            height: 32px;
            background: url(../../static/img/search-btn.png) no-repeat;
            box-shadow: -10px 0 10px 0 rgba(255,162,0,.33);
            text-align: center;
            font-weight: bold;
            cursor: pointer;
        }
    }
}
.back-index {
    color: #c3ced4;
    line-height: 32px;
    cursor: pointer;
}
.back-index:hover {
    color: #fff;
}
</style>

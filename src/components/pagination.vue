<template>
    <div class="pagination-wrap clearfix">
        <el-pagination
                :page-size="pageSize"
                :layout="layout"
                :total="total"
                :page-count="pageCount"
                :current-page="currentPage"
                @current-change="handleCurrentChange"
                @size-change="handleSizeChange">
        </el-pagination>


    </div>
</template>

<script>
  export default {
    computed: {

    },
    data () {
      return {

      }
    },
    props: ['pageSize','total','layout','pageCount','currentPage'],
    mounted() {
      console.log(this.pageSize,this.total,this.pageSize,this.pageCount)
    },
    methods: {
      handleCurrentChange(val){
        this.$emit('pageChange', val)
      },
      handleSizeChange(val){
        console.log(`每页${val}条`)
      }
    }

  }

</script>

<style lang="scss">
.pagination-wrap {
    margin: 20px 0;
    padding: 0 40px 0 30px;
}
.el-pager  {
    float: right;
    overflow: hidden;
    li{
        float: left;
        width: 38px;
        height: 38px;
        margin-right: 6px;
        line-height: 38px;
        border: 1px solid #0644b6;
        border-radius: 5px;
        background: rgba(14,59,175,0.1);
        font-size: 12px;
        color: #59abdf;
        text-align: center;
        cursor: pointer;
    }
    li:hover,li.active {
        border: 1px solid #003fb9;
        background: rgba(7,54,178,.5);
        color: #4a96ce;
    }
}
.el-pager li:last-child {
    border-right: 1px solid #0644b6;
}
.el-pager li.active+li {
    border-left: 1px solid #0644b6;
}
.el-pagination button, .el-pagination span {
    height: 38px;
    line-height: 38px;
    color: #55a3d8;
}
.el-pagination button.disabled {
    width: 38px;
    height: 38px;
    line-height: 38px;
    border: 1px solid #0644b6;
    border-radius: 5px;
    background: rgba(14,59,175,0.1);
    i {
        display: block;
        font-size: 14px;
        color: #55a3d8;
    }
}
.el-pagination .btn-next,
.el-pagination .btn-prev {
    float: right;
    width: 38px;
    height: 38px;
    margin-left: 10px;
    line-height: 38px;
    border: 1px solid #0644b6;
    border-radius: 5px;
    background: rgba(14,59,175,0.1);
    i {
        display: block;
        font-size: 14px;
        color: #55a3d8;
    }
}
.el-pagination__total {
    float: right;
    display: inline-block;
    height: 38px;
    line-height: 38px;
    font-size: 12px;
    color: #4382b7;
}
.el-pager li.btn-quicknext,
.el-pager li.btn-quickprev{
    line-height: 38px;
}
.el-pagination__editor {
    width: 38px;
    height: 38px;
    line-height: 38px;
    border: 1px solid #0644b6;
    border-radius: 5px;
    background: rgba(14,59,175,0.1);
    font-size: 12px;
    color: #4382b7;
}
.el-pagination__jump {
    float: right;
    margin-top: -1px;
}
.el-pager li:hover {
    border: 1px solid #003fb9;
    background: rgba(7,54,178,.5);
    color: #4a96ce;
}
</style>

<template>
  <div class="relative">
    <!--中间部分-->
    <div class="tab">
      <!--查询部分-->
      <div class="order-query-allover clearfix">
        <span>订单查询：</span>
        <el-select v-model="value" class="order-query-select" placeholder="请选择查询方式">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-input
          class="order-query-input"
          placeholder="请输入内容"
          v-model="input10"
          clearable>
        </el-input>
        <el-button type="primary" class="order-query-ico" icon="el-icon-search" @click="queryCommented">查询</el-button>
        <el-button type="primary" class="comment-query-return" @click="queryReturn">取消查询</el-button>
      </div>
      <!--表单部分-->
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="id"
          label="订单编号"
          width="100">
        </el-table-column>
        <el-table-column
          prop="tel"
          label="用户电话"
          width="110">
        </el-table-column>
        <el-table-column
          prop="mealName"
          label="套餐名"
          width="270"
          :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column
          prop="place"
          label="拍摄地点"
          width="100">
        </el-table-column>
        <el-table-column
          prop="date"
          label="拍摄日期"
          width="100">
        </el-table-column>
        <el-table-column
          prop="orderDate"
          label="下单日期"
          width="100">
        </el-table-column>
        <el-table-column
          prop="orderState"
          label="订单状态"
          width="90">
        </el-table-column>
        <el-table-column
          prop="price"
          label="单价"
          width="90">
        </el-table-column>
        <el-table-column
          prop="orderPrice"
          label="定金"
          width="90">
        </el-table-column>
        <el-table-column
          prop="endPrice"
          label="尾款">
        </el-table-column>
      </el-table>
    </div>
    <!--分页部分-->
    <div class="footer" v-if="showFooter">
      <el-pagination
        background
        @current-change="getOrderCommentedData"
        :current-page.sync="currentPage1"
        :page-size="9"
        layout="prev, pager, next"
        :total="totalPage">
      </el-pagination>
    </div>
  </div>
</template>

<script>
    export default {
        name: 'OrderCommented',
        data:function () {
        return{
          showFooter:true,
          currentPage1:1,
          totalPage:0,
          tableData: [],
          options: [
            {
              value: '用户电话',
              label: '用户电话'
            },
            {
              value: '订单编号',
              label: '订单编号'
            },
            {
              value: '下单时间',
              label: '下单时间'
            },
            {
              value: '拍摄地点',
              label: '拍摄地点'
            }
          ],
          value: '',
          input10: '',
        }
      },
        created(){
          this.$axios({
            method:'get',
            url:'/api/getOrderCommentedData',
            params:{
              page:1
            }
          }).then((res)=>{
            for(let i=0;i<res.data.data.length;i++) {
              var orderDate=res.data.data[i].o_orderDate.toString().slice(0,-14);
                 var startDate=res.data.data[i].o_startDate.toString().slice(0,-14);
              this.tableData.push(
                {
                  id: res.data.data[i].o_id,
                  tel: res.data.data[i].o_phone,
                  mealName: res.data.data[i].m_title,
                  place: res.data.data[i].m_place,
                  date: startDate,
                  orderDate: orderDate,
                  orderState: res.data.data[i].os_name,
                  price: res.data.data[i].m_nowPrice,
                  orderPrice: res.data.data[i].m_subscription,
                  endPrice: ''

                }
              )
            }
          }).then(()=>{
              this.$axios({
                  method:'get',
                  url:'/api/getCommentedPage'
              }).then((res)=>{
              this.totalPage=res.data.data[0].num;
            })
          })
        },
        methods:{
          add(res){
              this.tableData=[];
            for(let i=0;i<res.data.data.length;i++) {
              var orderDate=res.data.data[i].o_orderDate.toString().slice(0,-14);
                 var startDate=res.data.data[i].o_startDate.toString().slice(0,-14);
              this.tableData.push(
                {
                  id: res.data.data[i].o_id,
                  tel: res.data.data[i].o_phone,
                  mealName: res.data.data[i].m_title,
                  place: res.data.data[i].m_place,
                  date: startDate,
                  orderDate: orderDate,
                  orderState: res.data.data[i].os_name,
                  price: res.data.data[i].m_nowPrice,
                  orderPrice: res.data.data[i].m_subscription,
                  endPrice: ''
                }
              )
            }
          },
          queryCommented(){
            if(this.value=='用户电话'){
              this.$axios ({
                method:'get',
                url:'/api/queryCommentedByTel',
                params:{
                  msg:this.input10,
                }
              }).then((res)=>{
                this.showFooter=false;
                this.add(res);
              })}else if(this.value=='订单编号'){
              this.$axios({
                method:'get',
                url:'/api/queryCommentedById',
                params:{
                  msg:this.input10
                }
              }).then((res)=>{
                this.add(res);
                this.showFooter=false;
              })
            }else if(this.value=='下单时间') {
              this.$axios({
                method: 'get',
                url: '/api/queryCommentedByOrderDate',
                params: {
                  msg: this.input10
                }
              }).then((res) => {
                this.add(res);
                this.showFooter = false;
              })
            }else if(this.value=='拍摄地点') {
              this.$axios({
                method: 'get',
                url: '/api/queryCommentedByPlace',
                params: {
                  msg: this.input10
                }
              }).then((res) => {
                this.add(res);
                this.showFooter = false;
              })
            }else{

            }
          },
          queryReturn(){
            this.$axios({
              method:'get',
              url:'/api/getOrderCommentedData',
              params:{
                page:1
              }
            }).then((res)=>{
              this.showFooter=true,
                this.input10='';
              this.add(res);
            })
          },
          getOrderCommentedData(){
              this.$axios({
                  method:'get',
                  url:'/api/getOrderCommentedData',
                  params:{
                      page:this.currentPage1
                  }
              }).then((res)=>{
                this.add(res);
              })
          },
        },

    }
</script>

<style scoped lang="less">
  .order-query-allover span{
    line-height: 60px;
    float: left;
    margin-left: 40px;
  }
  .order-query-select{
    width: 150px;
    float: left;
    height: 38px;
    margin-top: 10px;
  }
  .order-query-ico{
    float: left;
    height: 38px;
    margin-top: 11px;
    border:1px solid #ccc;
  }
  .order-query-allover{
    width: 1160px;
    border-bottom:1px solid #5b5b5b;
    height: 60px;
  }
  .order-query-input{
    display: inline-block;
    width: 300px;
    float: left;
    margin-top: 10px;
  }
  .comment-query-return{
    float: right;
    margin-top: 11px;
    margin-right: 20px;
  }
  .footer{
    margin-top: 16px;
    position: absolute;
    left:800px;
    top:530px;
  }
  .relative{
    position: relative;
    left:0;
    top:0;
  }
</style>

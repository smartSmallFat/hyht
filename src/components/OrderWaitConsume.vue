<template>
  <div class="relative">
    <div class="tab">
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
        <el-button type="primary" class="order-query-ico" icon="el-icon-search" @click="queryConsume">查询</el-button>
        <el-button type="primary" class="comment-query-return" @click="queryReturn">取消查询</el-button>
      </div>
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
          width="230"
          :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column
          prop="place"
          label="拍摄地点"
          width="90">
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
        label="尾款"
        width="90">
      </el-table-column>
      <el-table-column
          prop="delete"
          label="删除"
          width="68">
          <template slot-scope="scope">
            <el-button class="order-delete" @click="clickDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="footer" v-if="showFooter">
      <el-pagination
        background
        @current-change="getOrderConsumeData"
        :current-page.sync="currentPage1"
        :page-size="9"
        layout="prev, pager, next"
        :total="totalPage">
      </el-pagination>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%">
      <span>你确定删除吗？</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="deleteRow">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
    export default {
        name: 'OrderWaitConsume',
        data:function () {
        return{
          showFooter:true,
          dialogVisible: false,
          currentPage1:1,
          totalPage:0,
          deleteId:0,//记录每一条的信息，便于取id
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
          url:'/api/getOrderConsumeData',
          params:{
            page:1
          }
        }).then((res)=>{
          for(let i=0;i<res.data.data.length;i++){
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
            url:'/api/getConsumePage'
          }).then((res)=>{
            this.totalPage=res.data.data[0].num;
          })
        })
      },
      methods: {
        queryConsume(){
          if(this.value=='用户电话'){
            this.$axios ({
              method:'get',
              url:'/api/queryConsumeByTel',
              params:{
                msg:this.input10,
              }
            }).then((res)=>{
              this.showFooter=false;
              this.add(res);
            })}else if(this.value=='订单编号'){
            this.$axios({
              method:'get',
              url:'/api/queryConsumeById',
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
              url: '/api/queryConsumeByOrderDate',
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
              url: '/api/queryConsumeByPlace',
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
            url:'/api/getDataAll',
            params:{
              page:1
            }
          }).then((res)=>{
            this.showFooter=true,
              this.input10='';
            this.add(res);
          })
        },
        add(res){
          this.tableData = [];
          for (let i = 0; i < res.data.data.length; i++) {
            var orderDate = res.data.data[i].o_orderDate.toString().slice(0, -14);
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
        getOrderConsumeData(){
          this.$axios({
            method: 'get',
            url: '/api/getOrderConsumeData',
            params: {
              page: this.currentPage1,
            }
          }).then((res) => {
            this.add(res)
          })
        },
        //点击表格里的删除
        clickDelete(index, row){
            this.deleteId=row.id;
            this.dialogVisible = true;
        },
        //获取总数据条数
        getPage(){
          this.$axios({
            method:'get',
            url:'/api/getConsumePage'
          }).then((res)=>{
            this.totalPage=res.data.data[0].num;
          })
        },
        //点击确定
        deleteRow(){
            this.$axios({
                method:'get',
                url:'/api/deleteOrderConsume',
                params:{
                     oid: this.deleteId
                }
            }).then(()=>{
              this.dialogVisible = false;

              if(this.tableData.length<=0){
                  this.currentPage1-1;
              }
              this.$axios({
                method: 'get',
                url: '/api/getOrderConsumeData',
                params: {
                  page: this.currentPage1,
                }
              }).then((res) => {
                this.add(res);
                this.getPage();
              })
            })
        }
      }

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
  .order-delete{
    margin: 0;
    padding: 0;
    border: none;
  }
</style>

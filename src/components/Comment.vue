<template>
  <div id="model-box">
    <div class="comment-header">客户评论</div>
    <div class="comment-query-allover clearfix">
      <span>评论查询：</span>
      <el-select v-model="value" class="comment-query-select" placeholder="请选择查询方式">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-input
        class="comment-query-input"
        placeholder="请输入内容"
        v-model="input10"
        clearable>
      </el-input>
      <el-button type="primary" class="comment-query-ico" icon="el-icon-search" @click="queryComment">查询</el-button>
      <el-button type="primary" class="comment-query-return" @click="queryReturn">取消查询</el-button>
    </div>
    <div class="tab">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          prop="id"
          label="评论编号"
          width="100">
        </el-table-column>
        <el-table-column
          prop="tel"
          label="用户电话"
          width="110">
        </el-table-column>
        <el-table-column
          prop="mealType"
          label="套餐类型"
          width="100">
        </el-table-column>
        <el-table-column
          prop="place"
          label="拍摄地"
          width="100">
        </el-table-column>
        <el-table-column
          prop="date"
          label="评论日期"
          width="120">
        </el-table-column>
        <el-table-column
          prop="mealName"
          label="套餐名"
          width="270">
        </el-table-column>
        <el-table-column
          prop="content"
          label="评论内容"
          width="270"
          :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column
          prop="show"
          label="图片">
          <template slot-scope="scope">
            <el-button class="look" @click="showImg(scope.$index, scope.row)">查看图片</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="footer" v-if="showFooter">
      <el-pagination
        background
        @current-change="getCurrentData"
        :current-page.sync="currentPage1"
        layout="prev, pager, next"
        :page-size="9"
        :total="total">
      </el-pagination>
    </div>
    <el-dialog :visible.sync="dialogVisible">
      <div class="msgBox">
        <img :src="img" alt="">
        <img :src="img2" alt="">
        <img :src="img3" alt="">
      </div>
    </el-dialog>
  </div>

</template>

<script>
    export default{
        name: 'Comment',
        data:function () {
        return{
          dialogVisible: false,
          showFooter:true,//尾部的分页是否出现
          options: [
            {
              value: '用户电话',
              label: '用户电话'
            },
            {
              value: '评论时间',
              label: '评论时间'
            },
            {
              value: '套餐名',
              label: '套餐名'
            },
            {
              value: '拍摄地',
              label: '拍摄地'
            },
            {
              value: '套餐类型',
              label: '套餐类型'
            },
          ],//查询方式下拉
          value: '',//下拉列表中的数据
          input10: '',//输入框中的值
          total:0,//数据的总条数
          currentPage1: 1,//当前的页码
          tableData: [],//表格中的数据
          img:'',
          img2:'',
          img3:'',
        }
      },
      //页面创建后获取第一页评论的数据
      //然后获取数据总条数
        created(){
          this.$axios({
              method:'get',
              url:'/api/htCommentGetData',
              params:{
                  page:1
              }
          }).then((res)=>{
              for(let i=0;i<res.data.data.length;i++){
                this.tableData.push({
                  id: res.data.data[i].cm_id,
                  tel: res.data.data[i].o_phone,
                  mealType:res.data.data[i].c_name ,
                  mealName: res.data.data[i].m_title,
                  place: res.data.data[i].m_place,
                  date: res.data.data[i].cm_date,
                  content: res.data.data[i].cm_content,
                  show:[res.data.data[i].cm_img1,res.data.data[i].cm_img2,res.data.data[i].cm_img3]
                })
              }
          }).then(()=>{
            this.$axios({
              method:'get',
              url:'/api/htCommentGetPage'
            }).then((res)=>{
              this.total=res.data.data[0].num;
            })
          })
        },
        methods:{
        //每次点击按钮刷新页面的函数
        add(res){
          this.tableData=[];
          for(let i=0;i<res.data.data.length;i++){
            this.tableData.push({
              id: res.data.data[i].cm_id,
              tel: res.data.data[i].o_phone,
              mealType:res.data.data[i].c_name ,
              mealName: res.data.data[i].m_title,
              place: res.data.data[i].m_place,
              date: res.data.data[i].cm_date,
              content: res.data.data[i].cm_content,
              show:[res.data.data[i].cm_img1,res.data.data[i].cm_img2,res.data.data[i].cm_img3]
            })
          }
        },
        //点击哪个页码获取第几页数据
        getCurrentData(){
          this.$axios({
              method:'get',
              url:'/api/htCommentGetData',
              params:{
                  page:this.currentPage1
              }
          }).then((res)=>{
              this.add(res);
          })
        },
        //查询
        queryComment(){
            if(this.value=='用户电话'){
              this.$axios ({
                method:'get',
                url:'/api/queryCommentByTel1',
                params:{
                  msg:this.input10,
                }
              }).then((res)=>{
                this.showFooter=false;
                this.add(res);
              })
            }else if(this.value=='套餐名'){
                this.$axios({
                    method:'get',
                    url:'/api/queryCommentByMealName',
                    params:{
                        msg:this.input10
                    }
                }).then((res)=>{
                    this.add(res);
                    this.showFooter=false;
                })
            }else if(this.value=='评论时间') {
              this.$axios({
                method: 'get',
                url: '/api/queryCommentByCommentDate',
                params: {
                  msg:this.input10
                }
              }).then((res) => {
                this.add(res);
                this.showFooter = false;
              })
            }else if(this.value=='拍摄地') {
              this.$axios({
                method: 'get',
                url: '/api/queryCommentByPlace1',
                params: {
                  msg:this.input10
                }
              }).then((res) => {
                this.add(res);
                this.showFooter = false;
              })
            }else if(this.value=='套餐类型'){
              this.$axios({
                method: 'get',
                url: '/api/queryCommentByType',
                params: {
                  msg:this.input10
                }
              }).then((res) => {
                this.add(res);
                this.showFooter = false;
              })
            }else{

            }
            this.input10='';
        },
        //点击返回
        queryReturn(){
          this.showFooter=true;
          this.input10='';
          this.$axios({
            method:'get',
            url:'/api/htCommentGetData',
            params:{
              page:1
            }
          }).then((res)=>{
            this.add(res);
          })
        },
        showImg(index,row){
          this.dialogVisible = true;
          this.img='http://localhost:8084/image/comment_img/'+row.show[0];
          this.img2='http://localhost:8084/image/comment_img/'+row.show[1];
          this.img3='http://localhost:8084/image/comment_img/'+row.show[2];
        }

      }
    }
</script>

<style scoped lang="less">
  .msgBox{
    height: 402px;
    border: 1px solid #ccc;
    width: 728px;
  }
  .msgBox img{
    width: 300px;
  }
  .look{
    border: none;
    padding:0;
    margin: 0;
  }
  #model-box{
    width: 1180px;
    height: 656px;
    margin-top: 8px;
    margin-left: 10px;
    position:absolute;
    left: 300px;
    top:62px;
    background: #f3f3f3;
    border-bottom:1px solid #5b5b5b;
  }
  .comment-header{
  width: 1160px;
  height: 48px;
  border-bottom:1px solid #5b5b5b;
  text-align: center;
  line-height: 48px;
    font-size: 24px;
  }
  .comment-query-allover{
    width: 1160px;
    border-bottom:1px solid #5b5b5b;
    height: 60px;
  }
  .comment-query-allover span{
      line-height: 60px;
      float: left;
      margin-left: 40px;
    }
  .clearfix:after{
    content: '';
    clear: both;
    display: block;
  }
  .comment-query-select{
    width: 150px;
    float: left;
    height: 38px;
    margin-top: 10px;
  }
  .comment-query-ico{
    float: left;
    height: 38px;
    margin-top: 11px;
    border:1px solid #ccc;
  }
  .tab{
    width: 1160px;
    height: 482px;
    margin: 0 auto;
    overflow: auto;
  }
  .footer{
    margin-top: 16px;
    padding-left: 700px;
  }
  .comment-query-input{
    display: inline-block;
    width: 300px;
    float: left;
    margin-top: 10px;
  }
  .comment-query-return{
    float: right;
    margin-top: 11px;
  }

</style>

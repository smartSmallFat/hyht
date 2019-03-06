<template>
    <div>
      <div id="model-box">
        <!--第一排-->
        <div class="C-div1">
          <p>客户管理</p>
          <hr style="margin-top: 40px;width: 1177px">

        </div>
        <!--查询部分-->
        <div class="C-look">
          <div class="look-div1">
            按姓名查找:<input type="text" v-model="Ip1">
            <el-button  @click="Show1" type="primary" size="small" icon="el-icon-search" class="lk1">搜索</el-button>
          </div>
          <div class="look-div2">
            按手机号查找:<input type="text " v-model="Ip2">
            <el-button @click="Show2" type="primary" size="small" icon="el-icon-search" class="lk2">搜索</el-button>
          </div>
          <el-button  @click="cancleQuery" type="primary" size="small" icon="el-icon-search" class="lk3">取消查询</el-button>
        </div>

      </div>

      <el-table
        :data="tableData"
        style="width:1180px;height:535px; position: absolute;margin-left: 294px;margin-top:-500px">

        <el-table-column
          prop="name"
          label="姓名"
          width="200">
        </el-table-column>
        <el-table-column
          prop="date"
          label="性别"
        width="200">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="手机号"
        width="200">
        </el-table-column>
        <el-table-column
          prop="provens"
          label="省份"
          width="200">
        </el-table-column>
        <el-table-column
          prop="city"
          label="市区"
          width="200">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址">
        </el-table-column>

      </el-table>
      <!--分页-->
      <div class="block" v-if="F1">

        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage3"
          :page-size="8"
          layout="prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>

    </div>
</template>

<script>

    export default {
      name:'Customer',
      data:function() {
        return {
          // 分页
          total:0,
          currentPage3: 1,
          tableData: [],
          Ip1:'',
          Ip2:'',
          F1:true
        }
      },
      created(){
        this.$axios({
          method:'get',
          url:'/api/getUserData2',
          params:{
            page:1
          }
        }).then((res)=>{
          for(let i=0;i<res.data.data.length;i++){
            this.tableData.push({
              operation:'',
              city:res.data.data[i].u_city,
              provens:res.data.data[i].u_province,
              phone:res.data.data[i].u_phone,
              date: res.data.data[i].u_sex,
              name: res.data.data[i].u_username,
              address: res.data.data[i].u_userSpeak
            })
          }
        }).then(()=>{
          this.$axios({
            method:'get',
            url:'/api/getUserCount'
          }).then((res)=>{
            this.total=res.data.data[0].num
          })
        })

      },
      methods:{
        Show1(){
          this.$axios({
            method:'get',
            url:'/api/queryCustomer',
            params:{
              name:this.Ip1
            }

          }).then((res)=>{
            console.log(res.data.data);
            this.tableData=[];
            this.F1=false;
            for (let i=0;i<res.data.data.length;i++){
              this.tableData.push({
                operation:'',
                city:res.data.data[i].u_city,
                provens:res.data.data[i].u_province,
                phone:res.data.data[i].u_phone,
                date: res.data.data[i].u_sex,
                name: res.data.data[i].u_username,
                address: res.data.data[i].u_userSpeak
              })
            }
          })
        },
        Show2(){
          this.$axios({
            method:'get',
            url:'/api/queryCustomer1',
            params:{
              phone:this.Ip2
            }
          }).then((res)=>{
            console.log(res.data.data);
            this.tableData=[];
            this.F1=false;
            for (let i=0;i<res.data.data.length;i++){
              this.tableData.push({
                operation:'',
                city:res.data.data[i].u_city,
                provens:res.data.data[i].u_province,
                phone:res.data.data[i].u_phone,
                date: res.data.data[i].u_sex,
                name: res.data.data[i].u_username,
                address: res.data.data[i].u_userSpeak
              })
            }
          })
        },
        cancleQuery(){
          this.F1=true;
          this.$axios({
            method:'get',
            url:'/api/getUserData2',
            params:{
              page:1
            }
          }).then((res)=>{
            this.tableData=[];
            for(let i=0;i<res.data.data.length;i++){
              this.tableData.push({
                operation:'',
                city:res.data.data[i].u_city,
                provens:res.data.data[i].u_province,
                phone:res.data.data[i].u_phone,
                date: res.data.data[i].u_sex,
                name: res.data.data[i].u_username,
                address: res.data.data[i].u_userSpeak
              })
            }
          })

        },
        handleCurrentChange(){
          this.$axios({
            method:'get',
            url:'/api/getUserData2',
            params:{
              page:this.currentPage3
            }
          }).then((res)=>{
            console.log(res.data.data);
            this.tableData=[];
            for(let i=0;i<res.data.data.length;i++){
              this.tableData.push({
                operation:'',
                city:res.data.data[i].u_city,
                provens:res.data.data[i].u_province,
                phone:res.data.data[i].u_phone,
                date: res.data.data[i].u_sex,
                name: res.data.data[i].u_username,
                address: res.data.data[i].u_userSpeak
              })
            }
          })
        }
      }

    }
</script>

<style scoped lang="less">

  #model-box{
    /*width: 1160px;*/
    /*height: 600px;*/
    /*margin-top: 5px;*/
    /*position:absolute;*/
    /*left: 300px;*/
    /*top:62px;*/
    /*background: white;*/
    /*border-bottom:1px solid #5b5b5b;*/
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
  .C-div1{
    width:100%;
    height: 42px;
    position: relative;
    p{
      margin-left: 500px;
      margin-top:-30px;
      position:absolute;
      font-size: 24px;
    }
  }
  .C-look{
    width: 800px;
    height: 50px;
    position: relative;
    margin-top:-15px;

    .look-div1{
      position:absolute;
    }
    .look-div2{
      position: absolute;
      margin-left: 400px;

    }
    .lk3{
      margin-left:980px;
    }
  }
.block{
  position: absolute;
  margin-left:1140px;
  margin-top:-50px;
}
</style>

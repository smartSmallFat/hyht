<template>
  <el-table
    :data="tableData3"
    style="width: 100%"
    height="250">
    <el-table-column
      fixed
      prop="date"
      label="日期"
      width="150">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="120">
    </el-table-column>
    <el-table-column
      prop="province"
      label="省份"
      width="120">
    </el-table-column>
    <el-table-column
      prop="city"
      label="市区"
      width="120">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址"
      width="300">
    </el-table-column>
    <el-table-column
      prop="zip"
      label="邮编"
      width="120">
    </el-table-column>
  </el-table>
</template>
<template>
  <div id="oth-box" >
    <div :class="{'shade':display}">
      <div id="oth-select">
        <p>查询套餐:</p><el-input  class="oth-ipt1"placeholder="按套餐名称查询" v-model="othNameInput"></el-input>
        <el-input  class="oth-ipt2" v-model="othAddInput" placeholder="按套餐拍摄地查询"></el-input><el-button type="primary" id="oth-pri" icon="el-icon-search" @click="othSelect">查询</el-button>
        <div> <el-button @click="showFrame=true,shade()" id="add btn" type="info" plain >+  新添套餐</el-button></div>
      </div>
      <div  id="oth-content">
        <el-table
          :data="tableData3" id="oth-table"
          style="width: 95%; margin-left: 30px;"
          height="418">
          <el-table-column
            prop="id"
            label="套餐编号"
            width="180">
          </el-table-column>
          <el-table-column
            prop="title"
            label="套餐标题"id="oth-title1"
            width="280"style="position:absolute;margin-right: 50px">
          </el-table-column>
          <el-table-column
            prop="meal_money"
            label="套餐售价">
          </el-table-column>
          <el-table-column
            prop="money"
            label="套餐定金">
          </el-table-column>
          <el-table-column
            prop="place"
            label="套餐拍摄地">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope" class="oth-la">
              <el-button class="oth-alter" size="mini" @click="showOthEdit">编辑</el-button>
              <el-button  @click="open2($event)" size="mini" type="danger">下架</el-button>
            </template>
          </el-table-column>
          <el-table-column label="新增套餐详情">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="add(scope.$index,scope.row)">新增详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div id="oth-pagination" v-if="pagination">
        <el-pagination
          background
          @current-change="getCurrentData"
          :current-page.sync="currentPage"
          layout="prev, pager, next"
          :page-size="7"
          :total="total">
        </el-pagination>
      </div>
      <!--//编辑的弹框-->
      <div   class="oth-frame" v-if="showFrameEdit">
        <div class="oth-frame-top">
          <p>编辑模块</p>
          <span @click.stop="showFrameEdit=false">×</span>
        </div>
        <div class="oth-frame-content">
          <div ><p>套餐编号:</p><el-input class="oth-frame-add" style="width: 70%" v-model="EditInputId" size="small" placeholder="请输入套餐编号" disabled="disabled"></el-input></div>
        </div>
        <div class="oth-frame-content">
          <div ><p>套餐标题:</p><el-input class="oth-frame-add" style="width: 70%" v-model="EditInputTitle" size="small" placeholder="请输入套餐标题"></el-input></div>
        </div>
        <div class="oth-frame-content1">
          <div ><p>套餐价格:</p><el-input class="oth-frame-add" style="width: 70%" v-model="EditInputMealPrice" size="small" placeholder="请输入套餐价格"></el-input></div>
        </div>
        <div class="oth-frame-content2">
          <div ><p>套餐定金:</p><el-input class="oth-frame-add" style="width: 70%" v-model="EditInputPrice" size="small" placeholder="请输入套餐定金"></el-input></div>
        </div>
        <div class="oth-frame-content3">
          <div ><p>套餐图片:</p><el-input class="oth-frame-add" style="width: 70%" v-model="EditInputPhoto" size="small" placeholder="请输入套餐图片"></el-input></div>
        </div>
        <div class="oth-frame-content4">
          <div ><p>套餐拍摄地:</p><el-input class="oth-frame-add" style="width: 70%"v-model="EditInputPlace"size="small" placeholder="请输入套餐拍摄地"></el-input></div>
        </div>
        <el-button type="success" size="mini" @click="showOthSave">提交</el-button>
      </div>
      <!--//新增详情的弹框-->
      <div id="oth-frame-addDetail">
        <div   class="oth-frame" v-if="showFrameAdd" >
          <div class="oth-frame-top">
            <p>新增套餐详情模块</p>
            <span @click.stop="showFrameAdd=false">×</span>
          </div>
          <div class="oth-frame-content">
            <div ><p>套餐简介1:</p><el-input class="oth-frame-add" style="width: 70%" v-model="intro1" size="small" placeholder="请输入套餐简介"></el-input></div>
          </div>
          <div class="oth-frame-content">
            <div ><p>套餐简介2:</p><el-input class="oth-frame-add" style="width: 70%" v-model="intro2" size="small" placeholder="请输入套餐简介"></el-input></div>
          </div>
          <div class="oth-frame-content1">
            <div ><p>套餐简介3:</p><el-input class="oth-frame-add" style="width: 70%" v-model="intro3" size="small" placeholder="请输入套餐简介"></el-input></div>
          </div>
          <div class="oth-frame-content6">
            <div ><p>景区简介:</p><el-input class="oth-frame-add" style="width: 70%" v-model="Scenic" size="small" placeholder="请输入景区介绍"></el-input></div>
          </div>
          <div >
            <div class="oth-frame-content3">
              <el-upload id="oth-frame-upload"
                         class="upload-demo"
                         ref="upload"
                         action="/api/OthUpload2"
                         :on-preview="handlePreview"
                         :on-remove="handleRemove"
                         :on-change="handleChange"
                         :file-list="fileList"
                         :auto-upload="false"
                         :multiple="true">
                <el-button slot="trigger" size="small" type="primary" >选取文件</el-button>
                <el-button style="margin-left: 10px;" type="warning" @click="submitUpload">上传到服务器</el-button>
              </el-upload>
            </div>
          </div>
          <p id="addDetail_p">注:只能上传4张图片</p>
          <el-button type="success" size="mini" id="oth-frame-success1" @click="othAddDetail($event)">提交</el-button>
        </div>

      </div>
      <div v-if="pagination">
        <div class="oth-previous">上一页</div>
        <div class="oth-next">下一页</div>
      </div>
    </div>
    <!--//新增套餐的弹框-->
    <div  :class="{'shadeAdd':shadeAdd}" id="oth-frame-add">
      <div class="oth-frame" v-if="showFrame">
        <div class="oth-frame-top">
          <p>新增模块</p>
          <span @click.stop="showFrame=false;shade_d()">×</span>
        </div>
        <div>
          <div id="othAddSelect1">
            <p id="othAddSelect1P">套餐拍摄地:</p>
            <div id="oth-input2" >
            <el-select  v-model="value1" placeholder="请选择" class="oth-input1-select" >
              <el-option id="t1"
                         v-for="item in options1"
                         :key="item.value1"
                         :label="item.label"
                         :value="item.value1"
                         :popper-append-to-body="false">
              </el-option>
            </el-select>
          </div>
          </div>
        </div>
        <div class="oth-frame-content">
          <div ><p>套餐标题:</p><el-input class="oth-frame-add" style="width: 70%" v-model="AddInputTitle" size="small" placeholder="请输入套餐标题"></el-input></div>
        </div>
        <div class="oth-frame-content1">
          <div ><p>套餐定金:</p><el-input class="oth-frame-add" style="width: 70%" v-model="AddInputPrice" size="small" placeholder="请输入套餐价格"></el-input></div>
        </div>
        <div class="oth-frame-content2">
          <div ><p>套餐售价:</p><el-input class="oth-frame-add" style="width: 70%" v-model="AddInputMealPrice" size="small" placeholder="请输入套餐定金"></el-input></div>
        </div>
        <div class="oth-frame-content">
          <div id="othAddSelect">
            <p>套餐类别号:</p>
            <div id="oth-input1" >
            <el-select  v-model="value2" placeholder="请选择" class="oth-input1-select">
              <el-option
                         v-for="item in options"
                         :key="item.value2"
                         :label="item.label"
                         :value="item.value2">
              </el-option>
            </el-select>
          </div>
          </div>
        </div>
        <div class="oth-frame-content5">
          <div ><p>套餐宣传语:</p><el-input class="oth-frame-add" style="width: 69%" v-model="AddInputWord" size="small" placeholder="请输入套餐宣传语"></el-input></div>
        </div>
        <div >
          <div class="oth-frame-content3">
            <el-upload id="oth-frame-upload"
                       class="upload-demo"
                       ref="upload"
                       action="/api/OthUpload2"
                       :on-preview="handlePreview"
                       :on-remove="handleRemove"
                       :on-change="handleChange"
                       :multiple="false"
                       :file-list="fileList"
                       :auto-upload="false">
              <el-button slot="trigger" size="small" type="primary" >选取文件</el-button>
              <el-button style="margin-left: 10px;" type="warning" @click="submitUpload">上传到服务器</el-button>
            </el-upload>
          </div>
        </div>
        <el-button type="success" size="mini" id="oth-frame-success1" @click="showOthAdd($event);">提交</el-button>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    name: 'OtherMeal',
    data() {
      return {
        intro1:'',
        intro2:'',
        intro3:'',
        Scenic:'',
        shadeAdd:false,
        display:false,
        fileList: [],
        fileList3: [],
        pagination:true,
        showFrameEdit:false,
        showFrame:false,
        showFrameAdd:false,
        input: '',
        tableData3: [],
        total:0,
        othNameInput:'',
        othAddInput:'',
        AddId:'',
        currentPage:1,
        EditInputId:'',
        EditInputTitle:'',
        EditInputMealPrice:'',
        EditInputPrice:'',
        EditInputPhoto:'',
        EditInputPlace:'',
        AddInputTitle:'',
        AddInputMealPrice:'',
        AddInputPrice:'',
        AddInputPhoto:'',
        AddInputPlace:'',
        AddInputWord:'',
        AddInputId:'',
        options: [{
          value2: '2',
          label: '2'
        }, {
          value2: '3',
          label: '3'
        }, {
          value2: '4',
          label: '4'
        }],
        value2: '',
        options1: [{
          value1: '成都',
          label: '成都'
        }, {
          value1: '大理',
          label: '大理'
        },{
          value1: '上海',
          label: '上海'
        },
          {
            value1: '丽江',
            label: '丽江'
          },
          {
            value1: '青岛',
            label: '青岛'
          },
          {
            value1: '北京',
            label: '北京'
          },
          {
            value1: '三亚',
            label: '三亚'
          },
          {
            value1: '厦门',
            label: '厦门'
          },
        ],
        value1: ''
      }
    },
    //获取数据
    created(){
//                console.log(this.fileList3)
      this.$axios.get('/api/otherMeal?page=1').then((res)=>{
        for(var  i=0;i<res.data.data.length;i++){
          this.tableData3.push({
            id:res.data.data[i].m_id,
            title:res.data.data[i].m_Title,
            meal_money:res.data.data[i].m_subscription,
            money: res.data.data[i].m_nowPrice,
            place: res.data.data[i].m_place,
          })
        }
      })
        .catch((err)=>{
          console.log(err)
        });
      this.$axios.get('/api/getCount').then((res)=>{
        console.log(res.data.count)
        this.total=res.data.count
      })
        .catch((err)=>{
          console.log(err)
        })

    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      },
      //得到某一页的数据
      getCurrentData(){
        this.$axios({
          method:'get',
          url:'/api/otherMeal',
          params:{
            page:this.currentPage
          }
        }).then((res)=>{
          this.tableData3=[];
          for(var  i=0;i<res.data.data.length;i++){
            this.tableData3.push({
              id:res.data.data[i].m_id,
              title:res.data.data[i].m_Title,
              meal_money:res.data.data[i].m_subscription,
              money: res.data.data[i].m_nowPrice,
              place: res.data.data[i].m_place,
            })
          }
        })
      },
      //下架该套餐
      open2(event) {
        var gid=event.currentTarget.parentElement.parentElement.parentElement.firstElementChild.firstElementChild.innerHTML
        this.$confirm('此操作将下架该套餐, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios({
            method:'get',
            url:'/api/othDelete',
            params:{
              gid:gid
            }
          }).then((res)=>{
            this.tableData3.splice(0,1);
            this.$axios.get('/api/getCount').then((res)=>{

              this.total=res.data.count

            })
              .catch((err)=>{
                console.log(err)
              });
          }).then(()=>{
            this.$axios({
              method:'get',
              url:'/api/otherMeal',
              params:{
                page:this.currentPage
              }
            }).then((res)=>{
              this.tableData3=[];
              for(var  i=0;i<res.data.data.length;i++){
                this.tableData3.push({
                  id:res.data.data[i].m_id,
                  title:res.data.data[i].m_Title,
                  meal_money:res.data.data[i].m_subscription,
                  money: res.data.data[i].m_nowPrice,
                  place: res.data.data[i].m_place,
                })
              }
            })
            this.$message({
              type: 'success',
              message: '套餐下架成功!',

            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消下架操作'
            });
          });
        })
      },
      //查询套餐
      othSelect(){
        this.$axios({
          method:'get',
          url:'/api/othSelect',
          params:{
            content:this.othNameInput,
            content1:this.othAddInput
          }
        }).then((res)=>{
          this.tableData3=[];
          this.pagination=false
          for(var  i=0;i<res.data.data.length;i++){
            this.tableData3.push({
              id:res.data.data[i].m_id,
              title:res.data.data[i].m_Title,
              meal_money:res.data.data[i].m_subscription,
              money: res.data.data[i].m_nowPrice,
              place: res.data.data[i].m_place,
            })
          }
        })
      },
      shade_d(){
        this.display=false;
      },
      shade(){
        this.display=true;
        this.shadeAdd=true
      },
      //修改套餐
      showOthEdit(){
        var gid=event.currentTarget.parentElement.parentElement.parentElement.firstElementChild.firstElementChild.innerHTML;
        this.showFrameEdit=true;
        this.$axios({
          method:'get',
          url:'/api/showOthEdit',
          params:{
            gid:gid
          }
        }).then((res)=>{
          this. EditInputId=res.data.data[0].m_id
          this.EditInputTitle=res.data.data[0].m_Title,
            this.EditInputMealPrice=res.data.data[0].m_subscription
          this.EditInputPrice=res.data.data[0].m_nowPrice,
            this.EditInputPhoto=res.data.data[0].m_imageUrl
          this.EditInputPlace=res.data.data[0].m_place
        })
      },
      //保存修改
      showOthSave(){
        this.showFrameEdit=false
        var gid=event.currentTarget.parentElement.parentElement.parentElement.firstElementChild.firstElementChild.innerHTML;
        this.$axios({
          method:'get',
          url:'/api/showOthSave',
          params:{
            gid:gid,
            EditInputId:this.EditInputId,
            EditInputTitle:this.EditInputTitle,
            EditInputMealPrice:this.EditInputMealPrice,
            EditInputPrice:this.EditInputPrice,
            EditInputPhoto:this.EditInputPhoto,
            EditInputPlace:this.EditInputPlace,
          }
        }).then((res)=>{
          this.$axios({
            method:'get',
            url:'/api/otherMeal',
            params:{
              page:this.currentPage
            }
          }).then((res)=>{
            this.tableData3=[];
            for(var  i=0;i<res.data.data.length;i++){
              this.tableData3.push({
                id:res.data.data[i].m_id,
                title:res.data.data[i].m_Title,
                meal_money:res.data.data[i].m_subscription,
                money: res.data.data[i].m_nowPrice,
                place: res.data.data[i].m_place,
              })
            };
            this.$message({
              type: 'success',
              message: '套餐修改成功!',
            });


          })
        })
      },
      //新增套餐
      showOthAdd(){
        this.display=false;
        this.showFrame=false;
        if(this.AddInputTitle=='' || this.AddInputMealPrice==''|| this.AddInputPrice==''||this.AddInputWord==''||this.fileList3==''){
          this.$message({
            type: 'info',
            message: '不能为空!'
          });
        }else{

          this.$axios({
            method:'get',
            url:'/api/showOthAdd',
            params:{
              AddInputTitle:this.AddInputTitle,
              AddInputMealPrice:this.AddInputMealPrice,
              AddInputPrice: this.AddInputPrice,
              AddInputPhoto:'./../OthUpload1/'+this.fileList3[0],
              AddInputPlace: this.value1,
              AddInputWord: this.AddInputWord,
              AddInputId:this.value2
            }
          }).then(()=>{
            this.AddInputTitle='',
              this.AddInputMealPrice='',
              this.AddInputPrice='',
              this.AddInputPlace='',
              this.AddInputWord='',
              this.AddInputId=''
            this.value1=''
            this.value2=''
            this.$message({
              type: 'success',
              message: '套餐添加成功!',
            });
            this.$axios({
              method:'get',
              url:'/api/otherMeal',
              params:{
                page:this.currentPage
              }
            }).then((res)=>{
              this.tableData3=[];
              for(var  i=0;i<res.data.data.length;i++){
                this.tableData3.push({
                  id:res.data.data[i].m_id,
                  title:res.data.data[i].m_Title,
                  meal_money:res.data.data[i].m_subscription,
                  money: res.data.data[i].m_nowPrice,
                  place: res.data.data[i].m_place,
                })
              }

            })
          }).catch(()=>{
            this.$message({
              type: 'info',
              message: '新增操作失败'
            });
          })
        }
      },
      //新增套餐详情
      othAddDetail(){
        this.showFrameAdd=false;
        if(this.intro1==''|| this.intro2==''||this.intro3==''||this.Scenic==''||this.fileList3==''){
          this.$message({
            type: 'info',
            message: '不能为空!'
          });
        }else{
          this.$axios({
            method:'GET',
            url:'/api/othAddDetail',
            params:{
              intro1:this.intro1,
              intro2:this.intro2,
              intro3:this.intro3,
              Scenic:this.Scenic,
              AddId :this.AddId,
              AddInputPhoto1:'./../OthUpload1/'+this.fileList3[0],
              AddInputPhoto2:'./../OthUpload1/'+this.fileList3[1],
              AddInputPhoto3:'./../OthUpload1/'+this.fileList3[2],
              AddInputPhoto4:'./../OthUpload1/'+this.fileList3[3],
            }
          }).then(()=>{
            this.intro1='',
              this.intro2='',
              this.intro3='',
              this.Scenic=''
            this.$message({
              type: 'success',
              message: '套餐详情添加成功!',
            })

          }).catch(()=>{
            this.$message({
              type: 'info',
              message: '操作失败!'
            });
          })}
      },
      add(index,row){
        this.showFrameAdd=true;
        this.AddId=row.id
      },
      submitUpload() {
        this.$refs.upload.submit();
        console.log(1)
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);

      },
      handlePreview(file) {
        console.log(file);
      },
      handleChange(file, fileList) {
        console.log(file.name)
        this.fileList3.push(file.name)
      },

    }}
</script>
<style scoped lang="less">
  .oth-la{
    position: relative;
  }
  .oth-alter{
    position: absolute;
    top:0;
    left: 0;
    margin-left: -14px;
    margin-top: 12px;
  }
  .el-button--danger{
    position: absolute;
    top:0;
    left: 0;
    margin-left: 60px;
    margin-top: 11px;
  }
  #oth-box{
    position: relative;

  }
  .shade {
    width: 100%;
    height: 100%;
    background: black;
    opacity: 0.5;
  }
  .shadeAdd{
    opacity:1;
  }
  #oth-pagination{
    position: absolute;
    margin-top: 550px;
    margin-left: 650px;
  }
  .oth-previous{
    position: absolute;
    margin-top: 550px;
    margin-left: 600px;
    border :1px  solid #d5d5d5;
    width: 54px;
    height: 25px;
    background: #fff;
    color:#d5d5d5;
    line-height: 25px;
  }
  .oth-next{
    position: absolute;
    margin-top: 550px;
    margin-left: 1000px;
    border :1px  solid #d5d5d5;
    width: 54px;
    height: 25px;
    background: #fff;
    color:#d5d5d5;
    line-height: 25px;

  }
  #oth-select{
    position: relative;
    .el-button--primary{
      position: absolute;
      top: 0;
      left: 0;
      background:#484967;
      margin-top: 20px;
      margin-left: 538px;
      height: 40px;
      border-color: #fff;

    }
  }
  #oth-select  p{
    position: absolute;
    top: 0;
    left: 0;
    margin-top: 30px;
    margin-left: 50px;
  }
  .oth-ipt1{
    width: 200px;
    height: 40px;
    position: absolute;
    top: 0;
    left: 0;
    margin-top: 20px;
    margin-left: 130px;
  }
  .oth-ipt2{
    width: 200px;
    height: 40px;
    position: absolute;
    top: 0;
    left: 0;
    margin-top: 20px;
    margin-left: 340px;
  }
  .el-button--info.is-plain{
    position: absolute;
    top: 0;
    left: 0;
    background:#484967;
    margin-top: 20px;
    margin-left: 1000px;
    height: 40px;
    color:#fff;
    border-color: #fff;
  }
  #oth-content{
    position: relative;
  }
  #oth-table{
    position: absolute;
    margin-top: 80px;
  }
  #oth-frame-addDetail  .oth-frame{
    height: 360px;
  }
  #oth-frame-addDetail  #oth-frame-success1{
    position: absolute;
    top: 0;
    left: 0;
    margin-top: 320px;
    margin-left: 240px;
    background:#484967;
    border-color: #fff;
  }
  #oth-frame-addDetail  #oth-frame-upload{
    margin-top:220px;
    margin-left: -68px;
  }
  .oth-frame{
    width:336px;
    height: 465px;
    background: #fcfcfc;
    border: 1px solid #eee;
    opacity: 1;
    position: absolute;
    margin-left: 400px;
    margin-top: 80px;
  }
  .oth-frame-top{
    width: 336px;
    height: 30px;
    background: #6f7299;
    p{
      color:#fff;
      margin-left: -240px;
      line-height: 30px;
    }
    span{
      position: absolute;
      color: #fcfcfc;
      margin-left: 145px;
      margin-top: -20px;
    }
  }
  .oth-frame-content{
    position: relative;
    margin-bottom:50px;
    p{
      position: absolute;
      margin-top: 30px;
      margin-left: 10px;
    }
    .oth-frame-add{
      margin-left:-80px;
      position: absolute;
      margin-top: 20px;
    }
  }
  .oth-frame-content1{
    position: relative;
    margin-bottom:50px;
    p{
      position: absolute;
      margin-top: 75px;
      margin-left: 10px;
    }
    .oth-frame-add{
      margin-left:-80px;
      position: absolute;
      margin-top: 65px;
    }
  }
  .oth-frame-content2{
    position: relative;
    margin-bottom:50px;
    p{
      position: absolute;
      margin-top: 120px;
      margin-left: 10px;
    }
    .oth-frame-add{
      margin-left:-80px;
      position: absolute;
      margin-top: 115px;
    }
  }
  .oth-frame-content3{
    position: relative;
    margin-bottom:50px;
    p{
      position: absolute;
      margin-top: 170px;
      margin-left: 10px;
    }
    .oth-frame-add{
      margin-left:-80px;
      position: absolute;
      margin-top: 164px;
    }
  }
  #oth-frame-add  #oth-upload-btn{
    position: absolute;
    margin-top: 250px;
    margin-left: -156px;
  }
  #oth-frame-add .oth-frame-content4{
    position: relative;
    margin-bottom:50px;
    p{
      position: absolute;
      margin-top: 170px;
      margin-left: 10px;
    }
    .oth-frame-add{
      margin-left:-75px;
      position: absolute;
      margin-top: 160px;
    }
  }
  .oth-frame-content4{
    position: relative;
    margin-bottom:50px;
    p{
      position: absolute;
      margin-top: 220px;
      margin-left: 10px;
    }
    .oth-frame-add{
      margin-left:-75px;
      position: absolute;
      margin-top: 210px;
    }
  }
  #oth-frame-add .oth-frame-content5{
    position: relative;
    margin-bottom:50px;
    p{
      position: absolute;
      margin-top: 215px;
      margin-left: 10px;
    }
    .oth-frame-add{
      margin-left:-75px;
      position: absolute;
      margin-top: 210px;
    }
  }
  .oth-frame-content5{
    position: relative;
    margin-bottom:50px;
    p{
      position: absolute;
      margin-top: 260px;
      margin-left: 10px;
    }
    .oth-frame-add{
      margin-left:-75px;
      position: absolute;
      margin-top: 255px;
    }
  }
  .oth-frame-content6{
    position: relative;
    margin-bottom:50px;
    p{
      position: absolute;
      margin-top: 110px;
      margin-left: 10px;
    }
    .oth-frame-add{
      margin-left:-80px;
      position: absolute;
      margin-top: 110px;
    }
  }
  .el-button--success{
    position: absolute;
    top: 0;
    left: 0;
    margin-top: 350px;
    margin-left: 240px;
    background:#484967;
    border-color: #fff;
  }

  #oth-frame-success{
    position: absolute;
    top: 0;
    left: 0;
    margin-top: 436px;
    margin-left: 240px;
    background:#484967;
    border-color: #fff;
  }
  #oth-frame-success1{
    position: absolute;
    top: 0;
    left: 0;
    margin-top: 400px;
    margin-left: 240px;
    background:#484967;
    border-color: #fff;
  }
  #othAddSelect {
    position: absolute;

  }
  #othAddSelect1 {
    position: absolute;


  }
  #othAddSelect1P{
    position: absolute;
    margin-top:216px ;
    margin-left:10px;
  }

  #oth-input1{

    margin-left: 88px;
    margin-top: 20px;
  }
  #oth-input2{
    margin-left: 88px;
    margin-top: 210px;
  }
  #oth-frame-upload{
    margin-top:310px;
    margin-left: -68px;
  }
  #oth-frame-addDetail  #addDetail_p{
    position: relative;
    top:-30px;
    left: -85px;
    color: #9e9e9e
  }
  .oth-input1-select{
    width: 236px;
    height: 15px;
  }


</style>

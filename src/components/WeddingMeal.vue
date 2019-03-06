<template>
    <div id="weddingMealBox">
      <!--查询框-->
      <div class="query-Box">

        <span>查询套餐：</span>
        <div id="query">
          <el-select v-model="value" clearable placeholder="请选择" class="y-t1">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
          <div style="margin-top: 5px; display:inline-block">
            <el-input placeholder="请输入关键字" v-model="input5" class="input-with-select">
              <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
            </el-input>
          </div>
          <span>{{title}}</span>
        </div>


        <el-button type="primary" size="mini" id="addMeal" @click="centerDialogVisible4 = true"> <i class="el-icon-plus"></i>新增套系 </el-button>

      </div>

      <!--表格部分-->
      <div class="table-Box">

        <el-table :data="tableData" :header-cell-style="isCenter" :cell-style="isCenter" stripe style="width: 100%" >
          <el-table-column prop="m_mealNumber" label="套餐编号"></el-table-column>
          <el-table-column prop="m_Title" label="套餐标题" width="220"></el-table-column>
          <el-table-column prop="m_nowPrice" label="价格"></el-table-column>
          <el-table-column prop="m_subscription" label="定金"></el-table-column>
          <el-table-column prop="m_place" label="拍摄地"></el-table-column>

          <el-table-column prop="details" label="完善详细信息" >
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="setDetails(scope.$index,scope.row)"><i class="el-icon-edit"></i>完善详情</el-button>
            </template>
          </el-table-column>

          <el-table-column prop="see" label="查看" >
            <template slot-scope="scope">
              <el-button type="" size="small" icon="el-icon-view" circle @click="lookDetails(scope.$index,scope.row)"></el-button>
            </template>
          </el-table-column>
          <el-table-column prop="edit" label="编辑">
            <template slot-scope="scope">
              <el-button type="primary" size="small" icon="el-icon-edit" circle @click="editWeddingMeal(scope.$index,scope.row)"></el-button>
            </template>
          </el-table-column>
          <el-table-column prop="delete" label="下架">
            <template slot-scope="scope">
              <el-button type="danger" size="small" icon="el-icon-delete" circle @click="removeWeddingMeal(scope.$index,scope.row)"></el-button>
            </template>
          </el-table-column>


        </el-table>

      </div>

      <!--分页部分-->
      <div class="page-Box">
        <el-pagination background :current-page="page"
                       layout="prev, pager, next "
                       :total="pageNum"
                       @current-change="handleCurrentChange">
        </el-pagination>
      </div>

      <!--完善详细信息弹框-->
      <el-dialog title="完善详细信息" :visible.sync="centerDialogVisible8" width="35%" center>

      <el-form ref="form2" :model="form2" status-icon label-width="84px"  class="demo-ruleForm">
        <el-form-item label="描述1" prop="md_des1">
          <el-input v-model="form2.md_des1" placeholder="例：1.给你一个极致的拍照体验，享受与恋人的亲密时光"></el-input>
        </el-form-item>
        <el-form-item label="描述2" prop="md_des2">
          <el-input v-model="form2.md_des2" placeholder="例:2.体验羌族文化，享受当地特色美食"></el-input>
        </el-form-item>
        <el-form-item label="描述3" prop="md_des3">
          <el-input v-model="form2.md_des3" placeholder="例:3.享多重好礼,拍摄期间内5钻酒店+赠送拍摄景区门票"></el-input>
        </el-form-item>
        <el-form-item label="详情图片1" prop="md_img1">
          <el-upload class="upload-demo" v-model="form2.md_img1" action="/api/upload" :on-preview="handlePreview" :on-success="uploadImg" :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="4">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="详情图片2" prop="md_img2">
          <el-upload class="upload-demo" v-model="form2.md_img2" action="/api/upload" :on-preview="handlePreview" :on-success="uploadImg" :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="4">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="详情图片3" prop="md_img3">
          <el-upload class="upload-demo" v-model="form2.md_img3" action="/api/upload" :on-preview="handlePreview" :on-success="uploadImg" :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="4">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="详情图片4" prop="md_img4">
          <el-upload class="upload-demo" v-model="form2.md_img4" action="/api/upload" :on-preview="handlePreview" :on-success="uploadImg" :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="4">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="景区描述" prop="md_description">
          <el-input type="textarea" v-model="form2.md_description"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible8 = false">取 消</el-button>
          <el-button type="primary" @click="sureSetDetails">确 定</el-button>
        </span>
    </el-dialog>

      <!--删除弹框-->
      <el-dialog title="下架" :visible.sync="centerDialogVisible" width="30%" center>
        <span>您确定要下架此套系吗？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="sureRemove">确 定</el-button>
        </span>
      </el-dialog>

      <!--编辑弹框-->
      <el-dialog title="编辑套系" :visible.sync="centerDialogVisible2" width="33%" center>

        <el-form ref="ruleForm1" :model="ruleForm1" label-width="90px" class="demo-ruleForm">
          <el-form-item label="套餐编号">
            <el-input v-model="ruleForm1.m_mealNumber" disabled></el-input>
          </el-form-item>
          <el-form-item label="四字标题">
            <el-input v-model="ruleForm1.m_bigTitle"></el-input>
          </el-form-item>
          <el-form-item label="套餐标题">
            <el-input v-model="ruleForm1.m_Title"></el-input>
          </el-form-item>
          <el-form-item label="美句">
            <el-input v-model="ruleForm1.m_niceWords"></el-input>
          </el-form-item>
          <el-form-item label="原价">
            <el-input v-model="ruleForm1.m_oldPrice"></el-input>
          </el-form-item>
          <el-form-item label="现价">
            <el-input v-model="ruleForm1.m_nowPrice"></el-input>
          </el-form-item>
          <el-form-item label="定金">
            <el-input v-model="ruleForm1.m_subscription"></el-input>
          </el-form-item>
          <el-form-item label="拍摄地点">
            <el-select v-model="ruleForm1.m_place" placeholder="拍摄地点" disabled>
              <el-option label="马尔代夫" value="马尔代夫"></el-option>
              <el-option label="巴厘岛" value="巴厘岛"></el-option>
              <el-option label="四川" value="四川"></el-option>
              <el-option label="云南" value="云南"></el-option>
              <el-option label="三亚" value="三亚"></el-option>
              <el-option label="北京" value="北京"></el-option>
              <el-option label="青海湖" value="青海湖"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="套餐主图">
            <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="1">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>

        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible2 = false">取 消</el-button>
          <el-button type="primary" @click="sureEdit">确 定</el-button>
        </span>
      </el-dialog>

      <!--查看弹框-->
      <el-dialog title="套系详情" :visible.sync="centerDialogVisible3" width="33%" center>

        <el-form :model="ruleForm3" status-icon  ref="ruleForm3" label-width="120px" class="demo-ruleForm" id="detailForm">
          <el-form-item label="套餐编号：">
            <span>{{ruleForm3.m_mealNumber}}</span>
          </el-form-item>
          <el-form-item label="四字标题：">
            <span>{{ruleForm3.m_bigTitle}}</span>
          </el-form-item>
          <el-form-item label="套餐标题：">
            <span>{{ruleForm3.m_Title}}</span>
          </el-form-item>
          <el-form-item label="美句：">
            <span>{{ruleForm3.m_niceWords}}</span>
          </el-form-item>
          <el-form-item label="原价：">
            <span>{{ruleForm3.m_oldPrice}}</span>
          </el-form-item>
          <el-form-item label="现价：">
            <span>{{ruleForm3.m_nowPrice}}</span>
          </el-form-item>
          <el-form-item label="定金：">
            <span>{{ruleForm3.m_subscription}}</span>
          </el-form-item>
          <el-form-item label="拍摄地点：">
            <span>{{ruleForm3.m_place}}</span>
          </el-form-item>
          <el-form-item label="套餐主图：">
            <span>{{ruleForm3.m_imageUrl}}</span>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible3 = false">取 消</el-button>
          <el-button type="primary" @click="centerDialogVisible3 = false">确 定</el-button>
        </span>
      </el-dialog>

      <!--新增弹框-->
      <el-dialog title="新建套系" :visible.sync="centerDialogVisible4" width="33%" center>

        <el-form ref="form" :model="form" status-icon :rules="rules1" label-width="90px" class="demo-ruleForm">
          <el-form-item label="套餐编号" prop="m_mealNumber">
            <el-input v-model="form.m_mealNumber" placeholder="例：CZ64XX"></el-input>
          </el-form-item>
          <el-form-item label="四字标题">
            <el-input v-model="form.m_bigTitle"></el-input>
          </el-form-item>
          <el-form-item label="套餐标题">
            <el-input v-model="form.m_Title"></el-input>
          </el-form-item>
          <el-form-item label="美句">
            <el-input v-model="form.m_niceWords"></el-input>
          </el-form-item>
          <el-form-item label="原价" prop="m_oldPrice">
            <el-input v-model="form.m_oldPrice" placeholder="例：8999"></el-input>
          </el-form-item>
          <el-form-item label="现价" prop="m_nowPrice">
            <el-input v-model="form.m_nowPrice" placeholder="例：6888"></el-input>
          </el-form-item>
          <el-form-item label="定金" prop="m_subscription">
            <el-input v-model="form.m_subscription" placeholder="例：1000"></el-input>
          </el-form-item>
          <el-form-item label="拍摄地点">
            <el-select v-model="form.m_place" placeholder="拍摄地点">
              <el-option label="马尔代夫" value="马尔代夫"></el-option>
              <el-option label="巴厘岛" value="巴厘岛"></el-option>
              <el-option label="四川" value="四川"></el-option>
              <el-option label="云南" value="云南"></el-option>
              <el-option label="三亚" value="三亚"></el-option>
              <el-option label="北京" value="北京"></el-option>
              <el-option label="青海湖" value="青海湖"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="套餐主图">
            <el-upload class="upload-demo" v-model="form.m_imageUrl" action="/api/upload" :on-preview="handlePreview" :on-success="uploadImg" :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="4">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>

        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible4 = false">取 消</el-button>
          <el-button type="primary" @click="sureAdd('form')">确 定</el-button>
        </span>
      </el-dialog>


    </div>

</template>

<script>
    let sId;
    let sIndex;
    let detailsId;
    export default{
        name: 'WeddingMeal',
        data(){

          var mealNumber = /^[C][Z][0-9]{4}$/;
          var price = /^[0-9]{2,6}$/;
          var validateMealNumber = (rule, value, callback) => {
            if (!value) {
              return callback(new Error('套餐编号不能为空!!'))
            }
            setTimeout(() => {
              if (!mealNumber.test(value)) {
                callback(new Error('格式有误'))
              } else {
                callback()
              }
            },1000)
          }
          var validatePrice = (rule, value, callback) => {
            if (!value) {
              return callback(new Error('价格不能为空!!'))
            }
            setTimeout(() => {
              if (!price.test(value)) {
                callback(new Error('格式有误'))
              } else {
                callback()
              }
            },1000)
          }

          return {
              activeName: 'second',
              tableData: [], //表格数据
              ruleForm3:[],  //查看详情数据
              ruleForm1:[],  //编辑时显示的数据
              centerDialogVisible:false,
              centerDialogVisible2:false,
              centerDialogVisible3:false,
              centerDialogVisible4:false,
              centerDialogVisible8:false,
              //新增婚纱套餐的数据
              form: {
                m_mealNumber:'',
                m_bigTitle:'',
                m_Title:'',
                m_niceWords:'',
                m_oldPrice:'',
                m_nowPrice:'',
                m_subscription:'',
                m_place:'',
                m_imageUrl:''
            },
              //新增婚纱详细信息的数据
              form2:{
              md_des1:'',
              md_des2:'',
              md_des3:'',
              md_img1:'',
              md_img2:'',
              md_img3:'',
              md_img4:'',
              md_description:''
            },
              formInline: {
              user: '',
              region: ''
              },
              input5:'',
              value:'',
            options: [{
              value: 'm_mealNumber',
              label: '按套餐编号'
            }, {
              value: 'm_Title',
              label: '按套餐标题'
            }, {
              value: 'm_place',
              label: '按拍摄地'
            }],

              pageNum: 100,//分页个数
              page:1,//默认页码

              rules1:{
              m_mealNumber:[
                {validator: validateMealNumber, trigger: 'blur'},
              ],
              m_oldPrice:[
                {validator: validatePrice, trigger: 'blur'},
              ],
              m_nowPrice:[
                {validator: validatePrice, trigger: 'blur'},
              ],
              m_subscription:[
                {validator: validatePrice, trigger: 'blur'},
              ]
            }

            };

        },
      created(){

          this.$axios({
              method:'get',
              url:'/api/getWeddingData',
              params:{
                  page:this.page,
              }
          })
            .then((res)=>{
               this.tableData=res.data.data;
               console.log(res.data)
            })
              .catch((err)=>{
               console.log(err);
            });

            /*获取分页*/
            this.$axios({
              method:'get',
              url:'/api/getPage',
            })
              .then((res)=>{
                let n=res.data.content.length;
                this.pageNum=Math.ceil(n/7)*7;
              })
              .catch((err)=>{
                console.log('报错了'+err)
              })
      },

      methods: {

        //添加婚纱详细信息
        setDetails(i,data){
          this.centerDialogVisible8=true;
          detailsId = data.m_id;
          //console.log(detailsId);
        },
        //确认添加婚纱详细信息
        sureSetDetails(){
          this.centerDialogVisible8=false;
            this.$axios({
            method: 'GET',
            url: '/api/addWeddingDeatils',
            params: {
              data: this.form2,
              id:detailsId
            }
          }).then((res) => {

          }).catch((err) => {
            console.log(err);
          });
        },

        //图片上传
        uploadImg(response, file, fileList){
            console.log(response, file, fileList)
            var srt='./../image/wedding/'+fileList[0].name+'';
            this.form.m_imageUrl=srt
            console.log(srt)
        },
        //确认新增
        sureAdd(form){
          this.$refs[form].validate((valid) => {
            if (valid) {
              this.centerDialogVisible4 = false;
              this.$axios({
                method: 'GET',
                url: '/api/addWeddingMeal',
                params: {
                  data: this.form
                }
              }).then((res) => {
                //              this.tableData.push(this.form)
                this.tableData.unshift(this.form);
                this.tableData.pop()

              }).catch((err) => {
                console.log(err);
              });
            } else {
              return false;
            }
          });
        },


        //查看员工详细信息的函数
        lookDetails(i,data){
          this.centerDialogVisible3 =true;
//          console.log(i,data);
          //获取当前点击的数据
          this.ruleForm3=data;
//          console.log(this.ruleForm3);
        },
        //点击表格中的删除套系按钮
        removeWeddingMeal(i,data){
          this.centerDialogVisible = true;
          sId = data.m_id;
          sIndex=i;
        },
        //点击弹框中的确定删除
        sureRemove(){
          this.centerDialogVisible = false;
          //console.log(sId)
          this.$axios({
            method: 'GET',
            url: '/api/removeWeddingMeal',
            params: {
              id:sId
            }
          }).then((res)=>{
            //this.tableData.splice(sIndex,1);
              this.search();

          }).catch((err)=>{
            console.log(err);
          });
        },
        //点击表格中的编辑按钮
        editWeddingMeal(i,data){
          this.centerDialogVisible2 = true;
          this.ruleForm1=data;
          //console.log(this.ruleForm1);
        },
        //确定修改婚纱套餐信息
        sureEdit(){
          this.centerDialogVisible2 = false;
          this.$axios({
            method: 'GET',
            url: '/api/editWeddingMeal',
            params: {
              m_bigTitle:this.ruleForm1.m_bigTitle,
              m_Title:this.ruleForm1.m_Title,
              m_niceWords:this.ruleForm1.m_niceWords,
              m_oldPrice:this.ruleForm1.m_oldPrice,
              m_nowPrice:this.ruleForm1.m_nowPrice,
              m_subscription:this.ruleForm1.m_subscription,
              m_id:this.ruleForm1.m_id
            }
          }).then((res)=>{

          }).catch((err)=>{
            console.log(err);
          });
        },

        handleClick(tab, event) {
          console.log(tab, event);
        },
        isCenter(){
           return 'text-align:center'
         },
        onSubmit() {
          console.log('submit!');
        },

        handleRemove(file, fileList) {
          console.log(file, fileList);
        },
        handlePreview(file) {
          console.log(file);
        },

        beforeRemove(file, fileList) {
          return this.$confirm(`确定移除 ${ file.name }？`);
        },

        /*lalala*/
        search(){
            /*获取搜索内容*/
          this.$axios({
            method:'get',
            url:'/api/searchOrder',
            params:{
              data:this.input5,
              way:this.value,
              page:this.page
            }
          })
            .then((res)=>{
              this.tableData=res.data.content;
            })
            .catch((err)=>{
              console.log(err);
            });

          //获取搜索分页
          this.$axios({
            method:'get',
            url:'/api/getSearchPage',
            params:{
              data:this.input5,
              txt:this.value,
            }
          })
            .then((res)=>{
              console.log(res);
              let n=res.data.content.length;
              this.pageNum=Math.ceil(n/7)*7;
//              console.log('数据条数:',n);
              if (n<=7 * (this.page-1)){
                this.page=1;
              }/*重定向 页码为1*/
//              console.log('范围:',10 * (this.page-1));
                console.log(this.pageNum)
            })
            .catch((err)=>{
              console.log('报错了'+err)
            })
        },

        /*获取页码 , 点击分页*//*lalala*/
        handleCurrentChange(val){
          this.page=val;
            this.$axios({
                method:'get',
                url:'/api/searchOrder',
                params:{
                    data:this.input5,
                    way:this.value,
                    page:this.page
                }
            })
                .then((res)=>{
                    this.tableData=res.data.content;
                })
                .catch((err)=>{
                    console.log(err);
                });
        },
      },
    computed:{
        title(){
            this.search();
        },
    }

    }

</script>

<style scoped lang="less">

  .query-Box{
    width: 1160px;
    height: 50px;
    margin-top: 5px;
    margin-left: 8px;
    position:relative;
    border-bottom:1px solid #5b5b5b;
  span{
    position: absolute;
    display: inline-block;
    left:18px;
    top:12px;
  }
  #query{
    width:440px;
    height: 24px;
    margin-left:110px;
    margin-top: -6px;
  }
  #selectqueryWay{
    position: absolute;
    width: 120px;
    height: 32px;
    left:110px;
    top:7px;
    text-align: center;
  }

  #keyInput{
    position: absolute;
    left:248px;
    top:8px;
    width: 180px;
    height: 27px;
  }
  #searchBtn{
    position: absolute;
    left:432px;
    top:8px;
    width: 54px;
    height: 31px;
    letter-spacing: 3px;
  }

  }

  #addMeal{
    font-size: 15px;
    position: absolute;
    right: 15px;
    top:3px;
    line-height:22px;
    i{
      margin-right: 6px;
    }
  }
  .el-icon-plus{
    font-size: 18px;
    font-weight: bold;
  }

  .table-Box{
    width: 1160px;
    height: 468px;
    margin-top: 8px;
    margin-left: 8px;
    text-align: center;
  }


  .page-Box{
    width: 1140px;
    height: 48px;
    margin-top: 5px;
    margin-left: 8px;

  }
  #detailForm{
  span{
    display: inline-block;
    margin-left: 36px;
  }
  }

  .query-Box,.page-Box,.table-Box{
    /*border: 1px solid saddlebrown;*/
  }
  .el-select{
    width :128px;
  }
</style>

<template>
  <div id="staff-Box">
    <!--顶部-->
    <div class="top-Box">
      <p>员工管理</p>
    </div>

    <div id="contentBox">
      <!--查询框-->
      <div class="query-Box">

        <span>查询员工：</span>

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



        <el-button type="primary" size="mini" id="addStaff" @click="centerDialogVisible4 = true"> <i class="el-icon-plus"></i>新增员工 </el-button>

      </div>

      <!--表格部分-->
      <div class="table-Box">

        <el-table :data="tableData" :header-cell-style="isCenter" :cell-style="isCenter" stripe style="width: 100%" >
          <el-table-column prop="s_id" label="员工编号"></el-table-column>
          <el-table-column prop="s_name" label="姓名"></el-table-column>
          <el-table-column prop="s_phone" label="联系电话" width="140px"></el-table-column>
          <el-table-column prop="s_password" label="登录密码"></el-table-column>
          <el-table-column prop="s_age" label="年龄"></el-table-column>
          <el-table-column prop="s_birthday" label="生日"></el-table-column>
          <el-table-column prop="s_idCard" label="身份证号" width="160"></el-table-column>
          <el-table-column prop="s_urgencyPhone" label="紧急联系人" width="110"></el-table-column>
          <el-table-column prop="view" label="查看" >
            <template slot-scope="scope">
              <el-button type="" size="small" icon="el-icon-view" circle @click="lookDetails(scope.$index,scope.row)"></el-button>
            </template>
          </el-table-column>
          <el-table-column prop="edit" label="编辑">
            <template slot-scope="scope">
              <el-button type="primary" size="small" icon="el-icon-edit" circle @click="editStaff(scope.$index,scope.row)"></el-button>
            </template>
          </el-table-column>
          <el-table-column prop="delete" label="删除">
            <template slot-scope="scope">
              <el-button type="danger" size="small" icon="el-icon-delete" circle @click="removeStaff(scope.$index,scope.row)"></el-button>
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


    </div>

    <!--新增员工-->
    <el-dialog title="新增员工" :visible.sync="centerDialogVisible4" width="32%" center>

      <el-form :model="ruleForm2" status-icon  :rules="rules2" ref="ruleForm2" label-width="90px" class="demo-ruleForm">
        <el-form-item label="姓名" prop="s_name">
          <el-input v-model.number="ruleForm2.s_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="s_phone">
          <el-input v-model.number="ruleForm2.s_phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="登录密码" prop="s_password">
          <el-input  type="password" v-model.number="ruleForm2.s_password"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="s_age" :rules="[{ required: true, message: '年龄不能为空'},{ type: 'number', message: '格式有误！'}]">
          <el-input v-model.number="ruleForm2.s_age" placeholder="格式：22"></el-input>
        </el-form-item>
        <el-form-item label="生日" prop="s_birthday">
          <el-input v-model.number="ruleForm2.s_birthday" placeholder="格式：1月1日"></el-input>
        </el-form-item>
        <el-form-item label="身份证号" prop="s_idCard">
          <el-input v-model.number="ruleForm2.s_idCard"></el-input>
        </el-form-item>
        <el-form-item label="紧急联系人" prop="s_urgencyPhone">
          <el-input v-model.number="ruleForm2.s_urgencyPhone"></el-input>
        </el-form-item>
        <el-form-item label="家庭住址" prop="s_address">
          <el-input type="textarea" v-model.number="ruleForm2.s_address"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
      <el-button @click="centerDialogVisible4= false">取 消</el-button>
      <el-button type="primary" @click="send('ruleForm2')">确 定</el-button>
      </span>
    </el-dialog>

    <!--查看弹框-->
    <el-dialog title="员工详情" :visible.sync="centerDialogVisible3" width="32%" center>

      <el-form :model="ruleForm3" status-icon ref="ruleForm3" label-width="185px" class="demo-ruleForm" id="detailForm">
        <el-form-item label="员工编号：" prop="s_id">
          <span>{{ruleForm3.s_id}}</span>
        </el-form-item>
        <el-form-item label="姓名:" prop="s_name">
          <span>{{ruleForm3.s_name}}</span>
        </el-form-item>
        <el-form-item label="联系电话:" prop="s_phone">
          <span>{{ruleForm3.s_phone}}</span>
        </el-form-item>
        <el-form-item label="登录密码:" prop="s_password">
          <span>{{ruleForm3.s_password}}</span>
        </el-form-item>
        <el-form-item label="年龄:" prop="s_age">
          <span>{{ruleForm3.s_age}}</span>
        </el-form-item>
        <el-form-item label="生日:" prop="s_birthday">
          <span>{{ruleForm3.s_birthday}}</span>
        </el-form-item>
        <el-form-item label="身份证号:" prop="s_idCard">
          <span>{{ruleForm3.s_idCard}}</span>
        </el-form-item>
        <el-form-item label="紧急联系人:" prop="s_urgencyPhone">
          <span>{{ruleForm3.s_urgencyPhone}}</span>
        </el-form-item>
        <el-form-item label="家庭住址" prop="s_address">
          <span>{{ruleForm3.s_address}}</span>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
      <el-button @click="centerDialogVisible3 = false">取 消</el-button>
      <el-button type="primary" @click="centerDialogVisible3 = false">确 定</el-button>
      </span>
    </el-dialog>

    <!--编辑弹框-->
    <el-dialog title="编辑员工"  :visible.sync="centerDialogVisible2" width="33%" center>

      <el-form ref="ruleForm1" :model="ruleForm1" :rules="rules1" label-width="90px" class="demo-ruleForm">
        <el-form-item label="姓名">
        <el-input v-model="ruleForm1.s_name" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="s_phone">
          <el-input v-model="ruleForm1.s_phone"></el-input>
        </el-form-item>
        <el-form-item label="登录密码">
        <el-input v-model="ruleForm1.s_password"></el-input>
        </el-form-item>
        <el-form-item label="年龄">
        <el-input v-model="ruleForm1.s_age" disabled></el-input>
        </el-form-item>
        <el-form-item label="生日">
        <el-input v-model="ruleForm1.s_birthday" disabled></el-input>
        </el-form-item>
        <el-form-item label="身份证号">
        <el-input v-model="ruleForm1.s_idCard" disabled></el-input>
        </el-form-item>
        <el-form-item label="紧急联系人" prop="s_urgencyPhone">
        <el-input v-model="ruleForm1.s_urgencyPhone"></el-input>
        </el-form-item>
        <el-form-item label="家庭住址">
        <el-input type="textarea" v-model="ruleForm1.s_address"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible2 = false">取 消</el-button>
          <el-button type="primary" @click="sureEdit">确 定</el-button>
        </span>
    </el-dialog>

    <!--删除弹框-->
    <el-dialog title="删除" :visible.sync="centerDialogVisible" width="30%" center>
      <span>您确定要删除此员工信息吗？</span>
      <span slot="footer" class="dialog-footer">
      <el-button @click="centerDialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="sureRemove">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  let sId;
  let sIndex;
  export default{
    name: 'Staff',
    data(){

      var phoneReg = /^1[3-9]\d{9}$/;
      var IdCard = /[1-68]\d{5}/;
      var validatePhone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('号码不能为空!!'))
        }
        setTimeout(() => {
          if (!phoneReg.test(value)) {
            callback(new Error('格式有误'))
          } else {
            callback()
          }
        },1000)
      }

      var validateIdCard = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('身份证号不能为空!!'))
        }
        setTimeout(() => {
          if (!IdCard.test(value)) {
            callback(new Error('格式有误'))
          } else {
            callback()
          }
        },1000)
      }

      var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('年龄不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (value < 18) {
              callback(new Error('必须年满18岁'));
            } else {
              callback();
            }
          }
        }, 1000);
      };

      return {
        input5: '',
        value: '',
        activeName: 'second',
        tableData:[],   //表格数据
        ruleForm3:[],   //查看详情的数据
        ruleForm1:[],   //编辑时显示的数据
        //新增员工的数据
        ruleForm2: {
          s_name:'',
          s_phone:'',
          s_password:'',
          s_age:'',
          s_birthday:'',
          s_idCard:'',
          s_urgencyPhone:'',
          s_address:''
       },

        centerDialogVisible:false,
        centerDialogVisible2:false,
        centerDialogVisible3:false,
        centerDialogVisible4:false,

        options: [
          {
            value: 's_id',
            label: '按员工编号'
          },
          {
            value: 's_name',
            label: '按员工姓名'
          },
          {
            value: 's_phone',
            label: '按联系电话'
          }
          ],

        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px',

        pageNum: 100,//分页个数
        page:1,//默认页码

        rules2:{
          s_name:[
            {required: true,message: '请输入姓名',trigger: 'blur'}
          ],
          s_phone:[
            {validator: validatePhone, trigger: 'blur'}
          ],
          s_age:[
            { validator: checkAge, trigger: 'blur' }
          ],
          s_idCard:[
            { validator: validateIdCard, trigger: 'blur' }
          ],
          s_urgencyPhone:[
            {validator: validatePhone, trigger: 'blur'}
          ]
        },

        rules1:{
          s_phone:[
            {validator: validatePhone, trigger: 'blur'}
          ],
          s_urgencyPhone:[
            {validator: validatePhone, trigger: 'blur'}
          ]
        }

      }
    },

    created(){

        this.$axios({
            method:'get',
            url:'/api/getStaffData',
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
            url:'/api/getStaffPage',
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
        //新增员工
        send(formName){

            this.$refs[formName].validate((valid) => {
              if (valid) {
                this.centerDialogVisible4 = false;
                //console.log(this.ruleForm2.pass)
                this.$axios({
                  method: 'GET',
                  url: '/api/addStaff',
                  params: {
                    data:this.ruleForm2
                  }
                }).then((res)=>{
                  this.ruleForm2.s_id=res.data.s_id
                  //this.tableData.push(this.ruleForm2)
                  this.tableData.unshift(this.ruleForm2);
//              this.tableData.pop()
                }).catch((err)=>{
                  console.log(err);
                });
              } else {
                //console.log('error submit!!');
                return false;
              }
            });


        },
        //查看员工详细信息的函数
        lookDetails(i,data){
        this.centerDialogVisible3 =true;
        //console.log(i,data);
        this.ruleForm3=data;
        },
        //点击表格中的删除按钮
        removeStaff(i,data){
          this.centerDialogVisible = true;
          sId = data.s_id;
          sIndex=i;
        },
        //点击弹框中的确定删除
        sureRemove(){
          this.centerDialogVisible = false;
          //console.log(sId)
          this.$axios({
            method: 'GET',
            url: '/api/removeStaff',
            params: {id:sId}
          }).then((res)=>{
             //console.log(sIndex);
            //this.tableData.splice(sIndex,1);
              this.search();
          }).catch((err)=>{
            console.log(err);
          });
        },
        //编辑员工信息
        editStaff(i,data){
          this.centerDialogVisible2 = true;
          this.ruleForm1=data;
        },

        //确定修改信息
        sureEdit(){
          this.centerDialogVisible2 = false;
          this.$axios({
            method: 'GET',
            url: '/api/sureEditStaff',
            params: {
              s_phone:this.ruleForm1.s_phone,
              s_password:this.ruleForm1.s_password,
              s_urgencyPhone:this.ruleForm1.s_urgencyPhone,
              s_address:this.ruleForm1.s_address,
            }
          }).then((res)=>{

          }).catch((err)=>{
            console.log(err);
          });
        },

        handleClick(tab, event) {
          console.log(tab, event);
        },
        handleClick() {
          alert('button click');
        },
        isCenter(){
          return 'text-align:center'
        },

        search(){
          /*获取搜索内容*/
            this.$axios({
                method:'get',
                url:'/api/searchStaff',
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
                url:'/api/staffSearchPage',
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
                url:'/api/searchStaff',
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
        submitForm(formName) {

      },
    },


  }
</script>

<style scoped lang="less">
  #staff-Box{
    width: 1180px;
    height: 656px;
    margin-top: 8px;
    margin-left: 10px;
    position:absolute;
    left: 300px;
    top:62px;
    background: #f3f3f3;
    border-bottom:1px solid #5b5b5b;
    /*border: 1px solid #a2a2a2;*/
  }

  .top-Box{
    width: 1160px;
    height: 50px;
    margin-left: 8px;
    margin-top: 8px;
    border-bottom:1px solid #5b5b5b;
    p{
      font-size: 17px;
      line-height: 48px;
      font-weight: bold;
    }
  }

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

  #addStaff{
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
  .query-Box,.page-Box,.table-Box{
    /*border: 1px solid saddlebrown;*/
  }

  #detailForm{
    span{
      display: inline-block;
      margin-left: 36px;
    }
  }

  .el-select .el-input {
    width: 130px;
  }
  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }

  .el-select{
    width :128px;
  }

</style>

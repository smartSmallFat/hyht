<template>
  <div id="model-box">
    <div id="com-div1">
      <ul>
        <li>热心市民</li>

      </ul>
    </div>

    <div id="com-div2">
             <ul >
                <li v-for="v in arr2"><span>{{v.name}}</span><span>{{v.msg}}</span></li>
             </ul>
    </div>

    <div id="com-div3">
      <el-input
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 4}"
        placeholder="请输入内容"
        v-model="str"
      id="t1" >

      </el-input>
    </div>
    <el-button type="primary" id="com-btn1" size="mini" @click="send">发送</el-button>



    <div id="com-div4">
          <h3>快捷语句</h3>
      <ul>
        <li v-for="(v,i) in arr" @click="add1(v)">{{v.content}}<a href="javascript:;" @click="remove(v.id)">x</a></li>

      </ul>
    </div>
    <el-button type="primary" id="com-btn2" size="mini" @click.stop="nowShow=true">添加语句</el-button>


      <div id="com-div6" v-if="nowShow">
        <h2>添加用句</h2>
        <textarea name="" id="com-div6-t1" cols="50" rows="5" v-model="msg" @keyup.enter="add" ></textarea>
        <el-button type="success" style="position: absolute;top: 170px;right: 110px" @click="add" @click.stop="nowShow=false">确定</el-button>
        <el-button type="info" style="position: absolute;top: 170px;right: 220px" @click.stop="nowShow=false">取消</el-button>
    </div>


  </div>
</template>

<script>
    var socket;
    export default {
      name: 'Advisory',

      data() {

        return {
          str:'',
          nowShow:false,
          msg:'',
          textarea: '',
          arr: [],
          ws:[],
          lid:0,
          arr2:[]

        }
      },
      created(){
         socket=new WebSocket('ws://172.16.8.6:5555');
      this.$axios.get('/api/getLi')
        .then((res)=>{
          console.log(res.data);
          for (let i=0;i<res.data.data.length;i++){
            this.arr.push({
              id:res.data.data[i].l_id,
              content:res.data.data[i].l_Sentence
            })
          }
        });
        socket.onopen=()=>{
          socket.onmessage=(data)=>{
           var json=JSON.parse(data.data);
           this.arr2.push(json)

          }
        }

      },
      methods:{
        add(){

          this.$axios({
            method:'get',
            url:'/api/addLi',
            params:{
              m:this.msg
            }
          })
            .then((res)=>{
              console.log(res.data)
            })
            .then(()=>{
              this.arr=[];
              this.$axios.get('/api/getLi')
                .then((res)=>{
                  for (let i=0;i<res.data.data.length;i++){
                    this.arr.push({
                      id:res.data.data[i].l_id,
                      content:res.data.data[i].l_Sentence
                    })
                  }
                });
            });
          this.msg=''
        },
        add1(v){
          this.str=v.content
        },
        remove(id){
          this.$axios({
            method:'get',
            url:'/api/removeLi',
            params:{
              id:id
            }
          })
          .then((res)=>{
            console.log(res.data)
          })
          .then(()=>{
            this.arr=[];
            this.$axios.get('/api/getLi')
              .then((res)=>{
                console.log(res)
                for (let i=0;i<res.data.data.length;i++){
                  this.arr.push({
                    id:res.data.data[i].l_id,
                    content:res.data.data[i].l_Sentence
                  })
                }
              });
            })
        },
        send(){
           var aa=this.str;
           var tt={"name":"花漾客服","msg":aa};
          var data=JSON.stringify(tt);
          socket.send(data)
        }
      },
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
    background: white;
    border-bottom:1px solid #5b5b5b;


  }

  #com-div1{
    width: 1180px;
    height: 40px;
    background: rgba(175, 159, 143, 0.67);

    ul{
      width: 700px;
      height: 40px;
      margin-left: 100px;

      li{
        width: 80px;
        height: 25px;
        border: 1px solid black;
        float: left;
        margin-top: 5px;
        margin-left: 5px;
        background: white;
      }
    }

  }
  #com-div2{
    width: 700px;
    height: 500px;
    background: rgba(204, 204, 204, 0.7);
    position: absolute;
    top: 40px;
    left: 100px;
    overflow: auto;
  }
  #com-div3{
    width:702px ;
    height: 55px;
    position: absolute;
    top: 540px;
    left: 100px;


  }
  #com-btn1{
    position: absolute;
    top: 595px;
    left: 740px;
    line-height: 20px;
    font-size: 14px;

    }
#com-div4{
  width: 300px;
  height: 550px;
  position: absolute;
  top: 40px;
  right: 35px;
  background: rgb(204, 204, 204);
  overflow: auto;

  h3{
    position: absolute;
    top: 20px;
    left: 115px;
  }
  ul{
    width:260px ;
    height: 490px;
    position: absolute;
    top: 60px;
    left: 19px;
  }
  li{
    width: 258px;
    height: 50px;
    margin-top: 10px;
    cursor: pointer;
    background: rgba(175, 159, 143, 0.67);
    color: white;
    position: relative;
    padding-top: 15px;

  }
  a{
    text-decoration:none;
    color: white;
    text-align: right;
    position: absolute;
    top: 0;
    right: 5px;

}

}
  #com-btn2{
    position: absolute;
    top: 595px;
    right: 35px;
    line-height: 20px;
    font-size: 14px;
  }


  #com-div6{
    width: 400px;
    height: 260px;
    background: white;
    position: absolute;
    top: 100px;
    left: 300px;


    h2{
      position: absolute;
      top: 20px;
      left: 150px;
    }
    #com-div6-t1{
      position: absolute;
      top: 80px;
      left: 35px;
    }
  }

</style>

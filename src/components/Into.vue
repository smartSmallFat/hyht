<template>
  <div>
    <div id="Into-div1">
      <img src="./../assets/into.jpg" alt="">
      <div id="Into-div2"></div>

      <div id="Into-div3">
        <p id="Into-p1">花漾旅拍 | 管理系统</p>
        <p id="Into-p2">遇见最美的自己</p>
      </div>
    </div>

    <div id="Into-div4">
      <p id="Into-p3">欢迎登陆</p>
      <input type="text" placeholder="输入用户名" id="Into-t1" v-model="zhanghao">
      <input type="password" placeholder="输入密码" id="Into-t2" v-model="mima">

      <button id="Into-btn1" @click="login">登陆</button>
    </div>
  </div>
</template>

<script>
  import store from './../vuex/store.js'
    export default {
        name: "Into",
      store,
      data(){
          return{
               mima:'',
              zhanghao:''
          }
      },
      methods:{
          login(){

            let use=this.zhanghao;
            let pas=this.mima;
            this.$axios({
              method:'get',
              url:'/api/Loginuser',
              params:{
                user2:use,
                pass2:pas
              }
            })
              .then((res)=>{
                this.$store.state.username=res.data.data[0].s_name;
                this.$store.commit('login');
                this.$router.push({path:'/Home'});
                console.log(res);

              })
              .catch((err)=>{
                alert('账号名或密码错误')


              });



          }
      }


    }
</script>

<style scoped lang="less">
  * {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  img{
    width: 1534px;
    height: 755px;
    position: relative;
    top: 0;
    left: 0;
  }
  #Into-div2{
    width: 100%;
    height: 100%;
    background: #304E72;
    opacity: 0.6;
    position: absolute;
    top: 0;
    left: 0;
  }
  #Into-div3{
    width: 400px;
    height: 150px;
    position: absolute;
    top: 350px;
    left: 100px;
    border-left: 10px solid white;
  }
  #Into-p1{
    font-size: 30px;
    color: white;
    margin-top: 20px;
    margin-left: -75px;
    font-weight: bolder;
  }
  #Into-p2{
    font-size: 25px;
    color: white;
    margin-top: 30px;
    margin-left: -160px;
    font-weight: bold;
  }
  #Into-div4{
    width: 450px;
    height: 400px;
    background: rgba(204, 204, 204, 0.29);

    position: absolute;
    top: 200px;
    right: 50px;

  }
  #Into-p3{
    color: #304E72;
    font-size: 24px;
    position: absolute;
    top: 40px;
    right: 180px;
    font-weight: bold;
  }
  #Into-t1{
    width: 270px;
    height: 30px;
    border: 2px solid white;
    margin: 130px auto;
    margin-bottom: 0;
    display: block;
    z-index: 20;
  }
  #Into-t2{
    width: 270px;
    height: 30px;
    border: 2px solid white;
    margin: 30px auto;
    display: block;
  }
  #Into-btn1{
    width: 260px;
    height: 40px;

    background: #35618a;
    color: white;
    border: none;
    display: block;
    margin: 50px auto;
    cursor: pointer;
  }
  #Into-btn1:hover{
    background: #304E72;
  }

</style>

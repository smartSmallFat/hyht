<template>
  <div id="top">
<h2>花漾旅拍 | 管理系统</h2>
    <div>
    <p id="top-p1">{{this.$store.state.username}}</p>
    <p id="top-p2" @click="exit">| 退出</p>
    </div>
  </div>
</template>

<script>
  import store from './../vuex/store.js'

    export default{
        name: 'Top',
      store,

      methods:{
          exit(){
            this.$store.commit('exit');

        }
      }
    }

</script>

<style scoped>
  #top{
    width: 100%;
    height: 54px;
    background: #363636;
    position: relative;
    top: 0;
    left: 0;

  }

  h2{
    color: white;
    line-height: 54px;
    position: absolute;
    left: 40px;
  }

  div{
    width: 170px;
    height: 54px;
    position: absolute;
    right: 60px;

  }
  #top-p1{
    color: white;
    line-height: 54px;
    margin-left: 10px;
    text-align: left;
  }
  #top-p2{
    color: white;
    line-height: 54px;
    position: absolute;
    right: 35px;
    top: 0;
    cursor: pointer;
  }


</style>

<template>
  <div id="app">

    <Into v-if="$store.state.user"></Into>


    <div v-else>
      <Top></Top>
      <LeftNav></LeftNav>
      <Right>
        <!--<Home></Home>
        <Order></Order>
        <Meal></Meal>
        <Customer></Customer>
        <Comment></Comment>
        <Statistical></Statistical>
        <Partner></Partner>
        <Staff></Staff>-->
      </Right>
    </div>



  </div>
</template>

<script>

  import Top from './components/Top.vue'
  import LeftNav from './components/LeftNav.vue'
  import Right from './components/Right.vue'
  import Home from './components/Home.vue'
  import Order from './components/Order.vue'
  import Meal from './components/Meal.vue'
  import Customer from './components/Customer.vue'
  import Comment from './components/Comment.vue'
  import Statistical from './components/Statistical.vue'
  import Partner from './components/Partner.vue'
  import Staff from './components/Staff.vue'
  import Advisory from './components/Advisory.vue'
  import InTo from './components/Into.vue'
  import store from './vuex/store.js'


export default {
  name: 'App',
  store,
  components:{
      'LeftNav':LeftNav,
      'Top':Top,
      'Right':Right,
      'Home':Home,
      'Order':Order,
      'Meal':Meal,
      'Customer':Customer,
      'Comment':Comment,
      'Statistical':Statistical,
      'Partner':Partner,
      'Staff':Staff,
      'Advisory':Advisory,
      'Into':InTo,

  },
  data(){
    return{

    }
  }
}
</script>

<style>
#app {
  font-family: '幼圆', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}

* {
  margin: 0;
  padding: 0;
  list-style: none;
}
  body{
    background: #474747;
  }




</style>

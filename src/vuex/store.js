import Vue from 'vue'
import Vuex from 'vuex';

Vue.use(Vuex);

const store=new Vuex.Store({
  state:{
    count:1,
    user:true,
    username:''
  },
  mutations:{
    add(state){
      state.count++
    },

    exit(state){
      state.user=true
    },
    login(state){
      state.user=false
    }
  }
});

export  default store



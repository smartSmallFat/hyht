<template>
  <div id="model-box">
    <!--订单状态部分-->
    <div class="order-header">
      <ul>
        <router-link to="/order/all" tag="li" :class="[color1]" @click.native="mColor">全部订单</router-link>
        <router-link to="/order/waitConsume" tag="li"  :class="[color2]" @click.native="mColor">待消费</router-link>
        <router-link to="/order/waitComment" tag="li"  :class="[color3]" @click.native="mColor">待评价</router-link>
        <router-link to="/order/commented" tag="li"  :class="[color4]" @click.native="mColor">已评价</router-link>
      </ul>
    </div>
    <div class="tab">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
    export default{
        name: 'Order',
        data:function () {
          return{
            color1:'',
            color2:'',
            color3:'',
            color4:'',
          }
        },
        created(){
//         console.log(window.location.href)
          if(this.$route.path=='/order/commented'){
            this.color1='';
            this.color2='';
            this.color3='';
            this.color4='blue';
          }
          else if(this.$route.path=='/order/waitConsume'){
            this.color1='';
            this.color2='blue';
            this.color3='';
            this.color4='';
          }
          else if(this.$route.path=='/order/waitComment'){
            this.color1='';
            this.color2='';
            this.color3='blue';
            this.color4='';
          }
          else {
            this.color1='blue';
            this.color2='';
            this.color3='';
            this.color4='';
          }
        },
        methods:{
          mColor(){
              if(this.$route.path=='/order/commented'){
                this.color1='';
                this.color2='';
                this.color3='';
                this.color4='blue';
              }
              else if(this.$route.path=='/order/waitConsume'){
                this.color1='';
                this.color2='blue';
                this.color3='';
                this.color4='';
              }
              else if(this.$route.path=='/order/waitComment'){
                this.color1='';
                this.color2='';
                this.color3='blue';
                this.color4='';
              }
              else {
                this.color1='blue';
                this.color2='';
                this.color3='';
                this.color4='';
              }
            },
        }
    }
</script>

<style scoped lang="less">
  .blue{
    color:#409eff;
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
  .order-header{
    width: 1160px;
    height: 48px;
    line-height: 48px;
    border-bottom:1px solid #5b5b5b;
  }
  .order-header ul{
    width: 400px;
    height: 48px;
    float: left;
  }
  .order-header ul li{
    margin-left: 40px;
    float: left;
    cursor: pointer;
  }
  .order-header ul li:hover{
    color: #409eff;
  }
  .clearfix:after{
    content: '';
    clear: both;
    display: block;
  }
  .tab{
    width: 1160px;
    height: 600px;
    margin: 0 auto;
    overflow: auto;
  }
</style>

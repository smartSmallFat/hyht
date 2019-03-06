<template>
  <div id="model-box">
    <div id="home-div1">
      <div id="color-1"></div>
      <div id="font-1" @click="toOrder">
        <p class="p-num">{{msg1}}</p>
        <p class="p-tit">本月新订单</p>
      </div>

      <div id="color-2"></div>
      <div id="font-2" @click="toComment">
        <p class="p-num">{{msg2}}</p>
        <p class="p-tit">今日评价</p>
      </div>

      <div id="color-3"></div>
      <div id="font-3" @click="toCustomer">
        <p class="p-num">{{msg3}}</p>
        <p class="p-tit">新增用户</p>
      </div>

      <div id="color-4"></div>
      <div id="font-4">
        <p class="p-num">1</p>
        <p class="p-tit">新增合作</p>
      </div>


<RouterView></RouterView>
      <!--表格-->
    </div>
    <div id="home-div2">
      <div id="myChart" :style="{width: '1000px', height: '300px'}"></div>
    </div>

    <!--日历-->
  <div id="home-div3">
<calendar></calendar>
  </div>
  </div>
</template>

<script>

  import CalenDar from "./Calendar"

    export default{
        name: 'Home',
      data :function() {
        return {
          msg: '花漾月销量地区排行榜',
          msg1:'',
          msg2:'',
          msg3:'',
          trr:[],
          num:[]
        }
      },
      created() {
        this.$axios.get('/api/newOrder')
          .then((res) => {
            this.msg1=res.data.data[0].num;
          })
          .catch((err)=>{
            console.log(err)
          });
        this.$axios.get('/api/newComment')
          .then((res) => {
            this.msg2=res.data.data[0].num;
          })
          .catch((err)=>{
            console.log(err)
          });
        this.$axios.get('/api/newUser')
          .then((res)=>{
            this.msg3=res.data.data[0].num
          })
          .catch((err)=>{
            console.log(err)
          })


      },
      components:{
          'calendar':CalenDar
      },
      mounted(){
        this.$axios.get('/api/local')
          .then((res)=>{

               console.log(res.data.data);
               for(let i=0;i<res.data.data.length;i++){
                   this.trr.push(res.data.data[i].m_place);
                 this.num.push(res.data.data[i].num)
               }
            this.drawLine(this.trr);

          });



      },
      methods: {
        toComment(){
          this.$router.push({path:'/comment'})
        },
        toOrder(){
          this.$router.push({path:'/Order'})
        },
        toCustomer(){
          this.$router.push({path:'/Customer'})
        },
        drawLine(arr) {
          // 基于准备好的dom，初始化echarts实例
          let myChart = this.$echarts.init(document.getElementById('myChart'))
          // 绘制图表
          myChart.setOption({
            title: {text: '花漾月销量地区排行榜'},
            tooltip: {},
            xAxis: {
              // data: ["三亚", "毕棚沟", "巴厘岛", "北京", "上海", "深圳", "厦门"]
              data:this.trr
            },
            yAxis: {},
            series: [{
              name: '销量',
              type: 'bar',
              // data: [5, 20, 36, 10, 10, 20, 13]
              data:this.num
            }]
          });
        },
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
    background: #f3f3f3;
    border-bottom:1px solid #5b5b5b;
  }

  #home-div1{
    width: 600px;
    height: 250px;
    position: relative;
    top: 50px;
    left: 40px;

    #color-1{
      width: 70px;
      height: 90px;
      position: absolute;
      top: 5px;
      left: 30px;
      background: #57C8F2;
    }

    #font-1{
      width: 170px;
      height: 86px;
      border-bottom: 1px solid black;
      border-top: 1px solid black;
      border-right: 1px solid black;
      position: absolute;
      top: 6px;
      left: 100px;
      cursor: pointer;
    }

    .p-num{
      margin: 20px auto;
      font-size: 20px;
      font-weight: bold;
      margin-bottom: 0;
    }

    .p-tit{
      margin: 8px auto;
    }

    #color-2{
      width: 70px;
      height: 90px;
      position: absolute;
      top: 5px;
      left: 300px;
      background: #FFCD31;
    }

    #font-2{
      width: 170px;
      height: 86px;
      border-bottom: 1px solid black;
      border-top: 1px solid black;
      border-right: 1px solid black;
      position: absolute;
      top: 6px;
      left: 370px;
      cursor: pointer;
    }

    #color-3{
      width: 70px;
      height: 90px;
      position: absolute;
      top: 130px;
      left: 30px;
      background: #FF6D60;
    }

    #font-3{
      width: 170px;
      height: 86px;
      border-bottom: 1px solid black;
      border-top: 1px solid black;
      border-right: 1px solid black;
      position: absolute;
      top: 131px;
      left: 100px;
      cursor: pointer;
    }

    #color-4{
      width: 70px;
      height: 90px;
      position: absolute;
      top: 130px;
      left: 300px;
      background: #6CCAC9;
    }

    #font-4{
      width: 170px;
      height: 86px;
      border-bottom: 1px solid black;
      border-top: 1px solid black;
      border-right: 1px solid black;
      position: absolute;
      top: 131px;
      left: 370px;
      cursor: pointer;
    }
  }
  #home-div2{
    width: 1000px;
    height: 300px;
    position: absolute;
    top: 320px;
    left: 30px;

    h2{
      margin-left: 30px;
    }
  }
#home-div3{
  width: 500px;
  height: 300px;
  position: absolute;
  top: 30px;
  right: 30px;
}

</style>

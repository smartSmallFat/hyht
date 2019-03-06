<template>
  <div>
  <div id="model-box">
    <div class="H">
      <p >统计报表</p>
      <hr style="width: 1177px;margin-top:50px;position:absolute">
    </div>
    <div class="head">
    <h3>花漾旅拍销售情况统计图</h3>
    </div>
    <!--三块浮动色块-->
    <div class="color-div">
      <div class="div1">
        <h3>周销售量</h3>
        <p style="font-size:40px; position: absolute;margin-left: 100px;margin-top: 20px" >200000</p>
        <p style="margin-top:80px;margin-left: 230px ">单位:元</p>
      </div>
      <div class="div2">
        <h3>季度销售量</h3>
        <p style="font-size:40px; position: absolute;margin-left: 100px;margin-top: 20px" >500000</p>
        <p style="margin-top:80px;margin-left: 230px ">单位:元</p>
      </div>
      <div class="div3">
        <h3>年销售量</h3>
        <p style="font-size:40px; position: absolute;margin-left: 100px;margin-top: 20px" >1000000</p>
        <p style="margin-top:80px;margin-left: 230px ">单位:元</p>
      </div>
    </div>
    <div class="ccc">
      <div id="myChart" style="width:1140px;
      height: 380px;
      margin-top: 30px;
      margin-left:65px;">
      </div>
    </div>

  </div>
  </div>
</template>

<script>
    export default{
      name: 'Statistical',
      data(){
        return{
          msg:'aaa'
        }
      },
      mounted(){
        this.drawLine();
      },
      methods:{
        drawLine(){
          let myChart=this.$echarts.init(document.getElementById('myChart'));
          myChart.setOption({
            title:{text:'花漾旅拍周销售量'},
            tooltip:{},
            xAxis:{
              data:["星期一","星期二","星期三","星期四","星期五","星期六","星期天"]
            },
            axisLine:{
              lineStyle:{
                type:'solid',
                width:'1'
              }
            },
            // 刻度
            barWidth:50,//设置柱子宽度，单位为px
            yAxis:{},
            series:[{
              name:'销量',
              type:'bar',
              data:[15,20,15,15,15,20,40]
            }]
          })
        }
      }

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
  .H{
    width:100%;
    height: 50px;
    position: relative;
    p{
      margin-top:11px;
      position: absolute;
      margin-left: 500px;
      font-size: 24px;

    }
  }
  .head{
    width: 600px;
    height: 50px;
    margin-left: 250px;

    h3{
      margin-top: 10px;

    }
  }
  .color-div{
    width:1180px;
    height: 130px;
    position: relative;
    div{
      float: left;
      margin-left:70px;
    }
    .div1{
      width: 300px;
      height: 130px;
      background:#4E8DB8;
    }
    .div2,.div3{
      width:300px;
      height: 130px;
      background:#4E8DB8;
    }
    p,h3{
      color: white;
    }
  }
  .ccc{
    #myChart{
      width:1040px;
      height: 380px;
      margin-top: 30px;
      margin-left:68px;
    }

  }

</style>

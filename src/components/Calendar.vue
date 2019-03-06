<template>
  <vue-event-calendar :events="demoEvents" :class=""></vue-event-calendar>
</template>

<script>
  export default {
    data () {
      return {
        demoEvents: [{
          date: '2019/1/3',
          title: '提示',
          desc: '每天清晨第一句，先给自己打个气'
        },{
          date: '2019/1/12',
          title: '提示2',
          desc: '燃烧我的卡路里'
        }]
      }
    }
  }
</script>

<style scoped>

</style>

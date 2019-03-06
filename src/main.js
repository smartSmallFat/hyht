// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
import qs from 'qs'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import echarts from 'echarts'
import 'vue-event-calendar/dist/style.css' //1.1.10之后的版本，css被放在了单独的文件中，方便替换
import vueEventCalendar from 'vue-event-calendar'



Vue.use(vueEventCalendar, {locale: 'en'}) ;//可以设置语言，支持中文和英文
Vue.config.productionTip = false;
Vue.prototype.$axios = Axios;
Vue.prototype.$qs = qs;
Vue.use(ElementUI);
Vue.prototype.$echarts = echarts;
Vue.prototype.Router = router;



router.beforeEach((to, from, next) => {
  if (to.matched.some(res => res.meta.requireAuth)) { // 验证是否需要登陆
    if (sessionStorage.getItem('sid')) { // 查询本地存储信息是否已经登陆
      next();
    } else {
      next({
        path: '/login', // 未登录则跳转至login页面
        query: {redirect: to.fullPath} // 登陆成功后回到当前页面，这里传值给login页面，to.fullPath为当前点击的页面
      });
    }
  } else {
    next();
  }
});




new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});

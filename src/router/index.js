import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '@/components/Home'
import Order from '@/components/Order'
import Meal from '@/components/Meal'
import Customer from '@/components/Customer'
import Comment from '@/components/Comment'
import Statistical from '@/components/Statistical'
import Partner from '@/components/Partner'
import Staff from '@/components/Staff'
import Advisory from '@/components/Advisory'
import WeddingMeal from '@/components/WeddingMeal'
import Into from '@/components/Into'
import OrderAll from '@/components/OrderAll'
import OrderWaitConsume from '@/components/OrderWaitConsume'
import OrderWaitComment from '@/components/OrderWaitComment'
import OrderCommented from '@/components/OrderCommented'
import otherMeal from '@/components/OtherMeal'



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path:'/Into',
      name:'Into',
      component:Into,
      meta:{
        requireAuth:true    //判断是否要登陆
      }
    },
    {path: '/home',
      name: 'Home',
      component: Home,
      // children:[
      //   {
      //     path:'Order',
      //     component:'Order'
      //   }
      // ]

    },
    {path: '/order',
      name: 'Order',
      component: Order,
      children:[
        {path:'all',component:OrderAll},
        {path:'waitConsume',component:OrderWaitConsume},
        {path:'waitComment',component:OrderWaitComment},
        {path:'commented',component:OrderCommented},
        {path:'/',component:OrderAll}
      ]
    },
    {path: '/meal',
      component: Meal,
      name: 'Meal',
      children:[
        {
          path:'/weddingMeal',
          component:WeddingMeal
        },
        {
          path:'/otherMeal',
          component:otherMeal
        },


        {
          path:'/',   //可以一开始加载weddingMeal页  放在最后
          redirect:'/weddingMeal'
        }

      ]
    },
    {path: '/customer',
      name: 'Customer',
      component: Customer
    },
    {path: '/comment',
      name: 'Comment',
      component: Comment
    },
    {path: '/advisory',
      name: 'Advisory',
      component: Advisory
    },
    {path: '/statistical',
      name: 'Statistical',
      component: Statistical
    },
    {path: '/partner',
      name: 'Partner',
      component: Partner
    },
    {
      path: '/staff',
      name: 'Staff',
      component: Staff
    },

    {
      path:'*',   //可以一开始加载home页  放在最后
      redirect:'/home'
    }

  ]

})

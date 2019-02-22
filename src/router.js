import Vue from 'vue'
import Router from 'vue-router'
import Home from "./components/tabbar/Home.vue"
import NewsList from "./components/home/NewsList.vue"
import test01 from "./components/test/test01.vue"
import test02 from "./components/test/test02.vue"
import NewsInfo from "./components/home/NewsInfo.vue"
import GoodsList from "./components/goods/GoodsList.vue"
import GoodsInfo from "./components/goods/GoodsInfo.vue"
import Register from "./components/tabbar/Register.vue"
import Login from "./components/tabbar/Login.vue"
import ShopList from "./components/tabbar/ShopList.vue"
import Logout from "./components/home/Logout.vue"
import Cart from './components/goods/Cart.vue'
import User from './components/tabbar/User.vue'
import Start from './components/tabbar/Start.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {path:"/Cart",
    component:Cart,
    meta:{
      requireLogin:true
    }},
    {path:"/Logout",component:Logout},
    {path:"/ShopList",component:ShopList},
    {path:"/Login",component:Login},
    { path: '/', component: Start },
    { path: "/home", component: Home },
    { path: "/NewsList", component: NewsList },
    { path: "/test01", component: test01 },
    { path: "/test02/:age", component: test02 },
    { path: "/NewsInfo", component: NewsInfo},
    { path: "/GoodsList", component: GoodsList },
    { path: "/GoodsInfo/:id", component: GoodsInfo },
    { path: "/Register", component: Register },
    {path:"/User",component:User,meta:{requireLogin:true}},
    {path:'/start',component:Start}
  ]
})

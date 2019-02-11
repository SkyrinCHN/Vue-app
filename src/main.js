import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'mint-ui/lib/style.css'
//引入vuex
import Vuex from "vuex"
Vue.config.productionTip = false
//5: 设置请求的根路径 
//Vue.http.options.root = "http://127.0.0.1/vue_ser/";
//6:全局设置post 时候表音的数据组织格式为 application/x-www-form-urlencoded
//Vue.http.options.emulateJSON = true;
// 导入 MUI 的样式表， 和 Bootstrap 用法没有差别
import './lib/mui/css/mui.css'
// 导入 MUI 的样式表，扩展图标样式，购物车图标
// 还需要加载图标字体文件
import './lib/mui/css/icons-extra.css'
//引入mint-ui组件库
import {
  Header,
  Swipe,
  SwipeItem,
  Button
} from "mint-ui";
import axios from "axios";
//修改配置信息 跨域访问 保存session
axios.defaults.withCredentials = true;
//注册axios
Vue.prototype.axios = axios;
//注册Vuex
Vue.use(Vuex);
var store = new Vuex.Store({
  state: {cartCount:0},//属性保存共享全局数据
  mutations: {
    increment(state) { state.cartCount++ },
    substract(state){state.cartCount--}
  },//函数操作共享数据
  getters: {
    optCartCount:function(state){return state.cartCount}
  }//函数获取共享数据
})
Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);

//创建一个日期格式的过滤器 2018-10-10 12:11:11
Vue.filter("datetimeFilter", function (val) {
  //val 当前的日期对象
  //新建日期对象
  var data = new Date(val);
  var y = data.getFullYear();
  var m = data.getMonth() + 1;
  var d = data.getDate();
  var h = data.getHours();
  var min = data.getMinutes();
  var s = data.getSeconds();
  //拼接字符串
  m < 10 && (m = "0" + m);
  d < 10 && (d = "0" + d);
  // console.log(typeof(y));
  var year = y.toString().slice(2);
  // console.log(typeof (year));
  // console.log(year);
  return `${year}-${m}-${d} ${h}:${min}`;
})
new Vue({
  router,
  render: h => h(App),
  store,
}).$mount('#app')
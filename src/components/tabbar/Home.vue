<template>
  <div>
    <!-- 第一个头部 被剪到根组件去了 -->
    <!-- 第二个: 轮播图 -->
    <swipe-box :list="list" class="swipe"></swipe-box>
    <div id="grid">
      <ul class="mui-table-view mui-grid-view mui-grid-9">
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3" v-for="item in navList " :key="item.id">
          <!-- <router-link :to="/NewsList">
            <img :src="item.img_url">
            <div class="mui-media-body">{{item.title}}</div>
          </router-link> -->
            <router-link :to="item.url">
            <img :src="item.img_url">
            <div class="mui-media-body">{{item.title}}</div>
            </router-link>
        </li>
        <!-- <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link to="/NewsList">
            <img src="../../img/menu1.png">
            <div class="mui-media-body">新闻资讯</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link to="/GoodsList">
            <span>
              <img src="../../img/menu2.png">
            </span>
            <div class="mui-media-body">买买买</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link to="/ShopList">
            <img src="../../img/menu3.png">
            <div class="mui-media-body">购物车</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <a href="javascript:;">
            <img src="../../img/menu4.png">
            <div class="mui-media-body">支付</div>
          </a>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <a href="javascript:;">
            <img src="../../img/menu5.png">
            <div class="mui-media-body">下单</div>
          </a>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <a href="javascript:;">
            <img src="../../img/menu6.png">
            <div class="mui-media-body">更多</div>
          </a>
        </li> -->
      </ul>
    </div>
    <!-- 新闻轮播 -->
    <div class="textScroll" @mousemove="pauseAn" @mouseout="startAn">
      <div class="scroll" :style="{marginLeft: '-' + marginLeft + 'px' }">
        <span
          @click="itemClick(item,$event)"
          v-for="(item,index) in datas"
          :key="index"
          class="content"
        >
          <span class="title">【特推公告：{{item.title}}】</span>
          <span class="text">{{item.content}}</span>
        </span>
      </div>
    </div>
    <mt-
  </div>
</template>
<script>
import swipe from "../sub/swipe"
export default {
  
  methods: {
    getImages() {
      //获取轮播图片 1. 发送ajax请求   2.获取返回数据 保存到pics
      // console.log("测试测试");
      var url = "http://skyrinbyliu.applinzi.com/getImages";
      // var url = "http://localhost:5050/getImages";
      this.axios.get(url).then(result => {
        // console.log(result);
        this.list = result.data;
      });
    },
    getNavinfo(){
      var url = "http://skyrinbyliu.applinzi.com/getNavInfo";
      this.axios.get(url).then(result=>{
        this.navList = result.data;
      })
    },
    isShow(){
      this.$emit('isShow',this.bool);
    },
    leftIsShow(){
      this.$emit('leftIsShow',this.left);
    },
    getNews(){
      var id = this.id;
      var url = "http://skyrinbyliu.applinzi.com/getNewsList?id="+id;
      this.axios.get(url).then(result=>{
        this.datas=result.data.data;
        console.log(result.data.data);
      })
    },
    startAn: function() {
      // 开始
      let _this = this;
      let width = document.querySelector(".scroll").offsetWidth;
      this.an = setInterval(function() {
        if (_this.marginLeft > width) {
          _this.marginLeft = 0;
        }
        _this.marginLeft += 2;
      }, _this.time);
    },
    stopAn: function() {
      // 停止
      this.prevLeft = this.marginLeft;
      this.marginLeft = 0;
      clearInterval(this.an);
      this.$emit("on-stop-An");
    },
    pauseAn: function() {
      // 暂停动画
      clearInterval(this.an);
    },
    itemClick: function(item, e) {
      this.$emit("on-item-click", item);
    },
  },
  created() {
    //当组件对象创建成功后,就开始发送ajax请求
    this.getImages();
    this.isShow();
    this.getNavinfo();
    this.leftIsShow();
    this.getNews();
    switch (
      this.placement /** 此功能可自己扩展，展示方式，此代码中未完成扩展 **/
    ) {
      case "top":
        this.place = "top";
        break;
      case "bottom":
        this.place = "bottom";
        break;
      default:
        this.place = "bottom";
        break;
    }
  },
  mounted() {
    this.$nextTick(function() {
      this.startAn();
    });
  },
  beforeDestroy() {
    this.stopAn();
  },
  data() {
    return {
      list:[],
      bool:true, //头部是否显示 子传父 组件通信
      navList:[],
      left:false,//头部返回按钮 home页面显示
      datas:[],
      marginLeft: 0,
      prevLeft: 0,
      an: "",
      place: "",
      id:1
    };
  },
  props: {
    data: {
      type: Array
    },
    time: {
      type: Number,
      default: 100
    },
    placement: {
      type: String,
      default: "bottom"
    }
  },
  components:{"swipe-box":swipe},
};
</script>
<style>
.textScroll{
    background-color: #f7f7f7;
    border-bottom: 1px solid #CCC;
    width: 100%;
}
.scroll{
    height: 32px;
    line-height: 28px;
    padding: 4px 0;
    white-space: nowrap;
}
  .scroll.content{
        width: 100%;
        word-wrap: normal;
        margin-right: 100px;
    }
  .title{
        color: #eb0606;
        font-weight: bold;
    }
  .text {
        color: #161514;
  }
.swipe {
  width: 100%;
  height: 130px;
}
.swipe img {
  width: 100%;
}
#grid ul li img {
  width: 60px;
}
#grid>ul{
  background: #fff;
}
#grid>ul>li{
  border: 0;
}
header{
  border-radius: 3px;
}
</style>


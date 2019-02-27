<template>
  <div class="home">
    <!-- 第一个头部 被剪到根组件去了 -->
    <!-- 第二个: 轮播图 -->
    <swipe-box :list="list" class="swipe"></swipe-box>
    <!-- 导航布局 -->
    <div id="grid">
      <ul class="nav-info">
        <li class="nav-item"
          v-for="item in navList "
          :key="item.id"
        >
          <!-- <router-link :to="/NewsList">
            <img :src="item.img_url">
            <div class="mui-media-body">{{item.title}}</div>
          </router-link>-->
          <router-link :to="item.url">
            <img :src="item.img_url">
            <p class="mui-media-body">{{item.title}}</p>
          </router-link>
        </li>
      </ul>
    </div>
    <!-- 分割线 -->
    <!-- <div class="link"></div> -->
    <div class="section1">
      <!-- <img src="http://localhost:5050/img/section3.png" > -->
      <img src="http://skyrinbyliu.applinzi.com/img/section3.png" >
      <div class="section1-main">
        <div class="section1-info" v-for="(item,index) in sectionList" :key="index">
          <p class="info-title">{{item.title}}</p>
          <p class="info-detail">{{item.detail}}</p>
          <div class="info-img">
            <img :src="item.img1_url">
            <img :src="item.img2_url">
          </div>
        </div>
      </div>
    </div>
    <div class="section2">
      <!-- <img src="http://localhost:5050/img/section1.png"> -->
      <img src="http://skyrinbyliu.applinzi.com/img/section1.png" >
      <div class="section2-main">
        <div class="section2-info" v-for="(item,index) in section2List" :key="index">
         <p :style="item.style">{{item.title}}</p>
         <p class="info-detail">{{item.detail}}</p>
         <img :src="item.img_url" >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Swipe, SwipeItem } from "mint-ui";
import swipe from "../sub/swipe";
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
    getSectionList(){
      var url ='http://skyrinbyliu.applinzi.com/getSectionList';
      // var url = 'http://localhost:5050/getSectionList'
      this.axios.get(url).then(result=>{
        this.sectionList=result.data;
      })
    },
     getSection2List(){
      var url ='http://skyrinbyliu.applinzi.com/getSection2List';
      // var url = 'http://localhost:5050/getSection2List'
      this.axios.get(url).then(result=>{
        this.section2List=result.data;
      })
    },
    getNavinfo() {
      var url = "http://skyrinbyliu.applinzi.com/getNavInfo";
      this.axios.get(url).then(result => {
        this.navList = result.data;
      });
    },
    isShow() {
      this.$emit("isShow", this.bool);
    },
    leftIsShow() {
      this.$emit("leftIsShow", this.left);
    },
    getNews() {
      var id = this.id;
      var url = "http://skyrinbyliu.applinzi.com/getNewsList?id=" + id;
      this.axios.get(url).then(result => {
        this.datas = result.data.data;
        console.log(result.data.data);
      });
    },
    bottomIsShow() {
      this.$emit("bottomIsShow", this.bottomShow);
    }
  },
  created() {
    //当组件对象创建成功后,就开始发送ajax请求
    this.getImages();
    this.isShow();
    this.getNavinfo();
    this.leftIsShow();
    this.getNews();
    this.bottomIsShow();
    this.getSectionList();
    this.getSection2List();
  },
  mounted() {},
  beforeDestroy() {},
  data() {
    return {
      list: [],
      bool: true, //头部是否显示 子传父 组件通信
      navList: [],
      left: false, //头部返回按钮 home页面显示
      datas: [],
      marginLeft: 0,
      prevLeft: 0,
      an: "",
      place: "",
      id: 1,
      bottomShow: true,
      sectionList:[],
      section2List:[],
    };
  },
  props: {},
  components: { "swipe-box": swipe }
};
</script>
<style>
.section2-main{
  display: flex;
  flex-wrap: wrap;
}
.section2-info{
  /* border: 1px solid #d81d06; */
  text-align: center;
  width: 25%;
}
.section2-info img{
  width: 100%;
}
.section2>img{
  width: 100%;
}
.section2{
  background: #fff;
}
*{
  padding: 0;
  margin: 0;
}
.info-img{
  display: flex;
  justify-content: space-around;
  width: 100%;
}
.info-img img{
  width: 49%;
  height: 49%;
}
.info-title{
  color: #d81d06;
  font-size: 14px;
  margin-bottom: 0;
}
.info-detail{
  color: #5f5d5d;
  font-size: 10px;
  margin-bottom: 0;
}
.section1{
  background: #fff;
}
.section1>img{
  width: 100%;
}
.section1-info{
  /* border:  1px solid #d81d06; */
  width: 50%;
  padding-top: 10px;
  /* margin-bottom: 10px; */
  border:  1px solid #ecebeb;
}
.section1-main{
  width: 95%;
  /* border: 1px solid #d81d06; */
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-left: 2.5%;
}
.section1-name{
  width: 100%;
  /* border: 1px solid #d81d06; */
  text-align: center;
  color: #d81d06;
  font-size: 18px;
  height: 30px;
  background: #e0dfdf;
  /* border-radius: 5px; */
  line-height: 30px;
}
.home-middle{
  margin-top: 10px;
  display: flex;
  justify-content: space-around;
}
.swipe-info {
  height: 200px;
  width: 49%;
  border: 1px solid #d81d06;
}

.link {
  border-bottom: 1px solid #d3d1d1;
  width: 90%;
  margin-top: 10px;
  margin-left: 5%;
}
/* .home {
  position: fixed;
  width: 100%;
  height: 100%;
  background: #fff;
} */
.news .news-title {
  height: 22px;
  overflow: hidden;
  line-height: 22px;
}
.news {
  display: flex;
}
.news .news-title {
  color: #d81d06;
}
.swipe {
  width: 100%;
  height: 130px;
}
.swipe img {
  width: 100%;
}
/* #grid{
  border-radius:   4px;
  border: 1px solid #d81d06;
} */
#grid ul li img {
  width: 50px;
}

#grid > ul {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  justify-content: space-between;
  background: #fff;
}
#grid > ul > li {
  text-align: center;
  width: 25%;
  border: 0;
  height: 100px;
  margin-top: 10px;
}
/* #grid{
  padding-top: 10px;
} */
#grid > ul > li p {
  font-size: 14px;
}
</style>


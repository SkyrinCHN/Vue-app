<template>
  <div class="app-container" :class="[show[0]!=true?'top':'app-container']">
    <!-- top -->
    <!-- 第一个: 顶部状态栏 小刘商店 -->
    <mt-header title="Skyrin Store" class="store-title" fixed v-if="show[0]">
      <router-link to slot="left">
        <mt-button icon="back" v-if="left[0]" @click="backTo"></mt-button>
      </router-link>
      <mt-button icon="more" slot="right" @click=""></mt-button>
      
    </mt-header>

    <router-view
      v-on:isShow="listenMySon"
      v-on:leftIsShow="leftShow"
      v-on:bottomIsShow="listenBottom"
    ></router-view>

    <!-- tabbar -->
    <div id="tabbar" v-if="bottomShow[0]">
      <nav class="mui-bar mui-bar-tab">
        <router-link
          class="mui-tab-item"
          :to="item.naviTo"
          v-for="(item,index) in list"
          :key="index"
          :class="{'mui-active':index==number}"
        >
          <div @click="getClass(index)">
            <span :class="item.span1"></span>
            <span :class="item.span2">{{item.name}}</span>
          </div>
        </router-link>
      </nav>
    </div>
    <div></div>
  </div>
</template>
<script>
// import customProup from "./components/sub/customProup";
export default {
  data() {
    return {
      show: [],
      left: [],
      list: [
        {
          span1: "mui-icon mui-icon-home",
          span2: "mui-tab-label",
          name: "首页",
          naviTo: "/home",
          routerClass: "mui-tab-item"
        },
        {
          span1: "mui-icon mui-icon-contact",
          span2: "mui-tab-label",
          name: "会员中心",
          naviTo: "/user",
          routerClass: "mui-tab-item"
        },
        {
          span1: "mui-icon mui-icon-extra mui-icon-extra-cart",
          span2: "mui-tab-label",
          name: "购物车",
          naviTo: "/Cart",
          routerClass: "mui-tab-item"
        },
        {
          span1: "mui-icon mui-icon-search",
          span2: "mui-tab-label",
          name: "搜索",
          naviTo: "",
          routerClass: "mui-tab-item"
        }
      ],
      number: 0,
      bottomShow: []
    };
  },

  methods: {
    //返回上一页
    backTo() {
      this.$router.go(-1);
    },
    //右边点击按钮测试
    handelClick() {
      console.log(123);
    },
    //底部导航栏 点击 添加 蓝色字体的类
    getClass(index) {
      console.log(index);
      this.number = index;
    },
    //头部 显示
    listenMySon(msg) {
      // this.show=msg;
      console.log(this.show);
      this.$set(this.show, 0, msg);
    },
    //头部 返回按钮是否显示
    leftShow(msg) {
      this.$set(this.left, 0, msg);
      console.log("left: " + this.left[0]);
    },
    //底部导航栏  显示
    listenBottom(msg) {
      this.$set(this.bottomShow, 0, msg);
    }
  }
};
</script>
<style scoped>
/* #tabbar{
  position: fixed;
  bottom: 0;
  left: 0;
} */
.app-container {
  padding-top: 40px;
  padding-bottom: 50px;
  /* overflow-x: hidden; */
}
.top {
  padding-top: 0;
  /* padding-bottom: 50px; */
  /* overflow-x: hidden; */
  height: 100%;
  z-index: 10;
}
.mui-bar-tab .mui-tab-item.mui-active {
  color: #d81d06;
}
.mui-bar-tab .mui-tab-item-tao {
  display: table-cell;
  overflow: hidden;
  width: 1%;
  height: 50px;
  text-align: center;
  vertical-align: middle;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.mui-bar-tab .mui-tab-item-tao .mui-icon {
  top: 3px;
  width: 24px;
  height: 24px;
  padding-top: 0;
  padding-bottom: 0;
}

.mui-bar-tab .mui-tab-item-tao .mui-icon ~ .mui-tab-label {
  font-size: 11px;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
}

</style>

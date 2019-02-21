<template>
  <div class="app-container" :class="[show[0]!=true?'top':'app-container']">
    <!-- top -->
    <!-- 第一个: 顶部状态栏 小刘商店 -->
    <mt-header title="小刘商店" fixed v-if="show[0]">
      <router-link to="/home" slot="left" v-if="left[0]">
        <mt-button icon="back"></mt-button>
        <!-- <mt-button @click="handleClose">关闭</mt-button> -->
      </router-link>
      <!-- <mt-button icon="more" slot="right"></mt-button> -->
    </mt-header>
    <router-view v-on:isShow="listenMySon" v-on:leftIsShow="leftShow" v-on:bottomIsShow="listenBottom"></router-view>

    

    <!-- tabbar -->
    <div id="tabbar" v-if="bottomShow[0]">
      <nav class="mui-bar mui-bar-tab" >
        <router-link  class="mui-tab-item "  :to="item.naviTo" v-for="(item,index) in list" @click="getClass(index)" :class="{'mui-active':index==number}"
        >
          <span :class="item.span1" ></span>
          <span :class="item.span2">{{item.name}}</span>
        </router-link>
      </nav>
    </div>
    <div></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: [],
      left: [],
      list:[
        {span1:'mui-icon mui-icon-home',span2:'mui-tab-label',name:'首页',naviTo:'/home',routerClass:'mui-tab-item'},
        {span1:'mui-icon mui-icon-contact',span2:'mui-tab-label',name:'会员中心',naviTo:'/Login',routerClass:'mui-tab-item'},
        {span1:'mui-icon mui-icon-extra mui-icon-extra-cart',span2:'mui-tab-label',name:'购物车',naviTo:'/Cart',routerClass:'mui-tab-item'},
        {span1:'mui-icon mui-icon-search',span2:'mui-tab-label',name:'搜索',naviTo:'',routerClass:'mui-tab-item'},
      ],
      number:0,
      bottomShow:[],
    };
  },
  

  methods: {
    getClass(index){
      this.number=index
    },
    backTo(){
      this.router.go(-1);
    },
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
    listenBottom(msg){
      this.$set(this.bottomShow,0,msg)
    }
  }
};
</script>

<style scoped>
.app-container {
  padding-top: 40px;
  padding-bottom: 50px;
  /* overflow-x: hidden; */
}
.top {
  padding-top: 0;
  padding-bottom: 50px;
  /* overflow-x: hidden; */
  height: 100%;
  z-index: 10
}
 .mui-active {
  color: #2676ff;
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
#tabbar{
  height: 50px;
}

</style>

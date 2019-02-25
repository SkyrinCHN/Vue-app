
  <!-- <div class="goods-info">
    <swipe-box :list="list"></swipe-box>
    <div class="link"></div>
  </div> -->
    <!-- <div class="price">
      <p class="new-price">¥{{info.price*.88}}</p>
      <p class="old-price">¥{{info.price}}</p> -->
    <!-- <div class="mui-card">
      <div class="mui-card-header">{{info.name}}</div>
      <div class="mui-card-content">
        <div class="mui-card-inner">
          <div class="price">
            <p>
              市场价:
              <del>¥{{info.price}}</del>
            </p>
            <p>
              优惠价:
              <span>¥{{info.price*.88}}</span>
              <span class="cheap">Just Today</span>
            </p>
          </div>
          <div class="mui-numbox" data-numbox-min="1" data-numbox-max="9">
            <button class="mui-btn mui-btn-numbox-minus" type="button" @click="less">-</button>
            <input id="test" class="mui-input-numbox" type="number" v-model="val">
            <button class="mui-btn mui-btn-numbox-plus" type="button" @click="more">+</button>
          </div>
        </div>
      </div>
      <div class="mui-card-footer">
        <button class="buy">立即购买</button>
        <button class="in-cart" @click="addCart" >加入购物车</button>
      </div>
    </div> -->
<template>
  <div class="goods">
    <swipe-box :list="list"></swipe-box>
    <div class="link"></div>
    <div class="goods-info">
      <div class="price">
        <p class="now-price">¥{{info.price*.88}}</p>
        <span class="time-kill">限时秒杀</span>
        <span class="old-price">¥{{info.price}}</span>
      </div>
      <div class="goods-name">
        <p>{{info.name}}</p>
        <div class="goods-tab">
          <span>快递:0.00</span>
          <span>月售:220</span>
          <span>重庆江津</span>
        </div>
      </div>
      <div class="tab-bar">
        <div class="tab-item" v-for="(item,index) in tabList" :key="index">
          <img :src="item.img_url">
          <p>{{item.name}}</p>
        </div>
        <div class="add-cart"><button @click="addCart">加入购物车</button></div>
        <div class="buy"><button>立即购买</button></div>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
//引入轮播图组件
import swipe from "../sub/swipe";
export default {
  data() {
    return { id: this.$route.params.id, list: [], val: 1, info: {} ,
      tabList:[
        {id:1,name:'客服',img_url:'http://skyrinbyliu.applinzi.com/img/help.png'},
        {id:2,name:'店铺',img_url:'http://skyrinbyliu.applinzi.com/img/shop.png'},
        {id:3,name:'收藏',img_url:'http://skyrinbyliu.applinzi.com/img/shoucang.png'}
      ],
      bottomShow:false, //底部是否显示
      topShow:true, //头部是否显示
      leftShow:true,//返回按钮是否显示
    }
    
  },
  methods: {
    leftIsShow(){
      this.$emit('leftIsShow',this.leftShow)
    },
    bottomIsShow(){
      this.$emit('bottomIsShow',this.bottomShow)
    },
    isShow(){
      this.$emit('isShow',this.topShow)
    },
    getGoodsInfo() {
      var id = this.id;
      var url = "http://skyrinbyliu.applinzi.com/getProduct?id="+id;
      this.axios.get(url).then(result => {
         this.info= result.data.data
        console.log(this.info);
      });
    },
    // getGoodsInfo(){
    //     //1:获取参数 id
    //     var id = this.id;
    //     //2:发送ajax请求获取商品信息
    //     var url = "http://127.0.0.1:3000/getProduct?id="+id;
    //     this.axios.get(url).then(result=>{
    //         this.info = result.data.data;
    //     });
    //   },
    getImageList() {
      var url = "http://skyrinbyliu.applinzi.com/getGoodsInfo";
      this.axios.get(url).then(result => {
        this.list = result.data;
        console.log(this.list);
      });
    },
    less() {
      if (this.val > 1) {
        this.val--;
      }
    },
    more() {
      if (this.val < 998) {
        this.val++;
      }
    },
    addCart() {
      //参数 uid = 1 pid count price
      if(sessionStorage['loginInfo']==null){
        Toast('请登录');
        this.$router.replace('/Login')
      }else{
      var pid = this.id,
        count = this.val,
        price = 9.9,
        uid =uid;
      //发送ajax请求将数据发送到服务器
      var url =
        "http://skyrinbyliu.applinzi.com/addCart?pid="+ 
        pid +
        "&count=" +
        count +
        "&price=" +
        price+"&uid="+uid;
      this.axios.get(url).then(result => {
         //获取返回结果
        //显示提示信息
        // console.log(result.data);
        if (result.code > 0) {
          //如果商品添加成功 修改全局共享变量 cartCount
          this.$store.commit("increment");  
          Toast(result.data.msg);
        } else {
          Toast(result.data.msg);
        }
      });
    }
    }
  },
  created() {
    this.getImageList();
    this.getGoodsInfo();
    this.bottomIsShow();
    this.isShow();
    this.leftIsShow();
  },
  components: { "swipe-box": swipe }
};
</script>
<style scoped>
*{
  padding: 0;
  margin: 0;
}
.add-cart{
  width: 30%;
}
.add-cart button{
  width: 100%;
  height: 40px;
  border-radius: 4px 0 0 4px;
  border: 0;
  background: #d81e07;
  color: rgb(255, 255, 255);
}
.buy{
  width: 30%;
}
.buy button{
  width: 100%;
  height: 40px;
  border-radius: 0 4px 4px 0;
  border: 0;
  background: #d47b07;
  color: #fff;
}
.tab-item{
  width: 13.3%;
  border: 1px solid rgb(230, 229, 229);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.tab-item p{
  font-size: 10px;
  color: #252525;
}
.tab-bar{
  width: 100%;
  /* border: 1px solid red; */
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  align-items: center;
  text-align: center;
}
.goods-tab{
  margin-left: 10px;
  margin-top: 5px;
  display: flex;
  justify-content: space-between
}
.goods-tab span{
 font-size: 10px;
 color: #8c8c8c;
}
.goods-tab span:last-child{
  margin-right: 10px;
}
.goods-name{
  margin-top: 10px;
}
.goods-name p{
  margin-left: 10px;
  color: #000;
  font-size: 20px;
}
.price{
  /* margin-top: 5px; */
  /* background: linear-gradient(left,#006699,#fff) */
  background: #d81e06;
}
.price .time-kill{
  margin-left: 10px;
  color: #fff;
  font-size: 14px;
}
.price .now-price{
  padding-top: 10px;
  margin-left: 10px;
  color: #fff;
  font-size: 20px;
}
.price .old-price{
  margin-left: 10px;
  color: #fff;
  font-size: 10px;
  text-decoration: line-through;
}
.goods{
  background: #fff;
}
.link{
  border-bottom: 1px solid #dbd9d9;
  margin-top: 5px;
}
/* .price{
  background: linear-gradient(left,#d81e07,rgb(212, 35, 189));
  height: 50px;
}
.price .new-price{
  color: #fff;
  font-size: 20px;
} */
/* .mui-card-footer button {
  border: 1px solid #e83632;
  color:#e83632;
  background: #fff;
  border-radius: 4px;
  width: 159px;
  height: 40px;
}
.mui-card-footer button:hover{
  background: #e83632;
  color: #fff;
}
.mui-card-footer .in-cart {
  background: #fff;
  color:#26a2ff;
  border: 1px solid #26a2ff;
}
.goods-info .mui-card-inner .price span{
  color: #e83632;
  font-size: 20px;
}
.goods-info .mui-card-inner .price span.cheap{
  margin-left: 80px;
  font-size: 30px;
  font-family:Hurricane;
} */
</style>

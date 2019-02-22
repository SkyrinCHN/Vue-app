<template>
  <div class="user">
    <!-- <div class="top">
      <img :src="cmera_url">
    </div>-->
    <div class="userInfo">
      <div class="userInfo-Left">
        <img :src="userImage_url">
      </div>
      <div class="userInfo-Middle">
        <div class="user-name">
          <p>{{userName}}</p>
        </div>
        <div class="wechat">
          <p>微信名:{{wechat}}</p>
        </div>
      </div>
      <div class="userInfo-Right">
        <img :src="userErweima_url">
        <img :src="toRight_url">
      </div>
    </div>
    <div class="userAction">
      <div v-for="(item,index) in list" :key="index" class="items">
        <div class="userAction-item">
          <div class="item-pic">
            <img :src="item.img_url">
          </div>
          <div class="item-content">
            <p>{{item.content}}</p>
          </div>
          <div class="item-to">
            <img :src="toRight_url">
          </div>
        </div>
        <div class="link-top"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userImage_url: "http://skyrinbyliu.applinzi.com/img/user.jpg",
      userErweima_url: "http://skyrinbyliu.applinzi.com/img/erweima.png",
      userName: "Alice",
      wechat: "Skyrinsina_euro",
      cmera_url: "http://skyrinbyliu.applinzi.com/img/camera.png",
      toRight_url: "http://skyrinbyliu.applinzi.com/img/right.png",
      bottomShow: true, //底部是否显示
      bool: true, //顶部是否显示
      list: [
        { img_url: "http://skyrinbyliu.applinzi.com/img/pay.png", content: "支付" },
        { img_url: "http://skyrinbyliu.applinzi.com/img/like.png", content: "收藏" },
        { img_url: "http://skyrinbyliu.applinzi.com/img/photo.png", content: "相册" },
        { img_url: "http://skyrinbyliu.applinzi.com/img/card.png", content: "卡包" },
        { img_url: "http://skyrinbyliu.applinzi.com/img/biaoqing.png", content: "表情" },
        { img_url: "http://skyrinbyliu.applinzi.com/img/setting.png", content: "设置" }
      ]
    };
  },
  methods: {
    //子传父 底部是否显示
    bottomIsShow() {
      this.$emit("bottomIsShow", this.bottomShow);
    },
    //子传父 顶部是否显示
    isShow() {
      this.$emit("isShow", this.bool);
    }
  },
  created() {
    this.bottomIsShow();
    this.isShow();
  }
};
</script>
<style scoped>
* {
  /* border: 1px solid red; */
  padding: 0;
  margin: 0;
}
.items{
  margin-top: 15px;
}
.link-top {
  width: 92%;
  height: 1px;
  border: 1px solid #cccccc;
  margin-left: 5%;
}
.userAction-item {
  display: flex;
  /* justify-content: space-between */
  align-items: center;
  /* border-bottom: 1px solid #bbb9b9; */
}
.userAction-item .item-pic img {
  margin-left: 20px;
  width: 32px;
}
.userAction-item .item-content p {
  font-size: 18px;
  color: #000;
  margin-left: 20px;
  margin-bottom: 5px;
}
.userAction-item .item-to {
  margin-left: 60%;
  margin-top: 4px;
  width: 20px;
}

.userAction {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
}
.userAction .userAction-li p {
  display: inline;
}

.user .top {
  float: right;
  margin-right: 15px;
}
.user {
  background-color: #fff;
  /* margin-top: 40px; */
}
.userInfo {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 150px;
  align-items: center;
  box-shadow: 4px 5px 5px #8c8c8c;
  justify-content: space-between;
}
.user .userInfo .userInfo-Left img {
  width: 55px;
  border-radius: 5px;
}
.userInfo-Left {
  margin-left: 20px;
}
.userInfo-Middle {
  height: 55px;
}
.user-name p {
  font-size: 22px;
  color: #000;
}
.wechat p {
  margin-top: 10px;
  font-size: 15px;
}

.userInfo-Right {
  margin-top: 33px;
}
.userInfo-Right img:first-child {
  width: 16px;
  margin-right: 20px;
}
.userInfo-Right img:last-child {
  width: 15px;
  margin-right: 10px;
}
.userAction {
  display: flex;
  height: 400px;
}
</style>



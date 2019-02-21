<template>
  <div class="user">
    <div class="top">
      <img :src="cmera_url">
    </div>
    <div class="userInfo">
      <div class="userInfo-Left">
        <img :src="userImage_url">
      </div>
      <div class="userInfo-Right">
        <div class="userInfo-Top">
          <p>{{userName}}</p>
        </div>
        <div class="userInfo-Buttom">
          <span>微信名:{{wechat}}</span>
          <img :src="userErweima_url">
          <span class="arrow">12</span>
        </div>
      </div>
    </div>
    <div class="userAction"></div>
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
      cmera_url: "http://skyrinbyliu.applinzi.com/img/camera.png"
    };
  }
};
</script>
<style scoped>
* {
  border: 1px solid red;
  padding: 0;
  margin: 0;
}

.arrow::after {
  content: "";
  width: 15rpx;
  height: 15rpx;
  border-top: 10rpx solid rgb(134, 72, 72);
  border-right:10rpx solid rgb(167, 36, 36);
  transform: rotate(45deg);
}

.user .top {
  float: right;
  margin-right: 15px;
}
.user {
  height: 100%;
  background-color: #fff;
}
.userInfo {
  display: flex;
  width: 100%;
  height: 150px;
  align-items: center;
  box-shadow: 5px 5px 5px #8c8c8c;
  /* justify-content: space-between */
}
.user .userInfo .userInfo-Left img {
  width: 50px;
  border-radius: 5px;
}
.userInfo-Top p {
  font-size: 20px;
  color: #000000;
  font-weight: bold;
}
.userInfo-Buttom {
  align-items: center;
  justify-content: space-around;

}
.userInfo-Buttom span {
  color: #524e4e;
}
.userAction {
  display: flex;
  height: 400px;
}
</style>



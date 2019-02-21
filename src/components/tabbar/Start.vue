<template>
  <div class="start">
    <div class="start-top">
      <div class="logo">
        <img :src="logo_url">
      </div>
      <div class="title">
        <p>{{storeName}}</p>
      </div>
      <div class="start-info">
        <div class="holdon-button">
          <router-link to="/home" replace class="href">不急,先看一下</router-link>
        </div>
        <div class="login-button">
         <button @click="toLogin">登录</button>
        </div>
        <div class="register-button">
          <button @click="toRegister">注册</button>
        </div>
      </div>
    </div>
    <div class="start-bottom">
      <p>Copyright &copy 2018-2019 Liuhai</p>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      logo_url:'http://skyrinbyliu.applinzi.com/img/logo.png',
      bool: false,//头部是否显示
      bottomShow:false,//底部是否显示
      storeName:'Skyrin Store'
    }
  },
   created() {
    this.isShow();
    this.bottomIsShow();
  },
  methods: {
    isShow() {
      this.$emit("isShow", this.bool);
    },
    bottomIsShow(){
      this.$emit("bottomIsShow",this.bottomShow)
    },
    toLogin(){
      this.$router.replace('/Login')
    },
    toRegister(){
      this.$router.replace('/Register')
    }
}
}
</script>
<style scoped>

  /* *{
    border: 1px solid #49b6c9
  } */
  .start-bottom{
    margin-top: 6rem;
    text-align: center
  }
   .start-bottom p{
     color: #8f8f94;
   }
  .logo img{
    width: 192px;
    height: 128px;
  }
  .href{
    color: #d81e06;
    font-size: 10px;
  }
  .start-info{
    /* display: flex; */
    /* justify-content: center; */
    margin-top: 120px;
    text-align: center;
  }
  .login-button{
    margin-top: 15px;
  }
  .register-button{
    margin-top: 20px;
  }
  .start-info button{
    width: 70%;
    height: 40px;
  }
  .start-info .holdon-button p{
    color: #d81e06;
  }
  .title{
    margin-top: 5px;
    text-align: center;
  }
  .title p{
    font-size: 33px;
    line-height: 40px;
    font-family:Arial, Helvetica, sans-serif;
    /* text-indent: 15px; */
    color:#d81e06;
  }
  .login-button button{
    background: #d81e06;
    color: #fff;
  }
  .register-button button{
    background: #497cc9;
    color: #fff;
  }
  .start{
   position: fixed;
   height: 100%;
   width: 100%;
   background: #fff;
  }
  .logo {
    display: flex;
    justify-content: center;
    /* align-items: center; */
    margin-top: 70px;
  }
</style>

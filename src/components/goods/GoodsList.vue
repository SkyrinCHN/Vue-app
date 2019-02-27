<template>
  <div class="goods-list">
    <div class="goods-item" v-for="(l,index) in list" :key="index">
      <img :src="l.img_url" @click="jumpDetails" :data-id="l.id">
      <p class="title">{{l.name}}</p>
      <div class="goods-info">
        <div class="price">
          <span class="now">¥{{l.price}}</span>
          <!-- <span class="old">¥{{l.price}}</span> -->
        </div>
        <!-- <div class="count">
          <p>
            热卖中 剩余
            <span>{{l.bank}}</span>件
          </p>
        </div> -->
      </div>
    </div>
    <mt-button size="large" type="danger" @click="getMore()">加载更多</mt-button>
  </div>
</template>
<script>
export default {
  data() {
    return { list: [], pageIndex: 0, pageCount: 1, pageSize: 6,left:true,
    topShow:true,bottomShow:true };
  },
  methods: {
    topIsShow(){
      this.$emit('isShow',this.topShow)
    },
    bottomIsShow(){
      this.$emit('bottomIsShow',this.bottomShow)
    },
    jumpDetails(e){
      // 点击事件 获取点击事件里的dataset自定义属性 id 的值
      var id = e.target.dataset.id;
      console.log(id);
      this.$router.push("/GoodsInfo/"+id);
    },
    leftIsShow(){
      this.$emit('leftIsShow',this.left);
    },
    getMore() {
      this.pageIndex++;
      var pno = this.pageIndex;
      var ps = this.pageSize;
      var url =
        "http://skyrinbyliu.applinzi.com/getGoodsList?pno=" + pno + "&pageSize=" + ps;
      this.axios.get(url).then(result => {
        var rows = this.list.concat(result.data.data);
        this.list = rows;
        console.log(this.list);
      });
    }
  },
  created() {
    this.getMore();
    this.leftIsShow();
    this.topIsShow();
    this.bottomIsShow();
  }
};
</script>
<style scoped>
/* 商品列表样式 */
.goods-list {
  /* 弹性布局 */
  display: flex;
  /* 子元素换行 */
  flex-wrap: wrap;
  /* 两端对齐 */
  justify-content: space-between;
  /* 加点内边距 */
  padding: 4px;
  /* 背景色 */
  background: #ffff;
}
.goods-list .goods-item {
  border-radius: 2px;
  border: 1px solid rgb(224, 224, 224);
  width: 49.8%;
  /* 阴影 */
  /* box-shadow: 0 0 10px #ccc; */
  
  /* 加点外边距 Y轴 4px */
  margin: 1px 0;
  padding: 2px;
  display: flex;
  /* 排列方式:垂直 */
  flex-direction: column;
  min-height: 150px;
  /* 子元素两端对齐 */
  justify-content: space-between;
}
.goods-list .goods-item img {
  width: 100%;
  /* height: 100%; */
  height: 170px;
}
.goods-list .price .now {
  color: red;
  font-size: 16px;
}
.goods-list .price .old {
  text-decoration: line-through;
  font-size: 10px;
}
.goods-list .goods-item span {
  margin: 0 5px;
}
.goods-list .goods-item p {
  /* width: 100px; */
  height: 40px;
  /* white-space: pre-line; */
  text-overflow: ellipsis;
  overflow: hidden;
  padding-left: 4px;
  font-size: 13px;
  color: #000;
}
.goods-list .goods-item .count p {
  color: red;
}
.goods-list .goods-item .count p span {
  color: red;
  font-size: 20px;
}
/* .goods-list .goods-item .price{
  justify-content: space-between;
} */
</style>


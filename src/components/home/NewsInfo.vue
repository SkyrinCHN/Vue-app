<template>
  <div id="newsInfo">
    <h3>{{info.title}}</h3>
    <h5>{{info.ctime|datetimeFilter}}</h5>
    <p>{{info.content}}</p>
    <comment-box :id="id"></comment-box>
  </div>
</template>
<script>
import comment from "../sub/comment.vue";
export default {
  data() {
    return { info: [],
     id: this.$route.query.id,
     topShow:true,//头部是否显示
     leftShow:true,//头部返回是否显示
     bottomShow:true,//底部是否显示
      };
  },
  created() {
    this.getNewsInfo();
    this.topIsShow();
    this.leftIsShow();
    this.bottomIsShow();
  },
  methods: {
    //头部header 显示
    topIsShow(){
      this.$emit('isShow',this.topShow)
    },
    //头部 返回按钮 显示
    leftIsShow(){
      this.$emit('leftIsShow',this.leftShow)
    },
    //底部 tabbar 显示
    bottomIsShow(){
      this.$emit('bottomIsShow',this.bottomShow)
    },
    getNewsInfo() {
      var id = this.$route.query.id;
      // console.log(this.$route.query.id);
      var url = "http://skyrinbyliu.applinzi.com/getNewsInfo?id=" + id;
      this.axios.get(url).then(result => {
        this.info = result.data.data;
        console.log(this.info);
      });
    }
  },
  components: { "comment-box": comment }
};
</script>
<style scoped>
h3 {
  font-size: 18px;
  text-align: center;
}
h5 {
  text-align: right;
  padding-right: 20px;
}
p {
  font-size: 14px;
}
</style>

<template>
  <div id="NewsList">
    <ul
      class="mui-table-view mui-table-view-chevron"
    >
      <li v-for="l in list" :key="l.id" class="mui-table-view-cell mui-media">
        <router-link class="mui-navigate-right" :to="'/NewsInfo?id='+l.id">
          <img class="mui-media-object mui-pull-left" :src="l.img_url">
          <div class="mui-media-body">
            {{l.title}}
            <p class="mui-ellipsis">{{l.content}}</p>
          </div>
          <p class="button">
            <span>{{l.ctime|datetimeFilter}}</span>
            <span>
              <img src="http://skyrinbyliu.applinzi.com/img/eye.png" alt>
              <span class="point">{{l.point}}</span>
            </span>
          </p>
        </router-link>
      </li>
    </ul>
    <mt-button size="large" type="danger" icon="more" @click="getNews">加载更多</mt-button>
  </div>
</template>

<script>
import { InfiniteScroll } from "mint-ui";
export default {
  data() {
    return {
      list: [],
      pageIndex: 0,
      pageSize: "",
      pageCount: 1,
      left: true,
    };
  },
  methods: {
    getNews() {
      this.pageIndex++;
      // console.log("测试测试");
      var url =
        "http://skyrinbyliu.applinzi.com/getNews?pno=" +
        this.pageIndex +
        "&pageSize=" +
        this.pageSize;
      this.axios.get(url).then(result => {
        // console.log(result);
        // this.list = result.data.data;
        //页面追加内容,不然点一下加载更多会丢失前边的内容
        this.list = this.list.concat(result.data.data);
        // this.list = rows;
        // console.log(this.list);
        this.pageCount = result.data.pageCount;
        // console.log(this.list[0].title);
      });
    },
    leftIsShow() {
      this.$emit("leftIsShow", this.left);
    }
  },
  created() {
    this.getNews();
    this.leftIsShow();
  }
};
</script>

<style scoped>
#NewsList p.button {
  display: flex;
  justify-content: space-between;
  font-size: 10px;
}
#NewsList img {
  border-radius: 3px;
}
#NewsList > ul > li > a p span span.point {
  margin-left: 12px;
  font-size: 14px;
}
#NewsList a {
  margin-bottom: 0;
}
</style>


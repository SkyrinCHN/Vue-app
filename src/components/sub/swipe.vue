<template>
  <div class="swipe">
      <mt-swipe :auto="2500">
        <mt-swipe-item v-for="item in list" :key="item.id" class="swipe-item">
          <a href="javascript:;">
            <img :src="item.img_url">
          </a>
        </mt-swipe-item>
      </mt-swipe>
    </div>
</template>
<script>
export default {
  data(){return{
    
  }},
  props:["list"],
}
</script>
<style scoped>
.swipe{
  height: 145px;
}
</style>


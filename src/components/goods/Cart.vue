<template>
   <div class="app-cart">
			<div class="mui-card">
				<div class="mui-card-header">
           <h3>购物车列表</h3>
        </div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
  <ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media" v-for="item in list" :key="item.id">
					<a href="javascript:;">
						<img class="mui-media-object mui-pull-left" src="">
						<div class="mui-media-body">
							  {{item.name}}
							<p class='mui-ellipsis'>
                 {{item.price}}
							</p>
               	<div class="mui-numbox">
					<button class="mui-btn mui-btn-numbox-minus" type="button" @click="cartSub" :data-id="item.id">-</button>
					<input class="mui-input-numbox" type="number" :value="item.count"/>
					<button class="mui-btn mui-btn-numbox-plus" type="button"
          @click="cartAdd" :data-id="item.id">+</button>
				</div>
        </div>
       </p>
					</a>
				</li>
         </ul>
					</div>
				</div>
				<div class="mui-card-footer">
          <span>
             小计:{{getSubTotal}} 
          </span>
          <button class="go-pay">轻松购</button>
        </div>
        </div>
   </div>  
</template>
<script>
import { MessageBox } from 'mint-ui';
  export default {
    created() {
      this.getList();
    },
    // updated(){
    //   this.getList();
    //  return;
    // },
    data(){
      return {
        list:[]
      }
    },
    methods:{
      updateItemCount(id,count){
        //同步购物车中数量
        //id    购物车id
        //count 商品数量
        var url = "http://127.0.0.1:3000/updateCart?id="+id+"&count="+count;
        this.axios.get(url).then(result=>{
            console.log(result);
        });
      },
      cartSub(e){
        var id = e.target.dataset.id;
        for(var item of this.list){
           if(item.id == id ){
             item.count--;
             if(item.count <1){
               MessageBox({
                 title:'温馨提示',
                 message:'再减就没了',
                 showCancelButton: true,
                 confirmButtonText:'删了',
                  cancelButtonText:'我再想想',
               }).then(res=>{
                 if(res=='confirm'){
                   var url = "http://127.0.0.1:3000/DeleteProduct?id="+item.id;
                   this.axios.get(url).then(res=>{console.log(res.data)});
                   this.getList();
                   return;
                 }else{
                   item.count = 1;
                 }
               })
             }
             //同步数据
             this.updateItemCount(item.id,item.count);
             break;
           }
        }
      },
      cartAdd(e){
        //1:获取当前按钮绑定购物车id
        var id = e.target.dataset.id
        //2:创建循环购物车数组内容
        for(var item of this.list){
        //3:判断当前元素id是否与元素id
          if(item.id == id){
            //4:修改数据
            item.count++;
            //同步数据到数据库
            this.updateItemCount(item.id,item.count)
            break;
          }
        }
      },
      getList(){
        var url = "http://127.0.0.1:3000/";
        url +="getCartList";
        this.axios.get(url).then(result=>{
          this.list = result.data.data;
          console.log(result.data.data);
        })
      },

    },
    computed:{
      getSubTotal:function(){
        var sum = 0 ; 
        for(var item of this.list){
          sum += item.price*item.count;
        }
        return sum;
      }
    }
  }  
</script>
<style scoped>
  .go-pay{
    width: 150px;
  }
  span{
    margin-left: 20px;
  }
</style>

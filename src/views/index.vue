<template>
  <div>
    <router-view></router-view>
       
    <van-tabbar v-model="active" active-color="#ee0a24" inactive-color="#000">
      <van-tabbar-item icon="home-o" to="/home/index">首页</van-tabbar-item>
      <van-tabbar-item icon="search" to="/home/shopcar" badge="5">购物车</van-tabbar-item>
      <van-tabbar-item icon="friends-o" to="/home/myuser">个人中心</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
export default {
    data() {
        return {
           active: 0,
        }
    },
    watch:{
      '$route':{
          handler:function(newRouter,oldRouter){
              const {name} = newRouter.meta
              const newRouterbox = {
                  "home":0,
                  "shopcar":1,
                  "myuser":2
              }
              this.active = newRouterbox[name]
                        },
           // 默认执行一遍（刷新也会执行）
            immediate: true
      }
  }
};
</script>

<style lang="scss" scoped></style>

<template>
  <div class="app">
    <van-nav-bar v-show="isnavbar" :title="title" left-text="返回" right-text="按钮" left-arrow  @click-left="$router.back()"/>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isnavbar:false,
      title: "衣路维尼",
    };
  },
   watch:{
        "$route":{
            handler:function(newRouter,oldRouter){
                let {title,isnabbr} = newRouter.meta
                this.title= title
                if(isnabbr){
                    this.isnavbar = false
                }else{
                     this.isnavbar = true
                }
            }
        }
    }
};
</script>
<style lang="scss">
.app {
  min-width: 350px;
  max-width: 750px;
  margin: auto;
}
</style>

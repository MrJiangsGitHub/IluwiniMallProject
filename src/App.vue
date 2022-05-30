<template>
  <div class="app">
    <van-nav-bar v-show="isnavbar" :title="title" left-text="返回" left-arrow @click-left="$router.back()" />
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isnavbar: false,
      title: "衣路维尼",
      isOnLine: navigator.online,
    };
  },
  watch: {
    $route: {
      handler: function (newRouter, oldRouter) {
        let { title, isnabbr, istabbr } = newRouter.meta;
        this.title = title;
        if (isnabbr) {
          this.isnavbar = false;
        } else {
          this.isnavbar = true;
        }
      },
    },
    // watch监听网络的状态
    isOnLine() {
      this.isOnLine === false && this.$toast.fail("网络异常，请检查网络");
      this.isOnLine === true && this.$toast.success("网络已经连接");
    },
  
   
  },

   mounted() {
      window.addEventListener("online", this.updateNetworkStatu);
      window.addEventListener("offline", this.updateNetworkStatu);
    },
    methods: {
      updateNetworkStatu(e) {
        this.isOnLine = e.type === "online" ? true : false;
      },
    },
};
</script>

<style lang="scss">
html {
  // 让滚动事件丝滑效果
  scroll-behavior: smooth;
}
.app {
  min-width: 350px;
  max-width: 750px;
  margin: auto;
}
* {
  box-sizing: border-box;
}
</style>

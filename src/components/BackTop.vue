<template>
  <div class="back-top" v-show="isshow" @click="backTop">
    <img src="../asster/images/backtop.png" alt="" />
  </div>
</template>

<script>
import { throttle } from "../util/tool.js";
export default {
  //滚动优化由用户决定滚动高度显示，通过prpos父传子，传递数据来显示返回顶部按钮
  props: {
    scrollTop: {
      type: Number,
      default: 500,
    },
  },
  data() {
    return {
      isshow: false,
    };
  },
  methods: {
    //    滚动事件
    documentTop(event) {
      //拿到视口高度
      let scroTop = document.documentElement.scrollTop || document.body.scrollTop;
      console.log("11", scroTop);
      //   对比如果视口高度高于500显示回到顶部按钮，反之隐藏 这里也可以通过this拿到props传来的数据
      if (scroTop >= this.scrollTop) {
        this.isshow = true;
      } else {
        this.isshow = false;
      }
    },
    //回到顶部高度重置为0
    backTop() {
      document.documentElement.scrollTop = document.body.scrollTop = 0;
    },
  },
  mounted() {
    //绑定滚动事件 节流优化throttle()
    document.addEventListener("scroll", throttle(this.documentTop, 500));
  },
  destroyed() {
    //    解绑事件
    document.removeEventListener("scroll", this.documentTop);
  },
};
</script>

<style lang="scss" scoped>
.back-top {
  position: fixed;
  right: 8px;
  bottom: 120px;
  width: 38px;
  height: 38px;
  img {
    width: 100%;
  }
}
</style>

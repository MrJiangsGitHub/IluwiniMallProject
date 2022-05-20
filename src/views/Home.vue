<template>
  <div class="box">
    <!-- 首页头部搜索栏 -->
    <van-sticky>
      <div class="serch">
        <div>
          <img src="../asster/images/favicon.ico" alt="" />
        </div>
        <van-search v-model="value" placeholder="请输入搜索关键词" />
      </div>
    </van-sticky>
    <!-- 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in lunboData" :key="item.url">
        <img :src="item.img" alt="" />
      </van-swipe-item>
    </van-swipe>

    <!-- 九宫格 -->
    <van-grid :column-num="4">
      <van-grid-item icon="photo-o" v-for="item in grid" :key="item.img" :to="item.to">
        <div class="grid-box">
          <img :src="item.img" alt="" />
          <div>{{ item.text }}</div>
        </div>
      </van-grid-item>
    </van-grid>
    <!-- 分割线 -->
    <van-divider>热门商品</van-divider>
    <!-- 商品列表 -->
    <div class="list">
      <!-- :data="item"传给goods组件进行通信 -->
      <good v-for="item in goodslist" :key="item.id" :data="item" @goodsbtn="handlist"></good>
    </div>
    <!-- 回到顶部组件 -->
    <BackTop :scrollTop="800" />
  </div>
</template>
<script>
import BackTop from "../components/BackTop.vue";
import good from "../components/good.vue";
import { fetchlunbo, fetchgoodslist } from "../api/home.js";
import png1 from "../asster/images/1.png";
import png2 from "../asster/images/2.png";
import png3 from "../asster/images/3.png";
import png4 from "../asster/images/4.png";
import png5 from "../asster/images/5.png";
import png6 from "../asster/images/6.png";
import png7 from "../asster/images/7.png";
import morePng from "../asster/images/more.png";
export default {
  data() {
    return {
      value: "",
      lunboData: [],
      goodslist: [],
      page: 2,
      limit: 15,
      grid: [
        { text: "衣路超市", img: png1,to:"/goods" },
        { text: "衣路新闻", img: png2 },
        { text: "衣路生鲜", img: png3 },
        { text: "生活缴费", img: png4 },
        { text: "领津贴", img: png5 },
        { text: "plus会员", img: png6 },
        { text: "领乐豆", img: png7 },
        { text: "更多", img: morePng },
      ],
    };
  },
  created() {
    this._fetchlunbo();
    this._fetchgoodslist();
  },
  methods: {
    async _fetchlunbo() {
      let { message } = await fetchlunbo();
      this.lunboData = message;
    },
    async _fetchgoodslist() {
      let { message } = await fetchgoodslist(this.page, this.limit);
      this.goodslist = message;
    },
      handlist(data,event){
        console.log(data.id);
        this.$router.push('/goodsDetails/' + data.id)
    }
  },
  components: {
    BackTop,
    good
  },
};
</script>

<style lang="scss" scoped>
.box {
  // 商品列表
  .list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    background: #eae7e75e;
    padding-bottom: 50px;
    
  }

  // 九宫格
  .van-grid {
    .grid-box {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      color: #666;
      .text {
        margin-top: 6px;
      }
      img {
        width: 50%;
      }
    }
  }

  // 轮播
  .my-swipe .van-swipe-item {
    text-align: center;
    img {
      width: 100%;
    }
  }
  // 头部搜索
  .van-search {
    padding: 0px 0px;
    width: 100%;
  }
  .serch {
    display: flex;
    align-items: center;
    img {
      vertical-align: middle;
      width: 30px;
      height: 34px;
    }
  }
}
</style>

<template>
  <div class="details-box">
    <!-- 轮播 -->
    <div class="swipe-box" @click="previewImg">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="item in detlilubo" :key="item.src">
          <img :src="item.src" alt="" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 价格标题 -->
    <div class="swipe-box">
      <div class="price-box">
        <span class="sell_price">&yen;{{ goodsinfo.sell_price }}</span>
        <span class="market_price">&yen;{{ goodsinfo.market_price }}</span>
      </div>
      <div class="van-multi-ellipsis--l2">
        <span class="title">
          {{ goodsinfo.title }}
        </span>
      </div>
    </div>
    <!-- 商品详情内容 -->
    <div class="swipe-box">
      <van-divider content-position="left">介绍</van-divider>
      <div class="content" v-html="goodsinfo.content"></div>
    </div>

    <!-- sku -->
    <van-goods-action>
  <van-goods-action-icon icon="chat-o" text="客服" dot />
  <van-goods-action-icon icon="cart-o" text="购物车" badge="5" />
  <van-goods-action-button type="warning" text="加入购物车" />
  <van-goods-action-button type="danger" text="立即购买" />
</van-goods-action>
  </div>
</template>

<script>
import { goodsListlunbo, goodsListinfo } from "../api/goods.js";
import { ImagePreview } from 'vant';

export default {
  props: ["id"],
  data() {
    return {
      detlilubo: [],
      goodsinfo: {},
    };
  },
  created() {
    this._goodsListlunbo();
    this._goodsListinfo();
  },
  methods: {
    async _goodsListlunbo() {
      let { message } = await goodsListlunbo(this.id);
      this.detlilubo = message;
      console.log(message);
    },
    async _goodsListinfo() {
      let { message } = await goodsListinfo(this.id);
      this.goodsinfo = message;
      console.log(this.goodsinfo);
    },
    // 预览图片
    previewImg() {
      let imgs = this.detlilubo.map((item) => item.src);
      ImagePreview({
        images: imgs,
        startPosition: 1,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.details-box {
  height: 100vh;
  background: #eae7e75e;
  padding: 4px;
  //   商品详情
  .content {
    color: #666;
    padding-bottom: 10px;
    ::v-deep img {
      width: 100%;
      height: 100%;
    }
  }
  //   商品价格标题
  .price-box {
    .sell_price {
      color: #fa865d;
      font-size: 20px;
      margin-right: 20px;
    }
    .market_price {
      color: #666;
      font-size: 14px;
    }
    .title {
      color: #333;
      font-weight: 500;
    }
  }
  //   轮播
  .swipe-box {
    border-radius: 6px;
    margin-bottom: 8px;
    background: #fff;
    padding: 8px;
    .my-swipe {
      .van-swipe-item {
        height: 240px;
        text-align: center;
        img {
          height: 100%;
        }
      }
    }
  }
}
</style>

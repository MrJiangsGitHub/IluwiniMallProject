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

    <!-- 底部加入购物车按钮 -->
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" dot />
      <van-goods-action-icon icon="cart-o" text="购物车" to="/home/shopcar" :badge="$store.getters.getCarTotalNumber" />
      <van-goods-action-button type="warning" text="加入购物车" @click="putcar(true)" />
      <van-goods-action-button type="danger" text="立即购买" @click="buycar(false)" />
    </van-goods-action>
    <!-- sku商品数据 -->
    <van-sku
      v-model="show"
      :sku="sku"
      :goods="goods"
      :goods-id="goodsinfo.id"
      :reset-stepper-on-hide="true"
      :show-add-cart-btn="showAddCartBtn"
       :hide-stock="sku.hide_stock"
      @add-cart="addCar"
      @buy-clicked="buyClicked"
    >
      <template #sku-messages>
        <div class="card">
          <van-divider>文字</van-divider>
          <div>商品货号：{{ goodsinfo.goods_no }}</div>
          <div>库存：{{ goodsinfo.stock_quantity }}件</div>
          <div>上架时间：{{ goodsinfo.add_time | dateTime("YYYY-MM-DD") }}</div>
        </div>
      </template>
    </van-sku>
  </div>
</template>

<script>
import { goodsListlunbo, goodsListinfo } from "../api/goods.js";
import { ImagePreview } from "vant";

export default {
  // props: ["id"],
  data() {
    return {
      detlilubo: [],
      goodsinfo: {},
      id:this.$route.params.id,
      show: false,
      showAddCartBtn: true, //是否显示购物车的按钮
      sku: {
        // 数据结构见下方文档
        tree: [],
        price: "879.00", // 默认价格（单位元）
        stock_num: 18, // 商品总库存
        hide_stock: false, // 是否隐藏剩余库存
      },
      // 商品信息
      goods: {
        // 数据结构见下方文档
        picture: "",
      },
    };
  },
  created() {
    this._goodsListlunbo();
    this._goodsListinfo();
  },
  methods: {
    async _goodsListlunbo() {
      let  {message}  = await goodsListlunbo(this.id);
      console.log('轮播：',message);
      this.detlilubo = message;
      //   赋值给sku 商品信息里面的商品图片
      this.goods.picture = message[0].src;
    },
    async _goodsListinfo() {
      let  {message}  = await goodsListinfo(this.id);
      console.log('info',message);
      this.goodsinfo = message;
      this.sku.price = message.sell_price;
      this.sku.stock_num = message.stock_quantity;
    },
    // 预览图片
    previewImg() {
      let imgs = this.detlilubo.map((item) => item.src);
      ImagePreview({
        images: imgs,
        startPosition: 1,
      });
    },

    // 加入购物车事件的显示隐藏
    putcar(bool) {
      // 显示sku,并显示sku中加入购物车按钮
      this.show = true;
      //true就显示false就不显示
      this.showAddCartBtn = bool;
    },

    // 立即购买事件的显示隐藏
    buycar(bool) {
      // 显示sku,并显示sku中加入购物车按钮
      this.show = true;
      //true就显示false就不显示
      this.showAddCartBtn = bool;
    },

    // 按钮添加购物车回调
    addCar(data) {
      let { goodsId, selectedNum } = data;
    //   拿到价格
      let {sell_price}=this.goodsinfo
    //   构造购物车的数据结构
    let item = {id:goodsId,number:selectedNum,price:sell_price,selected:true}
    this.$store.commit('addCarData',item)
      this.show = false; 
    },

    // 点击购买的回调函数
    buyClicked(data){
  let { goodsId, selectedNum } = data;
    //   拿到价格
      let {sell_price}=this.goodsinfo
    //   构造购物车的数据结构
    let result = {id:goodsId,number:selectedNum,price:sell_price,selected:true}
    this.$store.commit('addBuyData',result)
   this.$router.push('/home/shopcar')
    }
  },
};
</script>

<style lang="scss" scoped>
.details-box {
  //   height: 100vh;
  background: #eae7e75e;
  padding: 4px;
  //   商品详情
  .content {
    color: #666;
    ::v-deep table {
      width: 100%;
      height: 100%;
    }
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
      text-decoration: line-through;
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

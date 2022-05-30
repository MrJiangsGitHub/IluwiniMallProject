<template>
  <div class="car-box">
    <div v-if="carListData.length > 0">
      <div class="address" v-if="isaddress">
        <van-icon name="location-o" />
        <div class="info">
          <div>{{ address.name }} / {{ address.tel }} 邮编: {{ address.postalCode }}</div>
          <div>{{ address.province }}{{ address.city }}{{ address.country }}{{ address.addressDetail }}</div>
        </div>
      </div>
      <!-- 无设置收货地址 -->
      <van-contact-card v-else type="add" @click="onAdd" />
    </div>

    <div v-if="$store.state.carData.length == 0" class="empty">
      <van-empty description="还没有商品哟,快去首页购物吧！" />
      <div class="bottom-button">
        <van-button @click="$router.replace('/home/index')" type="danger">去首页</van-button>
      </div>
    </div>
    <!-- 商品卡片 -->
    <div>
      <div class="shopcar" v-for="(item, index) in carListData" :key="item.id">
        <van-swipe-cell>
          <div class="chen-van">
            <van-checkbox
              v-model="$store.getters.checkedNumber[item.id]"
              @click="checkData(item.id, $store.getters.checkedNumber[item.id])"
            ></van-checkbox>
          </div>
          <van-card
          
            :price="item.sell_price"
            :title="item.title"
            class="goods-card"
            :thumb="item.thumb_path"
          >
            <template #price-top>
              <van-stepper
                v-model="$store.getters.picadds[item.id]"
                @change="checkCardata(item.id, $store.getters.picadds[item.id])"
              />
            </template>
            <template #num>
              × {{$store.getters.picadds[item.id]}}
            </template>
          </van-card>
          <template #right>
            <van-button square text="删除" type="danger" class="delete-button" @click="btndelte(item.id, index)" />
          </template>
        </van-swipe-cell>
      </div>
    </div>
    <van-submit-bar
      :price="$store.getters.checkcarPrice"
      decimal-length
      :disabled="issubmit"
      button-text="提交订单"
      @submit="onSubmit"
    >
      <template #default> 合计:{{ $store.getters.goodtotal }}件 </template>
    </van-submit-bar>
  </div>
</template>

<script>
import { fetchcarDataId } from "../api/car.js";
import { fetchGetaddress } from "../api/user.js";
import { fetchCommitorder } from "../api/order.js";
import { genOrderId } from "../util/tool.js";
export default {
  name: "car",
  data() {
    return {
      cheke: true,
      carListData: [],
      id: this.$store.getters.totalgoodsId,
      address: {}, //地址
      isaddress: false, //记录是否有地址
    };
  },

  computed: {
    issubmit() {
      if (this.isaddress === false || this.carListData.length === 0 || !this.$store.getters.selectedId) {
        // 提交按钮不可用
        return true;
      }
      return false;
    },
  },

  async created() {
    // 没有数据这不去往下请求
    if (!this.id) {
      return;
    }
    // 购物车
    this._fetchcarDataId();

    // 获取地址
    let user_id = this.$store.state.userInfor.id;
    let result = await fetchGetaddress(user_id);
    // 如果没有地址
    if (result.length === 0) {
      // 没有地址隐藏地址样式
      this.isaddress = false;
      this.$dialog({ message: "请先完善收货地址" });
      return;
    } else {
      this.isaddress = true;
    }
    // 如果只有一个地址
    if (result.length === 1) {
      this.address = result[0];
      return;
    }
    //  有多个默认地址
    let addressduo = result.find((item) => item.isDefault == 1);
    if (addressduo) {
      //有默认地址
      this.address = addressduo;
    } else {
      // 没有默认地址选择第一个
      this.address = result[0];
    }
  },
  methods: {
    async _fetchcarDataId() {
      let { message } = await fetchcarDataId(this.id);
      this.carListData = message;
    },
    // 更新选中状态下的数据
    checkData(id, selected) {
      this.$store.commit("setGoodsSeleceted", { id, selected });
    },
    // 提交订单
    async onSubmit() {
      // 第一步拿到用户id
      let user_id = this.$store.state.userInfor.id;
      // 准备好订单数据-要对应接口数据格式
      let orderData = {
        user_id, //用户id
        order_id: genOrderId(), //订单号
        address_id: this.address.id, //地址
        total_price: this.$store.getters.checkcarPrice, //选中的总价格
        number: this.$store.getters.goodtotal, //选择的总间数
        goods_ids: this.$store.getters.selectedId, //选中的数量id
      };
      // 请求接口，发送订单数据
      // 开启loding防止用户重复点击
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: "提交订单中......",
      });
      let { status, message } = await fetchCommitorder(orderData);
      this.$toast.clear();
      if (!status == 0) {
        this.$toast("网络繁忙,请稍后再试...");
        return;
      }

      this.$store.commit("clearCar");
      this.$router.replace("/orderlist");
    },
    // 删除
    btndelte(id, index) {
      this.carListData.splice(index, 1);
      this.$store.commit("delectData", id);
    },
    // 步进器加减功能
    checkCardata(id, number) {
      this.$store.commit("unpudGoods", { id, number });
    },
    onAdd() {
      this.$router.push("/puchAddress");
    },
  },
};
</script>

<style lang="scss" scoped>
.car-box {
  background: #eae7e75e;
  padding: 4px;
  // 地址

  .info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .address {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4px 10px;
    background-color: #fff;
    border-radius: 6px;
    margin: 6px 0;
  }

  .empty {
    height: 100vh;

    .bottom-button {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .shopcar {
    border-radius: 6px;
    margin-bottom: 8px;
    background: #fff;
    padding: 10px;
  }
  .goods-card {
    margin: 0;
    background-color: #fff;
    width: 100%;
  }
  .delete-button {
    height: 100%;
  }
  .van-stepper {
    margin-left: 49%;
  }

  .van-swipe-cell {
    flex: 1;
  }
  ::v-deep .van-swipe-cell__wrapper {
    display: flex;
    align-items: center;
  }
}
</style>

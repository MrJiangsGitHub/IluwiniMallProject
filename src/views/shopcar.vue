<template>
  <div class="car-box">
    {{ $store.getters.totalgoodSselected }}
    <div class="shopcar" v-for="(item, index) in carListData" :key="item.id">
      <van-swipe-cell>
        <div class="chen-van">
          <van-checkbox
            v-model="$store.getters.checkedNumber[item.id]"
            @click="checkData(item.id, $store.getters.checkedNumber[item.id])"
          ></van-checkbox>
        </div>
        <van-card
          :num="item.cou"
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
        </van-card>
        <template #right>
          <van-button square text="删除" type="danger" class="delete-button" @click="btndelte(item.id, index)" />
        </template>
      </van-swipe-cell>
    </div>
    <van-submit-bar :price="$store.getters.checkcarPrice" button-text="提交订单" @submit="onSubmit">
      <template #default> 合计:{{ $store.getters.goodtotal }}件 </template> </van-submit-bar
    >
  </div>
</template>

<script>
import { fetchcarDataId } from "../api/car.js";
export default {
  name: "car",
  data() {
    return {
      cheke: true,
      carListData: [],
      id: this.$store.getters.totalgoodsId,
    };
  },
  created() {
    this._fetchcarDataId();
  },
  methods: {
    async _fetchcarDataId() {
      let { message } = await fetchcarDataId(this.id);
      console.log(message);
      this.carListData = message;
    },
    // 更新选中状态下的数据
    checkData(id, selected) {
      this.$store.commit("setGoodsSeleceted", { id, selected });
    },
    onSubmit() {
      console.log(11);
    },
    // 删除
    btndelte(id, index) {
      this.carListData.splice(index, 1);
      this.$store.commit("delectData", id);
    },
    // 步进器加减功能
    checkCardata(id, Number) {
      this.$store.commit("unpudGoods", { id, Number });
    },
  },
};
</script>

<style lang="scss" scoped>
.car-box {
  background: #eae7e75e;
  padding: 4px;
  .shopcar {
    border-radius: 6px;
    margin-bottom: 8px;
    background: #fff;
    padding: 8px;
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
    margin-left: 50%;
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

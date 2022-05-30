<template>
  <div>
    <van-tabs v-model="active" @click="tabsBtn">
      <van-tab v-for="item in activeTabs" :title="item.title" :key="item.title">
        <van-card
          v-for="order in statusData"
          @click="orderDitl(order)"

          :key="order.order_id"
          :num="order.number"
          :price="order.total_price"
          :desc="order.pay_way"
          :title="order.goodsInfo.message[0].title"
          :thumb="order.goodsInfo.message[0].thumb_path"
        >
          <template #tags >下单时间: {{ order.add_time | timedate("YYYY-MM-DD") }}</template>
          <template #num>共 {{ order.number }} 件 </template>
          <template #footer>
            <template>
              <van-button size="mini" v-if="order.status == 0" type="danger">立即付款</van-button>
              <van-button size="mini" v-if="order.status == 1" type="danger">物流信息</van-button>
              <van-button
                size="mini"
                v-if="order.status == 1"
                type="danger"
                v-clipboard:copy="order.order_id"
                v-clipboard:success="onCopy"
                >复制订单号</van-button
              >
              <van-button size="mini" type="danger" v-if="order.status == 0" @click.stop="callPhone">客服</van-button>
              <template v-if="order.status == 2">
                <van-button size="mini" type="danger">已完成</van-button>
                <van-button size="mini" type="danger">评价</van-button>
              </template>
            </template>
            <template>
              <!-- <van-button size="mini" type="danger"></van-button> -->
            </template>
          </template>
        </van-card>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { fetchUserorder } from "../api/order.js";
import { fetchcarDataId } from "../api/car.js";
export default {
  data() {
    return {
      active: 0,
      activeTabs: [
        { title: "全部", status: "all" },
        { title: "未付款", status: "0" },
        { title: "已付款", status: "1" },
        { title: "完成", status: "2" },
      ],
      status: 0, //默认是0  全部
      orderAll: [],
    };
  },
  created() {
    this._fetchUserorder();
  },
  computed: {
    statusData() {
      // 通过订单的状态返回对应的数据
      if (this.status === "all") {
        // 一进来就是选择全部订单显示
        return this.orderAll;
      }
      // 筛选出对应状态的数据
      return this.orderAll.filter((item) => item.status == this.status);
    },
  },
  methods: {
    orderDitl(order) {
      // 拿到订单号跳转到详情
      this.$router.push("/orderedit/" + order.order_id);
      console.log(order);
    },
    // 复制订单号
    // 复制到系统粘贴板
    onCopy(e) {
      event.stopPropagation(); // 阻止事件冒泡
      this.$toast("复制成功");
    },
    // 客服
    callPhone() {
      this.$dialog
        .confirm({
          message: "确拨打打电话?",
        })
        .then(() => {
          // on confirm
          window.location.href = "tel:15338463888";
        })
        .catch(() => {
          // on cancel
        });
    },
    //   获取用户订单
    async _fetchUserorder() {
      let user_id = this.$store.state.userInfor.id;
      let orderInfo = await fetchUserorder(user_id);
      // 因为订单只有基本信息，没有订单商品信息，调用购物车商品列表接口获取商品信息
      let carlistdata = [];
      orderInfo.forEach((order) => {
        carlistdata.push(fetchcarDataId(order.goods_ids));
      });
      // 并发执行关联商品信息
      let cardataAll = await Promise.all(carlistdata);
      // 将订单信息和商品信息关联起来，将商品信息储存到订单信息的goodsInfo属性中
      orderInfo = orderInfo.map((item, index) => {
        item.goodsInfo = cardataAll[index];
        return item;
      });
      this.orderAll = orderInfo;
      console.log(this.orderAll);
    },
    //   tabs切换状态
    tabsBtn(index, name) {
      // 要映射数据返回对应的下标
      let statusData = {
        全部: "all",
        未付款: "0",
        已付款: "1",
        完成: "2",
      };
      this.status = statusData[name];
    },
  },
};
</script>

<style lang="scss" scoped></style>

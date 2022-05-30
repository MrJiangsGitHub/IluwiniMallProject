<template>
  <div class="orderDetailContainer">
    <div class="status">
      <div class="text">{{ textcontent }}</div>
      <img :src="imgOeder" alt width="80px" />
    </div>
    <div class="addressWrap">
      <div class="address">
        <div class="location flex_c_c">
          <van-icon name="location-o" />
        </div>

        <!-- Vue2必须保证有一级属性的存在，才可以访问其二级属性 -->
        <div v-if="ordereditData.address_info" class="info">
          <div>
            {{ ordereditData.address_info.name }} - {{ ordereditData.address_info.tel }} -
            {{ ordereditData.address_info.province }}- {{ ordereditData.address_info.city }}-
            {{ ordereditData.address_info.country }}-
            {{ ordereditData.address_info.addressDetail }}
          </div>
        </div>
        <van-divider />
      </div>
    </div>
    <!-- 商品信息 -->
    <van-card
      v-for="item in goodsData"
      :key="item.id"
      :price="item.sell_price"
      :title="item.title"
      :thumb="item.thumb_path"
      :cou="item.cou"
    >
      <template #num>
        <div>×{{ item.cou }}</div>
      </template>
    </van-card>

    <!-- 订单一些基本信息 -->
    <div class="ordereditData">
      <div class="item">
        <span>下单时间</span>
        <span>{{ ordereditData.add_time }}</span>
      </div>
      <div class="item">
        <span>商品总价</span>
        <span>&yen; {{ ordereditData.total_price }}</span>
      </div>
      <div class="item">
        <span>实付款</span>
        <span>&yen; {{ ordereditData.actual_price }}</span>
      </div>
      <div class="item">
        <span>付款方式</span>
        <span>{{ ordereditData.pay_way }}</span>
      </div>
      <div class="item">
        <span>运费险</span>
        <span>&yen; 0.00</span>
      </div>
      <div class="item">
        <span>订单号</span>
        <span>{{ ordereditData.order_id }}</span>
      </div>
    </div>

    <!-- 订单一些操作按钮 -->
    <div class="btns">
      <van-button size="mini" v-if="ordereditData.status === 0" type="danger" @click="pay">立即付款</van-button>
      <van-button size="mini" v-if="ordereditData.is_out === 1" type="primary" @click="islogisticsData">物流信息</van-button>

      <van-button size="mini" v-if="ordereditData.is_out === 0 && ordereditData.status === 1" type="danger"
        >提醒发货
      </van-button>
      <template v-if="ordereditData.status === 2">
        <van-button size="mini" type="info">已完成</van-button>
        <van-button size="mini" type="info">去评价</van-button>
      </template>
    </div>
<!-- 物流信息 -->
    <van-popup v-model="isShow" position="bottom" :style="{ height: '60%' }">
            <!-- 目标收获地址 -->
            <div class="addressWrap">
                <div class="address">
                    <div class="location flex_c_c">
                        <van-icon name="location-o" />
                    </div>

                    <div class="info" v-if="ordereditData.address_info">
                        <div>{{ ordereditData.address_info.name }} {{ ordereditData.address_info.tel }}</div>
                        <div>
                            {{ ordereditData.address_info.province }}{{ ordereditData.address_info.city }}{{
                                    ordereditData.address_info.country
                            }}{{ ordereditData.address_info.addressDetail }}
                        </div>
                    </div>
                    <van-divider />
                </div>
            </div>
            <van-steps direction="vertical" :active="0">
                <van-step v-for="item in logisticsData" :key="item.time">
                    <h3>{{ item.location }}</h3>
                    <p>{{ item.time }}</p>
                </van-step>

            </van-steps>
        </van-popup>
  </div>
</template>

<script>
import { fetchGetorder, fetchPayorder ,fetchLogistics} from "../api/order.js";
import { fetchcarDataId } from "../api/car.js";
import imgCar from "../asster/images/car2 copy.png";
export default {
  data() {
    return {
      order_id: this.$route.params.order_id, //首先拿到订单号，才能获取订单详情图片数据
      imgOeder: imgCar,
      ordereditData: {}, //详情数据
      goodsData: [],
      isShow:false,
      logisticsData:[]
    };
  },
  computed: {
    textcontent() {
      let { is_out, is_take, status } = this.ordereditData;
      if (is_out === 1 && is_take === 0) {
        return "你的包裹正飞速的发往你的身边";
      }
      if (status === 2) {
        return "订单已完成";
      }
    },
  },
  created() {
    this._fetchGetorder();
  },
  methods: {
    async _fetchGetorder() {
      // 订单基本信息
      let result = await fetchGetorder(this.order_id);
      this.ordereditData = result;
      //   获取关联购物车的商品数据
      this._fetchcarDataId();
    },
    async _fetchcarDataId() {
      //   获取关联的购物车商品数据
      let { message } = await fetchcarDataId(this.ordereditData.goods_ids);
      this.goodsData = message;
      console.log(this.goodsData);
    },
    // 模拟支付
    pay() {
      // 提示
      this.$dialog
        .confirm({
          title: "付款",
          message: "确认支付吗",
        })
        .then(async () => {
          // 调用订单支付接口时真实业务中一般都是用try()catch来捕获异常
          try {
            // 拿到订单id发送支付请求
            await fetchPayorder(this.ordereditData.order_id);
            // 支付成功
            this.$toast.success({
              message: "支付成功",
              icon: "wechat-pay",
            });
            this.ordereditData.status = 2;
            this.ordereditData.is_out = 1;
            this.ordereditData.is_take = 1;
          } catch (err) {
            this.$toast("支付异常");
          }
        })
        .catch(()=>{

        })
    },
  async  islogisticsData(){
        if(this.logisticsData.length !==0){
            // 有物流信息显示弹框
            this.isShow = true
            return
        }
        let result = await fetchLogistics()
        this.logisticsData =result
        console.log( this.logisticsData);
        // 显示弹框
        this.isShow =true
    }
  },
};
</script>

<style lang="scss" scoped>
.orderDetailContainer {
  .van-card {
    .van-card__thumb {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .status {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 120px;
    background-color: #fe5102;
    color: #f4d9be;
  }

  .addressWrap {
    .address {
      display: flex;
      align-items: center;
      padding: 10px 10px;
      background-color: #fff;
      border-radius: 6px;
      margin: 6px 0;
      .location {
        width: 30px;
        height: 30px;
        line-height: 30px;
        background: #f34a09;
        border-radius: 50%;
        padding-left: 5px;
        margin-right: 20px;
      }
      .van-icon {
        margin-right: 20px;
        color: #fff;
        font-size: 20px;
      }
    }
  }

  .ordereditData {
    padding: 2px 10px;
    .item {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      color: #787373;
      margin: 5px 0;

      .copy {
        color: orangered;
      }
    }
  }

  .btns {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    position: fixed;
    bottom: 0;
    right: 0;
    width: 100vw;
    height: 60px;
    padding: 0 10px;
    box-shadow: 0 0 10px #ccc;
  }
}
</style>

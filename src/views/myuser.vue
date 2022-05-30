<template>
  <div class="box">
    <!-- 头像 -->
    <div class="login-img">
      <van-image round width="70" height="70" :src="avatar" @click="unpudAvatar" />
      <!-- 使用@change事件拿到图片二进制数据 -->
      <input type="file" v-show="false" ref="avatars" @change="_unpudAvatar" />
      登录名:{{ $store.state.userInfor.username }}
    </div>
    <!-- 订单 -->
    <div class="cart">
      <div class="icon-login">
        <span> <van-icon name="balance-list" />我的订单 </span>
        <span  @click="$router.push('/orderlist')" >查看全部订单<van-icon name="arrow"/></span>
      </div>
    </div>
    <!-- 优惠卷 -->
    <div class="cart">
      <div class="login-content">
        <span>
          <van-icon name="coupon" />
          我的优惠卷
        </span>
        <span><van-icon name="arrow" /></span>
      </div>
      <div class="login-content">
        <span>
          <van-icon name="service" />
          在线客服
        </span>
        <span><van-icon name="arrow" /></span>
      </div>
      <div class="login-content" @click="$router.push('/addresslist')" >
        <span >
          <van-icon name="map-marked" />
          收获地址
        </span>
        <span><van-icon name="arrow" /></span>
      </div>
      <div class="login-content">
        <span>
          <van-icon name="setting" />
          设置
        </span>
        <span><van-icon name="arrow" /></span>
      </div>
    </div>

    <van-button type="default" @click="signOut" class="btn">退出当前账号</van-button>
  </div>
</template>

<script>
import { fetchUpload } from "../api/user.js";
export default {
  data() {
    return {};
  },
  computed: {
    avatar() {
      return "http://api.w0824.com/" + this.$store.state.userInfor.avatar;
    },
  },
  methods: {
    // 退出
    signOut() {
      this.$store.commit("clearUser");
      this.$router.push("/login");
    },
    // 更新头像
    unpudAvatar() {
      this.$refs.avatars.click();
    },
    // 更新头像使用事件委托触发
    async _unpudAvatar() {
      //  首先拿到图片二进制数据,拿第一张就可以
      let file = this.$refs.avatars.files[0];
      if (!file) {
        return;
      }
      // 因为这里没有formData我们要newyig
      let formData = new FormData();
      // 这里要拿到id和图片二进制
      let user_id = this.$store.state.userInfor.id; //用户id
      formData.set("user_id", user_id);
      formData.set("file", file);
      // 拿到用户id和图片跟新用户头像
      let { message, status, src } = await fetchUpload(formData);
      this.$toast(message);
      // status==0表示修改成功，到vux中修改数据
      if (status === 0) {
        // 要把图片路径带到vux中同步修改
        this.$store.commit("unlodimg", src);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.box {
  background-color: #ccc;
  .cart {
    border-radius: 6px;
    margin-bottom: 8px;
    background: #fff;
    padding: 30px;
  }
  .login-img {
    // height: 300px;
    background-color: aqua;
    text-align: center;
  }
  .icon-login {
    display: flex;
    // justify-content: center;
    justify-content: space-between;
  }

  .login-content {
    display: flex;
    justify-content: center;
    justify-content: space-between;
    padding-top: 20px;
  }
  .btn {
    width: 100%;
    color: red;
    padding: 20px 20px;
  }
}
</style>

<template>
  <div>
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="username"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
        <router-link tag="div" :to="{path:'/register'}" class="text-center text-gray-color">没有账号？去注册</router-link>
  </div>
</template>

<script>
import { fetchlogin } from "../api/user.js";
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async onSubmit(values) {
      let { username, password } = values;
      let { message, status, token, userInfo } = await fetchlogin(username, password);
      this.$toast(message);
      // 返回状态0就表示登录成功，反之失败
      if (status === 0) {
        // 保存token和userInfo用户信息
        this.$store.commit("keepToken", token);
        this.$store.commit("keepuserInfo", userInfo);
         this.$router.push("/home/index");
        let { redirect } = this.$route.query;
        if (redirect) {
          this.$router.push(redirect);
        }
      } else {
        // 登录失败返回登录

        this.$router.push("/login");
      }
    },
  },
};
</script>

<style lang="scss" scoped>

.text-center {
    text-align: center ;
}

.text-gray-color {
    color: #ccc;
}
</style>

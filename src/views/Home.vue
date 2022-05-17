<template>
  <div>
      <van-search v-model="value" placeholder="请输入搜索关键词" />
       <router-link to="/goods">商品页面</router-link> \
        <router-link to="/goodsDetails">个人中心</router-link>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value:''
     
    };
  },
 
};
</script>

<style lang="scss" scoped></style>

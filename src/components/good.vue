<template>
  <div class="list-box" @click="handckick">
    <div class="img-box">
      <img v-lazy="data.img_url" />
    </div>
    <div class="list-text ellipsis_l1 ">
      <span>{{ data.title }}</span>
    </div>
    <slot name="list">
      <div class="list-pic">
        <span class="pic">￥{{ data.sell_price }}.00</span>
        <span class="buy">{{ data.buy }}人购买</span>
      </div>
    </slot>
  </div>
</template>
<script>
export default {
  // 父传子通过home页面的自定义属性data=‘item’，goods组件props接受传递参数
  props: ["data"],
  methods: {
    handckick(event){
      this.$emit('goodsbtn',this.data,event)
    }
  },
};
</script>

<style lang="scss" scoped>
.list-box {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 49%;
  padding: 6px;
  border-radius: 4px;
  background: #fff;
  margin-bottom: 4px;
  font-size: 14px;
  .list-text {
    font-size: 700;
    margin-top: 6px;
  }
  .img-box {
    height: 124px;
    overflow: hidden;
    width: 100%;
    text-align: center;
    img {
      height: 100%;
    }
  }

  .list-pic {
    display: flex;
    justify-content: space-between;
    margin-top: 6px;
    .pic {
      color: red;
    }
    .buy {
      color: #666;
    }
  }
}
</style>

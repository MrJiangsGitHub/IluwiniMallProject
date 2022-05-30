<template>
  <div>
    <van-address-list v-model="chosenAddressId" :list="lists" default-tag-text="默认" @add="onAdd" @edit="onEdit" />
  </div>
</template>

<script>
import { fetchGetaddress } from "../api/user.js";
export default {
  data() {
    return {
      chosenAddressId: "", //默认中
      lists: [],
    };
  },
  created() {
    this._fetchGetaddress();
  },
  methods: {
    // 请求数据
    async _fetchGetaddress() {
      //  第一拿到用户id
      let user_id = this.$store.state.userInfor.id;
      let result = await fetchGetaddress(user_id);
      // 如果没有地址就不往下执行
      if (result.length == 0) {
        return;
      }
      // 如果只有一个数据默认选中
      if (result.length == 1) {
        this.chosenAddressId = result[0].id;
      }
      // 如果有多个数据
      result = result.map(item => {
        //返回的数据状态等于一默认选中
        if (item.isDefault == 1) {
          this.chosenAddressId = item.id;
        }

          // 改造成所需要的数据然后返回
          let { province, city, country, addressDetail } = item; //拿到item结构 把地址详情，省市区拿出来
          //  拼接起来返回
          item.address = `${province}${city}${country}${addressDetail}`;
          return item;
      });
      this.lists = result;
    },
    onAdd() {
      this.$toast("新增地址");
      this.$router.push("/puchAddress");
    },
    onEdit(item, index) {
      this.$toast("编辑地址:" + index);
      // 路由写两个斜杆就是动态路由，这里要由路由带过去传递参数,要把对象转换成字符串传递过去
      this.$router.push("/addressEdit/"+JSON.stringify(item));
    },
  },
};
</script>

<style lang="scss" scoped></style>

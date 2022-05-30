<template>
  <div>
    <van-address-edit
      :area-list="areaList"
      :address-info="addressform"
      show-postal
      show-delete
      show-set-default
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @change-area="changeaddress"
      @save="onSave"
      @delete="onDelete"
      @change-detail="onChangeDetail"
    />
  </div>
</template>

<script>
import { areaList } from "@vant/area-data";
import { fetchUpdateaddress, fetchDeladdress } from "../api/user.js";
export default {
  data() {
    return {
      areaList,
      //拿到地址列表传过来的数据，addressform路由定义的名字这里必须一样，传过来的是字符串，要转换为（JSON.parse）对象格式才能拿到数据，对应vant格式
      addressData: JSON.parse(this.$route.params.addressform),
      areaCode: "", //记录当前的省市区，
      isDefault: "", //记录默认地址
    };
  },
  created() {
    // 一进来就要拿到默认地址和省市区所以要在这里拿到原数据
    this.areaCode = this.addressData.areaCode;
    // 记录默认的地址
    this.isDefault = this.addressData.isDefault;
  },
  computed: {
    addressform() {
      // 把原地址，修改成vant组件需要的格式 1=true（默认地址） 0=false
      let address = JSON.parse(this.$route.params.addressform);
      address.isDefault = address.isDefault == 1 ? true : false;
      // 拿到最后的区地址就可以回显
      address.areaCode = address.areaCode.split("-")[2];
      return address;
    },
  },
  methods: {
    // 更新地址
    async onSave(addressIfors) {
      let areaCode = this.areaCode;
      // 装换成接口对应的数据格式
      let isDefault = this.isDefault ? 1 : 0;
      // 把县的数据格式（vant中的格式）改成接口的数据格式
      let country = addressIfors.county;
      // 更改的数据
      let data = {
        ...addressIfors,
        areaCode,
        isDefault,
        country,
      };
      let { status, message } = await fetchUpdateaddress(addressIfors.id, data);
      this.$toast(message);
      if (status === 0) {
        this.$router.back();
      }
    },
    // 删除地址
    async onDelete(data) {
      let { id } = data;
      let { status, message } = await fetchDeladdress(id);
      this.$toast(message);
      if (status === 0) {
        this.$router.back();
      }
    },
    // 切换默认地址
    onChangeDetail(val) {
      this.isDefault = val;
    },
    // 拿到省市区拼接成对应的格式
    changeaddress(val) {
      this.areaCode = val.map((item) => item.code).join("-");
    },
  },
};
</script>

<style lang="scss" scoped></style>

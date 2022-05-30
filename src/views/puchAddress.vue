<template>
    <div>
添加地址
   <div>
        <van-address-edit :area-list="areaList" 
            show-postal  
            show-set-default 
            :area-columns-placeholder="['请选择', '请选择', '请选择']" 
            @change-area="changeArea"
            @save="onSave"
        />
    </div>
    </div>
</template>

<script>
   import { areaList } from '@vant/area-data';
   import { fetchAddaddress } from '../api/user.js';
export default {
  data() {
    return {
      areaList,
      areaCode:'', //省市区 
    };
  },
  methods: {
    // 添加地址
  async  onSave(addressData) {
      this.$toast('save');
      // 首先拿到用户id
    let user_id=  this.$store.state.userInfor.id
    // 1是默认地址 0 不是默认地址
    addressData.isDefault = addressData.isDefault ? 1 : 0
    // 把county改成country
    addressData.country = addressData.county
    // 这里拿到addressData表格的所有数据传给接口更新地址 剩余参数后者会覆盖前者,
    let data ={
      ...addressData,
      areaCode:this.areaCode
    }
    // 调用接口添加地址
  let {status,message} = await  fetchAddaddress(user_id,data)
  this.$toast(message)
  if(status===0){
    // 添加成功返回上一层页面
    this.$router.back()
  }
    },
    onDelete() {
      this.$toast('delete');
    },
    changeArea(area){
      // 把数组拼接成字符串，响应后台数据格式
      this.areaCode = area.map(item => item.code).join('-')
console.log(111);
    },
   
  },
};
</script>

<style lang="scss" scoped>

</style>
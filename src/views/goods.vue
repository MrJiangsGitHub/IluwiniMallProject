<template>
  <div>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <div class="list">
    <good v-for="item in listData" :key="item.id" :data="item" @goodsbtn="handlist">
    <template #list>
          <div class="area">
              <div class="price">
                <span>&yen; {{item.sell_price}}</span>
                <span>&yen; {{item.market_price}}</span>
              </div>
              <div class="info">
                <span>热卖中</span>
                <span>剩余{{item.stock_quantity}}件</span>
              </div>
            </div>
    </template>
    
    </good>

      </div>
      
      </van-list>

    </van-pull-refresh>
  </div>
</template>

<script>
import good from "../components/good.vue";
import { goodsListData } from "../api/goods.js";
export default {
  data() {
    return {
      listData: [],
      loading: false, // 控制是否在加载中
      finished: false, // 控制是否加载完成
      refreshing: false, // 控制是否在刷新中...
      page: 0,
      pagesize: 8,
    };
  },
  methods: {
    async _goodsListData() {
      //请求的时候把数据清空
      if (this.refreshing) {
        this.listData = [];
        this.refreshing = false;
      }
      let { message } = await goodsListData(this.page, this.pagesize);
      console.log(message);
      //   合并参数，把旧的值和新的值合并这样就不会出现id相同的情况了
      this.listData = [...this.listData, ...message];
      this.loading = false; //数据请求完毕加载完成关闭loading 

      // 数据为空加载完毕
      if (message.length == 0) {
        this.listData.length % 2 === 1 && this.listData.pop();
        this.finished = true;
      } 
    },
    //上拉加载
    onLoad() {
      //默认onload方法会执行一次，页面加一，并请求接口
      this.page++;
      this._goodsListData();
    },
    // 下拉刷新
    onRefresh() {
      this.page = 0;
      // 清空列表数据
      this.finished = false;

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true;
      this.onLoad();
    },
    handlist(data,event){
        console.log(data.id);
        this.$router.push('/goodsDetails/' + data.id)
    }
  },
  components: {
    good,
  },
};
</script>

<style lang="scss" scoped>
   .list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    background: #eae7e75e;
    padding-bottom: 50px;
    
  }
  

  .area {
    color: #787272;
    .price {
      display: flex;
      justify-content: space-between;
      color: red;
    }
    .info {
      display: flex;
      justify-content: space-between;
    }
  }



</style>

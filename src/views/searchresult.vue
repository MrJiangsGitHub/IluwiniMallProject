<template>
  <div class="search-result">
    <van-search
      v-model="keyword"
      show-action
      placeholder="请输入搜索关键词"
      @search="onSearch"
      @cancel="$router.back()"
    />
    <van-dropdown-menu v-if="goodsList.length > 0">
      <van-dropdown-item @change="change" v-model="sort" :options="option1" />
    </van-dropdown-menu>

    <div class="goodslist">
      <goods v-for="item in goodsList" :key="item.id" :data="item" @goodsbtn="goodsbtn" />
    </div>

    <van-empty v-if="goodsList.length === 0" description="暂无搜索结果" />
  </div>
</template>

<script>
import { fetchSearch } from "../api/search.js";
import goods from "../components/good.vue";
export default {
  data() {
    return {
      sort: "buy", // 默认bug是排序的字段
      keyword: this.$route.params.keyword,
      goodsList: [], //商品列表
      option1: [
        { text: "销量", value: "buy" },
        { text: "好评", value: "likes" },
        { text: "价格", value: "sell_price" },
      ],
      page: 1,
      pagesize: 10,
      order: "desc", // 默认降序
    };
  },
  // keep缓存再次激活
  activated() {
    this.keyword = this.$route.params.keyword;
    this._fetchSearch();
  },
  created() {
    this._fetchSearch();
  },
  methods: {
    // 搜索框回车事件
    onSearch(val) {
      this._fetchSearch();
    },
    change(value) {
      // 更改排序字段
      this.value = value;
      this._fetchSearch();
    },
    //
    async _fetchSearch() {
      // 获取查询数据
      let data = {
        value: this.keyword,
        sort: this.sort,
        order: this.order,
        page: this.page,
        pagesize: this.pagesize,
      };
      let result = await fetchSearch(data);
      this.goodsList = result;
    },
    goodsbtn(data) {
        console.log(data);
      let { id } = data;
      this.$router.push("/goodsDetails/" + id);
    },
  },
  components: { goods },
};
</script>

<style lang="scss" scoped>
.search-result {
  height: 100vh;
  text-align: center;
  .goodslist {
    display: flex;
    flex-wrap: wrap;
    // justify-content: space-between;
  justify-content: space-around;
    background: #f0eded;
    padding-top: 10px;
  }
}
</style>

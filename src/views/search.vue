<template>
  <div class="search-container">
    <van-popup :close-on-click-overlay="false" v-model="show" position="top" :style="{ height: '50%' }">
      <van-search
        @search="onSearch"
        @cancel="$router.back()"
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
      />
      <div class="searchWrap">
        <div class="card">
          <div class="header">
            <h3>搜索历史</h3>
            <i class="iconfont icon-trash" @click="clearHistory"></i>
          </div>
          <div class="footer">

              <span v-for="(item , index) in historyData" :key="index" @click="$router.push('/searchresult/'+ item)">{{item}}</span>
          </div>
        </div>
        <van-divider />
        <div class="card">
          <div class="header">
            <h3>热门搜索</h3>
            <i :class="['iconfont', isiconName]" @click="isicon = !isicon"></i>
          </div>
          <div class="footer" v-if="isicon">

              <span v-for="(item , index) in historyRecord" :key="index" @click="$router.push('/searchresult/'+ item)">{{item}}</span>
          </div>
          <div v-else class="text-center">已隐藏热门搜索</div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
let historyData = JSON.parse(localStorage.getItem("historyData") || "[]");
export default {
  data() {
    return {
      historyData, //去除本地存储数据
      show: true,
      value: "",  //搜索框的值
      isicon: true,  //icon眼睛的眨眼闭眼显示
      historyRecord: ['手机','电视'], //搜索历史记录
    };
  },
  computed: {
    isiconName() {
        // icon眼睛的眨眼闭眼显示
      return this.isicon ? "icon-yanjing" : "icon-guanbi-yanjing";
    },
  },
  methods: {
    //   回车事件
    onSearch() {
      // 获取输入的值  一回车加入本地存储搜索
// 去重，去掉输入框相同的字符
if(!this.historyData.includes(this.value)){
     // 如果没有相同的向头部添加
     this.historyData.unshift(this.value)
    //   存入本地存储
     localStorage.setItem("historyData", JSON.stringify(this.historyData))
}
      // 跳入搜索结果页面
      this.$router.push('/searchresult/'+ this.value)
    },
    clearHistory(){
        this.historyData = []
        localStorage.removeItem('historyData')
    }
  },
};
</script>

<style lang="scss" scoped>
.search-container {
  .searchWrap {
    .card {
      padding: 6px;
      .text-center{
text-align: center;
      }
      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 4px;
      }

      .footer {
        display: flex;
        flex-wrap: wrap;

        span {
          height: 30px;
          line-height: 30px;
          background: #f3f5f6;
          font-size: 14px;
          margin-right: 6px;
          padding: 2px 4px;
          text-align: center;
          border-radius: 6px;
          margin: 4px;
        }
      }
    }
  }
}
</style>

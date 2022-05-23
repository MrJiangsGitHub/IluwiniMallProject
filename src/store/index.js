import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"; //该插件默认将数据存储在localStorage中。
// import createMigrate from 'vuex-persistedstate-migrate'
// import vuexPersist from 'vuex-persist';
Vue.use(Vuex)

export default new Vuex.Store({

    state: {
        count: 0,
        carData: []
    },
    mutations: {
          // 设置购物车商品选中状态
          setGoodsSeleceted(state, {
            id,
            selected
        }) {
            let index = state.carData.findIndex(item => item.id === id)
            state.carData[index].selected = selected
        },
        // 删除
        delectData(state, id) {
            //拿到carData的下标和home 传过来的id进行删除
            let index = state.carData.findIndex(item => item.id === id)
            state.carData.splice(index, 1)
        },
        // 点击加入购物车方法
        addCarData(state, data) {
            let index = state.carData.findIndex(item => item === data.id)
            if (!index == -1) {
                //    传过来有相同的数量累加，防止被覆盖
                state.carData[index].Number += data.Number
            } else {
                // 不是相同的则直接添加新的商品到购物车
                state.carData.push(data)
            }
        },
        // 点击购买按钮时的方法
        addBuyData(state, data) {
            let index = state.carData.findIndex(item => item.id == data.id)
            if (!index == -1) {
                //    传过来有相同的数量累加，防止被覆盖
                state.carData[index].Number += data.Number
            } else {
                // 不是相同的则直接添加新的商品到购物车
                state.carData.push(data)
            }
        },
        //计步器加减之后的数据更新到页面
        unpudGoods(state, obj) {
            let { id, Number } = obj
            //拿到下标进行对比
            let index = state.carData.findIndex(item => item.id == id)
            state.carData[index].Number = Number
        },
        // 更新选中的状态的数量
        checktedDataid(state, { id, Number }) {
            let index = state.carData.findIndex(item => item.id === id)
            state.carData[index].Number = Number
        }

    },
    getters: {
        //商品加减
        picadds(state) {
            let obj = {}
            state.carData.forEach(item => {
                obj[item.id] = item.Number
            })
            return obj
        },

        // 获取购物车的商品id，并以逗号分割
        totalgoodsId(state) {
            return state.carData.map(item => item.id).join(',');
        },
        //选中的状态
        checkedNumber(state) {
            let obj = {}
            state.carData.forEach(item => {
                console.log(item);
                obj[item.id] = item.selected
            })
            return obj;
        },

        //购物车商品总件数
        goodtotal(state) {
            //只返回选中状态下的总件数 只有check为真
            let totalNumber = 0;
            state.carData.forEach(item => item.selected && (totalNumber += item.Number))
            return totalNumber;
        },
        // 获取选中商品数量的总价格
        checkcarPrice(state) {
            let totalPrice = 0;
            state.carData.forEach(({
                price,
                Number,
                selected
            }) => selected && (totalPrice += Number * price))
            return totalPrice * 100;
        }
    },
    // 使用插件，，该插件默认将数据存储在localStorage中。
    plugins: [
        createPersistedState(),
    ],
})
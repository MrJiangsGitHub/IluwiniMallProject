import {
    nanoid
} from 'nanoid'

// 生成唯一的订单号
export function genOrderId() {
    let date = new Date();
    let year = date.getFullYear(); //年
    let month = date.getMonth() + 1; //月
    let day = date.getDay();   //日
    let hour = date.getHours(); //时
    let minute = date.getMinutes(); //分
    let rondom = nanoid();  // 唯一id
    let order_id = `${year}${month}${day}${hour}${minute}${rondom}` //拼接成商品id
    return order_id;
}
// 项目优化之节流
export function throttle(fn, delay) {
    // 记录上一次函数触发的时间
    var lastTime = 0; // 闭包变量，用来记录保存上一次的执行时间
    return function() {
        // 记录当前函数触发的时间
        var nowTime = Date.now();
        var context = this;
        var args = [...arguments];
        if (nowTime - lastTime > delay) {
            // 修正this指向问题 
            fn.apply(context,arguments);
            // 更新上一次的时间
            lastTime = nowTime;
        }
    }
}
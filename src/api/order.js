import request from './request.js'
// 提交订单
export function fetchCommitorder(orderData) {
    return request.post('/commitorder', orderData)
}
// 获取用户订单
export function fetchUserorder(order_id) {
    return request.post(`/userorder/${order_id}`)
}

// 获取订单信息
export function fetchGetorder(order_id) {
    return request.post('/getorder/' + order_id)
}

// 模拟用户支付订单成功
export function fetchPayorder(order_id) {
    return request.post(`/payorder/${order_id}`)
}

export function fetchLogistics() {
    return request.get('/kuaidi100/')
}

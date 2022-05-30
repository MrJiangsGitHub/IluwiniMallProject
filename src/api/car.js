import request from './request.js'
// 购物车列表
export function fetchcarDataId(id) {
    return request.get(`/getshopcarlist/${id}`)
}
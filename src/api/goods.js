import request from './request.js'
export function goodsListData(page = 1, pagesize = 10) {
    return request.get(`/getgoods?pageindex=${page}&pagesize=${pagesize}`)
}

export function goodsListlunbo(id) {
    return request.get(`/getthumbimages/${id}`)
}


export function goodsListinfo(id) {
    return request.get(`/getgoodsinfo/${id}`)
}
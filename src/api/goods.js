import request from './request.js'
export function goodsListData(page = 1, pagesize = 10) {
    return request.get(`http://api.w0824.com/api/getgoods?pageindex=${page}&pagesize=${pagesize}`)
}

export function goodsListlunbo(id) {
    return request.get(`http://api.w0824.com/api/getthumbimages/${id}`)
}


export function goodsListinfo(id) {
    return request.get(`http://api.w0824.com/api/getgoodsinfo/${id}`)
}
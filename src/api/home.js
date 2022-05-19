import request from './request.js'
export function fetchlunbo() {
    return request.get('http://api.w0824.com/api/getlunbo')
}

export function fetchgoodslist(page = 1, limit = 10) {
    return request.get(`http://api.w0824.com/api/recommend?page=${page}&limit=${limit}`)
}
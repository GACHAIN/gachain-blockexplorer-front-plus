import { request, config } from 'utils';

let { api } = config
let { getTransactionList, getTransaction } = api

export function query(params) {
    return request({
        url: getTransactionList,
        method: 'POST',
        data: params,
    }) 
}

export function query_detail(params) {
    return request({
        url: getTransaction,
        method: 'POST',
        data: params
    })
}
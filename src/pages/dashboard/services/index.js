import { config, request } from 'utils';

let { api } = config
let { 
    dashboard_top_numbers, 
    dashboard_middle_blocks, 
    dashboard_middle_transactions,
    dashboard_node_map,
    dashboard_history_map,
    dashboard_gac
} = api
export function query_top_numbers(params) {
    return request({
        url: dashboard_top_numbers,
        method: 'post',
        data: params
    })
}

export function query_middle_blocks(params) {
    return request({
        url: dashboard_middle_blocks,
        method: 'post',
        data: params
    })
}

export function query_middle_transactions(params) {
    return request({
        url: dashboard_middle_transactions,
        method: 'post',
        data: params
    })
}

export function query_node_map(params) {
    return request({
        url: dashboard_node_map,
        method: 'post',
        data: params
    })
}

export function query_history_map(params) {
    return request({
        url: dashboard_history_map,
        method: 'post',
        data: params
    })
}


export function query_gac(params) {
    return request({
        url: dashboard_gac,
        method: 'post',
        data: params
    })
}

export function query_rate(params) {
    return request({
        url: "/api/v1/exchange_rate",
        data: params
    })
}

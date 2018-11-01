import { request, config } from 'utils';

const { api } = config;
const { getBlockList, getBlock } = api;

export function query(params) {
    return request({
        url: getBlockList,
        method: 'POST',
        data: params,
    })
}

export function query_detail(params) {
    return request({
        url: getBlock,
        method: 'POST',
        data: params,
    })
}
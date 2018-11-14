import { request, config } from 'utils';

let { api } = config
let { getEcosystem, getEcosystemKeys } = api

export function query(params) {
    return request({
        url: getEcosystem,
        method: 'POST',
        data: params,
    }) 
}

export function query_members(params) {
    return request({
        url: getEcosystemKeys,
        method: 'POST',
        data: params
    })
}
import { request, config } from 'utils';

let { api } = config
let { getEcosystem } = api

export function query(params) {
    return request({
        url: getEcosystem,
        method: 'POST',
        data: params,
    }) 
} 
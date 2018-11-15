import { request, config } from 'utils';

let { api } = config
let { getEcosystemKey } = api


export function query_member(params) {
    return request({
        url: getEcosystemKey,
        method: 'POST',
        data: params
    })
}
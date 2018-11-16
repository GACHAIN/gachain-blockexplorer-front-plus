import { request, config } from 'utils';

let { api } = config
let { getEcosystemKey, getEcosystemMemberTransactions } = api


export function query_member(params) {
    return request({
        url: getEcosystemKey,
        method: 'POST',
        data: params
    })
}

export function query_member_transaction(params) {
    return request({
        url: getEcosystemMemberTransactions,
        method: 'POST',
        data: params
    })
}

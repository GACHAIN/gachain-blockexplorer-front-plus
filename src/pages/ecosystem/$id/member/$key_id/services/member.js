import { request, config } from 'utils';

let { api } = config;
let { getEcosystemKey, getEcosystemMemberTransactions, getWallettotal } = api;


export function query_member(params) {
	return request({
		url: getEcosystemKey,
		method: 'POST',
		data: params
	});
}

export function query_member_transaction(params) {
	return request({
		url: getEcosystemMemberTransactions,
		method: 'POST',
		data: params
	});
}

export function query_member_transaction_info(params) {
	return request({
		url: getWallettotal,
		method: 'POST',
		data: params
	});
}

import { request, config } from 'utils';

let { api } = config
let { getSystemParam } = api

export function query(params) {
	return request({
		url: getSystemParam,
		method: 'POST',
		data: params,
	}) 
} 
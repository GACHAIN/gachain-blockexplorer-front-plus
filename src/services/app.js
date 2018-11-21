import { request, config } from 'utils';

let { api } = config;
let { getIp } = api;

export function checkIp(params) {
	return request({
		url: getIp,
		method: 'get',
		headers:{
			'content-type':'application/json'
		},
		data: params
	});
}
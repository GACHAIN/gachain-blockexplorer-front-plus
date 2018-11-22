import { request, config } from 'utils';

let { api } = config;
let { getNodeList } = api;

export function query(params) {
	return request({
		url: getNodeList,
		method: 'POST',
		data: params,
	}); 
} 
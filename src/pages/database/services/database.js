import { config, request } from 'utils';

let { api } = config;
let { getDatabase } = api;

export function query(params) {
	return request({
		url: getDatabase,
		method: 'POST',
		data: params,
	});
}
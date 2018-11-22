import api from 'utils/api';
import request from 'utils/request';

let {
	getTransactionStatus
} = api;

export function query(params) {
	return request({
		url: getTransactionStatus,
		method: 'post',
		data: params
	});
}
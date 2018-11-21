import pathToRegexp from 'path-to-regexp';
import { query_detail } from '../services/blocks';

export default {
	state: {
		dataList: [],
		total: [],
	},

	namespace: 's_block_detail',

	reducers: {
		'querySuccess'(state, {payload}) {
			return {...state, ...payload};
		}
	},

	subscriptions: {
		setup({ dispatch, history }) {
			history.listen((location) => {
				let match = pathToRegexp('/block/:block_id').exec(location.pathname);
				if (match) {
					let payload = {};
					payload.head = {
						'version': '1.0',
						'msgtype': 'request',
						'interface': 'get_block_details',
						'remark': ''
					};
					payload.params = {
						'cmd': '001',
						'block_id': Number(match[1]),
					};
					dispatch({
						type: 'query',
						payload
					});
				}
			});
		}
	},

	effects: {
		* query({ payload = {} }, { call, put }) {
			const data = yield call(query_detail, payload);
			if (data.success) {
				yield put({
					type: 'querySuccess',
					payload: {
						dataList: data.body.data,
						total: data.body.all_row_nums
					}
				});
			}
		}
	}
};
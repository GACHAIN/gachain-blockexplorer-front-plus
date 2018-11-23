import modelExtend from 'dva-model-extend';
import { baseModel } from 'utils/model';
import * as blockServices from './services/blocks';

const { query } = blockServices;

export default modelExtend(baseModel, {
	namespace: 'block',

	subscriptions: {
		setup({ dispatch, history }) {
			history.listen((location) => {
				if (location.pathname === '/block') {
					let args = {
						head: {
							'version': '1.0',
							'msgtype': 'request',
							'interface': 'get_block',
							'remark': ''
						},
						params: {
							'cmd': '001',
							'current_page': 1,
							'page_size': 10,
						}
					};
					const payload = { ...args, ...location.query };
					dispatch({
						type: 'query',
						payload
					});
				}
			});
		}
	},

	effects: {
		* query({ payload = {
		} }, { call, put }) {
			const data = yield call(query, payload);
			if (data.success) {
				yield put({
					type: 'querySuccess',
					payload: {
						dataList: data.body.data,
						total: data.body.total,
					},
				});
			}
		},
	}
});
import modelExtend from 'dva-model-extend';
import { baseModel } from 'utils/model';

import { query } from './services/index';

export default modelExtend(baseModel, {
	namespace: 'transaction_status',
	subscriptions: {
		setup({ dispatch, history }) {
			history.listen((location) => {
				if (location.pathname === '/transaction/transaction_status') {
					let args = {
						head: {
							'version': '1.0',
							'msgtype': 'request',
							'interface': 'get_transaction_status',
							'remark': ''
						},
						params: {
							'cmd': '001',
							'page_size': 10,
							'current_page': 1
						}
					};
					dispatch({
						type: 'query',
						payload: args
					});
				}
			});
		}
	},
	effects: {
		* query({ payload }, { call, put }) {
			const data = yield call(query, payload);
			if (data.success){
				yield put({
					type: 'querySuccess',
					payload: {
						dataList: data.body.data,
						total: data.body.total,
					}
				});
			}
		}
	}
});
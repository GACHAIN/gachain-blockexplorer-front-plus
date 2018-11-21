import modelExtend from 'dva-model-extend';
import { baseModel } from 'utils/model';
import { query } from './services/system_param';

export default modelExtend(baseModel, {
	namespace: 'system_param',
	subscriptions: {
		setup({ dispatch, history }) {
			history.listen((location) => {
				if (location.pathname === '/system_param') {
					let args = {
						head: {
							'version': '1.0',
							'msgtype': 'request',
							'interface': 'get_system_param',
							'remark': ''
						},
						params: {
							'cmd': '001',
							'current_page': 1,
							'page_size': 10,
						}
					};
					dispatch({
						type: 'query',
						payload: args
					});
				}
			});
		},
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
	},
});
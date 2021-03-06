import modelExtend from 'dva-model-extend';
import { query } from './services/ecosystem';
import { baseModel } from 'utils/model';

export default modelExtend(baseModel, {
	namespace: 'ecosystem',

	subscriptions: {
		setup({ dispatch, history }) {
			history.listen((location) => {
				if (location.pathname === '/ecosystem') {
					let args = {
						head: {
							'version': '1.0',
							'msgtype': 'request',
							'interface': 'get_ecosystem',
							'remark': ''
						},
						params: {
							'cmd': '001',
							'page_size':10,
							'current_page':1,
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
		* query({ payload = {} }, { call, put }) {
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
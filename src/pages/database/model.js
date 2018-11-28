import modelExtend from 'dva-model-extend';
import { query } from '../node/db_id/$db_id/table/services/database';
import { baseModel } from 'utils/model';

export default modelExtend(baseModel, {
	namespace: 'database_desc',

	subscriptions: {
		setup({ dispatch, history }) {
			history.listen((location) => {
				if (location.pathname === '/database') {
					let descriptionArgs = {
						head: {
							version: '1.0',
							msgtype: 'request',
							interface: 'database',
							remark: ''
						},
						params: {
							cmd: '001',
							page_size: 10,
							current_page: 1,
						}
					};
					dispatch({
						type: 'queryDescription',
						payload: descriptionArgs
					});
				}
			});
		},
	},
	effects: {
		*queryDescription({ payload }, { call, put }) {
			const result = yield call(query, payload);
			if (result.success) {
				yield put({
					type: 'querySuccess',
					payload: {
						description: result.body.data
					}
				});
			}
		}
	}
});
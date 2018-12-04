import modelExtend from 'dva-model-extend';
import { baseModel } from 'utils/model';
import * as blockServices from './services/blocks';

const { query } = blockServices;

export default modelExtend(baseModel, {
	namespace: 'block',

	subscriptions: {
		setup({ dispatch, history }) {
			history.listen(location => {
				if (location.pathname === '/block') {
					let requestArgs = {
						head: {
							version: '1.0',
							msgtype: 'request',
							interface: 'get_block',
							remark: ''
						},
						params: {
							cmd: '001',
							current_page: 1,
							page_size: 10,
							order: 'time desc'
						}
					};
					dispatch({
						type: 'query',
						payload: {
							requestArgs,
							location,
							dispatch
						}
					});
				}
			});
		}
	},

	effects: {
		*query({ payload = {} }, { call, put }) {
			let { requestArgs, dispatch } = payload;
			const data = yield call(query, requestArgs);
			if (data.success) {
				yield put({
					type: 'querySuccess',
					payload: {
						dataList: data.body.data,
						total: data.body.total,
						onChangeType: 'query',
						requestArgs,
						dispatch
					}
				});
			}
		}
	}
});

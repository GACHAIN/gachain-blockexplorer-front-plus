import modelExtend from 'dva-model-extend';
import { baseModel } from 'utils/model';
import { query_members } from '../services/ecosystem';
import pathToRegexp from 'path-to-regexp';

export default modelExtend(baseModel, {
	namespace: 'ecosystemID',
	state: {},
	subscriptions: {
		setup({ dispatch, history }) {
			history.listen(location => {
				let match = pathToRegexp('/ecosystem/:id').exec(
					location.pathname
				);
				let ecosystem_id;
				if (match && location.query.state === 'members') {
					ecosystem_id = parseInt(match[1], 10);
					let requestArgs = {
						head: {
							version: '1.0',
							msgtype: 'request',
							interface: 'get_ecosystem_keys',
							remark: ''
						},
						params: {
							cmd: '001',
							page_size: 10,
							current_page: 1,
							ecosystem: ecosystem_id
						}
					};
					dispatch({
						type: 'query_members',
						payload: {
							requestArgs,
							dispatch
						}
					});
				}
			});
		}
	},

	effects: {
		*query_members({ payload = {} }, { call, put }) {
			let { requestArgs, dispatch } = payload;
			const data = yield call(query_members, requestArgs);
			if (data.success) {
				yield put({
					type: 'querySuccess',
					payload: {
						dataList: data.body.data,
						total: data.body.total,
						onChangeParams: {
							ecosystem: requestArgs.params.ecosystem
						},
						onChangeType: 'query_members',
						requestArgs,
						dispatch
					}
				});
			}
		}
	}
});

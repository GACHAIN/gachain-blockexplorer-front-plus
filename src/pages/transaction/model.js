import modelExtend from 'dva-model-extend';
import { baseModel } from 'utils/model';
import * as transactionServices from './services/transactions';

const { query_transaction_by_block } = transactionServices;

export default modelExtend(baseModel, {
	namespace: 'transaction',

	subscriptions: {
		setup({ dispatch, history }) {
			history.listen(location => {
				if (location.pathname === '/transaction') {
					let requestArgs = {
						head: {
							version: '1.0',
							msgtype: 'request',
							interface: 'get_transaction',
							remark: ''
						},
						params: {
							cmd: '001',
							current_page: 1,
							page_size: 10
						}
					};
					dispatch({
						type: 'queryTransactionByBlock',
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
		*queryTransactionByBlock({ payload = {} }, { call, put }) {
			let { requestArgs, dispatch } = payload;
			const data = yield call(query_transaction_by_block, requestArgs);
			if (data.success) {
				yield put({
					type: 'querySuccess',
					payload: {
						dataList: data.body.data,
						total: data.body.total,
						onChangeType: 'queryTransactionByBlock',
						requestArgs,
						dispatch
					}
				});
			}
		}
	}
});

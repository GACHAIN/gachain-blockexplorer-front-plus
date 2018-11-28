import modelExtend from 'dva-model-extend';
import { baseModel } from 'utils/model';
import { query } from '../services/database';
import pathToRegexp from 'path-to-regexp';

export default modelExtend(baseModel, {
	namespace: 'table',
	subscriptions: {
		setup({ dispatch, history }) {
			history.listen(location => {
				let match = pathToRegexp(
					'/node/db_id/:db_id/table/:table_name'
				).exec(location.pathname);
				if (match) {
					let db_id = parseInt(match[1], 10);
					let table_name = match[2];
					let colArgs = {
						head: {
							version: '1.0',
							msgtype: 'request',
							interface: 'database',
							remark: ''
						},
						params: {
							cmd: '003',
							page_size: 10,
							current_page: 1,
							NodePosition: db_id,
							table_name: table_name
						}
					};
					let dataArgs = {
						head: {
							version: '1.0',
							msgtype: 'request',
							interface: 'database',
							remark: ''
						},
						params: {
							cmd: '004',
							page_size: 10,
							current_page: 1,
							order: 'id asc',
							NodePosition: db_id,
							table_name: table_name
						}
					};
					dispatch({
						type: 'queryColumns',
						payload: colArgs
					});
					dispatch({
						type: 'queryData',
						payload: dataArgs
					});
				}
				let matchColumns = pathToRegexp('/node/db_id/:db_id/table/:table_name/columns').exec(location.pathname);
				if (matchColumns) {
					let db_id = parseInt(matchColumns[1], 10);
					let table_name = matchColumns[2];
					let colArgs = {
						head: {
							version: '1.0',
							msgtype: 'request',
							interface: 'database',
							remark: ''
						},
						params: {
							cmd: '003',
							page_size: 10,
							current_page: 1,
							NodePosition: db_id,
							table_name: table_name
						}
					};
					dispatch({
						type: 'queryColumns',
						payload: colArgs
					});
				}
			});
		}
	},
	effects: {
		*queryColumns({ payload }, { call, put }) {
			const result = yield call(query, payload);
			if (result.success) {
				yield put({
					type: 'querySuccess',
					payload: {
						columnsData: result.body.data
					}
				});
			}
		},
		*queryData({ payload }, { call, put }) {
			let { NodePosition, table_name } = payload.params;
			const result = yield call(query, payload);
			if (result.success) {
				yield put({
					type: 'querySuccess',
					payload: {
						dataSource: result.body.data,
						dataTotal: result.body.total,
						NodePosition,
						table_name
					}
				});
			}
		}
	}
});

import modelExtend from 'dva-model-extend';
import { walletIdToAddr, walletAddrToId, checkKeyidOrAddress } from 'utils';

export const baseModel = modelExtend({
	reducers: {
		/**
         * 请求成功
         * @param {*} state
         * @param {*} param1
         */
		querySuccess(state, { payload }) {
			return {
				...state,
				...payload,
				pagination: {
					total: parseInt(payload.total, 10),
					hideOnSinglePage: true,
					showQuickJumper: true,
					showSizeChanger: true,
					onChange: (p, n) => {
						// 从uri获取分页参数
						let { dispatch } = payload;
						let requestArgs = {
							head: payload.requestArgs.head,
							params: {
								...payload.onChangeParams,
								current_page: p || 1,
								page_size: n || 10
							}
						};
						dispatch({
							type: payload.onChangeType,
							payload: {
								requestArgs,
								dispatch
							}
						});
					},
					onShowSizeChange: (p, n) => {
						let { dispatch, location } = payload;
						let requestArgs = {
							head: payload.requestArgs.head,
							params: {
								...payload.onChangeParams,
								current_page: p || 1,
								page_size: n || 10
							}
						};
						dispatch({
							type: payload.onChangeType,
							payload: {
								requestArgs,
								location,
								dispatch
							}
						});
					}
				}
			};
		},

		/**
         * keyID和地址互相转换
         * @param {*} state
         */
		toggle(state, { payload }) {
			let { index } = payload;

			state.dataList.map(item => {
				return (item[index] =
					checkKeyidOrAddress(item[index]) === 1
						? walletAddrToId(item[index])
						: walletIdToAddr(item[index]));
			});
			return { ...state };
		}
	}
});

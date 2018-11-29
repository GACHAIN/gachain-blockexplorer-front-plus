import modelExtend from 'dva-model-extend';
import { walletIdToAddr, walletAddrToId, checkKeyidOrAddress } from 'utils';
import { FormattedMessage } from 'react-intl';

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
					// showTotal: (total, range) => (
					// 	<FormattedMessage
					// 		id="PAGE_DESC"
					// 		values={{
					// 			x: range[0],
					// 			y: range[1],
					// 			total
					// 		}}
					// 	/>
					// ),
					onChange: (p, n) => {
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

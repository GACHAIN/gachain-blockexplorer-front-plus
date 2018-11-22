import React from 'react';
import { connect } from 'dva';
import List from './components/List';

const TransactionStatus = ({ transaction_status, dispatch }) => {
	let { dataList, total } = transaction_status;
    
	const listProps = {
		dataSource: dataList,
		total,
		pagination: {
			total,
			onChange: (p, n) => {
				let pageArgs = {
					head: {
						'version': '1.0',
						'msgtype': 'request',
						'interface': 'get_transaction_status',
						'remark': ''
					},
					params: {
						'cmd': '001',
						'page_size': p,
						'current_page': n
					}
				};
				dispatch({
					type: 'transaction_status/query',
					payload: pageArgs
				});
			}
		}
	};

	return (
		<div>
			<List {...listProps} />
		</div>
	);
};

export default connect(({ transaction_status, dispatch }) => ({ transaction_status, dispatch }))(TransactionStatus);
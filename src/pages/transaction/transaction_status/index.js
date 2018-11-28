import React from 'react';
import { connect } from 'dva';
import List from './components/List';
import { Alert } from 'antd';
import { FormattedMessage } from 'react-intl';

const TransactionStatus = ({ transaction_status, dispatch, loading }) => {
	let { dataList, total, pagination } = transaction_status;

	const listProps = {
		dataSource: dataList,
		rowKey: record => record.Hash,
		loading: loading.effects['transaction_status/query'],
		total,
		scroll: { x: 900 },
		pagination,
		onChange: (p, f, s) => {
			let { current, pageSize } = p;
			s = s ? s : {};
			let order = '';
			let field = `${s.field ? s.field : ''}`;
			let ord = `${s.order ? s.order.slice(0, -3) : ''}`;
			if (field === '' && ord === '') {
				order = '';
			} else {
				order = `${field} ${ord}`;
			}
			let requestArgs = {
				head: {
					version: '1.0',
					msgtype: 'request',
					interface: 'get_transaction_status',
					remark: ''
				},
				params: {
					cmd: '001',
					page_size: pageSize,
					current_page: current,
					order,
					...f
				}
			};
			dispatch({
				type: 'transaction_status/query',
				payload: {
					requestArgs,
					dispatch
				}
			});
		}
	};

	return (
		<div>
			<Alert
				message={<FormattedMessage id="ERRORPROMPT" />}
				type="error"
				style={{ marginBottom: '1rem' }}
			/>
			<List {...listProps} />
		</div>
	);
};

export default connect(({ transaction_status, dispatch, loading }) => ({
	transaction_status,
	dispatch,
	loading
}))(TransactionStatus);

import React from 'react';
import { connect } from 'dva';
import List from './components/List';
import { Alert } from 'antd';
import { FormattedMessage } from 'react-intl';

const TransactionStatus = ({ transaction_status, dispatch, loading }) => {
	let { dataList, total } = transaction_status;
	const listProps = {
		dataSource: dataList,
		rowKey: record => record.Hash,
		loading: loading.effects['transaction_status/query'],
		total,
		scroll: { x: 900 },
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
						'current_page': p,
						'page_size': n
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
			<Alert message={<FormattedMessage id="ERRORPROMPT" />} type="error" style={{marginBottom: '1rem'}}/>
			<List {...listProps} />
		</div>
	);
};

export default connect(({ transaction_status, dispatch, loading }) => ({ transaction_status, dispatch, loading }))(TransactionStatus);
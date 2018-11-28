import TransactionList from './components/List';
import { connect } from 'dva';

const Transaction = ({ transaction, dispatch, loading, location }) => {
	const { dataList, pagination } = transaction;
	function toggle(index) {
		dispatch({
			type: 'transaction/toggle',
			payload: {
				index
			}
		});
	}

	let listProps = {
		dataSource: dataList,
		loading: loading.effects['transaction/queryTransactionByBlock'],
		scroll: { x: 900 },
		onToggle: toggle,
		location,
		dispatch,
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
					interface: 'get_transaction',
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
				type: 'transaction/queryTransactionByBlock',
				payload: {
					requestArgs,
					dispatch
				}
			});
		}
	};

	return (
		<div>
			<TransactionList {...listProps} />
		</div>
	);
};

export default connect(transaction => transaction)(Transaction);

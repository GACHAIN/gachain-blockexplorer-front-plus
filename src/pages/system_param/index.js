import { connect } from 'dva';
import SystemParamList from './components/List';

const List = ({ system_param, dispatch, loading }) => {
	let { dataList, pagination } = system_param;
	let listProps = {
		dataSource: dataList,
		loading: loading.effects['system_param/query'],
		scroll: {x: 600},
		pagination,
		onChange: (p, f, s) => {
			let { current, pageSize } = p;
			s = s ? s : {};
			let order = '';
			let field = `${s.field ? s.field : ''}`;
			let ord = `${s.order ? s.order.slice(0, -3) : ''}`;
			if (field === '' && ord === '') {
				order = 'id asc';
			} else {
				order = `${field} ${ord}`;
			}
			let requestArgs = {
				head: {
					version: '1.0',
					msgtype: 'request',
					interface: 'get_system_param',
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
				type: 'system_param/query',
				payload: {
					requestArgs,
					dispatch
				}
			});
		}
	};

	return (
		<div>
			<SystemParamList {...listProps} />
		</div>
	);
};

export default connect(({ system_param, dispatch, loading }) => ({ system_param, dispatch, loading }))(List);
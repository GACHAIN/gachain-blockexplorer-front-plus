import { connect } from 'dva';
import PropTypes from 'prop-types';
import BlockList from './components/List';

const Block = ({ location, block, dispatch, loading }) => {
	const { dataList, pagination } = block;
	function toggle(index) {
		dispatch({
			type: 'block/toggle',
			payload: {
				index
			}
		});
	}
	const listProps = {
		dataSource: dataList,
		location,
		loading: loading.effects['block/query'],
		onToggle: toggle,
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
					interface: 'get_block',
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
				type: 'block/query',
				payload: {
					requestArgs,
					dispatch
				}
			});
		}
	};
	return <BlockList {...listProps} />;
};

Block.propTypes = {
	location: PropTypes.object,
	dispatch: PropTypes.func,
	loading: PropTypes.object
};

export default connect(({ block, loading }) => ({ block, loading }))(Block);

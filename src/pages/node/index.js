import { connect } from 'dva';
import NodeList from './components/List';

const Nodelist = ({ dispatch, node, loading }) => {
	const { dataList, total } = node;
	function toggle(index) {
		dispatch({
			type: 'node/toggle',
			payload: {
				index
			}
		});
	}
	let listProps = {
		dataSource: dataList,
		loading: loading.effects['node/query'],
		onToggle: toggle,
		scroll: { x: 600 },
		pagination: {
			total: Number(total),
			showQuickJumper: true,
			hideOnSinglePage: true,
			onChange(p, n) {
				let args = {
					head: {
						'version': '1.0',
						'msgtype': 'request',
						'interface': 'get_node',
						'remark': ''
					},
					params: {
						'cmd': '001',
						'page_size': p || 10,
						'current_page': n || 1,
					}
				};
				dispatch({
					type: 'node/query',
					payload: args
				});
			}
		}
	};

	return (
		<div>
			<NodeList {...listProps} />
		</div>
	);
};

export default connect(({ node, loading, dispatch }) => ({ node, loading, dispatch }))(Nodelist);
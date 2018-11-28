import { connect } from 'dva';
import SystemParamList from './components/List';

const List = ({ system_param, loading }) => {
	let { dataList, pagination } = system_param;
	let listProps = {
		dataSource: dataList,
		loading: loading.effects['system_param/query'],
		scroll: {x: 600},
		pagination
	};

	return (
		<div>
			<SystemParamList {...listProps} />
		</div>
	);
};

export default connect(({ system_param, loading }) => ({ system_param, loading }))(List);
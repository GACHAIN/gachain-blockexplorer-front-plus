import { connect } from 'dva';
import EcosystemList from './components/List';

const List = ({ ecosystem, loading }) => {
	const { dataList } = ecosystem;
	localStorage.setItem('ecosysteList', JSON.stringify(dataList));
	let listProps = {
		loading: loading.effects['ecosystem/query'],
		dataSource: dataList,
		hideOnSinglePage: true,
		scroll: {x: 400},
		pagination: false
	};

	return (
		<div>
			<EcosystemList {...listProps}/>
		</div>
	);
};

export default connect(({ ecosystem, loading }) => ({ ecosystem, loading }))(List);
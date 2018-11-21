import List from './components/List';
import { connect } from 'dva';

const Database = ({ database, dispatch, loading }) => {
	let { dataList } = database;
	let listProps = {
		loading: loading.effects['database/query'],
		dataSource: dataList,
	};
	return (
		<List {...listProps} />
	);
};

export default connect( ({database, loading}) => ({database, loading}) )(Database);
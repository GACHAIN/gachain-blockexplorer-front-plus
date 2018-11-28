import List from './components/List';
import { connect } from 'dva';
import { FormattedMessage } from 'react-intl';

const Database = ({ database, dispatch, loading }) => {
	let { dataList, total, NodePosition, description } = database;
	let currentDesc = {};
	if (!loading.effects['database/queryDescription']) {
		for (let i = 0; i < (description ? description.length : []); i++) {
			if (
				parseInt(description[i].ID, 10) === parseInt(NodePosition, 10)
			) {
				currentDesc = description[i];
			}
		}
	}
	let changePage = (p, n) => {
		let pageArgs = {
			head: {
				version: '1.0',
				msgtype: 'request',
				interface: 'database',
				remark: ''
			},
			params: {
				cmd: '002',
				current_page: p,
				page_size: n,
				NodePosition
			}
		};
		dispatch({
			type: 'database/queryTables',
			payload: pageArgs
		});
	};

	let listProps = {
		tableLoading: loading.effects['database/queryTables'],
		descLoading: loading.effects['database/queryDescription'],
		dataSource: dataList,
		currentDesc,
		pagination: {
			total: Number(total),
			hideOnSinglePage: true,
			showQuickJumper: true,
			showTotal: (total, range) => (
				<FormattedMessage
					id="PAGE_DESC"
					values={{
						x: range[0],
						y: range[1],
						total
					}}
				/>
			),
			showSizeChanger: true,
			onShowSizeChange: (p, n) => {
				changePage(p, n);
			},
			onChange: (p, n) => {
				changePage(p, n);
			}
		}
	};
	return <List {...listProps} />;
};

export default connect(({ database, dispatch, loading }) => ({
	database,
	dispatch,
	loading
}))(Database);

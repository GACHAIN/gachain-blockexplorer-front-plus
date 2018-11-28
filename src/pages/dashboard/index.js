import { Row, Col } from 'antd';
import { connect } from 'dva';
import {
	TopNumbers,
	MiddleBlocks,
	MiddleTransactions,
	NodeMap,
	OverView,
	HistoryMap
} from './components';

const Dashboard = ({ loading, dashboard }) => {
	let { top_numbers, middle_blocks, middle_transactions, node_map, history_map, gac } = dashboard;
	let top_numers_props = {
		loading: loading.effects['dashboard/query_top_numbers'],
		data: top_numbers
	};

	let middle_blocks_props = {
		loading: loading.effects['dashboard/query_middle_blocks'],
		data: middle_blocks
	};

	let middle_transactions_props = {
		loading: loading.effects['dashboard/query_middle_transactions'],
		data: middle_transactions
	};

	let node_map_props = {
		loading: loading.effects['dashboard/query_node_map'],
		data: node_map
	};

	let history_map_props = {
		loading: loading.effects['dashboard/query_history_map'],
		data: history_map
	};

	let gac_props = {
		loading: loading.effects['dashboard/query_gac'],
		data: gac,
		top_numbers
	};

	return (
		<Row gutter={24} style={{ padding: '12px' }}>
			<Row style={{ marginBottom: '10px' }}>
				<TopNumbers {...top_numers_props} />
			</Row>
			<Row style={{ marginTop: '10px', marginBottom: '10px' }}>
				<Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12} id="overview">
					<OverView {...gac_props} />
				</Col>
				<Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12} id="node_map">
					<NodeMap {...node_map_props} />
				</Col>
			</Row>
			<Row style={{ height: '300px' }}>
				<Col xs={24} sm={24} md={24} lg={24}>
					<HistoryMap {...history_map_props} />
				</Col>
			</Row>
			<Row style={{ marginBottom: '10px' }}>
				<Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12} id="blocks">
					<MiddleBlocks {...middle_blocks_props} />
				</Col>
				<Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12} id="transactions">
					<MiddleTransactions {...middle_transactions_props} />
				</Col>
			</Row>
		</Row>
	);
};

export default connect(({ loading, dispatch, dashboard }) => ({ loading, dispatch, dashboard }))(Dashboard);
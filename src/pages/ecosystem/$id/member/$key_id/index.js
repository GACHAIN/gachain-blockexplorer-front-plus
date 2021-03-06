import MemberInfo from './components/MemberInfo';
import MemberTransfer from './components/MemberTransfer';
import { Row, Col } from 'antd';
import { connect } from 'dva';

const Member = ({ member, loading, location, dispatch }) => {
	let { member_info, incomeList, total, outcomeList, member_transaction_info, sum } = member;
	const memberInfoProps = {
		data: member_info,
		member_transaction_info,
		loading: loading.effects['member/query_member'],
		total,
		location
	};

	const memberTransferProps = {
		dispatch,
		member_info,
		incomeList,
		outcomeList,
		loading: loading.effects['member/query_member_transaction'],
		location,
		total,
		sum
	};

	return (
		<Row gutter={24} id="member_info">
			<Col xs={24} sm={24} md={10} lg={8} xl={8} xxl={8} style={{ paddingBottom: '1rem' }}>
				<MemberInfo {...memberInfoProps} />
			</Col>
			<Col xs={24} sm={24} md={14} lg={16} xl={16} xxl={16}>
				<MemberTransfer {...memberTransferProps} />
			</Col>
		</Row>
	);
};

export default connect(({ member, loading }) => ({ member, loading }))(Member);
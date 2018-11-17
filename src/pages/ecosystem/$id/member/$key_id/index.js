import MemberInfo from './components/MemberInfo';
import MemberTransfer from './components/MemberTransfer';
import { Row, Col, Spin } from 'antd';
import { connect } from 'dva';

const Member = ({ member, loading, location, dispatch }) => {
    console.log(loading)
    let { member_info, incomeList, total, outcomeList } = member
    const memberInfoProps = {
        data: member_info,
        loading: loading.effects['member/query_member'],
        total,
    }

    const memberTransferProps = {
        dispatch,
        member_info,
        incomeList,
        outcomeList,
        loading: loading.effects['member/query_member_transaction'],
        location,
        total
    }

    return (
        <Row gutter={24} id="member_info">
            <Col xs={24} sm={24} md={10} lg={8} xl={8} xxl={8} style={{ paddingBottom: '1rem' }}>
                <Spin spinning={loading.effects['member/query_member']} delay={500}>
                    <MemberInfo {...memberInfoProps} />
                </Spin>
            </Col>
            <Col xs={24} sm={24} md={14} lg={16} xl={16} xxl={16}>
                <Spin spinning={loading.effects['member/query_member_transaction']} delay={500}>
                    <MemberTransfer {...memberTransferProps} />
                </Spin>
            </Col>
        </Row>
    )
}

export default connect(({ member, loading }) => ({ member, loading }))(Member)
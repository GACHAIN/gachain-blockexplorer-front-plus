import MemberInfo from './components/MemberInfo';
import MemberTransfer from './components/MemberTransfer';
import { Row, Col } from 'antd';
import { connect } from 'dva';

const Member = ({member, loading}) => {
    console.log(loading)
    const memberInfoProps = {
        data: member,
        loading: loading.global
    }

    const memberTransferProps = {

    }

    return (
        <Row gutter={24} id="member_info">
            <Col span={8}>
                <MemberInfo {...memberInfoProps}/>
            </Col>
            <Col span={16}>
                <MemberTransfer {...memberTransferProps}/>
            </Col>
        </Row>
    )
}

export default connect(member=>member)(Member)
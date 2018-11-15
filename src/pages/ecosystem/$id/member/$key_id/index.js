import MemberInfo from './components/MemberInfo';
import { Row, Col } from 'antd';
import { connect } from 'dva';

const Member = ({ member }) => {
    console.log(member)

    const memberInfoProps = {
       member
    }

    return (
        <Row gutter={24} id="member_info">
            <Col span={8}>
                <MemberInfo {...memberInfoProps}/>
            </Col>
        </Row>
    )

}

export default connect(({ member }) => { member })(Member)
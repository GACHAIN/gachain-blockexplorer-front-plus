import { Card, Row, Col, Avatar, Divider, Icon } from 'antd';
import { FormattedMessage } from 'react-intl';
import { qGacToGac, fmoney, checkKeyidOrAddress, walletAddrToId, walletIdToAddr } from 'utils'
import gac from '@public/gac.svg'

const MemberInfo = ({ data }) => {
    /**点击KeyID地址切换 */
    let toggle = (e) => {
        let text = e.target.innerHTML
        text = checkKeyidOrAddress(text) === 1 ? walletAddrToId(text) : walletIdToAddr(text)
        e.target.innerHTML = text
    }
    return (
        <Card span={4} title={<FormattedMessage id="MEM_MEMBERINFO" />}>
            <Row id="member_img">
                <Avatar src={require('@public/tx.png')} />
            </Row>
            <Row id="member_name">
                <span onClick={(e) => toggle(e)} style={{ cursor: 'pointer' }}>{data.id}</span>
            </Row>
            {/* <Row id="member_description">
                <span>这个家伙很懒，什么也没有留下</span>
            </Row> */}
            <Divider dashed={true} />
            <Row>
                <h4><FormattedMessage id="MEM_ASSETS" /></h4>
                <Row id="member_assets">
                    <Col span={8}>
                        <span>
                            <Icon component={gac} style={{fontSize: '2rem', verticalAlign: 'middle'}}/>
                            <span style={{fontWeight: 'bold', paddingLeft: '0.5rem'}}>GAC</span>
                        </span>
                    </Col>
                    <Col span={16} style={{paddingTop: '0.5rem'}}>
                        <span id="gac_amount">{fmoney(qGacToGac(data.amount), 4)} GAC</span>
                    </Col>
                </Row>
            </Row>
            {/* <Divider dashed={true} />
            <Row>
                <h4>生态系统</h4>
            </Row>
            <Row id="member_union">
                <Col span={12}>
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    <span>中国信息协会</span>
                </Col>
                <Col span={12}>
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    <span>广州南沙区政府</span>
                </Col>
            </Row>
            <Row id="member_union">
                <Col span={12}>
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    <span>中国信息协会</span>
                </Col>
                <Col span={12}>
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    <span>广州南沙区政府</span>
                </Col>
            </Row>
            <Row id="member_union">
                <Col span={12}>
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    <span>中国信息协会</span>
                </Col>
                <Col span={12}>
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    <span>广州南沙区政府</span>
                </Col>
            </Row> */}
        </Card>
    )
}

export default MemberInfo

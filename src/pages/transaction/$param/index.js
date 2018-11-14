import DetailList from './components/DetailList';
import { walletIdToAddr, walletAddrToId, checkKeyidOrAddress } from 'utils';
import { Tag, Row, Col } from 'antd';
import { qGacToGac } from 'utils';
import Link from 'umi/link';
import { connect } from 'dva';
import moment from 'moment';

const TransactionHash = ({s_transaction, loading }) => {
    let { dataList } = s_transaction
    let senderID, recipient1, recipient2, recipient3

    let toggle = (e) => {
        let text = e.target.innerHTML
        text = checkKeyidOrAddress(text) === 1 ? walletAddrToId(text) : walletIdToAddr(text)
        e.target.innerHTML = text
    }

    function handle_s_transaction(data) {
        let allArr = []
        for (let k in data) {
            let obj = {}
            obj.key = k
            let valueArr = []
            for (let k1 in data[k]) {
                let valueObj = {}
                valueObj.key = k1

                if (k1 === "senderID") {
                    senderID = data[k][k1]
                    continue
                }

                if (k1 === "recipientID1") {
                    recipient1 = data[k][k1]
                    continue
                }

                if (k1 === "recipientID2") {
                    recipient2 = data[k][k1]
                    continue
                }

                if (k1 === "recipientID3") {
                    recipient3 = data[k][k1]
                    continue
                }

                valueObj.value = data[k][k1]
                if (valueObj.key === "amount1") {
                    valueObj.key = "Amount"
                    valueObj.value = (
                        <Row gutter={24}>
                            <Col xs={24} ms={24} md={24} lg={8} xl={8} xxl={8} id="send" onClick={(e)=>toggle(e)}>{senderID}</Col>
                            <Col xs={24} ms={24} md={24} lg={3} xl={3} xxl={3} id="arrow-right"><span>➤</span></Col>
                            <Col xs={24} ms={24} md={24} lg={8} xl={8} xxl={8} id="recipient" onClick={(e)=>toggle(e)}>{recipient1}</Col>
                            <Col xs={24} ms={24} md={24} lg={5} xl={5} xxl={5} id="gac_col">
                                <span id="gac_amount">+{qGacToGac(valueObj.value)} GAC</span>
                            </Col>
                        </Row>
                    )
                }

                if (valueObj.key === "amount2") {
                    valueObj.key = "Service Fee"
                    valueObj.value = (
                        <Row gutter={24}>
                            <Col xs={24} ms={24} md={24} lg={8} xl={8} xxl={8} id="send" onClick={(e)=>toggle(e)}>{senderID}</Col>
                            <Col xs={24} ms={24} md={24} lg={3} xl={3} xxl={3} id="arrow-right"><span>➤</span></Col>
                            <Col xs={24} ms={24} md={24} lg={8} xl={8} xxl={8} id="recipient" onClick={(e)=>toggle(e)}>{recipient2}</Col>
                            <Col xs={24} ms={24} md={24} lg={5} xl={5} xxl={5} id="gac_col">
                                <span id="gac_amount">+{qGacToGac(valueObj.value)} GAC</span>
                            </Col>
                        </Row>
                    )
                }

                if (valueObj.key === "amount3") {
                    valueObj.key = "Commission"
                    valueObj.value = (
                        <Row gutter={24}>
                            <Col xs={24} ms={24} md={24} lg={8} xl={8} xxl={8} id="send" onClick={(e)=>toggle(e)}>{senderID}</Col>
                            <Col xs={24} ms={24} md={24} lg={3} xl={3} xxl={3} id="arrow-right"><span>➤</span></Col>
                            <Col xs={24} ms={24} md={24} lg={8} xl={8} xxl={8} id="recipient" onClick={(e)=>toggle(e)}>{recipient3}</Col>
                            <Col xs={24} ms={24} md={24} lg={5} xl={5} xxl={5} id="gac_col">
                                <span id="gac_amount">+{qGacToGac(valueObj.value)} GAC</span>
                            </Col>
                        </Row>
                    )
                }

                if (valueObj.key === 'createdAt') {
                    valueObj.value = (
                        <Row>
                            <Tag color="#2db7f5">{moment(valueObj.value).format('YY-MM-DD HH:MM:SS')}</Tag>
                            <Tag color="#108ee9">{moment(valueObj.value).fromNow()}</Tag>
                        </Row>
                    )
                }

                if (valueObj.key === 'Time' || valueObj.key === 'time') {
                    valueObj.value = (
                        <Row>
                            <Tag color="#2db7f5">{moment(valueObj.value*1000).format('YY-MM-DD HH:MM:SS')}</Tag>
                            <Tag color="#108ee9">{moment(valueObj.value*1000).fromNow()}</Tag>
                        </Row>
                    )
                }

                if (valueObj.key === 'blockID' || valueObj.key === 'BlockID') {
                    valueObj.value = (
                        <Link to={`/block/${valueObj.value}`}>{valueObj.value}</Link>
                    )
                }
                valueArr.push(valueObj)
                obj.value = valueArr
            }
            allArr.push(obj)
        }
        return allArr
    }

    let listProps = {
        listData: handle_s_transaction(dataList),
        pagination: false,
        loading: loading.effects['s_transaction/query'],
    }


    return (
        <DetailList {...listProps} />
    )
}

export default connect( ({dispatch, s_transaction, loading }) => ({dispatch, s_transaction, loading }))(TransactionHash)
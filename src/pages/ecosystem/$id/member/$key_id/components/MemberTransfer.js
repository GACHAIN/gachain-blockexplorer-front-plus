import { Card, Tabs, Icon, Row } from 'antd';
import router from 'umi/router';
import { stringify } from 'qs';
import { qGacToGac, fmoney } from 'utils'
import { FormattedMessage } from 'react-intl';
import Link from 'umi/link';
import InCome from './svg/income.svg';
import OutCome from './svg/outcome.svg';

const TabPane = Tabs.TabPane;
const MemberTransfer = ({ incomeList, outcomeList, location }) => {
    const handleTabClick = (key) => {
        let { pathname } = location
        router.push({
            pathname,
            search: stringify({
                state: key,
            }),
        })
    }
    return (
        <Card title={<FormattedMessage id="MEM_TRANSACTION" />}>
            <Tabs onTabClick={handleTabClick} defaultActiveKey={location.query.state}>
                <TabPane tab={<span><Icon component={InCome} /><FormattedMessage id="MEM_INCOME" /></span>} key="income">
                    {
                        incomeList ?
                            incomeList.map((item) => {
                                console.log(item)
                                return (
                                    <Row id="member_transfer_list" key={item.txHash + Math.random()}>
                                        <Row>
                                            <h4><FormattedMessage id="MEM_HASH" />：
                                                <Link to={`/transaction/${item.txHash}`}>
                                                    {item.txHash}
                                                </Link>
                                            </h4>
                                        </Row>
                                        <Row>
                                            <FormattedMessage id="MEM_SEND" />：
                                            <a href={`#/ecosystem/1/member/${item.senderID}?state=income`}>
                                                {item.senderID}
                                            </a>
                                        </Row>
                                        <Row>
                                            <FormattedMessage id="MEM_REC" />：
                                            <a href={`#/ecosystem/1/member/${item.recipientID}?state=income`}>
                                                {item.recipientID}
                                            </a>
                                        </Row>
                                        <Row>
                                            <FormattedMessage id="Amount" />：<span id="gac_amount">{fmoney(qGacToGac(item.amount), 4)} GAC</span>
                                        </Row>
                                    </Row>
                                )
                            }) :
                            []
                    }
                </TabPane>
                <TabPane tab={<span><Icon component={OutCome} /><FormattedMessage id="MEM_OUTCOME" /></span>} key="outcome">
                    {
                        outcomeList ?
                            outcomeList.map((item) => {
                                return (
                                    <Row id="member_transfer_list" key={item.txHash + Math.random()}>
                                        <Row>
                                            <h4><FormattedMessage id="MEM_HASH" />：{item.txHash}</h4>
                                        </Row>
                                        <Row>
                                            <FormattedMessage id="MEM_SEND" />：
                                            <a href={`#/ecosystem/1/member/${item.senderID}?state=income`}>
                                                {item.senderID}
                                            </a>
                                        </Row>
                                        <Row>
                                            <FormattedMessage id="MEM_REC" />：
                                            <a href={`#/ecosystem/1/member/${item.recipientID}?state=income`}>
                                                {item.recipientID}
                                            </a>
                                        </Row>
                                        <Row>
                                            <FormattedMessage id="Amount" />：<span id="gac_amount">{fmoney(qGacToGac(item.amount), 4)} GAC</span>
                                        </Row>
                                    </Row>
                                )
                            }) :
                            []
                    }
                </TabPane>
            </Tabs>
        </Card>
    )
}

export default MemberTransfer
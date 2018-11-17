import { Card, Tabs, Icon, Row, Pagination } from 'antd';
import router from 'umi/router';
import { stringify } from 'qs';
import { qGacToGac, fmoney } from 'utils'
import { FormattedMessage } from 'react-intl';
import moment from 'moment';
import Link from 'umi/link';
import InCome from './svg/income.svg';
import OutCome from './svg/outcome.svg';

const TabPane = Tabs.TabPane;
const MemberTransfer = ({ member_info, incomeList, outcomeList, total, location, dispatch }) => {
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
                                return (
                                    <Row id="member_transfer_list" key={item.txHash + Math.random()}>
                                        <Row>
                                            <h4><FormattedMessage id="MEM_HASH" />：
                                                <Link to={`/transaction/${item.txHash}`} id="textOverflow" style={{verticalAlign: 'bottom'}}>
                                                    {item.txHash}
                                                </Link>
                                            </h4>
                                        </Row>
                                        <Row>
                                            <FormattedMessage id="time" />：
                                            {moment(item.createdAt).format()}
                                        </Row>
                                        <Row>
                                            <FormattedMessage id="utc-time" />：
                                            {moment(item.createdAt).utc().format()}
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
            </Tabs>
            <Pagination
                hideOnSinglePage={true}
                
                onChange={(p, s) => {
                    let query_member_transaction_args = {
                        head: { "version": "1.0", "msgtype": "request", "interface": "get_find_tranhistory", "remark": "" },
                        params: { "cmd": "001", "page_size": s || 5, "current_page": p || 1, "wallet": member_info.id, "ecosystem": parseInt(member_info.ecosystem), "searchType": location.query.state, }
                    }
                    dispatch({
                        type: 'member/query_member_transaction',
                        payload: query_member_transaction_args
                    })
                }}
                defaultCurrent={1} 
                defaultPageSize={10}
                total={total} 
                style={{textAlign: "center", paddingTop: '1rem'}
            }/>
        </Card>
    )
}

export default MemberTransfer
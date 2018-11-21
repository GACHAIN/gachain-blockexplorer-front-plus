import { Card, Tabs, Icon, Row, Pagination, Collapse, Col } from 'antd';
import router from 'umi/router';
import { stringify } from 'qs';
import { qGacToGac, fmoney } from 'utils'
import { FormattedMessage } from 'react-intl';
import moment from 'moment';
import Link from 'umi/link';

import InCome from '@public/income.svg';
import OutCome from '@public/outcome.svg';

const TabPane = Tabs.TabPane;
const Panel = Collapse.Panel;
const MemberTransfer = ({ member_info, incomeList, outcomeList, total, location, dispatch, sum }) => {
    
	const handleTabClick = (key) => {
		let { pathname } = location
		router.push({
			pathname,
			search: stringify({
				state: key,
			}),
		})
	}

	function getIncomeList() {
		if (incomeList) {
			return incomeList.map((item) => {
				return (
					<Collapse accordion>
						<Panel header={
							`${moment(item.createdAt).fromNow()} +${fmoney(qGacToGac(item.amount), 4)} GAC`
						} key={item.txHash + Math.random()}>
							<Row id="member_transfer_list" key={item.txHash + Math.random()}>
								<Row>
									<h4><FormattedMessage id="MEM_HASH" />：
										<Link to={`/transaction/${item.txHash}`}>
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
									<a href={`#/ecosystem/1/member/${item.senderID}?state=${location.query.state}`}>
										{item.senderID}
									</a>
								</Row>
								<Row>
									<FormattedMessage id="MEM_REC" />：
									<a href={`#/ecosystem/1/member/${item.recipientID}?state=${location.query.state}`}>
										{item.recipientID}
									</a>
								</Row>
								<Row>
									<FormattedMessage id="Amount" />：<span id="gac_amount">{fmoney(qGacToGac(item.amount), 4)} GAC</span>
								</Row>
							</Row>
						</Panel>
					</Collapse>
				)
			})
		} else {
			return (
				<Row>
					<Col span={24} style={{textAlign: 'center', color: '#999'}}>
						<FormattedMessage id="NO_RECORD_REC" />
					</Col>
				</Row>
			)
		}
	}

	function getOutcomeList() {
		if (outcomeList) {
			return outcomeList.map((item) => {
				return (
					<Collapse accordion>
						<Panel header={
							`${moment(item.createdAt).fromNow()} -${fmoney(qGacToGac(item.amount), 4)} GAC`
						} key={item.txHash + Math.random()}>
							<Row id="member_transfer_list" key={item.txHash + Math.random()}>
								<Row>
									<h4><FormattedMessage id="MEM_HASH" />：
										<Link to={`/transaction/${item.txHash}`}>
											{item.txHash}
										</Link>
									</h4>
									<Row>
										<FormattedMessage id="time" />：
										{moment(item.createdAt).format()}
									</Row>
									<Row>
										<FormattedMessage id="utc-time" />：
										{moment(item.createdAt).utc().format()}
									</Row>
								</Row>
								<Row>
									<FormattedMessage id="MEM_SEND" />：
									<a href={`#/ecosystem/1/member/${item.senderID}?state=${location.query.state}`}>
										{item.senderID}
									</a>
								</Row>
								<Row>
									<FormattedMessage id="MEM_REC" />：
									<a href={`#/ecosystem/1/member/${item.recipientID}?state=${location.query.state}`}>
										{item.recipientID}
									</a>
								</Row>
								<Row>
									<FormattedMessage id="Amount" />：<span id="gac_amount">{fmoney(qGacToGac(item.amount), 4)} GAC</span>
								</Row>
							</Row>
						</Panel>
					</Collapse>
				)
			})
		} else {
			return (
				<Row>
					<Col span={24} style={{textAlign: 'center', color: '#999'}}>
						<FormattedMessage id="NO_RECORD_SENT" />
					</Col>
				</Row>
			)
		}
	}
	console.log(sum)
	return (
		<Card title={<FormattedMessage id="MEM_TRANSACTION" />}>
			<Row>
				<span><span style={{fontWeight: 'bold'}}><FormattedMessage id="MEM_TOTAL" /></span>：<span id="gac_amount">{fmoney(qGacToGac(sum), 4)} GAC</span></span>
			</Row>
			<Tabs onTabClick={handleTabClick} defaultActiveKey={location.query.state}>
                
				<TabPane tab={<span><Icon component={InCome} /><FormattedMessage id="MEM_INCOME" /></span>} key="income">
					{ getIncomeList() }
				</TabPane>
				<TabPane tab={<span><Icon component={OutCome} /><FormattedMessage id="MEM_OUTCOME" /></span>} key="outcome">
					{ getOutcomeList() }
				</TabPane>
			</Tabs>
			<Pagination
				hideOnSinglePage={true}
				onChange={(p, s) => {
					let query_member_transaction_args = {
						head: { 'version': '1.0', 'msgtype': 'request', 'interface': 'get_find_tranhistory', 'remark': '' },
						params: { 'cmd': '001', 'page_size': s || 5, 'current_page': p || 1, 'wallet': member_info.id, 'ecosystem': parseInt(member_info.ecosystem, 10), 'searchType': location.query.state, }
					}
					dispatch({
						type: 'member/query_member_transaction',
						payload: query_member_transaction_args
					})
				}}
				defaultCurrent={1}
				defaultPageSize={10}
				total={total}
				style={{ textAlign: 'center', paddingTop: '1rem' }
				} />
		</Card>
	)
}

export default MemberTransfer
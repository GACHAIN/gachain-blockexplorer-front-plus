import { Card, Tabs, Icon, Row, Pagination, Collapse, Col, Spin } from 'antd';
import router from 'umi/router';
import { stringify } from 'qs';
import { qGacToGac, fmoney, clickCp } from 'utils';
import { FormattedMessage } from 'react-intl';
import moment from 'moment';
import Link from 'umi/link';

import InCome from 'public/income.svg';
import OutCome from 'public/outcome.svg';

const TabPane = Tabs.TabPane;
const Panel = Collapse.Panel;
const MemberTransfer = ({ member_info, incomeList, outcomeList, total, location, dispatch, loading }) => {

	const handleTabClick = (key) => {
		let { pathname } = location;
		router.push({
			pathname,
			search: stringify({
				state: key,
			}),
		});
	};

	function getIncomeList() {
		let result = [];
		if (incomeList) {
			result = incomeList.map((item) => (
				<Collapse accordion key={item.txhash} loading={loading}>
					<Panel header={
						`${moment(item.created_at).fromNow()} +${fmoney(qGacToGac(item.amount), 4)} GAC`
					}>
						<Row id="member_transfer_list">
							<Row>
								<h4>
									<span style={{ display: 'inline-block', float: 'left' }}>
										<FormattedMessage id="MEM_HASH" />
									</span>
									<Link id="textOverflow" to={`/transaction/${item.txhash}`} style={{ float: 'left' }}>
										{item.txhash}
									</Link>
									<Icon type="copy" id="copy" onClick={() => clickCp(item.txhash)} />
								</h4>

							</Row>
							<Row>
								<FormattedMessage id="time" />：
								{moment(item.created_at).format()}
							</Row>
							<Row>
								<FormattedMessage id="utc-time" />：
								{moment(item.created_at).utc().format()}
							</Row>
							<Row style={{lineHeight: '1rem'}}>
								<Col xs={24} sm={24} md={24} lg={10} xl={10} xxl={10}>
									{/* <FormattedMessage id="MEM_SEND" />： */}
									<a href={`#/ecosystem/1/member/${item.sender_id}?state=${location.query.state}`}>
										{item.sender_id}
									</a>
									<Icon type="copy" id="copy" onClick={() => clickCp(item.sender_id)} />
								</Col>
								<Col xs={24} sm={24} md={24} lg={4} xl={4} xxl={4} id="arrow-right">
									<span>➤</span>
								</Col>
								<Col xs={24} sm={24} md={24} lg={10} xl={10} xxl={10}>
									{/* <FormattedMessage id="MEM_REC" />： */}
									<a href={`#/ecosystem/1/member/${item.recipient_id}?state=${location.query.state}`}>
										{item.recipient_id}
									</a>
									<Icon type="copy" id="copy" onClick={() => clickCp(item.recipient_id)} />
								</Col>
							</Row>

							<Row>
								<FormattedMessage id="Amount" />：<span id="gac_amount">{fmoney(qGacToGac(item.amount), 4)} GAC</span>
							</Row>
						</Row>
					</Panel>
				</Collapse>
			));
		} else {
			result = (
				<Row>
					<Col span={24} style={{ textAlign: 'center', color: '#999' }}>
						<FormattedMessage id="NO_RECORD_REC" />
					</Col>
				</Row>
			);
		}
		return result;
	}

	function getOutcomeList() {
		let result = [];
		if (outcomeList) {
			result = outcomeList.map((item) => (
				<Collapse accordion key={item.txhash + Math.random()}>
					<Panel header={
						`${moment(item.created_at).fromNow()} -${fmoney(qGacToGac(item.amount), 4)} GAC`
					} >
						<Row id="member_transfer_list" key={item.txhash + Math.random()}>
							<Row>
								<h4>
									<span style={{ display: 'inline-block', float: 'left' }}>
										<FormattedMessage id="MEM_HASH" />
									</span>
									<Link id="textOverflow" to={`/transaction/${item.txhash}`} style={{ float: 'left' }}>
										{item.txhash}
									</Link>
									<Icon type="copy" id="copy" onClick={() => clickCp(item.txhash)} />
								</h4>
								<Row>
									<FormattedMessage id="time" />：
									<span>{moment(item.created_at).format()}</span>
								</Row>
								<Row>
									<FormattedMessage id="utc-time" />：
									<span>{moment(item.created_at).utc().format()}</span>
								</Row>
							</Row>
							<Row style={{lineHeight: '1rem'}}>
								<Col xs={24} sm={24} md={24} lg={10} xl={10} xxl={10}>
									{/* <FormattedMessage id="MEM_SEND" />： */}
									<a href={`#/ecosystem/1/member/${item.sender_id}?state=${location.query.state}`}>
										{item.sender_id}
									</a>
									<Icon type="copy" id="copy" onClick={() => clickCp(item.sender_id)} />
								</Col>
								<Col xs={24} sm={24} md={24} lg={4} xl={4} xxl={4} id="arrow-right">
									<span>➤</span>
								</Col>
								<Col xs={24} sm={24} md={24} lg={10} xl={10} xxl={10}>
									{/* <FormattedMessage id="MEM_REC" />： */}
									<a href={`#/ecosystem/1/member/${item.recipient_id}?state=${location.query.state}`}>
										{item.recipient_id}
									</a>
									<Icon type="copy" id="copy" onClick={() => clickCp(item.recipient_id)} />
								</Col>
							</Row>
							<Row>
								<FormattedMessage id="Amount" />：<span id="gac_amount">{fmoney(qGacToGac(item.amount), 4)} GAC</span>
							</Row>
						</Row>
					</Panel>
				</Collapse>
			));
		} else {
			result = (
				<Row key={Math.random()}>
					<Col span={24} style={{ textAlign: 'center', color: '#999' }}>
						<FormattedMessage id="NO_RECORD_SENT" />
					</Col>
				</Row>
			);
		}
		return result;
	}
	return (
		<Spin spinning={loading}>
			<Card title={<FormattedMessage id="MEM_TRANSACTION" />}>

				<Tabs onTabClick={handleTabClick} defaultActiveKey={location.query.state}>

					<TabPane tab={<span><Icon component={InCome} /><FormattedMessage id="MEM_INCOME" /></span>} key="income">
						{getIncomeList()}
					</TabPane>
					<TabPane tab={<span><Icon component={OutCome} /><FormattedMessage id="MEM_OUTCOME" /></span>} key="outcome">
						{getOutcomeList()}
					</TabPane>
				</Tabs>
				<Pagination
					hideOnSinglePage={true}
					onChange={(p, s) => {
						let query_member_transaction_args = {
							head: { 'version': '1.0', 'msgtype': 'request', 'interface': 'get_find_tranhistory', 'remark': '' },
							params: { 'cmd': '001', 'page_size': s || 5, 'current_page': p || 1, 'wallet': member_info.id, 'ecosystem': parseInt(member_info.ecosystem, 10), 'searchType': location.query.state, }
						};
						dispatch({
							type: 'member/query_member_transaction',
							payload: query_member_transaction_args
						});
					}}
					defaultCurrent={1}
					defaultPageSize={10}
					total={total}
					style={{ textAlign: 'center', paddingTop: '1rem' }
					} />
			</Card>
		</Spin>
	);
};

export default MemberTransfer;
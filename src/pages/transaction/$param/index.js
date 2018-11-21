import DetailList from './components/DetailList';
import { walletIdToAddr, walletAddrToId, checkKeyidOrAddress, fmoney, qGacToGac } from 'utils';
import { Row, Col } from 'antd';
import Link from 'umi/link';
import { connect } from 'dva';
import moment from 'moment';

const TransactionHash = ({ s_transaction, loading }) => {
	let { dataList } = s_transaction;
	let senderID, recipient1, recipient2, recipient3;

	let toggle = (e) => {
		let text = e.target.innerHTML;
		text = checkKeyidOrAddress(text) === 1 ? walletAddrToId(text) : walletIdToAddr(text);
		e.target.innerHTML = text;
	};

	function handle_s_transaction(data) {
		let allArr = [];
		for (let k in data) {
			let obj = {};
			obj.key = k;
			let valueArr = [];
			for (let k1 in data[k]) {
				let valueObj = {};
				valueObj.key = k1;

				if (k1 === 'senderID') {
					senderID = data[k][k1];
					continue;
				}

				if (k1 === 'recipientID1') {
					recipient1 = data[k][k1];
					continue;
				}

				if (k1 === 'recipientID2') {
					recipient2 = data[k][k1];
					continue;
				}

				if (k1 === 'recipientID3') {
					recipient3 = data[k][k1];
					continue;
				}

				valueObj.value = data[k][k1];

				// 转账
				if (valueObj.key === 'amount1') {
					valueObj.key = 'Amount';
					valueObj.value = (
						<Row gutter={24}>
							<Col xs={24} ms={24} md={24} lg={8} xl={8} xxl={8} id="send" onClick={(e) => toggle(e)}>{senderID}</Col>
							<Col xs={24} ms={24} md={24} lg={3} xl={3} xxl={3} id="arrow-right"><span>➤</span></Col>
							<Col xs={24} ms={24} md={24} lg={8} xl={8} xxl={8} id="recipient" onClick={(e) => toggle(e)}>{recipient1}</Col>
							<Col xs={24} ms={24} md={24} lg={5} xl={5} xxl={5} id="gac_col">
								<span id="gac_amount">+{fmoney(qGacToGac(valueObj.value), 3)} GAC</span>
							</Col>
						</Row>
					);
				}

				// 手续费
				if (valueObj.key === 'amount2') {
					valueObj.key = 'Service Fee';
					valueObj.value = (
						<Row gutter={24}>
							<Col xs={24} ms={24} md={24} lg={8} xl={8} xxl={8} id="send" onClick={(e) => toggle(e)}>{senderID}</Col>
							<Col xs={24} ms={24} md={24} lg={3} xl={3} xxl={3} id="arrow-right"><span>➤</span></Col>
							<Col xs={24} ms={24} md={24} lg={8} xl={8} xxl={8} id="recipient" onClick={(e) => toggle(e)}>{recipient2}</Col>
							<Col xs={24} ms={24} md={24} lg={5} xl={5} xxl={5} id="gac_col">
								<span id="gac_amount">+{qGacToGac(valueObj.value)} GAC</span>
							</Col>
						</Row>
					);
				}

				// commission
				if (valueObj.key === 'amount3') {
					valueObj.key = 'Commission';
					valueObj.value = (
						<Row gutter={24}>
							<Col xs={24} ms={24} md={24} lg={8} xl={8} xxl={8} id="send" onClick={(e) => toggle(e)}>{senderID}</Col>
							<Col xs={24} ms={24} md={24} lg={3} xl={3} xxl={3} id="arrow-right"><span>➤</span></Col>
							<Col xs={24} ms={24} md={24} lg={8} xl={8} xxl={8} id="recipient" onClick={(e) => toggle(e)}>{recipient3}</Col>
							<Col xs={24} ms={24} md={24} lg={5} xl={5} xxl={5} id="gac_col">
								<span id="gac_amount">+{qGacToGac(valueObj.value)} GAC</span>
							</Col>
						</Row>
					);
				}
				// Error处理
				if (valueObj.key === 'Error') {
					let data = JSON.parse(valueObj.value).data;
					delete data.txhash;
					valueObj.value = (
						<Row>
							<code>
								<pre>
									{JSON.stringify(data, null, 4)}
								</pre>
							</code>
						</Row>
					);
				}

				// timestamp时间格式处理
				if (valueObj.key === 'createdAt') {
					valueObj.value = (
						<Row>
							{moment(valueObj.value).format('YYYY-MM-DD HH:MM:SS')}
						</Row>
					);
				}

				// 时间戳处理
				if (valueObj.key === 'Time' || valueObj.key === 'time') {
					valueObj.value = (
						<Row>
							{moment(valueObj.value * 1000).format('YYYY-MM-DD HH:MM:SS')}
						</Row>
					);
				}

				if (valueObj.key === 'key_id') {
					continue;
				}

				// 区块ID处理
				if (valueObj.key === 'blockID' || valueObj.key === 'BlockID') {
					valueObj.value = (
						<Link to={`/block/${valueObj.value}`}>{valueObj.value}</Link>
					);
				}

				// 过滤处理
				if (valueObj.key === 'type' || valueObj.key === 'Type' || valueObj.key === 'hash' || valueObj.key === 'BlockID') {
					continue;
				}

				// 参数处理
				if (valueObj.key === 'params') {
					valueObj.value = (
						<pre>
							{JSON.stringify(valueObj.value, null, 4)}
						</pre>);
				}

				valueArr.push(valueObj);
				obj.value = valueArr;
			}
			allArr.push(obj);
		}
		return allArr;
	}

	let listProps = {
		listData: handle_s_transaction(dataList),
		pagination: false,
		loading: loading.effects['s_transaction/query'],
	};

	return (
		<DetailList {...listProps} />
	);
};

export default connect(({ dispatch, s_transaction, loading }) => ({ dispatch, s_transaction, loading }))(TransactionHash);
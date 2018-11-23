import DetailList from './components/DetailList';
import { walletIdToAddr, walletAddrToId, checkKeyidOrAddress, fmoney, qGacToGac } from 'utils';
import { Row, Col, Icon } from 'antd';
import { clickCp } from 'utils';
import Link from 'umi/link';
import { connect } from 'dva';
import moment from 'moment';

const TransactionHash = ({ s_transaction, loading }) => {
	let { dataList } = s_transaction;
	let senderID;
	// recipient用来构造可变变量
	let recipient = {};
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

				// 需要排除的字段
				let excludeField = ['key_id', 'type', 'Type', 'hash', 'BlockID', 'Hash'];
				if (excludeField.includes(valueObj.key)) {
					continue;
				}

				let transferID = ['senderID', 'recipientID1', 'recipientID2', 'recipientID3'];
				if (transferID.includes(k1)) {
					switch (k1) {
					case 'senderID':
						senderID = data[k][k1];
						break;
					case 'recipientID1':
						recipient[0] = data[k][k1];
						break;
					case 'recipientID2':
						recipient[1] = data[k][k1];
						break;
					case 'recipientID3':
						recipient[2] = data[k][k1];
						break;
					default:
					}
					continue;
				}

				valueObj.value = data[k][k1];

				// 转账处理
				let amountI = ['amount1=>Amount', 'amount2=>Service Fee', 'amount3=>Commission'];
				for (let i = 0; i < amountI.length; i++) {
					if (amountI[i].includes(valueObj.key)) {
						valueObj.key = amountI[i].split('=>')[1];
						valueObj.value = (
							<Row gutter={24}>
								{
									senderID ? (
										<Col xs={24} ms={24} md={24} lg={8} xl={8} xxl={8} id="send">
											<span onClick={(e) => toggle(e)}>{senderID}</span>
											<Icon type="copy" id="copy" onClick={() => clickCp(senderID)} style={{ color: '#EEEEEE' }} />
										</Col>
									) : (
										<Col xs={24} ms={24} md={24} lg={8} xl={8} xxl={8}>

										</Col>
									)
								}
								<Col xs={24} ms={24} md={24} lg={3} xl={3} xxl={3} id="arrow-right"><span>➤</span></Col>
								{
									recipient[i] ? (
										<Col xs={24} ms={24} md={24} lg={8} xl={8} xxl={8} id="recipient">
											<span onClick={(e) => toggle(e)}>{recipient[i]}</span>
											<Icon type="copy" id="copy" onClick={() => clickCp(recipient[i])} style={{ color: '#EEEEEE' }} />
										</Col>
									) : (
										<Col xs={24} ms={24} md={24} lg={8} xl={8} xxl={8}>

										</Col>
									)
								}
								<Col xs={24} ms={24} md={24} lg={5} xl={5} xxl={5} id="gac_col">
									<span id="gac_amount">+{fmoney(qGacToGac(valueObj.value), 3)} GAC</span>
								</Col>
							</Row>
						);
					}
				}

				// txHash
				if (valueObj.key === 'txHash') {
					let _val = valueObj.value;
					valueObj.value = (
						<Row>
							<span>{valueObj.value}</span>
							<Icon type="copy" id="copy" onClick={() => clickCp(_val)} />
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

				// 区块ID处理
				if (valueObj.key === 'blockID' || valueObj.key === 'BlockID') {
					valueObj.value = (
						<Link to={`/block/${valueObj.value}`}>{valueObj.value}</Link>
					);
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
		<Row>
			<DetailList {...listProps} />
		</Row>
	);
};

export default connect(({ dispatch, s_transaction, loading }) => ({ dispatch, s_transaction, loading }))(TransactionHash);


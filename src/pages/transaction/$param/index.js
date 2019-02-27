import { connect } from 'dva';
import Link from 'umi/link';
import { FormattedMessage } from 'react-intl';
import { Row, Col, Icon } from 'antd';
import moment from 'moment';
import DetailList from './components/DetailList';
import { walletIdToAddr, walletAddrToId, checkKeyidOrAddress, fmoney, qGacToGac, clickCp } from 'utils';

const TransactionHash = ({ s_transaction, loading }) => {
	let { dataList } = s_transaction;
	let sender_id;
	// recipient用来构造可变变量
	let recipientid = {};
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
				let excludeField = ['key_id', 'type', 'Type', 'hash', 'BlockID', 'Hash', 'size'];
				if (excludeField.includes(valueObj.key)) {
					continue;
				}

				let transferID = ['sender_id', 'recipientid1', 'recipientid2', 'recipientid3'];
				if (transferID.includes(k1)) {
					switch (k1) {
					case 'sender_id':
						sender_id = data[k][k1];
						break;
					case 'recipientid1':
						recipientid[0] = data[k][k1];
						break;
					case 'recipientid2':
						recipientid[1] = data[k][k1];
						break;
					case 'recipientid3':
						recipientid[2] = data[k][k1];
						break;
					default:
						break;
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
									sender_id ? (
										<Col xs={24} ms={24} md={24} lg={8} xl={8} xxl={8} id="send">
											<span onClick={(e) => toggle(e)}>{sender_id}</span>
											<Icon type="copy" id="copy" onClick={() => clickCp(sender_id)} style={{ color: '#EEEEEE' }} />
										</Col>
									) : (
										<Col xs={24} ms={24} md={24} lg={8} xl={8} xxl={8}>

										</Col>
									)
								}
								<Col xs={24} ms={24} md={24} lg={3} xl={3} xxl={3} id="arrow-right"><span>➤</span></Col>
								{
									recipientid[i] ? (
										<Col xs={24} ms={24} md={24} lg={8} xl={8} xxl={8} id="recipient">
											<span onClick={(e) => toggle(e)}>{recipientid[i]}</span>
											<Icon type="copy" id="copy" onClick={() => clickCp(recipientid[i])} style={{ color: '#EEEEEE' }} />
										</Col>
									) : (
										<Col xs={24} ms={24} md={24} lg={8} xl={8} xxl={8}>

										</Col>
									)
								}
								<Col xs={24} ms={24} md={24} lg={5} xl={5} xxl={5} id="gac_col">
									<span id="gac_amount">+{fmoney(qGacToGac(valueObj.value), 4)} GAC</span>
								</Col>
							</Row>
						);
					}
				}

				// txhash
				if (valueObj.key === 'txhash') {
					let _val = valueObj.value;
					valueObj.value = (
						<Row>
							<span>{valueObj.value}</span>
							<Icon type="copy" id="copy" onClick={() => clickCp(_val)} />
						</Row>
					);
				}

				// Error处理
				if (valueObj.key === 'err') {
					let data = JSON.parse(valueObj.value || '{}').data || JSON.parse(valueObj.value || '{}');
					data.txhash ? delete data['txhash'] : true;
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
				if (valueObj.key === 'created_at') {
					valueObj.value = (
						<Row>
							<p>{moment(valueObj.value).format('YYYY-MM-DD HH:mm:ss')}<FormattedMessage id="LOCALTIME" /></p>
							<p>{moment(valueObj.value).utc().format('YYYY-MM-DD HH:mm:ss')}<FormattedMessage id="UTCTIME" /></p>
						</Row>
					);
				}

				// wallet_id
				if (valueObj.key === 'wallet_id') {
					valueObj.value = (
						<Row>
							<Link to={`/ecosystem/1/member/${valueObj.value}`}>{valueObj.value}</Link>
						</Row>
					);
				}

				// 时间戳处理
				if (valueObj.key === 'Time' || valueObj.key === 'time') {
					valueObj.value = (
						<Row>
							<p>{moment(valueObj.value * 1000).format('YYYY-MM-DD HH:mm:ss')}<FormattedMessage id="LOCALTIME" /></p>
							<p>{moment(valueObj.value * 1000).utc().format('YYYY-MM-DD HH:mm:ss')}<FormattedMessage id="UTCTIME" /></p>
						</Row>
					);
				}

				// 区块ID处理
				if (valueObj.key === 'blockid' || valueObj.key === 'BlockID') {
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


import { Card, Row, Col, Avatar, Divider, Icon, Spin, Table } from 'antd';
import { FormattedMessage } from 'react-intl';
import {
	qGacToGac,
	fmoney,
	clickCp,
	checkKeyidOrAddress,
	walletAddrToId,
	walletIdToAddr
} from 'utils';
import gac from 'public/gac.svg';
import QRCode from 'qrcode.react';

const MemberInfo = ({ data, loading, member_transaction_info }) => {
	let _val;
	/** 点击KeyID地址切换 */
	let toggle = e => {
		let text = e.target.innerHTML;
		text =
            checkKeyidOrAddress(text) === 1
            	? walletAddrToId(text)
            	: walletIdToAddr(text);
		e.target.innerHTML = text;
		_val = e.target.innerHTML;
	};
	let transferInfoColumns = [
		{
			dataIndex: 'key'
		},
		{
			dataIndex: 'value'
		}
	];

	let dataSource = Object.entries(
		member_transaction_info ? member_transaction_info : {}
	).map(item => {
		let obj = {};
		obj['key'] = <strong><FormattedMessage id={item[0]} /></strong>;
		if (obj['key'].props.children.props.id !== 'transaction') {
			obj['value'] = `${fmoney(qGacToGac(item[1]), 4)} GAC`;
		} else {
			obj['value'] = item[1];
		}
		return obj;
	});

	return (
		<Spin spinning={loading}>
			<Card span={4} title={<FormattedMessage id="MEM_MEMBERINFO" />}>
				<Row id="member_img">
					<Avatar
						style={{ backgroundColor: '#87d068' }}
						icon="user"
						size={50}
					/>
				</Row>
				<Row id="member_name">
					<span
						onClick={e => toggle(e)}
						style={{ cursor: 'pointer' }}
					>
						{data.id}
					</span>
					<Icon type="copy" id="copy" onClick={() => clickCp(_val)} />
				</Row>
				<Divider dashed={true} orientation="left">
					<h4>
						<FormattedMessage id="MEM_ASSETS"/>
						<span id="mem_amount">
							<FormattedMessage id="K_AMOUNT"/>
						</span>
					</h4>
				</Divider>
				<Row>
					<Row id="member_assets">
						<Col span={8}>
							<span>
								<Icon
									component={gac}
									style={{
										fontSize: '2rem',
										verticalAlign: 'middle'
									}}
								/>
								<span
									style={{
										fontWeight: 'bold',
										paddingLeft: '0.5rem'
									}}
								>
                                    GAC
								</span>
							</span>
						</Col>
						<Col span={16} style={{ paddingTop: '0.5rem' }}>
							<span id="gac_amount">
								{fmoney(qGacToGac(data.amount), 4)} GAC
							</span>
						</Col>
					</Row>
				</Row>
				<Row style={{ textAlign: 'center' }}>
					<Divider dashed={true}>
						<h4>
							<FormattedMessage id="MEM_TRAN_INFO" />
						</h4>
					</Divider>
					<Table
						rowKey={record => {
							return record.value+Math.random();
						}}
						showHeader={false}
						columns={transferInfoColumns}
						dataSource={dataSource}
						pagination={{
							hideOnSinglePage: true
						}}
					/>
				</Row>
				<Row style={{ textAlign: 'center' }} id="qrcode">
					<Divider dashed={true}>
						<h4>
							<FormattedMessage id="QRCODE" />
						</h4>
					</Divider>
					<QRCode value={window.location.href} />
				</Row>
			</Card>
		</Spin>
	);
};

export default MemberInfo;

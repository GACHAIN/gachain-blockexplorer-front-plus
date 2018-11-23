import { Card, Icon, Row, Col } from 'antd';
import { FormattedMessage } from 'react-intl';
import styles from './over_view.css';
import Link from 'umi/link';

const over_view = ({ loading, data }) => {
	return (
		<Card
			title={<FormattedMessage id="H_GACHAINOVERVIEW" style={{ color: '#fff' }} />}
			style={{ backgroundColor: '#3498db', color: '#ffffff' }}
			className={styles.over_view}
			loading={loading}
			bodyStyle={{ height: '20rem' }}
		>
			<Row style={{ paddingBottom: '30px' }}>
				<Col span={4}>
					<Icon type="global" style={{ fontSize: '50px' }} />
				</Col>
				<Col span={20}>
					{/* 总市值 */}
					{/* <Row>
                        <Link to="#" style={{ color: '#eee' }}><FormattedMessage id="H_MARKETVALUE" />
                        <span style={{color: '#ffffff'}}>
                        <i style={{    fontStyle: 'normal', fontSize: '18px', paddingLeft: '5px'}}>
                            {`¥ ${data === undefined ? 0 : (Number(data['usdt-gac'].last * 500000000))}`}
                        </i>
                           
                        </span>
                        </Link>
                    </Row> */}
					{/* GAC汇率 */}
					<Row>
						<span style={{ color: '#ffffff' }}><FormattedMessage id="H_RATE" /></span>
						<i style={{ fontStyle: 'normal', fontSize: '18px', paddingLeft: '5px' }}>¥
							{/* {`¥ ${data === undefined ? 0 : (Number(data['usdt-gac'].last))}`} */}
							{
								(!loading && data) ? parseFloat(Number(data['usdt-gac'].last) * (data.Rates.rates ? data.Rates.rates.CNY : null)).toFixed(3) : []
							}
						</i>
						<br />
						<Link to="#" style={{ color: '#fff', fontSize: '16px' }} replace>
							{`1 GAC ≈ ${data === undefined ? 0 : Number(data['btc-gac'].last)} BTC ≈ ${data === undefined ? 0 : Number(data['usdt-gac'].last)} USDT`}
						</Link>
					</Row>
				</Col>
			</Row>
			<Row style={{ paddingBottom: '30px' }}>
				<Col span={12}>
					<Row>
						<span style={{ color: '#eee' }}><FormattedMessage id="H_LASTBLOCK" /></span>
					</Row>
					<Row>
						<Link to="#" style={{ color: '#fff', fontSize: '16px' }} replace>待定</Link>
					</Row>
				</Col>
				<Col span={12}>
					<Row>
						<span style={{ color: '#eee' }}><FormattedMessage id="H_HASHRATE" /></span>
					</Row>
					<Row>
						<Link to="#" style={{ color: '#fff', fontSize: '16px' }} replace>待定</Link>
					</Row>
				</Col>
			</Row>
			<Row style={{ paddingBottom: '25px' }}>
				<Col span={12}>
					<Row>
						<span style={{ color: '#eee' }}><FormattedMessage id="H_TRANSACTION" /></span>
					</Row>
					<Row>
						<Link to="#" style={{ color: '#fff' }} replace>待定</Link>
					</Row>
				</Col>
				<Col span={12}>
					<Row>
						<span style={{ color: '#eee' }}><FormattedMessage id="H_DIFFICULTY" /></span>
					</Row>
					<Row>
						<Link to="#" style={{ color: '#fff' }} replace>待定</Link>
					</Row>
				</Col>
			</Row>
		</Card>
	);
};

export default over_view;
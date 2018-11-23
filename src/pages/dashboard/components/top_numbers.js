import { Card, Row, Col, Icon } from 'antd';
import { FormattedMessage } from 'react-intl';
import CountUp from 'react-countup';
import styles from './top_numbers.css';
import Link from 'umi/link';
const top_numbers = ({ loading, data }) => {
	let UIComponents = data.map((item, key) => {
		switch (item.title) {
			case 'TOPNUMNODE':
				item.link = 'node';
				break;
			case 'TOPNUMBLOCK':
				item.link = 'block';
				break;
			case 'TOPNUMTRANSACTION':
				item.link = 'transaction';
				break;
			case 'TOPNUMECOSYSTEM':
				item.link = 'ecosystem';
				break;
			default:
				item.link = '/dashboard';
				break;
		}
		return (
			<Link to={item.link} key={item.title}>
				<Col xs={24} sm={24} md={12} lg={12} xl={6} xxl={6} id="top-num-sign">
					<Card key={key} bordered={false} bodyStyle={{ padding: 0 }} className={styles.numCard} loading={loading}>
						<Row>
							<Col span={8}>
								<Icon className={styles.top_numbers_icon} type={item.icon} style={{ color: item.color, paddingTop: '14px' }} />
							</Col>
							<Col span={16}>
								<Row className={styles.top_numbers_title} id="textOverflow"><FormattedMessage id={item.title} /></Row>
								<Row style={{ fontSize: '2rem', fontWeight: 'bold' }}>
									<CountUp
										start={0}
										end={item.number}
										duration={3}
										useEasing
										useGrouping
										separator=","
									/>
								</Row>
							</Col>
						</Row>
					</Card>
				</Col>
			</Link>
		);
	});

	return (
		<div className={styles.uicomponents}>
			<Row gutter={24}>
				{UIComponents}
			</Row>
		</div>
	);
};

export default top_numbers;
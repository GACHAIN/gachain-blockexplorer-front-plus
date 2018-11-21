import { Icon, Card, Row, Col, Tooltip, Tag } from 'antd';
import { FormattedMessage } from 'react-intl';
import Link from 'umi/link';
import moment from 'moment';
import styles from './middle_transactions.css';

const middle_transactions = ({ data, loading }) => {

	let typeTag = (text) => {
		if (text === 276) {
			return (
				<Tag color="blue"><FormattedMessage id="TYPE_TRANSFER" /></Tag>
			);
		} else
		if (text === 293) {
			return (
				<Tag color="green"><FormattedMessage id="TYPE_CREATEUSER" /></Tag>
			);
		} else
		if (text === 264) {
			return (
				<Tag color="magenta"><FormattedMessage id="TYPE_TASK" /></Tag>
			);
		}

		return text;
	};

	let compontents = (!loading && data) ? data.map((item, key) => {
		return (
			<Row key={key} className={styles.transactions_R} style={{ borderBottom: 'dashed 1px #eeeeee', paddingBottom: '1rem' }}>
				<Col xs={0} ms={0} md={4} lg={4} xl={4} xxl={4}>
					<Icon type="audit" className={styles.t_icon} />
				</Col>
				<Col xs={18} ms={18} md={14} lg={14} xl={12} xxl={12} className={styles.transaction_r_c_r}>
					<Row>
						<span><FormattedMessage id="H_TRANSACTION" /># </span>
						<Link id="textOverflow" to={`transaction/${item.hash}`}>{item.hash}</Link>
					</Row>
					<Row>
						<span><FormattedMessage id="WalletID" /></span>
						<Tooltip placement="topLeft" title={item.key_id}>
							<Link id="textOverflow" to={`/ecosystem/1/member/${item.key_id}?state=income`}>{item.key_id}</Link>
						</Tooltip>
					</Row>
					<Row>
						<span><Tag color="#2db7f5">{moment(item.time * 1000).fromNow()}</Tag></span>
					</Row>
				</Col>
				<Col xs={6} ms={6} md={6} lg={6} xl={8} xxl={8}>
					<Row style={{ paddingTop: '1.5rem' }}>
						{typeTag(item.type)}
					</Row>
				</Col>
			</Row>
		);
	}) : [];

	return (
		<Card className={styles.middle_transactions} loading={loading} title={<span><Icon type="file-sync" style={{ fontSize: '20px' }} className={styles.rotate} /> <FormattedMessage id="H_TRANSACTIONS" /><Link id="more" to="/transaction"><FormattedMessage id="MORE" /></Link></span>} bodyStyle={{ height: '30rem', overflow: 'scroll' }}>
			{compontents}
		</Card>
	);
};

export default middle_transactions;
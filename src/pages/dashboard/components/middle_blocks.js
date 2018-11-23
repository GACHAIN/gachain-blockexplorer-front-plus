import { Icon, Card, Row, Col } from 'antd';
import { FormattedMessage } from 'react-intl';
import { nodeIcon } from 'config';
import Link from 'umi/link';
import styles from './middle_blocks.css';

const middle_blocks = ({ data, loading }) => {
	let compontents = (!loading && data) ? data.map((item, key) => {
		return (
			<Row key={key} justify="center" style={{ borderBottom: 'dashed 1px #eeeeee', paddingBottom: '1rem', marginBottom: '1rem' }} >
				<Link to={`/block/${item.block_id}`}>
					<Col className={styles.blocks_left} xs={10} sm={10} md={10} lg={10} xl={10} xxl={10}>
						<Row>
							<Col style={{ lineHeight: '4rem', textAlign: 'center', height: '4rem', backgroundColor: '#004b80', borderRadius: '0.5rem', boxShadow: '0.1rem 0.2rem 0.4rem 0.1rem #737373' }}>
								<Row>
									<span style={{ color: '#eee' }}><FormattedMessage id="H_BLOCK" /> #{item.block_id}</span>
								</Row>
							</Col>
						</Row>
					</Col>
				</Link>
				<Col xs={10} sm={10} md={10} lg={10} xl={10} xxl={10} push={2}>
					<Row>
						<span style={{ fontWeight: 'bold' }}>
							<FormattedMessage id="H_PRODUCT" values={{
								nodeId: parseInt(item.node_position, 10) + 1
							}} />
						</span>
					</Row>
					<Row>{item.tx_count} <FormattedMessage id="H_TRANSACTION" /></Row>
				</Col>
				<Col xs={4} sm={4} md={4} lg={4} xl={4} xxl={4} push={2}>
					<Row>
						<Icon component={nodeIcon[item.node_position]} style={{ fontSize: '1.5rem', marginTop: '0.8rem' }} />
					</Row>
				</Col>
			</Row>
		);
	}) : [];

	return (
		<Card className={styles.middle_blocks} loading={loading} title={<span><Icon type="block" style={{ fontSize: '20px' }} /> <FormattedMessage id="H_BLOCKS" /><Link id="more" to="/block" replace><FormattedMessage id="MORE" /></Link></span>} bodyStyle={{ height: '30rem', overflow: 'scroll' }}>
			{compontents}
		</Card>
	);
};

export default middle_blocks;
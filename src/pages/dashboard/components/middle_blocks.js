import { Icon, Card, Row, Col, Tag } from 'antd';
import { FormattedMessage } from 'react-intl';
import Link from 'umi/link';
import styles from './middle_blocks.css';

const middle_blocks = ({ data, loading }) => {
    let compontents = data.map((item, key) => {
        console.log(item)
        return (
            <Row key={key} justify="center" style={{ paddingBottom: "1rem" }}>
                <Link to={`/block/${item.block_id}`}>
                    <Col className={styles.blocks_left} xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                        <Row>
                            <Col style={{ lineHeight: '4rem', textAlign: 'center' }}>
                                <Row>
                                    <span style={{ color: "#eee" }}><FormattedMessage id="H_BLOCK" />{item.block_id}</span>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                </Link>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12} push={2}>
                    <p><FormattedMessage id="H_PRODUCT" /> <Tag color="blue">{item.node_position}</Tag></p>
                    <p>{item.tx_count} <FormattedMessage id="H_TRANSACTION" /></p>
                </Col>
            </Row>
        )
    })

    return (
        <Card className={styles.middle_blocks} loading={loading} title={<span><Icon type="block" style={{ fontSize: '20px' }} /> <FormattedMessage id="H_BLOCK" /></span>} bodyStyle={{ height: "30rem" }}>
            {compontents}
        </Card>
    )
}

export default middle_blocks
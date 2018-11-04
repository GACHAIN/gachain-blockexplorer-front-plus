import { Card, Icon, Row, Col } from 'antd';
import { FormattedMessage } from 'react-intl';
import styles from './over_view.css'

const over_view = ({ loading }) => {
    return (
        <Card
            title={<FormattedMessage id="H_GACHAINOVERVIEW" style={{ color: '#fff' }} />}
            style={{ backgroundColor: '#3498db', color: '#ffffff' }}
            className={styles.over_view}
            loading={loading}
        >
            <Row style={{ paddingBottom: '30px' }}>
                <Col span={4}>
                    <Icon type="global" style={{ fontSize: '50px' }} />
                </Col>
                <Col span={20}>
                    <p>
                        <a href="#" style={{ color: '#eee' }}><FormattedMessage id="H_MARKETVALUE" /> $20.510 十亿</a>
                    </p>
                    <p>
                        <a href="#" style={{ color: '#fff', fontSize: '16px' }}>$199.15 @ 0.03124 <FormattedMessage id="H_MONREY"/> <span style={{ color: 'lightgreen', fontSize: '14px' }}>0.76%</span></a>
                    </p>
                </Col>
            </Row>
            <Row style={{ paddingBottom: '30px' }}>
                <Col span={12}>
                    <p>
                        <span href="#" style={{ color: '#eee' }}><FormattedMessage id="H_LASTBLOCK" /></span>
                    </p>
                    <p>
                        <a href="#" style={{ color: '#fff', fontSize: '16px' }}>6628847 (14.1秒)</a>
                    </p>
                </Col>
                <Col span={12}>
                    <p>
                        <span href="#" style={{ color: '#eee' }}><FormattedMessage id="H_HASHRATE" /></span>
                    </p>
                    <p>
                        <a href="#" style={{ color: '#fff', fontSize: '16px' }}>335.79 M (6.9 TPS)</a>
                    </p>
                </Col>
            </Row>
            <Row style={{ paddingBottom: '25px' }}>
                <Col span={12}>
                    <p>
                        <span href="#" style={{ color: '#eee' }}><FormattedMessage id="H_TRANSACTION" /></span>
                    </p>
                    <p>
                        <a href="#" style={{ color: '#fff' }}>235,023.04 GH/秒 </a>
                    </p>
                </Col>
                <Col span={12}>
                    <p>
                        <span href="#" style={{ color: '#eee' }}><FormattedMessage id="H_DIFFICULTY" /></span>
                    </p>
                    <p>
                        <a href="#" style={{ color: '#fff' }}>3,036.86 TH</a>
                    </p>
                </Col>
            </Row>
        </Card>
    )
}

export default over_view
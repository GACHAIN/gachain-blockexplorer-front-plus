import { Icon, Card, Row, Col, Tooltip, Tag } from 'antd';
import { FormattedMessage } from 'react-intl';
import Link from 'umi/link';
import moment from 'moment';
import styles from './middle_transactions.css';

const middle_transactions = ({ data, loading }) => {

    let compontents = (!loading && data) ? data.map((item, key) => {
        return (
            <Row key={key} className={styles.transactions_R} style={{borderBottom: 'dashed 1px #eeeeee', paddingBottom: '1rem'}}>
                <Col xs={0} ms={0} md={4} lg={4} xl={4} xxl={4}>
                    <Icon type="audit" className={styles.t_icon} />
                </Col>
                <Col xs={18} ms={18} md={14} lg={14} xl={12} xxl={12} className={styles.transaction_r_c_r}>
                    <Row>
                        <span><FormattedMessage id="H_TRANSACTION" /># </span>
                        <Link id="textOverflow" to={`transaction/${item.Hash}`}>{item.Hash}</Link>
                    </Row>
                    <Row>
                        <span><FormattedMessage id="WalletID" /></span>
                        <Tooltip placement="topLeft" title={item.WalletID}>
                            <span id="textOverflow">{item.WalletID}</span>
                        </Tooltip>
                    </Row>
                    <Row>
                        <span><FormattedMessage id="H_TIME" />: <Tag color="#2db7f5">{moment(item.Time * 1000).format('YY-MM-DD HH:MM:SS')}</Tag></span>
                    </Row>
                </Col>
                <Col xs={6} ms={6} md={6} lg={6} xl={8} xxl={8}>
                    <Row style={{paddingTop: '1.5rem'}}>
                        {
                            item.BlockID === 0 ?
                                <span id="failure">
                                    <FormattedMessage id="ME_FAILYRE" />
                                </span> :
                                <span id="success">
                                    <FormattedMessage id="ME_SUCCESS" />
                                </span>
                        }
                    </Row>
                </Col>
            </Row>
        )
    }) : []

    return (
        <Card className={styles.middle_transactions} loading={loading} title={<span><Icon type="file-sync" style={{ fontSize: '20px' }} className={styles.rotate} /> <FormattedMessage id="H_TRANSACTION" /></span>} bodyStyle={{ height: "30rem", overflow: 'scroll' }}>
            {compontents}
        </Card>
    )
}

export default middle_transactions
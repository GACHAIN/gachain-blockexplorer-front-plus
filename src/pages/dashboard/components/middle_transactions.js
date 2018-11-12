import { Icon, Card, Row, Col, Tooltip } from 'antd';
import { FormattedMessage } from 'react-intl';
import Link from 'umi/link';
import moment from 'moment';
import styles from './middle_transactions.css';

const middle_transactions = ({ data, loading }) => {

    let compontents = (!loading && data) ? data.map((item, key) => {
        return (
            <Row key={key} className={styles.transactions_R}>
                <Col xs={0} ms={0} md={4} lg={4} xl={4} xxl={4}>
                    <Icon type="audit" className={styles.t_icon}/>
                </Col>
                <Col xs={24} ms={24} md={20} lg={20} xl={20} xxl={20} className={styles.transaction_r_c_r}>
                    <Row gutter={24}>
                        <span><FormattedMessage id="H_TRANSACTION" /># </span>
                        <Link id="textOverflow" to={`transaction/${item.Hash}`}>{item.Hash}</Link>
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
                    <Row>
                        <span><FormattedMessage id="WalletID" /></span>
                        <Tooltip placement="topLeft" title={item.WalletID}>
                            <span id="textOverflow">{item.WalletID}</span>
                        </Tooltip>
                    </Row>
                    <Row>
                        <span><FormattedMessage id="H_TIME" />: {moment(item.Time).format()}</span>
                        
                    </Row>
                </Col>
            </Row>
        )
    }):[]

    return (
        <Card className={styles.middle_transactions} loading={loading} title={<span><Icon type="file-sync" style={{ fontSize: '20px' }} className={styles.rotate} /> <FormattedMessage id="H_TRANSACTION" /></span>} bodyStyle={{height: "30rem"}}>
            {compontents}
        </Card>
    )
}

export default middle_transactions
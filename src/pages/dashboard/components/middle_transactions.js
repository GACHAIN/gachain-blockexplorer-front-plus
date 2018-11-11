import { Icon, Card, Row, Col } from 'antd';
import { FormattedMessage } from 'react-intl';
import Link from 'umi/link';
import moment from 'moment';
import styles from './middle_transactions.css';

const middle_transactions = ({ data, loading }) => {

    let compontents = data.map((item, key) => {
        return (
            <Row key={key} className={styles.transactions_R}>
                <Col xs={0} ms={0} md={4} lg={4} xl={4} xxl={4}>
                    <Icon type="audit" className={styles.t_icon}/>
                </Col>
                <Col xs={24} ms={24} md={20} lg={20} xl={20} xxl={20} className={styles.transaction_r_c_r}>
                    <Row>
                        <span><FormattedMessage id="H_TRANSACTION" />#</span>
                        <Link to={`transaction/${item.Hash}`}>{item.Hash}</Link>
                    </Row>
                    <Row>
                        <span><FormattedMessage id="H_SEND" /></span>
                        <a href="#">0xd5bbb58e8e7271365a41038c2df1d3efea0b2a71</a>
                        <span><FormattedMessage id="H_REC" /></span>
                        <a href="#">0x891f460176f180836f53b729ffb27cfcc7d74d71</a>
                    </Row>
                    <Row>
                        <span><FormattedMessage id="H_TIME" />: {moment(item.Time).format()}</span>
                        
                    </Row>
                </Col>
            </Row>
        )
    })

    return (
        <Card className={styles.middle_transactions} loading={loading} title={<span><Icon type="file-sync" style={{ fontSize: '20px' }} className={styles.rotate} /> <FormattedMessage id="H_TRANSACTION" /></span>} bodyStyle={{height: "30rem"}}>
            {compontents}
        </Card>
    )
}

export default middle_transactions
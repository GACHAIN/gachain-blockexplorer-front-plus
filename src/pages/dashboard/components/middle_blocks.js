import { Button, Icon, Card, Row, Col } from 'antd';
import { FormattedMessage } from 'react-intl';
import styles from './middle_blocks.css';

const middle_blocks = ({ data, loading }) => {
    let compontents = data.map((item, key) => {
        return (
            <Row key={key} justify="center">
                <Col className={styles.blocks_left} xs={24} sm={24} md={24} lg={12} xl={12} xxl={12}></Col>
                <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12} push={2}>
                    <p><FormattedMessage id="H_PRODUCT"/> 1</p>
                    <p>20 <FormattedMessage id="H_TRANSACTION"/></p>
                </Col>
            </Row>
        )
    })

    return (
        <Card className={styles.middle_blocks} loading={loading} title={<span><Icon type="block" style={{fontSize: '20px'}}/> <FormattedMessage id="H_BLOCK"/></span>}>
            { compontents }
        </Card>
    )
}

export default middle_blocks
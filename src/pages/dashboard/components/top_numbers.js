import { Card, Avatar, Row, Col, Icon } from 'antd';
import CountUp from 'react-countup';
import styles from './top_numbers.css';

const { Meta } = Card;
const top_numbers = ({ loading, data }) => {

    let UIComponents = data.map((item, key) => {
        return (
            <Col xs={24} ms={24} md={12} lg={6} key={key}>
                <Card key={key} bordered={false} bodyStyle={{ padding: 0 }} className={styles.numCard} loading={loading}>
                    <Icon className={styles.top_numbers_icon} type="database"/>
                    <p>
                        <CountUp 
                            end={item.number}
                            duration={2.75}
                        />
                    </p>
                </Card>
            </Col>
        )
    })

    return (
        <div className={styles.uicomponents}>
            <Row gutter={24}>
                { UIComponents }
            </Row>
        </div>
    )
}

export default top_numbers
import { Icon, Button, Card } from 'antd';
import styles from './middle_transactions.css';

const middle_transactions = ({ data, loading }) => {

    let compontents = data.map((item, key) => {
        return (
            <div className={styles.middle_transaction_body} key={key}>
                <div>
                    <Icon type="database"/>
                </div>
                <div>
                    <p>
                        <span>交易#</span> 
                        <a href="#">0X338D182B082A47A6D57B9072D705C74D2E1C52A5114E0FB460219D901D766802</a>
                    </p>
                    <p>
                        <span>发送方</span> 
                        <a href="#">0xd5bbb58e8e7271365a41038c2df1d3efea0b2a71</a> 
                        <span>接收方</span> 
                        <a href="#">0x891f460176f180836f53b729ffb27cfcc7d74d71</a>
                    </p>
                    <p>
                        <span>数额</span> 
                        0 GAC
                    </p>
                </div>
                <div>
                    <p>25 分钟s 48 秒 前</p>
                </div>
            </div>
        )
    })

    return (
        <Card className={styles.middle_transactions} loading={loading}>
            <div className={styles.middle_transaction_contents}>
                <div>
                    <Icon type="database" />
                    <span>交易</span>
                </div>
                <div>
                    <Button type="default">查看更多</Button>
                </div>
            </div>

            { compontents }
        </Card>
    )
}

export default middle_transactions
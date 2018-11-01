import { Button, Icon, Card } from 'antd';
import styles from './middle_blocks.css';

const middle_blocks = ({ data, loading }) => {
    let compontents = data.map((item, key) => {
        return (
            <div className={styles.middle_block_body} key={key}>
                <div></div>
                <div>
                    <p>由矿工 SparkPool</p>
                    <p>20 交易 于 4 秒</p>
                    <p>区块奖励 3.03641 以太币</p>
                </div>
            </div>
        )
    })

    return (
        <Card className={styles.middle_blocks} loading={loading}>
            <div className={styles.middle_block_contents}>
                <div>
                    <Icon type="database" />
                    <span>区块</span>
                </div>
                <div>
                    <Button type="default">查看更多</Button>
                </div>
            </div>

            { compontents }
        </Card>
    )
}

export default middle_blocks
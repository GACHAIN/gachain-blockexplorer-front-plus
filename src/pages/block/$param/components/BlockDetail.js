import { Table, Button, Divider } from 'antd';
import { FormattedMessage } from 'react-intl';
import Link from 'umi/link';
import styles from './index.css';
import arrow_right_green from '../img/arrow_right_green.png';

const columns = [
    {
        title: <FormattedMessage id="PARAMNAME" />,
        dataIndex: 'key',
    }, {
        title: <FormattedMessage id="VALUE" />,
        dataIndex: 'val',
    },
]

const transactions_info_columns = [
    {
        title: <FormattedMessage id="TL_HASH" />,
        dataIndex: 'Hash',
        render: (text, record) => <Link to={`/transaction/${record.Hash}`}>{text}</Link>,
    }, {
        title: <FormattedMessage id="TL_BLOCKID" />,
        dataIndex: 'BlockID',
    }, {
        title: <FormattedMessage id="TL_ECOSYSTEMID" />,
        dataIndex: 'EcosystemID',
    }, {
        title: <FormattedMessage id="TL_SENDERKEYID" />,
        dataIndex: 'Sender',
    }, {
        title: <FormattedMessage id="T_RECIPIENTKEYID" />,
        dataIndex: 'Recver',
    }, {
        title: <FormattedMessage id="TL_CREATETIME" />,
        dataIndex: 'Time',
    }, {
        title: <FormattedMessage id="T_AMOUNT" />,
        dataIndex: 'Total',
        render: (text) => <Button type="primary">{text}</Button>
    }
]

const BlockDetail = (props) => {
    let { Block_info, Transactions_info } = props.data_list
    const content = []
    for (let k in Transactions_info) {
        content.push(
            <div className={styles.transactions}>
                <div className={styles.head}>
                    <div className={styles.head_left_hash}>
                        <span>{String(Transactions_info[k].TxHash)}</span>
                    </div>
                    <div className={styles.head_right_time}>
                        <span>{String(Transactions_info[k].CreateTime)}</span>
                    </div>
                </div>
                <div className={styles.content}>
                    <div className={styles.send_hash}>
                        <span>{String(Transactions_info[k]['Sender KeyID'])}</span>
                    </div>
                    <div className={styles.sr_icon}><img src={arrow_right_green}/></div>
                    <div className={styles.recipient_hash}>
                        <span>{String(Transactions_info[k]['Recipient KeyID'])}</span>
                    </div>
                    <div className={styles.amount}>
                        <Button type="primary">{String(Transactions_info[k]['Money'])}</Button>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div>
            <Divider orientation="left"><FormattedMessage id="B_DETAIL" /></Divider>
            <Table columns={columns} dataSource={Block_info} pagination={false} rowKey={record => record.key} />
            <Divider orientation="left" style={{marginTop: 20}}><FormattedMessage id="TRANSACTION" /></Divider>

            <Table 
                columns={transactions_info_columns.map((item)=>{
                    item['align'] = 'center'
                    return item
                })} 
                dataSource={Transactions_info} 
                pagination={false} 
                rowKey={record => record.Hash} 
                scroll={{x: 1250}} 
            />
            {/* {content}             */}
        </div>
    )
}

export default BlockDetail
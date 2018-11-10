import { Table, Divider, Tooltip } from 'antd';
import { FormattedMessage } from 'react-intl';
import moment from 'moment';
import Link from 'umi/link';

const columns = [
    {
        title: <FormattedMessage id="PARAMNAME" />,
        dataIndex: 'key',
        width: 150
    }, {
        title: <FormattedMessage id="VALUE" />,
        dataIndex: 'val',
    },
]

const transactions_info_columns = [
    {
        title: <FormattedMessage id="TL_HASH" />,
        dataIndex: 'hash',
        render: (text, record) => {
            return (
                <Tooltip placement="topLeft" title={text}>
                    <Link to={`/transaction/${record.hash}`}id="textOverflow">{text}</Link>
                </Tooltip>
            )
        }
    }, {
        title: <FormattedMessage id="TL_CONTRACTNAME" />,
        dataIndex: 'contract_name',
    }, {
        title: <FormattedMessage id="TL_CREATETIME" />,
        dataIndex: 'time',
        render: (text)=>{
            return (
                <span>{ moment(text).format() }</span>
            )
        }
    }, {
        title: <FormattedMessage id="TL_TYPE" />,
        dataIndex: 'type',
    }, {
        title: <FormattedMessage id="TL_WALLET" />,
        dataIndex: 'key_id',
    }
]

const BlockDetail = (props) => {
    let { Block_header, Block_info, Transactions_info } = props.data_list
    console.log(props.data_list)
    return (
        <div>
            <Divider orientation="left"><FormattedMessage id="B_HEADER" /></Divider>
            <Table 
                columns={columns} 
                dataSource={Block_header} 
                pagination={false} 
                rowKey={record => record.key} 
                loading = {props.loading}
            />

            <Divider orientation="left"><FormattedMessage id="B_DETAIL" /></Divider>
            <Table 
                columns={columns} 
                dataSource={Block_info} 
                pagination={false} 
                rowKey={record => record.key} 
                loading = {props.loading}
            />

            <Divider orientation="left" style={{marginTop: 20}}><FormattedMessage id="TRANSACTION" /></Divider>
            <Table
                columns={transactions_info_columns.map((item)=>{
                    item['align'] = 'center'
                    return item
                })} 
                dataSource={Transactions_info} 
                pagination={true} 
                rowKey={record => record.hash} 
                loading = {props.loading}
            />
        </div>
    )
}

export default BlockDetail
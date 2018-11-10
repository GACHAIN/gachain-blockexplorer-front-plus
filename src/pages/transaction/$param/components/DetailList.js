import { Table, Row, Divider } from 'antd';
import { FormattedMessage } from 'react-intl';

const columns = [
    {
        title: <FormattedMessage id="PARAMNAME" />,
        dataIndex: 'key',
        render: text => {
            return <span style={{ width: '5rem', display: 'inline-block' }}>{text}</span>
        }
    }, {
        title: <FormattedMessage id="VALUE" />,
        dataIndex: 'value',
    },
]


const DetailList = (props) => {
    let { listData, pagination, loading } = props
    let tables = listData.map((item) => {
        return (
            <Row>
                <Divider orientation="left"><span>{item.key}</span></Divider>
                <Table
                    loading= {loading}
                    dataSource={item.value}
                    columns={columns}
                    pagination={pagination}
                    rowKey={record => {
                        return record.key + Math.random()
                    }}
                />
            </Row>
        )
    })
    return (
        <Row>
            { tables }
        </Row>
    )
}

export default DetailList
import { Table } from 'antd';
import { FormattedMessage } from 'react-intl';

const columns = [
    {
        title: <FormattedMessage id="PARAMNAME" />,
        dataIndex: 'key',
    }, {
        title: <FormattedMessage id="VALUE" />,
        dataIndex: 'val',
    },
]

const DetailList = (props) => {
    let { listData, pagination  } = props
    return (
        <Table dataSource={listData} columns = {columns} pagination={pagination}/>
    )
}

export default DetailList
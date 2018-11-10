import { FormattedMessage } from 'react-intl';
import { Table } from 'antd'
const columns = [
    {
        title: <FormattedMessage id="DATABASE_ID" />,
        dataIndex: 'ID',
    },
    {
        title: <FormattedMessage id="DATABASE_NAME" />,
        dataIndex: 'Name',
    },
    {
        title: <FormattedMessage id="DATABASE_ENGINE" />,
        dataIndex: 'Engine',
    },
    {
        title: <FormattedMessage id="DATABASE_BACKENDVISION" />,
        dataIndex: 'BackendVersion'
    }
]

export default (props) => {
    return (
        <Table columns={columns.map((item)=>{item['align']='center'; return item})} {...props}
        rowKey={record=>record.ID}
        />
    )
}
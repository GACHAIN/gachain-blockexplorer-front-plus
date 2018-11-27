import { connect } from 'dva';
import { Table } from 'antd';
import { FormattedMessage } from 'react-intl';

const Columns = ({table}) => {
    let { columnsData } = table
    const columns = [
        {
            title: <FormattedMessage id="DATABASE_FIELDS" />,
            dataIndex: 'column_name',
        },
        {
            title: <FormattedMessage id="DATABASE_TYPE" />,
            dataIndex: 'data_type',
        }
    ]
    return (
        <Table
            columns={columns.map((item)=>{
                item['align'] = 'center'
                return item
            })}
            dataSource={columnsData}
        />
    )
}

export default connect(table=>table)(Columns)
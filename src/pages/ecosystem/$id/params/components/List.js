import { Table } from 'antd';
import { FormattedMessage } from 'react-intl';

const columns = [
    {
      title: <FormattedMessage id="SP_NAME" />,
      dataIndex: 'Name',
    }, {
      title: <FormattedMessage id="SP_VALUE" />,
      dataIndex: 'Value',
    }, {
      title: <FormattedMessage id="SP_CONDITIONS" />,
      dataIndex: 'Conditions',
    }
  ];

const List = (props) => {
    return (
        <Table {...props}
        scroll={{x: 1000}}
        rowKey={record=>record.Name}
        columns={
            columns.map((item)=>{
                item['align'] = 'center'
                return item
            })
        }/>
    )
}

export default List
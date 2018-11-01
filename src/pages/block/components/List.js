import { Table } from 'antd';
import { FormattedMessage } from 'react-intl';
import Link from 'umi/link'

const columns = [
  {
    title: <FormattedMessage id="BL_BLOCKID" />,
    dataIndex: 'BlockHeight',
    render: (text, record) => <Link to={`block/${record.BlockHeight}`}>{text}</Link>,
  }, {
    title: <FormattedMessage id="BL_HASH" />,
    dataIndex: 'Hash',
  }, {
    title: <FormattedMessage id="BL_CREATETIME" />,
    dataIndex: 'Time',
  }, {
    title: <FormattedMessage id="BL_NODEPOSITION" />,
    dataIndex: 'NodePosition',
  }, {
    title: <FormattedMessage id="BL_ECOSYSTEMID" />,
    dataIndex: 'EcosystemID',
  }, {
    title: <FormattedMessage id="BL_KEYID" />,
    dataIndex: 'KeyID',
  }, {
    title: <FormattedMessage id="BL_TXNUM" />,
    dataIndex: 'TX',
  }];

const List = ({ ...listProps }) => {
  return (<Table
    scroll={{ x: 1250 }}
    rowKey={record => record.BlockHeight}
    columns={
      columns.map((item) => {
        item['align'] = 'center'
        return item
      })
    }
    {...listProps} />)
}

export default List
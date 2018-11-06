import { Table, Tooltip } from 'antd';
import { FormattedMessage } from 'react-intl';
import Link from 'umi/link';
import moment from 'moment';

const columns = [
  {
    title: <FormattedMessage id="BL_BLOCKID" />,
    dataIndex: 'block_id',
    render: (text, record) => <Link to={`block/${record.block_id}`}>{text}</Link>,
  }, {
    title: <FormattedMessage id="BL_HASH" />,
    dataIndex: 'hash',
    render: (text) => {
      return (
        <Tooltip placement="topLeft" title={text}>
          <span id="textOverflow">{text}</span>
        </Tooltip>
      )
    }
  }, {
    title: <FormattedMessage id="BL_CREATETIME" />,
    dataIndex: 'time',
    render: (text) => {
      return (
        <span>{moment(text).format()}</span>
      )
    }
  }, {
    title: <FormattedMessage id="BL_NODEPOSITION" />,
    dataIndex: 'node_position',
  }, {
    title: <FormattedMessage id="BL_ECOSYSTEMID" />,
    dataIndex: 'ecosystem_id',
  }, {
    title: <FormattedMessage id="BL_KEYID" />,
    dataIndex: 'key_id',
  }, {
    title: <FormattedMessage id="BL_TXNUM" />,
    dataIndex: 'tx_count',
  }];

const List = ({ ...listProps }) => {
  return (
    <Table
      columns={columns.map((item) => { item['align'] = 'center'; return item })}
      rowKey={record => record.block_id}
      {...listProps}
    />
  )
}

export default List
import { Table, Tooltip } from 'antd';
import { FormattedMessage } from 'react-intl';
import Link from 'umi/link';
import moment from 'moment';

const List = ({ ...listProps }) => {
  const columns = [
    {
      title: <FormattedMessage id="BL_BLOCKID" />,
      dataIndex: 'block_id',
      render: (text, record) => <Link to={`block/${record.block_id}`}>{text}</Link>,
    }, {
      title: <FormattedMessage id="BL_HASH" />,
      dataIndex: 'hash',
      render: (text, record) => {
        return (
          <Tooltip placement="topLeft" title={text}>
            <Link to={`block/${record.block_id}`}><span id="textOverflow">{text}</span></Link>
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
      render: (text) => (
        <Tooltip placement="topLeft" title={text}>
          <span id="textOverflow" onClick={() => { listProps.onToggle("key_id") }}>
            {text}
          </span>
        </Tooltip>
      )
    }, {
      title: <FormattedMessage id="BL_TXNUM" />,
      dataIndex: 'tx_count',
    }];

  return (
    <Table
      columns={columns.map((item) => { item['align'] = 'center'; return item })}
      rowKey={record => record.hash + Math.random()}
      {...listProps}
    />
  )
}

export default List
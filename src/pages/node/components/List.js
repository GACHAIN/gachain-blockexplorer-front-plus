import { Table, Tooltip } from 'antd';
import { FormattedMessage } from 'react-intl';
// import Link from 'umi/link';
import * as React from 'react';

const columns = [
  {
    title: <FormattedMessage id="N_NODEID" />,
    dataIndex: 'api_address',
  }, {
    title: <FormattedMessage id="N_URL" />,
    dataIndex: 'key_id',
    render: (text) => <a target="black" href={text}>{text}</a>
  }, {
    title: <FormattedMessage id="N_URL" />,
    dataIndex: 'public_key',
    render: (text) => {
      return (
        <Tooltip placement="topLeft" title={text}>
          <span id="textOverflow">{text}</span>
        </Tooltip>
      )
    }
  }, {
    title: <FormattedMessage id="N_URL" />,
    dataIndex: 'unban_time',
  }
];

const NodeList = ({ ...listProps }) => {
  return (
    <Table
      columns={columns.map((item) => { item['align'] = 'center'; return item })}
      rowKey={record => record.api_address}
      {...listProps}
    />
  )
}

export default NodeList
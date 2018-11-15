import { Table, Tooltip } from 'antd';
import { FormattedMessage } from 'react-intl';
// import Link from 'umi/link';
import * as React from 'react';

const NodeList = ({ ...listProps }) => {
  const columns = [
    {
      title: <FormattedMessage id="N_URL" />,
      dataIndex: 'api_address',
      render: (text) => <span>{text}</span>
    }, {
      title: <FormattedMessage id="N_KEYID" />,
      dataIndex: 'key_id',
      render: (text) => {
        return (
          <a onClick={() => listProps.onToggle("key_id")} id="textOverflow">{text}</a>
        )
      }
    }, {
      title: <FormattedMessage id="MN_PUBLICKEY" />,
      dataIndex: 'public_key',
      render: (text) => {
        return (
          <Tooltip placement="topLeft" title={text}>
            <span id="textOverflow">{text}</span>
          </Tooltip>
        )
      }
    }
  ];

  return (
    <Table
      columns={columns.map((item) => { item['align'] = 'center'; return item })}
      rowKey={record => record.api_address}
      {...listProps}
    />
  )
}

export default NodeList
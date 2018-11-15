import { Table, Tooltip, Row, Tag } from 'antd';
import { FormattedMessage } from 'react-intl';
import { checkKeyidOrAddress, walletAddrToId } from 'utils';
import * as React from 'react';

const NodeList = ({ ...listProps }) => {
  const viewDetail = (text) => {
    text = checkKeyidOrAddress(text) === 1 ? walletAddrToId(text) : text
    window.location.href = `${window.origin}#/ecosystem/1/member/${text}`
  }
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
          <Row>
            <Tooltip placement="topLeft" title={text}>
              <a onClick={() => listProps.onToggle("key_id")} id="textOverflow">{text}</a>
            </Tooltip>
            <Tag color="#108ee9" onClick={() => { viewDetail(text) }}>查看</Tag>
          </Row>
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
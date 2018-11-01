import { Table } from 'antd';
import { FormattedMessage } from 'react-intl';
// import Link from 'umi/link';
import * as React from 'react';

const columns = [
  {
    title: <FormattedMessage id="N_NODEID" />,
    dataIndex: 'NodeID',
  }, {
    title: <FormattedMessage id="N_URL" />,
    dataIndex: 'Url',
    render: (text)=><a target="black" href={text}>{text}</a>
  }, 
  // {
  //   title: <FormattedMessage id="N_VOTENUMS" />,
  //   dataIndex: 'VoteNums',
  // }, {
  //   title: <FormattedMessage id="N_DAILYREWARD" />,
  //   dataIndex: 'DailyReward',
  // }
];

const NodeList = ({ ...listProps }) => {
  return (
    <Table
      columns={
        columns.map((item) => {
          item['align'] = 'center'
          return item
        })
      }
      rowKey={record => record.NodeID}
      {...listProps} />
  )
}

export default NodeList
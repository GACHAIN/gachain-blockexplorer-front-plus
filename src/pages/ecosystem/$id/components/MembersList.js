import { Table, Tooltip, Tag } from 'antd';
import { FormattedMessage } from 'react-intl';
import Link from 'umi/link';
import { qGacToGac } from 'utils';

const List = (props) => {
  const columns = [
    {
      title: <FormattedMessage id="K_WALLETID" />,
      dataIndex: 'id',
      render: (text, record) => {
        return (
          <div>
          <Tooltip placement="topLeft" title={text}>
            <a id="textOverflow" onClick={() => { props.onToggle("id") }}>
              {text}
            </a>
          </Tooltip>
          <Link to={`/ecosystem/${record.ecosystem}/member/${record.id}`}>
            <Tag color="#108ee9">查看</Tag>
          </Link>
          </div>
        )
      }
    }, {
      title: <FormattedMessage id="K_PUBLICKEY" />,
      dataIndex: 'publickey',
      render: text => {
        return (
          <Tooltip placement="topLeft" title={text}>
            <span id="textOverflow">{text}</span>
          </Tooltip>
        )
      }
    }, {
      title: <FormattedMessage id="K_AMOUNT" />,
      dataIndex: 'amount',
      render: text => {
        return (
          <span id="gac_amount">{qGacToGac(text)} GAC</span>
        )
      }
  
    },
  ];
  return (
    <Table {...props}
      rowKey={record => record.publickey}
      columns={columns.map((item) => { item['align'] = 'center'; return item })}
      scroll={{ x: "500" }}
    />
  )
}

export default List
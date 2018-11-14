import { Table, Tooltip } from 'antd';
import { FormattedMessage } from 'react-intl';
import { qGacToGac } from 'utils';

const columns = [
  {
    title: <FormattedMessage id="K_WALLETID" />,
    dataIndex: 'id',
  }, {
    title: <FormattedMessage id="K_AMOUNT" />,
    dataIndex: 'amount',
    render: text=>{
      return (
        <span id="gac_amount">{qGacToGac(text)} GAC</span>
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
  }
];

const List = (props) => {
  return (
    <Table {...props}
      rowKey={record => record.publickey}
      columns={columns.map((item) => { item['align'] = 'center'; return item })
      } />
  )
}

export default List
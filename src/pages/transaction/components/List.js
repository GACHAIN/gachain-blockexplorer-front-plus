import { Table, Button } from 'antd';
import { FormattedMessage } from 'react-intl';
import { moneyToGac } from '../../../utils/index';
import Link from 'umi/link';

const columns = [
  {
    title: <FormattedMessage id="TL_HASH" />,
    dataIndex: 'Hash',
    render: (text, record) => <Link to={`transaction/${record.Hash}`}><span style={{fontWeight: 'bold'}}>{text}</span></Link>,
  }, {
    title: <FormattedMessage id="TL_BLOCKID" />,
    dataIndex: 'BlockID',
  }, {
    title: <FormattedMessage id="TL_ECOSYSTEMID" />,
    dataIndex: 'EcosystemID',
  }, {
    title: <FormattedMessage id="TL_SENDERKEYID" />,
    dataIndex: 'Sender',
  }, {
    title: <FormattedMessage id="T_RECIPIENTKEYID" />,
    dataIndex: 'Recver',
  }, {
    title: <FormattedMessage id="TL_CREATETIME" />,
    dataIndex: 'Time',
    render: (text)=><span style={{fontWeight: "bold"}}>{text}</span>
  }, {
    title: <FormattedMessage id="T_AMOUNT" />,
    dataIndex: 'Amount',
    render: (text)=><Button type="primary">{text} GAC</Button>
  }];

const List = ({ ...listProps }) => {
  return (<Table
    scroll={{ x: 1600 }}
    rowKey={record => record.Hash}
    columns={
      columns.map((item) => {
        item['align'] = 'center'
        return item
      })
    }
    {...listProps} />
  )
}

export default List
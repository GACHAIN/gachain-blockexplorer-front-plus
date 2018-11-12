import { Table, Tooltip, Row, Tag } from 'antd';
import { FormattedMessage } from 'react-intl';
import moment from 'moment';
import Link from 'umi/link';

const List = ({ ...listProps }) => {
  const columns = [
    {
      title: <FormattedMessage id="TL_HASH" />,
      dataIndex: 'Hash',
      render: (text, record) => {
        if (record.BlockID > 0) {
          return (
            <Tooltip placement="topLeft" title={text}>
              <Link to={`transaction/${record.Hash}`}>
                <span id="textOverflow">{text}</span>
              </Link>
            </Tooltip>
          )
        } else {
          return (
            <Tooltip placement="topLeft" title={text}>
              <span id="textOverflow">{text}</span>
            </Tooltip>
          )
        }
      }
    }, {
      title: <FormattedMessage id="TL_BLOCKID" />,
      dataIndex: 'BlockID',
      render: (text, record) => {
        if (Number(text) > 0) {
          return (
            <Link to={`block/${record.BlockID}`}><span>{text}</span></Link>
          )
        } else {
          return (
            <span id="failure">
              <FormattedMessage id="ME_FAILYRE" />
            </span>
          )
        }
      }
    },
    {
      title: <FormattedMessage id="TL_TYPE" />,
      dataIndex: 'Type',
    },
    {
      title: <FormattedMessage id="TL_WALLET" />,
      dataIndex: 'WalletID',
      render: (text) => {
        return (
          <Tooltip placement="topLeft" title={text}>
            <span id="textOverflow" onClick={() => { listProps.onToggle("WalletID") }}>
              {text}
            </span>
          </Tooltip>
        )
      }
    }, {
      title: <FormattedMessage id="TL_CREATETIME" />,
      dataIndex: 'Time',
      render: (text) => (
        <Row>
          <Tag color="#2db7f5">{moment(text*1000).format('YY-MM-DD HH:mm:ss')}</Tag>
          <Tag color="#108ee9">{moment(text*1000).fromNow(false)}</Tag>
        </Row>
      )
    }, {
      title: <FormattedMessage id="T_ERROR" />,
      dataIndex: 'Error',
      render: (text) => (
        <Tooltip placement="topLeft" title={text}>
          <span id="textOverflow">{text}</span>
        </Tooltip>
      )
    }];

  return (<Table
    rowKey={record => record.Hash}
    columns={
      columns.map((item) => { item['align'] = 'center'; return item })
    }
    {...listProps} />
  )
}

export default List
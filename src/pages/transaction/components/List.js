import { Table, Tooltip, Row, Tag } from 'antd';
import { FormattedMessage } from 'react-intl';
import moment from 'moment';
import Link from 'umi/link';

const List = ({ ...listProps }) => {
  const columns = [
    {
      title: <FormattedMessage id="TL_HASH" />,
      dataIndex: 'hash',
      render: (text, record) => {
        if (record.BlockID > 0) {
          return (
            <Tooltip placement="topLeft" title={text}>
              <Link to={`transaction/${record.hash}`}>
                <span id="textOverflow">{text}</span>
              </Link>
            </Tooltip>
          )
        } else {
          return (
            <Tooltip placement="topLeft" title={text}>
              <Link to={`transaction/${record.hash}`}>
                <span id="textOverflow">{text}</span>
              </Link>
            </Tooltip>
          )
        }
      }
    }, {
      title: <FormattedMessage id="TL_BLOCKID" />,
      dataIndex: 'block_id',
      render: (text, record) => {
        if (Number(text) > 0) {
          return (
            <Link to={`block/${record.block_id}`}><span>{text}</span></Link>
          )
        } else {
          return (
            <span id="failure">
              <FormattedMessage id="ME_FAILYRE" />
            </span>
          )
        }
      }
    }, {
      title: <FormattedMessage id="TL_TYPE" />,
      dataIndex: 'type',
      render: (text) => {
        if (text === 276) {
          return (
            <Tag color="blue"><FormattedMessage id="TYPE_TRANSFER" /></Tag>
          )
        } else
          if (text === 293) {
            return (
              <Tag color="green"><FormattedMessage id="TYPE_CREATEUSER" /></Tag>
            )
          } else
            if (text === 264) {
              return (
                <Tag color="magenta"><FormattedMessage id="TYPE_TASK" /></Tag>
              )
            }

        return text
      }
    }, {
      title: <FormattedMessage id="TL_WALLET" />,
      dataIndex: 'key_id',
      render: (text) => {
        return (
          <Tooltip placement="topLeft" title={text}>
            <span id="textOverflow" onClick={() => { listProps.onToggle("key_id") }}>
              {text}
            </span>
          </Tooltip>
        )
      }
    }, {
      title: <FormattedMessage id="TL_CREATETIME" />,
      dataIndex: 'time',
      render: (text) => (
        <Row>
          <Tag color="#108ee9">{moment(text * 1000).fromNow(false)}</Tag>
        </Row>
      )
    }];

  return (<Table
    rowKey={record => record.hash}
    columns={
      columns.map((item) => { item['align'] = 'center'; return item })
    }
    {...listProps} />
  )
}

export default List
import { Table, Tooltip } from 'antd';
import { FormattedMessage } from 'react-intl';
import * as React from 'react';

const columns = [
  {
    title: <FormattedMessage id="SP_NAME" />,
    dataIndex: 'name',
  }, {
    title: <FormattedMessage id="SP_VALUE" />,
    dataIndex: 'value',
    render: (text)=>{
      return (
        <Tooltip placement="topLeft" title={text} arrowPointAtCenter>
          <span id="textOverflow">{text}</span>
        </Tooltip>
      )
    }
  }, {
    title: <FormattedMessage id="SP_CONDITIONS" />,
    dataIndex: 'conditions',
  }
];

const SystemParamList = ({ ...listProps }) => {
  return (
    <div>
      <Table
        columns={ columns.map((item) => { item['align'] = 'center'; return item }) }
        rowKey={ record=>record.name }
        {...listProps}
      />
    </div>
  )
}

export default SystemParamList
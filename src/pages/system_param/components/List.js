import { Table } from 'antd';
import { FormattedMessage } from 'react-intl';
import * as React from 'react';

const columns = [
  {
    title: <FormattedMessage id="SP_NAME" />,
    dataIndex: 'Name',
  }, {
    title: <FormattedMessage id="SP_VALUE" />,
    dataIndex: 'Value',
  }, {
    title: <FormattedMessage id="SP_CONDITIONS" />,
    dataIndex: 'Conditions',
  }
];

const SystemParamList = ({ ...listProps }) => {
  return (
    <div>
      <Table
        columns={
          columns.map((item) => {
            item['align'] = 'center'
            return item
          })
        }
        {...listProps}
      />
    </div>
  )
}

export default SystemParamList
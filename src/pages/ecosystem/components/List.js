import { Table } from 'antd';
import { FormattedMessage } from 'react-intl';
import Link from 'umi/link';
import withRouter from 'umi/withRouter';

const columns = [
  {
    title: <FormattedMessage id="E_ID" />,
    dataIndex: 'EcosystemID',
  }, {
    title: <FormattedMessage id="E_NAME" />,
    dataIndex: 'EcosystemName',
    render: (text, record) => <Link to={
      {
        pathname: `/ecosystem/${record.EcosystemID}/params`,
        state: {
          ecosys_par: record.Params
        }
      }
    }>{text}</Link>
  }
]

const EcosystemList = ({ ...listProps }) => {
  return (
    <Table {...listProps} columns={columns.map((item)=>{ item['align'] = 'center'; return item })}
    rowKey={record=>record.EcosystemID}
    />
  )
}

export default withRouter(EcosystemList)
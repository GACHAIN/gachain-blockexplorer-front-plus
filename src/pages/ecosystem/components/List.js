import { Table } from 'antd';
import { FormattedMessage } from 'react-intl';
import Link from 'umi/link';
import withRouter from 'umi/withRouter';

const columns = [
	{
		title: <FormattedMessage id="E_ID" />,
		dataIndex: 'id',
	}, {
		title: <FormattedMessage id="E_NAME" />,
		dataIndex: 'name',
		render: (text, record) => <Link to={
			{
				pathname: `/ecosystem/${record.id}`,
				query: {
					'state': 'params'
				}
			}
		}>{text}</Link>
	}, {
		title: <FormattedMessage id="E_MEMBERS" />,
		dataIndex: 'member',
		render: (text, record) => <Link to={
			{
				pathname: `/ecosystem/${record.id}`,
				query: {
					'state': 'members'
				}
			}
		}>{text}</Link>
	}
];

const EcosystemList = ({ ...listProps }) => {
	return (
		<Table {...listProps} columns={columns.map((item) => { item['align'] = 'center'; return item; })}
			rowKey={record => record.name}
		/>
	);
};

export default withRouter(EcosystemList);
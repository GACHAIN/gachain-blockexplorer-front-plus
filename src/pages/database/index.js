import { connect } from 'dva';
import { FormattedMessage } from 'react-intl';
import { Table } from 'antd';
import Link from 'umi/link';

const Database = ({ database_desc, loading }) => {
	let { description } = database_desc;
	const columns = [
		{
			title: <FormattedMessage id="DATABASE_DES_ID" />,
			dataIndex: 'ID'
		},
		{
			title: <FormattedMessage id="DATABASE_DES_NAME" />,
			dataIndex: 'Name',
			render: (text, record) => {
				return (
					<Link to={`/node/db_id/${record.ID}/table`}>{text}</Link>
				);
			}
		},
		{
			title: <FormattedMessage id="DATABASE_DES_ENGINE" />,
			dataIndex: 'Engine'
		},
		{
			title: <FormattedMessage id="DATABASE_DES_BACKENDVERSION" />,
			dataIndex: 'BackendVersion'
		}
	];
	return (
		<Table
			loading={loading.effects['database_desc/queryDescription']}
			columns={columns}
			dataSource={description}
			rowKey={record => record.ID}
			pagination={{
				hideOnSinglePage: true
			}}
		/>
	);
};

export default connect(database_desc => database_desc)(Database);

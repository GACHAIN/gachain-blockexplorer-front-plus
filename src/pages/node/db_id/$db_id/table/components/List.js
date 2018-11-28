import { FormattedMessage } from 'react-intl';
import { Table, Row, Divider, Button } from 'antd';
import pathToRegexp from 'path-to-regexp';
import Link from 'umi/link';

export default props => {
	let { currentDesc, tableLoading, descLoading } = props;
	let db_id;
	const columns = [
		{
			title: <FormattedMessage id="DATABASE_T" />,
			dataIndex: 'tablename',
			render: text => {
				let match = pathToRegexp('#/node/db_id/:db_id/table').exec(
					window.location.hash
				);
				if (match) {
					db_id = parseInt(match[1], 10);
					return (
						<Link to={`/node/db_id/${db_id}/table/${text}`}>
							{text}
						</Link>
					);
				}
			},
			sorter: (a, b) => a.tablename - b.tablename,
		},
		{
			title: <FormattedMessage id="DATABASE_V_C" />,
			render: record => {
				return (
					<Row>
						<Link
							to={`/node/db_id/${db_id}/table/${
								record.tablename
							}`}
						>
							<Button type="primary">value</Button>
						</Link>
						<Link
							style={{ paddingLeft: '1rem' }}
							to={`/node/db_id/${db_id}/table/${
								record.tablename
							}/columns`}
						>
							<Button type="default">column</Button>
						</Link>
					</Row>
				);
			}
		}
	];
	let descColumns = [
		{
			title: <FormattedMessage id="DATABASEPARAMS" />,
			dataIndex: 'key'
		},
		{
			title: <FormattedMessage id="DATABASEVALUES" />,
			dataIndex: 'value'
		}
	];
	let desc = Object.entries(currentDesc).map(item => {
		let obj = {};
		obj['key'] = item[0];
		obj['value'] = item[1];
		return obj;
	});
	let databaseInfoProps = {
		columns: descColumns,
		dataSource: desc
	};

	return (
		<Row>
			<Divider orientation="left">
				<FormattedMessage id="DATABASE_INFO" />
			</Divider>
			<Table
				{...databaseInfoProps}
				loading={descLoading}
				rowKey={record => {
					return record.key;
				}}
				pagination={{
					hideOnSinglePage: true
				}}
			/>
			<Divider orientation="left">
				<FormattedMessage id="DATABASE_T" />
			</Divider>
			<Table
				columns={columns.map(item => {
					item['align'] = 'center';
					return item;
				})}
				loading={tableLoading}
				{...props}
				rowKey={record => {
					return record.tablename;
				}}
			/>
		</Row>
	);
};

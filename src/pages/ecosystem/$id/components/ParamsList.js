import { Table, Tooltip } from 'antd';
import { FormattedMessage } from 'react-intl';

const columns = [
	{
		title: <FormattedMessage id="SP_NAME" />,
		dataIndex: 'name'
	},
	{
		title: <FormattedMessage id="SP_VALUE" />,
		dataIndex: 'value',
		render: text => {
			return (
				<Tooltip placement="topLeft" title={text}>
					<span id="textOverflow">{text}</span>
				</Tooltip>
			);
		}
	},
	{
		title: <FormattedMessage id="SP_CONDITIONS" />,
		dataIndex: 'conditions'
	}
];

const List = props => {
	return (
		<Table
			{...props}
			rowKey={record => record.name}
			columns={columns.map(item => {
				item['align'] = 'center';
				return item;
			})}
		/>
	);
};

export default List;

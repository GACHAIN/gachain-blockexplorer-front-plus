import { Table, Tooltip, Tag } from 'antd';
import { FormattedMessage } from 'react-intl';
import * as React from 'react';

const columns = [
	{
		title: <FormattedMessage id="SP_ID" />,
		dataIndex: 'id',
		sorter: true,
	}, {
		title: <FormattedMessage id="SP_NAME" />,
		dataIndex: 'name',
	}, {
		title: <FormattedMessage id="SP_VALUE" />,
		dataIndex: 'value',
		render: (text) => {
			if (text === '') {
				text = '-';
			}
			return (
				<Tooltip placement="topLeft" title={text} arrowPointAtCenter>
					<span id="textOverflow">{text}</span>
				</Tooltip>
			);
		}
	}, {
		title: <FormattedMessage id="SP_CONDITIONS" />,
		dataIndex: 'conditions',
		render: (text) => {
			if (text === 'true') {
				return (
					<Tag color="blue">{text}</Tag>
				);
			} else {
				return (
					<Tag color="red">{text}</Tag>
				);
			}
		}
	}
];

const SystemParamList = ({ ...listProps }) => {
	return (
		<div>
			<Table
				columns={columns.map((item) => { item['align'] = 'center'; return item; })}
				rowKey={record => record.name}
				{...listProps}
			/>
		</div>
	);
};

export default SystemParamList;
import { Table, Tooltip, Icon } from 'antd';
import { FormattedMessage } from 'react-intl';
import * as React from 'react';

import { nodeIcon, nodePosition } from 'config';

const NodeList = ({ ...listProps }) => {
	const columns = [
		{
			title: <FormattedMessage id="N_REGION" />,
			render: (text, record) => {
				return (
					<span><Icon 
						style={{paddingRight: '1rem', fontSize: '1.2rem', textAlign: 'left'}}
						component={nodeIcon[parseInt(record.nodeposition, 10)-1]}/>{nodePosition[parseInt(record.nodeposition, 10)-1]}</span>
				);
			},
			key: text => text
		},{
			title: <FormattedMessage id="N_URL" />,
			dataIndex: 'api_address',
			render: (text) => <span>{text}</span>
		}, {
			title: <FormattedMessage id="N_KEYID" />,
			dataIndex: 'key_id',
			render: (text) => {
				return (
					<Tooltip placement="topLeft" title={text}>
						<a onClick={() => listProps.onToggle('key_id')} id="textOverflow">{text}</a>
					</Tooltip>
				);
			},
		}, {
			title: <FormattedMessage id="MN_PUBLICKEY" />,
			dataIndex: 'public_key',
			render: (text) => {
				return (
					<Tooltip placement="topLeft" title={text}>
						<span id="textOverflow">{text}</span>
					</Tooltip>
				);
			},
		}
	];

	return (
		<Table
			columns={columns.map((item) => { item['align'] = 'center'; return item; })}
			rowKey={record => record.public_key}
			{...listProps}
		/>
	);
};

export default NodeList;
import { Table, Tooltip, Icon } from 'antd';
import { FormattedMessage } from 'react-intl';
import * as React from 'react';
import china from '@public/china.svg';
import japan from '@public/japan.svg';
import united_states from '@public/united-states.svg';

const NodeList = ({ ...listProps }) => {
	const columns = [
		{
			title: <FormattedMessage id="N_REGION" />,
			dataIndex: 'city',
			render: (text, record) => {
				return (
					<span><Icon 
						style={{paddingRight: '1rem', fontSize: '1.2rem'}}
						component={
							record.icon === 'china' ? china : record.icon === 'japan' ? japan :record.icon === 'united_states' ? united_states : united_states
						}/>{text}</span>
				)
			}
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
				)
			}
		}, {
			title: <FormattedMessage id="MN_PUBLICKEY" />,
			dataIndex: 'public_key',
			render: (text) => {
				return (
					<Tooltip placement="topLeft" title={text}>
						<span id="textOverflow">{text}</span>
					</Tooltip>
				)
			}
		}
	];

	return (
		<Table
			columns={columns.map((item) => { item['align'] = 'center'; return item })}
			rowKey={record => record.api_address}
			{...listProps}
		/>
	)
}

export default NodeList
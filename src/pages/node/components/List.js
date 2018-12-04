import { Table, Tooltip, Icon, Button } from 'antd';
import { FormattedMessage } from 'react-intl';
import Link from 'umi/link';
import * as React from 'react';

import { nodeIcon, nodePosition } from 'config';

const NodeList = ({ ...listProps }) => {
	const columns = [
		{
			title: <FormattedMessage id="N_REGION" />,
			width: '12rem',
			render: (text, record) => {
				return (
					<span>
						<Icon
							style={{
								paddingRight: '1rem',
								fontSize: '1.2rem',
								textAlign: 'left'
							}}
							component={
								nodeIcon[parseInt(record.NodePosition, 10) - 1]
							}
						/>
						{nodePosition[parseInt(record.NodePosition, 10) - 1]}
					</span>
				);
			},
			key: text => text
		},
		{
			title: <FormattedMessage id="N_STATE" />,
			dataIndex: 'Enable',
			render: text => {
				let nodeStateStyleBase = {
					width: '1rem',
					height: '1rem',
					display: 'inline-block',
					borderRadius: '1rem'
				};
				let nodeStateStyle = text
					? {
						...nodeStateStyleBase,
						backgroundColor: '#2cde0b'
					}
					: {
						...nodeStateStyleBase,
						backgroundColor: 'red'
					};

				return <i style={nodeStateStyle} />;
			}
		},
		{
			title: <FormattedMessage id="N_URL" />,
			dataIndex: 'api_address',
			render: text => <span>{text}</span>
		},
		{
			title: <FormattedMessage id="N_KEYID" />,
			dataIndex: 'key_id',
			render: text => {
				return (
					<Tooltip placement="topLeft" title={text}>
						<a
							onClick={() => listProps.onToggle('key_id')}
							id="textOverflow"
						>
							{text}
						</a>
					</Tooltip>
				);
			}
		},
		{
			title: <FormattedMessage id="MN_PUBLICKEY" />,
			dataIndex: 'public_key',
			render: text => {
				return (
					<Tooltip placement="topLeft" title={text}>
						<span id="textOverflow">{text}</span>
					</Tooltip>
				);
			}
		},
		{
			title: <FormattedMessage id="DATABASE" />,
			render: (text, record) => {
				let { Enable, NodePosition } = record;
				let buttonProps = Enable
					? {
						type: 'primary'
					}
					: {
						type: 'default',
						disabled: true
					};

				return (
					<Link to={`/node/db_id/${NodePosition}/table`} replace={true}>
						<Button {...buttonProps}>
							<FormattedMessage id="VIEW" />
						</Button>
					</Link>
				);
			}
		}
	];

	return (
		<Table
			columns={columns.map((item, index) => {
				if (index !== 0) {
					item['align'] = 'center';
				}
				return item;
			})}
			rowKey={record => record.public_key}
			{...listProps}
		/>
	);
};

export default NodeList;

import { Table, Tooltip, Row, Tag, Icon } from 'antd';
import { FormattedMessage } from 'react-intl';
import { checkKeyidOrAddress, walletAddrToId } from 'utils';
import { nodePosition, nodeIcon } from 'config';
import Link from 'umi/link';
import moment from 'moment';

const List = ({ ...listProps }) => {
	const viewDetail = text => {
		text = checkKeyidOrAddress(text) === 1 ? walletAddrToId(text) : text;
		window.location.href = `${window.location.origin || ''}#/ecosystem/1/member/${text}?state=income`;
	};
	const columns = [
		{
			title: <FormattedMessage id="BL_BLOCKID" />,
			dataIndex: 'id',
			render: (text, record) => (
				<Link to={`block/${record.id}`}>{text}</Link>
			),
			sorter: true,
		},
		{
			title: <FormattedMessage id="BL_HASH" />,
			dataIndex: 'hash',
			render: (text, record) => (
				<Tooltip placement="topLeft" title={text}>
					<Link to={`block/${record.id}`}>
						<span id="textOverflow">{text}</span>
					</Link>
				</Tooltip>
			)
		},
		{
			title: <FormattedMessage id="BL_CREATETIME" />,
			dataIndex: 'time',
			render: text => (
				<Row>
					<Tag color="#108ee9">
						{moment(text * 1000).fromNow(false)}
					</Tag>
				</Row>
			),
			sorter: true,
			defaultSortOrder: 'descend',
		},
		{
			title: <FormattedMessage id="BL_NODEPOSITION" />,
			dataIndex: 'node_position',
			render: text => (
				<Row style={{ textAlign: 'left' }}>
					<Icon
						component={nodeIcon[parseInt(text, 10)]}
						style={{ fontSize: '1.5rem', paddingRight: '1rem' }}
					/>
					<span>{nodePosition[text]}</span>
				</Row>
			)
		},
		{
			title: <FormattedMessage id="BL_ECOSYSTEMID" />,
			dataIndex: 'ecosystem_id'
		},
		{
			title: <FormattedMessage id="BL_KEYID" />,
			dataIndex: 'key_id',
			render: text => (
				<Row>
					<Tooltip placement="topLeft" title={text}>
						<a
							id="textOverflow"
							onClick={() => {
								listProps.onToggle('key_id');
							}}
						>
							{text}
						</a>
					</Tooltip>
					<Tag
						color="#108ee9"
						onClick={() => {
							viewDetail(text);
						}}
					>
						<FormattedMessage id="VIEW" />
					</Tag>
				</Row>
			),
			sorter: true,
		},
		{
			title: <FormattedMessage id="BL_TXNUM" />,
			dataIndex: 'tx',
			sorter: true,
		}
	];

	return (
		<Table
			columns={columns.map(item => {
				item['align'] = 'center';
				return item;
			})}
			rowKey={record => record.hash + Math.random()}
			{...listProps}
		/>
	);
};

export default List;

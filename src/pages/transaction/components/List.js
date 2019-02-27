import { Table, Tooltip, Row, Tag } from 'antd';
import { FormattedMessage } from 'react-intl';
import { checkKeyidOrAddress, walletAddrToId } from 'utils';
import moment from 'moment';
import Link from 'umi/link';

const List = ({ ...listProps }) => {
	const viewDetail = text => {
		text = checkKeyidOrAddress(text) === 1 ? walletAddrToId(text) : text;
		window.location.href = `${window.location.origin || ''}#/ecosystem/1/member/${text}?state=income`;
	};
	const columns = [
		{
			title: <FormattedMessage id="TL_HASH" />,
			dataIndex: 'hash',
			render: (text, record) => {
				let result = {};
				if (parseInt(record.block_id, 10) > 1) {
					result = (
						<Tooltip placement="topLeft" title={text}>
							<Link to={`transaction/${record.hash}`}>
								<span id="textOverflow">{text}</span>
							</Link>
						</Tooltip>
					);
				} else {
					result = (
						<Tooltip placement="topLeft" title={text}>
							<span id="textOverflow">{text}</span>
						</Tooltip>
					);
				}

				return result;
			}
		},
		{
			title: <FormattedMessage id="TL_BLOCKID" />,
			dataIndex: 'block_id',
			render: (text, record) => {
				if (parseInt(text, 10) > 0) {
					return (
						<Link to={`block/${record.block_id}`}>
							<span>{text}</span>
						</Link>
					);
				} else {
					return (
						<span id="failure">
							<FormattedMessage id="ME_FAILYRE" />
						</span>
					);
				}
			},
			sorter: true
		},
		{
			title: <FormattedMessage id="TL_CALL" />,
			dataIndex: 'contract_name',
			render: text => {
				return (
					<Tag color="blue">
						<span>{text}</span>
					</Tag>
				);
			}
		},
		{
			title: <FormattedMessage id="TL_WALLET" />,
			dataIndex: 'key_id',
			render: text => {
				let result = {};
				if (text !== '') {
					result = (
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
					);
				}

				return result;
			},
			sorter: true,
		},
		{
			title: <FormattedMessage id="TL_CREATETIME" />,
			dataIndex: 'time',
			render: text => (
				<Row>
					<Tag color="#108ee9">
						{text > 0 ? moment(text * 1000).fromNow() : '-'}
					</Tag>
				</Row>
			),
			sorter: true,
			defaultSortOrder: 'descend'
		}
	];

	return (
		<Table
			rowKey={record => record.hash}
			columns={columns.map(item => {
				item['align'] = 'center';
				return item;
			})}
			{...listProps}
		/>
	);
};

export default List;

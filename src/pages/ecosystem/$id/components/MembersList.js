import { Table, Tooltip, Tag, Row } from 'antd';
import { FormattedMessage } from 'react-intl';
import { qGacToGac, fmoney, checkKeyidOrAddress, walletAddrToId } from 'utils';

const List = props => {
	const viewDetail = text => {
		let s = checkKeyidOrAddress(text) === 1 ? walletAddrToId(text) : text;
		window.location.href = `${
			window.origin
		}#/ecosystem/1/member/${s}?state=income`;
	};
	const columns = [
		{
			title: <FormattedMessage id="K_WALLETID" />,
			dataIndex: 'id',
			render: (text, record) => {
				return (
					<Row>
						<Tooltip placement="topLeft" title={text}>
							<a
								id="textOverflow"
								onClick={() => {
									props.onToggle('id');
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
			},
			sorter: true,
		},
		{
			title: <FormattedMessage id="K_PUBLICKEY" />,
			dataIndex: 'publickey',
			render: text => {
				return (
					<Tooltip placement="topLeft" title={text}>
						<span id="textOverflow">{text}</span>
					</Tooltip>
				);
			},
		},
        
		{
			title: <FormattedMessage id="K_AMOUNT" />,
			dataIndex: 'amount',
			render: text => {
				return (
					<span id="gac_amount">
						{fmoney(qGacToGac(text), 3)} GAC
					</span>
				);
			},
			sorter: true,
		}
	];
	return (
		<Table
			{...props}
			rowKey={record => record.id}
			columns={columns.map(item => {
				if (item.dataIndex !== 'amount') {
					item['align'] = 'left';
				}else{
					item['align'] = 'left';
				}
				return item;
			})}
			scroll={{ x: '500' }}
		/>
	);
};

export default List;

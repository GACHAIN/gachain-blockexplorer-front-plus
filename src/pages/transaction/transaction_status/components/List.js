import { Table } from 'antd';
import { FormattedMessage } from 'react-intl';

const TransactionStatusList = (listProps) => {

	const columns = [
		{
			title: <FormattedMessage id="TL_BLOCKID" />,
			dataIndex: 'BlockID',
		},
		{
			title: <FormattedMessage id="TL_HASH" />,
			dataIndex: 'Hash',
			render: text => {
				return (
					<span id="textOverflow">{text}</span>
				);
			}
		},
		{
			title: <FormattedMessage id="H_TIME" />,
			dataIndex: 'Time',
		},
		{
			title: <FormattedMessage id="TL_TYPE" />,
			dataIndex: 'Type',
		},
		{
			title: <FormattedMessage id="TL_WALLET" />,
			dataIndex: 'WalletID',
		},
		{
			title: <FormattedMessage id="TransactionStatus" />,
			render: (record, text) => {
				let { BlockID, Error } = record;
				if (BlockID === 0 && Error !== '') {
					return (
						<span id="failure"><FormattedMessage id="ME_FAILYRE" /></span>
					);
				} else if(BlockID === 0 && Error === '') {
					return (
						<span id="waiting"><FormattedMessage id="ME_WAITING" /></span>
					);
				} else {
					return (
						<span id="success"><FormattedMessage id="ME_SUCCESS" /></span>
					);
				}
			}
		}
	];

	return (
		<Table
			columns={columns}
			rowKey={record => record.Hash}
			{...listProps}
		/>
	);
};

export default TransactionStatusList;
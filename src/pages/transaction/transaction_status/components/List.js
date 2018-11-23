import { Table, Tag, Tooltip, message } from 'antd';
import { FormattedMessage } from 'react-intl';
import { transactionType } from 'config';
import moment from 'moment';
import Link from 'umi/link';

const TransactionStatusList = (listProps) => {

	const columns = [
		{
			title: <FormattedMessage id="TL_BLOCKID" />,
			dataIndex: 'BlockID',
			render: (text, record) => {
				if (record.BlockID > 0) {
					return (
						<Link to={`/transaction/${text}`}>{text}</Link>
					);
				}else {
					return (
						<span to={`/transaction/${text}`}>{text}</span>
					);
				}
				
			}
		},
		{
			title: <FormattedMessage id="TL_HASH" />,
			dataIndex: 'Hash',
			render: (text, record) => {
				if (record.BlockID > 0) {
					return (
						<Tooltip placement="topLeft" title={text}>
							<Link id="textOverflow" to={`/transaction/${text}`}>{text}</Link>
						</Tooltip>
					);
				} else {
					return (
						<Tooltip placement="topLeft" title={text}>
							<span id="textOverflow" to={`/transaction/${text}`}>{text}</span>
						</Tooltip>
					);
				}
				
			}
		},
		{
			title: <FormattedMessage id="H_TIME" />,
			dataIndex: 'Time',
			render: text=>{
				return (
					<Tag color="#108ee9">
						{moment(text*1000).fromNow()}
					</Tag>
				);
			}
		},
		{
			title: <FormattedMessage id="TL_TYPE" />,
			dataIndex: 'Type',
			render: text => {
				return (
					<Tag color="blue"><FormattedMessage id={transactionType[text]} /></Tag>
				);
			}
		},
		{
			title: <FormattedMessage id="TL_WALLET" />,
			dataIndex: 'WalletID',
			render: text => {
				return (
					<Tooltip placement="topLeft" title={text}>
						<Link id="textOverflow" to={`/ecosystem/1/member/${text}`}>{text}</Link>
					</Tooltip>
				)
			}
		},
		{
			title: <FormattedMessage id="TransactionStatus" />,
			render: (record, text) => {
				let { BlockID, Error } = record;
				if (BlockID === 0 && Error !== '') {
					return (
						<span id="failure" onClick={()=>{errorClickHandel(record)}}><FormattedMessage id="ME_FAILYRE" /></span>
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

	function errorClickHandel(record) {
		let { BlockID, Error } = record
		if (BlockID === 0 && Error !== '') {
			let errObj = JSON.parse(Error)
			message.error(errObj.error)
		}
	}

	return (
		<Table
			columns={
				columns.map((item)=>{
					item['align'] = 'center';
					return item;
				})
			}
			
			{...listProps}
		/>
	);
};

export default TransactionStatusList;
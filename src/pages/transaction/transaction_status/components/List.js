import { Table, Tag, Tooltip, message } from 'antd';
import { FormattedMessage } from 'react-intl';
import { transactionType } from 'config';
import moment from 'moment';
import Link from 'umi/link';

const TransactionStatusList = (listProps) => {

	const columns = [
		{
			title: <FormattedMessage id="TL_BLOCKID" />,
			dataIndex: 'block_id',
			render: (text, record) => {
				let result = {};
				if (record.block_id > 0) {
					result = (
						<Link to={`/block/${text}`}>{text}</Link>
					);
				}else {
					result = (
						<span to={`/block/${text}`}>{text}</span>
					);
				}
				return result;
			},
			sorter: true,
		},
		{
			title: <FormattedMessage id="TL_HASH" />,
			dataIndex: 'hash',
			render: (text, record) => {
				let result = {};
				if (record.block_id > 0) {
					result = (
						<Tooltip placement="topLeft" title={text}>
							<Link id="textOverflow" to={`/transaction/${text}`}>{text}</Link>
						</Tooltip>
					);
				} else {
					result = (
						<Tooltip placement="topLeft" title={text}>
							<span id="textOverflow" to={`/transaction/${text}`}>{text}</span>
						</Tooltip>
					);
				}
				return result;
			}
		},
		{
			title: <FormattedMessage id="H_TIME" />,
			dataIndex: 'time',
			render: text=>{
				return (
					<Tag color="#108ee9">
						{moment(text*1000).fromNow()}
					</Tag>
				);
			},
			sorter: true,
		},
		{
			title: <FormattedMessage id="TL_TYPE" />,
			dataIndex: 'type',
			render: text => {
				return (
					<Tag color="blue"><FormattedMessage id={transactionType[text] ? transactionType[text] : 'NULL'} /></Tag>
				);
			}
		},
		{
			title: <FormattedMessage id="TL_WALLET" />,
			dataIndex: 'wallet_id',
			render: text => {
				return (
					<Tooltip placement="topLeft" title={text}>
						<Link id="textOverflow" to={`/ecosystem/1/member/${text}`}>{text}</Link>
					</Tooltip>
				);
			},
			sorter: true
		},
		{
			title: <FormattedMessage id="TransactionStatus" />,
			render: (record, text) => {
				let { BlockID, Error } = record;
				if (BlockID === 0 && Error !== '') {
					return (
						<span id="failure" onClick={()=>{errorClickHandel(record);}}><FormattedMessage id="ME_FAILYRE" /></span>
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
		let { BlockID, Error } = record;
		if (BlockID === 0 && Error !== '') {
			let errObj = JSON.parse(Error);
			message.error(errObj.error);
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
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
				result = (
					<Tooltip placement="topLeft" title={text}>
						<Link id="textOverflow" to={`/transaction/${text}`}>{text}</Link>
					</Tooltip>
				);
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
			defaultSortOrder: 'descend',
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
				let { block_id, err } = record;
				let result;
				if (block_id === 0 && err !== '') {
					result = (
						<span id="failure" onClick={()=>{errorClickHandel(record);}}><FormattedMessage id="ME_FAILYRE" /></span>
					);
				} else if(block_id === 0 && err === '') {
					result = (
						<span id="waiting"><FormattedMessage id="ME_WAITING" /></span>
					);
				} else {
					result = (
						<span id="success"><FormattedMessage id="ME_SUCCESS" /></span>
					);
				}
				return result;
			}
		}
	];

	function errorClickHandel(record) {
		let { block_id, err } = record;
		if (block_id === 0 && err !== '') {
			let errObj = JSON.parse(err);
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
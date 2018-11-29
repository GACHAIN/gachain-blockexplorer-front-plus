import { Row, Icon } from 'antd';
import BlockDetail from './components/BlockDetail';
import { nodeIcon } from 'config';
import { clickCp } from 'utils';
import moment from 'moment';
import { FormattedMessage } from 'react-intl';
import { connect } from 'dva';

const Block = ({ s_block_detail, loading }) => {
	let { dataList } = s_block_detail;
	function handle_data_list(data) {
		let resObj = {};
		let Block_header = [];
		let Block_info = [];
		let Transactions_info = [];
		for (let k in data) {
			let obj = {};
			if (k === 'header') {
				for (let hk in data[k]) {
					let headObj = {};
					headObj.key = hk;
					if (hk === 'time') {
						headObj.val = (
							<Row>
								{moment(data[k][hk] * 1000).format('YYYY-MM-DD HH:mm:ss')}
							</Row>
						);
					} else {
						headObj.val = data[k][hk];
					}

					// 过滤字段
					let excludeField = ['hash', 'ecosystem_id'];
					if (excludeField.includes(headObj.key)) {
						continue;
					}

					// 对Key的处理
					if (headObj.key === 'key_id') {
						let _val = headObj.val;
						headObj.val = (
							<Row>
								<a href={`#/ecosystem/1/member/${headObj.val}?state=income`}>
									{headObj.val}
								</a>
								<Icon type="copy" id="copy" onClick={() => clickCp(_val)} />
							</Row>
						);
					}

					// 对nodeposition处理
					if (headObj.key === 'node_position') {
						headObj.val = (
							<Row>
								<span>
									{`#${headObj.val+1} `}<Icon component={nodeIcon[headObj.val]} style={{ fontSize: '1.2rem' }} />
									{/* 城市名称 */}
									{/* {nodePosition[headObj.val]} */}
								</span>
							</Row>
						);
					}

					// 对上一个区块hash的处理
					if (headObj.key === 'prehash' || headObj.key === 'sign' || headObj.key === 'block_id') {
						let _val = headObj.val;
						headObj.val = (
							<span>
								{headObj.val}
								<Icon type="copy" id="copy" onClick={() => clickCp(_val)} />
							</span>
						);
					}

					Block_header.push(headObj);
				}
			} else if (k === 'transactions') {
				Transactions_info = data[k];
			} else {
				// 排除字段
				obj.key = k;
				obj.val = data[k];
				let excludeField = ['ecosystem_id', 'node_position', 'key_id', 'time', 'gen_block', 'stop_count', 'sys_update', 'bin_data'];
				if (excludeField.includes(obj.key)) {
					continue;
				}
				if (obj.key === 'hash' || obj.key === 'rollbacks_hash' || obj.key === 'mrkl_root') {
					let _val = obj.val;
					obj.val = (
						<span>
							{obj.val}
							<Icon type="copy" id="copy" onClick={() => clickCp(_val)} />
						</span>
					);
				}

				// 区块大小和事务大小的处理
				if (obj.key === 'blocksize' || obj.key === 'trantotalsize') {
					obj.val = (
						<FormattedMessage id="BTSIZE" values={{
							val: obj.val
						}} />
					);
				}

				Block_info.push(obj);
			}
		}
		resObj = {
			Block_header,
			Block_info,
			Transactions_info
		};
		return resObj;
	}
	let listProps = {
		data_list: handle_data_list(dataList),
		loading: loading.effects['s_block_detail/query'],
	};

	return (
		<BlockDetail {...listProps} />
	);
};
export default connect(({ s_block_detail, loading }) => ({ s_block_detail, loading }))(Block);

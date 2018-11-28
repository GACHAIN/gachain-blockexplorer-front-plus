import { FormattedMessage } from 'react-intl';
import api from './api';

// icon
import china from '@public/china.svg';
import japan from '@public/japan.svg';
import united from '@public/united-states.svg';

module.exports = {
	// Version
	Version: '1.1.0',
	api,
	// Logo
	name: <FormattedMessage id="BLOCK_EXPLORER" />,
	prefix: 'GAChain',
	// 版权信息国际化
	companyRight: <FormattedMessage id="COMPANYRIGHT" />,
	CORS: [
		{ 'Access-Control-Allow-Origin': '*' }
	],
	// 节点名称国际化
	nodePosition: [
		<FormattedMessage id="COUN_3" />,
		<FormattedMessage id="COUN_4" />,
		<FormattedMessage id="COUN_2" />,
		<FormattedMessage id="COUN_2" />,
		<FormattedMessage id="COUN_2" />,
		<FormattedMessage id="COUN_5" />,
		<FormattedMessage id="COUN_1" />
	],
	// 节点icon
	nodeIcon: [
		china, china, china, china, china, japan, united
	],
	URL,
	// qGAC转GAC后面有多少个0
	MONEY_POWER: 12,
	// 交易类型
	transactionType : {
		0: 'TYPE_FIRSTBLOCK',
		276: 'TYPE_TRANSFER',
		293: 'TYPE_CREATEUSER',
		264: 'TYPE_TASK',
		279: 'LONK_FUND'
	}
};
import { FormattedMessage } from 'react-intl';
import api from './api';
import transactionType from './transactionType';

import china from 'public/china.svg';
import japan from 'public/japan.svg';
import united from 'public/united-states.svg';

module.exports = {
	Version: '1.3.1',
	api,
	transactionType,
	name: <FormattedMessage id="BLOCK_EXPLORER" />,
	prefix: 'GAChain',
	companyRight: <FormattedMessage id="COMPANYRIGHT" />,
	CORS: [
		{ 'Access-Control-Allow-Origin': '*' }
	],
	nodePosition: [
		<FormattedMessage id="COUN_3" />,
		<FormattedMessage id="COUN_4" />,
		<FormattedMessage id="COUN_2" />,
		<FormattedMessage id="COUN_2" />,
		<FormattedMessage id="COUN_2" />,
		<FormattedMessage id="COUN_5" />,
		<FormattedMessage id="COUN_1" />
	],
	nodeIcon: [
		china, china, china, china, china, japan, united
	],
	URL,
	MONEY_POWER: 12,
};
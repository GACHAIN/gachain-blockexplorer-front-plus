import { FormattedMessage } from 'react-intl';
import api from './api'

module.exports = {
    api,
    // Logo
    name: <FormattedMessage id="GAC_BLOCK_EXPLORER" />,
    prefix: 'GAChain',
    // 版权信息国际化
    companyRight: <FormattedMessage id="COMPANYRIGHT" />,
    CORS: [
        { "Access-Control-Allow-Origin": "*" }
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
    URL,
    // qGAC转GAC后面有多少个0
    MONEY_POWER: 12,
}
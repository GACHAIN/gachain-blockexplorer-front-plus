import { FormattedMessage } from 'react-intl';
// mock URL
// const URL = 'http://localhost:8000/mock/api'
// mock 远程
// const URL = 'http://192.168.1.124:8000/mock/api'
// 线上环境
const URL = 'http://192.168.1.165:8800/api' 
// 本地环境
// const URL = 'http://127.0.0.1:7000/api'

module.exports = {
    name: <FormattedMessage id="GAC_BLOCK_EXPLORER"/>,
    prefix: 'GAChain',
    footerText: <FormattedMessage id="FOOTERTEXT" />,
    CORS: [
        {"Access-Control-Allow-Origin": "*"}
    ],
    YQL:[],
    URL,
    api: {
        //top_numbers, middle_blocks, middle_transactions
        dashboard_top_numbers: `${URL}/dashboard_top_numbers`,
        dashboard_middle_blocks: `${URL}/dashboard_middle_blocks`,
        dashboard_middle_transactions: `${URL}/dashboard_middle_transactions`,
        dashboard_node_map: `${URL}/dashboard_node_map`,
        dashboard_history_map: `${URL}/dashboard_history_map`,
        dashboard_overview: `${URL}/dashboard_overview`,
        
        // Block
        getBlock: `${URL}/get_block_details`,
        getBlockList: `${URL}/get_block`,
        
        // Transaction
        getTransaction: `${URL}/get_transaction_details`,
        getTransactionList: `${URL}/get_transaction`,

        // Node
        getNodeList: `${URL}/get_node`,

        // Ecosystem
        getEcosystem: `${URL}/get_ecosystem`,

        // System_Param
        getSystemParam: `${URL}/get_system_param`,

        // Search
        commonSearch: `${URL}/common_search`,

        // Database
        getDatabase: `${URL}/database`
    },
}
// mock URL
// const URL = 'http://localhost:8000/mock/api'
// mock 远程
// const URL = 'http://192.168.1.124:8000/mock/api'
// 测试环境
// const URL = 'http://192.168.1.161:8800/api'
// 莫工主机
// const URL = 'http://192.168.1.168:8800/api'
// 本地环境
// const URL = 'http://127.0.0.1:8800/api'
// 华东服务器
// const URL = 'http://hd.gac.one:8800/api'
// 节点7服务器
// const URL = 'http://node7.gac.one:8800/api'
// IBM服务器
// const URL = 'http://ibm.sifu8.cn:8800/api'
// 东京服务器
const URL = 'http://node6.gac.one:8800/api'
export default {
    // 查询GAC
    dashboard_gac: `${URL}/dashboard_gac`,

    //top_numbers, middle_blocks, middle_transactions
    dashboard_top_numbers: `${URL}/dashboard_top_num`, //四个统计总数
    dashboard_middle_blocks: `${URL}/get_block`, //区块展示
    dashboard_middle_transactions: `${URL}/get_transaction`, //交易展示
    dashboard_node_map: `${URL}/dashboard_node_map`, //全球节点地图分布
    dashboard_history_map: `${URL}/dashboard_history_map`, //历史交易曲线图
    dashboard_overview: `${URL}/dashboard_overview`, // 政务链概览

    // Block
    getBlock: `${URL}/get_block_details`,
    getBlockList: `${URL}/get_block`,

    // Transaction
    getTransaction: `${URL}/get_transaction_details`,
    getTransactionByBlock: `${URL}/get_transaction_block`,
    getTransactionList: `${URL}/get_transaction`,

    // Node
    getNodeList: `${URL}/get_node`,

    // Ecosystem
    getEcosystem: `${URL}/get_ecosystem`,
    getEcosystemKeys: `${URL}/get_ecosystem_keys`,
    getEcosystemKey: `${URL}/get_ecosystem_key`,
    getEcosystemMemberTransactions: `${URL}/get_find_tranhistory`,

    // System_Param
    getSystemParam: `${URL}/get_system_param`,

    // Search
    commonSearch: `${URL}/common_search`,

    // Database
    getDatabase: `${URL}/database`,
}
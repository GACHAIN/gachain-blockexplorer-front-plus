import {
    query_top_numbers,
    query_middle_blocks,
    query_middle_transactions,
    query_node_map,
    query_history_map,
    query_gac,
} from './services'

export default {
    namespace: 'dashboard',

    state: {
        // 顶部四个数据
        top_numbers: [],
        // 全球节点分布地图
        node_map: [],
        // 交易历史折线图
        history_map: [],
        // 中左区块展示
        middle_blocks: [],
        // 中右交易展示
        middle_transactions: [],
        // 概览
        over_view: [],
    },

    subscriptions: {
        setup({ dispatch, history }) {
            history.listen((location) => {
                if (location.pathname === '/dashboard') {
                    let query_top_numbers_args = {
                        'head': { 'version': "1.0", 'msgtype': "request", 'interface': "query_top_numbers", 'remark': "" },
                        'params': { 'cmd': "001" }
                    };
                    let query_middle_blocks_args = {
                        'head': { version: "1.0", msgtype: "request", interface: "query_middle_blocks", remark: "" },
                        'params': { cmd: "001", "current_page": 1, "page_size": 5, }
                    };
                    let query_middle_transactions_args = {
                        'head': { version: "1.0", msgtype: "request", interface: "query_middle_transactions", remark: "" },
                        'params': { cmd: "001", "current_page": 1, "page_size": 5, }
                    };
                    let query_gac_args = {
                        'head': { version: "1.0", msgtype: "request", interface: "query_gac", remark: "" },
                        'params': { cmd: "001" }
                    }

                    dispatch({
                        type: 'query_top_numbers',
                        payload: query_top_numbers_args
                    });
                    dispatch({
                        type: 'query_middle_blocks',
                        payload: query_middle_blocks_args
                    });
                    dispatch({
                        type: 'query_middle_transactions',
                        payload: query_middle_transactions_args
                    });
                    dispatch({
                        type: 'query_node_map',
                        payload: query_node_map
                    });
                    dispatch({
                        type: 'query_gac',
                        payload: query_gac_args,
                    });

                    dispatch({
                        type: 'query_history_map',
                        payload: query_history_map
                    });

                    dispatch({
                        type: 'query_rate',
                        payload: {
                            base: 'usdt'
                        }
                    })
                }
            })
        }
    },

    effects: {
        * query_top_numbers({ payload = {} }, { call, put }) {
            const result = yield call(query_top_numbers, payload)
            if (result.success) {
                yield put({
                    type: 'save',
                    payload: {
                        top_numbers: result.body.data,
                        total: result.body.total,
                    },
                })
            }
        },

        * query_middle_blocks({ payload }, { call, put }) {
            const result = yield call(query_middle_blocks, payload)
            if (result.success) {
                yield put({
                    type: 'save',
                    payload: {
                        middle_blocks: result.body.data,
                        total: result.body.all_row_nums,
                    }
                })
            }
        },

        * query_middle_transactions({ payload }, { call, put }) {
            const result = yield call(query_middle_transactions, payload)
            if (result.success) {
                yield put({
                    type: 'save',
                    payload: {
                        middle_transactions: result.body.data,
                        total: result.body.all_row_nums,
                    }
                })
            }
        },

        * query_node_map({ payload }, { call, put }) {
            const result = yield call(query_node_map, payload)
            if (result.success) {
                yield put({
                    type: 'save',
                    payload: {
                        node_map: result.body.data,
                        total: result.body.all_row_nums,
                    }
                })
            }
        },

        * query_history_map({ payload }, { call, put }) {
            const result = yield call(query_history_map, payload)
            if (result.success) {
                yield put({
                    type: 'save',
                    payload: {
                        history_map: result.body.data,
                        total: result.body.all_row_nums
                    }
                })
            }
        },

        * query_gac({ payload }, { call, put }) {
            const result = yield call(query_gac, payload)
            if (result.success) {
                yield put({
                    type: 'save',
                    payload: {
                        gac: result.body.data,
                        total: result.body.all_row_nums
                    }
                })
            }
        },
    },

    reducers: {
        save(state, { payload }) {
            return {
                ...state,
                ...payload
            }
        }
    }
}
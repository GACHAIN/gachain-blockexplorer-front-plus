import modelExtend from 'dva-model-extend';
import { baseModel } from 'utils/model';
import * as transactionServices from './services/transactions';
const { query, query_transaction_by_block } = transactionServices

export default modelExtend(baseModel, {
    namespace: 'transaction',
    state: {
        dataList: [],
        total: "",
    },
    reducers: {

    },
    effects: {
        * query({ payload = {} }, { call, put }) {
            const data = yield call(query, payload)
            if (data.success) {
                yield put({
                    type: 'querySuccess',
                    payload: {
                        dataList: data.body.data,
                        total: data.body.total,
                    }
                })
            }
        },
        * queryTransactionByBlock({ payload = {} }, { call, put }) {
            const data = yield call(query_transaction_by_block, payload)
            if (data.success) {
                yield put({
                    type: 'querySuccess',
                    payload: {
                        dataList: data.body.data,
                        total: data.body.total,
                    }
                })
            }
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            history.listen((location) => {
                if (location.pathname === '/transaction') {
                    let args = {
                        head: {
                            "version": "1.0",
                            "msgtype": "request",
                            "interface": "get_transaction",
                            "remark": ""
                        },
                        params: {
                            "cmd": "001",
                            "current_page": 1,
                            "page_size": 10,
                        }
                    }
                    const payload = { ...args, ...location.query }
                    dispatch({
                        type: 'queryTransactionByBlock',
                        payload
                    })
                }
            })
        },
    },
})
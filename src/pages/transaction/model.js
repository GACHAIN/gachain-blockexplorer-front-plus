import modelExtend from 'dva-model-extend';
import { pageModel } from '../../utils/model';
import * as transactionServices from './services/transactions';

const { query } = transactionServices

export default modelExtend(pageModel, {
    namespace: 'transaction',
    reducers: {
        showModal(state, { payload }) {
            return { ...state, ...payload }
        },
        hideModal(state, { payload }) {
            return { ...state, ...payload }
        }
    },
    effects: {
        * query({ payload = {} }, { call, put }) {
            const data = yield call(query, payload)
            if (data.success) {
                yield put({
                    type: 'querySuccess',
                    payload: {
                        dataList: data.body.data,
                        total: data.body.all_row_nums,
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
                            "start_page": "1",
                            "page_size": "10",
                        }
                    }
                    const payload = { ...args, ...location.query }
                    dispatch({
                        type: 'query',
                        payload
                    })
                }
            })
        },
    },
})
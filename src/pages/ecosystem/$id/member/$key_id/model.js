import modelExtend from 'dva-model-extend';
import { baseModel } from 'utils/model';
import { query_member, query_member_transaction } from './services/member'
import pathToRegexp from 'path-to-regexp';

export default modelExtend(baseModel, {
    namespace: 'member',
    state: {
        member_info: [],
        incomeList: [],
        outcomeList: [],
    },
    subscriptions: {
        setup({ dispatch, history }) {
            history.listen((location) => {
                let { state } = location.query
                if (!state) {
                    state = 'income'
                }
                let match = pathToRegexp('/ecosystem/:id/member/:key_id').exec(location.pathname)
                if (match) {
                    let query_member_args = {
                        head: { "version": "1.0", "msgtype": "request", "interface": "get_ecosystem_key", "remark": "" },
                        params: { "cmd": "001", "page_size": 10, "current_page": 1, "wallet": match[2], "ecosystem": parseInt(match[1]), }
                    }
                    let query_member_transaction_args = {
                        head: { "version": "1.0", "msgtype": "request", "interface": "get_find_tranhistory", "remark": "" },
                        params: { "cmd": "001", "page_size": 10, "current_page": 1, "wallet": match[2], "ecosystem": parseInt(match[1]), "searchType": state, }
                    }
                    dispatch({
                        type: 'query_member',
                        payload: query_member_args
                    })
                    dispatch({
                        type: 'query_member_transaction',
                        payload: query_member_transaction_args
                    })
                }
            })
        },
    },
    effects: {
        * query_member({ payload = {} }, { call, put }) {
            const data = yield call(query_member, payload)
            if (data.success) {
                yield put({
                    type: 'save',
                    payload: {
                        member_info: data.body.data,
                    }

                })
            }
        },

        * query_member_transaction({ payload = {} }, { call, put }) {
            const data = yield call(query_member_transaction, payload)
            if (data.success) {
                if (data.body.ret_data_type === 'income') {
                    yield put({
                        type: 'save',
                        payload: {
                            incomeList: data.body.data,
                            total: data.body.total,
                            sum: data.body.sum
                        }
                    })
                } else {
                    yield put({
                        type: 'save',
                        payload: {
                            outcomeList: data.body.data,
                            total: data.body.total,
                            sum: data.body.sum
                        }
                    })
                }

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
})
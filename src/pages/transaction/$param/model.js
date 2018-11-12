import pathToRegexp from 'path-to-regexp';
import { query_detail } from '../services/transactions'
import modelExtend from 'dva-model-extend';
import { baseModel } from 'utils/model';

export default modelExtend(baseModel, {
    namespace: 's_transaction',
    state: {
        dataList: {},
    },
    subscriptions: {
        setup({ dispatch, history }) {
            history.listen((location) => {
                const match = pathToRegexp('/transaction/:param').exec(location.pathname)
                if (match) {
                    let payload = {
                        head: {
                            "version": "1.0",
                            "msgtype": "request",
                            "interface": "get_transaction_details",
                            "remark": ""
                        },

                        params: {
                            "cmd": "001",
                            "page_size": 10,
                            "hash": match[1],
                            "current_page": 1
                        }
                    }
                    dispatch({
                        type: 'query',
                        payload
                    })
                }
            })
        }
    },
    effects: {
        * query({ payload = {} }, { call, put }) {
            const data = yield call(query_detail, payload)
            if (data.success) {
                yield put({
                    type: 'save',
                    payload: {
                        dataList: data.body.data,
                    }
                })
            }
        }
    },
    reducers: {
        'save'(state, {payload}) {
            console.log({...state, ...payload})
            return {
                ...state,
                ...payload
            }
        }
    }
})
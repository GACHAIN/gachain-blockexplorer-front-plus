import modelExtend from 'dva-model-extend';
import { baseModel } from 'utils/model';
import { query_member } from './services/member'
import pathToRegexp from 'path-to-regexp';

export default modelExtend(baseModel, {
    namespace: 'member',
    state: {
        dataList: [],
        total: "",
    },
    subscriptions: {
        setup({ dispatch, history }) {
            history.listen((location) => {
                let match = pathToRegexp('/ecosystem/:id/member/:key_id').exec(location.pathname)
                if (match) {
                    let args = {
                        head: {
                            "version": "1.0",
                            "msgtype": "request",
                            "interface": "get_ecosystem_key",
                            "remark": ""
                        },
                        params: {
                            "cmd": "001",
                            "page_size": 10,
                            "current_page": 1,
                            "wallet": match[2],
                            "ecosystem": parseInt(match[1]),
                        }
                    }
                    dispatch({
                        type: 'query_member',
                        payload: args
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
                    type: 'querySuccess',
                    payload: {
                        dataList: data.body.data,
                        total: data.body.total,
                    }
                })
            }
        }
    }
})
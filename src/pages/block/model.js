import modelExtend from 'dva-model-extend';
import { pageModel } from '../../utils/model';
import * as blockServices from './services/blocks';

const { query } = blockServices

export default modelExtend(pageModel, {
    namespace: 'block',

    subscriptions: {
        setup({ dispatch, history }) {
            history.listen((location) => {
                if (location.pathname === '/block') {
                    let args = {
                        head: {
                            "version": "1.0",
                            "msgtype": "request",
                            "interface": "get_block",
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
        }
    },

    effects: {
        * query({ payload = {
        } }, { call, put }) {
            const data = yield call(query, payload)
            if (data.success) {
                yield put({
                    type: 'querySuccess',
                    payload: {
                        dataList: data.body.data,
                        total: data.body.all_row_nums,
                    },
                })
            };
        },
    },

    reducers: {
        showModal(state, { payload }) {
            return { ...state, ...payload }
        },
        hideModal(state) {
            return { ...state }
        }
    }
})
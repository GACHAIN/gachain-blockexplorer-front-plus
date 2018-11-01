import modelExtend from 'dva-model-extend';
import { pageModel } from '../../utils/model';
import { query } from './services/node';

export default modelExtend(pageModel, {
    namespace: 'node',

    subscriptions: {
        setup({ dispatch, history }) {
            history.listen((location)=>{
                if (location.pathname === '/node') {
                    let args = {
                        head: {
                            "version": "1.0",
                            "msgtype": "request",
                            "interface": "get_node",
                            "remark": ""
                        },
                        params: {
                            "cmd": "001",
                            "start_page": "1",
                            "page_size": "10",
                        }
                    }
                    dispatch({
                        type: 'query',
                        payload: args
                    })
                }
            })
        },
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
    }
})
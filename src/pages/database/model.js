import { query } from './services/database'

export default {
    namespace: 'database',
    subscriptions: {
        setup({dispatch, history}){
            history.listen((location)=>{
                if (location.pathname === '/database') {
                    let args = {
                        "head":{
                            "version":"1.0",
                            "msgtype":"request",
                            "interface":"database",
                            "remark":""
                        },
                        "params":{
                            "cmd":"001",
                            "page_size":"10",
                            "start_page":"1",
                        }
                    }
                    dispatch({
                        type: 'query',
                        payload: args
                    })
                }
            })
        }
    },
    effects: {
        * query({payload}, {call, put}) {
            const result = yield call(query, payload)
            console.log(result)
            if (result.success) {
                yield put({
                    type: 'save',
                    payload: {
                        dataList: result.body.data,
                        total: 100
                    }
                })
            }
        }
    },
    reducers: {
        save(state, { payload }) {
            return { 
                ...state, 
                ...payload,
            }
        }
    }
}
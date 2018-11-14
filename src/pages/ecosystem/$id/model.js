import modelExtend from 'dva-model-extend';
import { query_members } from '../services/ecosystem';
import { baseModel } from 'utils/model';

export default modelExtend(baseModel, {
    namespace: 'ecosystemID',
    state: {},
    subscriptions: {
        setup({ dispatch, history }) {

        },
    },

    effects: {
        * query_members({ payload = {} }, { call, put }) {
            const data = yield call(query_members, payload)
            if (data.success) {
                yield put({
                    type: 'querySuccess',
                    payload: {
                        dataList: data.body.data,
                        total: data.body.total,
                    },
                })
            }
        }
    }
})
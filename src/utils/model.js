import modelExtend from 'dva-model-extend';

export const model = {
    reducers: {
    },
}

export const pageModel = modelExtend(model, {
    reducers: {
        querySuccess(state, { payload }) {
            return {
                ...state,
                ...payload,
            }
        },
    },
})
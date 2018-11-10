import modelExtend from 'dva-model-extend';
import { walletIdToAddr, walletAddrToId, checkKeyidOrAddress } from 'utils';

export const baseModel = modelExtend({
    reducers: {
        /**
         * 请求成功
         * @param {*} state 
         * @param {*} param1 
         */
        'querySuccess'(state, { payload }) {
            return {
                ...state,
                ...payload,
            }
        },

        /**
         * keyID和地址互相转换
         * @param {*} state 
         */
        'toggle'(state, { payload }) {
            let { index } = payload
           
            state.dataList.map((item)=>{
                return item[index] = checkKeyidOrAddress(item[index]) === 1 ? walletAddrToId(item[index]) : walletIdToAddr(item[index])
            })
            return { ...state }
        }
    },
})
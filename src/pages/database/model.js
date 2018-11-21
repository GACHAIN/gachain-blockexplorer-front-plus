import { query } from './services/database'

export default {
	state: {
		dataList: [],
		total: [],
	},

	namespace: 'database',
	subscriptions: {
		setup({dispatch, history}){
			history.listen((location)=>{
				if (location.pathname === '/database') {
					let args = {
						'head':{
							'version':'1.0',
							'msgtype':'request',
							'interface':'database',
							'remark':''
						},
						'params':{
							'cmd':'001',
							'page_size':10,
							'current_page':1,
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
			if (result.success) {
				yield put({
					type: 'save',
					payload: {
						dataList: result.body.data,
						total: result.body.total
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
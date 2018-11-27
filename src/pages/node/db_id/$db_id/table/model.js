import modelExtend from "dva-model-extend";
import { baseModel } from "utils/model";
import { query } from "./services/database";
import pathToRegexp from "path-to-regexp";

export default modelExtend(baseModel, {
    namespace: "database",
    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(location => {
                let match = pathToRegexp("/node/db_id/:db_id/table").exec(
                    location.pathname
                );
                if (match) {
                    let db_id = parseInt(match[1], 10);
                    let descriptionArgs = {
                        head: {
                            version: "1.0",
                            msgtype: "request",
                            interface: "database",
                            remark: ""
                        },
                        params: {
                            cmd: "001",
                            page_size: 10,
                            current_page: 1,
                        }
                    };
                    let tablesArgs = {
                        head: {
                            version: "1.0",
                            msgtype: "request",
                            interface: "database",
                            remark: ""
                        },
                        params: {
                            cmd: "002",
                            page_size: 10,
                            current_page: 1,
                            NodePosition: db_id
                        }
                    };
                    dispatch({
                        type: "queryDescription",
                        payload: descriptionArgs
                    });
                    dispatch({
                        type: "queryTables",
                        payload: tablesArgs
                    });
                }

                let databaseMatch = pathToRegexp("/database").exec(
                    location.pathname
                );
                if (databaseMatch) {
                    let descriptionArgs = {
                        head: {
                            version: "1.0",
                            msgtype: "request",
                            interface: "database",
                            remark: ""
                        },
                        params: {
                            cmd: "001",
                            page_size: 10,
                            current_page: 1,
                        }
                    };
                    dispatch({
                        type: "queryDescription",
                        payload: descriptionArgs
                    });
                }
            });
        }
    },
    effects: {
        *queryTables({ payload }, { call, put }) {
            let { NodePosition } = payload.params;
            const result = yield call(query, payload);
            if (result.success) {
                yield put({
                    type: "querySuccess",
                    payload: {
                        dataList: result.body.data,
                        total: result.body.total,
                        NodePosition
                    }
                });
            }
        },
        *queryDescription({ payload }, { call, put }) {
            const result = yield call(query, payload);
            if (result.success) {
                yield put({
                    type: "querySuccess",
                    payload: {
                        description: result.body.data
                    }
                });
            }
        }
    }
});

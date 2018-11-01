import Mock from 'mockjs';

export default {
    'POST /mock/api/database': (res, req) => {
        let data = {
            "head": {
                "version": "1.0",
                "msgtype": "response",
                "interface": "database",
                "remark": ""
            },
            "body": {
                "cmd": "001",
                "page_size": "3",
                "start_page": "1",
                "all_page_nums": "15",
                "ret_data_type": "1",
                "data|5-10": [
                    {
                        "ID|+1": 1,
                        "Name": "GAchainDB",
                        "Engine": "postgresql",
                        "BackendVision|+1": 20180902
                    }
                ],
                "ret": "0",
                "retcode": "0",
                "retinfo": "成功"
            }
        }
        req.end(JSON.stringify(Mock.mock(data)))
    }
}
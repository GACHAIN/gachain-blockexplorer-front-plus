export default {
    'POST /mock/api/common_search': (res, req) => {
        //1. 接收参数
        let { search_str } = res.body.params
        //2. 返回数据
        
        if (Number(search_str) === 1) {
            let data = {
                "head": {
                    "version": "1.0",
                    "msgtype": "response",
                    "interface": "common_search",
                    "remark": ""
                },
                "body": {
                    "cmd": "001",
                    "page_size": "3",
                    "start_page": "1",
                    "all_page_nums": "15",
                    "search_str": "2",
                    "ret_data_type": "1",
                    "data": {
                        'BlockHeight': 1,
                        'Time': `@datetime`,
                        'Hash': 1000,
                        'NodePosition': 'nodeposition',
                        'EcosystemID': '1',
                        'KeyID': '2572022469495752238',
                        'TX': '1',
                        'transactions': [
                            {
                                'BlockHeight': 1,
                                'Ecosystem ID': 1,
                                'TxHash': '2572022469495752238',
                                'Sender KeyID': '2572022469495752238',
                                'Recipient KeyID': '2572022469495752238',
                                'CreateTime': '@datetime',
                                'Money': 123123123
                            },
                            {
                                'BlockHeight': 1,
                                'Ecosystem ID': 1,
                                'TxHash': '2572022469495752238',
                                'Sender KeyID': '2572022469495752238',
                                'Recipient KeyID': '2572022469495752238',
                                'CreateTime': '@datetime',
                                'Money': 123123123
                            },
                            {
                                'BlockHeight': 1,
                                'Ecosystem ID': 1,
                                'TxHash': '2572022469495752238',
                                'Sender KeyID': '2572022469495752238',
                                'Recipient KeyID': '2572022469495752238',
                                'CreateTime': '@datetime',
                                'Money': 123123123
                            },
                            {
                                'BlockHeight': 1,
                                'Ecosystem ID': 1,
                                'TxHash': '2572022469495752238',
                                'Sender KeyID': '2572022469495752238',
                                'Recipient KeyID': '2572022469495752238',
                                'CreateTime': '@datetime',
                                'Money': 123123123
                            },
                            {
                                'BlockHeight': 1,
                                'Ecosystem ID': 1,
                                'TxHash': '2572022469495752238',
                                'Sender KeyID': '2572022469495752238',
                                'Recipient KeyID': '2572022469495752238',
                                'CreateTime': '@datetime',
                                'Money': 123123123
                            },
                            {
                                'BlockHeight': 1,
                                'Ecosystem ID': 1,
                                'TxHash': '2572022469495752238',
                                'Sender KeyID': '2572022469495752238',
                                'Recipient KeyID': '2572022469495752238',
                                'CreateTime': '@datetime',
                                'Money': 123123123
                            },
                            {
                                'BlockHeight': 1,
                                'Ecosystem ID': 1,
                                'TxHash': '2572022469495752238',
                                'Sender KeyID': '2572022469495752238',
                                'Recipient KeyID': '2572022469495752238',
                                'CreateTime': '@datetime',
                                'Money': 123123123
                            },
                        ]
                    },
                    "ret": "0",
                    "retcode": "0",
                    "retinfo": "成功"
                }
            }
            req.end(JSON.stringify(data))
        } else if (Number(search_str) === 2) {
            let data = {
                head: {
                    "version": "1.0",
                    "msgtype": "response",
                    "interface": "common_search",
                    "remark": "",
                },
                body: {
                    "cmd": '001',
                    "page_size": '10',
                    "start_page": '1',
                    "all_page_nums": '3',
                    "ret_data_type": "2",
                    'data': {
                        "Hash": "46dcde11cee36325958ca92bf7b5d45b8c59dbe145607c9b3ad65e76cb4d2232",
                        "TransactionType": "128",
                        "Sender": "",
                        "Recver": "",
                        "Time": "2018-10-15 18:36:27",
                        "Total": "0.000000",
                        "ServiceFee": "0.000000",
                        "EcosystemID": "1",
                        "Amount": "12",
                        "Comment": "ete",
                        "BlockID": "3158",
                        "ID": "4936",
                        "TxHash": "46dcde11cee36325958ca92bf7b5d45b8c59dbe145607c9b3ad65e76cb4d2333",
                        "CreatedTime": "2018-10-15 18:33:27"
                    }
                }
            }
            req.end(JSON.stringify(data))
        }
    }
}
import Mock from 'mockjs';

const Randmon = Mock.Random;
var transactionArr = []

export default {
    'POST /mock/api/get_transaction': (res, req) => {
        const { start_page, page_size, cmd } = res.body.params
        let data = Mock.mock({
            head: {
                "version": "1.0",
                "msgtype": "response",
                "interface": "get_transaction",
                "remark": "",
            },
            body: {
                "cmd": cmd || '001',
                "page_size": page_size || '10',
                "start_page": start_page || '1',
                "all_page_nums": '3',
                'data|50-100': [{
                    "Hash|64": /[a-f0-9]/,
                    "TransactionType": "128",
                    "Sender|4": /[0-9]{5}/,
                    "Recver|4": /[0-9]{5}/,
                    "Time": "@time(\"yyyy-MM-dd HH:MM:SS\")",
                    "Total": "0.000000",
                    "ServiceFee": "0.000000",
                    "EcosystemID|1-100": 10,
                    "Amount|1-1000": 100,
                    "Comment": "ete",
                    "BlockID|5000-10000": 2000,
                    "ID|+1": 4936,
                    "TxHash": "46dcde11cee36325958ca92bf7b5d45b8c59dbe145607c9b3ad65e76cb4d2333",
                }]
            }
        })
        transactionArr = data
        req.end(JSON.stringify(data))
    },

    'POST /mock/api/get_transaction_details': (res, req) => {
        let { start_page, page_size, cmd } = res.body.params
        let data = Mock.mock({
            head: {
                "version": "1.0",
                "msgtype": "response",
                "interface": "get_transaction_details",
                "remark": "",
            },
            body: {
                "cmd": cmd || '001',
                "page_size": page_size || '10',
                "start_page": start_page || '1',
                "all_page_nums": '3',
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
                }
            }
        })
        req.end(JSON.stringify(data))
    }
}
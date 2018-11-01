import Mock from 'mockjs';

export default {
    'POST /mock/api/get_block': (res, req) => {
        const { start_page, page_size, cmd } = res.body.params
        let data = {
            head: {
                "version": "1.0",
                "msgtype": "response",
                "interface": "get_block",
                "remark": ""
            },
            body: {
                "cmd": cmd || '001',
                "page_size": page_size || '10',
                "start_page": start_page || '1',
                "all_page_nums": "3",
                // 属性 list 的值是一个数组，其中含有 500 到 1000 个元素
                'data|500-1000': [{
                    // 属性 id 是一个自增数，起始值为 1，每次增 1
                    'BlockHeight|+1': 1,
                    'Time': `@datetime`,
                    'Hash|+1': 1000,
                    'NodePosition': 'nodeposition',
                    'EcosystemID': '1',
                    'KeyID': '2572022469495752238',
                    'TX': '1'
                }],
                "ret": "0",
                "retcode": "0",
                "retinfo": "ok"
            }
        }
        req.end(JSON.stringify(Mock.mock(data)))
    },

    'POST /mock/api/get_block_details': (res, req) => {
        const { BlockHeight } = res.body.params.body
        let arr = []
        let distObj = {}
        for (let i = 0; i < 20; i++) {
            let data = {
                'BlockHeight': i + 1,
                'Time': `@datetime`,
                'Hash': i+1000,
                'NodePosition': 'nodeposition',
                'EcosystemID': '1',
                'KeyID': '2572022469495752238',
                'TX': '1',
                'transactions': [
                    {
                        'BlockHeight': i + 1,
                        'Ecosystem ID': 1,
                        'TxHash': '2572022469495752238',
                        'Sender KeyID': '2572022469495752238',
                        'Recipient KeyID': '2572022469495752238',
                        'CreateTime': '@datetime',
                        'Money': 123123123
                    },
                    {
                        'BlockHeight|+1': i + 1,
                        'Ecosystem ID': 1,
                        'TxHash': '2572022469495752238',
                        'Sender KeyID': '2572022469495752238',
                        'Recipient KeyID': '2572022469495752238',
                        'CreateTime': '@datetime',
                        'Money': 123123123
                    },
                    {
                        'BlockHeight|+1': i + 1,
                        'Ecosystem ID': 1,
                        'TxHash': '2572022469495752238',
                        'Sender KeyID': '2572022469495752238',
                        'Recipient KeyID': '2572022469495752238',
                        'CreateTime': '@datetime',
                        'Money': 123123123
                    },
                    {
                        'BlockHeight|+1': i + 1,
                        'Ecosystem ID': 1,
                        'TxHash': '2572022469495752238',
                        'Sender KeyID': '2572022469495752238',
                        'Recipient KeyID': '2572022469495752238',
                        'CreateTime': '@datetime',
                        'Money': 123123123
                    },
                    {
                        'BlockHeight|+1': i + 1,
                        'Ecosystem ID': 1,
                        'TxHash': '2572022469495752238',
                        'Sender KeyID': '2572022469495752238',
                        'Recipient KeyID': '2572022469495752238',
                        'CreateTime': '@datetime',
                        'Money': 123123123
                    },
                    {
                        'BlockHeight|+1': i + 1,
                        'Ecosystem ID': 1,
                        'TxHash': '2572022469495752238',
                        'Sender KeyID': '2572022469495752238',
                        'Recipient KeyID': '2572022469495752238',
                        'CreateTime': '@datetime',
                        'Money': 123123123
                    },
                    {
                        'BlockHeight|+1': i + 1,
                        'Ecosystem ID': 1,
                        'TxHash': '2572022469495752238',
                        'Sender KeyID': '2572022469495752238',
                        'Recipient KeyID': '2572022469495752238',
                        'CreateTime': '@datetime',
                        'Money': 123123123
                    },
                ]
            }
            arr.push(data)
        }

        arr.forEach((item) => {
            if (String(item.BlockHeight) === String(BlockHeight)) {
                distObj = item
            }
        })
        req.end(JSON.stringify(Mock.mock(distObj)))
    }
}
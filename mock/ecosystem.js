import Mock from 'mockjs';

export default {
    'POST /mock/api/get_ecosystem': (res, req) => {
        const { start_page, page_size, cmd } = res.body.params
        let data = Mock.mock({
            head: {
                "version": "1.0",
                "msgtype": "response",
                "interface": "get_ecosystem",
                "remark": "",
            },  
            body: {
                "cmd": cmd || '001',
                "page_size": page_size || '10',
                "start_page": start_page || '1',
                "all_page_nums": '3',
                'data|50-100': [{
                    'EcosystemID|+1': 1,
                    'EcosystemName': "heiheihaha",
                    'data|5-10': [
                        {
                            "ID|+1":1,
                            "Name":"founder_account",
                            "Value":"2572022469495752238",
                            "Conditions":"ContractConditions(\"MainCondition\")"
                        }
                    ]
                }]
            }
        })

        req.end(JSON.stringify(data))
    }
}
import Mock from 'mockjs';

export default {
    'POST /mock/api/get_node': (res, req) => {
        const { start_page, page_size, cmd } = res.body.params
        let data = Mock.mock({
            head: {
                "version": "1.0",
                "msgtype": "response",
                "interface": "get_node",
                "remark": "",
            },  
            body: {
                "cmd": cmd || '001',
                "page_size": page_size || '10',
                "start_page": start_page || '1',
                "all_page_nums": '3',
                'data|50-100': [{
                    "NodeID|+1":1,
                    "Url":"https://es.gac.one",
                    "VoteNums":"45",
                    "DailyReward":"560"
                }]
            }
        })

        req.end(JSON.stringify(data))
    }
}
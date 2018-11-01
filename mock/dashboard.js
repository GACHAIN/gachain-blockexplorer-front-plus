import Mock from 'mockjs';

export default {
    'POST /mock/api/dashboard_top_numbers': (res, req) => {
        let data = {
            'head': {
                'version': "1.0",
                'msgtype': "response",
                'interface': "dashboard_top_numbers",
                'remark': ""
            },
            'body': {
                'cmd': "001",
                'data|4': [
                    {
                        'title|+1': 123,
                        'number|+1000': 2000,
                    }
                ]
            }
        }
        req.end(JSON.stringify(Mock.mock(data)))
    },

    'POST /mock/api/dashboard_middle_blocks': (res, req) => {
        let data = {
            'head': {
                version: "1.0",
                msgtype: "response",
                interface: "dashboard_middle_blocks",
                remark: ""
            },
            'body': {
                'cmd': "001",
                'data|4': [
                    {
                        'title|+1': 123,
                        'number|+1000': 2000,
                    }
                ]
            }
        }
        req.end(JSON.stringify(Mock.mock(data)))
    },

    'POST /mock/api/dashboard_middle_transactions': (res, req) => {
        let data = {
            'head': {
                version: "1.0",
                msgtype: "response",
                interface: "dashboard_middle_transactions",
                remark: ""
            },
            'body': {
                'cmd': "001",
                'data|4': [
                    {
                        'title|+1': 123,
                        'number|+1000': 2000,
                    }
                ]
            }
        }
        req.end(JSON.stringify(Mock.mock(data)))
    },

    'POST /mock/api/dashboard_node_map': (res, req) => {
        let data = {
            'head': {
                version: "1.0",
                msgtype: "response",
                interface: "dashboard_node_map",
                remark: ""
            },
            'body': {
                'cmd': "001",
                'data': [
                    { 'name': '中国-北京', 'latitude': 39.9047253699, 'longitude': 116.4072154982 },
                    { 'name': '中国-北京', 'latitude': 38.9047253699, 'longitude': 111.4072154982 },
                    { 'name': '中国-北京', 'latitude': 38.9047253699, 'longitude': 116.4072154982 },
                    { 'name': '中国-杭州', 'latitude': 30.9047253699, 'longitude': 115.4072154982 },
                    { 'name': '中国-上海', 'latitude': 31, 'longitude': 121 },
                    { 'name': '美国-弗吉利亚北部', 'latitude': 77.9972259, 'longitude': 37.080428 },
                    { 'name': '日本-东京', 'latitude': 35.42, 'longitude': 139.46 },
                ]
            }
        }
        req.end(JSON.stringify(Mock.mock(data)))
    },

    'POST /mock/api/dashboard_history_map': (res, req) => {
        let data = {
            'head': {
                version: "1.0",
                msgtype: "response",
                interface: "dashboard_history_map",
                remark: ""
            },
            'body': {
                'cmd': "001",
                'data|20' : [
                    {
                      'name': '@date',
                      'uv|+1000': '@natural(1000, 10000)',
                      'amt': 2400,
                    }
                  ]
            }
        }
        req.end(JSON.stringify(Mock.mock(data)))
    }
}
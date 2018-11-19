import { Row, Tag } from 'antd';
import { connect } from 'dva';
import BlockDetail from './components/BlockDetail';
import moment from 'moment';
import { FormattedMessage } from 'react-intl';


const Block = ({ s_block_detail, loading }) => {
    let { dataList } = s_block_detail
    function handle_data_list(data) {
        let resObj = {}
        let Block_header = []
        let Block_info = []
        let Transactions_info = []
        for (let k in data) {
            let obj = {}
            if (k === 'header') {
                for (let hk in data[k]) {
                    let headObj = {}
                    headObj.key = hk
                    if (hk === "time") {
                        headObj.val = (
                            <Row>
                                {moment(data[k][hk] * 1000).format('YYYY-MM-DD HH:mm:ss')}
                            </Row>
                        )
                    } else {
                        headObj.val = data[k][hk]
                    }

                    // 过滤掉hash 因为再详情中已经有
                    if (headObj.key === 'hash') {
                        continue
                    }

                    // 对Key的处理
                    if (headObj.key === 'key_id') {
                        headObj.val = (
                            <a href={`#/ecosystem/1/member/${headObj.val}?state=income`}>
                                {headObj.val}
                            </a>
                        )
                    }
                    Block_header.push(headObj)
                }
            } else if (k === 'transactions') {
                Transactions_info = data[k]
            } else {
                // 排除字段
                let excludeField = ['ecosystem_id', 'node_position', 'key_id', 'time', 'gen_block', 'stop_count']
                obj.key = k
                if (excludeField.includes(obj.key)) {
                    continue
                }

                // 对时间值的处理
                if (obj.key === "time") {
                    obj.val = (
                        <Row>
                            {moment(data[k] * 1000).format('YYYY-MM-DD HH:mm:ss')}
                        </Row>
                    )
                } else {
                    obj.val = data[k]
                }

                Block_info.push(obj)
            }
        }
        resObj['Block_header'] = Block_header
        resObj['Block_info'] = Block_info,
            resObj['Transactions_info'] = Transactions_info
        return resObj
    }
    let listProps = {
        data_list: handle_data_list(dataList),
        loading: loading.effects["s_block_detail/query"],
    }

    return (
        <BlockDetail {...listProps} />
    )
}
export default connect(({ s_block_detail, loading }) => ({ s_block_detail, loading }))(Block)

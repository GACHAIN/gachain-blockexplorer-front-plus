import { connect } from 'dva';
import BlockDetail from './components/BlockDetail';
import moment from 'moment';

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
                        headObj.val = moment(data[k][hk]).format()
                    } else {
                        headObj.val = data[k][hk]
                    }
                    Block_header.push(headObj)
                }
            } else if (k === 'transactions') {
                Transactions_info = data[k]
            } else {
                obj.key = k
                if (k === "time") {
                    obj.val = moment(data[k]).format()
                }else {
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
export default connect( ({s_block_detail, loading}) => ({s_block_detail, loading}))(Block)

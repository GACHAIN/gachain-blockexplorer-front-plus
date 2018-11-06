import { connect } from 'dva';
import BlockDetail from './components/BlockDetail';

const Block = ({ s_block_detail, loading }) => {
    let { dataList } = s_block_detail
    function handle_data_list(data) {
        let resObj = {}
        let Block_info = []
        let Transactions_info = []
        for (let k in data) {
            let obj = {}
            if (k === 'transactions') {
                Transactions_info = data[k]
                console.log(Transactions_info)
            } else {
                obj.key = k
                obj.val = data[k]
                Block_info.push(obj)
            }
        }
        
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

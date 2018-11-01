import { connect } from 'dva';
import BlockDetail from './components/BlockDetail';

const Block = ({ s_block_detail }) => {
    let { dataList } = s_block_detail
    function handle_data_list(data) {
        let resObj = {}
        let Block_info = []
        let Transactions_info = []
        for (let k in data) {
            let obj = {}
            if (k === 'Transactions') {
                Transactions_info = data[k]
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
        data_list: handle_data_list(dataList)
    }

    return (
        <BlockDetail {...listProps} />
    )
}
export default connect(s_block_detail => s_block_detail)(Block)

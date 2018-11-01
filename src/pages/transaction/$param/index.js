import DetailList from './components/DetailList';
import {connect} from 'dva';

const TransactionHash = ({s_transaction}) => {

    let { dataList } = s_transaction
    function handle_s_transaction(data) {
        let objArr = []
        for (let key in data) {
            let obj = {}
            obj.key = key
            obj.val = data[key]
            objArr.push(obj)
        }
        return objArr
    }

    let listProps = {
        listData: handle_s_transaction(dataList),
        pagination: false,
    }

    
    return (
        <DetailList {...listProps}/>
        
    )
}

export default connect(s_transaction=>s_transaction)(TransactionHash)
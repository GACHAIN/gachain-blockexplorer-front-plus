import TransactionList from './components/List';
import { connect } from 'dva';

const Transaction = ({transaction, dispatch, loading}) => {
  const { dataList, total } = transaction
  function toggle(index) {
    dispatch({
      type: 'transaction/toggle',
      payload: {
        index
      }
    });
  }

  let listProps = {
    dataSource: dataList,
    loading: loading.effects['transaction/query'],
    onToggle: toggle,
    scroll: {x: 900},
    pagination: {
      showQuickJumper: true,
      total: Number(total),
      onChange(p, n) {
        let args = {
          head: {
            "version": "1.0",
            "msgtype": "request",
            "interface": "get_transaction",
            "remark": ""
          },
          params: {
            "cmd": "001",
            "current_page": p || 1,
            "page_size": n || 10,
          }
        }
        dispatch({
          type: 'transaction/query',
          payload: args
        })
      }
    }
  }
  
  return (
    <div>
      <TransactionList {...listProps} />
    </div>
  )
}

export default connect(transaction=>transaction)(Transaction)



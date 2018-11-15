import TransactionList from './components/List';
import { connect } from 'dva';

const Transaction = ({ transaction, dispatch, loading, location }) => {
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
    loading: loading.effects['transaction/queryTransactionByBlock'],
    onToggle: toggle,
    location,
    dispatch,
    scroll: { x: 900 },
    pagination: {
      showQuickJumper: true,
      total: Number(total),
      onChange(p, n) {
        let args = {
          head: {
            "version": "1.0",
            "msgtype": "request",
            "interface": "get_transaction_block",
            "remark": ""
          },
          params: {
            "cmd": "001",
            "current_page": p || 1,
            "page_size": n || 10,
          }
        }
        dispatch({
          type: 'transaction/queryTransactionByBlock',
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

export default connect(transaction => transaction)(Transaction)



import TransactionList from './components/List';
import { connect } from 'dva';
import styles from './index.css';

const Transaction = ({transaction, dispatch, loading}) => {
  const { dataList, total } = transaction

  let listProps = {
    dataSource: dataList,
    loading: loading.effects['transaction/query'],
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
            "start_page": p || "1",
            "page_size": n || "10",
          }
        }
        dispatch({
          type: 'transaction/query',
          payload: args
        })
      }
    },
    rowClassName: (record, index) => {
      return index % 2 === 0 ? styles.odd : styles.even
    }
  }
  
  return (
    <div>
      <TransactionList {...listProps} />
    </div>
  )
}

export default connect(transaction=>transaction)(Transaction)



import { connect } from 'dva';
import NodeList from './components/List';
import styles from './index.css';

const Nodelist = ({ dispatch, node, loading }) => {
  const { dataList, total } = node
  let listProps = {
    dataSource: dataList,
    loading: loading.effects['node/query'],
    pagination: {
      total: Number(total),
      showQuickJumper: true,
      onChange(p, n) {
        let args = {
          head: {
            "version": "1.0",
            "msgtype": "request",
            "interface": "get_node",
            "remark": ""
          },
          params: {
            "cmd": "001",
            "start_page": p || "1",
            "page_size": n || "10",
          }
        }
        dispatch({
          type: 'node/query',
          payload: args
        })
      }
    }
  }

  return (
    <div>
      <NodeList {...listProps} />
    </div>
  );
};

export default connect(({ node, loading, dispatch }) => ({ node, loading, dispatch }))(Nodelist);
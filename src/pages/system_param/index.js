import { connect } from 'dva';
import SystemParamList from './components/List';

const List = ({ dispatch, system_param, loading }) => {
  let { dataList, total } = system_param
  let listProps = {
    dataSource: dataList,
    loading: loading.effects['system_param/query'],
    pagination: {
      total: Number(total),
      onChange(p, n) {
        let args = {
          head: {
            "version": "1.0",
            "msgtype": "request",
            "interface": "get_system_param",
            "remark": ""
          },
          params: {
            "cmd": "001",
            "start_page": p || "1",
            "page_size": n || "10",
          }
        }
        dispatch({
          type: 'system_param/query',
          payload: args
        })
      }
    }
  }

  return (
    <div>
      <SystemParamList {...listProps} />
    </div>
  );
};

export default connect(({ dispatch, system_param, loading }) => ({ dispatch, system_param, loading }))(List);
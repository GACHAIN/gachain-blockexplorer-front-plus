import { connect } from 'dva';
import PropTypes from 'prop-types';
import BlockList from './components/List';
import styles from './index.css';

const Block = ({ location, block, dispatch, loading }) => {
  const { dataList, total } = block
  const listProps = {
    dataSource: dataList,
    location,
    loading: loading.effects['block/query'],
    rowClassName: (record, index) => {
      return index % 2 === 0 ? styles.odd : styles.even
    },
    pagination: {
      showQuickJumper: true,
      total: Number(total),
      onChange(p, n) {
        let args = {
          head: {
            "version": "1.0",
            "msgtype": "request",
            "interface": "get_block",
            "remark": ""
          },
          params: {
            "cmd": "001",
            "start_page": p || "1",
            "page_size": n || "10",
          }
        }
        dispatch({
          type: 'block/query',
          payload: args
        })
      }
    }
  }
  return (
    <div>
      <BlockList {...listProps} />
    </div>
  )
}

Block.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(
  ({ block, loading }) => ({ block, loading })
)(Block)
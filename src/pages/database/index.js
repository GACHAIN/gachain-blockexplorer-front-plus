import List from './components/List';
import { connect } from 'dva';

const Database = ({ database, dispatch, loading }) => {
    let { dataList, total } = database
    let listProps = {
        loading: loading.effects['database/query'],
        dataSource: dataList,
        rowClassName: (record, index) => {
            return index % 2 === 0 ? 'odd' : 'even'
        }
    }
    return (
        <List {...listProps} />
    )
}

export default connect( ({database, loading}) => ({database, loading}) )(Database)
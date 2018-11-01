import { connect } from 'dva';
import EcosystemList from './components/List';

const List = ({ dispatch, ecosystem, loading }) => {
  const { dataList } = ecosystem

  let listProps = {
    loading: loading.effects['ecosystem/query'],
    dataSource: dataList,
    rowClassName: (record, index) => {
      return index % 2 === 0 ? 'odd' : 'even'
    }
  }

  return (
    <div>
      <EcosystemList {...listProps}/>
    </div>
  );
};

export default connect(({ ecosystem, loading }) => ({ ecosystem, loading }))(List);
import { connect } from 'dva';
import List from './components/List';

const EcosystemParams = (props) => {
    return (
        <List dataSource={props.location.state.ecosys_par}/>
    )
}

export default connect(ecosystem_params=>ecosystem_params)(EcosystemParams)
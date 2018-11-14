import { connect } from 'dva';
import List from './components/List';
import router from 'umi/router';

const EcosystemParams = (props) => {
    if(props.location.state === undefined) {
        router.replace("/ecosystem")
        return false
    }
    return (
        <List dataSource={props.location.state.ecosys_par}/>
    )
}

export default connect(ecosystem_params=>ecosystem_params)(EcosystemParams)
import { Tabs } from 'antd';
import { connect } from 'dva';
import ParamsList from './components/ParamsList';
import MembersList from './components/MembersList'
import pathToRegexp from 'path-to-regexp';
import router from 'umi/router'
import { FormattedMessage } from 'react-intl';

const TabPane = Tabs.TabPane;
const EcosystemID = (props) => {
    let { dispatch, loading, ecosystemID, location } = props
    let { dataList, total } = ecosystemID
    function callback(key) {
        if (key === 'Members') {
            let payload = {
                head: {
                    "version": "1.0",
                    "msgtype": "request",
                    "interface": "get_ecosystem_keys",
                    "remark": ""
                },
                params: {
                    "cmd": "001",
                    "page_size": 10,
                    "current_page": 1,
                    "ecosystem": 1
                }
            }
            dispatch({
                type: 'ecosystemID/query_members',
                payload
            })
        }
    }
    let data = props.location.state
    const paramsProps = {
        dataSource: data ? data.ecosys_par : []
    }
    const membersProps = {
        loading: loading.effects['ecosystemID/get_ecosystem_keys'],
        dataSource: dataList,
        pagination: {
            showQuickJumper: true,
            total: Number(total),
            onChange(p, n) {
                let args = {
                  head: {
                    "version": "1.0",
                    "msgtype": "request",
                    "interface": "get_ecosystem_keys",
                    "remark": ""
                  },
                  params: {
                    "cmd": "001",
                    "ecosystem": 1,
                    "current_page": p || 1,
                    "page_size": n || 10,
                  }
                }
                dispatch({
                  type: 'ecosystemID/query_members',
                  payload: args
                })
              }
        }
    }
    let s = pathToRegexp("/ecosystem/:id").exec(location.pathname)
    console.log(location)
    return (
        <Tabs defaultActiveKey="Params" onChange={callback}>
            <TabPane tab={<FormattedMessage id="ECOSYSTEMPRAMETER"/>} key="Params">
                <ParamsList {...paramsProps} />
            </TabPane>
            <TabPane tab={<FormattedMessage id="ECOSYSTEMPMEMBERS"/>} key="Members">
                <MembersList {...membersProps}/>
            </TabPane>
        </Tabs>
    )
}

export default connect(({ dispatch, loading, ecosystemID }) => ({ dispatch, loading, ecosystemID }))(EcosystemID)
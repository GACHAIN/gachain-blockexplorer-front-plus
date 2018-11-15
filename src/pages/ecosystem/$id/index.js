import { Tabs } from 'antd';
import { connect } from 'dva';
import ParamsList from './components/ParamsList';
import MembersList from './components/MembersList'
import { stringify } from 'qs'
import router from 'umi/router'
import { FormattedMessage } from 'react-intl';

const TabPane = Tabs.TabPane;
const EcosystemID = (props) => {
    let { dispatch, loading, ecosystemID, location } = props
    let { dataList, total } = ecosystemID
    // 从浏览器缓存中读取生态参数
    let data = localStorage.getItem('ecosysteList')
    let dataRes = JSON.parse(data).map((item) => {
        if (item.id === parseInt(props.match.params.id)) {
            return item.app_params
        }
        return []
    })

    /**点击Tab页签调用 */
    const handleTabClick = key => {
        let { pathname } = location
        router.push({
            pathname,
            search: stringify({
                state: key,
            }),
        })
    }

    /**点击KeyID地址切换 */
    const toggle = (index) => {
        console.log(index)
        dispatch({
            type: 'ecosystemID/toggle',
            payload: {
                index
            }
        });
    }

    const paramsProps = {
        dataSource: dataRes[0],
        loading: loading.global,
    }
    const membersProps = {
        loading: loading.global,
        dataSource: dataList,
        onToggle: toggle,
        pagination: {
            showQuickJumper: true,
            total: parseInt(total),
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

    return (
        <Tabs activeKey={location.query.state} onTabClick={handleTabClick}>
            <TabPane tab={<FormattedMessage id="ECOSYSTEMPRAMETER" />} key="params">
                <ParamsList {...paramsProps} />
            </TabPane>
            <TabPane tab={<FormattedMessage id="ECOSYSTEMPMEMBERS" />} key="members">
                <MembersList {...membersProps} />
            </TabPane>
        </Tabs>
    )
}

export default connect(({ dispatch, loading, ecosystemID }) => ({ dispatch, loading, ecosystemID }))(EcosystemID)
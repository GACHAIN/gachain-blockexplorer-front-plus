// import withRouter from 'umi/withRouter';
// import { TransitionGroup, CSSTransition } from "react-transition-group";
import * as React from 'react';
import NProgress from 'nprogress'
import { Layout, Icon, Select, Input, Row, Col, message } from 'antd';

import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { setLocale, getLocale } from 'umi/locale';
import Redirect from 'umi/redirect';
import router from 'umi/router';

import Menus from 'components/Menus/index'
import { request, config } from 'utils';
import './index.less';

const { Sider, Content } = Layout;
const Option = Select.Option;
const Search = Input.Search;
const { api } = config;

const { commonSearch } = api;
const offsetWidth = document.querySelector('body').offsetWidth
let prev_pathname = ""
class BasicLayout extends React.Component {
  state = {
    collapsed: offsetWidth < 720,
    searchWidth: '60%',
    searchVal: '',
  }

  static propTypes = {
    intl: intlShape.isRequired,
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  handleChange = (v) => {
    setLocale(v);
  }

  getSearchPlacehold = () => {
    let langObj = {};
    let { intl: { formatMessage } } = this.props;
    langObj['S_T'] = formatMessage({ id: 'S_T' });
    langObj['S'] = formatMessage({ id: 'S' });
    return langObj
  }

  searchVal = (value) => {
    if (value.length === 0) {
      let { intl: { formatMessage } } = this.props;
      message.warning(formatMessage({ id: 'S_VALUENULL' }))
      return false
    } else {
      let args = {
        head: {
          "version": "1.0",
          "msgtype": "request",
          "interface": "get_common_search",
          "remark": ""
        },
        params: {
          "cmd": "001",
        }
      }
      let v = ""
      if (value.length === 64) {
        args.params['hash'] = value
        v = value
      } else {
        args.params['block_id'] = Number(value)
        v = Number(value)
      }

      let options = { url: commonSearch, method: 'POST', data: args }

      request(options)
        .then((resolve) => {
          if (resolve.success) {
            let { ret_data_type, retcode, data } = resolve.body
            if (retcode === 404) {
              let { intl: { formatMessage } } = this.props;
              message.error(formatMessage({id:"S_NotFound"}))
              return false;
            }
            if (parseInt(ret_data_type) === 1) {
              router.replace(`/block/${data.header.block_id}`);
            } else if (parseInt(ret_data_type) === 2) {
              router.replace(`/transaction/${v}`)
            }
          }
        })
        .catch((reject) => {
          message.error(reject, "line 82")
        })
    }

  }

  getPage = () => {
    if (window.location.pathname === '/') {
      return <Redirect to="/dashboard" />
    } else {
      return this.props.children
    }
  }

  render() {
    if (location.pathname !== prev_pathname) {
      NProgress.start(0.8)
      NProgress.set(0.8)
      NProgress.inc(0.8)
      NProgress.done()
    }
    prev_pathname = location.pathname
    return (
      <Layout>
        <Sider
          id="nav_"
          trigger={null}
          collapsible
          collapsedWidth={0}
          collapsed={this.state.collapsed}
          style={{ backgroundColor: '#004a7c', height: '100vh', position: 'fixed', left: 0, boxShadow: 'rgb(153, 153, 153) 1px 5px 5px', overflow: 'hidden', transition: 'all 0.3s' }}
          breakpoint={'xs'}
          onBreakpoint={(broken) => {
            this.setState({ collapsed: broken })
          }}
        >
          <div id="logo">
            <FormattedMessage id="BLOCK_EXPLORER" />
          </div>
          <div id="menu">
            <Menus />
          </div>
        </Sider>
        <Layout id="content" style={{ transition: 'all 0.3s', marginLeft: this.state.collapsed ? '0': '200px'}}>
          <div className="nav-header">
            <Row type="flex" justify="space-between" align="middle">
              <Col>
                <Icon
                  className="trigger"
                  type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                  onClick={this.toggle}
                />
              </Col>
              <Col style={{ width: this.state.searchWidth, transition: 'all 0.3s' }}>
                <Search
                  placeholder={this.getSearchPlacehold().S_T}
                  enterButton={this.getSearchPlacehold().S}
                  size="large"
                  onSearch={value => this.searchVal(value)}
                  style={{ height: '40px', fontSize: '12px' }}
                  width={this.state.searchWidth}
                />
              </Col>
              <Col>
                <Select defaultValue={getLocale()} onChange={this.handleChange} className="selectLang">
                  <Option value="zh-CN">中文</Option>
                  <Option value="en-US">English</Option>
                  <Option value="ja-JP">日本语</Option>
                </Select>
              </Col>
            </Row>
          </div>
          {/* <Bread menuData={menuData} /> */}
          <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            {this.getPage()}
          </Content>
        </Layout>
      </Layout >
    )
  }
}

export default injectIntl(BasicLayout)
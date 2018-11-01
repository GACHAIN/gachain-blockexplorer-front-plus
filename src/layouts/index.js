// import withRouter from 'umi/withRouter';
// import { TransitionGroup, CSSTransition } from "react-transition-group";
import * as React from 'react';
import NProgress from 'nprogress'
import { Layout, Icon, Select, Input, Row, Col, message } from 'antd';

import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { setLocale, getLocale } from 'umi/locale';
import Redirect from 'umi/redirect';
import router from 'umi/router';

import Menu from '../components/Menus/index'
import menuData from '../components/Menus/menu';
import Bread from '../components/Bread';

import { request, config } from '../utils';
import style from './index.css';

const { Sider, Content } = Layout;
const Option = Select.Option;
const Search = Input.Search;
const { api } = config;
const { commonSearch } = api;


class BasicLayout extends React.Component {
  
  state = {
    collapsed: document.querySelector('body').offsetWidth < 700,
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
    let args = {
      head: {
        "version": "1.0",
        "msgtype": "request",
        "interface": "get_common_search",
        "remark": ""
      },
      params: {
        "cmd": "001",
        "start_page": "1",
        "page_size": "10",
        'search_str': value
      }
    }
    let options = { url: commonSearch, method: 'POST', data: args }
    
    request(options)
    .then((resolve)=>{
      if (resolve.success) {
        let { ret_data_type } = resolve.body
        if (parseInt(ret_data_type) === 1) {
          router.replace(`/block/${resolve.body.data.BlockHeight}`);
        } else
        if (parseInt(ret_data_type) === 2) {
          router.replace(`/transaction/${resolve.body.data.Hash}`)
        }
      }
    })
    .catch((reject)=>{
      message.error(reject, "line 82")
    })
  }

  getPage = () => {
    if (window.location.pathname === '/') {
      return <Redirect to="/block" />
    } else {
      return this.props.children
    }
  }

  render() {
    NProgress.start()
    NProgress.set(0.4)
    NProgress.inc()
    NProgress.done()
    return (
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsedWidth="0"
          collapsed={this.state.collapsed}
          style={{ backgroundColor: '#004a7c', height: '100vh', position: 'fixed', left: 0, boxShadow: 'rgb(153, 153, 153) 1px 5px 5px', overflow: 'initial', transition: 'all 0.5s' }}
        >
          <div className={style.logo}>
            <FormattedMessage id="BLOCK_EXPLORER" />
          </div>
          <Menu />
        </Sider>
        <Layout style={{transition: 'all 0.5s', marginLeft: this.state.collapsed ? '0px': '200px'}}>
          <div style={{ background: '#fff', padding: '10px 0' }}>
            <Row type="flex" justify="space-around" align="middle">
              <Col xs={4} md={2}>
                <Icon
                  className={style.trigger}
                  type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                  onClick={this.toggle}
                />
              </Col>
              <Col xs={15} md={15}>
                <Search
                  placeholder={this.getSearchPlacehold().S_T}
                  enterButton={this.getSearchPlacehold().S}
                  size="large"
                  onSearch={ value => this.searchVal(value) }
                  style={{ height: '40px', fontSize: '12px' }}
                />
              </Col>
              <Col xs={5} md={2}>
                <Select defaultValue={getLocale()} onChange={this.handleChange} className="selectLang">
                  <Option value="zh-CN">中文</Option>
                  <Option value="en-US">English</Option>
                  <Option value="ja-JP">日本语</Option>
                </Select>
              </Col>
            </Row>
          </div>
          <Bread menuData={menuData} />
          <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
            {this.getPage()}
          </Content>
        </Layout>
      </Layout>
    )
  }
}

export default injectIntl(BasicLayout)
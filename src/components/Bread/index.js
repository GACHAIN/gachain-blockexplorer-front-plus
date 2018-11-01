import { Breadcrumb, Icon } from 'antd';
import { FormattedMessage } from 'react-intl';
import style from './index.css';

export default (props) => {
    const getBread = props.menuData.map((item)=>{
        if (item.to === window.location.pathname) {
            return (
                <Breadcrumb.Item key={item.to}>
                    <Icon type={item.icon} />
                    <span><FormattedMessage id={item.FormattedMessage} /></span>
                </Breadcrumb.Item>
            )
        }
    })
    if (window.location.pathname !== '/dashboard') {
      return (
        <Breadcrumb className={style.bread}>
          <Breadcrumb.Item href="/dashboard" key="/dashboard">
            <Icon type="dashboard" />
            <span><FormattedMessage id='DASHBOARD' /></span>
          </Breadcrumb.Item>
          { getBread }
        </Breadcrumb>
      )
    } else {
      return (
        <Breadcrumb className={style.bread}>
        <Breadcrumb.Item key="dashboard">
          <Icon type="dashboard" />
          <span><FormattedMessage id='DASHBOARD' /></span>
        </Breadcrumb.Item>
        </Breadcrumb>
      )
    }
  }
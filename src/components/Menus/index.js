import Link from 'umi/link';
import { Menu, Icon } from 'antd';
import menuData from './menu';
import { FormattedMessage } from 'react-intl';

const menuRes = menuData.map((item) => {
    return (
    <Menu.Item key={item.FormattedMessage}>
        <Link to={item.to}>
            <Icon type={item.icon} style={{ fontSize: '16px' }} /><span><FormattedMessage id={item.FormattedMessage} /></span>
        </Link>
    </Menu.Item>)
})

export default () => {
    // 路由选中
    var selectKey = ""
    menuData.forEach(e => {
      if (e.to == window.location.pathname) {
        selectKey = e.FormattedMessage
      }
    });

    return (
        <Menu theme="dark" mode="inline" defaultSelectedKeys={[selectKey]} style={{backgroundColor: '#004a7c', color: '#fff'}}>
            {menuRes}
        </Menu>
    )
} 

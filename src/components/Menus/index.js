import Link from 'umi/link';
import { Menu, Icon, Col, Input } from 'antd';
import menuData from './menu';
import { FormattedMessage } from 'react-intl';

const Select = Input.Select
const menuRes = menuData.map((item) => {
    return (
        <Menu.Item key={item.FormattedMessage}>
            <Link to={item.to}>
                <Icon type={item.icon} /><span><FormattedMessage id={item.FormattedMessage} /></span>
            </Link>
        </Menu.Item>)
})

export default (props) => {
    var selectKey = ""
    menuData.forEach(e => {
        let path = window.location.hash.substr(1)
        let pathArr = path.split("/")
        if (pathArr.length > 2) {
            path = `/${pathArr[1]}`
        }
        if (e.to == path) {
            selectKey = e
        }
    });
    return (
        <Menu id="menu" theme="dark" mode="horizontal" defaultSelectedKeys={[selectKey.FormattedMessage]}>
            {menuRes}
        </Menu>
    )
} 

import Link from 'umi/link';
import { Menu, Icon } from 'antd';
import menuData from './menu';
import { FormattedMessage } from 'react-intl';

const SubMenu = Menu.SubMenu;

const renderMenu = (menuData) => {
	return menuData.map((item) => {
		if(item.children){
			return (
				<SubMenu key={item.FormattedMessage} title={<span><Icon type={item.icon} /><FormattedMessage id={item.FormattedMessage}/></span>} >
					{renderMenu(item.children)}
				</SubMenu>
			);
		}else{
			return (
				<Menu.Item key={item.FormattedMessage}>
					<Link to={item.to} replace>
						<Icon type={item.icon} /><span><FormattedMessage id={item.FormattedMessage} /></span>
					</Link>
				</Menu.Item>
			);
		}
	});
};


export default () => {
	let selectKey = '';
	menuData.forEach(e => {
		let path = window.location.hash.substr(1);
		let pathArr = path.split('/');
		if (pathArr.length > 2) {
			path = `/${pathArr[1]}`;
		}
		if (e.to === path) {
			selectKey = e;
		}
	});
	return (
		<Menu id="menu" theme="dark" mode="horizontal" defaultSelectedKeys={[selectKey.FormattedMessage]}>
			{renderMenu(menuData)}
		</Menu>
	);
}; 

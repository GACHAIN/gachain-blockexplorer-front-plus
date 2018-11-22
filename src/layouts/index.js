import React from 'react';
import { Row } from 'antd';

import Header from './components/Header.js';
import Content from './components/Content';
import Footer from './components/Footer';

import '../styles/index.less';

class BasicLayout extends React.Component {
	render() {
		let headerProps = {
            
		};

		let contentProps = {
			props: this.props
		};

		let footerProps = {

		};
		return (
			<Row gutter={24} justify="space-around">
				<Header { ...headerProps }/>
				<Content { ...contentProps }/>
				<Footer { ...footerProps }/>
			</Row>
		);
	}
}

export default BasicLayout;
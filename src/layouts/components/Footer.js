import React from 'react';
import { Icon } from 'antd';
import { companyRight } from 'config';

import bbs from 'public/bbs.svg';
import gac_black from 'public/gac_black.svg';
import gachain_black from 'public/gachain_black.svg';

const Footer = props => {
	return (
		<div id="footer">
			<span>{companyRight}</span>

			<div id="footer_icon">
				<a
					href="https://gachain.org"
					style={{ color: '#000000' }}
				>
					<Icon component={gachain_black} />
				</a>
				<a
					href="https://github.com/GACHAIN"
					style={{ color: '#000000' }}
				>
					<Icon type="github" />
				</a>
				<a
					href="https://www.facebook.com/Shenzhen-Gachain-Technology-Co-Ltd-1956808081240927"
					style={{ color: '#000000' }}
				>
					<Icon type="facebook" />
				</a>
				<a
					href="https://twitter.com/gachain_org"
					style={{ color: '#000000' }}
				>
					<Icon type="twitter" />
				</a>
				<a
					href="http://weibo.com/gachainorg"
					style={{ color: '#000000' }}
				>
					<Icon type="weibo" />
				</a>
				<a
					href="https://bbs.gac.one/"
					style={{ color: '#000000' }}
				>
					<Icon component={bbs} />
				</a>
				<a
					href="http://www.gac.one/"
					style={{ color: '#000000' }}
				>
					<Icon component={gac_black} />
				</a>
			</div>
		</div>
	);
};

export default Footer;

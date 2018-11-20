import React from 'react';
import { Icon } from 'antd';
import { companyRight } from 'config';

const Footer = (props) => {
    return (
        <div id="footer">
           <span>{ companyRight }</span>
            <a href="https://github.com/GACHAIN" target="_blank" style={{ color: "#000000" }}>
              <Icon type="github" style={{ paddingLeft: '5px' }} />
            </a>
        </div>
    )
}

export default Footer
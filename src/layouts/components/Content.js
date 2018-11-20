import React from 'react';

const Content = ({ props }) => {
    return (
        <div id="content">
            {props.children}
        </div>
    )
}

export default Content
import '@babel/polyfill';
import { message } from 'antd';
import pathToRegexp from 'path-to-regexp';
import router from 'umi/router';


/**兼容钱袋链接跳转 */
let s = pathToRegexp("/gachain/database/1/transaction/:hash").exec(location.pathname)
let hash
if (s !== null) {
    hash = s[1]
    router.replace(`/transaction/${hash}`)
}

export const dva = {
    config: {
        onError(e) {
            e.preventDefault();
            message.error(e.message);
        },
        initialState: {

        },
    },
};



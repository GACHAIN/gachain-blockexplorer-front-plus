import config from './config';
import request from './request';

export {
    config,
    request,
}
/**
 * 去除左（右）自定字符串
 */
String.prototype.trim = function (char, type) {
    if (char) {
        if (type == 'left') {
            return this.replace(new RegExp('^\\' + char + '+', 'g'), '');
        } else if (type == 'right') {
            return this.replace(new RegExp('\\' + char + '+$', 'g'), '');
        }
        return this.replace(new RegExp('^\\' + char + '+|\\' + char + '+$', 'g'), '');
    }
    return this.replace(/^\s+|\s+$/g, '');
};


export function moneyToGac(money) {
    money = String(money)
    // 2. 循环这个字符串，从最后一个开始数连续重复的0
    if (money.length > 12) {
        let before_str = ''
        before_str = money.substr(1, money.length-12)
        console.log(before_str)
        let after_str = ''
        after_str = money.substr(-1, 12)
        let new_str = ''
        new_str = `${before_str}.${after_str}`
    }
    
    // 3. 判断这个0的个数是多少，比如是5（截取5位） 那么小数点要取的数就是截断0然后取 12-5位
}
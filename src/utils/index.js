import config from './config';
import request from './request';
import { Int64BE, Uint64BE } from 'int64-buffer';

/**
 * 钱包ID转地址
 * @param {*} id 
 */
let walletIdToAddr = function (id) {
    const num = new Int64BE(id.toString(), 10);
    const addr = new Uint64BE(num.toString(10), 10).toString(10);
    let s = String((Array(20).join('0') + addr).slice(-20))
    let res = String(s.match(new RegExp('.{1,4}', 'g')).join('-'))
    return res;
}

/**
 * 钱包地址转ID
 * @param {*} addr
 */
let walletAddrToId = function (addr) {
    const truncated = addr.replace(/-/g, '');
    const num = new Uint64BE(truncated, 10);
    const s = String(new Int64BE(num.toString(10), 10).toString(10))
    return s;
}

/**
 * 判断是KeyID或Address
 * @param {string} s 
 * @return {int} -1 KeyID
 * @return {int} 1 Address
 */
let checkKeyidOrAddress = function (s) {
    return String(s).split("-").length === 5 ? 1 : -1
}

/**
 * qGAC转GAC
 */
let qGacToGac = function (value) {
    let s = String(value)
    if (s.length > config.MONEY_POWER) {
        let sArr = [s.substr(0, s.length - config.MONEY_POWER), s.substr(-config.MONEY_POWER)]
        let sStr = sArr.join(".")
        return Number(sStr)
    } else {
        let prefix = ""
        for (let i = 0; i <= config.MONEY_POWER - s.length; i++) {
            if (i === 0) {
                prefix += "0."
            } else {
                prefix += "0"
            }
        }
        return Number(`${prefix}${value}`)
    }
}

export {
    config,
    request,
    walletIdToAddr,
    walletAddrToId,
    checkKeyidOrAddress,
    qGacToGac
}

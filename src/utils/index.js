import config from './config';
import { message } from 'antd';
import request from './request';
import { Int64BE, Uint64BE } from 'int64-buffer';
import copy from 'copy-to-clipboard';
import { getLocale } from 'umi/locale';

/**
 * 钱包ID转地址
 * @param {*} id
 */
let walletIdToAddr = function(id) {
	const num = new Int64BE(id.toString(), 10);
	const addr = new Uint64BE(num.toString(10), 10).toString(10);
	let s = String((Array(20).join('0') + addr).slice(-20));
	let res = String(s.match(new RegExp('.{1,4}', 'g')).join('-'));
	return res;
};

/**
 * 钱包地址转ID
 * @param {*} addr
 */
let walletAddrToId = function(addr) {
	const truncated = addr.replace(/-/g, '');
	const num = new Uint64BE(truncated, 10);
	const s = String(new Int64BE(num.toString(10), 10).toString(10));
	return s;
};

/**
 * 判断是KeyID或Address
 * @param {string} s
 * @return {int} -1 KeyID
 * @return {int} 1 Address
 */
let checkKeyidOrAddress = function(s) {
	return String(s).split('-').length === 5 ? 1 : -1;
};

/**
 * qGAC转GAC
 */
let qGacToGac = function(value) {
	let result = '';
	let s = String(value);
	if (s.length > config.MONEY_POWER) {
		let sArr = [
			s.substr(0, s.length - config.MONEY_POWER),
			s.substr(-config.MONEY_POWER)
		];
		let sStr = sArr.join('.');
		result = parseFloat(sStr, 10);
	} else {
		let prefix = '';
		for (let i = 0; i <= config.MONEY_POWER - s.length; i++) {
			if (i === 0) {
				prefix += '0.';
			} else {
				prefix += '0';
			}
		}
		result = parseFloat(`${prefix}${value}`, 10);
	}
	return result;
};

/**
 * fmoney(s,n)
 * GAC千分位用逗号隔开
 * params: s, 需要格式化的金额
 * params: n, 四舍五入保留多少位小数点
 */
let fmoney = (s, n) => {
	let result = '';
	if (s > 1) {
		n = n > 0 && n <= 20 ? n : 2;
		s = String(parseFloat(String(s).replace(/[^\d\.-]/g, '')).toFixed(n));
		let l = s
			.split('.')[0]
			.split('')
			.reverse();
		let r = s.split('.')[1];
		let t = '';
		for (let i = 0; i < l.length; i++) {
			t += l[i] + ((i + 1) % 3 === 0 && i + 1 !== l.length ? ',' : '');
		}
		result = (t.split('').reverse().join('') + '.' + r);
	} else {
		result = s;
	}
	return result;
};

/**
 * 点击复制
 */
let clickCp = val => {
	copy(val);
	let local = getLocale();
	let localInfo = {
		'zh-CN': '复制成功',
		'en-US': 'Copy Success',
		'ja-JP': '複製に成功する'
	};
	message.success(localInfo[local]);
};

export {
	config,
	request,
	walletIdToAddr,
	walletAddrToId,
	checkKeyidOrAddress,
	qGacToGac,
	fmoney,
	clickCp
};

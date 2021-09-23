/*************************
 * @providesModule Utils *
 * @created_by Kds       *
 *************************/

import _uniq from 'lodash/uniq';
import _uniqBy from 'lodash/uniqBy';
import _isEmpty from 'lodash/isEmpty';
import _cloneDeep from 'lodash/cloneDeep';
import fastCompare from 'react-fast-compare'; // This is a fork of the brilliant fast-deep-equal with some extra handling for React.
import { v1 as uuidv1, v3 as uuidv3, v4 as uuidv4, v5 as uuidv5 } from 'uuid';

export function isUndefined(e) {
    switch (e) {
        case 'undefined': case 'NaN': case NaN: case undefined: case '': case null: case 'null': case false: case 'false': case 'Invalid date': return true;
        default: return false;
    }
}

export function isEmail(email) {
    return (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(String(email).toLowerCase());
}

export function isString(value) {
    return typeof value === 'string';
}

export function isNumber(value) {
    return typeof value === 'number' || (String(value).split('.') === 2 && typeof parseFloat(value) === 'number') || isNumeric(value);
}

export function isNumeric(str) {
    return String(str).match(/^[0-9]+$/) !== null;
}

export function isBoolean(value) {
    return typeof value === 'boolean';
}

export function isObject(value, isNotEmpty) {
    return typeof value === 'object' && !isUndefined(value) ? (isNotEmpty ? !isEmpty(value) : true) : false;
}

export function isEmpty(obj) {
    return _isEmpty(obj);
}

export function isArray(value, isNotEmpty) {
    if (Array.isArray(value)) {
        if (isNotEmpty) {
            let minLength = isNumber(isNotEmpty) ? parseInt(isNotEmpty) : 0;
            return value.length > minLength ? true : false;
        } else {
            return true;
        }
    }
    return false;
}

export function isHaveValue(data, value, isArr) {
    if (!data || (isArr && !isArray(data))) { return false; }
    if (isArr) { return data.findIndex(i => isEqual(i, value)) > -1; }
    for (const key in data) { if (isEqual(data[key], value)) { return true; } }
    return false;
}

export function isHaveString(arr, str) {
    let status = false;
    if (!str || !isString(str) || !isArray(arr, true)) { return status; }
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] && str.indexOf(String(arr[i])) > -1) {
            status = true;
            break;
        }
    }
    return status;
}

export function isHaveProp(obj, prop) {
    if (!prop || !obj) { return false; }
    return Object.keys(obj).indexOf(prop) > -1;
}

export function isHaveProps(obj, propTxts) {
    if (!obj || !propTxts) { return false; }
    let props = String(propTxts).split(' ');
    if (props.length === 0) { return false; }
    return Object.keys(obj).sort().join().indexOf(props.sort().join()) > -1;
}

export function isUrl(str, type) {
    let regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
    switch (type) {
        case 'facebook':
            regex = /(?:https?:\/\/)?(?:www\.)?facebook\.com\/.(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-\.]*)/;
            break;
        case '': break;
        default: break;
    }
    return regex.test(str);
}

export function isJson(data) {
    try {
        if (!data) return false;
        if (isString(data)) {
            JSON.parse(data);
        } else {
            JSON.parse(JSON.stringify(data));
        }
    } catch (e) { return false; }
    return true;
}

export function toJson(data) {
    try {
        let json = null;
        if (isString(data)) {
            json = JSON.parse(data);
            if (isString(json)) {
                json = JSON.parse(json);
            }
        } else {
            json = JSON.parse(JSON.stringify(data));
        }
        return json;
    } catch (e) { return null; }
}

export function isFunction(func) {
    return typeof func === 'function';
}

export function isEqual(arg1, arg2) { return fastCompare(arg1, arg2); }

export function removeUnicode(str, { type, middle } = {}) {
    if (!str || !isString(str)) { return ''; }
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
    str = str.replace(/đ/g, 'd');
    if (type === 'email') str = str.replace(/[^_@.a-z0-9]/g, '-');
    else str = str.replace(/[^a-z0-9]/g, '-');
    str = str.replace(/-+-/g, '-'); // replace 2- to 1-
    str = str.replace(/^\-+|\-+$/g, '');
    str = str.replace(/-/g, middle || ' '); // replace - to \s
    return str;
}

export function randomColor() {
    let letters = '0123456789ABCDEF', color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

export function randomString(type, length) {
    let randomStr = '', types = { num: '0123456789', char: 'ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz', mix: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz', charLow: 'abcdefghiklmnopqrstuvwxyz', charUp: 'ABCDEFGHIJKLMNOPQRSTUVWXTZ', numLow: '0123456789abcdefghiklmnopqrstuvwxyz', numUp: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZ', };
    for (let i = 0; i < length; i++) { let rnum = Math.floor(Math.random() * types[type].length); randomStr += types[type].substring(rnum, rnum + 1); }
    return randomStr;
}

export function reverseStr(str) {
    return String(str).split('').reverse().join('');
}

export function randomValue(inputValue, isInt) {
    if (!inputValue || !isString(inputValue)) { return null; }
    let rnum = Math.floor(Math.random() * inputValue.length);
    let rvalue = inputValue.substring(rnum, rnum + 1);
    if (isInt) { return parseInt(rvalue); }
    return rvalue;
}

export function calcCrowDistance(lat1, lon1, lat2, lon2, unit) {
    let R = 6371 * (unit === 'm' ? 1000 : 1); // default km;
    let dLat = (lat2 - lat1) * Math.PI / 180;
    let dLon = (lon2 - lon1) * Math.PI / 180;
    let dlat1 = lat1 * Math.PI / 180;
    let dlat2 = lat2 * Math.PI / 180;
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(dlat1) * Math.cos(dlat2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c;
    return d;
}

export function json2String(json) {
    return JSON.stringify(json).replace(/"/g, `'`);
}

export function string2Json(txt) {
    try {
        if (!txt || !isString(txt)) { return null; }
        return JSON.parse(txt.replace(/'/g, '"'));
    } catch (error) {
        return null;
    }
}

export function indexText(index, max, isSkipZero) {
    if (!index && !max) { return null; }
    let indexTxt = isSkipZero ? String(index + 1) : String(index), maxTxt = String(max), indexL = indexTxt.length, maxL = maxTxt.length, subTxt = '';
    if (maxL > indexL) { for (let i = 0; i < maxL - indexL; i++) { subTxt += '0'; } }
    return subTxt + indexTxt;
}

export async function miniTimer(time) {
    if (!isNumber(time)) return;
    return new Promise((resolve) => { setTimeout(() => { resolve(true); }, time); });
}

export function getProps(data, field, isConcatArray, isUnique) {
    if (!isArray(data) || data.length == 0 || !field) { return []; }
    let props = [];
    data.forEach(item => {
        if (isConcatArray) {
            props = props.concat(item[field]);
        } else {
            props.push(item[field]);
        }
    });
    if (isUnique) { props = _uniq(props); }
    return props;
}

export function removeProps(obj, propTxt) {
    if (!obj) { return null; }
    if (!propTxt || !isString(propTxt)) { return obj; }
    let props = propTxt.split(' ');
    if (props.length === 0) { return obj; }
    let newObj = _cloneDeep(obj);
    props.forEach(prop => delete newObj[prop]);
    return newObj;
}

export function uniqArray(datas) {
    return isArray(datas) ? _uniq(datas) : datas;
}

export function formatBytes(a, b, space) {
    if (0 == a) return '0 Bytes';
    var c = 1024, d = b || 2, e = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'], f = Math.floor(Math.log(a) / Math.log(c));
    return parseFloat((a / Math.pow(c, f)).toFixed(d)) + (space ? ' ' : '') + e[f];
}

export function cloneObj(obj, propTxts, isSelectProp) {
    obj = _cloneDeep(obj);
    let clonedObj = isSelectProp ? {} : obj, cloneProps = propTxts ? String(propTxts).split(' ') : [];
    cloneProps.forEach(prop => {
        if (isSelectProp) {
            clonedObj[prop] = obj[prop];
        } else {
            delete clonedObj[prop];
        }
    });
    return clonedObj;
}

export function cloneArray(arrayData) {
    if (!arrayData || !isArray(arrayData)) { return []; }
    let clonedArray = [];
    arrayData.forEach(data => clonedArray.push(data));
    return clonedArray;
}

export function getMediaTimer(t, { middle = ':', hUnit, minUnit, secUnit, minStr } = {}) {
    t = parseInt(isUndefined(t) ? 0 : t);
    if (!t) return `00${middle}00`;
    let isH = t > 3600,
        h = isH ? Math.trunc(t / 3600) : 0,
        min = Math.trunc((isH ? t % 3600 : t) / 60),
        sec = Math.trunc((isH ? t % 3600 : t) % 60),
        hTxt = h ? `${!minStr && h < 10 ? '0' : ''}${h}${hUnit || ''}${middle}` : '',
        minTxt = `${!minStr && min < 10 ? '0' : ''}${min}${minUnit || ''}${middle}`,
        secTxt = `${!minStr && sec < 10 ? '0' : ''}${sec}${secUnit || ''}`;
    return `${hTxt}${(minStr && min > 0) || !minStr ? minTxt : ''}${secTxt}`;
}

export function getPagingData(datas, page, size) {
    if (!isArray(datas) || isUndefined(page) || isUndefined(size) || !isNumber(page) || !isNumber(size)) { return []; }
    let from = page * size;
    return datas.slice(from, from + size);
}

export function genUuid(version, options) {
    let customNamespace;
    version = String(version || '1');
    if (version === '3' || version === '5') {
        if (!isArray(options, true)) { return; }
        switch (options[1]) {
            case 'DNS': customNamespace = uuidv5.DNS; break;
            case 'URL': customNamespace = uuidv5.URL; break;
            default: customNamespace = options[1]; break;
        }
    }
    switch (version) {
        case '1': // timestamp => '2c5ea4c0-4067-11e9-8bad-9b1deb4d3b7d';
            return uuidv1();
        case '3': // namespace
            // using predefined DNS namespace (for domain names) => '9125a8dc-52ee-365b-a5aa-81b0b3681cf6';
            // using predefined URL namespace (for, well, URLs) => 'c6235813-3ba4-3801-ae84-e0a6ebb7d138';
            // using a custom namespace;
            // => Note: Custom namespaces should be a UUID string specific to your application!
            // => E.g. the one here was generated using this modules `uuid` CLI.
            // => const MY_NAMESPACE = '1b671a64-40d5-491e-99b0-da01ff1f3341';
            // => 'e8b5a51d-11c8-3310-a6ab-367563f20686';
            return uuidv3(options[0], customNamespace);
        case '4': return uuidv4(); // random => '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed';
        case '5': return uuidv5(options[0], customNamespace); // namespace, same input type as v3;
        default: return;
    }
}

export function cloneDeep(obj) { return obj && _cloneDeep(obj); }

export function timerFunc(timeout, callback = () => { }) {
    let _timeout = String(timeout).trim();
    if (_timeout) {
        let sortType = [['s', 1], ['m', 60], ['h', 3600], ['d', 86400]].find(i => i[0] === _timeout.slice(-1));
        _timeout = parseInt(parseFloat(_timeout) * (sortType ? (sortType[1] * 1000) : 1));
    }
    _timeout ? setTimeout(callback, _timeout) : callback();
}

export function randomIntFromInterval(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function isOdd(number) {
    return number % 2;
}

export function compareJson(obj1, obj2) {
    try {
        return JSON.stringify(obj1).split('"').sort().join('') === JSON.stringify(obj2).split('"').sort().join('');
    } catch (error) {
        return obj1 === obj2;
    }
}

export function extractHostname(url) {
    return url ? (String(url).indexOf('//') > -1 ? url.split('/')[2] : url.split('/')[0]).split(':')[0].split('?')[0] : '';
}

export function uniqBy(arr, field) { return _uniqBy(arr, field); }
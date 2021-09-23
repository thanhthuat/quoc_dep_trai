import BrowserDetect from 'browser-detect';
import MobileDetect from 'mobile-detect';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

import { isString, genUuid, cloneDeep, isNumeric } from '../utils/Utils';
import { redirectToLoginPage, jwtDecode } from '../utils/WebUtils';
import { getRefreshToken, getRefreshTokenUrl, webLog, setCookie, capitalizedStr } from '../utils/StringUtils';

import { RespCode } from '../constants';

export default class WebMgr {

    static instance = null;
    static createInstance() { let object = new WebMgr(); return object; }
    static getInstance() {
        if (!WebMgr.instance) { WebMgr.instance = WebMgr.createInstance(); }
        return WebMgr.instance;
    }

    // START: variables
    domain_web = '';
    domain_key = '';
    WEB_ENV = '';
    role = null;
    roleDetail = null;
    isOwner = false;
    accessTokenObj = null;
    refreshTokenCallback = function () { };
    isGetNewToken = false;
    recentNewToken = '';
    recentRefreshToken = '';
    browserInfo = null;
    textInputMasks = {
        money: createNumberMask({ prefix: '' }),
        number: createNumberMask({ prefix: '', thousandsSeparatorSymbol: '.' }),
    };
    // END: variables

    setDomainWeb(host) {
        let hostArr = host.split(':')[0].split('.');
        if (hostArr.length !== 4 || !isNumeric(hostArr.join(''))) { hostArr = hostArr.slice(-2); }
        this.domain_web = hostArr.join('.');
        this.domain_key = hostArr.join('_');
    }
    getDomainWeb(type) { return this[`domain_${type || 'web'}`]; }

    initWebSessionData(isOwner, accessTokenObj) {
        this.isOwner = isOwner;
        this.accessTokenObj = accessTokenObj;
    }

    getRoleColor() { return this.roleDetail?.color || '#4CA750'; }

    setRole(roles, callback) {
        try {
            if (roles && roles.modules) {
                roles = cloneDeep(roles);
                let role = {};
                roles.modules.forEach(r_module => {
                    const { name, enabled, functions } = r_module;
                    let module_functions = {};
                    functions.forEach(func => {
                        let func_detail = func.name.split('.');
                        let func_name = func_detail[0];
                        let func_action = func_detail[1];
                        if (!module_functions[func_name]) {
                            module_functions[func_name] = {};
                        }
                        module_functions[func_name][func_action] = func.enabled;
                    });
                    role[name] = {
                        enabled: enabled,
                        functions: module_functions,
                    };
                });
                this.role = role;
                delete roles.modules;
                this.roleDetail = roles;
                // console.log(`SetRole: ${roles.name}`, role);
            }
            callback();
        } catch (error) {
            callback();
            console.log(`setRole: ${roles.name}, error:\n`, error);
        }
    }

    getRole(r_module, r_func, r_action) {
        try {
            if (this.isOwner || !this.role) { return true; }
            if (!r_module || (!r_module && !r_func && !r_action)) {
                return null;
            }
            let module_role = this.role[r_module];
            if (!module_role || !module_role.enabled) {
                return false;
            }
            if (r_module && r_func && r_action) {
                return module_role['functions'][r_func] && module_role['functions'][r_func][r_action];
            }
            if (r_module && r_func && !r_action) {
                return module_role['functions'][r_func];
            }
            if (r_module && !r_func && !r_action) {
                let module_name = isString(r_module) ? r_module : r_module[0];
                let is_enabled = isString(r_module) ? false : r_module[1];
                let r_module_detail = this.role[module_name];
                return is_enabled ? r_module_detail.enabled : r_module_detail;
            }
            return null;
        } catch (error) {
            console.log(`error to get role for: ${r_module} | ${r_func} | ${r_action}:\n`, error);
            return null;
        }
    }

    initBrowserInfo() {
        let ua = window.navigator.userAgent;
        let browserInfo = BrowserDetect(ua), mobileInfo = new MobileDetect(ua);
        const getBrowserVersion = (match) => {
            let version = match && match.split(/[._]/).slice(0, 3);
            let versionTails = Array.prototype.slice.call(version, 1).join('') || '0';
            if (version && version.length < 3)
                Array.prototype.push.apply(version, version.length === 1 ? [0, 0] : [0]);
            return {
                version: version.join('.'),
                versionNumber: Number(version[0] + '.' + versionTails)
            };
        };
        switch (true) {
            case ua.indexOf('coc_coc_browser') > -1:
                browserInfo.name = 'CocCoc';
                Object.assign(browserInfo, getBrowserVersion(ua.split('coc_coc_browser/')[1].split(' ')[0]));
                break;
            case ua.indexOf('SFive') > -1:
                browserInfo.name = 'SFive';
                Object.assign(browserInfo, getBrowserVersion(ua.split('SFive/')[1].split(' ')[0]));
                break;
            default:
                browserInfo.name = capitalizedStr(browserInfo.name);
                break;
        }
        return {
            ...browserInfo,
            platform: ua.split(' (')[1].split(') ')[0],
            phone: mobileInfo.phone(),
            tablet: mobileInfo.tablet(),
            os: mobileInfo.os(),
            isMobile: !!mobileInfo.phone(),
            isTablet: !!mobileInfo.tablet(),
            isAndroid: mobileInfo.os() === 'AndroidOS',
            isIOS: mobileInfo.os() === 'iOS',
        };
    }

    setTokenContent(token) { return this.accessTokenObj = token; }
    getTokenContent(field) { return field ? this.accessTokenObj?.[field] : this.accessTokenObj; }

    getNewAccessToken(oldCookie, callback) {
        let interval_id = 'interval_' + genUuid();
        if (oldCookie.refresh_token === this.recentRefreshToken) {
            if (this.isGetNewToken) {
                // console.log('start setInterval at: ', new Date, interval_id, 'same');
                this[interval_id] = setInterval(() => {
                    // console.log('process setInterval at: ', new Date, interval_id, 'same');
                    if (!this.isGetNewToken) {
                        // console.log('clearInterval at: ', new Date, interval_id, 'same', this.recentNewToken);
                        clearInterval(this[interval_id]);
                        callback(this.recentNewToken);
                    }
                }, 10);
            } else {
                // console.log('return new_token at: ', new Date, interval_id, 'same', this.recentNewToken);
                callback(this.recentNewToken);
            }
        } else {
            this.recentRefreshToken = oldCookie.refresh_token;
            if (this.isGetNewToken) {
                // console.log('start setInterval at: ', new Date, interval_id, 'diff');
                this[interval_id] = setInterval(() => {
                    // console.log('process setInterval at: ', new Date, interval_id, 'diff');
                    if (!this.isGetNewToken) {
                        // console.log('clearInterval at: ', new Date, interval_id, 'diff', this.recentNewToken);
                        clearInterval(this[interval_id]);
                        callback(this.recentNewToken);
                    }
                }, 10);
            } else {
                this.isGetNewToken = true;
                // console.log('get new acess token for:', oldCookie.refresh_token);
                webLog('handle get refresh_token', { type: 'TOKEN', color: 'darkviolet', date: true });
                let req_url = getRefreshTokenUrl(oldCookie.access_token, oldCookie.refresh_token);
                fetch(req_url)
                    .then(res => res.json())
                    .then((result) => {
                        webLog('get new access_token success', { type: 'TOKEN', color: 'green', date: true });
                        // console.log('get new acess token result:', result);
                        if (result && result.status_code === RespCode.SUCCESS && result.payload) {
                            const { payload } = result;
                            const newCookie = {
                                ...oldCookie,
                                access_token: payload.access_token,
                                refresh_token: getRefreshToken(payload.refresh_token),
                            };
                            setCookie(newCookie);
                            const newAccessTokenObj = { ...jwtDecode(payload.access_token), login_email: oldCookie.login_email };
                            this.access_token = payload.access_token;
                            this.recentNewToken = payload.access_token;
                            this.recentRefreshToken = payload.access_token;
                            this.accessTokenObj = newAccessTokenObj;
                            webLog('refreshTokenCallback', { type: 'TOKEN', color: 'red' });
                            this.refreshTokenCallback(newAccessTokenObj);
                            callback(payload.access_token);
                        } else {
                            callback('');
                            webLog('failure to get new access_token', { type: 'TOKEN', color: 'red', date: true });
                            redirectToLoginPage({ clearCookie: true });
                        }
                        this.isGetNewToken = false;
                    }, (error) => {
                        this.isGetNewToken = false;
                        webLog('failure to get new access_token', { type: 'TOKEN', color: 'red', date: true });
                        console.log(' > error:', JSON.stringify(error));
                        callback('');
                        redirectToLoginPage({ clearCookie: true });
                    });
            }
        }
    }

    getTextInputMask(type) {
        return this.textInputMasks[type];
    }

}
/****************************
 * @providesModule WebUtils *
 * @created_by Kds          *
 ****************************/

import jwt from 'jsonwebtoken';

import WebMgr from '../cores/WebMgr';
import NotifyMgr from '../cores/NotifyMgr';

import { timerFunc, isBoolean, isArray } from './Utils';

import { domains } from '../constants';

const WebInstance = WebMgr.getInstance();
const NotifyInstance = NotifyMgr.getInstance();

export function jwtEncode(data) { return jwt.sign({ exp: Math.floor(Date.now() / 1000) + (60 * 60), data: data }, 'secret'); }
export function jwtDecode(data) { return data ? jwt.decode(data) : null; }
export function showNotify(...arg) { NotifyInstance.showNotify(...arg); }
export function setDomainWeb(...arg) { WebInstance.setDomainWeb(...arg); }
export function getDomainWeb() { return WebInstance.getDomainWeb(); }
export function initWebSessionData(...arg) { WebInstance.initWebSessionData(...arg); }
export function setRole(...arg) { WebInstance.setRole(...arg); }
export function getRole(...arg) { return WebInstance.getRole(...arg); }
export function getRoleColor() { return WebInstance.getRoleColor(); }
export function setTokenContent(...arg) { return WebInstance.setTokenContent(...arg); }
export function getTokenContent(...arg) { return WebInstance.getTokenContent(...arg); }
export function getTextInputMask(...arg) { return WebInstance.getTextInputMask(...arg); }

export function toggleOverlaySpinner(visable, options) {
    let spinner = document && document.getElementById(options && options.id || 'overlaySpinner');
    if (spinner) {
        timerFunc(options && options.delay || 0, () => { spinner.style.display = visable ? 'unset' : 'none'; });
    }
}

export function getRouteRole(role) {
    if (!role || (!role.module && !role.function && !role.action)) {
        return null;
    }
    if (!isArray(role.function) && !isArray(role.action)) {
        let route_role = WebInstance.getRole(role.module, role.function, role.action);
        if (role.module && role.function && role.action) {
            return route_role;
        }
        if (!route_role) {
            return null;
        }
        let is_enable = false;
        if (role.module && role.function && !role.action) {
            for (const action in route_role) {
                if (route_role[action]) {
                    is_enable = true; break;
                }
            }
        }
        if (role.module && !role.function && !role.action) {
            if (isBoolean(route_role)) {
                return route_role;
            } else {
                let funcs = route_role.functions;
                for (const func in funcs) {
                    for (const action in funcs[func]) {
                        if (funcs[func][action]) {
                            is_enable = true; break;
                        }
                    }
                }
            }
        }
        return is_enable;
    } else {
        for (let i = 0; i < role.function.length; i++) {
            let func_name = role.function[i], action_name = role.action[i];
            let func_role = WebInstance.getRole(role.module, func_name, action_name);
            if (func_role) {
                return true;
            }
        }
        return false;
    }
}

export function validRole(role, action) { return role === true || role[action]; }

export function getNewAccessToken(oldCookie, callback) { return WebInstance.getNewAccessToken(oldCookie, callback); }

export function redirectToLoginPage({ reload, clearCookie } = {}) {
    const { protocol, port } = window.location;
    let baseAddress = `.${getDomainWeb()}`;
    if (port) { baseAddress += `:${port}` }
    if (clearCookie) { setCookie({ sourceVersion }); }
    window.location.href = `${protocol}//${domains.defaultSubDomain}${baseAddress}/`;
    if (reload) { window.location.reload(); }
}
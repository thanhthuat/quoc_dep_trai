/*******************************
 * @providesModule RouterUtils *
 * @created_by Kds             *
 *******************************/

import { Router } from '../routes';
import RouterMgr from '../cores/RouterMgr';

import { removeProps } from './Utils';
import { getDomainWeb } from './WebUtils';

const ScreenInstance = RouterMgr.getInstance();

function getRouterParamPath(path, { e, a, force, redirect, keep } = {}) { // e: exclude, a: addition;
    if (!keep && !e && !a && !redirect) { return ''; }
    let paramPath = '', params = {
        ...(!force && getRouterQuery()), ...a,
        ...(redirect && { redirect: encodeBase64URI(getRouterAsPath()) }),
    };
    let keys = Object.keys(removeProps(params, e)), hadParam = path && path.indexOf('?') > -1;
    if (keys.length > 0) {
        keys.forEach((key, index) => {
            paramPath += (index == 0 ? (hadParam ? '&' : '?') : '&') + `${key}=${params[key]}`;
        });
    }
    return paramPath;
}

function handleChangeRoute(type, path, { params, options, paramPath, event, forceReRender, validate } = {}) {
    if (!path) return;
    if (path === 'current') { path = window.location.pathname; }
    event?.preventDefault();
    if (validate) {
        if (window.location.search.includes('changed')) {
            let resp = window.confirm(`${i18nText('change_data')}, ${i18nText('leave_this_page', { type: 'l' })}?`);
            if (!resp) return;
        }
    }
    return new Promise((resolve) => {
        Router[`${type}Route`](path + getRouterParamPath(path, paramPath), params, options)
            .then(() => {
                if (forceReRender) { ScreenInstance.reRenderCallback?.(); }
                resolve();
            });
    });
}

export function encodeURIComp(str) { str = String(str || ''); try { return encodeURIComponent(str); } catch (error) { return str; } }
export function decodeURIComp(str = '') { str = String(str || ''); try { return decodeURIComponent(str); } catch (error) { return str; } }

export function routerPush(path) { if (!path) { return; } Router.push(path); }
export function routerBack(redirect) {
    if (redirect) {
        let havePrevPage = document && document.referrer && document.referrer.indexOf(getDomainWeb()) || getRouterPage(2);
        if (havePrevPage) {
            Router.back();
        } else {
            Router.replaceRoute(redirect);
        }
    } else {
        Router.back();
    }
}
export function pushRoute(...args) { return handleChangeRoute('push', ...args); }
export function replaceRoute(...args) { return handleChangeRoute('replace', ...args); }
export function prefetchRoute(path, params, options) {
    if (!path) return;
    return new Promise((resolve) => {
        Router.prefetchRoute(path, params, options).then(() => resolve());
    });
}
export function openRoute(path, ...args) {
    if (!path && !path.url) return;
    window.open(`${path?.crossSite ? '' : window.location.origin}${path.url || path}`, ...args);
}
export function redirectPage({ subDomain, pathUrl = '' } = {}) {
    const { protocol, port } = window.location;
    let targetSubDomain = subDomain || 'sso', baseAddress = `.${getDomainWeb()}`;
    if (port) { baseAddress += `:${port}` }
    window.location.href = `${protocol}//${targetSubDomain}${baseAddress}/${pathUrl}`;
}

export function getRouter() { return Router.router; }
export function getRouterQuery({ multi, decode } = {}) {
    return {
        ...Router.router.query,
        ...Object.fromEntries(window.location.search.substring(1).split('&').map(param => {
            let parts = param.split('=');
            parts[0] = decodeURIComp(parts[0]);
            if (multi) {
                parts[1] = parts[1].split(',').map(i => decode ? decodeURIComp(i) : i);
            } else {
                parts[1] = decode ? decodeURIComp(parts[1]) : parts[1];
            }
            return parts;
        }).filter(i => i[0])),
    };
} // query: { sourceId: '5d19b76e4e940b0007d02b27' }
export function getRouterPathname() { return window.location.pathname; } // pathname: '/customer/list'
export function getRouterRoute() { return Router.router.route; } // route: '/customer-list'
export function getRouterAsPath() { return Router.asPath; } // asPath: '/customer/5d19b76e4e940b0007d02b27/list'

export function setCurrentRouter(page) { ScreenInstance.setCurrentRouter(page); }
export function getRouterPage(index) { return ScreenInstance.getRouterPage(index); }
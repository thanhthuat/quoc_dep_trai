import axios from 'axios';

import { getCookie } from '../utils/StringUtils';
import { getNewAccessToken, redirectToLoginPage, jwtDecode } from '../utils/WebUtils';
import { getTimestamp } from '../utils/DateUtils';
import { decryptAES } from '../utils/EncryptUtils';
import { isJson, isString } from '../utils/Utils';

import { requestApiTimeout } from '../constants/Configs';

export default class ApiMgr {

    static instance = null;
    static createInstance() { const object = new ApiMgr(); return object; }
    static getInstance() {
        if (!ApiMgr.instance) { ApiMgr.instance = ApiMgr.createInstance(); }
        return ApiMgr.instance;
    }

    isRedirectToLoginPage = false;

    async doRequest(method, url, { body, header, noAuth, noTimeout, accessToken, isUpload } = {}) {
        try {
            let reqHeader = { 'Content-Type': isUpload ? 'multipart/form-data' : 'application/json', ...header };
            let validAccessToken, reqUrl = String(url) || '';
            if (!noAuth || accessToken) {
                validAccessToken = await this.validateAccessToken(accessToken);
                if (validAccessToken) {
                    reqHeader.Authorization = `Bearer ${validAccessToken.token}`;
                }
            }
            const reqConfig = {
                method,
                url: reqUrl,
                headers: reqHeader,
                timeout: isUpload || noTimeout ? 0 : requestApiTimeout,
                data: !isUpload && isJson(body) ? JSON.stringify(body) : (body || '{}'),
                maxContentLength: 100000000,
            }
            const apiResp = await axios.request(reqConfig);
            return this.validateResponseData(apiResp.data, validAccessToken);
        } catch (error) {
            if (error && error.response && error.response.data === 'Unauthorized') {
                if (!this.isRedirectToLoginPage) {
                    this.isRedirectToLoginPage = true;
                    redirectToLoginPage({ clearCookie: true });
                }
            } else {
                if (error.code === 'ECONNABORTED') {
                    error.message = 'timeout_exceeded';
                }
                throw error;
            }
        }
    }

    async simpleRequest(method, url, { body, headers } = {}) {
        return new Promise((resolve) => {
            const errorResp = { status: false, code: -200, error: null };
            try {
                const reqConfigs = {
                    url, method, timeout: 0,
                    headers: { 'Content-Type': 'application/json', ...headers },
                    data: body || {},
                };
                axios.request(reqConfigs)
                    .then((res) => { resolve(res); })
                    .catch((err) => {
                        errorResp.error = err?.response?.data?.error || err;
                        resolve(errorResp);
                    });
            } catch (error) {
                errorResp.error = error;
                resolve(errorResp);
            }
        });
    }

    // START: api handler
    validateAccessToken(accessToken) {
        return new Promise((resolve) => {
            let webCookie = getCookie();
            if (!accessToken) accessToken = webCookie?.access_token;
            if (!accessToken) { resolve(); }
            let decoded = jwtDecode(accessToken), curTime = getTimestamp();
            switch (true) {
                case decoded.exp * 1000 < curTime:
                    if (!this.isRedirectToLoginPage) {
                        this.isRedirectToLoginPage = true;
                        redirectToLoginPage({ clearCookie: true });
                    }
                    break;
                case decoded.exp * 1000 - curTime <= 1800:
                    getNewAccessToken(webCookie, (newAccessToken) => {
                        resolve({ decoded, token: newAccessToken });
                    });
                    break;
                default:
                    resolve({ decoded, token: accessToken });
                    break;
            }
        });
    }

    validateResponseData(data, token) {
        try {
            if (isJson(data)) {
                let jsonData = isString(data) ? JSON.parse(data) : data;
                if (jsonData.key_enabled && jsonData.payload) {
                    let decryptPayload = decryptAES(token?.decoded?.soft_key || '', jsonData.payload);
                    if (decryptPayload) {
                        switch (decryptPayload) {
                            case null: case 'null': decryptPayload = null; break;
                            case undefined: case 'undefined': decryptPayload = undefined; break;
                            case NaN: case 'NaN': decryptPayload = NaN; break;
                            case true: case 'true': decryptPayload = true; break;
                            case false: case 'false': decryptPayload = true; break;
                            default: if (isJson(decryptPayload)) { decryptPayload = JSON.parse(decryptPayload); } break;
                        }
                    }
                    jsonData.payload = decryptPayload;
                }
                return jsonData;
            } else {
                return data;
            }
        } catch (error) {
            return error;
        }
    }
    // END: api handler

}
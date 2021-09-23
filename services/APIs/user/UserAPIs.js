import { doRequest } from '../../../utils/CoreUtils';

import { domains } from '../../../constants';

export default Object.freeze({
    userLogin: async (body) => {
        let url = `${domains.auth}auth/pre_auth`;
        return await doRequest('post', url, { body });
    },
    getLoginToken: async (body) => {
        let url = `${domains.auth}auth/login`;
        return await doRequest('post', url, { body });
    },
    getUserInfo: async ({ id } = {}) => {
        let url = `${domains.contact}contact/agent/get/${id}`;
        return await doRequest('get', url);
    },
}); 
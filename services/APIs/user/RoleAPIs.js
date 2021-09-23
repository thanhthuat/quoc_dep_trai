import { doRequest } from '../../../utils/CoreUtils';

import { domains } from '../../../constants';

export default Object.freeze({
    getRoles: async ({ page, size } = {}) => {
        let url = `${domains.auth}role/get?page=${page}&size=${size}`;
        return await doRequest('post', url);
    },
});
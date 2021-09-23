import { doRequest } from '../../../utils/CoreUtils';

import { domains } from '../../../constants';

export default Object.freeze({
    getContact: async ({ page, size } = {}) => {
        let url = `${domains.connect}public_number_of_tenant/get?page${page}&size=${size}&lng=vi`;
        //public_number_of_tenant/get?page=1&size=15&lng=vi
        return await doRequest('post', url);
    },
});
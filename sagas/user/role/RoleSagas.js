import { call, put, delay } from 'redux-saga/effects';

import RoleActions from '../../../redux/user/RoleRedux';

import RoleAPIs from '../../../services/APIs/user/RoleAPIs';

import { getTimestamp, getDelayTime } from '../../../utils/DateUtils';
import { validateResp, getErrorMsg } from '../../../utils/StringUtils';

export function* getRoles(action) {
    const { classify, params } = action;
    const startReqAt = getTimestamp();
    try {
        let resp = yield call(RoleAPIs.getRoles, params);
        yield delay(getDelayTime(startReqAt, 's', 2));
        if (validateResp(resp)) {
            yield put(RoleActions.getRolesSuccess(classify, resp.payload));
        } else throw resp;
    } catch (error) {
        yield put(RoleActions.roleCommonFailure(classify, getErrorMsg(error)));
    }
}
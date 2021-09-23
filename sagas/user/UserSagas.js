import { call, put, delay } from 'redux-saga/effects';

import UserActions from '../../redux/user/UserRedux';
import SessionActions from '../../redux/common/SessionRedux';

import UserAPIs from '../../services/APIs/user/UserAPIs';

import { getTimestamp, getDelayTime } from '../../utils/DateUtils';
import { validateResp, getErrorMsg } from '../../utils/StringUtils';

export function* userLogin(action) {
    const { classify, params } = action;
    try {
        let resp = yield call(UserAPIs.userLogin, params);
        if (validateResp(resp)) {
            let getTokenParams = { ...params, tenant_id: resp.payload[0]._id };
            delete getTokenParams.domain;
            let tokenResp = yield call(UserAPIs.getLoginToken, getTokenParams);
            if (validateResp(tokenResp)) {
                yield put(UserActions.commonSuccess(classify, resp.payload));
                yield put(SessionActions.setAccessToken(tokenResp.payload, params.identify_info));
            } else throw tokenResp;
        } else throw resp;
    } catch (error) {
        yield put(UserActions.commonFailure(classify, getErrorMsg(error)));
    }
}

export function* getUserInfo(action) {
    const { classify, params } = action, startReqAt = getTimestamp();
    try {
        let resp = yield call(UserAPIs.getUserInfo, params);
        yield delay(getDelayTime(startReqAt, 's', 3));
        if (validateResp(resp)) {
            yield put(UserActions.getUserInfoSuccess(classify, resp.payload));
        } else throw resp;
    } catch (error) {
        yield put(UserActions.commonFailure(classify, getErrorMsg(error)));
    }
}
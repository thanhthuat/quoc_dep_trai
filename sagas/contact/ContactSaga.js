import { call, put, delay } from 'redux-saga/effects';

import ContactActions from '../../redux/contact/ContactRedux';

import ContactAPIs from '../../services/APIs/contact/ContactAPIs';

import { getTimestamp, getDelayTime } from '../../utils/DateUtils';
import { validateResp, getErrorMsg } from '../../utils/StringUtils';

export function* getContact(action) {
    const { classify, params } = action;
    const startReqAt = getTimestamp();
    console.log('aa');
    try {
        let resp = yield call(ContactAPIs.getContact, params);
        console.log('ss', resp);
        yield delay(getDelayTime(startReqAt, 's', 1));
        if (validateResp(resp)) {
            yield put(ContactActions.getContactSuccess(classify, resp.payload));
            //   yield put(ContactActions.getContactSuccess(classify, resp.payload.items));

        } else throw resp;
    } catch (error) {
        yield put(ContactActions.CommonFailure(classify, getErrorMsg(error)));
    }
}
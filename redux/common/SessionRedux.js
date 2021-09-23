import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

import { reduxMappingActions, reduxMappingReducer } from '../../utils/CoreUtils';
import { jwtDecode, redirectToLoginPage, setTokenContent } from '../../utils/WebUtils';
import { setCookie, getRefreshToken } from '../../utils/StringUtils';

import { sourceVersion } from '../../constants/Configs';

/* ------------- Initial State ------------- */

const INITIAL_STATE = Immutable({

    accessToken: null,

});

/* ------------- Actions ------------- */

const actions = {
    setAccessToken: [['loginToken', 'identifyInfo'], (state, { loginToken, identifyInfo }) => {
        const { access_token, is_force_change_password, refresh_token } = loginToken;
        const tokenCookie = {
            sourceVersion,
            access_token,
            refresh_token: getRefreshToken(refresh_token),
            login_email: identifyInfo,
            is_force_change_password,
        };
        let accessToken = jwtDecode(loginToken.access_token);
        setCookie(tokenCookie);
        setTokenContent(accessToken);
        return state.merge({ accessToken });
    }],
    sessionLogout: [['isRedirect'], (state, { isRedirect }) => {
        setCookie({ sourceVersion });
        setTokenContent();
        localStorage.clear();
        if (isRedirect) { redirectToLoginPage(); }
        return state.merge({ accessToken: null });
    }],
};

/* ------------- Create Actions And Hookup Reducers To Types ------------- */

const { Types, Creators } = createActions(reduxMappingActions(actions));
const reducer = createReducer(INITIAL_STATE, reduxMappingReducer(actions, Types));

export { Types, reducer };
export default Creators;
import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

import { reduxCommonActions, reduxMappingActions, reduxMappingReducer } from '../../utils/CoreUtils';

/* ------------- Initial State ------------- */

const INITIAL_STATE = Immutable({
    error: {},
    fetching: {},
    content: {},
});

/* ------------- Actions ------------- */

const actions = {

    ...reduxCommonActions,

    // classify: userLogin
    userLoginRequest: [['classify', 'params'], (state, { classify }) => {
        return state.merge({
            fetching: { ...state.fetching, [classify]: true },
            error: { ...state.error, [classify]: null },
        });
    }],

    // classify: userInfo
    getUserInfoRequest: [['classify', 'params'], (state, { classify }) => {
        return state.merge({
            fetching: { ...state.fetching, [classify]: true },
            error: { ...state.error, [classify]: null },
            content: { ...state.content, [classify]: null },
        });
    }],
    getUserInfoSuccess: [['classify', 'payload'], (state, { classify, payload }) => {
        const { attribute_structure } = payload;
        let userInfo = {};
        attribute_structure.forEach(attr => {
            const { field_code, value } = attr;
            userInfo[field_code] = value.map(i => i.display_value);
        });
        return state.merge({
            fetching: { ...state.fetching, [classify]: false },
            content: { ...state.content, [classify]: userInfo },
        });
    }],
};

/* ------------- Create Actions And Hookup Reducers To Types ------------- */

const { Types, Creators } = createActions(reduxMappingActions(actions));
const reducer = createReducer(INITIAL_STATE, reduxMappingReducer(actions, Types));

export { Types, reducer };
export default Creators;
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
    // classify: roles
    getRolesRequest: [['classify', 'params'], (state, { classify }) => {
        return state.merge({
            fetching: { ...state.fetching, [classify]: true },
            error: { ...state.error, [classify]: null },
        });
    }],
    getRolesSuccess: [['classify', 'payload'], (state, { classify, payload }) => {
        return state.merge({
            fetching: { ...state.fetching, [classify]: false },
            content: { ...state.content, [classify]: payload },
        });
    }],

};

/* ------------- Create Actions And Hookup Reducers To Types ------------- */

const { Types, Creators } = createActions(reduxMappingActions(actions));
const reducer = createReducer(INITIAL_STATE, reduxMappingReducer(actions, Types));

export { Types, reducer };
export default Creators;
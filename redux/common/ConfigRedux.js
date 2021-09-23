import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

import { reduxMappingActions, reduxMappingReducer } from '../../utils/CoreUtils';
// import { setCurrentLanguage } from '../../utils/WebUtils';

/* ------------- Initial State ------------- */

const INITIAL_STATE = Immutable({

    lng: 'vi', // vi, en;

});

/* ------------- Actions ------------- */

const actions = {

    updateCurrentLanguage: [['lng'], (state, { lng }) => {
        // setCurrentLanguage(lng);
        return state.merge({ lng });
    }],

};

/* ------------- Create Actions And Hookup Reducers To Types ------------- */

const { Types, Creators } = createActions(reduxMappingActions(actions));
const reducer = createReducer(INITIAL_STATE, reduxMappingReducer(actions, Types));

export { Types, reducer };
export default Creators;
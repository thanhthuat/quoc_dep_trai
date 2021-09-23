import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

import { reduxCommonActions, reduxMappingActions, reduxMappingReducer } from '../../utils/CoreUtils';

/* ------------- Initial State ------------- */

const INITIAL_STATE = Immutable({
    error: {},
    fetching: {},
    content: {},
    pagination: {},
});

/* ------------- Actions ------------- */

const actions = {

    ...reduxCommonActions,

    // classify: contact
    getContactRequest: [['classify', 'params'], (state, { classify }) => {
        return state.merge({
            fetching: { ...state.fetching, [classify]: true },
            content: { ...state.content, [classify]: [] },
            error: { ...state.error, [classify]: null },
        });
    }],
    getContactSuccess: [['classify', 'payload'], (state, { classify, payload }) => {
        // page_number(pin): 1
        // page_size(pin): 15
        // total_items(pin): 18
        // total_pages(pin): 2
        // has_next(pin): true
        // next_page(pin): 2
        // has_previous(pin): false
        // previous_page(pin): 1
        const { page_number, page_size, total_items, total_pages, has_next, next_page, has_previous, previous_page} =payload
        return state.merge({
            fetching: { ...state.fetching, [classify]: false },
            content: { ...state.content, [classify]: payload.items },
            pagination: { ...state.content, [classify]: page_number, page_size, total_items, total_pages, has_next, next_page, has_previous, previous_page },
        });
    }],

};

/* ------------- Create Actions And Hookup Reducers To Types ------------- */

const { Types, Creators } = createActions(reduxMappingActions(actions));
const reducer = createReducer(INITIAL_STATE, reduxMappingReducer(actions, Types));

export { Types, reducer };
export default Creators;
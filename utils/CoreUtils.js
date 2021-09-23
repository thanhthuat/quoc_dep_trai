import { takeLatest, takeEvery } from 'redux-saga/effects';

import ApiMgr from '../cores/ApiMgr';

import { toCaseStyle } from './StringUtils';

const apiInstance = ApiMgr.getInstance();

export async function doRequest(...arg) { return await apiInstance.doRequest(...arg); }
export async function simpleRequest(...arg) { return await apiInstance.simpleRequest(...arg); }

export function reduxMappingActions(actions) { return Object.fromEntries(Object.keys(actions).map(i => [i, actions[i][0]])); }
export function reduxMappingReducer(actions, Types) { return Object.fromEntries(Object.keys(actions).map(i => [Types[toCaseStyle('su', i)], actions[i][1]])); }
export function sagasMappingEffects(keys, Types, Sagas) {
    let effects = [];
    keys.forEach(key => {
        const [saga, isEvery] = key;
        const type = Types[`${toCaseStyle('su', saga)}_REQUEST`], effect = Sagas[saga];
        if (!type || !effect) {
            console.log(`🚀: sagasMappingEffects -> effectArgs`, saga, [type, effect]);
            return;
        }
        const effectArgs = [type, effect];
        effects.push(isEvery ? takeEvery(...effectArgs) : takeLatest(...effectArgs));
    });
    return effects;
}

export function reduxRequestReducer(state, { classify, params }, content = null) {
    return state.merge({
        fetching: { ...state.fetching, [classify]: true },
        error: { ...state.error, [classify]: null },
        content: { ...state.content, [classify]: params?.page ? (params.page == 1 ? [] : state.content[classify]) : content },
    });
}

export const reduxCommonActions = {
    commonSuccess: [['classify', 'payload'], (state, { classify, payload }) => {
        return state.merge({
            fetching: { ...state.fetching, [classify]: false },
            content: { ...state.content, [classify]: payload },
        });
    }],
    commonFailure: [['classify', 'error'], (state, { classify, error }) => {
        return state.merge({
            fetching: { ...state.fetching, [classify]: false },
            error: { ...state.error, [classify]: error },
        });
    }],
};

export function reduxParsePagination(payload) {
    const { page, has_next, hasNext, has_previous, hasPrevious, next_page, nextPage, page_number, pageNumber, page_size, pageSize, previous_page, previousPage, total_items, totalItems, total_pages, totalPages } = payload || {};
    return {
        page: page || 1,
        has_next: has_next || hasNext || false,
        has_previous: has_previous || hasPrevious || false,
        next_page: next_page || nextPage || 0,
        page_number: page_number || pageNumber || 0,
        page_size: page_size || pageSize || 15,
        previous_page: previous_page || previousPage || 0,
        total_items: total_items || totalItems || 0,
        total_pages: total_pages || totalPages || 1,
    };
}
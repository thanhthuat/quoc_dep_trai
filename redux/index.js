import createSagaMiddleware from 'redux-saga';
import { combineReducers, createStore, applyMiddleware } from 'redux';
import { createWrapper } from 'next-redux-wrapper';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootSaga from '../sagas';

import ReduxPersist from '../constants/ReduxPersist';

const reducers = combineReducers({
    config: require('./common/ConfigRedux').reducer,
    session: require('./common/SessionRedux').reducer,
    user: require('./user/UserRedux').reducer,
    role: require('./user/RoleRedux').reducer,
    contact: require('./contact/ContactRedux').reducer,
});

const makeConfiguredStore = (reducer) => {
    // 1: Create the middleware
    const sagaMiddleware = createSagaMiddleware();
    const { composeWithDevTools } = require('redux-devtools-extension')
    // 2: Add an extra parameter for applying middleware:
    const store = createStore(reducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));
    // 3: Run your sagas on server
    store.sagaTask = sagaMiddleware.run(rootSaga);
    // 4: now return the store:
    return store;
};

const makeStore = () => {
    const isServer = typeof window === 'undefined';
    if (isServer || !ReduxPersist.active) {
        return makeConfiguredStore(reducers);
    } else {
        // we need it only on client side
        const { persistStore, persistReducer } = require('redux-persist');
        const persistedReducer = persistReducer(ReduxPersist.storeConfig, reducers);
        const store = makeConfiguredStore(persistedReducer);
        store.__persistor = persistStore(store); // Nasty hack
        return store;
    }
};

export default createWrapper(makeStore, { debug: false });
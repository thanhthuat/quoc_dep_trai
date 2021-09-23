import immutablePersistenceTransform from '../services/ImmutablePersistenceTransform';
import storage from 'redux-persist/lib/storage'; // default: localStorage if web, AsyncStorage if react-native

const REDUX_PERSIST = {
	active: true,
	storeConfig: {
		storage,
		key: 'primary',
		blacklist: [],
		whitelist: ['config', 'session'],
		transforms: [immutablePersistenceTransform]
	}
};

export default REDUX_PERSIST;
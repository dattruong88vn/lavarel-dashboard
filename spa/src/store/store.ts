import {combineReducers, createStore} from 'redux';
import errorReducer from './reducers/errorReducer';
import i18nReducer from './reducers/i18nReducer';
import loadingReducer from './reducers/loadingReducer';

let rootReducer = combineReducers({
    error: errorReducer,
    lang: i18nReducer,
    loading: loadingReducer
});

export type StateInterface = ReturnType<typeof rootReducer>

export default createStore(rootReducer);

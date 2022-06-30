import { applyMiddleware, createStore } from 'redux';
import reducer from './reducers/index';
import thunk from 'redux-thunk';

const store = createStore(
    reducer,
    applyMiddleware(thunk)
  );

store.subscribe(() => {})

export default store;
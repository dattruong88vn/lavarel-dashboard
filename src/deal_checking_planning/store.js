import { applyMiddleware, createStore } from 'redux';
import reducer from './reducers/index';
import thunk from 'redux-thunk';

const store = createStore(
    reducer,
    applyMiddleware(thunk)
  );

store.subscribe(() => console.log(store.getState()))

export default store;
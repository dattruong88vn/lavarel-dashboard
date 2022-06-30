import { applyMiddleware, compose, createStore } from 'redux'
import reducer from './reducers/index'


function configureStore(preloadedState) {
  const store = createStore(reducer, preloadedState)
  return store;
}

var store = configureStore();
store.subscribe(() => {})

export default store;
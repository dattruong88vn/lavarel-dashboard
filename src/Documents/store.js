import { applyMiddleware, compose, createStore } from 'redux'
import reducer from './Reducers/Index'


function configureStore(preloadedState) {
  const store = createStore(reducer, preloadedState)
  return store;
}

var store = configureStore();
store.subscribe(() => console.log(store.getState()))

export default store;
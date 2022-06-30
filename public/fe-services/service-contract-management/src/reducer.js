import { combineReducers } from 'redux'
import listContractReducer from './containers/ListContract/listContractSlice';
import formContractSlice from './containers/FormContract/formContractSlice';

export default combineReducers({
    listContractReducer,
    formContractSlice
})
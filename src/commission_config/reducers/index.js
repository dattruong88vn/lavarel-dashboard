import {combineReducers} from 'redux';
import CommissionConfigListReducer from './CommissionConfigListReducer';
import CommissionConfigFormReducer from './CommissionConfigFormReducer';
export default combineReducers({
    CommissionConfigListReducer,
    CommissionConfigFormReducer
});
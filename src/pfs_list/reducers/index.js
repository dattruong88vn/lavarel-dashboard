import {combineReducers} from 'redux';
import PfsList from './PfsListReducer';
import ModalProcess from './ModalProcessProfileReducer';
import DropdownProgress from './DropdownProgressReducer';
import mortgageReducer from './../../mortgage/reducers/index';

export default combineReducers({
    PfsList,
    ModalProcess,
    DropdownProgress,
    mortgageReducer
});
import {combineReducers} from 'redux';
import ListBank from './ListBankReducer';
import ModalBank from './ModalBankReducer';
import ModalProfile from './ModalProfileReducer';

export default combineReducers({
    ListBank,
    ModalBank,
    ModalProfile
});
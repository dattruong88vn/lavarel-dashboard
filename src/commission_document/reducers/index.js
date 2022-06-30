import {combineReducers} from 'redux';
import DocumentList from './DocumentListReducer';
import DocumentForm from './DocumentFormReducer';

export default combineReducers({
    DocumentList,
    DocumentForm
});
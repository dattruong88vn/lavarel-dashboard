import { combineReducers } from 'redux';
import Filter from './Filter';
import Survey from './Survey';
import GoogleMap from './GoogleMap';
import Images from './Images';

export default combineReducers({
  Filter,
  Survey,
  GoogleMap,
  Images
});
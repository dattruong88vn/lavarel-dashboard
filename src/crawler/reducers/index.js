import {combineReducers} from 'redux';
import CrawlerFilter from './CrawlerFilterReducer';
import CrawlerData from './CrawlerDataReducer';
import CrawlerModal from './CrawlerModalReducer';

export default combineReducers({
    CrawlerFilter,
    CrawlerData,
    CrawlerModal
});
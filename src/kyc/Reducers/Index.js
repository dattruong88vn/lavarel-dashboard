import { combineReducers } from 'redux';
import Checking from "./Checking";
import HeaderStepReducer from "./HeaderStepReducer";
import LoanAdviceReducer from "./LoanAdviceReducer";
import LoanAdviceReducerNew from "./LoanAdviceReducerNew";
import ProductAdviceReducer from "./ProductAdviceReducer";
import BuyerExperienceReducer from "./BuyerExperienceReducer";
import CreateListingReducer from "./CreateListingReducer";
import MapReducer from "./MapReducer";

export default combineReducers({
    HeaderStepReducer,
    LoanAdviceReducer,
    LoanAdviceReducerNew,
    ProductAdviceReducer,
    BuyerExperienceReducer,
    CreateListingReducer,
    Checking,
    MapReducer
})
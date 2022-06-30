import React , {Fragment} from 'react';
import { connect } from 'react-redux';
import ComponentContent from "../Components/ProductAdvice";
import {
    fetchListRelatedListingThunk,
    fetchDetailListingThunk,
    getDetailListing,
    changeIndexListing,
    fetchUpdateFeedbackThunk,
    addBookTour,
    removeListingOutCollection,
    removeBookTour,
    setReminderThunk, fetchSendCheckEmpty,
    fetchListReasonDenyTourThunk,
    saveDenyTourThunk,
    fetchBookTourPermissionThunk
} from '../Actions/ProductAdviceActions';


const containerSection = ({ contentStored, headerStep, functionServices }) => {
    let params = (new URL(document.location)).searchParams;
    let dealId = params.get('dealId');
    if (hasValue(dealId)) {
        return (
            <ComponentContent contentStored={contentStored} headerStep={headerStep} functionServices={functionServices} />
        );
    } else {
        return (
            <div className="content-kyc"> Không có Deal Id</div>
        );
    }
};

const mapStateToProps = state => ({
    contentStored: state.ProductAdviceReducer,
    headerStep : state.HeaderStepReducer,
});
const mapDispatchToProps = dispatch => {
    return {
        functionServices : {
            saveDenyTour : (data = {}) => dispatch(saveDenyTourThunk(data)),
            fetchReasonDenyTour : () => dispatch(fetchListReasonDenyTourThunk()),
            fetchRelatedListing : (data = {}) => dispatch(fetchListRelatedListingThunk(data)),
            fetchDetailListing : (data = {}) => dispatch(fetchDetailListingThunk(data)),
            fetchBookTourPermission: (data = {}) => dispatch(fetchBookTourPermissionThunk(data)),
            onChangeIndexListing : (data) => {
                if (data == null || data == undefined) {
                    dispatch(changeIndexListing(null));
                    dispatch(getDetailListing({}));
                } else {
                    dispatch(changeIndexListing(data));
                }
            },
            onChangeFeedback : (data) => dispatch(fetchUpdateFeedbackThunk(data)),
            onRemoveListing :  (data) => dispatch(removeListingOutCollection(data)),
            onAddListingBookTour : (rlisting) => dispatch(addBookTour(rlisting)),
            onRemoveListingBookTour : (rlisting) => dispatch(removeBookTour(rlisting)),
            onSetReminder : (data) =>  dispatch(setReminderThunk(data)),
            onSendCheckEmpty : (data) => dispatch(fetchSendCheckEmpty(data)),
            btnReconfirm : (data) => {
                window.location.replace(`/kyc/buyer-confirm-requirements?dealId=${data.dealId}`);
            }
        }
    };
};
const ComponentContainer = connect(mapStateToProps,mapDispatchToProps)(containerSection);
export default ComponentContainer;

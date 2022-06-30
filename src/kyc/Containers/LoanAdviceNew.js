import React , {Fragment} from 'react';
import { connect } from 'react-redux';
import ComponentContent from "../Components/LoanAdviceNew";
import {
	fetchListRelatedListingThunk,
	changeIndexListing,
	getDetailListing,
	getLoanDemandInfo,
	calcLoanDemand,
	updateCurrentLoanInfo,
	changeCalcType,
} from '../Actions/LoanAdviceActionsNew';

const containerSection = ({ contentStored, headerStep, functionServices }) => {
    let params = (new URL(document.location)).searchParams;
    let dealId = params.get('dealId');
    if (hasValue(dealId)) {
        return (
            <>
            <ComponentContent contentStored={contentStored} headerStep={headerStep} functionServices={functionServices} />
            </>
        );
    } else {
        return (
            <div className="content-kyc"> Không có Deal Id</div>
        );
    }

};
const mapStateToProps = (state) => ({
	contentStored: state.LoanAdviceReducerNew,
	headerStep: state.HeaderStepReducer,
});
const mapDispatchToProps = (dispatch) => {
	return {
		functionServices: {
			fetchRelatedListing: (data = {}) =>
				dispatch(fetchListRelatedListingThunk(data)),
			onChangeIndexListing: (data) => {
				if (data == null || data == undefined) {
					dispatch(changeIndexListing(null));
					dispatch(getDetailListing({}));
				} else {
					dispatch(changeIndexListing(data.rlistingId));
					dispatch(getLoanDemandInfo(data));
				}
			},
			calcLoanDemand: (data) => {
				dispatch(calcLoanDemand(data));
			},
			updateCurrentLoanInfo: (data) => {
				dispatch(updateCurrentLoanInfo(data));
			},
			changeCalcType: (calcType) => {
				dispatch(changeCalcType(calcType));
			},
		},
	};
};
const ComponentContainer = connect(mapStateToProps,mapDispatchToProps)(containerSection);
export default ComponentContainer;

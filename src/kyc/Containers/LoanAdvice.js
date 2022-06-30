import React , {Fragment} from 'react';
import { connect } from 'react-redux';
import ComponentContent from "../Components/LoanAdvice";

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
    contentStored: state.LoanAdviceReducer,
    headerStep : state.HeaderStepReducer,
});
const mapDispatchToProps = dispatch => {
    return {
        functionServices : {}
    };
};
const ComponentContainer = connect(mapStateToProps,mapDispatchToProps)(containerSection);
export default ComponentContainer;

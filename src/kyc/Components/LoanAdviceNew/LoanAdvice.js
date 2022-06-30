import React, { Component, Fragment } from "react";
import { Route } from "react-router-dom";
import { connect } from 'react-redux';
import HeaderStep from './../../Containers/HeaderStep';
import StepBar from "./StepBar";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import { fetchInfo, getListingCart,
     baUpdateMortgageInfo, getCollateral } from './../../../ba_mortgage/actions/index'; 

class LoanAdvice extends Component {
    constructor(props) {
        super(props);
		this.state = {};
        this.handleChangeTab = this.handleChangeTab.bind(this);
        this.handleMoveToStepTwo = this.handleMoveToStepTwo.bind(this);
    }

    handleChangeTab(isClickHeader, callbackFromHeader) {
        callbackFromHeader(isClickHeader);
    }

    handleMoveToStepTwo() {
        this.refs.LoanAdviceStepOne.submitData(false, () => {})
    }

    render() {
        return (
            <div className="wrapper-kyc">
                <HeaderStep current={4} handleChangeTab={this.handleChangeTab}/>
                <div className="content-kyc">
                    <div className="box-kyc">
                        <div className="box-kyc-header">
                            <h1 className="heading">TƯ VẤN NHU CẦU VAY VỐN</h1>
                        </div>
                    </div>
                    <div className="box-kyc">
                        <StepBar handleMoveToStepTwo={this.handleMoveToStepTwo} />
                    </div>
                    <Route path="/kyc/loan-advice-step-one" exact>
                        <StepOne ref="LoanAdviceStepOne" handleChangeTabStepOne={this.handleChangeTabStepOne} totalStored={this.props} />
                    </Route>
                    <Route path="/kyc/loan-advice-step-two" exact>
                        <StepTwo contentStored={this.props.contentStored} functionServices={this.props.functionServices} />    
                    </Route>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        info : state.LoanAdviceReducerNew.ba_mortgage.info,
        listingCart : state.LoanAdviceReducerNew.ba_mortgage.listingCart
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchInfo: () => {
            dispatch(fetchInfo());
        },
        getListingCart: () => {
            dispatch(getListingCart());
        },
        baUpdateMortgageInfo:(dataPost) => {
            dispatch(baUpdateMortgageInfo(dataPost))
        },
        getCollateral:(dataPost) => {
            dispatch(getCollateral(dataPost))
        },
        dispatch:dispatch
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(LoanAdvice);
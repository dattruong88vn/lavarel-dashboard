import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import Buy from './Buy';
import Rent from './Rent';
import HeaderStep from './../../Containers/HeaderStep';

const styleClass = {
  display : 'none'
};
class BuyerExperience extends Component {

    constructor(props){
        super(props);        
        this.handleChangeTab = this.handleChangeTab.bind(this);
    }
    handleChangeTab(isClickHeader, callbackFromHeader) {
        const {customerHomeKyc, dealId} = this.props.headerStep;

        this.props.functionServices.onSaveStep(
            this.props.contentStored,
            1,
            {customerId : customerHomeKyc.customerId, dealId : dealId},
            isClickHeader, () => {
                hidePropzyLoading();
                callbackFromHeader(isClickHeader);
            }
        );
    }
   
    render() {
        const {customerHomeKyc, dealId} = this.props.headerStep;
        const contentStored = this.props.contentStored;
        return(
            <Fragment>
                <div className="wrapper-kyc">
                    <HeaderStep current={1} handleChangeTab={this.handleChangeTab}/>
                    <div className="content-kyc">
                        <Buy style={customerHomeKyc.listingTypeId == 1 ? {...styleClass, 'display' : 'block'} : styleClass}
                             contentStored={contentStored.buy}
                             dealId={dealId}
                             customerHomeKyc={customerHomeKyc}
                             functionServices={this.props.functionServices}
                        />
                        <Rent style={customerHomeKyc.listingTypeId == 2 ? {...styleClass, 'display' : 'block'} : styleClass}
                              contentStored={contentStored.rent}
                              dealId={dealId}
                              customerHomeKyc={customerHomeKyc}
                              functionServices={this.props.functionServices}/>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default connect()(React.memo(BuyerExperience));
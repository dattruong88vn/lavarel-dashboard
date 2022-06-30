import React, { Component } from "react";
import { connect } from 'react-redux'; 

class BuyerConfirmRequirementsHeader extends Component {
    render() {
        const listingTypeName = this.props.headerStep.customerHomeKyc.listingTypeId === 1 ? 'MUA' : 'THUÊ';
        return (
            <div className="box-kyc-header">
                <h1 className="heading">XÁC NHẬN NHU CẦU {listingTypeName}</h1>
                <div className="font15">Theo như thông tin từ trên Công Ty gửi xuống thì em có chọn ra một số căn phù hợp với tiêu chí của anh, tuy nhiên là không biết anh có thêm tiêu chí gì khác nữa không?</div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        headerStep: state.HeaderStepReducer
    }
};

export default connect(mapStateToProps, null)(BuyerConfirmRequirementsHeader);
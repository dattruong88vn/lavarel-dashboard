import React, {Component, Fragment} from "react";
import {withRouter, Link, Redirect} from "react-router-dom";
import ModalMortgageAdvise from './ModalMortgageAdvise';

class HelperKYC extends Component {
    constructor(props){
        super(props);        
        let urlParams = new URLSearchParams(window.location.search);
        let dealId = urlParams.get('dealId');
        this.state = {
            dealId: dealId != null ? parseInt(dealId) : null,
            isShowModalMortgage: false,
        }
    }

    handleShowMortgage () {
        this.setState({
            isShowModalMortgage: true
        })
    }

    render() {
        return(
            <div id="helper-kyc" className="dropup">
                <button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">
                    Trợ giúp
                </button>
                <ul className="dropdown-menu">
                    <li>
                        <Link to={'/kyc/product-advice?dealId='+ this.state.dealId}>
                            Tư vấn sản phẩm/ cho thuê
                        </Link>
                    </li>
                    <li><a onClick={this.handleShowMortgage.bind(this)} href={void(0)}>Tư vấn pháp lý</a></li>
                </ul>
                <ModalMortgageAdvise 
                    isShow={this.state.isShowModalMortgage} 
                    onHide={()=>{this.setState({isShowModalMortgage: false})}}
                />
            </div>
        )
    }
}

export default HelperKYC

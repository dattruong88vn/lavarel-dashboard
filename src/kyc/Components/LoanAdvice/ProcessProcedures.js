import React, { Component, Fragment } from 'react';
import {connect} from "react-redux";
import HeaderStep from './../../Containers/HeaderStep';
import {fetchDealDetail} from "../../Services/KycDeal";
import moment from "moment";
import {fetchDonePage} from "../../Services/KycCommons";

class ProcessProcedures extends Component {
    constructor(props) {
        super(props);
        let urlParams = new URLSearchParams(window.location.search);
        let dealId = urlParams.get('dealId');
        this.state = {
            dealId: dealId != null ? parseInt(dealId) : null,
            dealDetail: null
        }
        
        this.handleChangeTab = this.handleChangeTab.bind(this);
    }

    componentDidMount() {
        fetchDealDetail(this.state.dealId, (data)=>{
            this.setState({
                "dealDetail": data
            });
        });
        // finish done step
        fetchDonePage({
            dealId : this.state.dealId,
            kycItemId : 5
        });
    }
    

    handleAnswer() {
        let dealId = this.state.dealId;
        this.props.history.push("/kyc/extended-feedback?dealId=" + dealId);
    }

    handleBookTour() {
        let that = this;
        let detail = this.state.dealDetail;
        let dealId = this.state.dealId;

        let urlParams = new URLSearchParams(window.location.search);
        let listings = urlParams.get('listings');
        listings = listings != null ? listings.split("-").filter(it => it !== '' && it != null) : [];
        if(listings.length > 0) {
            $("#formMakeSchedule #customerId").val(detail.customerId);
            $("#formMakeSchedule #dealId").val(detail.dealId);
            $("#formMakeSchedule .customerName").html(detail.customers.name);
            $("#formMakeSchedule #whenDate").val(moment(new Date()).startOf("date").format("MM/DD/YYYY"));
            $('#formMakeSchedule #whenTime').timepicker({
                showMeridian: false,
                defaultTime: moment().format('HH:mm')
            });
            Schedule.showModalByListingIds({
                "listingIds": listings
            });
        } else {
            propzyNotifyAlert({type: "propzy-notify-warning", message : 'Kh??ng c?? listing ????? book tour'});
            setTimeout(() => {
                that.props.history.push("/kyc/product-advice?dealId=" + dealId);
            }, 3000);
        }
    }

    handleChangeTab(isClickHeader, callbackFromHeader) {
        callbackFromHeader(isClickHeader);
    }

    render() {
        return(
            <Fragment>
                <div className="wrapper-kyc">
                    <HeaderStep current={5} handleChangeTab={this.handleChangeTab}/>
                    <div className="content-kyc">
                        <div className="box-kyc">
                            <div className="box-kyc-header">
                                <div className="form-group box-title-process">
                                    <h1 className="heading text-uppercase">Quy tr??nh/ Th??? t???c/ Chi ph??</h1>
                                    <p>X??c ?????nh, ????nh gi?? kh??ch h??ng ???? hi???u r?? v??? quy tr??nh, th??? t???c v?? chi ph?? ch??a ?</p>
                                </div>
                            </div>
                            <div className="box-kyc-body">
                                <div className="form-group box-content-process">
                                    <p className="kyc-color-orange bold">1. Kh??ch h??ng ???? r??: </p>
                                    <p>N??u c??c ??i???m kh??c bi???t/ Offer c???a Propzy</p>
                                    <p>- Quy tr??nh kh??c bi???t so v???i b??n ngo??i</p>
                                    <p>-...</p>
                                    <p className="kyc-color-orange bold">2. Kh??ch h??ng ch??a r??: </p>
                                    <p>T?? v???n ?????y ????? quy tr??nh v?? th??? t???c</p>
                                </div>
                                <div className="form-group text-center mt15">
                                    <button className="btn btn-check-kyc btn-kyc-default mr10" onClick={this.handleBookTour.bind(this)}>?????t tour</button>
                                    <button className="btn btn-kyc-default kyc-bg-blue" onClick={this.handleAnswer.bind(this)}>C??u h???i m??? r???ng</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default connect()(React.memo(ProcessProcedures));
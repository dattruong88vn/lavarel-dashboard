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
            propzyNotifyAlert({type: "propzy-notify-warning", message : 'Không có listing để book tour'});
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
                                    <h1 className="heading text-uppercase">Quy trình/ Thủ tục/ Chi phí</h1>
                                    <p>Xác định, đánh giá khách hàng đã hiểu rõ về quy trình, thủ tục và chi phí chưa ?</p>
                                </div>
                            </div>
                            <div className="box-kyc-body">
                                <div className="form-group box-content-process">
                                    <p className="kyc-color-orange bold">1. Khách hàng đã rõ: </p>
                                    <p>Nêu các điểm khác biệt/ Offer của Propzy</p>
                                    <p>- Quy trình khác biệt so với bên ngoài</p>
                                    <p>-...</p>
                                    <p className="kyc-color-orange bold">2. Khách hàng chưa rõ: </p>
                                    <p>Tư vấn đầy đủ quy trình và thủ tục</p>
                                </div>
                                <div className="form-group text-center mt15">
                                    <button className="btn btn-check-kyc btn-kyc-default mr10" onClick={this.handleBookTour.bind(this)}>Đặt tour</button>
                                    <button className="btn btn-kyc-default kyc-bg-blue" onClick={this.handleAnswer.bind(this)}>Câu hỏi mở rộng</button>
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
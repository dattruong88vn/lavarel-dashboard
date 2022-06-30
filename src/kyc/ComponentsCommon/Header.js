import React, {Component, Fragment} from "react";
import {withRouter, Link, Redirect} from "react-router-dom";
import HelperKYC from './HelperKYC';

const STEP_IMAGES = {
    1: {
        icon: "/images/kyc/man@2x.png",
        url: "/kyc/buyer-experience"
    },
    2: {
        icon: "/images/kyc/curriculum@2x.png",
        url: "/kyc/buyer-confirm-requirements"
    },
    3: {
        icon: "/images/kyc/customerService@2x.png",
        url: "/kyc/product-advice"
    },
    4: {
        icon: "/images/kyc/dollarSymbol@2x.png",
        url: "/kyc/loan-advice-step-one"
    },
    5: {
        icon: "/images/kyc/bank@2x.png",
        url: "/kyc/process-procedures"
    },
    6: {
        icon: "/images/kyc/boss@2x.png",
        url: "/kyc/extended-feedback"
    }
};

class HeaderStep extends Component {
    constructor(props){
        super(props);        
        this.state = {
            isRedirect: false,
            url: '',
        }
    }

    componentDidMount() {
        let params = (new URL(document.location)).searchParams;
        let dealId = params.get('dealId');
        this.props.functionServices.onFetchInfoStep(dealId, this.props.callback);
    }

    iconClick(event, it, url){
        var thisObj = this;
        const {current, handleChangeTab} = this.props;
        const currentUrl = STEP_IMAGES[current].url;

        handleChangeTab(true, function(isClickHeader) {
            if (url.split('?')[0] != currentUrl) {
                if (isClickHeader) {
                    thisObj.setState({isRedirect: true, url: url});
                }
            }
        });
        
    }

    render() {
        const {customerHomeKyc, kycHomeResult, dealId, scoreCardType} = this.props.contentStored;
        const {current} = this.props;

        if (this.state.isRedirect) {
            return <Redirect to={this.state.url} />
        }

        const steps = kycHomeResult.kycHomeChannelTypes.map(it => {
            let className = '';
            if (it.isDone) {
                className = 'checked';
            }
            if (it.channelTypeId == current) {
                className = it.isDone ? 'current done' : 'current';
            }
            var url = STEP_IMAGES[it.channelTypeId] ? STEP_IMAGES[it.channelTypeId].url+"?dealId="+deal.dealId : "#";
            return (
                <li key={it.channelTypeId} className={className}>
                    <a href={void(0)} onClick={this.iconClick.bind(this, event, STEP_IMAGES[it.channelTypeId], url)} >
                        <div className={it.channelTypeId == 1 ? "icon-fst" : "icon"}>
                            <img src={STEP_IMAGES[it.channelTypeId] && STEP_IMAGES[it.channelTypeId].icon} />
                        </div><div className="text">{it.channelTypeName}</div>
                    </a>
                </li>
            )
        });
        const percent = (kycHomeResult.score);
        const colorPercent = kycHomeResult.score < 50 ? "progress-bar-red" : kycHomeResult.score == 50 || kycHomeResult.score <= 80 ? "progress-bar-yellow" : "progress-bar-green";
        return(
            <div className="header-kyc">
                <HelperKYC />
                <div className="navbar navbar-header-step">
                    <div className="col-lg-2 col-md-2 col-sm-12">
                        <div className="logo">
                            <a href="/kyc/checking"><img src="/images/kyc/logo.png" alt="KYC"/></a>
                        </div>
                    </div>
                    <div className="col-lg-10 col-md-10 col-sm-12 p0">
                        <ul className="kyc-step">
                            {steps}
                        </ul>
                    </div>
                </div>
                <div className="navbar navbar-header-info">
                    <div className="col-lg-3 col-md-3 col-sm-6">
                        <p><label className="control-label">{customerHomeKyc.listingTypeId == 1 ? 'Khách mua' : 'Khách thuê'}:</label> <span>{customerHomeKyc.customerName ? customerHomeKyc.customerName  : 'N/a'}</span></p>
                        <p><label className="control-label">Thời gian:</label> <span>{customerHomeKyc.createdDate ? moment(customerHomeKyc.createdDate).format('HH:mm - DD/MM/YYYY')  : 'N/a'}</span></p>
                        <p>
                            <label className="control-label">Nhãn: </label>
                            { scoreCardType == 'L0' || scoreCardType == 'L1' ? <span className="label label-danger">{scoreCardType}</span> 
                            : scoreCardType == 'M1' || scoreCardType == 'M2' ? <span className="label label-warning">{scoreCardType}</span>
                            : scoreCardType == 'H1' || scoreCardType == 'H2' ?  <span className="label label-success">{scoreCardType}</span> 
                            : '' }
                        </p>

                    </div>
                    <div className="col-lg-3 col-md-3 col-sm-6">
                        <p><label className="control-label">Lead ID:</label> <span>{customerHomeKyc.leadId ? customerHomeKyc.leadId  : 'N/a'}</span></p>
                        <p><label className="control-label">TM:</label> <span>{customerHomeKyc.tmName ? customerHomeKyc.tmName  : 'N/a'}</span></p>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                        <div className="progress-group">
                            <span className="progress-number"><b>{percent} %</b></span>
                            <div className="progress lg progress-striped">
                                <div className={"progress-bar"} style={{"width": `${percent}%`}}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(HeaderStep)

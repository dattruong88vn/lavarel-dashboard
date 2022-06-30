import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import YesBefore from "./YesBefore";
import NoBefore from "./NoBefore";

const styleClass = {
    padding: '10px 30px',
    display : 'none'
};
class Buy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            autoSave : false
        };
        this.onChangeExperience = this.onChangeExperience.bind(this);
        this.onClickSave = this.onClickSave.bind(this);
    }
    onClickSave(e) {
        //window.location.replace(`/kyc/buyer-confirm-requirements?dealId=${this.props.dealId}`);
        this.props.functionServices.onSaveStep(
            this.props.contentStored,
            1,
            {customerId : this.props.customerHomeKyc.customerId, dealId : dealId},
            false,
            ()=> {}
        );
    }
    onChangeExperience = (isExperience) => e =>{
        this.props.functionServices.onChangeExperience(isExperience, 1);

        if (isExperience &&  this.props.contentStored.yesExperience.list == 0) {
            this.props.functionServices.onFetchContentPage(1, 1, {customerId : this.props.customerHomeKyc.customerId, dealId: dealId});
        }
    };
    componentWillReceiveProps(nextProps, nextContext) {
        /*if (this.state.autoSave) {
            this.setState({autoSave : false});
            setTimeout(() => {
                this.props.functionServices.onSaveStep(
                    this.props.contentStored,
                    1,
                    {customerId : this.props.customerHomeKyc.customerId, dealId : dealId, isDraff : true});
                this.setState({autoSave : true});
            }, 5000)// 5s
        }*/
    }

    componentDidMount() {
        this.setState({autoSave : true});
        this.props.functionServices.onFetchContentPage(1, 1, {customerId : this.props.customerHomeKyc.customerId, dealId: dealId});
    }
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (nextProps.customerHomeKyc.customerId !== this.props.customerHomeKyc.customerId) {
            this.props.functionServices.onFetchContentPage(1, 1, {customerId : nextProps.customerHomeKyc.customerId, dealId: dealId});
        }
        return true;
    }

    render() {
        const {isExperience} = this.props.contentStored;
        return(
            <div  style={this.props.style ? this.props.style : {}}  className="box-kyc">
                <div className="box-kyc-header">
                    <h1 className="heading">KINH NGHIỆM MUA NHÀ</h1>
                    <p className='decs'>Anh chị đã từng mua nhà hay tìm nhà trước đây ?</p>
                </div>
                <div className="box-kyc-body">
                    <div className="row">
                        <div className="col-sm-3">
                            <div className="need-radio">
                                <input id="buy-experience-yes" type="radio" className="need-radio-input" name="buy-experience" checked={isExperience} onChange={this.onChangeExperience(true)}/>
                                <label htmlFor="buy-experience-yes" className="need-radio-label">Đã từng</label>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <div className="need-radio">
                                <input id="buy-experience-no" type="radio"  className="need-radio-input" name="buy-experience" checked={!isExperience} onChange={this.onChangeExperience(false)}/>
                                <label htmlFor="buy-experience-no" className="need-radio-label">Chưa từng</label>
                            </div>
                        </div>
                    </div>
                    <NoBefore  style={!isExperience ? {...styleClass,'display' : 'block'} : styleClass}/>
                    <YesBefore style={isExperience  ? {...styleClass,'display' : 'block'} : styleClass}
                               infoBuy={this.props.contentStored.yesExperience}
                               functionServices={this.props.functionServices}
                    />
                    <div className="row form-group">
                        <div className="col-md-12 text-center">
                            <button className="btn btn-kyc" onClick={this.onClickSave}>Lưu & Tiếp Tục</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect()(React.memo(Buy));
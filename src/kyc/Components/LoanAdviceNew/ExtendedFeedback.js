import React, { Component, Fragment } from 'react';
import {connect} from "react-redux";
import HeaderStep from '../../Containers/HeaderStep';
import * as actions from '../../Actions/LoanAdviceActionsNew';

class ExtendedFeedback extends Component {
    constructor(props) {
        super(props);
        let urlParams = new URLSearchParams(window.location.search);
        let dealId = urlParams.get('dealId');
        this.props.onLoanAdviceSetDataPost({dealId: dealId != null ? parseInt(dealId) : null});
        this.state = {
            dealId: dealId != null ? parseInt(dealId) : null,
            showEmployeeNumber: false,
            showRelationship: false
        };
        
        this.handleChangeTab = this.handleChangeTab.bind(this);
    }

    handleChangeInput(event) {
        let dataPost = {};
        let target = event.target;
        let name = target.name;
        let value = target.value;
        dataPost[name] = value;
        this.props.onLoanAdviceSetDataPost(dataPost);
    }

    handleCreateFeedback() {
        let that = this;
        showPropzyConfirm({
            title: 'Thông báo',
            message: 'Bạn có chắc chắn muốn kết thúc deal?',
            btn: {
                yes: {
                    text: "Có",
                },
                no: {
                    text: "Không"
                }
            },
            okCallback: function () {
                let dataPost = that.props.loan.postData;
                dataPost.dealId = that.state.dealId;
                that.props.onCreateFeedback(dataPost);
            },
            cancelCallback: function () {}
        });
        this.props.onLoanAdviceResetDataPost();
    }

    handleShowEmployeeNumber() {
        this.setState({
            showEmployeeNumber: !this.state.showEmployeeNumber
        })
    }

    handleShowRelationship() {
        this.setState({
            showRelationship: !this.state.showRelationship
        })
    }

    handleAddKyc() {
        let dealId = this.state.dealId;
        this.props.history.push("/kyc/buyer-confirm-requirements?dealId=" + dealId);
    }

    handleChangeTab(isClickHeader, callbackFromHeader) {
        callbackFromHeader(isClickHeader);
    }

    render() {
        let {postData} = this.props.loan;
        return (
            <Fragment>
                <div className="wrapper-kyc">
                    <HeaderStep current={6} handleChangeTab={this.handleChangeTab}/>
                    <div className="content-kyc">
                        <div className="box-kyc">
                            <div className="box-kyc-header">
                                <div className="form-group box-title-process">
                                    <h1 className="heading text-uppercase">Phản hồi/ Mở rộng/ Giới thiệu</h1>
                                </div>
                            </div>
                            <div className="box-kyc-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <button className="btn btn-kyc-default kyc-bg-blue btn-kyc-feedback" onClick={this.handleAddKyc.bind(this)}>KYC mở rộng <span className="fa fa-angle-right"></span></button>
                                        </div>
                                        <div className="form-group">
                                            <button className="btn btn-kyc-default kyc-bg-blue btn-kyc-feedback">Mã nhân viên giới thiệu {this.state.showEmployeeNumber == false && <span className="fa fa-angle-right"></span>}{this.state.showEmployeeNumber == true && <span className="fa fa-angle-down"></span>}</button>
                                        </div>
                                        <div className="form-group">
                                            <input type="text" className="form-control" name="employeeNumber" value={postData.employeeNumber} placeholder="Mã giới thiệu" onChange={this.handleChangeInput.bind(this)}/>
                                        </div>
                                        <div className="form-group">
                                            <button className="btn btn-kyc-default kyc-bg-blue btn-kyc-feedback">Tạo dựng mối quan hệ {this.state.showRelationship == false && <span className="fa fa-angle-right"></span>}{this.state.showRelationship == true && <span className="fa fa-angle-down"></span>}</button>
                                        </div>
                                        <div className="form-group">
                                            <textarea rows="5" className="form-control" name="hobby" value={postData.hobby} placeholder="Sở thích cá nhân" onChange={this.handleChangeInput.bind(this)}></textarea>
                                        </div>
                                        <div className="form-group">
                                            <textarea rows="5" className="form-control" name="otherHobby" value={postData.otherHobby} placeholder="Khác" onChange={this.handleChangeInput.bind(this)}></textarea>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="form-group text-center mt15">
                                            <button className="btn btn-check-kyc btn-kyc-default mr10" onClick={this.handleCreateFeedback.bind(this)}>Kết thúc</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}
const mapStateToProps = state => {
    return {
        loan: state.LoanAdviceReducer
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onLoanAdviceSetDataPost: (data) => {
            dispatch(actions.actLoanAdviceSetDataPost(data));
        },
        onLoanAdviceResetDataPost: () => {
            dispatch(actions.actLoanAdviceResetDataPost());
        },
        onCreateFeedback: (data) => {
            dispatch(actions.actCreateFeedback(data));
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(ExtendedFeedback));
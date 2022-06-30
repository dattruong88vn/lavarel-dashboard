import React, { Component } from 'react';
import {connect} from "react-redux";
import {InputText} from "../../commonComponents/input/InputLabel";

class TrackingVisitor extends Component {
    checkInfoTracking () {
        let {dispatch} = this.props;
        let dataName = this.props.tracking.postData.name;
        let dataPhone = this.props.tracking.postData.phone;
        let dataEmail = this.props.tracking.postData.email;
        if (dataName == null || dataName.length == 0) {
            showPropzyAlert("Vui lòng nhập tên");
            return false;
        }
        if (dataPhone == null || dataPhone.length == 0) {
            showPropzyAlert("Vui lòng nhập số điện thoại");
            return false;
        }
        let postData = {name: dataName, phone: dataPhone, email: dataEmail};
        showPropzyLoading();
        $.ajax({
            url: "/tracking-visitor/get-info-by-phone",
            type: "post",
            data: JSON.stringify(postData)
        }).done(function (response) {
            let dataOwners = [];
            let dataCustomers = [];
            let dataAgents = [];
            let dataVisitors = [];
            if (response.result) {
                let resData = response.data;
                postData.customerId = resData.customerId;
                postData.socialUid = resData.socialUid;
                dataOwners = resData.owners;
                dataCustomers = resData.customers;
                dataAgents = resData.agents;
                dataVisitors = resData.visitors;
            } 
            dispatch({type:'SET_DATA_TABLE_OWNER', data: dataOwners});
            dispatch({type:'SET_DATA_TABLE_CUSTOMER', data: dataCustomers});
            dispatch({type:'SET_DATA_TABLE_AGENT', data: dataAgents});
            dispatch({type:'SET_DATA_TABLE_VISITOR', data: dataVisitors});
            dispatch({type:'SET_DATA_POST', data: postData});
            dispatch({type:'SET_SHOW_MODAL_INFO_TRACKING', data: true});
        }).always(function () {
            hidePropzyLoading();
        });
    }

    formatPhoneNumber ($number) {
        let _value = '';
        if($number) {
            const newValue = $number.split('').filter(it => {
                const __value = Number.parseInt(it);
                return (__value >= 0 ? String(__value) : null );
            });
    
            if(newValue[0] != "0") {
                // number 1 is a 0
                _value = '';
            } else if (newValue.length > 11) {
                newValue.length = 11;
                _value = newValue.join("");
            } else if (newValue.length > 1 && newValue[1] == "0") {
                // number 2 not is 0 (00)
                newValue.length = 1;
                _value = newValue.join("");
            } else {
                _value = newValue.join("");
            }
        }
        return _value;
    }

    inputChange (event) {
        let {dispatch} = this.props;
        let data = {};
        data[event.target.name] = event.target.value;
        if (event.target.name === "phone") {
            data[event.target.name] = this.formatPhoneNumber(event.target.value);
        }
        dispatch({type:'SET_DATA_POST', data: data});
    }

    render() {
        return (
            <div className="row tracking-visitor">
                <div className="col-md-12">
                    <div className="box box-primary">
                        <div className="box-header with-border">
                            <h3 className="box-title">Thông tin khách hàng</h3>
                        </div>
                        <div className="box-body">
                            <div className="form-group col-md-12">
                                <div className="row">
                                    <div className="col-md-4">
                                        <label className="control-label col-md-12" htmlFor="txtName">Tên <span style={{color:'red'}}>*</span></label>
                                        <div className="col-md-12">
                                            <input id="txtName" name="name" type="text" className="form-control" 
                                            value={this.props.tracking.postData.name ? this.props.tracking.postData.name : ''}
                                            onChange={(e) => this.inputChange(e)}/>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <label className="control-label col-md-12" htmlFor="txtPhone">SĐT <span style={{color:'red'}}>*</span></label>
                                        <div className="col-md-12">
                                            <input id="txtPhone" name="phone" type="text" className="form-control" 
                                            value={this.props.tracking.postData.phone ? this.props.tracking.postData.phone : ''}
                                            onChange={(e) => this.inputChange(e)}/>
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <InputText
                                            id="txtEmail"
                                            name="email"
                                            label="Email"
                                            value={this.props.tracking.postData.email}
                                            onChange={(e) => this.inputChange(e)}/>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group col-md-12" style={{textAlign: 'right'}}>
                                <button className="btn btn-primary" onClick={() => this.checkInfoTracking()}>Kiểm tra</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(function (state) {
    return {
        tracking : state.Tracking
    }
})(TrackingVisitor);
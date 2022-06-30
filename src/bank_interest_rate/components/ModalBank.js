import React, { Component } from 'react';
import {Modal} from 'react-bootstrap';
import Select from 'react-select';

class ModalBank extends Component {

    constructor(props) {
        super(props);
        this._STORED_LOCAL = {
            defaultValue : {value : '', label: "--- Vui lòng chọn ---"}
        };
    }

    handleChangeSelect($feild, $option) {
        let that = this;
        let value = {};
        value[$feild] = $option;
        let data = {};
        data[$feild] = $option.value != '' ? $option.label : '';
        that.props.setFilterSelectBank(value, data);
    }

    render() {
        return (
            <Modal show={this.props.banks.showHideModalBank} backdrop="static" onHide={this.props.handleCloseModalBank.bind(this)}>
                <Modal.Header closeButton>
                    <Modal.Title>Thông tin ngân hàng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <label>Tên ngân hàng <span className="text-danger">*</span></label>
                        <Select value={this.props.banks.filterSelectBank.name ? this.props.banks.filterSelectBank.name : this._STORED_LOCAL.defaultValue}
                            options={this.props.banks.listSelectBank}
                            onChange={this.handleChangeSelect.bind(this, 'name')} isDisabled={this.props.banks.postData.bankId}/>
                    </div>
                    <div className="form-group">
                        <label>Lãi suất 1 <span className="text-danger">*</span></label>
                        <input name="interestRate1" type="text" value={this.props.banks.postData.interestRate1 ? this.props.banks.postData.interestRate1 : ''} className="form-control" onChange={this.props.inputChange.bind(this)}/>
                    </div>
                    <div className="form-group">
                        <label>Lãi suất 2</label>
                        <input name="interestRate2" type="text" value={this.props.banks.postData.interestRate2 ? this.props.banks.postData.interestRate2 : ''} className="form-control" onChange={this.props.inputChange.bind(this)}/>
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-md-4">
                                <label>Tỷ lệ vay <span className="text-danger">*</span></label>
                                <input name="loanRate" type="text" value={this.props.banks.postData.loanRate ? this.props.banks.postData.loanRate : ''} className="form-control" onChange={this.props.inputChange.bind(this)}/>
                            </div>
                            <div className="col-md-4">
                                <label>Thời hạn vay tối đa <span className="text-danger">*</span></label>
                                <input name="maxLoanTerm" type="text" value={this.props.banks.postData.maxLoanTerm ? this.props.banks.postData.maxLoanTerm : ''} className="form-control" onChange={this.props.inputChange.bind(this)}/>
                            </div>
                            <div className="col-md-4">
                                <label>Phí trả nợ trước hạn <span className="text-danger">*</span></label>
                                <input name="earlyRepaymentFee" type="text" value={this.props.banks.postData.earlyRepaymentFee ? this.props.banks.postData.earlyRepaymentFee : ''} className="form-control" onChange={this.props.inputChange.bind(this)}/>
                            </div>
                        </div>
                    </div>
                    {this.props.valid.isShow && <div className="form-group"><p className="text-danger">{this.props.valid.message}</p></div>}
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-primary" onClick={this.props.handleSaveBank.bind(this)}>Lưu</button>
                    <button className="btn btn-default" onClick={this.props.handleCloseModalBank.bind(this)}>Thoát</button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default ModalBank;
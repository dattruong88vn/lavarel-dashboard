import React, { Component } from 'react';
import {Modal} from 'react-bootstrap';
import Select from 'react-select';
import Checkbox from './../../commonComponents/input/checkboxLabel';

class ModalProcessProfile extends Component {
    constructor(props) {
        super(props);
        this._STORED_LOCAL = {
            defaultValue : {value : '', label: "--- Vui lòng chọn ---"}
        };
    }

    renderBodyTable() {
        let data = this.props.pp.dataTableBank;
        let render = data.map((item, index) => {
            return <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.interestRate1}</td>
                    <td>{item.maxLoanTerm}</td>
                    <td>{item.earlyRepaymentFee}</td>
                    <td>
                        <button type="button" className="btn btn-danger" 
                            onClick={this.props.handleDeleteBank.bind(this, item)}>Xóa</button>
                    </td>
                </tr>
        });
        return render;
    }
    
    render() {
        return (
            <Modal id={"modal-pp"} show={this.props.pp.showHideModalPP} backdrop="static" onHide={this.props.handleCloseModalPP.bind(this)}>
                <Modal.Header closeButton>
                    <Modal.Title>Xử lý hồ sơ vay</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.props.pp.postData.isSatisfactory && <div>
                        <div className="form-group">
                            <table id={"table-bank-pp"} className={"table table-bordered table-striped dataTable"}>
                                <thead>
                                    <tr>
                                        <th>Tên ngân hàng</th>
                                        <th>Lãi suất 1</th>
                                        <th>Thời hạn vay tối đa</th>
                                        <th>Phí trả nợ trước hẹn</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderBodyTable()}
                                </tbody>
                            </table>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-md-6">
                                    <label>Chọn ngân hàng </label>
                                    <Select
                                        value={this.props.pp.filterSelect.bank ? this.props.pp.filterSelect.bank : this._STORED_LOCAL.defaultValue}
                                        options={this.props.pp.listDataBank}
                                        onChange={this.props.handleChangeSelect.bind(this, 'bank')}/>
                                </div>
                                <div className="col-md-6">
                                    <button className="btn btn-primary mt-25" onClick={this.props.handleAddBank.bind(this)}>Thêm</button>
                                </div>
                            </div>
                        </div>
                    </div>}
                    
                    <div className="form-group">
                        <div className="checkbox">
                            <label className="checkbox-inline">
                                <Checkbox name="isSatisfactory" onChange={this.props.inputChange.bind(this)} checked={!this.props.pp.postData.isSatisfactory} />
                                Không đủ điều kiện vay
                            </label>
                        </div>
                    </div>
                    <div className="form-group">
                        <textarea className="form-control" name="note" value={this.props.pp.postData.note} onChange={this.props.inputChange.bind(this)} placeholder="Ghi chú"></textarea>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-primary" onClick={this.props.handleSendProcessProfile.bind(this)}>Hoàn thành</button>
                    <button className="btn btn-default" onClick={this.props.handleCloseModalPP.bind(this)}>Thoát</button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default ModalProcessProfile;
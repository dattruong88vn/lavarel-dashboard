import React, { Component, Fragment } from 'react';
import {Modal} from 'react-bootstrap';
import Select from 'react-select';

class ModalCardType extends Component {
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
        data[$feild] = $option.value;
        this.props.setDisableSave($option.value != '' ? false : true)
        that.props.setSelectCardType(value, data);
    }
    render() {
        let {disableSave} = this.props.card;
        return (
            <Fragment>
                <p><strong>Nhãn</strong> <a onClick={this.props.handleShowModalCardType.bind(this)} href="javascript:void(0);">Thay nhãn</a></p>
                <Modal show={this.props.card.showHideModalCardType} backdrop="static" onHide={this.props.handleCloseModalCardType.bind(this)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Thay nhãn</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="form-group">
                            <label>Nhãn</label>
                            <Select value={this.props.card.selectCardType.scorecardType ? this.props.card.selectCardType.scorecardType : this._STORED_LOCAL.defaultValue}
                                options={this.props.card.listSelectCardType}
                                onChange={this.handleChangeSelect.bind(this, 'scorecardType')}/>
                        </div>
                        <div className="form-group">
                            <label>Nội dung thay đổi (<span className="text-danger">*</span>)</label>
                            <textarea col="3" name="description" value={this.props.card.postData.description ? this.props.card.postData.description : ''} className="form-control" onChange={this.props.inputChange.bind(this)}></textarea>
                        </div>
                        {this.props.valid.isShow && <div className="form-group"><p className="text-danger">{this.props.valid.message}</p></div>}
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-primary" disabled={disableSave} onClick={this.props.handleSubmit.bind(this)}>Lưu</button>
                        <button className="btn btn-default" onClick={this.props.handleCloseModalCardType.bind(this)}>Thoát</button>
                    </Modal.Footer>
                </Modal>
            </Fragment>
        );
    }
}

export default ModalCardType;
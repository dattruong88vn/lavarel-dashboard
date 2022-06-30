import React, { Component } from 'react';
import {Modal, Button} from 'react-bootstrap';
import {connect} from "react-redux";
import Select from 'react-select';

class ModalSendMail extends Component {

    handleCloseSendMail () {
        const {dispatch} = this.props;
        dispatch({type:'SET_SHOW_SEND_MAIL', data: false});
        dispatch({type:'SET_SELECT_EMAIL', data: null});
        dispatch({type:'SET_DATA_SEND_MAIL', data: {data: null, tos: null, subject: null}});
    }

    handleChangeSelectStudent(selectedOption) {
        const {dispatch} = this.props;
        dispatch({type:'SET_SELECT_EMAIL', data: selectedOption});
        let arrEmail = [];
        for (let item of selectedOption) {
            if (item.email!=null) {
                arrEmail.push(item.email);
            }
        }
        dispatch({type:'SET_DATA_SEND_MAIL', data: {tos: arrEmail}});
    }

    sendEmail () {
        const that = this;
        let data = this.props.filter.filterSelect.emails;
        let subject = this.props.filter.postDataSendMail.subject;
        let content = this.props.filter.postDataSendMail.data;
        if (data != null && data.length > 0) {
            let noEmailStudents = data.filter(function(s){
                return s.email==null;
            });
            if(subject == null || subject.length == 0) {
                showPropzyAlert("Vui lòng nhập tiêu đề");
                return false;
            }
            if(content == null || content[0].length == 0) {
                showPropzyAlert("Vui lòng nhập nội dung");
                return false;
            }
            if(noEmailStudents.length>0){
                if (data.length === noEmailStudents.length) {
                    showPropzyAlert("Các sinh viên bạn vừa chọn không có email.");
                } else {
                    let arrEmail = [];
                    for (let item of noEmailStudents) {
                        arrEmail.push(item.label);
                    }
                    ModalConfirm.showModal({
                        message: "Có 1 vài sinh viên không có email. Các sinh viên sau đây không có email: " + arrEmail.toString() + ". Bạn có muốn gửi email cho những sinh viên còn lại ?",
                        onYes: function (modal) {
                            that.submitSendMail();
                        },
                        onNo: function (modal) {
                        }
                    });
                }
            } else {
                that.submitSendMail();
            }
        } else {
            showPropzyAlert("Vui lòng chọn người nhận");
        }
    }

    submitSendMail () {
        showPropzyLoading();
        const that = this;
        $.ajax({
            "url": "/student-survey/send-mail",
            "type": "POST",
            "data": JSON.stringify(this.props.filter.postDataSendMail)
        }).done(function (response) {
            showPropzyAlert(response.message);
            that.handleCloseSendMail();
        }).always(function () {
            hidePropzyLoading();
        });
    }

    inputChange (event) {
        let {dispatch} = this.props;
        let data = {};
        data[event.target.name] = event.target.value;
        if (event.target.name === "data") {
            data[event.target.name] = [event.target.value];
        }
        dispatch({type:'SET_DATA_SEND_MAIL', data: data});
    }

    render() {
        return (
            <Modal show={this.props.filter.showModalSendMail} backdrop="static" onHide={() => this.handleCloseSendMail()}>
                <Modal.Header closeButton>
                    <Modal.Title>Gửi Email</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <label>Gửi tới</label>
                        <Select
                            isMulti = {true} 
                            value={this.props.filter.filterSelect.emails}
                            options={this.props.filter.studentList}
                            onChange={this.handleChangeSelectStudent.bind(this)}
                        />
                    </div>
                    <div className="form-group">
                        <label>Tiêu đề</label>
                        <input name="subject" type="text" className="form-control" onChange={(e) => this.inputChange(e)}/>
                    </div>
                    <div className="form-group">
                        <label>Nội dung</label>
                        <textarea name="data" rows={4} className="form-control" onChange={(e) => this.inputChange(e)} />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button id="btnSendEmail" variant="success" className="btn-success" onClick={() => this.sendEmail()}>Gửi</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default connect(function (state) {
    return {
        filter : state.Filter
    }
})(ModalSendMail);
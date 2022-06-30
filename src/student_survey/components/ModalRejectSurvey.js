import React, { Component } from 'react';
import {Modal, Button} from 'react-bootstrap';
import {connect} from "react-redux";
import Select from 'react-select';

class ModalRejectSurvey extends Component {
    handleClose() {
        const {dispatch} = this.props;
        dispatch({type:'SET_SHOW_REJECT', data: false});
        dispatch({type:'SET_DATA_REVIEW_SURVEY', data: {surveyId: null, reasonId: null, note: null, isSendEmail: null, isReject: null, mail: null}});
    }

    handleChangeSelectReject(selectedOption) {
        const {dispatch} = this.props;
        dispatch({type:'SET_DATA_REVIEW_SURVEY', data: {reasonId: selectedOption.value}});
    }

    renderReasonReject () {
        if (this.props.filter.postDataReviewSurvey.reasonId && 
            parseInt(this.props.filter.postDataReviewSurvey.reasonId) === 103) {
            return  <div className="form-group">
                        <label>Lý do khác</label>
                        <textarea name="note" rows={4} className="form-control" onChange={(e) => this.inputChange(e)} />
                    </div>
        }
    }

    inputChange (event) {
        let {dispatch} = this.props;
        dispatch({type:'SET_DATA_REVIEW_SURVEY', data: {note: event.target.value}});
    }

    submitReviewSurvey ($data) {
        showPropzyLoading();
        const that = this;
        $.ajax({
            "url": "/student-survey/review-survey",
            "type": "POST",
            "data": JSON.stringify($data)
        }).done(function (response) {
            showPropzyAlert(response.message);
            if(response.result){
                let {survey} = that.props;
                if (survey.table) {
                    survey.table.ajax.reload();
                } else {
                    console.error("The table is not init");
                }
            }
            that.handleClose();
        }).always(function () {
            hidePropzyLoading();
        });
    }

    btnSave () {
        let {dispatch} = this.props;
        let reason = this.props.filter.postDataReviewSurvey.reasonId;
        let note = this.props.filter.postDataReviewSurvey.note;
        let result = 0;
        if (reason) {
            if(parseInt(reason) === 103 && !note) {
                showPropzyAlert("Vui lòng nhập lý do khác");
                return false;
            }
            let postData = this.props.filter.postDataReviewSurvey;
            postData.isSendEmail = false; 
            postData.isReject = true;
            this.submitReviewSurvey(postData);
            result = 1;
            dispatch({type:'SET_DATA_REVIEW_SURVEY', data: postData});
        } else {
            showPropzyAlert("Vui lòng chọn lý do từ chối");
        }
        return result;
    }

    btnSaveAndSendMail () {
        let {dispatch} = this.props;
        const that = this;
        let result = this.btnSave();
        if(result === 1) {
            dispatch({type:'SET_SHOW_SEND_MAIL', data: true});
            dispatch({type:'SET_SELECT_EMAIL', data: null});
            $.ajax({
                url: "/student-survey/get-list-student",
                dataType: 'json',
                type: "post",
                data: JSON.stringify(this.props.filter.postData)
            }).done(function(response){
                if (response.data) {
                    var result = $.map(response.data, function (x) {
                        return {
                            value: x.userId,
                            label: x.name,
                            email: x.email
                        };
                    });
                    dispatch({type:'SET_STUDENTS_LIST', data: result});
                    let user = result.find(x => x.value === parseInt(that.props.filter.filterSelect.userReject));
                    if (user) {
                        dispatch({type:'SET_SELECT_EMAIL', data: [user]});
                    }
                }
            });
        }
    }

    render() {
        return (
            <Modal show={this.props.filter.showModalReject} backdrop="static" onHide={() => this.handleClose()}>
                <Modal.Header closeButton>
                    <Modal.Title>Từ chối</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <label>Lý do từ chối</label>
                        <Select
                            options={this.props.filter.rejectSurveyList}
                            onChange={this.handleChangeSelectReject.bind(this)}
                        />
                    </div>
                    {this.renderReasonReject()}
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn-modal btn-success" onClick={() => this.btnSave()}>Lưu</Button>
                    <Button className="btn-modal btn-success" onClick={() => this.btnSaveAndSendMail()}>Lưu và gửi email</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default connect(function (state) {
    return {
        filter : state.Filter,
        survey: state.Survey,
        googleMap : state.GoogleMap
    }
})(ModalRejectSurvey);
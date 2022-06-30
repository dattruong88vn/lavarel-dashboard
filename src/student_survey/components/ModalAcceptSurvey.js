import React, { Component } from 'react';
import {Modal, Button} from 'react-bootstrap';
import {connect} from "react-redux";

class ModalAcceptSurvey extends Component {
    handleClose() {
        const {dispatch} = this.props;
        dispatch({type:'SET_SHOW_ACCEPT', data: false});
        dispatch({type:'SET_DATA_REVIEW_SURVEY', data: {surveyId: null, reasonId: null, note: null, isSendEmail: null, isReject: null, mail: null}});
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
        let note = this.props.filter.postDataReviewSurvey.note;
        let postData = this.props.filter.postDataReviewSurvey;
        postData.note = note;
        postData.isSendEmail = false; 
        postData.isReject = false;
        this.submitReviewSurvey(postData);
        dispatch({type:'SET_DATA_REVIEW_SURVEY', data: postData});
    }

    render() {
        return (
            <Modal show={this.props.filter.showModalAccept} backdrop="static" onHide={() => this.handleClose()}>
                <Modal.Header closeButton>
                    <Modal.Title>Duyệt</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <label>Ghi chú</label>
                        <textarea name="note" rows={4} className="form-control" onChange={(e) => this.inputChange(e)} />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="btn-modal btn-success" onClick={() => this.btnSave()}>Lưu</Button>
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
})(ModalAcceptSurvey);
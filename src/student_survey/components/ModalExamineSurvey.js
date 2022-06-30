import React, { Component } from 'react';
import {Modal} from 'react-bootstrap';
import {connect} from "react-redux";

class ModalExamineSurvey extends Component {

    handleClose () {
        let {dispatch} = this.props;
        dispatch({type:'SET_SHOW_MODAL_EXAM', data: false});
    }

    ListItem(data) {
        return <li key={data.questionId}>
                    <strong>{data.questionName}</strong>
                    <ul>{data.answers.map((item) => this.ListItemSub(item))}</ul>
                </li>;
    }

    ListItemSub(data) {
        const value = data.value ? ` : ${data.value}` : ``;
        return <li key={data.answerId}>{data.name} {value}</li>;
    }
      
    ExamData(data) {        
        let listItems = data.map((item) => this.ListItem(item));
        return (
            <ul className="list-unstyled">{listItems}</ul>
        );
    }

    render() {
        let data = this.props.filter.examList;
        return (
            <Modal id="modalInfoSurvey" show={this.props.filter.showModalExam} onHide={() => this.handleClose()} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Thông tin khảo sát</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        {data.length > 0 ? this.ExamData(data) : "Không có dữ liệu khảo sát !"}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-primary" onClick={() => this.handleClose()}>Đóng</button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default connect(function (state) {
    return {
        filter : state.Filter
    }
})(ModalExamineSurvey);
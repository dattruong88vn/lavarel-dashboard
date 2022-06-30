import React, { Component } from 'react';
import {Modal} from 'react-bootstrap';
import {connect} from "react-redux";
import TableAgent from './TableAgent';
import TableCustomer from './TableCustomer';
import TableOwner from './TableOwner';
import TableVisitor from './TableVisitor';

class ModalInfoTracking extends Component {
    closeInfoTracking () {
        let {dispatch} = this.props;
        dispatch({type:'SET_SHOW_MODAL_INFO_TRACKING', data: false});
        dispatch({type:'SET_SHOW_MODAL_SAVE_TRACKING', data: true});
    }

    renderBody () {        
        let htmlContent = [];
        let data = this.props.tracking;
        if(data.dataTableOwner.length > 0 || data.dataTableCustomer.length > 0 || data.dataTableAgent.length > 0 || data.dataTableVisitor.length > 0) 
        {
            if (data.dataTableOwner.length > 0) {
                htmlContent.push(<TableOwner key={1}/>);
            } 
            if (data.dataTableCustomer.length > 0) {
                htmlContent.push(<TableCustomer key={2}/>);
            }
            if (data.dataTableAgent.length > 0) {
                htmlContent.push(<TableAgent key={3}/>);
            }
            if (data.dataTableVisitor.length > 0) {
                htmlContent.push(<TableVisitor key={4}/>);
            }
        }
        else {
            htmlContent.push(<div key={5} className='form-group'>SĐT không có trong hệ thống</div>);
        }
        return htmlContent;
    }

    render() {
        return (
            <Modal id="modalInfoTracking" show={this.props.tracking.showModalInfoTracking} backdrop="static">
                <Modal.Header>
                    <Modal.Title>Thông tin tracking</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.renderBody()}
                </Modal.Body>
                <Modal.Footer>
                    <button id="btnCloseInfoTracking" className="btn btn-primary" onClick={() => this.closeInfoTracking()}>Đóng</button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default connect(function (state) {
    return {
        tracking : state.Tracking
    }
})(ModalInfoTracking);
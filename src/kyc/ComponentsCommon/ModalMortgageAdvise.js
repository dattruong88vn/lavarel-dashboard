import React, { Component, Fragment } from 'react';
import {Modal} from 'react-bootstrap';

class ModalMortgageAdvise extends Component {
    render() {
        let {isShow} = this.props;
        return (
            <Modal id={"ModalMortgageAdvise"} 
                dialogClassName = "modal-fluid"
                className="modal-family" 
                show={isShow} backdrop="static" 
                onHide={this.props.onHide.bind(this)}
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Quy trình pháp lý bất động sản</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img src='/images/kyc/legal-tree.png'/>
                </Modal.Body>
            </Modal>
        );
    }
}

export default ModalMortgageAdvise;
import React, { Component, Fragment } from 'react';
import {Modal} from 'react-bootstrap';

class ModalFamily extends Component {
    
    onSave(){
        this.props.onSave();
    }

    renderFamily(){
    }

    render() {
        let {isShow} = this.props;
        return (
            <Modal id={"ModalFamily"} 
                dialogClassName = "modal-fluid"
                className="modal-family" 
                show={isShow} backdrop="static" 
                onHide={this.props.onHide.bind(this)}
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Hiện Trạng Gia Đình Và Nhà Ở</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                {
                    this.props.data.map((item, index)=>{
                        return (
                            <div key={"purpose-"+item.id} className="form-group row">
                                <label className="col-sm-2">{item.title}</label>
                                <div className="col-sm-10">
                                    {this.props.purposeRender(0, item.id, item.childs)}
                                </div>
                            </div>
                        )
                    })
                }
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-warning btn-continue" onClick={this.onSave.bind(this)}>Lưu thông tin</button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default ModalFamily;
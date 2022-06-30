import React, { Component } from 'react';
import {Modal} from 'react-bootstrap';
import GroupProfile from './GroupProfile';

class ModalProfile extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Modal id={"modalProfile"} show={this.props.profiles.showHideModalProfile} backdrop="static" onHide={this.props.handleCloseModalProfile.bind(this)}>
                <Modal.Header closeButton>
                    <Modal.Title>Bổ sung hồ sơ vay</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <GroupProfile setDataPostProfile={this.props.setDataPostProfile.bind(this)} 
                            inputChange={this.props.inputChange.bind(this)} 
                            listProfile={this.props.profiles.listProfile}/>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-primary" onClick={this.props.handleSendProfile.bind(this)}>Gửi</button>
                    <button className="btn btn-default" onClick={this.props.handleCloseModalProfile.bind(this)}>Thoát</button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default ModalProfile;
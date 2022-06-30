import React, {useEffect} from "react"
import { Modal, Button } from "react-bootstrap"

const CustomModal = (props) => {
    const {
        bodyContent, 
        className, 
        closeLabel, 
        headContent, 
        isDisabledOKBtn, 
        saveLabel, 
        show, 
        handleClose, 
        handleSave
    } = props;
    
    return (
        <Modal className={className} show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{headContent}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{bodyContent}</Modal.Body>
            <Modal.Footer className="align-center">
                <Button
                    className="btn-warning"
                    variant="warning"
                    onClick={handleClose}
                >
                    {closeLabel}
                </Button>
                <Button
                    className="btn-success"
                    disabled={isDisabledOKBtn}
                    variant="success"
                    onClick={handleSave}
                >
                    {saveLabel}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CustomModal

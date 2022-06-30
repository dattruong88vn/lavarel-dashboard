import React, { FC } from "react";
import { Button, Modal } from "react-bootstrap";

import "./index.scss";
import 'bootstrap/dist/css/bootstrap.min.css';

type BtnProps = {
    text: string
    class: string
    onClick: () => void
}

type FormInputModalProps = {
    btn1?: BtnProps
    btn2?: BtnProps
    className?: string | null
    disableSaveBtn?: boolean
    id?: string
    isDisplay: boolean
    title: string
    onCancelAction: () => void
}

const Modals: FC<FormInputModalProps> = (props) => {
    return (
        <Modal
            className={`custom-modal-styling-title ${props.className}`}
            show={props.isDisplay}
            onHide={props.onCancelAction}
            enforceFocus={false}
            keyboard={false}
            backdrop={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{props.children}</Modal.Body>
            {(props.btn1 || props.btn2) && 
                <Modal.Footer>
                    {props.btn1 && <button className={`btn ${props.btn1.class}`} onClick={props.btn1.onClick}>{props.btn1.text}</button>}
                    {props.btn2 && <button className={`btn ${props.btn2.class}`} onClick={props.btn2.onClick}>{props.btn2.text}</button>}
                </Modal.Footer>
            }
        </Modal>
    )
};

export default Modals;

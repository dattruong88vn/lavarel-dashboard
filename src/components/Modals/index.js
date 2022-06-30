import React from "react"

import "components/Modals/index.scss"

const Modals = ({ children, disableSaveBtn, id, labelClose, labelSave, modalRef, show, title, setSave, setShow }) => {
    const clsModal = show && "modal active" || "modal"

    /* 
    * TODO: unable to click outside to close modal
    *
    useEffect(() => {
        if (show) {
            document.addEventListener("click", handleOutsideClick, false);
        }
        return () => {
            document.removeEventListener("click", handleOutsideClick, false);
        }
    }, [show])

    const handleOutsideClick = (e) => {
        if (!modalRef.current.contains(e.target)) {
            setShow(false)
        }
    } */

    return (
        <div className={clsModal} id={id} tabIndex="1" aria-hidden="true" role="dialog">
            <div ref={modalRef} className="modal-dialog custom-modal-styling-title" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" onClick={() => setShow(false)}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h4 className="modal-title">{title}</h4>
                    </div>
                    <div className="modal-body">
                        {children}
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" type="button" onClick={() => setShow(false)}>{labelClose}</button>
                        <button className="btn btn-primary" disabled={disableSaveBtn} type="button" onClick={() => setSave()}>{labelSave}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modals

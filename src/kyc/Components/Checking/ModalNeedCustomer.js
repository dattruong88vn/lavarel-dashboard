import React, { Component } from "react"
import { Modal } from "react-bootstrap"
import NeedAll from "./NeedAll"
import NeedOther from "./NeedOther"

class ModalNeedCustomer extends Component {
    render() {
        let { modalNeedCustomer, listRadioNeed, postData } = this.props.checking
        return (
            <Modal
                id={"modalNeedCustomer"}
                className="modal-customer"
                show={modalNeedCustomer}
                backdrop="static"
                onHide={this.props.handleCloseModalChecking.bind(this)}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Nhu cầu của khách hàng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group mb20">
                        <div className="row">
                            {listRadioNeed.map((item, index) => {
                                return (
                                    <div key={index} className="col-md-3">
                                        <div className="need-radio">
                                            <input
                                                type="radio"
                                                id={item.id}
                                                value={item.id}
                                                checked={
                                                    item.id ==
                                                    postData.requestType
                                                }
                                                className="need-radio-input"
                                                name="requestType"
                                                onChange={this.props.handleChangeInput.bind(
                                                    this
                                                )}
                                            />
                                            <label
                                                htmlFor={item.id}
                                                className="need-radio-label"
                                            >
                                                {item.name}
                                            </label>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    {(postData.requestType == 96 ||
                        postData.requestType == 97 ||
                        postData.requestType == 110) && (
                        <NeedAll
                            checking={this.props.checking}
                            handleChangeSelect={this.props.handleChangeSelect.bind(
                                this
                            )}
                        />
                    )}
                    {(postData.requestType == 98 ||
                        postData.requestType == 99 ||
                        postData.requestType == 111) && (
                        <NeedOther
                            checking={this.props.checking}
                            handleChangeInput={this.props.handleChangeInput.bind(
                                this
                            )}
                            handleChangeSelect={this.props.handleChangeSelect.bind(
                                this
                            )}
                        />
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <button
                        className="btn btn-warning btn-continue"
                        onClick={this.props.continueChecking.bind(this)}
                    >
                        Tiếp tục
                    </button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default ModalNeedCustomer

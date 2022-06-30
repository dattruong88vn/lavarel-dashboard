import React, {Component, Fragment} from "react";
import {withRouter, Link, Redirect} from "react-router-dom";

class StepBar extends Component {
    constructor(props) {
        super(props);
        let urlParams = new URLSearchParams(window.location.search);
        let dealId = urlParams.get('dealId');

        this.state = {
            dealId: dealId != null ? parseInt(dealId) : null
        }
        this.onClickStepTwo = this.onClickStepTwo.bind(this);
    }

    onClickStepTwo() {
        this.props.handleMoveToStepTwo();
    }

    render() {
        var pathname = window.location.pathname;
        return (
            <div className="container-step-bar">
                <ul className="progressbar-step">
                    <li key="step-one" className={pathname == '/kyc/loan-advice-step-one' ? 'is-active' : 'is-complete'}>
                        <Link className="step-link" to={'/kyc/loan-advice-step-one?dealId=' + this.state.dealId} onClick={e => window.location = '/kyc/loan-advice-step-one?dealId=' + this.state.dealId}>
                            Thông tin vay vốn
                        </Link>
                    </li>
                    <li key="step-two" className={pathname == '/kyc/loan-advice-step-two' ? 'is-active' : ''}>
                        <Link className="step-link" onClick={pathname == '/kyc/loan-advice-step-one' ? this.onClickStepTwo : null}
                            to={'/kyc/loan-advice-step-two?dealId=' + this.state.dealId}>
                            Tính toán khoản vay
                        </Link>
                    </li>
                </ul>
            </div>
        )
    }
}

export default withRouter(StepBar)
import React, { Component } from 'react';

export default class NotificationMessage extends Component {
    constructor(props) {
        super(props);
        this.sub = null;
    }

    componentDidMount() {
        const {
            duration
        } = this.props;

        this.sub = setTimeout(() => {
            this.props.handleClose();
        }, duration);
    }

    componentWillMount() {
        clearTimeout(this.sub);
    }

    render() {
        const {
            type,
            message
        } = this.props.data;

        const iconClassName = type === 'success' ? 'fa fa-check-circle text-success' : 'fa fa-exclamation-circle text-danger';

        return (
            <div className="commission-notification-container">
                <div className="commission-notification-title">
                    <i className={iconClassName}></i>
                </div>

                <div className="commission-notification-message">{message}</div>
            </div>
        )
    }
}
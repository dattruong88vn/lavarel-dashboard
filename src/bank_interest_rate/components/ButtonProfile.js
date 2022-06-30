import React, { Component } from 'react';

class ButtonProfile extends Component {
    render() {
        return (
            <button className="btn btn-primary" onClick={this.props.showModalProfile.bind(this)}> Bổ sung hồ sơ vay</button>
        );
    }
}

export default ButtonProfile;
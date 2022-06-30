import React, { Component } from 'react';

class ButtonProcess extends Component {
    render() {
        let {info} = this.props;
        return (
            <button disabled={info.statusId == 31 && currentUser.departments[0].isGroupAdmin == false} className="btn btn-default ml-10 mt-25" onClick={this.props.handleShowModalPP.bind(this)}>Xử lý</button>
        );
    }
}

export default ButtonProcess;
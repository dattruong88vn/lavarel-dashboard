import React, { Component } from 'react';
import {connect} from "react-redux";

class ButtonShowModalSendMail extends Component {
    handleShowSendMail () {
        const that = this;
        // we don't need call again
        /*$.ajax({
            url: "/student-survey/get-students-from-cc",
            dataType: 'json',
            type: "post",
            data: JSON.stringify(this.props.filter.postData)
        }).done(function(response){
            if (response.data) {
                var result = $.map(response.data, function (x) {
                    return {
                        value: x.userId,
                        label: x.name,
                        email: x.email
                    };
                });
                that.props.dispatch({type:'SET_STUDENTS_LIST', data: result});
            }
        });*/
        that.props.dispatch({type:'SET_SHOW_SEND_MAIL', data: true});
    }

    render() {
        return (
            <button className="btn-sm btn btn-warning" onClick={() => this.handleShowSendMail()}>{this.props.children}</button>
        );
    }
}

export default connect(function (state) {
    return {
        filter : state.Filter
    }
})(ButtonShowModalSendMail);
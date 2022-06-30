import React, { Component } from 'react';
import ModalCardType from '../components/ModalCardType';
import {connect} from 'react-redux';
import * as actions from '../actions';

class ModalCardTypeContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            valid: {
                message: '',
                isShow: false
            }
        };
    }
    componentDidMount() {
        this.props.onGetListSelectCardType();           
    }
    handleCloseModalCardType() {
        this.props.onShowHideModalCardType(false);
        this.props.onResetDataPost();
        this.setState({valid: {message: '', isShow: false}});
    }
    handleShowModalCardType() {
        this.props.onShowHideModalCardType(true);
    }
    handleSubmit() {
        let validate = this.validateData();
        if(validate) {
            this.props.onSubmit(this.props.card.postData);
            this.props.onResetDataPost();
            this.handleCloseModalCardType();
        }
    }
    inputChange(event) {
        let dataPost = {};
        dataPost[event.target.name] = event.target.value;
        this.props.onSetDataPost(dataPost);
    }
    validateData() {
        var {description} = this.props.card.postData;
        if(description == null || description.length == 0) {
            this.setState({valid: {message: 'Vui lòng nhập nội dung thay đổi', isShow: true}});
            return false;
        }
        this.setState({valid: {message: '', isShow: false}});
        return true;
    }
    render() {
        return (
            <ModalCardType card={this.props.card}
            handleCloseModalCardType={this.handleCloseModalCardType.bind(this)}
            handleShowModalCardType={this.handleShowModalCardType.bind(this)}
            handleSubmit={this.handleSubmit.bind(this)}
            inputChange={this.inputChange.bind(this)}
            setSelectCardType={this.props.onSetSelectCardType.bind(this)}
            setDisableSave={this.props.onSetDisableSave.bind(this)}
            valid={this.state.valid}
            />
        );
    }
}
const mapStateToProps = state => {
    return {
        card: state.ModalCardType
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        onShowHideModalCardType: (data) => {
            dispatch(actions.actShowHideModalCardType(data));
        },
        onSetDataPost: (data) => {
            dispatch(actions.actSetDataPost(data));
        },
        onSetDisableSave: (data) => {
            dispatch(actions.actSetDisableSave(data));
        },
        onSubmit: (data) => {
            dispatch(actions.apiSubmit(data));
        },
        onResetDataPost: () => {
            dispatch(actions.actResetDataPost());
        },
        onGetListSelectCardType: () => {
            dispatch(actions.actGetListSelectCardType());
        },
        onSetSelectCardType: (value, data) => {
            dispatch(actions.actSetSelectCardType(value, data));
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ModalCardTypeContainer);
import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';
import ButtonProfile from '../components/ButtonProfile';

class ButtonProfileContainer extends Component {
    showModalProfile() {
        let requestId = this.props.requestId;
        this.props.onGetDataListProfile(requestId);
        this.props.onSetDataPostProfile({requestId: requestId});
        this.props.onShowHideModalProfile(true);
    }

    render() {
        return (
            <ButtonProfile profiles={this.props.profiles} showModalProfile={this.showModalProfile.bind(this)}/>
        );
    }
}

const mapStateToProps = state => {
    return {
        profiles: state.ModalProfile
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onShowHideModalProfile: (data) => {
            dispatch(actions.actShowHideModalProfile(data));
        },
        onGetDataListProfile: (id) => {
            dispatch(actions.apiGetDataListProfile(id));
        },
        onSetDataPostProfile: (data) => {
            dispatch(actions.actSetDataPostProfile(data));
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ButtonProfileContainer);
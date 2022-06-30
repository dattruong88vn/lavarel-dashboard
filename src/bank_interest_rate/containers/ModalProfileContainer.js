import React, { Component } from 'react';
import ModalProfile from '../components/ModalProfile';
import {connect} from 'react-redux';
import * as actions from '../actions';

class ModalProfileContainer extends Component {
    
    handleCloseModalProfile() {
        this.props.onShowHideModalProfile(false);
        this.props.onResetDataPostProfile();
    }

    handleSendProfile() {
        this.props.onSendProfile(this.props.profiles.postDataProfile);
        this.handleCloseModalProfile();
    }

    inputChange(event) {
        let listRequires = this.props.profiles.postDataProfile.fileRequires;
        let index = listRequires.findIndex((e) => e.typeId === parseInt(event.target.name));
        if(index !== -1) {
            let data = listRequires[index];
            data.note = event.target.value;
            listRequires[index] = data;
        }
        this.props.onSetDataPostProfile({fileRequires: listRequires});
    }

    setDataPostProfile(data, docId) {
        let dataPost = this.props.profiles.postDataProfile.fileRequires;
        let index = dataPost.findIndex((e) => e.typeId === parseInt(data.typeId));
        if(index !== -1) {
            dataPost.splice(index, 1);
        } else {
            dataPost.push({docId: docId, typeId: data.typeId, note: null});
        }
        this.props.onSetDataPostProfile({fileRequires: dataPost});
    }

    render() {
        return (
            <ModalProfile profiles={this.props.profiles}
            handleCloseModalProfile={this.handleCloseModalProfile.bind(this)}
            handleSendProfile={this.handleSendProfile.bind(this)}
            setDataPostProfile={this.setDataPostProfile.bind(this)}
            inputChange={this.inputChange.bind(this)}
            />
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
        onSetDataPostProfile: (data) => {
            dispatch(actions.actSetDataPostProfile(data));
        },
        onResetDataPostProfile: () => {
            dispatch(actions.actResetDataPostProfile());
        },
        onSendProfile: (data) => {
            dispatch(actions.apiSendProfile(data));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalProfileContainer);
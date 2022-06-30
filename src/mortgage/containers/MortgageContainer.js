import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchInfo,changeRequestStatus, updateValidateField, actSetRejectProfile, actUpdateResultBank, actDownloadProfile, actSetDataReassign } from './../actions/index';
import InfoContainer from './InfoContainer';
import * as actions from './../../bank_interest_rate/actions';
import * as pfsActions from './../../pfs_list/actions';
import ModalRejectProfileContainer from './ModalRejectProfileContainer';
import ModalReassignContainer from './ModalReassignContainer';

class Section extends Component {
    constructor(props) {
        super(props);
        this.inputChange = this.inputChange.bind(this);
    }

    componentDidMount(){
        this.props.onFetchInfo();
    }

    inputChange(event, docId, typeId, requestId) {
        
        let listRequires = this.props.profiles.postDataProfile.fileRequires;
        let index = null;
        let name = "note";
        if(event.target.name.search("stickNote") != -1){
            index = listRequires.findIndex((e) => e.channelTypeId === parseInt(event.target.name.replace("stickNote","")));
            name = "stickNote";
        }else{
            index = listRequires.findIndex((e) => e.channelTypeId === parseInt(event.target.name));
        }
        // let index = listRequires.findIndex((e) => e.channelTypeId === parseInt(event.target.name));
        if(listRequires.length > 0 && index !== -1) {
            let data = listRequires[index];
            if(name == "stickNote"){
                data.stickNote = event.target.value;
            } else{
                data.note = event.target.value;
            }
            
            listRequires[index] = data;
        } else {
            let dataPost = {};
            if(name == "stickNote"){
                dataPost = {
                    requestId: requestId,
                    mortgageRequestDocumentId: docId, 
                    channelTypeId: typeId, 
                    isRequired: true, 
                    isSuccess: false, 
                    stickNote: event.target.value,
                    note:null
                }
            } else{
                dataPost = {
                    requestId: requestId,
                    mortgageRequestDocumentId: docId, 
                    channelTypeId: typeId, 
                    isRequired: true, 
                    isSuccess: false, 
                    stickNote : null,
                    note: event.target.value
                }
            }
            
            listRequires.push(dataPost);
        }
        this.props.onSetDataPostProfile({fileRequires: listRequires});
    }

    setDataPostProfile(data, docId, typeId, requestId) {
        let dataPost = this.props.profiles.postDataProfile.fileRequires;
        let index = dataPost.findIndex((e) => e.channelTypeId === parseInt(typeId));
        if(index !== -1) {
            dataPost.splice(index, 1);
        }
        if(typeof data.isRequired === 'undefined') {
            data.isRequired = false;
        }
        if(typeof data.isSuccess === 'undefined') {
            data.isSuccess = false;
        }
        dataPost.push({requestId: requestId, mortgageRequestDocumentId: docId, channelTypeId: typeId, isRequired: data.isRequired, isSuccess: data.isSuccess, note: null});
        this.props.onSetDataPostProfile({fileRequires: dataPost});
    }

    updateValidateField() {
        this.props.onUpdateValidateField(this.props.profiles.postDataProfile);
    }

    receiveRequest(id) {
        this.props.onReceiveRequest(id);
    }

    updateStatus(id, statusId) {
        this.props.onUpdateStatus({
            mortgageRequestId: id,
            statusId: statusId
        });
    }

    setRejectProfile(data) {
        this.props.onSetRejectProfile(data);
    }

    setDataReassign(data) {
        this.props.onSetDataReassign(data);
    }

    updateBank(data) {
        this.props.onUpdateBank(data);
    }

    downloadProfile(id) {
        this.props.onDownloadProfile(id);
    }
    
    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <h2 className="title-with-line"><span>Chi tiết hồ sơ vay</span></h2>
                    <div className="box box-primary">
                        <div className="box-body">
                            <InfoContainer dispatch={this.props.dispatch} 
                                info={this.props.info} 
                                profiles={this.props.profiles}
                                inputChange={this.inputChange}
                                setDataPostProfile={this.setDataPostProfile.bind(this)}
                                updateValidateField={this.updateValidateField.bind(this)}
                                receiveRequest={this.receiveRequest.bind(this)}
                                updateStatus={this.updateStatus.bind(this)}
                                setRejectProfile={this.setRejectProfile.bind(this)}
                                updateBank={this.updateBank.bind(this)}
                                changeRequestStatus={this.props.changeRequestStatus}
                                downloadProfile={this.downloadProfile.bind(this)}
                                setDataReassign={this.setDataReassign.bind(this)}
                            />
                        </div>
                    </div>
                </div>
                <ModalRejectProfileContainer/>
                <ModalReassignContainer/>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    info : state.mortgageReducer.infoMortgage,
    profiles: state.ModalProfile
});

const mapDispatchToProps = dispatch => {
    return {
        onFetchInfo: () => {
            dispatch(fetchInfo());
        },
        changeRequestStatus: (dataPost) => {
            dispatch(changeRequestStatus(dataPost));
        },
        onSetDataPostProfile: (data) => {
            dispatch(actions.actSetDataPostProfile(data));
        },
        onResetDataPostProfile: () => {
            dispatch(actions.actResetDataPostProfile());
        },
        onUpdateValidateField: (data) => {
            dispatch(updateValidateField(data));
        },
        onReceiveRequest: (id) => {
            dispatch(pfsActions.actReceiveRequest(id));
        },
        onUpdateStatus: (dataPost) => {
            dispatch(pfsActions.actUpdateStatus(dataPost));
        },
        onSetRejectProfile: ( data) => {
            dispatch(actSetRejectProfile(data));
        },
        onUpdateBank: (data) => {
            dispatch(actUpdateResultBank(data));
        },
        onDownloadProfile: (id) => {
            dispatch(actDownloadProfile(id));
        },
        onSetDataReassign: (dataPost) => {
            dispatch(actSetDataReassign(dataPost));
        },
        dispatch:dispatch
    }
};

const MortgageContainer = connect(mapStateToProps,mapDispatchToProps)(Section);
export default MortgageContainer;
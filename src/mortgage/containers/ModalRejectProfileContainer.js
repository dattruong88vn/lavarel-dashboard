import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import {actRejectProfile, actGetListReasonReject, actSetDataReasonReject, actResetDataReasonReject} from '../actions/index';

class Section extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataPost : {
                showModal: 0
            }
        }
        this._STORED_LOCAL = {
            defaultValue : {value : '', label: "--- Vui lòng chọn ---"}
        };
        this.handleReject = this.handleReject.bind(this);
    }

    // addDocument(){
    //     let documents = [...this.state.dataPost.documents];
    //     documents.push({
    //         key : uniqueid(),
    //         channelTypeId:1119,
    //         income:0
    //     })
    //     this.setState({
    //         dataPost : {
    //             documents : documents
    //         }
    //     })
    // }

    // rmDocument(index){
    //     console.log(index);
    //     let documents = [...this.state.dataPost.documents];
    //     documents.splice(index,1);
    //     console.log(documents);
    //     this.setState({
    //         dataPost : {
    //             documents : documents
    //         }
    //     })
    // }

    // handleOnchange(e){
    //     let {dataPost} = this.state;
    //     let name = e.target.name;
    //     let value = e.target.value;
    //     dataPost[name] = name == 'isMarried' ? (value == 'true') : value;
    //     this.setState({
    //         dataPost : dataPost
    //     })
    // }

    // handleChangeDocument(obj){
    //     let {dataPost} = this.state;
    //     dataPost.documents[obj.index][obj.name] = obj.value;
    //     console.log(obj)
    //     this.setState({
    //         dataPost : dataPost
    //     })
    // }

    componentDidMount() {
        this.props.onGetListReasonReject();
    }

    handleReject(boleans){
        let {dataPost} = this.state;
        dataPost.showModal = boleans;
        if(boleans) {
            let dataReject = this.props.info.rejectProfile;
            if(dataReject.reasonId == null) {
                showPropzyAlert("Vui lòng chọn lý do hủy");
                return false;
            }
            this.props.onRejectProfile(dataReject);
        }
        this.props.onResetDataReasonReject();
        $("#modalRejectProfile").modal('hide');
    }

    handleChangeSelect($feild, $option) {
        let that = this;
        let value = {};
        value[$feild] = $option;
        let data = {};
        data[$feild] = $option.value;
        that.props.onSetDataReasonReject(value, data);
    }

    render() {
        let that = this;
        return (
            <div id="modalRejectProfile" tabIndex="-1" className="modal fade" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" onClick={that.handleReject.bind(that, false)} data-dismiss="modal">×</button>
                            <h4 className="modal-title">Hủy hồ sơ vay</h4>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label>Lý do hủy</label>
                                <Select
                                    value={that.props.info.filterSelect.reasonId ? that.props.info.filterSelect.reasonId : that._STORED_LOCAL.defaultValue}
                                    options={that.props.info.listReasonReject}
                                    onChange={that.handleChangeSelect.bind(that, 'reasonId')}/>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" onClick={that.handleReject.bind(that, false)} className="btn btn-default">Thoát</button>
                            <button type="button" onClick={that.handleReject.bind(that, true)} className="btn btn-primary">Chấp nhận</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    info: state.mortgageReducer
});

const mapDispatchToProps = dispatch => {
    return {
        onRejectProfile: (dataPost) => {
            dispatch(actRejectProfile(dataPost));
        },
        onGetListReasonReject: () => {
            dispatch(actGetListReasonReject());
        },
        onSetDataReasonReject: (value, data) => {
            dispatch(actSetDataReasonReject(value, data));
        },
        onResetDataReasonReject: () => {
            dispatch(actResetDataReasonReject());
        },
        dispatch:dispatch
    }
};

const ModalRejectProfileContainer = connect(mapStateToProps, mapDispatchToProps)(Section);
export default ModalRejectProfileContainer;
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import {actReassign, actGetListUserMortgage, actSetSelectDataReassign, actResetDataReassign, actSetDataReassign} from '../actions/index';

class Section extends Component {
    constructor(props) {
        super(props);
        this._STORED_LOCAL = {
            defaultValue : {value : '', label: "--- Vui lòng chọn ---"}
        };
    }

    componentDidMount() {
        this.props.onGetListUserMortgage();
    }

    handleChangeSelect($feild, $option) {
        let that = this;
        let value = {};
        value[$feild] = $option;
        let data = {};
        data[$feild] = $option.value;
        that.props.onSetSelectDataReassign(value, data);
    }

    handleInputChange(event) {
        let dataPost = {};
        dataPost[event.target.name] = event.target.value;
        this.props.onSetDataReassign(dataPost);
    }

    handleReassign(boleans){
        if(boleans) {
            let dataReassign = this.props.info.reassign;
            if(dataReassign.assignedTo == null) {
                showPropzyAlert("Vui lòng chọn nhân viên");
                return false;
            }
            this.props.onReassign(dataReassign);
        }
        this.props.onResetDataReassign();
        $("#modalRejectProfile").modal('hide');
    }

    render() {
        let that = this;
        let {listUserMortgage, filterSelectUser, reassign} = that.props.info;
        return (
            <div id="modalReassign" className="modal fade" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" onClick={that.handleReassign.bind(that, false)} data-dismiss="modal">×</button>
                            <h4 className="modal-title">Re-assign</h4>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label>Nhân viên</label>
                                <Select
                                    value={filterSelectUser.assignedTo ? filterSelectUser.assignedTo : that._STORED_LOCAL.defaultValue}
                                    options={listUserMortgage}
                                    onChange={that.handleChangeSelect.bind(that, 'assignedTo')}/>
                            </div>
                            <div className="form-group">
                                <label>Ghi chú: </label>
                                <input type="text" name="note" value={reassign.note} className="form-control" onChange={that.handleInputChange.bind(that)} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" onClick={that.handleReassign.bind(that, false)} className="btn btn-default">Thoát</button>
                            <button type="button" onClick={that.handleReassign.bind(that, true)} className="btn btn-primary">Chấp nhận</button>
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
        onReassign: (dataPost) => {
            dispatch(actReassign(dataPost));
        },
        onGetListUserMortgage: () => {
            dispatch(actGetListUserMortgage());
        },
        onSetSelectDataReassign: (value, data) => {
            dispatch(actSetSelectDataReassign(value, data));
        },
        onResetDataReassign: () => {
            dispatch(actResetDataReassign());
        },
        onSetDataReassign: (dataPost) => {
            dispatch(actSetDataReassign(dataPost));
        },
        dispatch:dispatch
    }
};

const ModalReassignContainer = connect(mapStateToProps, mapDispatchToProps)(Section);
export default ModalReassignContainer;
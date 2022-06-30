import React, { Component, Fragment } from 'react';


class ModalCalendarr extends Component {
    constructor(props) {
        super(props);
        this.handleOnClickContinue = this.handleOnClickContinue.bind(this);
    }
    componentDidMount() {
        $('#modalOpenCalendar').on('shown.bs.modal', function () {
            $('#schedule-day').datepicker({
                todayHighlight : true,
                format: 'mm/dd/yyyy',
                startDate: 'today'
            }).datepicker('setDate', new Date());
            $('#schedule-note').val("");
            $("#schedule-time").timepicker({
                timeFormat: 'HH:mm:ss',
                defaultTime : moment().format('HH:mm'),
                showMeridian: false
            });
        });
    }
    handleOnClickContinue() {
        const whenTime = $("#schedule-time").val();
        const whenDate = $("#schedule-day").val();
        const scheduleTime = moment(whenTime + " " + whenDate, "HH:mm MM/DD/YYYY").unix() * 1000;
        const dataPost = {
            "dealId":  this.props.dealId,
            "note": $.trim($('#schedule-note').val()),
            "reminderDate": scheduleTime
        };
        // validate
        if (!hasValue(dataPost.dealId)) {
            // thiếu dealId
            propzyNotifyAlert({type: "propzy-notify-warning", message : 'Thiếu Deail Id'});
            return false;
        }
        if (!hasValue(dataPost.note)) {
            // thiếu dealId
            propzyNotifyAlert({type: "propzy-notify-warning", message : 'Xin vui lòng nhập ghi chú'});
            return false;
        }
        if (!hasValue(dataPost.reminderDate)) {
            // thiếu dealId
            propzyNotifyAlert({type: "propzy-notify-warning", message : 'Xin vui lòng nhập thời gian'});
            return false;
        }
        this.props.functionServices.onSetReminder(dataPost);
    }

    render() {
        return (
            <Fragment >
                <div className="modal fade modal-customer" id="modalOpenCalendar" tabIndex="-1" role="dialog"
                     aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span><span className="sr-only">Close</span>
                                </button>
                                <h4 className="modal-title" >NGÀY HẸN GẶP LẠI KHÁCH HÀNG</h4>
                            </div>
                            <div className="modal-body">
                                <div className="row form-group">
                                    <div className="col-sm-3">
                                        <label className="control-label required">Thời gian:</label>
                                    </div>
                                    <div className="col-sm-4 bootstrap-timepicker timepicker">
                                        <input type="text" className="form-control input-small"  id="schedule-time"/>
                                    </div>
                                    <div className="col-sm-5">
                                        <input className="datepicker form-control" data-date-format="mm/dd/yyyy" id="schedule-day"/>
                                    </div>
                                </div>
                                <div className="row form-group">
                                    <div className="col-sm-3">
                                        <label className="control-label required">Chi chú :</label>
                                    </div>
                                    <div className="col-sm-9">
                                       <textarea className="form-control" placeholder="Nhập nội dung" id="schedule-note"/>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-warning btn-continue" onClick={this.handleOnClickContinue}>Tiếp tục</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default ModalCalendarr;
import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import Select from 'react-select';
import TagsInput from 'react-tagsinput';
import DatePicker from "react-datepicker";
import 'react-tagsinput/react-tagsinput.css'
import "react-datepicker/dist/react-datepicker.css";
import '../../styles/custom.scss';
 
const ModalChangeTimeCloseDeal = (props) => {
    const { isShow, onShow, getDateRange, options, onChangeReason, reasons } = props;
    const [closeDealData, setCloseDealData] = useState({
        codeCloseDeal: '', 
        timeCloseDeal: ''
    });
    const [dateRange, setDateRange] = useState({
        minDate: '',
        maxDate: ''
    })
    const [reasonsChangeDate, setReasonsChangeDate] = useState(reasons);
    const [isDisabled, setIsDisabled] = useState(true);
    const [isShowDatePicker, setIsShowDatePicker] = useState(false);

    const onClose = () => {
        setCloseDealData({
            codeCloseDeal: '',
            timeCloseDeal: ''
        });
        setIsShowDatePicker(false);
        setIsDisabled(true);
        onShow(false);
    }

    const onSubmit = () => {
        const { codeCloseDeal, timeCloseDeal} = closeDealData;
        onChangeReason({
            codeCloseDeal,
            timeCloseDeal,
            reasonsChangeDate
        });
        onClose();
    };

    const onChangeSelect = (value) => {
        const dateRange = getDateRange(value);
        setDateRange({minDate: dateRange.minDate, maxDate: dateRange.maxDate});
        setCloseDealData({codeCloseDeal: value, timeCloseDeal: dateRange.maxDate.getTime()});
        setIsShowDatePicker(true);
    };

    const onChangeDatePicker = (date) => {
        if (date) {
            setCloseDealData({...closeDealData, timeCloseDeal: date.getTime()});
        }
    };

    const onSetReasonsChangeDate = (values) => {
        if(values.length > 0) {
            if(values.length > 50) {
                return;
            }
            if(values.length > reasonsChangeDate.length) {
                if(values[values.length - 1].length > 500) {
                    const sliceString = values[values.length - 1].slice(0, 500);
                    values[values.length - 1] = sliceString;
                }
                const valueDuplicate = values.find((item, index) => index !== values.length - 1 && item === values[values.length - 1]);
                if(!valueDuplicate) {
                    setReasonsChangeDate(values);
                }
                return;
            }
            setReasonsChangeDate(values);
            return; 
        }
        setReasonsChangeDate(values);
    };

    useEffect(() => {
        if(reasonsChangeDate.length && closeDealData.codeCloseDeal) {
            setIsDisabled(false);
            return;
        }
        setIsDisabled(true);
    }, [reasonsChangeDate, closeDealData.codeCloseDeal]);

    useEffect(() => {
        if(isShow) {
            setReasonsChangeDate(reasons);
            setCloseDealData(closeDealData);
        }
    }, [isShow]);

    return (
        <Modal 
            className="modal-payment-schedule" 
            backdrop="static"
            show={isShow}
            onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Thay đổi thời gian chốt deal</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <div className="form-group">
                        <label>Thời gian dự kiến có thể chốt deal <span className="required">*</span></label>
                        <div className="row">
                            <div className="col-md-6">
                                <Select
                                    name="changedTime"
                                    options={options} 
                                    placeholder="Chọn thời gian chốt deal"
                                    onChange={e => onChangeSelect(e.value)} />
                            </div>
                            {isShowDatePicker && 
                                <div className="col-md-6">
                                    <div className="input-group custom-datepicker">
                                        <DatePicker
                                            dateFormat='dd/MM/yyyy'
                                            minDate={dateRange.minDate}
                                            maxDate={dateRange.maxDate}
                                            selected={moment(closeDealData.timeCloseDeal).toDate()} 
                                            onChange={date => onChangeDatePicker(date)} 
                                        />
                                        <div className="input-group-addon">
                                            <i className="fa fa-calendar"></i>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                    <div className="form-group kyc-taginput">
                        <label>Nhập lý do thay đổi thời gian chốt deal <span className="required">*</span></label>
                        <div className="text-right">{reasonsChangeDate.length}/50</div>
                        <TagsInput 
                            inputProps={{className: 'tagsinput-input', placeholder: ''}}
                            value={reasonsChangeDate} 
                            onChange={tags => onSetReasonsChangeDate(tags)} />
                    </div>
                    <div className="form-group text-center">
                        <button 
                            className="btn btn-kyc-cancel btn-kyc-default"
                            onClick={onClose}>Hủy</button>
                        <button 
                            disabled={isDisabled}
                            className="btn btn-kyc-success btn-kyc-default ml20"
                            onClick={onSubmit}>Tiếp tục</button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default ModalChangeTimeCloseDeal;
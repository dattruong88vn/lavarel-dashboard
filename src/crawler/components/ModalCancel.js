import React, { Component } from 'react';
import httpServices from '../utils/http';
import CustomSelect from '../../commonComponents/form/CustomSelect';

class ModalCancel extends Component {
    state = {
        option: [],
        select: {
            value: '',
            label: ''
        }
    }

    componentDidMount() {
        const {selectOptions} = this.props;
        const option = selectOptions.reasonOptions.filter(option => option.value);
        this.setState({option});
    }

    handleChangeSelect = data => {
        this.setState({select: data});
    }

    handleCancel = () => {
        const {value, label} = this.state.select;
        const {dataFields, dataPost, idsSelected, checkFocusPagination, services} = this.props;
        services.onShowModal('modalCancel', false);
        const cancelDataPost = {
            ids: idsSelected.map(i => i.id).join(),
            statusId: 3,
            reasonId: value,
            reasonContent: label
        }
        httpServices.updateStatus(cancelDataPost).then(res => {
            if (res.data.result) {
                services.onShowNotification(true, {type: 'success', message: res.data.message});
                setTimeout(() => {
                    const focusPagination = checkFocusPagination(idsSelected.length);
                    services.onGetCrawlerList(focusPagination, dataPost);
                }, 3000);
                return;
            }
            services.onShowNotification(true, {type: 'failed', message: res.data.message});
        })
    }

    render() {
        const {option, select} = this.state;
        const {services} = this.props;
        return (
            <div className="modal fade in" style={{display: 'block', zIndex: '1051' }}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button 
                                type="button" 
                                className="close" 
                                onClick={() => services.onShowModal('modalCancel', false)}>×</button>
                            <h4 className="modal-title">Lý do hủy tin</h4>
                        </div>
                        <div className="modal-body">
                            <div>
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <CustomSelect 
                                                name="modalCancelReason"
                                                label="Nhập lý do"
                                                required={true}
                                                options={option}
                                                value={select} 
                                                changed={this.handleChangeSelect} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button 
                                    type="button" 
                                    className="btn"
                                    onClick={() => services.onShowModal('modalCancel', false)} >Đóng</button>
                                {select.value && 
                                    <button 
                                        type="button" 
                                        className="btn btn-danger"
                                        onClick={this.handleCancel} >Hủy tin</button>
                                }    
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default ModalCancel;
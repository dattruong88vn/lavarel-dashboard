import React, { Component } from 'react';
import httpServices from '../utils/http';
import Input from '../../commonComponents/form/Input';
import CustomSelect from '../../commonComponents/form/CustomSelect';

class ModalTransfer extends Component {
    state = {
        options: {
            ward: [],
            street: []
        },
        data: {
            ward: {
                value: '',
                label: ''
            },
            street: {
                value: '',
                label: ''
            },
            houseNumber: '' 
        }
    }

    componentDidMount() {
        const options = {...this.state.options};
        const {districtId, wardId, wardName, streetId, streetName, houseNumber} = this.props.itemSelected;
        httpServices.getWardList(districtId).then(res => {
            if(res.data.result) {
                options.ward = res.data.data.map(i => ({value: `${i.wardId}`, label: i.wardName}));
                this.setState({options});
            }
        });
        httpServices.getStreetList(wardId).then(res => {
            if(res.data.result) {
                options.street = res.data.data.map(i => ({value: `${i.streetId}`, label: i.streetName}));
                this.setState({options});
            }
        });
        this.setState({data: {...this.state.data,
            ward: {value: wardId, label: wardName},
            street: {value: streetId, label: streetName},
            houseNumber: houseNumber
        }});
    }

    handleChangeSelect = (select, action) => {
        const data = {...this.state.data};
        const options = {...this.state.options};
        data[action.name] = select;
        if (action.name === 'ward') {
            options.street = [];
            data.street = {value: '', label: ''};
            httpServices.getStreetList(select.value).then(res => {
                if(res.data.result) {
                    options.street = res.data.data.map(i => ({value: `${i.streetId}`, label: i.streetName}));
                    this.setState({options});
                }
            });
        }
        this.setState({data});
    }

    handleChangeInput = (e) => {
        const data = {...this.state.data};
        data[e.target.name] = e.target.value;
        this.setState({data});
    }

    handleTransfer = () => {
        const {data} = this.state;
        const {itemSelected, dataFields, dataPost, checkFocusPagination, services} = this.props;
        services.onShowModal('modalTransfer', false);
        if(data.ward.value) {
            itemSelected.wardId = data.ward.value;
            itemSelected.wardName = data.ward.label;
        } 
        if(data.street.value) {
            itemSelected.streetId = data.street.value;
            itemSelected.streetName = data.street.label;
        } 
        if(data.houseNumber) {
            itemSelected.houseNumber = data.houseNumber;
        }
        httpServices.transferCrawler(itemSelected).then(res => {
            if (res.data.result) {
                services.onShowNotification(true, {type: 'success', message: res.data.message});
                setTimeout(() => {
                    const updateStatusDataPost = {
                        ids: `${itemSelected.id}`,
                        statusId: 2,
                        reasonId: null,
                        reasonContent: null
                    };
                    window.open(`/pos/prescreener/detail/${res.data.data.id}`);
                    httpServices.updateStatus(updateStatusDataPost).then(res => {
                        if(res.data.result) {
                            const numberCrawlerAfterNotMatchStatus = dataFields.statusId.value ? 1 : 0;
                            const focusPagination = checkFocusPagination(numberCrawlerAfterNotMatchStatus);
                            services.onGetCrawlerList(focusPagination, dataPost);
                        }
                    })
                }, 3000);
                return;
            } 
            services.onShowNotification(true, {type: 'failed', message: res.data.message});
        });
    }

    render() {
        const {options, data} = this.state;
        const {services} = this.props;
        return (
            <div className="modal fade in" style={{display: 'block', zIndex: '1051'}}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button 
                                type="button" 
                                className="close" 
                                onClick={() => services.onShowModal('modalTransfer', false)}>×</button>
                            <h4 className="modal-title">Nhập một số trường thiếu</h4>
                        </div>
                        <div className="modal-body">
                            <div>
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <CustomSelect 
                                                name="ward"
                                                label="Phường"
                                                required={true}
                                                options={options.ward}
                                                value={data.ward}
                                                changed={this.handleChangeSelect} />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <CustomSelect 
                                                name="street"
                                                label="Đường"
                                                required={true}
                                                options={options.street}
                                                value={data.street}
                                                changed={this.handleChangeSelect} />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <Input 
                                                name="houseNumber"
                                                label="Số nhà"
                                                required={true}
                                                value={data.houseNumber}
                                                changed={this.handleChangeInput} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button 
                                    type="button" 
                                    className="btn btn-primary"
                                    onClick={this.handleTransfer} >Tạo listing</button>
                                <button 
                                    type="button" 
                                    className="btn btn-danger"
                                    onClick={() => services.onShowModal('modalTransfer', false)} >Đóng</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default ModalTransfer;  
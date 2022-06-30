import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {v4} from 'uuid';
import {LOGICAL_ID_NONE, COMMISSION_TYPE_ID_FIXED, OPERATOR_ID_DEFAULT, COMISSION_TYPE_ID_DEFAULT, CURRENCY_ID_DEFAULT} from '../actions/actionTypes';
import NumberFormat from 'react-number-format';
import SweetAlert from 'react-bootstrap-sweetalert';
import Spinner from '../../commonComponents/spinner/Spinner';

export class FormularItem {
    uuid = v4();
    operator = OPERATOR_ID_DEFAULT;
    value = '';
    type = COMISSION_TYPE_ID_DEFAULT;
    currency = CURRENCY_ID_DEFAULT;
}
export class Formular {
    uuid = v4();
    logicId = LOGICAL_ID_NONE;
    rate = '';
    data = [new FormularItem(), new FormularItem()];
}
export class CommissionConfigModel {
    commissionId = null;
    commissionName = '';
    positionId = '';
    monthPeriod = '1';
    yearPeriod = '2020';
    commissionType = COMMISSION_TYPE_ID_FIXED;
    isFixed = true;
    formular = {
        percent: '',
        list: [new Formular()]
    };
    constructor(month = '1', year = '2020') {
        this.monthPeriod = month + '';
        this.yearPeriod = year + '';
    }
}

class CommissionConfigForm extends Component {
    _years = [];
    constructor(props) {
        super(props);
        let current = new Date();
        const period = 5;
        for (let i = current.getFullYear(); i <= current.getFullYear() + period; i++) {
            this._years.push(i);
        }

        this.state = {
            isLoading: true,
            alert: {
                show: false,
                text: '',
                btnClass: 'error',
                isDuplicate: false
            },
            canUpdate: true,
            configModel: new CommissionConfigModel(current.getMonth() + 1, current.getFullYear()),
        }
    }
    isValidate = () => {
        const configModel = this.state.configModel;
        const cDate = new Date();
        const isNotValidPercent = v => {
            return v.toString().trim().length === 0 || parseFloat(v) <= 0 || parseFloat(v) > 100;
        }
        if (configModel.commissionName.trim().length <= 0) {
            this.state.alert.text = 'Vui lòng nhập vào tên Cấu hình !';
            return false;
        }
        if (configModel.positionId === '' || parseInt(configModel.positionId, 10) <= 0) {
            this.state.alert.text = 'Vui lòng chọn vị trí cấu hình cho !';
            return false;
        }
        if (parseInt(configModel.yearPeriod, 10) < cDate.getFullYear()) {
            this.state.alert.text = 'Không được phép cấu hình cho quá khứ và tháng hiện tại !';
            return false;
        }
        if (parseInt(configModel.monthPeriod, 10) <= cDate.getMonth() + 1 && parseInt(configModel.yearPeriod, 10) === cDate.getFullYear()) {
            this.state.alert.text = 'Không được phép cấu hình cho quá khứ và hiện tại !';
            return false;
        }
        if (parseInt(configModel.commissionType, 10) <= 0) {
            this.state.alert.text = 'Vui lòng chọn loại cấu hình !';
            return false;
        }
        if (configModel.isFixed && isNotValidPercent(configModel.formular.percent)) {
            this.state.alert.text = 'Vui lòng nhập phần trăm hoa hồng !';
            return false;
        }
        if (configModel.formular.list.length <= 0) {
            this.state.alert.text = 'Không thể cập nhật/thêm mới cấu hình hoa hồng !';
            return false;
        }
        if (!configModel.isFixed) {
            const isValid = configModel.formular.list.filter(i => {
                if (i.data[0].value.toString().trim().length === 0 || parseFloat(i.data[0].value) < 0) {
                    this.state.alert.text = 'Vui lòng nhập số tiền lớn hơn 0 !';
                    return false;
                }
                if (parseInt(i.logicId, 10) !== LOGICAL_ID_NONE && (i.data[1].value.toString().trim().length === 0 || parseFloat(i.data[1].value) < 0)) {
                    this.state.alert.text = 'Vui lòng nhập số tiền lớn hơn 0 !';
                    return false;
                }
                if (isNotValidPercent(i.rate)) {
                    this.state.alert.text = '% hoa hồng chưa chính xác !';
                    return false;
                }
                return true;
            });
            if (isValid.length !== configModel.formular.list.length) {
                return false;
            }
        }
        return true;
    }
    componentDidMount() {
        this.props.functionServices.getCommissionFormDataUserPosition();
        this.props.functionServices.getCommissionFormDataType();
        this.props.functionServices.getCommissionFormDataFormularType();
        this.props.functionServices.getCommissionFormDataFormularOperator();
        this.props.functionServices.getCommissionFormDataFormularLogical();
        this.props.functionServices.getCommissionFormDataFormularCurrency();

        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            this.props.functionServices.getCommissionDetail(this.props.match.params.id, data => {
                const dt = data.data;
                const config = this.state.configModel;
                config.commissionId = dt.commissionId;
                config.commissionName = dt.commissionName;
                config.commissionType = dt.commissionType;
                config.positionId = dt.positionId;
                config.monthPeriod = dt.monthPeriod;
                config.yearPeriod = dt.yearPeriod;
                config.isFixed = false;
                this.state.canUpdate = true;

                const cDate = new Date();
                if (parseInt(dt.yearPeriod, 10) < cDate.getFullYear()) {
                    this.state.canUpdate = false;
                }
                if ((parseInt(dt.monthPeriod, 10) <= cDate.getMonth() + 1) && parseInt(dt.yearPeriod, 10) === cDate.getFullYear()) {
                    this.state.canUpdate = false;
                }

                if (parseInt(dt.commissionType, 10) === COMMISSION_TYPE_ID_FIXED) {
                    config.isFixed = true;
                    config.formular.percent = dt.commissionAccumulateList[0].percent;
                    this.setState({...this.state});
                    return;
                }
                config.formular.list = dt.commissionAccumulateList.map(i => {
                    const formular = new Formular();
                    formular.rate = i.percent;
                    formular.data = i.formulaCommissionList.map(l => {
                        const item = new FormularItem();
                        item.operator = l.operatorId;
                        item.value = l.value;
                        item.type = i.commissionFormulaTypeId;
                        item.currency = l.currencyId;
                        return item;
                    });
                    formular.logicId = i.formulaMap[1];
                    if (formular.data.length < 2) {
                        formular.data.push(new FormularItem());
                    }
                    return formular;
                });
                this.state.isLoading = false;
                this.setState({...this.state});
                return;
            });
            return;
        }
        this.state.isLoading = false;
        this.setState({...this.state});
    }
    onChangeElement = e => {
        this.setState({
            ...this.state,
            configModel: {
                ...this.state.configModel,
                [e.target.name]: e.target.value
            }
        }, this.checkValidate);
    }
    onChangeFormularChange = (e, uuid = '', uuidItem = '') => {
        const formular = this.state.configModel.formular;
        const list = formular.list.find(i => i.uuid === uuid);
        let item = null;
        if (list) {
            item = list.data.find(i => i.uuid === uuidItem);
        }
        switch (e.target.name) {
            case 'percent':
                if (parseFloat(e.target.value) > 100) {
                    formular.percent = 100;
                    break;
                }
                if (parseFloat(e.target.value) < 0) {
                    formular.percent = 0;
                    break;
                }
                formular.percent = parseFloat(e.target.value).toFixed(2);
                break;
            case 'rate':
                if (list) {
                    if (parseFloat(e.target.value) > 100) {
                        list.rate = 100;
                        break;
                    }
                    if (parseFloat(e.target.value) < 0) {
                        list.rate = 0;
                        break;
                    }
                    list.rate = parseFloat(e.target.value).toFixed(2);
                }
                break;
            case 'type':
                if (item) {
                    item.type = e.target.value;
                }
                break;
            case 'operator':
                if (item) {
                    item.operator = e.target.value;
                }
                break;
            case 'currency':
                if (item) {
                    item.currency = e.target.value;
                }
                break;
            case 'value':
                if (item) {
                    item.value = e.target.value;
                }
                break;
            case 'logic':
                if (list) {
                    list.logicId = e.target.value;
                }
                break;
        }
        this.state.configModel.formular = formular;
        this.setState({...this.setState});
    }
    onClickFormularAddHandle = e => {
        this.state.configModel.formular.list.push(new Formular(this.state.configModel.formular.list.length));
        this.setState({...this.state});
    }
    onClickFormularRemoveHanle = uuid => {
        if (this.state.configModel.formular.list.length <= 1) {
            return;
        }
        this.state.configModel.formular.list = this.state.configModel.formular.list.filter(l => l.uuid !== uuid);
        this.setState({...this.state});
    }
    checkValidate = () => {
        let isFixed = false;
        if (parseInt(this.state.configModel.commissionType, 10) === COMMISSION_TYPE_ID_FIXED) {
            isFixed = true;
        }
        if (this.state.configModel.isFixed !== isFixed) {
            this.state.configModel.isFixed = isFixed;
            this.setState({...this.state});
        }
    }
    onCloseAlert = () => {
        if (this.state.alert.btnClass === 'success' || this.state.alert.isDuplicate) {
            window.location = '/commission-config/index';
        }
        this.state.alert.show = false;
        this.state.alert.isDuplicate = false;
        this.setState({...this.state});
    }
    onClickSaveHandle = (e) => {
        if (!this.state.canUpdate) {
            return;
        }
        if (!this.isValidate()) {
            this.state.alert = {
                show: true,
                text: this.state.alert.text,
                btnClass: 'error',
                isDuplicate: false
            }
            this.setState({...this.state});
            return;
        }
        this.state.isLoading = true;
        this.setState({...this.state});
        this.props.functionServices.saveConfigModel(this.state.configModel, (data) => {
            this.state.isLoading = false;
            if (data.result && parseInt(data.code, 10) === 200) {
                this.state.alert = {
                    show: true,
                    text: 'Lưu Cấu hình thành công !',
                    btnClass: 'success',
                    isDuplicate: false
                };
                this.setState({...this.state});
                return;
            }
            this.state.alert = {
                show: true,
                text: data.message,//'Lỗi hệ thống: cập nhật thông tin cấu hình thất bại, vui lòng liên hệ admin',
                btnClass: 'error',
                isDuplicate: false
            }
            if (parseInt(data.code, 10) === 3001) {
                this.state.alert.isDuplicate = true;
            }
            this.setState({...this.state});
        });
    }
    render() {
        return (
            <>
                <div className="row">
                    <div className="col-md-12">
                        <div className="box box-primary">
                            <div className="box-header with-border">
                                <h3 className="box-title">Thiết lập cấu hình hoa hồng</h3>
                            </div>
                            <div className="box-body">
                                <form className="form form-horizal commission-form">
                                    <div className="form-group">
                                        <label className="form-text col-md-3 text">Tên hoa hồng <span className="required">*</span></label>
                                        <div className="col-md-6">
                                            <input className="form-control " required type="text" name="commissionName" id="commissionName" onChange={this.onChangeElement} value={this.state.configModel.commissionName} placeholder="Tên hoa hồng" />
                                        </div>
                                        <div className="clear"></div>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-text col-md-3 text">Cho đối tượng <span className="required">*</span></label>
                                        <div className="col-md-6">
                                            <select className="form-control" required name="positionId" id="positionId" onChange={this.onChangeElement} value={this.state.configModel.positionId} >
                                                <option value="">--Chức vụ--</option>
                                                {this.props.commissionConfigs.userPositions.map((i, k) =>
                                                    <option key={k} value={i.positionId}>{i.positionName}</option>
                                                )}
                                            </select>
                                        </div>
                                        <div className="clear"></div>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-text col-md-3 text">Kỳ tính <span className="required">*</span></label>
                                        <div className="col-md-2">
                                            <select className="form-control" name="monthPeriod" id="monthPeriod" onChange={this.onChangeElement} value={this.state.configModel.monthPeriod} >
                                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i, k) => <option key={k} value={i}>{i}</option>)}
                                            </select>
                                        </div>
                                        <div className="col-md-2">
                                            <select className="form-control" name="yearPeriod" id="yearPeriod" onChange={this.onChangeElement} value={this.state.configModel.yearPeriod} >
                                                {this._years.map((i, k) => <option key={k} value={i}>{i}</option>)}
                                            </select>
                                        </div>
                                        <div className="clear"></div>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-text col-md-3 text">Loại hoa hồng <span className="required">*</span></label>
                                        <div className="col-md-6">
                                            <select className="form-control" name="commissionType" id="commissionType" onChange={this.onChangeElement} value={this.state.configModel.commissionType} >
                                                {this.props.commissionConfigs.formTypes.map((i, k) =>
                                                    <option key={k} value={i.id}>{i.name}</option>
                                                )}
                                            </select>
                                        </div>
                                        <div className="clear"></div>
                                    </div>
                                    {this.state.configModel.isFixed &&
                                        <div className="form-group">
                                            <label className="form-text col-md-3 text">Hoa hồng <span className="required">*</span></label>
                                            <div className="col-md-2">
                                                <NumberFormat decimalScale="2" suffix=" %" decimalSeparator="." className="form-control" name="percent" onChange={this.onChangeFormularChange} value={this.state.configModel.formular.percent} placeholder="%" />
                                            </div>
                                            <div className="clear"></div>
                                        </div>
                                    }
                                    {!this.state.configModel.isFixed && <>
                                        <div className="form-group">
                                            <label className="form-text col-md-3 text">Chi tiết tích lũy <span className="required">*</span></label>
                                            <div className="clear"></div>
                                        </div>
                                        {this.state.configModel.formular.list.map((i, k) =>
                                            <div className="form-group bordered" key={k}>
                                                <div className="col-md-10">
                                                    <div className="">
                                                        <div className="col-md-5">
                                                            <div className="dflex">
                                                                <select className="form-control s-type" name="type" onChange={e => this.onChangeFormularChange(e, i.uuid, i.data[0].uuid)} value={i.data[0].type} >
                                                                    {this.props.commissionConfigs.formFormularTypes.map((i, k) =>
                                                                        <option key={k} value={i.id}>{i.name}</option>
                                                                    )}
                                                                </select>
                                                                <select className="form-control s-operator" name="operator" onChange={e => this.onChangeFormularChange(e, i.uuid, i.data[0].uuid)} value={i.data[0].operator} >
                                                                    {this.props.commissionConfigs.formFormularOperators.map((i, k) =>
                                                                        <option key={k} value={i.id}>{i.name}</option>
                                                                    )}
                                                                </select>
                                                                <NumberFormat decimalScale="2" thousandSeparator="," decimalSeparator="." className="form-control i-number" name="value" onChange={e => this.onChangeFormularChange(e, i.uuid, i.data[0].uuid)} placeholder="số tiền" value={i.data[0].value} />
                                                                <select className="form-control s-currency" name="currency" onChange={e => this.onChangeFormularChange(e, i.uuid, i.data[0].uuid)} value={i.data[0].currency} >
                                                                    {this.props.commissionConfigs.formFormularCurrencies.map((i, k) =>
                                                                        <option key={k} value={i.id}>{i.name}</option>
                                                                    )}
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-2">
                                                            <div className="dflex">
                                                                <select className="form-control s-operator-type" name="logic" onChange={e => this.onChangeFormularChange(e, i.uuid)} value={i.logicId} >
                                                                    {this.props.commissionConfigs.formFormularLogicals.map((i, k) =>
                                                                        <option key={k} value={i.id}>{i.name}</option>
                                                                    )}
                                                                </select>
                                                            </div>
                                                        </div>
                                                        {parseInt(i.logicId, 10) !== LOGICAL_ID_NONE &&
                                                            <div className="col-md-5">
                                                                <div className="dflex">
                                                                    <select className="form-control s-type" name="type" onChange={e => this.onChangeFormularChange(e, i.uuid, i.data[1].uuid)} value={i.data[1].type} >
                                                                        {this.props.commissionConfigs.formFormularTypes.map((i, k) =>
                                                                            <option key={k} value={i.id}>{i.name}</option>
                                                                        )}
                                                                    </select>
                                                                    <select className="form-control s-operator" name="operator" onChange={e => this.onChangeFormularChange(e, i.uuid, i.data[1].uuid)} value={i.data[1].operator} >
                                                                        {this.props.commissionConfigs.formFormularOperators.map((i, k) =>
                                                                            <option key={k} value={i.id}>{i.name}</option>
                                                                        )}
                                                                    </select>
                                                                    <NumberFormat decimalScale="2" thousandSeparator="," decimalSeparator="." className="form-control i-number" name="value" onChange={e => this.onChangeFormularChange(e, i.uuid, i.data[1].uuid)} placeholder="số tiền" value={i.data[1].value} />
                                                                    <select className="form-control s-currency" name="currency" onChange={e => this.onChangeFormularChange(e, i.uuid, i.data[1].uuid)} value={i.data[1].currency} >
                                                                        {this.props.commissionConfigs.formFormularCurrencies.map((i, k) =>
                                                                            <option key={k} value={i.id}>{i.name}</option>
                                                                        )}
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        }
                                                        <div className="clear"></div>
                                                    </div>
                                                </div>
                                                <div className="col-md-2">
                                                    <div className="dflex">
                                                        <NumberFormat decimalScale="2" suffix=" %" decimalSeparator="." className="form-control i-number" name="rate" onChange={e => this.onChangeFormularChange(e, i.uuid)} value={i.rate} placeholder="Hoa hồng %" />
                                                        <Link to="#" className="remove text-danger text" type="button" title="Xóa" onClick={e => this.onClickFormularRemoveHanle(i.uuid)}><i className="fa fa-times"></i></Link>
                                                    </div>
                                                </div>
                                                <div className="clear"></div>
                                            </div>
                                        )}

                                        <div>
                                            <div className="float-r">
                                                <button className="btn btn-primary" type="button" onClick={this.onClickFormularAddHandle}><i className="fa fa-plus"></i> Thêm</button>
                                            </div>
                                            <div className="clear"></div>
                                        </div>
                                    </>}
                                    <div className="form-group">
                                        <div className="col-md-3">
                                            <button className="btn btn-success" disabled={!this.state.canUpdate} type="button" onClick={this.onClickSaveHandle}><i className="fa fa-save"></i> Lưu</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <SweetAlert show={this.state.alert.show} showCloseButton={true} confirmBtnBsStyle={this.state.alert.btnClass} type="default" title={''} onConfirm={this.onCloseAlert} onCancel={this.onCloseAlert}>
                    <h2>&nbsp;</h2>
                    <p>{this.state.alert.text}</p>
                </SweetAlert>

                {this.state.isLoading && <Spinner />}
            </>
        );
    }
}

export default CommissionConfigForm;
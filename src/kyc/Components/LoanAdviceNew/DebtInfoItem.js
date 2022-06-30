import React, {Fragment} from "react";
import Select from 'react-select';
import NumberFormat from 'react-number-format';
import {stringify} from "uuid";

class DebtInfoItem extends React.Component {

    constructor(props) {
        super(props);
        this._STORED_LOCAL = {
            defaultValue: {value: '', label: "--- Vui lòng chọn ---"},
        };

        this.state = {
            debtInfo: props.debtInfoItem,
            districtOptions: [],
            wardOptions: [],
            streetOptions: []
        }
    }
    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.props) !== JSON.stringify(nextProps)) {
            let debtInfoItem = {
                ...nextProps.debtInfoItem,
                debtAmount: parseInt(nextProps.debtInfoItem.debt, 10),
                bank: this.props.banks.find(b => b.value == nextProps.debtInfoItem.bankId),
                paymentDebt: this.props.bankCredits.find(b => b.value == nextProps.debtInfoItem.paymentId),
                paymentHistory: this.props.paymentHistories.find(b => b.value == nextProps.debtInfoItem.historyPaymentId)
            };
            this.setState({debtInfo: debtInfoItem});
        }

    }

    handleChangeIncome = (val) => {
        this.setState({
            debtInfo: {
                ...this.state.debtInfo,
                debt: parseInt(val, 10),
                debtAmount: parseInt(val, 10)
            }
        }, () => {
            this.props.updateData({...this.state.debtInfo});
        })
    }

    handleChangeSelect($field, $option) {
        if ($field == "bankObj") {
            this.setState({
                debtInfo: {
                    ...this.state.debtInfo,
                    bankId: $option.value,
                    bank: $option
                }
            }, () => {
                this.props.updateData({...this.state.debtInfo});
            })
        }
        if ($field == "paymentDebtObj") {
            this.setState({
                debtInfo: {
                    ...this.state.debtInfo,
                    paymentId: $option.value,
                    paymentDebt: $option
                }
            }, () => {
                this.props.updateData({...this.state.debtInfo});
            })
        }
        if ($field == "paymentHistoryObj") {
            this.setState({
                debtInfo: {
                    ...this.state.debtInfo,
                    historyPaymentId: $option.value,
                    paymentHistory: $option
                }
            }, () => {
                this.props.updateData({...this.state.debtInfo});
            })
        }
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-md-11">
                            <div className="panel-group">
                                <div className="panel panel-default">
                                    <div className="panel-heading">
                                        <div className="row form-group">
                                            <div className="col-md-6">
                                                <div className="row">
                                                    <div className="col-xs-3 col-sm-3"><label className="pt5">Ngân hàng:</label></div>
                                                    <div className="col-sm-9">
                                                        <Select className="selectBank"
                                                            value={this.state.debtInfo.bank || this._STORED_LOCAL.defaultValue}
                                                            options={this.props.banks}
                                                            onChange={this.handleChangeSelect.bind(this, 'bankObj')}
                                                            isSearchable={false}
                                                            placeholder="--- Vui lòng chọn ---" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 ">
                                                <div className="row">
                                                    <div className="col-xs-3 col-sm-3"><label className="pt5">Sản phẩm:</label></div>
                                                    <div className="col-sm-9">
                                                        <Select className="selectBank"
                                                            value={this.state.debtInfo.paymentDebt || this._STORED_LOCAL.defaultValue}
                                                            isSearchable={false}
                                                            onChange={this.handleChangeSelect.bind(this, 'paymentDebtObj')}
                                                            options={this.props.bankCredits}
                                                            placeholder="--- Vui lòng chọn ---"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row form-group">
                                            <div className="col-md-6 ">
                                                <div className="row">
                                                    <div className="col-xs-3 col-sm-3"><label className="pt5">Dư nợ hiện tại:</label></div>
                                                    <div className="col-sm-9">
                                                        <NumberFormat suffix="đ"
                                                            thousandSeparator={true} type="text"
                                                            placeholder="Triệu đồng"
                                                            name="debt" onValueChange={({value}) => {
                                                                this.handleChangeIncome(value);
                                                            }} value={this.state.debtInfo.debtAmount} className="form-control" />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6 ">
                                                <div className="row">
                                                    <div className="col-xs-3 col-sm-3"><label className="pt5">Lịch sử trả nợ:</label></div>
                                                    <div className="col-sm-9">
                                                        <Select className="selectBank"
                                                            value={this.state.debtInfo.paymentHistory ?
                                                                this.state.debtInfo.paymentHistory : this._STORED_LOCAL.defaultValue}
                                                            isSearchable={false}
                                                            onChange={this.handleChangeSelect.bind(this, 'paymentHistoryObj')}
                                                            options={this.props.paymentHistories}
                                                            placeholder="--- Vui lòng chọn ---" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-1">
                            <div className="wrapper-add-remove-btn">
                                <i className="fa fa-plus-circle fa-2x custom-fa-plus-circle"
                                    aria-hidden="true"
                                    onClick={() => {this.props.onAdd()}}></i>
                                <i className="fa fa-minus-circle fa-2x custom-fa-minus-circle "
                                    aria-hidden="true"
                                    onClick={() => {
                                        this.props.onRemove(this.state.debtInfo)
                                    }}></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default DebtInfoItem;
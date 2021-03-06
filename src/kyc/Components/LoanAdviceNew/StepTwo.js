import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import Slider from 'react-slick';
import Select from 'react-select';
import NumberFormat from 'react-number-format';
import Warning from '../../../commonComponents/alert/warning';
import numberToCurrency from '../../../commonComponents/functions/numberToCurrency';

class LoanCalcForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loan: null,
            maxLoan: null,
            maxFormattedLoan: null,
            monthPayment: null,
            maxMonthPayment: null,
            loanTime: null,
            maxLoanTime: null,
            banks: [],
            selectedBanks: [],
            isCheckLoan: true,
            isCheckLoanTime: true,
            isCheckMonthPayment: true
        };
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.currentLoanInfo) {
            this.state.loan = nextProps.currentLoanInfo.defaultLoan || null;
            this.state.maxLoan = nextProps.currentLoanInfo.maxLoan || null;
            this.state.maxFormattedLoan = nextProps.currentLoanInfo.maxFormatedLoan.replace('  ', ' ');
            this.state.monthPayment = nextProps.currentLoanInfo.defaultMonthPayment;
            this.state.maxMonthPayment = nextProps.currentLoanInfo.maxMonthPayment;
            this.state.loanTime = nextProps.currentLoanInfo.defaultLoanTime;
            this.state.maxLoanTime = nextProps.currentLoanInfo.maxLoanTime;
            this.state.banks = nextProps.currentLoanInfo.bankList.map((x) => {return {value: x.id, label: x.name, };});

            this.state.isCheckLoan = nextProps.calcType !== 1;
            this.state.isCheckMonthPayment = nextProps.calcType !== 2;
            this.state.isCheckLoanTime = nextProps.calcType !== 3;

            this.setState({...this.state});
        }
    }

    onSelectBanks(selectedBanks) {
        this.state.selectedBanks = selectedBanks;
        this.setState({...this.state});
    }

    calcLoanDemand() {
        if (this.props.currentLoanInfo) {
            if (this.state.loan <= 0 || (this.state.maxLoan > 0 && this.state.loan > this.state.maxLoan)) {
                propzyNotifyAlert({type: "propzy-notify-danger", message: 'S??? ti???n vay ph???i l???n h??n 0 v?? nh??? h??n ' + numberToCurrency(this.state.maxLoan, ',')});
                return;
            }
            if (this.state.isCheckMonthPayment && (this.state.monthPayment <= 0 || (this.state.maxMonthPayment > 0 && this.state.monthPayment > this.state.maxMonthPayment))) {
                propzyNotifyAlert({type: "propzy-notify-danger", message: 'S??? ti???n tr??? h??ng th??ng ph???i l???n h??n 0 v?? nh??? h??n ' + numberToCurrency(this.state.maxMonthPayment, ',')});
                return;
            }
            if (this.state.isCheckLoanTime && (this.state.loanTime <= 0 || (this.state.maxLoanTime > 0 && this.state.loanTime > this.state.maxLoanTime))) {
                propzyNotifyAlert({type: "propzy-notify-danger", message: 'Th???i gian vay ph???i l???n h??n 0 v?? nh??? h??n ' + numberToCurrency(this.state.maxLoanTime, ',')});
                return;
            }
            let data = {
                typeId: this.props.calcType,
                loan: this.state.loan,
                monthPayment: this.state.monthPayment,
                loanTime: this.state.loanTime,
                bankIds: this.state.selectedBanks.map((x) => x.value),
                rlistingId: this.props.rlistingId,
                dealId: this.props.dealId,
            };

            this.props.functionServices.calcLoanDemand(data);
        }
    }

    render() {

        return (
            <div className="row">
                <div className="col-lg-12 loan-calc-form">
                    <div className="row my-2">
                        <div className="col-lg-6 col-md-6">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="control-label bl-checkbox">
                                        <input
                                            type="checkbox"
                                            id={'chk1'}
                                            checked={this.state.isCheckLoan}
                                            onClick={e => {
                                                if (this.state.isCheckLoan) {
                                                    this.setState({isCheckLoan: false, isCheckLoanTime: true, isCheckMonthPayment: true});
                                                    this.props.functionServices.changeCalcType(1);
                                                }
                                            }}
                                            disabled={this.props.calcType === 1}
                                        />
                                        <label
                                            className="loan-label"
                                            htmlFor={'chk1'}
                                        >
                                            S??? ti???n vay:
                                        </label>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <NumberFormat
                                        value={this.state.loan || null}
                                        type="text"
                                        className="form-control"
                                        thousandSeparator={','}
                                        disabled={this.props.calcType === 1}
                                        onValueChange={({value}) => {
                                            this.state.loan = value;
                                            this.setState({...this.state}, () => {
                                                let updateData = {
                                                    loan: this.state.loan,
                                                    monthPayment: this.state.monthPayment,
                                                    loanTime: this.state.loanTime,
                                                };
                                                this.props.functionServices.updateCurrentLoanInfo(updateData);
                                            });
                                        }}

                                        maxLength="18"
                                    />
                                </div>
                                <div className="col-lg-12">
                                    <em>
                                        S??? ti???n vay t???i ??a cho B??S ???????c ch???n l??: {this.state.maxFormattedLoan ? ' ' + this.state.maxFormattedLoan : ''}
                                    </em>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="control-label bl-checkbox">
                                        <input
                                            type="checkbox"
                                            id={'chk2'}
                                            checked={this.state.isCheckMonthPayment}
                                            onClick={e => {
                                                if (this.state.isCheckMonthPayment) {
                                                    this.setState({isCheckLoan: true, isCheckLoanTime: true, isCheckMonthPayment: false});
                                                    this.props.functionServices.changeCalcType(2);
                                                }
                                            }}
                                            disabled={this.props.calcType === 2} />
                                        <label className="loan-label" htmlFor={'chk2'}>
                                            S??? ti???n tr??? h??ng th??ng:
                                        </label>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <NumberFormat
                                        value={this.state.monthPayment || null}
                                        type="text"
                                        className="form-control"
                                        thousandSeparator={','}
                                        disabled={this.props.calcType === 2}
                                        onValueChange={({value}) => {
                                            this.state.monthPayment = value;
                                            this.setState({...this.state}, () => {
                                                let updateData = {
                                                    loan: this.state.loan,
                                                    monthPayment: this.state.monthPayment,
                                                    loanTime: this.state.loanTime,
                                                };
                                                this.props.functionServices.updateCurrentLoanInfo(updateData);
                                            });
                                        }}
                                        maxLength="12"
                                    />
                                </div>
                                <div className="col-lg-12">
                                    <em
                                        className={Number(this.state.maxMonthPayment) ? '' : 'hidden'}
                                    >
                                        S??? ti???n tr??? h??ng th??ng t???i ??a t??nh theo
                                        thu nh???p c???a b???n:
                                        {Number(this.state.maxMonthPayment) ? ' ' + Number(this.state.maxMonthPayment).toLocaleString() + ' ?????ng' : ''}
                                    </em>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row my-2">
                        <div className="col-lg-6 col-md-6">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="control-label bl-checkbox">
                                        <input
                                            type="checkbox"
                                            id={'chk3'}
                                            checked={this.state.isCheckLoanTime}
                                            onClick={e => {
                                                if (this.state.isCheckLoanTime) {
                                                    this.setState({isCheckLoan: true, isCheckLoanTime: false, isCheckMonthPayment: true});
                                                    this.props.functionServices.changeCalcType(3);
                                                }
                                            }}
                                            disabled={this.props.calcType === 3}
                                        />
                                        <label
                                            className="loan-label"
                                            htmlFor={'chk3'}
                                        >
                                            Th???i gian vay (n??m):
                                        </label>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <NumberFormat
                                        value={this.state.loanTime || null}
                                        type="text"
                                        className="form-control"
                                        thousandSeparator={','}
                                        disabled={this.props.calcType === 3}
                                        onValueChange={({value}) => {
                                            this.state.loanTime = value;
                                            this.setState({...this.state}, () => {
                                                let updateData = {
                                                    loan: this.state.loan,
                                                    monthPayment: this.state.monthPayment,
                                                    loanTime: this.state.loanTime,
                                                };
                                                this.props.functionServices.updateCurrentLoanInfo(updateData);
                                            });
                                        }}
                                        maxLength="2"
                                    />
                                </div>
                                <div className="col-lg-12">
                                    <em>
                                        Th???i h???n vay t???i ??a:
                                        {this.state.maxLoanTime
                                            ? ' ' +
                                            this.state.maxLoanTime +
                                            ' n??m'
                                            : ''}
                                    </em>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <div className="row">
                                <div className="col-lg-12">
                                    <label className="loan-label last">
                                        L??i su???t:
                                    </label>
                                </div>
                                <div className="col-lg-12">
                                    <Select
                                        value={this.state.selectedBanks}
                                        options={this.state.banks}
                                        onChange={(selectedBanks) =>
                                            this.onSelectBanks(selectedBanks)
                                        }
                                        isMulti={true}
                                        placeholder="T???t c???"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row my-2">
                        <div className="col-lg-12 text-right">
                            <button className="btn-calc" onClick={() => this.calcLoanDemand()}> T??nh to??n </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class Paginate extends Component {
    constructor(props) {
        super(props);
        this.handleClickPage = this.handleClickPage.bind(this);
        this.state = {
            block: 5,
        };
    }

    handleClickPage = (page) => (e) => {
        this.props.onClickPage(page);
    };

    render() {
        const settings = {
            dots: false,
            dotsClass: 'slick-dots slick-thumb',
            infinite: false,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
        };
        const {list, current} = this.props;
        const {block} = this.state;
        let indexPage = 0;
        const pagging = list.map((it, index) => {
            let active = false;
            if (current == it.rlistingId) {
                active = true;
                indexPage = index;
            }
            return (
                <div
                    key={'div-' + it.rlistingId}
                    className={'slide-item' + (active ? ' active' : '')}
                    onClick={this.handleClickPage(it.rlistingId)}
                >
                    <img
                        src={it.photos[0].link}
                        alt={it.photos[0].alt}
                        style={{maxHeight: '150px'}}
                    />
                    <div>Gi??: {it.formattedPriceVND}</div>
                </div>
            );
        });

        return (
            <div className="row mt-4">
                <div className="col-lg-12">
                    <div className="bl-pagination">
                        <Slider
                            {...settings}
                            className={'slider-for'}
                            style={{maxHeight: '150px'}}
                        >
                            {pagging}
                        </Slider>
                    </div>
                </div>
            </div>
        );
    }
}

class LoanResult extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loanBankCheckboxes: {},
            canCompareBank: true,
            checkedCount: 0,
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.loanCalcResult && nextProps.loanCalcResult.list && nextProps.loanCalcResult.list.length) {

            this.state.loanBankCheckboxes = {};
            nextProps.loanCalcResult.list.map((x) => {
                this.state.loanBankCheckboxes[x.id] = false;
            });
            this.state.checkedCount = 0;
            this.setState({...this.state});
        }
    }

    onCompareCheckBoxChange(event) {
        let id = event.target.id;
        this.state.loanBankCheckboxes[id] = !this.state.loanBankCheckboxes[id];

        this.state.checkedCount = 0;
        for (let key in this.state.loanBankCheckboxes) {
            if (this.state.loanBankCheckboxes[key]) {
                ++this.state.checkedCount;
            }
        }
        this.setState({...this.state});
    }

    getloanDetails() {
        let elements = '';

        if (
            this.props.loanCalcResult &&
            this.props.loanCalcResult.list &&
            this.props.loanCalcResult.list.length
        ) {
            elements = this.props.loanCalcResult.list.map((x) => (
                <tr key={'tr-' + x.id}>
                    <td className="text-left">{x.name}</td>
                    <td>{x.interestedRate + '%'}</td>
                    <td>
                        {x.typeId === 3
                            ? x.formatedCalculatedLoanTime
                            : x.inputLoanTime.toLocaleString() + ' n??m'}
                    </td>
                    <td
                        className={
                            x.typeId === 1 && x.isLoanLarger ? 'alert-loan' : ''
                        }
                    >
                        {x.typeId === 1
                            ? x.calculatedLoan.toLocaleString() + ' ??'
                            : x.inputLoan.toLocaleString() + ' ??'}
                    </td>
                    <td
                        className={
                            x.typeId === 2 && x.isMonthPaymentLarger
                                ? 'alert-loan'
                                : ''
                        }
                    >
                        {x.typeId === 2
                            ? x.calculatedMonthPayment.toLocaleString() + ' ??'
                            : x.inputMonthPayment.toLocaleString() + ' ??'}
                    </td>
                    <td>{x.totalInterestedPaid.toLocaleString() + ' ??'}</td>
                    <td>
                        <div className="control-label bl-checkbox">
                            <input
                                type="checkbox"
                                id={x.id}
                                checked={this.state.loanBankCheckboxes[x.id]}
                                onChange={this.onCompareCheckBoxChange.bind(
                                    this
                                )}
                                disabled={
                                    !(this.state.checkedCount < 3) &&
                                    !this.state.loanBankCheckboxes[x.id]
                                }
                            />
                            <label htmlFor={x.id}></label>
                        </div>
                    </td>
                </tr>
            ));
        }

        return elements;
    }

    removeBank(event) {
        let id = event.target.dataset.id;
        let stateClone = Object.assign({}, this.state);
        stateClone.loanBankCheckboxes[id] = !stateClone.loanBankCheckboxes[id];

        stateClone.checkedCount = 0;
        for (let key in stateClone.loanBankCheckboxes) {
            if (stateClone.loanBankCheckboxes[key]) {
                ++stateClone.checkedCount;
            }
        }

        this.setState(stateClone);

        if (!stateClone.checkedCount) {
            document.getElementById('btn-close').click();
        }
    }

    getBankRowData(type) {
        let elements = [];

        if (
            this.props.loanCalcResult &&
            this.props.loanCalcResult.list &&
            this.props.loanCalcResult.list.length
        ) {
            let loanBankCheckboxes = this.state.loanBankCheckboxes;
            let checkedBankIds = Object.keys(loanBankCheckboxes)
                .map(function (key, index) {
                    if (loanBankCheckboxes[key]) {
                        return key;
                    }
                })
                .filter((x) => x);

            let checkedBanks = this.props.loanCalcResult.list
                .map((x) => {
                    if (checkedBankIds.includes(String(x.id))) {
                        return x;
                    }
                })
                .filter((x) => x);

            for (let i = 0; i < 3; i++) {
                switch (type) {
                    // header
                    case 1:
                        elements.push(
                            checkedBanks.length > i ? (
                                <th key={i + 1} className="col-bank">
                                    G??i vay {i + 1}
                                </th>
                            ) : (
                                    <th key={i + 1} className="col-bank"></th>
                                )
                        );
                        break;

                    // footer
                    case 2:
                        elements.push(
                            checkedBanks.length > i ? (
                                <td className="col-bank">
                                    <button
                                        data-id={checkedBanks[i].id}
                                        onClick={this.removeBank.bind(this)}
                                        style={{
                                            width: '140px',
                                            fontWeight: '1',
                                            borderWidth: '1px',
                                            padding: '0 0px 0 32px',
                                        }}
                                    >
                                        <span style={{left: '15px'}}>x</span>
                                        X??a g??i vay
                                    </button>
                                </td>
                            ) : (
                                    <td className="col-bank"></td>
                                )
                        );
                        break;

                    // ng??n h??ng
                    case 3:
                        elements.push(
                            checkedBanks.length > i ? (
                                <td className="col-bank">
                                    {checkedBanks[i].code}
                                </td>
                            ) : (
                                    <td className="col-bank"></td>
                                )
                        );
                        break;

                    // s??? ti???n vay
                    case 4:
                        elements.push(
                            checkedBanks.length > i ? (
                                checkedBanks[i].typeId === 1 ? (
                                    <td className="col-bank">
                                        {checkedBanks[i].formatedCalculatedLoan}
                                    </td>
                                ) : (
                                        <td className="col-bank">
                                            {checkedBanks[i].formatedInputLoan}
                                        </td>
                                    )
                            ) : (
                                    <td className="col-bank"></td>
                                )
                        );
                        break;

                    // l??i su???t
                    case 5:
                        elements.push(
                            checkedBanks.length > i ? (
                                <td className="col-bank">
                                    {checkedBanks[i].formatedInterestedRate}
                                </td>
                            ) : (
                                    <td className="col-bank"></td>
                                )
                        );
                        break;

                    // th???i gian vay
                    case 6:
                        elements.push(
                            checkedBanks.length > i ? (
                                checkedBanks[i].typeId === 3 ? (
                                    <td className="col-bank">
                                        {
                                            checkedBanks[i]
                                                .formatedCalculatedLoanTime
                                        }
                                    </td>
                                ) : (
                                        <td className="col-bank">
                                            {checkedBanks[i].inputLoanTime + ' n??m'}
                                        </td>
                                    )
                            ) : (
                                    <td className="col-bank"></td>
                                )
                        );
                        break;

                    // s??? ti???n tr??? th??ng ?????u
                    case 7:
                        elements.push(
                            checkedBanks.length > i ? (
                                <td className="col-bank">
                                    {
                                        checkedBanks[i]
                                            .formatedInterestPaidMonthly
                                    }
                                </td>
                            ) : (
                                    <td className="col-bank"></td>
                                )
                        );
                        break;

                    // t???ng l??i ph???i tr???
                    case 8:
                        elements.push(
                            checkedBanks.length > i ? (
                                <td className="col-bank">
                                    {checkedBanks[i].formatedTotalInterestPaid}
                                </td>
                            ) : (
                                    <td className="col-bank"></td>
                                )
                        );
                        break;

                    // t???ng s??? ti???n ph???i tr???
                    case 9:
                        elements.push(
                            checkedBanks.length > i ? (
                                <td className="col-bank">
                                    {checkedBanks[i].formatedTotal}
                                </td>
                            ) : (
                                    <td className="col-bank"></td>
                                )
                        );
                        break;

                    default:
                        elements.push(<td className="col-bank"></td>);
                        break;
                }
            }
        }

        return <Fragment>{elements}</Fragment>;
    }

    render() {
        return (
            <div className="row">
                <div className="col-lg-12">
                    <h4>
                        <b>K???t qu???:</b>
                    </h4>
                </div>
                <div className="col-lg-12">
                    <div className="table-responsive">
                        <table className="loan-result-table table table-striped table-bordered table-hover table-condensed">
                            <thead>
                                <tr>
                                    <th>Ng??n h??ng</th>
                                    <th>L??i su???t</th>
                                    <th>Th???i gian vay</th>
                                    <th>Ti???n vay</th>
                                    <th>Tr??? h??ng th??ng</th>
                                    <th>T???ng l??i ph???i tr???</th>
                                    <th>
                                        <button
                                            className={
                                                this.state.checkedCount < 3
                                                    ? 'disabled'
                                                    : ''
                                            }
                                            disabled={
                                                this.state.checkedCount < 3
                                            }
                                            data-toggle="modal"
                                            data-target="#compareModal"
                                        >
                                            So s??nh
                                            {this.state.checkedCount
                                                ? ' (' +
                                                this.state.checkedCount +
                                                ')'
                                                : ''}
                                        </button>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>{this.getloanDetails()}</tbody>
                        </table>
                    </div>
                </div>
                <div className="col-lg-12">
                    <p>
                        <b>Ghi ch??:</b>
                    </p>
                    <p>
                        * C??ng c??? ?????c t??nh kho???n vay tr??n website ch??? mang t??nh
                        ch???t tham kh???o.
                    </p>
                    <p>
                        * M??u ????? th??? hi???n s??? ti???n v?????t qua s??? ti???n vay t???i ??a
                        ho???c s??? ti???n tr??? h??ng th??ng d???a tr??n thu nh???p c???a b??n v??
                        c??c quy ?????nh c???a ng??n h??ng.
                    </p>
                </div>
                <div className="col-lg-12">
                    <div id="compareModal" className="modal fade" role="dialog">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="title-header">
                                    <h3>So s??nh c??c g??i vay mua nh??</h3>
                                    <span id="btn-close" data-dismiss="modal">
                                        x
                                    </span>
                                </div>
                                <div className="content-body">
                                    <table className="compare-table table table-striped table-bordered table-hover table-condensed">
                                        <thead>
                                            <tr>
                                                <th className="col-label">
                                                    &nbsp;
                                                </th>
                                                {this.getBankRowData(1)}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="col-label">
                                                    Ng??n h??ng
                                                </td>
                                                {this.getBankRowData(3)}
                                            </tr>
                                            <tr>
                                                <td className="col-label">
                                                    S??? ti???n vay
                                                </td>
                                                {this.getBankRowData(4)}
                                            </tr>
                                            <tr>
                                                <td className="col-label">
                                                    L??i su???t
                                                </td>
                                                {this.getBankRowData(5)}
                                            </tr>
                                            <tr>
                                                <td className="col-label">
                                                    Th???i h???n vay
                                                </td>
                                                {this.getBankRowData(6)}
                                            </tr>
                                            <tr>
                                                <td className="col-label">
                                                    S??? ti???n tr??? th??ng ?????u
                                                </td>
                                                {this.getBankRowData(7)}
                                            </tr>
                                            <tr>
                                                <td className="col-label">
                                                    T???ng l??i ph???i tr???
                                                </td>
                                                {this.getBankRowData(8)}
                                            </tr>
                                            <tr>
                                                <td className="col-label">
                                                    T???ng s??? ti???n ph???i tr???
                                                </td>
                                                {this.getBankRowData(9)}
                                            </tr>
                                        </tbody>
                                        <tfoot>
                                            <tr>
                                                <td className="col-label">
                                                    &nbsp;
                                                </td>
                                                {this.getBankRowData(2)}
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class StepTwo extends Component {
    constructor(props) {
        super(props);

        let urlParams = new URLSearchParams(window.location.search);
        let dealId = urlParams.get('dealId');

        this.state = {
            dealId: dealId != null ? parseInt(dealId) : null,
        };

        this.onClickPage = this.onClickPage.bind(this);
    }

    componentDidMount() {
        this.props.functionServices.fetchRelatedListing({
            dealId: this.state.dealId,
        });
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return true;
    }

    onClickPage(currentListing) {
        this.setState({
            indexSlider: 0,
        });

        let data = {
            rlistingId: currentListing,
            calcType: this.props.contentStored.loanAdviceReducerNew.calcType,
            dealId: this.state.dealId,
        };

        this.props.functionServices.onChangeIndexListing(data);
    }

    render() {
        let {
            rListings,
            currentListing,
            isLoadedCurrentListing,
        } = this.props.contentStored.loanAdviceReducerNew;
        rListings = rListings ? rListings : [];

        let data = {
            rlistingId: currentListing,
        };
        const warningMessage = <>
            <div>
                Kh??ng th??? t??nh to??n kho???n vay khi ch??a l???a ch???n listing. Vui l??ng ki???m tra l???i.<br />
                <a className={'btn btn-info'} href={`/kyc/buyer-confirm-requirements?dealId=${this.state.dealId}`}>Quay l???i</a>
            </div>
        </>;

        return (
            <div className="container" >
                {!currentListing && isLoadedCurrentListing && <Warning content={warningMessage} />}
                {
                    currentListing && <>
                        <Paginate
                            current={currentListing}
                            list={rListings}
                            onClickPage={this.onClickPage} />
                        <LoanCalcForm
                            currentLoanInfo={this.props.contentStored.loanAdviceReducerNew.currentLoanInfo}
                            calcType={this.props.contentStored.loanAdviceReducerNew.calcType}
                            functionServices={this.props.functionServices}
                            rlistingId={data.rlistingId}
                            dealId={this.state.dealId} />
                        <LoanResult loanCalcResult={this.props.contentStored.loanAdviceReducerNew.loanCalcResult} />
                    </>
                }
            </div >
        );
    }
}

export default connect()(React.memo(StepTwo));

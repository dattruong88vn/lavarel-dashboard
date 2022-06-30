import React, {Component, Fragment} from "react"

import CloneDealOtherBA from "./modal/CloneDealOtherBA"
import NewNeed from "./modal/NewNeed"
import ReopenDeal from "./modal/ReopenDeal"

import * as Utils from "../../Utils"
import * as LabelBtn from "../../constant/LabelButton"
import {
    MODAL_FORM_CONSULT,
    MODAL_FORM_NEW_NEED,
    MODAL_FORM_REOPEN,
} from "../../constant/Message"

class CheckingInfo extends Component {
    constructor(props) {
        super(props)

        this.state = {
            dealIdSelected: null,
            disabledRightCusBtn: true,
            modalClonedDeal: false,
            modalReopen: false,
            modalNewNeed: false,
        }
        this._TABLE_CHECKING = props.checking.tableChecking
        this.chkChecking = null
        this.reopenDeal = null
    }

    componentWillUnmount() {
        this._TABLE_CHECKING = null
        $(document).off("#tableChecking tbody")
        $("#tableChecking").DataTable().clear()
        $("#tableChecking").DataTable().destroy()
        $("#tableChecking tbody").empty()
    }

    componentDidMount() {
        const {checking, setTableChecking} = this.props
        if (!checking.dealGroup) {
            this.configTableChecking(checking.dataChecking.customers, setTableChecking)
        }

        // set dataTable for list grouped deals
        if (checking.dealGroup) {
            this.configTableChecking(checking.dealGroup.customers, setTableChecking)
        }
    }

    componentWillReceiveProps(nextProps) {
        const {setTableChecking} = this.props
        if (nextProps.checking.tableChecking) {
            this._TABLE_CHECKING = nextProps.checking.tableChecking
        }

        if (JSON.stringify(this.props.checking.dataChecking) != JSON.stringify(nextProps.checking.dataChecking)) {
            $("#tableChecking").dataTable().fnDestroy();

            this.configTableChecking(nextProps.checking.dataChecking.customers, setTableChecking)
        }
        // close New Need modal
        if (nextProps.checking.postData.checkingDuplicate) {
            this.setState({
                modalNewNeed: false,
            })
        }
    }

    bindEvents() {
        let that = this
        $(document)
            .off("#tableChecking tbody")
            .on('click', 'li.paginate_button', function (e) {
                if ($(this).hasClass('active')) {
                    return e.preventDefault();
                }
                $('input[type=checkbox].chkChecking').prop('checked', false);
                return e.preventDefault();
            })
            .off("click", ".chkChecking")
            .on("click", ".chkChecking", function (e) {
                $('input[type=checkbox].chkChecking').prop('checked', false);
                $(this).prop('checked', true);
                // check to disabled right customer btn
                let disabledRightCusBtn = true
                if (e.target.checked) {
                    disabledRightCusBtn = false
                }
                that.setState({
                    disabledRightCusBtn,
                })

                that.props.setRightCustomer({
                    leadId: $(this).attr('data-lead-id'),
                    isGroup: $(this).attr('data-is-group').toLowerCase() === 'true',
                });


                $("#dealModal").modal({
                    backdrop: "static",
                    keyboard: false,
                    show: false,
                })
            })
        $(document)
            .off("#tableChecking tbody")
            .off("click", ".reopen-deal")
            .on("click", ".reopen-deal", function () {
                if (that._TABLE_CHECKING) {
                    var data = that._TABLE_CHECKING
                        .row($(this).parents("tr"))
                        .data()

                    if (data) {
                        that.setState({
                            dealIdSelected: data.dealIds[0],
                            modalReopen: true,
                        })
                    }
                }
            })
    }

    configTableChecking = (data, setTableChecking) => {
        if (this._TABLE_CHECKING) {
            this._TABLE_CHECKING = null
            setTableChecking(null)
            $("#tableChecking").DataTable().clear()
            $("#tableChecking").DataTable().destroy()
            $("#tableChecking tbody").empty()
        }

        this._TABLE_CHECKING = $("#tableChecking").DataTable({
            data,
            paging: true,
            searching: false,
            ordering: false,
            lengthChange: false,
            pageLength: 10,
            bInfo: false,
            language: DatatableHelper.languages.vn,
            columns: Utils._TABLE_COLUMNS,
        })

        this.bindEvents()
        setTableChecking(this._TABLE_CHECKING)
    }

    // action unlock deal
    handleClose = () => {
        this.setState({
            dealIdSelected: null,
            modalReopen: false,
        })
    }
    handleShow = () => {
        this.setState({
            modalReopen: true,
        })
    }
    handleSave = (progressQuoId) => {
        const {dealIdSelected} = this.state
        const {onUnlockDealLead} = this.props

        // dataPost
        const dataPost = {
            type: "deal",
            progressQuoId: progressQuoId,
            needId: dealIdSelected,
            reasonCode: "UNCLOCK_DEAL",
            note: null,
        }

        // dispatch
        onUnlockDealLead(dataPost)
    }

    toggleHistoryCustomerModal = (data) => {
        const {handleShowModalHistoryCustomer} = this.props

        handleShowModalHistoryCustomer(data)
    }

    renderTC(data) {
        let numberOfVisitTc = 0
        if (data.numberOfVisitTc) {
            numberOfVisitTc = data.numberOfVisitTc
        }

        let closedVisitDate = "N/A"
        if (data.closedVisitDate) {
            closedVisitDate = moment(data.closedVisitDate).format(
                "HH:mm - DD/MM/YYYY"
            )
        }

        return (
            <React.Fragment>
                <a
                    className="btn-history-customer"
                    href="javascript:;"
                    onClick={() => this.toggleHistoryCustomerModal(true)}
                >
                    {numberOfVisitTc} lần
                </a>{" "}
                - Lần ghé thăm gần nhất: {closedVisitDate}
            </React.Fragment>
        )
    }

    toggleNewNeedModal = () => {
        this.setState({
            modalNewNeed: !this.state.modalNewNeed,
        })
    }

    render() {
        const {
            dealIdSelected,
            disabledRightCusBtn,
            modalNewNeed,
            modalReopen,
        } = this.state

        const {
            checking,
            className,
            handleChangeSelect,
            onGetListTypeLand,
            onSaveModalClonedDeal,
            onToggleModalCloneDeal,
        } = this.props

        let {dataChecking, dealCloning, listReasons, rightCus} = checking

        let nameOfColumns = Utils._TABLE_COLUMNS.map((column) => {
            return (
                <th key={`${className}-${column.data}`}>
                    {column.name ? column.name : ""}
                </th>
            )
        })

        // data Reopen Deal for modal
        const dataReopenDeal = {
            dealId: dealIdSelected,
            listReasons,
        }

        // data Cloned Deal for modal
        const dataListClonedReasons = {
            clonedReasons: dealCloning.clonedReasons,
            leadId: rightCus.leadId,
        }

        // data New Need for modal
        const dataNewNeedProps = {
            checking,
            listRadioNeed: checking.listRadioNeed,
            listGroup: checking.listGroup,
            listTypeLand: checking.listTypeLand,
            phone: rightCus.phone,
            onGetListTypeLand,
        }

        return (
            <Fragment>
                <div className="container">
                    <div className="form-group">
                        <h4>Thông tin khách hàng</h4>
                        <div className="info-customer-type">
                            <p>
                                <strong>- Loại khách hàng: </strong>
                                {dataChecking.visitorTypeName
                                    ? dataChecking.visitorTypeName
                                    : "N/A"}
                            </p>
                            <p>
                                <strong>- Lịch sử giao dịch: </strong>
                                {dataChecking.historyTrading
                                    ? dataChecking.historyTrading
                                    : "N/A"}
                            </p>
                            <p>
                                <strong>- Số lần tới TC: </strong>
                                {dataChecking.numberOfVisitTc > 0
                                    ? this.renderTC(dataChecking)
                                    : "N/A"}
                            </p>
                        </div>
                    </div>
                    <div className="form-group">
                        <table
                            id="tableChecking"
                            className="table table-checking dataTable"
                        >
                            <thead>
                                <tr>{nameOfColumns}</tr>
                            </thead>
                        </table>
                    </div>
                    <div className="form-group text-center mt15">
                        <button
                            className="btn btn-kyc consult"
                            disabled={disabledRightCusBtn}
                            onClick={this.props.rightCustomer.bind(this)}
                        >
                            Đúng khách - Tư vấn
                        </button>
                        <button
                            className="btn btn-kyc consult-new"
                            onClick={() => this.toggleNewNeedModal()}
                        >
                            Tư vấn nhu cầu mới
                        </button>
                    </div>

                    <div id="dealModal" className="modal fade" role="dialog">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <button
                                        type="button"
                                        className="close"
                                        data-dismiss="modal"
                                    >
                                        &times;
                                    </button>

                                    <h4 className="modal-title">
                                        Thông báo lỗi
                                    </h4>
                                </div>
                                <div className="modal-body">
                                    <p>
                                        Lead được chọn chưa được tạo meeting.
                                        Vui lòng liên hệ TM_[Tên TM] để được hỗ
                                        trợ
                                    </p>
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-kyc"
                                        data-dismiss="modal"
                                    >
                                        Đóng
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <ReopenDeal
                    className="custom-modal"
                    closeLabel={LabelBtn.REOPEN_DEAL_CANCEL}
                    headContent={MODAL_FORM_REOPEN}
                    dataProps={dataReopenDeal}
                    saveLabel={LabelBtn.REOPEN_DEAL_OK}
                    show={modalReopen}
                    handleClose={() => this.handleClose()}
                    handleSave={(progressQuoId) => this.handleSave(progressQuoId)}
                />
                <CloneDealOtherBA
                    className="custom-modal"
                    closeLabel={LabelBtn.CLONED_DEAL_CANCEL}
                    dataProps={dataListClonedReasons}
                    headContent={MODAL_FORM_CONSULT}
                    saveLabel={LabelBtn.CLONED_DEAL_OK}
                    show={dealCloning.isClonedDeal}
                    handleClose={() => onToggleModalCloneDeal(false)}
                    handleSave={(dataSave) => onSaveModalClonedDeal(dataSave)}
                />
                <NewNeed
                    className="custom-modal"
                    closeLabel={LabelBtn.NEW_NEED_CANCEL}
                    dataProps={dataNewNeedProps}
                    headContent={MODAL_FORM_NEW_NEED}
                    saveLabel={LabelBtn.NEW_NEED_OK}
                    show={modalNewNeed}
                    handleChangeSelect={handleChangeSelect}
                    handleClose={() => this.toggleNewNeedModal()}
                />
            </Fragment>
        )
    }
}

export default CheckingInfo

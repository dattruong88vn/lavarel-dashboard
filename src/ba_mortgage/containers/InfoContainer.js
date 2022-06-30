import React, { Component } from "react"
import Select from "react-select"
import { connect } from "react-redux"
import ModalListImage from "../../mortgage/components/ModalListImage"
import { actDeleteListingInfo } from "./../actions/index"
import NumberFormat from "react-number-format"
import Truncate from "react-truncate"
import { actionRemovePhotoInProfile } from "../actions"

class Section extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: {
                label: this.props.info.rlistingId,
                value: this.props.info.rlistingId,
            },
        }
        this._SELECT_DEFAULT = {
            value: {
                label: "--- Vui lòng chọn ---",
                value: "",
            },
        }
        this.handleChange = this.handleChange.bind(this)
        this.submit = this.submit.bind(this)
        this.handleChangeInput = this.handleChangeInput.bind(this)
        this.handleChangeProfile = this.handleChangeProfile.bind(this)
        this.uploadFiles = this.uploadFiles.bind(this)
        this.mapIdMarriage = this.mapIdMarriage.bind(this)
        this.handleChangeIncome = this.handleChangeIncome.bind(this)
        this.bindEvents()
    }

    handleChange(value) {
        this.setState({ value: value })
        let _value = value.value == "" ? null : value.value
        this.props.dispatch({
            type: "SET_FIELD",
            name: "rlistingId",
            value: _value,
        })
        this.props.getCollateral({
            requestId: this.props.info.id,
            listingId: _value,
        })
    }

    mapIdMarriage(boolean) {
        // boolean true : kết hôn
        let _info = this.props.info
        let _marriageProfiles = _info.marriageProfiles // all _marriageProfiles
        let resp = {}
        _marriageProfiles.forEach(function (marr, index) {
            if (boolean && marr.typeId == 1118) {
                resp = marr
            } else if (!boolean && marr.typeId == 1117) {
                resp = marr
            }
        })
        // return _tmpObjMarriage[0];
        return [resp]
    }

    handleChangeInput(e) {
        let _name = e.target.name
        let _value = e.target.value
        let that = this
        if (_name == "isMarried") {
            _value = _value == 1 ? true : false
            // that.mapIdMarriage(_value);
            let _info = this.props.info
            _info.profiles.map(function (profile, index) {
                if (profile.typeId == 1114) {
                    // hồ sơ cá nhân
                    let childs = _info.profiles[index].childs // array object hiện tại
                    let marriageForMap = that.mapIdMarriage(_value) // array mảng hiện tại
                    marriageForMap.forEach(function (marria, kMarria) {
                        childs.forEach(function (chi, kChi) {
                            chi.profileInfos.forEach(function (cpi, kcpi) {
                                marria.profileInfos.forEach(function (
                                    mpi,
                                    kmpi
                                ) {
                                    if (mpi.typeId == cpi.typeId) {
                                        marriageForMap[kMarria].profileInfos[
                                            kmpi
                                        ] = cpi
                                    }
                                })
                            })
                        })
                    })
                    _info.profiles[index].childs = marriageForMap
                }
            })
            this.props.dispatch({ type: "FETCH_INFO_MORTGAGE", payload: _info })
        }
        this.props.dispatch({ type: "SET_FIELD", name: _name, value: _value })
    }

    openPopupTm() {
        $("#modalRequestBankLoan").modal("show")
    }

    submit() {
        this.props.baUpdateMortgageInfo(this.props.info)
    }

    uploadFiles(filesInit, objIndex) {
        let _init = filesInit.map(function (file, index) {
            return {
                source: file.link,
                options: {
                    type: "local",
                },
            }
        })
        this.props.dispatch({ type: "SET_INDEX_FILES", indexObj: objIndex })
        this.props.dispatch({ type: "SET_FILES", files: null })
        $("#uploadFiles").modal()
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.info.rlistingId != nextProps.info.rlistingId) {
            let selectedOption = {
                value: nextProps.info.rlistingId,
                label: nextProps.info.rlistingId,
            }
            this.setState({
                value: selectedOption,
            })
        }
    }

    handleChangeProfile(
        indexProfile,
        indexChild,
        indexProfileInfo,
        type,
        value
    ) {
        let _info = { ...this.props.info }
        let _profileInfo =
            _info.profiles[indexProfile].childs[indexChild].profileInfos[
                indexProfileInfo
            ]
        switch (type) {
            case "input":
                _profileInfo.text = value
                break
            default:
                break
        }
        this.props.dispatch({ type: "FETCH_INFO_MORTGAGE", payload: _info })
    }

    handleChangeIncome(indexProfile, indexChild, value) {
        let _info = { ...this.props.info }
        let _childInfo = _info.profiles[indexProfile].childs[indexChild]
        _childInfo.income = value
        this.props.dispatch({ type: "FETCH_INFO_MORTGAGE", payload: _info })
    }

    handleAddProfile() {
        $("#modalAddProfile").modal()
    }

    bindEvents() {
        let that = this
        $(document)
            .off(".btn-del-info")
            .on("click", ".btn-del-info", function (e) {
                e.preventDefault()
                let data = $(this).attr("data-del")
                showPropzyConfirm({
                    title: "Thông báo",
                    message: "Chắc chắn muốn xóa?",
                    btn: {
                        yes: {
                            text: "Có",
                        },
                        no: {
                            text: "Không",
                        },
                    },
                    okCallback: function () {
                        that.props.onDeleteListingInfo(JSON.parse(data))
                    },
                    cancelCallback: function () {},
                })
            })
    }

    render() {
        let that = this
        let { info } = this.props

        return (
            <div>
                {!info.isLoan && (
                    <div className="row">
                        <div>
                            <div className="col-md-12">
                                <label className="checkbox-inline">
                                    <input
                                        disabled={deal.disabledFeature}
                                        name="updateInfoMortgage"
                                        type="checkbox"
                                        onChange={this.openPopupTm}
                                    />{" "}
                                    Thay đổi nhu cầu vay
                                </label>
                            </div>
                        </div>
                        <hr />
                    </div>
                )}
                {info.isLoan && (
                    <div>
                        <div className="row">
                            <div className="col-md-3">
                                <strong>Họ tên khách hàng:</strong>
                                <input
                                    className="form-control"
                                    onChange={this.handleChangeInput}
                                    name="customerName"
                                    value={info.customerName}
                                />
                                <hr />
                            </div>
                            <div className="col-md-3">
                                <strong>Trạng thái:</strong>
                                <input
                                    className="form-control"
                                    disabled={true}
                                    value={info.statusName}
                                />
                                <hr />
                            </div>
                            <div className="col-md-3">
                                <strong>Người gửi:</strong>
                                <input
                                    className="form-control"
                                    disabled={true}
                                    value={info.senderName}
                                />
                                <hr />
                            </div>
                            <div className="col-md-3">
                                <strong>Loại BĐS:</strong>
                                <input
                                    className="form-control"
                                    disabled={true}
                                    value={info.propertyTypeName}
                                />
                                <hr />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-3">
                                <strong>Số CMND/TCC:</strong>
                                <input
                                    className="form-control"
                                    onChange={this.handleChangeInput}
                                    name="cmnd"
                                    value={info.cmnd}
                                />
                                <hr />
                            </div>
                            <div className="col-md-3">
                                <strong>Tiến độ:</strong>
                                <input
                                    className="form-control"
                                    disabled={true}
                                    value={info.progressName}
                                />
                                <hr />
                            </div>
                            <div className="col-md-3">
                                <strong>Đối tượng:</strong>
                                <input
                                    className="form-control"
                                    disabled={true}
                                    value={info.subjectName}
                                />
                                <hr />
                            </div>
                            <div className="col-md-3">
                                <strong>Listing ID:</strong>
                                <Select
                                    value={
                                        this.state.value
                                            ? this.state.value
                                            : this._SELECT_DEFAULT.value
                                    }
                                    onChange={(value) =>
                                        this.handleChange(value)
                                    }
                                    defaultValue={
                                        info.rlistingId == null
                                            ? this._SELECT_DEFAULT.value
                                            : {
                                                  label: info.rlistingId,
                                                  value: info.rlistingId,
                                              }
                                    }
                                    options={this.props.listingCart}
                                />
                                <hr />
                            </div>
                        </div>
                        {/* Hồ sơ thu nhập */}
                        {info.profiles &&
                            info.profiles.map(function (profile, indexProfile) {
                                return (
                                    <div className="row">
                                        <div className="col-md-12">
                                            <h4>
                                                {profile.name}{" "}
                                                {profile.typeId == 1115 && (
                                                    <button
                                                        onClick={
                                                            that.handleAddProfile
                                                        }
                                                        className="btn btn-default btn-sm"
                                                    >
                                                        Thêm
                                                    </button>
                                                )}
                                            </h4>
                                            {profile.typeId == 1114 && (
                                                <div
                                                    style={{
                                                        marginBottom: "10px",
                                                    }}
                                                >
                                                    <label className="radio-inline">
                                                        <input
                                                            type="radio"
                                                            value="0"
                                                            name="isMarried"
                                                            onChange={
                                                                that.handleChangeInput
                                                            }
                                                            checked={
                                                                !info.isMarried
                                                                    ? true
                                                                    : false
                                                            }
                                                        />
                                                        Độc thân
                                                    </label>
                                                    <label className="radio-inline">
                                                        <input
                                                            type="radio"
                                                            value="1"
                                                            name="isMarried"
                                                            onChange={
                                                                that.handleChangeInput
                                                            }
                                                            checked={
                                                                info.isMarried
                                                                    ? true
                                                                    : false
                                                            }
                                                        />
                                                        Kết hôn
                                                    </label>
                                                </div>
                                            )}
                                        </div>
                                        {profile.childs &&
                                            profile.childs.map(function (
                                                child,
                                                indexChild
                                            ) {
                                                return (
                                                    <div className="col-md-12">
                                                        <label
                                                            style={{
                                                                margin:
                                                                    "10px 0px",
                                                            }}
                                                        >
                                                            {child.name}
                                                        </label>
                                                        {profile.typeId ==
                                                            1115 && (
                                                            <div
                                                                style={{
                                                                    pading:
                                                                        "10px 0px",
                                                                }}
                                                                className="row"
                                                            >
                                                                <div className="col-md-6">
                                                                    <div className="row">
                                                                        <div className="col-md-6">
                                                                            <span className="text-muted">
                                                                                Mức
                                                                                thu
                                                                                nhập
                                                                            </span>
                                                                        </div>
                                                                        <div className="col-md-6">
                                                                            <NumberFormat
                                                                                suffix="đ"
                                                                                thousandSeparator={
                                                                                    true
                                                                                }
                                                                                type="text"
                                                                                name="income"
                                                                                onChange={(
                                                                                    e
                                                                                ) => {
                                                                                    let value =
                                                                                        e
                                                                                            .target
                                                                                            .value
                                                                                    value = value.replace(
                                                                                        /,/g,
                                                                                        ""
                                                                                    )
                                                                                    value = value.replace(
                                                                                        /đ/g,
                                                                                        ""
                                                                                    )
                                                                                    that.handleChangeIncome(
                                                                                        indexProfile,
                                                                                        indexChild,
                                                                                        value
                                                                                    )
                                                                                }}
                                                                                value={
                                                                                    child.income
                                                                                }
                                                                                className="form-control"
                                                                            />
                                                                            {/* <input type="text" name="income" onChange={(e) => {
                                                                    let value = e.target.value;
                                                                    that.handleChangeIncome(indexProfile,indexChild,value);
                                                                }} value={child.income} className="form-control"/> */}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                        <br />
                                                        {profile.typeId ==
                                                            1115 && (
                                                            <a
                                                                data-del={JSON.stringify(
                                                                    child
                                                                )}
                                                                className="btn-del-info"
                                                                href="javascript:void(0);"
                                                                style={{
                                                                    float:
                                                                        "right",
                                                                }}
                                                            >
                                                                Xóa
                                                            </a>
                                                        )}
                                                        <div className="row">
                                                            {child.profileInfos &&
                                                                child.profileInfos.map(
                                                                    function (
                                                                        proIn,
                                                                        indexPI
                                                                    ) {
                                                                        return (
                                                                            <div
                                                                                style={{
                                                                                    minHeight:
                                                                                        "80px",
                                                                                    maxHeight:
                                                                                        "80px",
                                                                                }}
                                                                                className="col-md-6"
                                                                            >
                                                                                <div className="row">
                                                                                    <div className="col-md-6">
                                                                                        <Truncate
                                                                                            data-toggle="tooltip"
                                                                                            title={
                                                                                                proIn.name
                                                                                            }
                                                                                            className={
                                                                                                proIn.isRequired
                                                                                                    ? "text-danger"
                                                                                                    : "text-muted"
                                                                                            }
                                                                                            lines={
                                                                                                1
                                                                                            }
                                                                                            ellipsis={
                                                                                                <span>
                                                                                                    ...{" "}
                                                                                                </span>
                                                                                            }
                                                                                        >
                                                                                            {
                                                                                                proIn.name
                                                                                            }{" "}
                                                                                            {
                                                                                                proIn.typeId
                                                                                            }
                                                                                        </Truncate>
                                                                                        <div>
                                                                                            {proIn.note !=
                                                                                                null &&
                                                                                                proIn.note !=
                                                                                                    "" && (
                                                                                                    <a
                                                                                                        data-toggle="tooltip"
                                                                                                        title={
                                                                                                            proIn.note
                                                                                                        }
                                                                                                    >
                                                                                                        <i
                                                                                                            className="fa fa-sticky-note-o"
                                                                                                            aria-hidden="true"
                                                                                                        ></i>{" "}
                                                                                                        ghi
                                                                                                        chú
                                                                                                    </a>
                                                                                                )}
                                                                                            &nbsp;&nbsp;&nbsp;
                                                                                            {proIn.isRequired &&
                                                                                                proIn.control ==
                                                                                                    "file" && (
                                                                                                    <a
                                                                                                        onClick={(
                                                                                                            e
                                                                                                        ) => {
                                                                                                            e.preventDefault()
                                                                                                            if (
                                                                                                                proIn.photoGcns ==
                                                                                                                null
                                                                                                            )
                                                                                                                proIn.photoGcns = []
                                                                                                            that.uploadFiles(
                                                                                                                proIn.photoGcns,
                                                                                                                {
                                                                                                                    indexProfile,
                                                                                                                    indexChild,
                                                                                                                    indexPI,
                                                                                                                }
                                                                                                            )
                                                                                                        }}
                                                                                                        href="#"
                                                                                                    >
                                                                                                        <i
                                                                                                            className="fa fa-upload"
                                                                                                            aria-hidden="true"
                                                                                                        ></i>{" "}
                                                                                                        upload
                                                                                                    </a>
                                                                                                )}
                                                                                        </div>

                                                                                        {/* <span data-toggle="tooltip" title={proIn.note} className={proIn.isRequired ? "text-danger" : "text-muted"}>{proIn.name}: {proIn.typeId}</span> */}
                                                                                    </div>
                                                                                    <div className="col-md-6">
                                                                                        {proIn.control ==
                                                                                            "file" && (
                                                                                            <div>
                                                                                                <ModalListImage
                                                                                                    listImages={
                                                                                                        proIn.photoGcns
                                                                                                    }
                                                                                                    onRemoveImage={(
                                                                                                        newImages
                                                                                                    ) => {
                                                                                                        that.props.dispatch(
                                                                                                            actionRemovePhotoInProfile(
                                                                                                                newImages,
                                                                                                                {
                                                                                                                    profileTypeId:
                                                                                                                        profile.typeId,
                                                                                                                    childTypeId:
                                                                                                                        child.typeId,
                                                                                                                    profileInfoTypeId:
                                                                                                                        proIn.typeId,
                                                                                                                }
                                                                                                            )
                                                                                                        )
                                                                                                    }}
                                                                                                />
                                                                                                {/* <img src={proIn.photoGcns[0].link} className="img-thumbnail"/>  */}
                                                                                            </div>
                                                                                        )}
                                                                                        {proIn.control ==
                                                                                            "input" && (
                                                                                            <input
                                                                                                onChange={(
                                                                                                    e
                                                                                                ) => {
                                                                                                    let value =
                                                                                                        e
                                                                                                            .target
                                                                                                            .value
                                                                                                    that.handleChangeProfile(
                                                                                                        indexProfile,
                                                                                                        indexChild,
                                                                                                        indexPI,
                                                                                                        proIn.control,
                                                                                                        value
                                                                                                    )
                                                                                                }}
                                                                                                value={
                                                                                                    proIn.typeId ==
                                                                                                    1124
                                                                                                        ? info.cmnd
                                                                                                        : proIn.text ==
                                                                                                          null
                                                                                                        ? ""
                                                                                                        : proIn.text
                                                                                                }
                                                                                                disabled={
                                                                                                    !proIn.isRequired ||
                                                                                                    proIn.typeId ==
                                                                                                        1124
                                                                                                }
                                                                                                className="form-control"
                                                                                            />
                                                                                        )}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        )
                                                                    }
                                                                )}
                                                        </div>
                                                        <hr />
                                                    </div>
                                                )
                                            })}
                                        {/* <div className="col-md-6">
                                    <strong>Đối tượng:</strong>
                                    <span className="text-muted">
                                    Đầu tư
                                    </span>
                                    <hr />
                                </div> */}
                                    </div>
                                )
                            })}
                        {info.collateral != null && (
                            <div>
                                {" "}
                                <div className="row">
                                    <div className="col-md-12">
                                        <h4>{info.collateral.name}</h4>
                                    </div>
                                    {info.collateral.profileInfos &&
                                        info.collateral.profileInfos.map(
                                            function (proIn, indexPI) {
                                                return (
                                                    <div className="col-md-6">
                                                        <div className="row">
                                                            <div className="col-md-6">
                                                                <span className="text-muted">
                                                                    {proIn.name}
                                                                    :
                                                                </span>
                                                            </div>
                                                            <div className="col-md-6">
                                                                {proIn.control ==
                                                                    "file" && (
                                                                    <div>
                                                                        <ModalListImage
                                                                            listImages={
                                                                                proIn.photoGcns
                                                                            }
                                                                            onRemoveImage={(
                                                                                newImages
                                                                            ) => {
                                                                                that.props.dispatch(
                                                                                    actionRemovePhotoInProfile(
                                                                                        newImages,
                                                                                        {
                                                                                            profileTypeId:
                                                                                                profile.typeId,
                                                                                            childTypeId:
                                                                                                child.typeId,
                                                                                            profileInfoTypeId:
                                                                                                proIn.typeId,
                                                                                        }
                                                                                    )
                                                                                )
                                                                            }}
                                                                        />
                                                                        {/* <img src={proIn.photoGcns[0].link} className="img-thumbnail"/>  */}
                                                                    </div>
                                                                )}
                                                                {proIn.control ==
                                                                    "input" && (
                                                                    <input
                                                                        onChange={(
                                                                            e
                                                                        ) => {
                                                                            let value =
                                                                                e
                                                                                    .target
                                                                                    .value
                                                                            that.handleChangeProfile(
                                                                                indexProfile,
                                                                                indexChild,
                                                                                indexPI,
                                                                                proIn.control,
                                                                                value
                                                                            )
                                                                        }}
                                                                        value={
                                                                            proIn.text ==
                                                                            null
                                                                                ? ""
                                                                                : proIn.text
                                                                        }
                                                                        className="form-control"
                                                                    />
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        )}
                                </div>
                                <hr />
                            </div>
                        )}
                        {info.resultBanks != null && (
                            <div className="row">
                                <div className="col-md-12">
                                    <h4>Kết quả thẩm định</h4>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <label>Ghi chú: </label>
                                            <span>
                                                {" "}
                                                {info.resultBanks.note
                                                    ? info.resultBanks.note
                                                    : "N/A"}
                                            </span>
                                        </div>
                                        <div className="col-md-4">
                                            <label>Kết quả thẩm định: </label>
                                            <span>
                                                {" "}
                                                {info.resultBanks.isSatisfactory
                                                    ? "Đủ điều kiện vay"
                                                    : "Không đủ điều kiện vay"}
                                            </span>
                                        </div>
                                    </div>
                                    {info.resultBanks.banks.length > 0 && (
                                        <div>
                                            {info.resultBanks.banks.map(
                                                function (bank, indexBank) {
                                                    return (
                                                        <div>
                                                            {bank.isShow && (
                                                                <div className="form-inline">
                                                                    <div className="form-group">
                                                                        <div className="row">
                                                                            <div className="col-md-4">
                                                                                <label>
                                                                                    {
                                                                                        bank.bankName
                                                                                    }{" "}
                                                                                </label>
                                                                            </div>
                                                                            <div className="col-md-4">
                                                                                <label>
                                                                                    Số
                                                                                    tiền
                                                                                    có
                                                                                    thể
                                                                                    vay:{" "}
                                                                                </label>
                                                                                &nbsp;
                                                                                <span>
                                                                                    <NumberFormat
                                                                                        suffix="đ"
                                                                                        value={
                                                                                            bank.price
                                                                                        }
                                                                                        displayType={
                                                                                            "text"
                                                                                        }
                                                                                        thousandSeparator={
                                                                                            true
                                                                                        }
                                                                                    />
                                                                                </span>
                                                                            </div>
                                                                            <div className="col-md-4">
                                                                                <label>
                                                                                    Phí
                                                                                    trả
                                                                                    nợ
                                                                                    trước
                                                                                    hạn:{" "}
                                                                                </label>
                                                                                &nbsp;
                                                                                <span>
                                                                                    <NumberFormat
                                                                                        suffix="đ"
                                                                                        value={
                                                                                            bank.earlyRepaymentFee
                                                                                        }
                                                                                        displayType={
                                                                                            "text"
                                                                                        }
                                                                                        thousandSeparator={
                                                                                            true
                                                                                        }
                                                                                    />
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                        <div className="row">
                                                                            <div className="col-md-4">
                                                                                <label>
                                                                                    Thời
                                                                                    gian
                                                                                    vay:{" "}
                                                                                </label>
                                                                                &nbsp;
                                                                                <span>
                                                                                    {
                                                                                        bank.maxLoanTerm
                                                                                    }
                                                                                </span>
                                                                            </div>
                                                                            {bank.loanType ==
                                                                                1 && (
                                                                                <div className="col-md-4">
                                                                                    <label>
                                                                                        Vay
                                                                                        đúng
                                                                                        số
                                                                                        tiền
                                                                                        ngân
                                                                                        hàng
                                                                                        duyệt{" "}
                                                                                    </label>
                                                                                </div>
                                                                            )}
                                                                            {bank.loanType ==
                                                                                2 && (
                                                                                <div className="col-md-4">
                                                                                    <label>
                                                                                        Vay
                                                                                        số
                                                                                        tiền
                                                                                        thấp
                                                                                        hơn{" "}
                                                                                    </label>
                                                                                    <div
                                                                                        style={{
                                                                                            paddingLeft:
                                                                                                "20px",
                                                                                        }}
                                                                                        className="form-group"
                                                                                    >
                                                                                        <label>
                                                                                            Nhập
                                                                                            số
                                                                                            tiền:{" "}
                                                                                        </label>{" "}
                                                                                        &nbsp;
                                                                                        <span>
                                                                                            <NumberFormat
                                                                                                suffix="đ"
                                                                                                value={
                                                                                                    bank.loanPrice
                                                                                                }
                                                                                                displayType={
                                                                                                    "text"
                                                                                                }
                                                                                                thousandSeparator={
                                                                                                    true
                                                                                                }
                                                                                            />
                                                                                        </span>
                                                                                    </div>
                                                                                    <div
                                                                                        style={{
                                                                                            paddingLeft:
                                                                                                "20px",
                                                                                        }}
                                                                                        className="form-group"
                                                                                    >
                                                                                        <label>
                                                                                            Thời
                                                                                            hạn
                                                                                            vay:{" "}
                                                                                        </label>
                                                                                        <span>
                                                                                            {
                                                                                                bank.loanYear
                                                                                            }
                                                                                        </span>
                                                                                    </div>
                                                                                </div>
                                                                            )}
                                                                            <div className="col-md-4">
                                                                                <label>
                                                                                    Lãi
                                                                                    suất
                                                                                </label>
                                                                                <ul>
                                                                                    <li>
                                                                                        Lãi
                                                                                        suất{" "}
                                                                                        {
                                                                                            bank.interestRate1
                                                                                        }{" "}
                                                                                        /
                                                                                        năm
                                                                                        suốt
                                                                                        thời
                                                                                        gian
                                                                                        vay
                                                                                    </li>
                                                                                    <li>
                                                                                        Lãi
                                                                                        suất{" "}
                                                                                        {
                                                                                            bank.interestRate2
                                                                                        }{" "}
                                                                                        /
                                                                                        năm
                                                                                        suốt
                                                                                        thời
                                                                                        gian
                                                                                        vay
                                                                                    </li>
                                                                                </ul>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <hr />
                                                                </div>
                                                            )}
                                                        </div>
                                                    )
                                                }
                                            )}
                                        </div>
                                    )}
                                    <br />
                                </div>
                            </div>
                        )}
                        {[32, 33, 34, 41].indexOf(info.statusId) == -1 && (
                            <div className="row">
                                <div className="col-md-12">
                                    {/* <button className="btn btn-primary">Gửi cho Mortgate</button>
                        &nbsp;&nbsp; */}
                                    <button
                                        onClick={this.submit}
                                        className="btn btn-primary"
                                    >
                                        Lưu và gửi cho Mortgage
                                    </button>
                                    {/* &nbsp;&nbsp;
                        <button className="btn btn-default">Cập nhật hồ sơ</button> */}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onDeleteListingInfo: (dataPost) => {
            dispatch(actDeleteListingInfo(dataPost))
        },
        dispatch: dispatch,
    }
}

const InfoContainer = connect(null, mapDispatchToProps)(Section)
export default InfoContainer

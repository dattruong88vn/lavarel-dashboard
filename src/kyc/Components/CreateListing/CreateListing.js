import React, {Component, Fragment} from "react"
import {connect} from "react-redux"
import Select from "react-select"
import NumberFormat from "react-number-format"
import {ModalListDeal, ModalPacket} from "./Modals"
import {NumberInputUtil} from "../../../utils/CommonUtils"
import {fetchDirections, fetchDealGroupUser} from "../../Services/KycCommons"
import Pagination from "react-js-pagination"
import RadioCheck from "./RadioCheck"
import { getForm } from "../../constant/ListForm"

const styleBox = {
    box: {
        padding: "0 30px",
    },
    nopadding: {
        padding: "0px",
        margin: "0px",
    },
    nopaddingright: {
        paddingRight: "0px",
    },
}
function PropertyType({list, handleOnChange}) {
    return (
        list.length > 0 &&
        list.map((it) => (
            <div className="col-sm-4 col-md-4" key={it.propertyTypeID}>
                <div className="need-radio">
                    <input
                        id={`property-type-${it.propertyTypeID}`}
                        type="radio"
                        className="need-radio-input"
                        name="property-type"
                        onChange={handleOnChange(it.propertyTypeID)}
                    />
                    <label
                        htmlFor={`property-type-${it.propertyTypeID}`}
                        className="need-radio-label"
                    >
                        {" "}
                        {it.typeName}
                    </label>
                </div>
            </div>
        ))
    )
}
function UserRightType({list, handleOnChange, disabled}) {
    return (
        list.length > 0 &&
        list.map((it) => (
            <div className="col-sm-6 col-md-6 col-lg-4" key={it.useRightTypeId}>
                <div
                    className={disabled ? "need-radio disabled" : "need-radio"}
                >
                    <input
                        id={`user-right-type-${it.useRightTypeId}`}
                        type="radio"
                        className="need-radio-input"
                        name="user-right-type"
                        onChange={handleOnChange(it.useRightTypeId)}
                        disabled={disabled}
                    />
                    <label
                        htmlFor={`user-right-type-${it.useRightTypeId}`}
                        className="need-radio-label"
                    >
                        {" "}
                        {it.typeName}
                    </label>
                </div>
            </div>
        ))
    )
}
function RadioExperience({list, id, handleOnChange, listChecked}) {
    return (
        list.length > 0 &&
        list.map((it) => (
            <div className="col-sm-6" key={it.id}>
                <div className="need-radio">
                    <input
                        id={`experience-${id}-${it.id}`}
                        type="radio"
                        className="need-radio-input"
                        name={`experience-${id}`}
                        onChange={handleOnChange(it, id)}
                        checked={!!listChecked.find((findx) => findx == it.id)}
                    />
                    <label
                        htmlFor={`experience-${id}-${it.id}`}
                        className="need-radio-label"
                    >
                        {" "}
                        {it.name}
                    </label>
                </div>
            </div>
        ))
    )
}
class CreateListing extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: null,
            phone: null,
            type: 1,
            dealId: null,
            marial: false,
            userRightType: [],
            directionList: [],
            locationType: "0",
            dealGroupUser: undefined,
            assignedTo: null,
            direction: null,
            quantitySleepingRoom: 1,
            quantityBathRoom: 1,
            quantityLevel: 1,
            alleyWidth: null,
            activePage: 1,
            fromDate: "",
            toDate: "",
            listingTypeId: null,
            propertyGroupId: null,
            propertyTypeId: null,
            formId: 0,
        }
        this.handleOnChangeListingType = this.handleOnChangeListingType.bind(this)
        this.handleOnChangePropertyGroup = this.handleOnChangePropertyGroup.bind(this)
        this.handleOnChangePropertyType = this.handleOnChangePropertyType.bind(this)
        this.handleOnChangeSelectDistrict = this.handleOnChangeSelectDistrict.bind(
            this
        )
        this.handleOnChangeSelectWard = this.handleOnChangeSelectWard.bind(this)
        this.handleOnChangeSelectStreet = this.handleOnChangeSelectStreet.bind(
            this
        )
        this.handleOnChangeOwnerPhone = this.handleOnChangeOwnerPhone.bind(this)
        this.handleOnChangeOwnerName = this.handleOnChangeOwnerName.bind(this)
        this.handleOnChangePrice = this.handleOnChangePrice.bind(this)
        this.handleOnChangeAddress = this.handleOnChangeAddress.bind(this)
        this.handleOnClickSave = this.handleOnClickSave.bind(this)
        this.handleOnChangePurposesRadio = this.handleOnChangePurposesRadio.bind(
            this
        )
        this.handleOnChangePurposesSelect = this.handleOnChangePurposesSelect.bind(
            this
        )
        this.handleOnClickSeeMatchDeal = this.handleOnClickSeeMatchDeal.bind(
            this
        )
    }

    componentDidMount() {
        $(".deal-date").click(function () {
            $(".deal-date").removeAttr("style")
            let css = { "background-color": "#f17423", color: "white" }
            $(this).css(css)
        })

        // var quantitiySleep=0;
        // $('.quantity-right-plus-sleep').click(function(e, a) {
        //     e.preventDefault();
        //     var quantitiySleep = parseInt($('#quantitySleepingRoom').val());
        //     //$('#quantitySleepingRoom').val(quantitiySleep + 1);
        //     a.setState({'quantitySleepingRoom': quantitiySleep + 1});
        // }.bind(this));
        // $('.quantity-left-minus-sleep').click(function(e) {
        //     e.preventDefault();
        //     var quantitiySleep = parseInt($('#quantitySleepingRoom').val());
        //     // if(quantitiySleep>0){
        //     // $('#quantitySleepingRoom').val(quantitiySleep - 1);
        //     // }

        //     this.setState({'quantitySleepingRoom': quantitiySleep - 1});
        // });

        fetchDirections((data) => {
            this.setState({directionList: data})
        })

        const data = this.props.contentStored.data

        let params = {
            listingTypeId: data.listingTypeId,
            propertyTypeId: data.propertyTypeId,
            districtIds: data.districtId ? [data.districtId] : null,
            suggestBudget: data.price,
            page: 1,
        }

        fetchDealGroupUser((data) => {
            this.setState({dealGroupUser: data})
        }, params)

        const kycInfoCustomer = JSON.parse(
            localStorage.getItem("kycInfoCustomer")
        )
        if (kycInfoCustomer) {
            const owner = {
                name: kycInfoCustomer.name ? kycInfoCustomer.name : null,
                phone: kycInfoCustomer.phone ? kycInfoCustomer.phone : null,
                email: kycInfoCustomer.email ? kycInfoCustomer.email : null,
            }
            this.setState({
                name: kycInfoCustomer.name ? kycInfoCustomer.name : null,
                phone: kycInfoCustomer.phone ? kycInfoCustomer.phone : null,
            })
            this.props.functionServices.updateDataPost({
                tcid: kycInfoCustomer.tcId ? kycInfoCustomer.tcId : null,
            })
            this.props.functionServices.updateOwnerInfo(owner)
        }
        const type = this.props.type
        const dealId = this.props.dealId
        if (type && type == 2) {
            this.setState({
                type: 2,
            })
        }
        this.setState({
            dealId: dealId,
        })
        this.props.functionServices.fetchUserRightType()
        this.props.functionServices.fetchDistricts()
        this.props.functionServices.fetchSubType(1601)
        this.props.functionServices.fetchSubType(1604)
        this.props.functionServices.fetchSubType(1607)
        this.props.functionServices.fetchPropertyTypeGroup()
    }
    handleOnChangeListingType = (e) => {
        const listingTypeId = e.target.value
        const { data } = this.props.contentStored
        const newData = { ...data, listingTypeId }
        this.props.functionServices.onChangeListingType(newData)
    }
    handleOnChangePropertyGroup = (e) => {
        const propertyTypeGroup = e
        const propertyTypeGroupId = e.value
        const { data } = this.props.contentStored
        const newData = { ...data, propertyTypeGroupId, propertyTypeGroup}
        this.props.functionServices.onChangePropertyTypeGroup(newData)
    }
    handleOnChangePropertyType = (e) => {
        const propertyTypeId = e.target.value
        const formId = e.target.dataset.formid; // DOM - formId -> formid;
        const { data } = this.props.contentStored
        const newData = { ...data, propertyTypeId }
        this.handleFormState(formId);
        this.props.functionServices.updateDataPost(newData)
    }
    handleFormState = (formId) => {
        this.setState({ formId })
    }
    handleOnChangeSelectDistrict = (value) => {
        const data = {}
        data["districtId"] = value.value
        if (data["districtId"] == 0) {
            data["districtId"] = null
        }
        data["wardId"] = null
        data["streetId"] = null
        this.props.functionServices.updateDataPost(data)
        this.props.functionServices.fetchWards(data["districtId"])
        this.props.functionServices.fetchStreets(null)
    }
    handleOnChangeSelectWard = (value) => {
        const data = {}
        data["wardId"] = value.value
        if (data["wardId"] == 0) {
            data["wardId"] = null
        }
        data["streetId"] = null
        this.props.functionServices.updateDataPost(data)
        this.props.functionServices.fetchStreets(data["wardId"])
    }
    handleOnChangeSelectStreet = (value) => {
        const data = {}
        data["streetId"] = value.value
        if (data["streetId"] == 0) {
            data["streetId"] = null
        }
        this.props.functionServices.updateDataPost(data)
    }
    handleOnChangeOwnerPhone = (values) => {
        const {formattedValue, value} = values
        const owner = this.props.contentStored.data.owner
        this.props.functionServices.updateOwnerInfo({...owner, phone: value})
    }
    handleOnChangeOwnerName = (values) => {
        const owner = this.props.contentStored.data.owner
        this.props.functionServices.updateOwnerInfo({
            ...owner,
            name: values.target.value,
        })
    }
    handleOnChangePrice = (values) => {
        let {formattedValue, value} = values
        if (value != null && parseInt(value) != 0 && value.length < 5) {
            value = parseInt(value) * 1000000
        }
        this.props.functionServices.updateDataPost({price: value})
        NumberInputUtil.numberToLabel("input[name='suggestedPrice']")

        const data = this.props.contentStored.data
        let params = {
            listingTypeId: data.listingTypeId,
            propertyTypeId: data.propertyTypeId,
            districtIds: data.districtId ? [data.districtId] : null,
            suggestBudget: data.price,
            page: 1,
        }
        fetchDealGroupUser((data) => {
            this.setState({dealGroupUser: data})
        }, params)
    }
    handleOnChangeAddress = (values) => {
        this.props.functionServices.updateDataPost({
            houseNumber: values.target.value,
        })
    }
    handleOnChangePurposesRadio = (item, id) => (e) => {
        let purposes = this.props.contentStored.data.purposes
        const data = {
            checked: true,
            control: "radio",
            data: null,
            hasValue: false,
            parentId: id,
            id: item.id,
        }
        purposes = purposes.filter((it) => it.parentId != id)
        purposes.push(data)
        this.props.functionServices.updateDataPost({purposes: purposes})
    }
    handleOnChangePurposesSelect = (values, id) => {
        let purposes = this.props.contentStored.data.purposes
        const data = {
            checked: true,
            control: "option",
            data: null,
            hasValue: false,
            parentId: id,
            id: values.value,
        }
        purposes = purposes.filter((it) => it.parentId != id)
        purposes.push(data)
        this.props.functionServices.updateDataPost({purposes: purposes})
    }
    // SAVE
    handleOnClickSave = (e) => {
        $(".has-error-label-only").removeClass("has-error-label-only")
        let data = this.props.contentStored.data

        // validate
        let hasErr = false
        const items = [
            {
                label: "listing-type-label",
                value: hasValue(data.listingTypeId),
                message: "<br>- Loại giao dịch",
            },
            {
                label: "property-type-label",
                value: hasValue(data.propertyTypeId),
                message: "<br>- Loại hình BĐS",
            },
            {
                label: "property-type-group-label",
                value: hasValue(data.propertyTypeGroupId),
                message: "<br>- Nhóm BĐS",
            },
            {
                label: "position-label",
                value:
                    hasValue(data.districtId) &&
                    hasValue(data.wardId) &&
                    hasValue(data.streetId) &&
                    hasValue(data.houseNumber),
                message: "<br>- Quận / Phường / Đường / Số nhà",
            },
            {
                label: "price-label",
                value: hasValue(data.price),
                message: "<br>- Giá",
            },
            {
                label: "owner-info-label",
                value:
                    hasValue(data.owner) &&
                    hasValue(data.owner.name) &&
                    hasValue(data.owner.phone),
                message: "<br>-Tên chủ nhà / Só điện thoại",
            },
        ]
        const form = getForm(this.state.formId);
        const numberSelect = [];
        if(form.bedRooms.required) {
            numberSelect.push(
                {
                    label: "bedRooms-label",
                    value: hasValue(this.state.quantitySleepingRoom),
                    message: "<br>- Phòng ngủ phải lớn hơn 0",
                }
            )
        }
        if(form.bathRooms.required) {
            numberSelect.push(
                {
                    label: "bathRooms-label",
                    value: hasValue(this.state.quantityBathRoom),
                    message: "<br>- Phòng tắm phải lớn hơn 0",
                },
            )
        }
        if(form.numberFloor.required){
            numberSelect.push(
                {
                    label: "numberFloor-label",
                    value: hasValue(this.state.quantityLevel),
                    message: "<br>- Số lầu phải lớn hơn 0",
                }
            )
        }
        const messages = []
        items.forEach((it) => {
            if (!it.value) {
                $("." + it.label).addClass("has-error-label-only")
                messages.push(it.message)
                hasErr = true
            }
        })
        numberSelect.forEach((it) => {
            if(!it.value > 0) {
                messages.push(it.message)
                hasErr = true
            }
        })
        if (hasErr) {
            propzyNotifyAlert({
                type: "propzy-notify-warning",
                message: "Thiếu dữ liệu để tạo tin đăng : " + messages.join(""),
            })
            return false
        }
        const paramPlus = {
            isMarried: this.state.marial ? this.state.marial.value : false,
            bedRooms: this.state.quantitySleepingRoom,
            floor: this.state.quantityLevel,
            bathRooms: this.state.quantityBathRoom,
            directionId: this.state.direction
                ? this.state.direction.value
                : null,
            useRightTypeId: this.state.userRightType
                ? this.state.userRightType.value
                : null,
            position: this.state.locationType
                ? this.state.locationType.value
                : null,
            alleyWidth: this.state.alleyWidth,
        }

        data = Object.assign(data, paramPlus)

        let result = this.props.functionServices.fetchInsetListing(data, {
            dealId: this.state.dealId,
            type: this.state.type,
        })
    }
    handleOnClickSeeMatchDeal = (e) => {
        //validate
        $('.has-error-label-only').removeClass('has-error-label-only');
        const data = this.props.contentStored.data;
        this.setState({assignedTo: e});

        const items = [
            {
                label: "listing-type-label",
                value: hasValue(data.listingTypeId),
                message: "<br>- Loại giao dịch",
            },
            {
                label: "property-type-label",
                value: hasValue(data.propertyTypeId),
                message: "<br>- Loại hình BĐS",
            },
            {
                label: "position-label",
                value: hasValue(data.districtId),
                message: "<br>- Quận",
            },
            {
                label: "price-label",
                value: hasValue(data.price),
                message: "<br>- Giá",
            },
        ]
        let hasErr = false
        const messages = []
        items.forEach((it) => {
            if (!it.value) {
                $("." + it.label).addClass("has-error-label-only")
                messages.push(it.message)
                hasErr = true
            }
        })
        if (hasErr) {
            propzyNotifyAlert({
                type: "propzy-notify-warning",
                message:
                    "Thiếu dữ liệu để xem trước khách hàng phù hợp: " +
                    messages.join(""),
            })
            return false
        }
        $('#modal-match-deal').modal('show');
    };

    onInputChange(event) {
        let value = event.target.value;
        let name = event.target.name;
        let _state = {...this.state};
        _state.locationType = value;
        this.setState(_state);
    }

    getDealByDate(e) {
        const data = this.props.contentStored.data
        var dt = new Date()
        let params = {
            listingTypeId: data.listingTypeId,
            propertyTypeId: data.propertyTypeId,
            districtIds: data.districtId ? [data.districtId] : null,
            suggestBudget: data.price,
            fromDate: dt.setDate(dt.getDate() - e.target.value),
            toDate: Date.parse(new Date()),
        }
        //set State
        this.setState({
            fromDate: params.fromDate,
            toDate: params.toDate,
        })

        fetchDealGroupUser((data) => {
            this.setState({dealGroupUser: data})
        }, params)
    }

    quantityLeftMinusSleep() {
        if (this.state.quantitySleepingRoom > 0) {
            this.setState({
                quantitySleepingRoom: this.state.quantitySleepingRoom - 1,
            })
        }
    }

    quantityRightPlusSleep() {
        this.setState({
            quantitySleepingRoom: this.state.quantitySleepingRoom + 1,
        })
    }

    quantityLeftMinusBathRoom() {
        if (this.state.quantityBathRoom > 0) {
            this.setState({quantityBathRoom: this.state.quantityBathRoom - 1})
        }
    }

    quantityRightPlusBathRoom() {
        this.setState({quantityBathRoom: this.state.quantityBathRoom + 1})
    }

    quantityLeftMinusLevel() {
        if (this.state.quantityLevel > 0) {
            this.setState({quantityLevel: this.state.quantityLevel - 1})
        }
    }

    quantityRightPlusLevel() {
        this.setState({quantityLevel: this.state.quantityLevel + 1})
    }

    componentWillUpdate(nextProps, nextState) {
    }

    handlePageChange(pageNumber) {
        this.setState({activePage: pageNumber});

        const data = this.props.contentStored.data

        let params = {
            listingTypeId: data.listingTypeId,
            propertyTypeId: data.propertyTypeId,
            districtIds: data.districtId ? [data.districtId] : null,
            suggestBudget: data.price,
            page: pageNumber,
        }

        fetchDealGroupUser((data) => {
            this.setState({dealGroupUser: data})
        }, params)
    }

    render() {
        const type = this.state.type
        const {
            data,
            listingTypeList,
            propertyTypesList,
            propertyGroupList,
            userRightTypeList,
            disabled,
            districts,
            wards,
            streets,
            purposes,
        } = this.props.contentStored

        const {name, phone} = this.state
        const marialStatus = [
            {
                value: false,
                label: "Chưa Kết Hôn",
            },
            {
                value: true,
                label: "Đã Kết Hôn",
            },
        ]
        const optionsDistrict = [
            {
                value: 0,
                label: "Quận",
            },
        ].concat(
            districts.map((it) => {
                return {
                    value: it.districtId,
                    label: it.districtName,
                }
            })
        )
        const optionsWard = [
            {
                value: 0,
                label: "Phường",
            },
        ].concat(
            wards.map((it) => {
                return {
                    value: it.wardId,
                    label: it.wardName,
                }
            })
        )
        let selectedWard = optionsWard[0];
        if(data.wardId){
            selectedWard = optionsWard.filter(
                (ward) => ward.value === data.wardId
            )
        }
        const optionsStreet = [
            {
                value: 0,
                label: "Đường",
            },
        ].concat(
            streets.map((it) => {
                return {
                    value: it.streetId,
                    label: it.streetName,
                }
            })
        )
        let selectedStreet = optionsStreet[0]
        if (data.streetId) {
            selectedStreet = optionsStreet.filter(
                (street) => street.value === data.streetId
            )
        }
        const optionsPurpose1607 = [
            {
                value: 0,
                label: "Thời gian gửi bán nhà",
            },
        ].concat(
            purposes["1607"].map((it) => {
                return {
                    value: it.id,
                    label: it.name,
                }
            })
        )
        const listChecked = data.purposes.map((it) => it.id)
        let value1607 = null
        const findValue1607 = data.purposes.find((it) => it.parentId == 1607)
        if (findValue1607) {
            value1607 = optionsPurpose1607.find(
                (it) => it.value == findValue1607.id
            )
        }
        const { listingTypeId, propertyTypeGroup, propertyTypeId } = data;
        const form = getForm(this.state.formId);
        return (
            <Fragment>
                <div className="wrapper-kyc">
                    <div className="content-kyc no-header">
                        <div className="box-kyc">
                            <div className="box-kyc-header">
                                <h1 className="heading">BÁN/ CHO THUÊ</h1>
                            </div>
                            <div className="box-kyc-body">
                                <div className="row form-group">
                                    <div className="col-sm-12">
                                        <div className="col-sm-12">
                                            <h4 className="title">
                                                1. Thông tin khách hàng
                                            </h4>
                                        </div>
                                        <div className="col-sm-12">
                                            <div
                                                className="box-kyc"
                                                style={styleBox.box}
                                            >
                                                <div className="box-kyc-body">
                                                    <div className="row form-group">
                                                        <div
                                                            className="col-sm-1"
                                                            style={
                                                                styleBox.nopadding
                                                            }
                                                        >
                                                            <label>
                                                                Tên :{" "}
                                                            </label>
                                                        </div>
                                                        <div className="col-sm-3">
                                                            <p>
                                                                <input
                                                                    className="form-control"
                                                                    type="text"
                                                                    value={
                                                                        name
                                                                            ? name
                                                                            : "N/a"
                                                                    }
                                                                    style={{
                                                                        height:
                                                                            "35px",
                                                                    }}
                                                                />
                                                            </p>
                                                        </div>
                                                        <div
                                                            className="col-sm-2"
                                                            style={
                                                                styleBox.nopadding
                                                            }
                                                        >
                                                            <label>
                                                                Số điện thoại :{" "}
                                                            </label>
                                                        </div>
                                                        <div className="col-sm-2">
                                                            <p>
                                                                <input
                                                                    className="form-control"
                                                                    type="text"
                                                                    value={
                                                                        phone
                                                                            ? phone
                                                                            : "N/a"
                                                                    }
                                                                    style={{
                                                                        height:
                                                                            "35px",
                                                                        padding:
                                                                            "0 !important",
                                                                        margin:
                                                                            "0 !important",
                                                                    }}
                                                                />
                                                            </p>
                                                        </div>
                                                        <div
                                                            className="col-sm-1"
                                                            style={
                                                                styleBox.nopadding
                                                            }
                                                        >
                                                            <label>
                                                                Pháp lý:{" "}
                                                            </label>
                                                        </div>
                                                        <div
                                                            className="col-sm-3"
                                                            style={{
                                                                padding: "0px",
                                                            }}
                                                        >
                                                            <Select
                                                                options={
                                                                    marialStatus
                                                                }
                                                                isSearchable={
                                                                    false
                                                                }
                                                                value={
                                                                    this.state
                                                                        .marial
                                                                }
                                                                onChange={(
                                                                    marial
                                                                ) => {
                                                                    this.setState(
                                                                        {
                                                                            marial: marial,
                                                                        }
                                                                    )
                                                                }}
                                                                placeholder="--- Vui lòng chọn ---"
                                                            />
                                                        </div>
                                                    </div>

                                                    {/* <div className="row form-group">
                                                        <div className="col-sm-6"><label>Nhu cầu : </label></div>
                                                        <div className="col-sm-6"><p> Bán/ Cho Thuê</p></div>
                                                    </div> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {type == 1 && (
                                        <div className="col-sm-6">
                                            <div className="col-sm-12">
                                                <h4 className="title">
                                                    2. Kinh nghiệm bán nhà
                                                </h4>
                                            </div>
                                            <div className="col-sm-12">
                                                <div
                                                    className="box-kyc"
                                                    style={styleBox.box}
                                                >
                                                    <div className="box-kyc-body">
                                                        <div className="row form-group">
                                                            <div className="col-sm-12">
                                                                <label>
                                                                    Trước khi
                                                                    tìm đến
                                                                    Propzy, Anh
                                                                    Chị đã gửi
                                                                    bán nhà ở
                                                                    đâu chưa?
                                                                </label>
                                                            </div>
                                                            {
                                                                <RadioExperience
                                                                    list={
                                                                        purposes[
                                                                        "1601"
                                                                        ]
                                                                    }
                                                                    id={1601}
                                                                    listChecked={
                                                                        listChecked
                                                                    }
                                                                    handleOnChange={
                                                                        this
                                                                            .handleOnChangePurposesRadio
                                                                    }
                                                                />
                                                            }
                                                        </div>
                                                        <div className="row form-group">
                                                            <div className="col-sm-12">
                                                                <label>
                                                                    Hiện trạng
                                                                    tài sản mình
                                                                    có đang thế
                                                                    chấp ở đâu
                                                                    không ?
                                                                </label>
                                                            </div>
                                                            <RadioExperience
                                                                list={
                                                                    purposes[
                                                                    "1604"
                                                                    ]
                                                                }
                                                                id={1604}
                                                                listChecked={
                                                                    listChecked
                                                                }
                                                                handleOnChange={
                                                                    this
                                                                        .handleOnChangePurposesRadio
                                                                }
                                                            />
                                                        </div>
                                                        <div className="row form-group">
                                                            <div className="col-sm-12">
                                                                <label>
                                                                    Anh chị định
                                                                    gửi bán
                                                                    trong bao
                                                                    lâu ?
                                                                </label>
                                                            </div>
                                                            <div className="col-sm-12">
                                                                <Select
                                                                    options={
                                                                        optionsPurpose1607
                                                                    }
                                                                    isSearchable={
                                                                        false
                                                                    }
                                                                    value={
                                                                        value1607
                                                                            ? value1607
                                                                            : optionsPurpose1607[0]
                                                                    }
                                                                    onChange={(
                                                                        values
                                                                    ) =>
                                                                        this.handleOnChangePurposesSelect(
                                                                            values,
                                                                            1607
                                                                        )
                                                                    }
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="row form-group">
                                    <div className="col-sm-12">
                                        <h4 className="title">
                                            {type == 1 ? "3" : "2"}. Thông tin
                                            bất động sản
                                        </h4>
                                    </div>
                                    <div className="col-sm-12">
                                        <div
                                            className="box-kyc"
                                            style={styleBox.box}
                                        >
                                            <div className="box-kyc-body">
                                                <div className="row form-group">
                                                    <div className="col-md-3 col-lg-2 listing-type-label">
                                                        <label className="control-label required">
                                                            Loại giao dịch:
                                                        </label>{" "}
                                                    </div>
                                                    <RadioCheck list={listingTypeList} name="listing-type" selectedValue={listingTypeId} onChange={this.handleOnChangeListingType} />
                                                </div>

                                                <div className="row form-group">
                                                    <div className="col-md-3 col-lg-2 property-type-group-label">
                                                        <label className="control-label required">
                                                            Nhóm bất động sản:
                                                        </label>{" "}
                                                    </div>
                                                    <div className="col-md-9 col-lg-10 ">
                                                        <div className="row form-group">
                                                            <div className="col-sm-4">
                                                                <Select 
                                                                    value={propertyTypeGroup}
                                                                    options={propertyGroupList.map(item => {
                                                                        return {value: item.value, label: item.label}
                                                                    })}
                                                                    placeholder={"Nhóm BĐS"}
                                                                    onChange={this.handleOnChangePropertyGroup}
                                                                />
                                                                </div>
                                                            </div>
                                                    </div>
                                                </div>
                                                <div className="row form-group">
                                                    <div className="col-md-3 col-lg-2 property-type-label">
                                                        <label className="control-label required">
                                                            Loại bất động sản:
                                                        </label>{" "}
                                                    </div>
                                                    <div className="col-md-9 col-lg-10 ">
                                                        <div className="row ">
                                                            <RadioCheck list={propertyTypesList} name="property-type" selectedValue={propertyTypeId} onChange={this.handleOnChangePropertyType} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row form-group">
                                                    <div className="col-md-3 col-lg-2 position-label">
                                                        <label className="control-label required">
                                                            Vị trí:
                                                        </label>{" "}
                                                    </div>
                                                    <div className="col-md-9 col-lg-10">
                                                        <div className="row form-group">
                                                            <div className="col-sm-4">
                                                                <Select
                                                                    options={
                                                                        optionsDistrict
                                                                    }
                                                                    isSearchable={
                                                                        false
                                                                    }
                                                                    value={
                                                                        data.districtId
                                                                            ? optionsDistrict[
                                                                            data
                                                                                .districtId
                                                                            ]
                                                                            : optionsDistrict[0]
                                                                    }
                                                                    onChange={
                                                                        this
                                                                            .handleOnChangeSelectDistrict
                                                                    }
                                                                />
                                                            </div>
                                                            <div className="col-sm-4">
                                                                <Select
                                                                    options={
                                                                        optionsWard
                                                                    }
                                                                    isSearchable={
                                                                        false
                                                                    }
                                                                    value={
                                                                        selectedWard
                                                                    }
                                                                    onChange={
                                                                        this
                                                                            .handleOnChangeSelectWard
                                                                    }
                                                                />
                                                            </div>
                                                            <div className="col-sm-4">
                                                                <Select
                                                                    options={
                                                                        optionsStreet
                                                                    }
                                                                    isSearchable={
                                                                        false
                                                                    }
                                                                    value={
                                                                        selectedStreet
                                                                    }
                                                                    onChange={
                                                                        this
                                                                            .handleOnChangeSelectStreet
                                                                    }
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="row form-group">
                                                            <div className="col-sm-5">
                                                                <input
                                                                    type="text"
                                                                    id="houseNumber"
                                                                    className="form-control"
                                                                    placeholder="Số nhà"
                                                                    onChange={
                                                                        this
                                                                            .handleOnChangeAddress
                                                                    }
                                                                />
                                                            </div>
                                                            <div
                                                                className="col-sm-2"
                                                                style={
                                                                    styleBox.nopadding
                                                                }
                                                            >
                                                                <div className="need-radio">
                                                                    <input
                                                                        id="location-1"
                                                                        type="radio"
                                                                        className="need-radio-input"
                                                                        name="location-type"
                                                                        onChange={this.onInputChange.bind(
                                                                            this
                                                                        )}
                                                                        value="1"
                                                                        checked={
                                                                            this
                                                                                .state
                                                                                .locationType ==
                                                                                "1"
                                                                                ? true
                                                                                : false
                                                                        }
                                                                        placeholder="--- Vui lòng chọn ---"
                                                                    />
                                                                    <label
                                                                        htmlFor="location-1"
                                                                        className="need-radio-label"
                                                                    >
                                                                        Mặt tiền
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-2">
                                                                <div className="need-radio">
                                                                    <input
                                                                        id="location-0"
                                                                        type="radio"
                                                                        className="need-radio-input"
                                                                        name="location-type"
                                                                        onChange={this.onInputChange.bind(
                                                                            this
                                                                        )}
                                                                        value="2"
                                                                        checked={
                                                                            this
                                                                                .state
                                                                                .locationType ==
                                                                                "2"
                                                                                ? true
                                                                                : false
                                                                        }
                                                                        placeholder="--- Vui lòng chọn ---"
                                                                    />
                                                                    <label
                                                                        htmlFor="location-0"
                                                                        className="need-radio-label"
                                                                    >
                                                                        Hẻm
                                                                    </label>
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-3">
                                                                <input
                                                                    id="alleyWidth"
                                                                    onChange={(
                                                                        e
                                                                    ) => {
                                                                        this.setState(
                                                                            {
                                                                                alleyWidth:
                                                                                    e
                                                                                        .target
                                                                                        .value,
                                                                            }
                                                                        )
                                                                    }}
                                                                    value={
                                                                        this
                                                                            .state
                                                                            .alleyWidth
                                                                    }
                                                                    type="text"
                                                                    style={{
                                                                        width:
                                                                            "100%",
                                                                    }}
                                                                    placeholder="Độ rộng (m2)"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="row form-group">
                                                    <div className="col-md-3 col-lg-2">
                                                        <label>Đặc điểm:</label>{" "}
                                                    </div>
                                                    <div className="col-md-9 col-lg-10">
                                                        <div className="row form-group">
                                                            <div style={{ display: form.bedRooms.display ? 'block' : 'none' }}>
                                                                <div className="col-md-1 bedRooms-label">
                                                                    Phòng ngủ <span style={{ color: 'red', fontWeight: 'bold', display: form.bedRooms.required ? 'block' : 'none' }}>*</span>
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <div className="input-group">
                                                                        <span className="input-group-btn">
                                                                            <button
                                                                                type="button"
                                                                                onClick={this.quantityLeftMinusSleep.bind(
                                                                                    this
                                                                                )}
                                                                                className="quantity-left-minus-sleep btn btn-number"
                                                                                data-type="minus"
                                                                                data-field=""
                                                                                style={{
                                                                                    "background-color":
                                                                                        "#f17423",
                                                                                    color:
                                                                                        "white",
                                                                                }}
                                                                            >
                                                                                <span className="glyphicon glyphicon-minus"></span>
                                                                            </button>
                                                                        </span>
                                                                        <input
                                                                            type="text"
                                                                            style={
                                                                                (styleBox.nopaddingright,
                                                                                {
                                                                                    zIndex: 0,
                                                                                })
                                                                            }
                                                                            id="quantitySleepingRoom"
                                                                            value={
                                                                                this
                                                                                    .state
                                                                                    .quantitySleepingRoom
                                                                            }
                                                                            name="quantity"
                                                                            className="form-control input-number"
                                                                            min="1"
                                                                            max="100"
                                                                        />
                                                                        <span className="input-group-btn">
                                                                            <button
                                                                                type="button"
                                                                                onClick={this.quantityRightPlusSleep.bind(
                                                                                    this
                                                                                )}
                                                                                className="quantity-right-plus-sleep btn btn-number"
                                                                                data-type="plus"
                                                                                data-field=""
                                                                                style={{
                                                                                    "background-color":
                                                                                        "#f17423",
                                                                                    color:
                                                                                        "white",
                                                                                    "z-index":
                                                                                        "0",
                                                                                }}
                                                                            >
                                                                                <span className="glyphicon glyphicon-plus"></span>
                                                                            </button>
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div style={{ display: form.bathRooms.display ? 'block' : 'none' }}>
                                                                <div className="col-md-1 bathRooms-label">
                                                                    Phòng tắm <span style={{ color: 'red', fontWeight: 'bold', display: form.bathRooms.required ? 'block' : 'none' }}>*</span>
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <div className="input-group">
                                                                        <span className="input-group-btn">
                                                                            <button
                                                                                type="button"
                                                                                onClick={this.quantityLeftMinusBathRoom.bind(
                                                                                    this
                                                                                )}
                                                                                className="quantity-left-minus-bath btn btn-number"
                                                                                data-type="minus"
                                                                                data-field=""
                                                                                style={{
                                                                                    "background-color":
                                                                                        "#f17423",
                                                                                    color:
                                                                                        "white",
                                                                                }}
                                                                            >
                                                                                <span className="glyphicon glyphicon-minus"></span>
                                                                            </button>
                                                                        </span>
                                                                        <input
                                                                            type="text"
                                                                            style={
                                                                                (styleBox.nopaddingright,
                                                                                {
                                                                                    zIndex: 0,
                                                                                })
                                                                            }
                                                                            id="quantityBathRoom"
                                                                            name="quantity"
                                                                            className="form-control input-number"
                                                                            value={
                                                                                this
                                                                                    .state
                                                                                    .quantityBathRoom
                                                                            }
                                                                            min="1"
                                                                            max="100"
                                                                        />
                                                                        <span className="input-group-btn">
                                                                            <button
                                                                                type="button"
                                                                                onClick={this.quantityRightPlusBathRoom.bind(
                                                                                    this
                                                                                )}
                                                                                className="quantity-right-plus-bath btn btn-number"
                                                                                data-type="plus"
                                                                                data-field=""
                                                                                style={{
                                                                                    "background-color":
                                                                                        "#f17423",
                                                                                    color:
                                                                                        "white",
                                                                                    "z-index":
                                                                                        "0",
                                                                                }}
                                                                            >
                                                                                <span className="glyphicon glyphicon-plus"></span>
                                                                            </button>
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div style={{display: form.numberFloor.display ? 'block' : 'none'}}>
                                                                <div className="col-md-1 numberFloor-label">
                                                                    Số tầng <span style={{ color: 'red', fontWeight: 'bold', display: form.numberFloor.required ? 'block' : 'none' }}>*</span>
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <div className="input-group">
                                                                        <span className="input-group-btn">
                                                                            <button
                                                                                onClick={this.quantityLeftMinusLevel.bind(
                                                                                    this
                                                                                )}
                                                                                type="button"
                                                                                className="quantity-left-minus-level btn btn-number"
                                                                                data-type="minus"
                                                                                data-field=""
                                                                                style={{
                                                                                    "background-color":
                                                                                        "#f17423",
                                                                                    color:
                                                                                        "white",
                                                                                }}
                                                                            >
                                                                                <span className="glyphicon glyphicon-minus"></span>
                                                                            </button>
                                                                        </span>
                                                                        <input
                                                                            type="text"
                                                                            style={
                                                                                (styleBox.nopaddingright,
                                                                                {
                                                                                    zIndex: 0,
                                                                                })
                                                                            }
                                                                            id="quantityLevel"
                                                                            name="quantity"
                                                                            className="form-control input-number"
                                                                            value={
                                                                                this
                                                                                    .state
                                                                                    .quantityLevel
                                                                            }
                                                                            min="1"
                                                                            max="100"
                                                                        />
                                                                        <span className="input-group-btn">
                                                                            <button
                                                                                onClick={this.quantityRightPlusLevel.bind(
                                                                                    this
                                                                                )}
                                                                                type="button"
                                                                                className="quantity-right-plus-level btn btn-number"
                                                                                data-type="plus"
                                                                                data-field=""
                                                                                style={{
                                                                                    "background-color":
                                                                                        "#f17423",
                                                                                    color:
                                                                                        "white",
                                                                                    "z-index":
                                                                                        "0",
                                                                                }}
                                                                            >
                                                                                <span className="glyphicon glyphicon-plus"></span>
                                                                            </button>
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row form-group">
                                                            <div className="col-xs-2">
                                                                Hướng
                                                            </div>
                                                            <div
                                                                className="col-xs-4"
                                                                style={{
                                                                    padding:
                                                                        "0px",
                                                                }}
                                                            >
                                                                <Select
                                                                    options={this.state.directionList
                                                                        .map(
                                                                            (
                                                                                o
                                                                            ) => {
                                                                                return {
                                                                                    value:
                                                                                        o.dId,
                                                                                    label:
                                                                                        o.directionName,
                                                                                }
                                                                            }
                                                                        )
                                                                        .filter(
                                                                            (
                                                                                o
                                                                            ) => {
                                                                                return (
                                                                                    o.value <=
                                                                                    8 &&
                                                                                    o.value >
                                                                                    0
                                                                                )
                                                                            }
                                                                        )}
                                                                    isSearchable={
                                                                        false
                                                                    }
                                                                    value={
                                                                        this
                                                                            .state
                                                                            .direction
                                                                    }
                                                                    onChange={(
                                                                        direction
                                                                    ) => {
                                                                        this.setState(
                                                                            {
                                                                                direction: direction,
                                                                            }
                                                                        )
                                                                    }}
                                                                    placeholder="--- Vui lòng chọn ---"
                                                                />
                                                            </div>

                                                            <div className="col-xs-2">Pháp lý</div>
                                                            <div className="col-xs-4" style={{padding: "0px"}}>
                                                                <Select
                                                                    options={userRightTypeList.map(
                                                                        (o) => {
                                                                            return {
                                                                                value:
                                                                                    o.useRightTypeId,
                                                                                label:
                                                                                    o.typeName,
                                                                            }
                                                                        }
                                                                    )}
                                                                    isSearchable={
                                                                        false
                                                                    }
                                                                    value={
                                                                        this
                                                                            .state
                                                                            .userRightType
                                                                    }
                                                                    onChange={(
                                                                        userRightType
                                                                    ) => {
                                                                        this.setState(
                                                                            {
                                                                                userRightType: userRightType,
                                                                            }
                                                                        )
                                                                    }}
                                                                    placeholder="--- Vui lòng chọn ---"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="row form-group">
                                                    <div className="col-md-3 col-lg-2 price-label">
                                                        <label className="control-label required">
                                                            Giá đề nghị:
                                                        </label>{" "}
                                                    </div>
                                                    <div className="col-md-9 col-lg-10">
                                                        <div className="row form-group">
                                                            <div className="col-sm-5">
                                                                <NumberFormat
                                                                    value={data.price}
                                                                    name="suggestedPrice"
                                                                    thousandSeparator={','}
                                                                    className="form-control"
                                                                    placeholder="Giá đề nghị"
                                                                    onValueChange={this.handleOnChangePrice}
                                                                    type="text"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <br />
                                                <br />
                                                <div className="row form-group">
                                                    <div className="col-md-3 col-lg-2 owner-info-label">
                                                        <label className="control-label required">
                                                            Thông tin chủ nhà:
                                                        </label>{" "}
                                                    </div>
                                                    <div className="col-md-9 col-lg-10">
                                                        <div className="row form-group">
                                                            <div className="col-sm-5">
                                                                <input
                                                                    className="form-control"
                                                                    onChange={this.handleOnChangeOwnerName}
                                                                    value={data.owner.name ? data.owner.name : ""}
                                                                    placeholder="Họ và Tên (*)"
                                                                />
                                                            </div>

                                                            <div className="col-sm-5">
                                                                <NumberFormat
                                                                    format="### ### ####"
                                                                    className="form-control"
                                                                    value={data.owner.phone ? data.owner.phone : ""}
                                                                    onValueChange={this.handleOnChangeOwnerPhone}
                                                                    placeholder="Số điện thoại (*)"
                                                                />
                                                            </div>

                                                            <div className="col-md-2">
                                                                <button
                                                                    style={{
                                                                        width: "100%",
                                                                    }}
                                                                    className="btn btn-kyc "
                                                                    onClick={this.handleOnClickSave}
                                                                >
                                                                    LƯU
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="row form-group">
                                                    <div className="col-sm-12 text-center">
                                                        {/* <button className="btn btn-kyc btn-kyc-primary" onClick={this.handleOnClickSeeMatchDeal}>XEM TRƯỚC DEAL PHÙ HỢP</button> */}
                                                        {/* <button className="btn btn-kyc " onClick={this.handleOnClickSave}>LƯU</button> */}
                                                    </div>
                                                </div>

                                                <div className="row form-group">
                                                    <div className="col-sm-6">
                                                        <b>
                                                            Danh sách người mua
                                                            phù hợp:
                                                        </b>
                                                    </div>
                                                    <div className="col-sm-6 text-right">
                                                        <div
                                                            className="btn-group"
                                                            role="group"
                                                            aria-label="..."
                                                        >
                                                            <button
                                                                type="button"
                                                                className="btn btn-default deal-date"
                                                                value="30"
                                                                onClick={this.getDealByDate.bind(
                                                                    this
                                                                )}
                                                            >
                                                                30 ngày
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className="btn btn-default deal-date"
                                                                value="60"
                                                                onClick={this.getDealByDate.bind(
                                                                    this
                                                                )}
                                                            >
                                                                60 ngày
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className="btn btn-default deal-date"
                                                                value="90"
                                                                onClick={this.getDealByDate.bind(
                                                                    this
                                                                )}
                                                            >
                                                                90 ngày
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="row form-group">
                                                    <div className="col-sm-12">
                                                        <table className="table">
                                                            <thead>
                                                                <tr>
                                                                    <th style={{"backgroundColor": "#ddd", "color": "black"}}>BA</th>
                                                                    <th style={{"backgroundColor": "#ddd", "color": "black"}}>Sô người mua ({this.state.dealGroupUser != undefined ? this.state.dealGroupUser.data.totalDeals : ''})</th>
                                                                    <th style={{"backgroundColor": "#ddd", "color": "black", "width": "30%"}}>Ngân sách</th>
                                                                    <th style={{"backgroundColor": "#ddd", "color": "black"}}></th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {
                                                                    this.state.dealGroupUser != undefined ? this.state.dealGroupUser.data.list.map((o) => {
                                                                        return (
                                                                            <tr>
                                                                                <td>{o.assignedName}</td>
                                                                                <td>{o.numberOfDeals}</td>
                                                                                <td>{o.finalBudget}</td>
                                                                                <td><button style={{"color": "#f17423"}} className="btn btn-link" onClick={this.handleOnClickSeeMatchDeal.bind(this, o.assignedTo)}>Xem chi tiết</button></td>
                                                                            </tr>
                                                                        )
                                                                    }) : ''
                                                                }
                                                            </tbody>
                                                        </table>
                                                        <div style={{"float": "right"}}>
                                                            <Pagination
                                                                activePage={this.state.activePage}
                                                                itemsCountPerPage={10}
                                                                totalItemsCount={this.state.dealGroupUser ? this.state.dealGroupUser.data.totalItems : 0}
                                                                pageRangeDisplayed={5}
                                                                onChange={this.handlePageChange.bind(this)}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {type == 1 && (
                                    <div className="row form-group">
                                        <div className="col-sm-12">
                                            <h4 className="title">
                                                4. Các gói dịch vụ bán nhà
                                            </h4>
                                        </div>
                                        <div className="col-sm-12">
                                            <div
                                                className="box-kyc"
                                                style={styleBox.box}
                                            >
                                                <div className="box-kyc-body">
                                                    <div className="row form-group">
                                                        <div className="col-sm-12">
                                                            <a
                                                                href="javascript:void(0)"
                                                                data-toggle="modal"
                                                                data-target="#modal-packet-propzy"
                                                            >
                                                                Biểu phí và các
                                                                gói dịch vụ
                                                            </a>{" "}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <ModalListDeal
                    filter={{
                        listingTypeId: data.listingTypeId,
                        propertyTypeId: data.propertyTypeId,
                        suggestBudget: data.price,
                        districtIds: data.districtId ? [data.districtId] : null,
                        assignedTo: this.state.assignedTo,
                        fromDate: this.state.fromDate,
                        toDate: this.state.toDate,
                    }}
                />
                <ModalPacket />
            </Fragment>
        )
    }
}
export default connect()(React.memo(CreateListing))

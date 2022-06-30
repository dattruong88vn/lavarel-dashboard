import React, { Component } from "react"
import DateTimePicker from "react-datetime-picker"
import axios from "axios"
import AsyncSelect from "react-select/async"
import { getDetailPlanning, submitPlanning } from "./../services"
import moment from "moment"

const getListings = (callback, input, currentValue) => {
    var url =
        "/deal/listing-planning/" + deal.dealId + "?keySearch=" + input + "&"
    var locations = {}
    var fromTo = []
    var wardsList = []
    var districtsList = []
    var positionsList = []
    var directionsList = []
    var privateListing = []
    $("#crm_jm_formCustomSearchListing .districtsList:checked").each(
        function () {
            districtsList.push($(this).val())
        }
    )

    if (districtsList.length > 0) {
        locations["districtsList"] = districtsList
    } else {
        locations["districtsList"] = ""
    }

    $("#crm_jm_formCustomSearchListing .positionsList:checked").each(
        function () {
            positionsList.push($(this).val())
        }
    )
    if (positionsList.length > 0) {
        locations["positionsList"] = positionsList
    } else {
        locations["positionsList"] = ""
    }

    $("#crm_jm_formCustomSearchListing .ward:checked").each(function () {
        wardsList.push($(this).val())
    })
    if (wardsList.length > 0) {
        locations["wardsList"] = wardsList
    } else {
        locations["wardsList"] = ""
    }
    $("#crm_jm_formCustomSearchListing .privateListing:checked").each(
        function () {
            privateListing = $(this).val()
        }
    )
    if (privateListing.length > 0) {
        locations["privateListing"] = privateListing
    } else {
        locations["privateListing"] = ""
    }
    $("#crm_jm_formCustomSearchListing .status").each(function () {
        if ($(this).is(":checked")) {
            locations[$(this).attr("statusname")] = true
        } else {
            locations[$(this).attr("statusname")] = false
        }
    })
    $("#crm_jm_formCustomSearchListing .directionsAdvange:checked").each(
        function () {
            directionsList.push($(this).val())
        }
    )
    if (directionsList.length > 0) {
        locations["directionsList"] = directionsList
    } else {
        locations["directionsList"] = ""
    }
    if (Object.keys(locations).length > 0) {
        url += "locations=" + JSON.stringify(locations) + "&"
    }
    if (
        $("input[name='alleyFromTo']").val() != "" &&
        $("input[name='alleyToValue']").val() != ""
    ) {
        var pushItem = {
            type: "alley",
            fromValue: $("input[name='alleyFromTo']").val(),
            toValue: $("input[name='alleyToValue']").val(),
        }
        fromTo.push(pushItem)
    }

    if (
        $("input[name='lengthFromTo']").val() != "" &&
        $("input[name='lengthToValue']").val() != ""
    ) {
        var pushItem = {
            type: "length",
            fromValue: $("input[name='lengthFromTo']").val(),
            toValue: $("input[name='lengthToValue']").val(),
        }
        fromTo.push(pushItem)
    }

    if (
        $("input[name='widthFromTo']").val() != "" &&
        $("input[name='widthToValue']").val() != ""
    ) {
        fromTo.push({
            type: "width",
            fromValue: $("input[name='widthFromTo']").val(),
            toValue: $("input[name='widthToValue']").val(),
        })
    }

    if ($("input[name='yearBuiltFromTo']").val() != "") {
        fromTo.push({
            type: "yearbuilt",
            fromValue: $("input[name='yearBuiltFromTo']").val(),
        })
    }
    if (fromTo.length > 0) {
        url += "fromTo=" + JSON.stringify(fromTo) + "&"
    }

    var classify = []
    $.each(
        $(
            "#crm_jm_formCustomSearchListing input[name='classifyList[]']:checked"
        ),
        function () {
            classify.push($(this).val())
        }
    )
    if (classify.length > 0) {
        url += "classifyList=" + JSON.stringify(classify) + "&"
    } //isOwner

    var isOwner =
        $(
            "#crm_jm_formCustomSearchListing input[name='isOwner']:checked"
        ).val() == 1
            ? true
            : false
    url += "isOwner=" + isOwner + "&"

    var data_location = $.trim($("#location_map").val()).length
        ? JSON.parse($("#location_map").val())
        : null
    console.log(url, data_location)

    axios
        .get(url)
        .then((xhr) => {
            // response = xhr.data;
            if (currentValue != "") {
                currentValue.forEach((value, key) => {
                    if (xhr.data.length > 0) {
                        xhr.data.forEach((v, k) => {
                            if (value.value == v.value) {
                                xhr.data.splice(k, 1)
                            }
                        })
                    }
                })
            }
            console.log("xhr.data", xhr.data, "currentValue", currentValue)
            callback(xhr.data)
        })
        .catch((err) => {
            console.error("fail")
        })
    // generateTableListingAtDetail(url,"",data_location);
}

//   const loadOptions = (inputValue, callback) => {
//     // console.log("inputValue",inputValue);
//     // console.log("loadOptions",filterColors(inputValue));
//     getListings(callback,inputValue);
//     // setTimeout(() => {
//     //   callback(filterColors(inputValue));
//     // }, 1000);
//   };

export default class ModalCheckingPlaning extends Component {
    constructor(props) {
        super(props)
        this.state = {
            date: new Date(),
            inputValue: "",
            loaded: false,
            label: "Kiểm tra quy hoạch",
        }
        this.onChangeDate = this.onChangeDate.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.submit = this.submit.bind(this)
        this.destroyPlanning = this.destroyPlanning.bind(this)
        this.loadOptions = this.loadOptions.bind(this)
        this.getPlanningDetail = this.getPlanningDetail.bind(this)
    }

    submit() {
        let data = { ...this.state }
        let rListingIDs = data.inputValue.map((value) => {
            return value.value
        })
        let dataPost = {
            dealId: parseInt(deal.dealId),
            scheduleTime: moment(data.date).format("x"),
            isSave: true,
            rListingIDs: rListingIDs.join(","),
        }
        submitPlanning(dataPost).then((response) => {
            response = response.data
            console.log(response)
            if (response.result) {
                showPropzyAlert(response.message)
                $("#quick-modal-checking-planning").modal("hide")
            }
        })
    }

    destroyPlanning() {
        let dataPost = { dealId: parseInt(deal.dealId), isSave: false }
        submitPlanning(dataPost).then((response) => {
            response = response.data
            console.log(response)
            if (response.result) {
                showPropzyAlert(response.message)
                $("#quick-modal-checking-planning").modal("hide")
            }
        })
        // axios.post(`/deal/submit-planning`, dataPost)
        //     .then(response => {
        //         console.log(response);
        //     })
    }

    onChangeDate(date) {
        this.setState({ date })
    }

    loadOptions(inputValue, callback) {
        // console.log("inputValue",inputValue);
        // console.log("loadOptions",filterColors(inputValue));
        getListings(callback, inputValue, this.state.inputValue)
        // setTimeout(() => {
        //   callback(filterColors(inputValue));
        // }, 1000);
    }

    componentDidMount() {
        console.log("ModalCheckingContainer")
        // this.getListings();
    }

    getPlanningDetail() {
        let that = this
        showPropzyLoading()
        this.setState(
            { date: new Date(), inputValue: "", loaded: false },
            function () {
                // reset state
                getDetailPlanning(deal.dealId).then((response) => {
                    response = response.data
                    if (response.result) {
                        let data = response.data
                        console.log("dataModalCheckingContainer", data)
                        if (data.scheduleTime) {
                            let rlistingIds = data.rlistingIds.split(",")
                            let inputValue = rlistingIds.map((listing) => {
                                return { value: listing, label: listing }
                            })
                            that.setState({
                                date: new Date(data.scheduleTime),
                                inputValue: inputValue,
                                loaded: true,
                            })
                        } else {
                            that.setState({ loaded: true })
                        }
                        hidePropzyLoading()
                        $("#quick-modal-checking-planning").modal()
                    }
                })
            }
        )
    }

    handleInputChange(newValue) {
        const inputValue = newValue //newValue.replace(/\W/g, "");
        this.setState({ inputValue })
        // return inputValue;
    }

    render() {
        return (
            <div>
                {/* Trigger the modal with a button */}
                <button
                    class="btn btn-app"
                    disabled={deal.disabledFeature}
                    href="#"
                    type="button"
                    onClick={this.getPlanningDetail}
                >
                    <i class="fa fa-check-square"></i> {this.state.label}
                </button>
                {/* Modal */}
                <div
                    id="quick-modal-checking-planning"
                    className="modal fade"
                    role="dialog"
                >
                    <div className="modal-dialog">
                        {/* Modal content*/}
                        <div className="modal-content">
                            <div className="modal-header">
                                <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                >
                                    ×
                                </button>
                                <h4 className="modal-title">
                                    Kiểm tra quy hoạch
                                </h4>
                            </div>
                            <div className="modal-body">
                                {/* Form content */}
                                <div className="form-group">
                                    <label>Thời gian: </label>
                                    <DateTimePicker
                                        onChange={this.onChangeDate}
                                        value={this.state.date}
                                        format="h:mm a dd/MM/y"
                                        disableClock={true}
                                        className="DateTimePickerCss"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Listing IDs:</label>
                                    {/* <input class="form-control" name="" /> */}
                                    {/* <Select
                                    value={selectedOption}
                                    onChange={this.handleChange}
                                    options={options}
                                /> */}
                                    {this.state.loaded ? (
                                        <AsyncSelect
                                            cacheOptions
                                            loadOptions={this.loadOptions}
                                            defaultValue={this.state.inputValue}
                                            defaultOptions
                                            isMulti
                                            onChange={this.handleInputChange}
                                        />
                                    ) : (
                                        ""
                                    )}
                                </div>
                                {/* End form content */}
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    onClick={this.destroyPlanning}
                                    className="btn btn-danger"
                                >
                                    Hủy
                                </button>
                                <button
                                    type="button"
                                    onClick={this.submit}
                                    className="btn btn-primary"
                                >
                                    Hoàn thành
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Window._colorLabelMatrix = (scoreCardType) => {
    switch (scoreCardType) {
        case "H1":
        case "H2":
            return "label-high";
        case "M1":
        case "M2":
            return "label-medium";
        case "L1":
        case "L0":
            return "label-low";
        default:
            return "label-unclassify";
    }
}


var renderLinkMatrix = function(data, type, object) {
    let colorLabel = Window._colorLabelMatrix(object.scoreCardType);

    let aTag = `<a data-toggle='tooltip' title='${object.projectBuildingName}' href='/deal/detail/${object.dealId}' target='_blank'>${data}</a>`;
    let pTag = `<span data-toggle='tooltip' title='${object.projectBuildingName}'>${data}</span>`;
    let html = object.canAccessDetail ? aTag : pTag;
    html += object.isHot === 1 ? '<br><a href="#" class="label-success evaluate-score-block-list">Tiềm năng</a>' : '';
    html += `<br><a href="#" class="label-primary evaluate-score-block-list">TM : ${
        object.leadProfileValue ? object.leadProfileValue : "N/A"
    }</a>`
    html += `<a href="#" class="label-success evaluate-score-block-list">BA : ${
        object.dealProfileValue ? object.dealProfileValue : "N/A"
    }</a>`
    html += `<a href="#" data-toggle='tooltip' title="LIDs: ${
        object.tourListingId && Array.isArray(object.tourListingId)
        ? "(" + object.tourListingId.join(", ") + ")"
        : "N/A"
    }" class="label-warning evaluate-score-block-list">CC : ${
        object.tourProfileValue ? object.tourProfileValue : "N/A"
    } </a>`
    html += `<p>${
        object.scoreCardType
        ? "<span><i class='fa fa-circle " +
            colorLabel +
            "'></i> " +
            object.scoreCardType +
            "</span>"
        : ""
    }</p>`
    return html
}

const showPopoverHistory = (element) => {
        let e = $(element);
        $.get(e.data('poload'), function(d) {
                    let data = d.data;
                    let subContent = [];
                    if (data.length > 0) {
                        subContent = data.map((item) => {
                                    let _icon = `<i class="fa fa-arrow-up" aria-hidden="true"></i>`;
                                    if (item.dayDifference < 0) {
                                        _icon = `<i class="fa fa-arrow-down" aria-hidden="true"></i>`;
                                    }
                                    return `<div>
                    <p>${moment(item.createdDate).format("DD/MM/YYYY")}<p>
                    <p style="padding-left:15px">Update thời gian chốt deal</p>
                    <p style="padding-left:15px">Ngày chốt deal: ${item.expectedClosingDate ? moment(item.expectedClosingDate).format("DD/MM/YYYY") : ''} ${item.dayDifference ? `<span class="label label-default">${_icon} ${Math.abs(item.dayDifference)}</span>` : ``}</p>
                </div`;
            })
        }
        let content = `<div style="width:280px;max-height:400px;overflow:auto">${subContent.join('')}</div>`;
        e.popover({
            content: content,
            html: true
        }).popover("show");
    });
}

$('body').click(function() {
    if($('.popover-title').length > 0){
        $("[data-poload]").popover("hide");
    }
})

function getInputFiltersMatrix(name, defaultConfig, _permissions) {
    switch (name) {
        case "GET_ZONES": {
            let zoneIds = defaultConfig._defaultSelected.zoneIds
            const zoneField = $(".modal-expand-matrix #zoneField").html("").select2({
                data: zoneIds,
            })

            promise = axios
                .post(POS_APIS_COMMON.get("GET_ZONES"), {
                    action: _permissions[0].actionCode,
                    entity: _permissions[0].entityCode,
                    permissionId:
                        _permissions[_permissions.length - 1].permissionId,
                })
                .then((response) => {
                    const resultsContent = response.data
                    if (
                        resultsContent.result &&
                        resultsContent.data.length > 0
                    ) {
                        const arrDataId = []
                        const zonesContent = resultsContent.data.map((it) => {
                            const itemId = parseInt(it.departmentId)
                            // set data id to array filter
                            arrDataId.push(itemId)

                            return {
                                id: itemId,
                                text: it.departmentName,
                            }
                        })
                        // set all data ids to filter
                        defaultConfig._filter.zoneField = arrDataId

                        // select all option
                        zoneIds = [
                            {
                                id: "",
                                text: "--Tất cả Zone--",
                            },
                        ]

                        zoneIds = zoneIds.concat(zonesContent)
                    }
                    // zoneField.select2("destroy")
                    zoneField.empty().select2({
                        data: zoneIds,
                    })
                })
                .catch((err) => {
                    zoneField.empty().select2({
                        data: zoneIds,
                    })
                })
            break
        }
        case "GET_TEAMS": {
            let teams = defaultConfig._defaultSelected.teamIds
            const teamField = $(".modal-expand-matrix #teamField").html("").select2({
                data: teams,
            })

            promise = axios
                .post(POS_APIS_COMMON.get("GET_TEAMS"), {
                    action: _permissions[0].actionCode,
                    entity: _permissions[0].entityCode,
                    permissionId:
                        _permissions[_permissions.length - 1].permissionId,
                    zoneIds: defaultConfig._dataPostMatrixFilter.zoneField,
                })
                .then((response) => {
                    const resultsContent = response.data
                    if (
                        resultsContent.result &&
                        resultsContent.data.length > 0
                    ) {
                        const arrDataId = []
                        const teamsContent = resultsContent.data.map((it) => {
                            const itemId = parseInt(it.departmentId)
                            // set data id to array filter
                            arrDataId.push(itemId)

                            return {
                                id: itemId,
                                text: it.departmentName,
                            }
                        })
                        // set all data ids to filter
                        defaultConfig._filter.teamField = arrDataId

                        // select all option
                        teams = [
                            {
                                id: "",
                                text: "--Tất cả Teams--",
                            },
                        ]

                        teams = teams.concat(teamsContent)
                    }
                    teamField.empty().select2({
                        data: teams,
                    })
                })
                .catch((err) => {
                    teamField.empty().select2({
                        data: teams,
                    })
                })
            break
        }
        case "GET_DEPARTMENTS": {
            let departments = defaultConfig._defaultSelected.departmentIds
            const departmentField = $(".modal-expand-matrix #departmentField").html("").select2({
                data: departments,
            })

            promise = axios
                .post(POS_APIS_COMMON.get("GET_DEPARTMENTS"), {
                    action: _permissions[0].actionCode,
                    entity: _permissions[0].entityCode,
                    permissionId:
                        _permissions[_permissions.length - 1].permissionId,
                    zoneIds: defaultConfig._dataPostMatrixFilter.zoneField,
                })
                .then((response) => {
                    const resultsContent = response.data
                    if (
                        resultsContent.result &&
                        resultsContent.data.length > 0
                    ) {
                        const arrDataId = []
                        const departmentsContent = resultsContent.data.map(
                            (it) => {
                                const itemId = parseInt(it.departmentId)
                                // set data id to array filter
                                arrDataId.push(itemId)

                                return {
                                    id: itemId,
                                    text: it.departmentName,
                                }
                            }
                        )
                        // set all data ids to filter
                        defaultConfig._filter.departmentField = arrDataId

                        // select all option
                        departments = [
                            {
                                id: "",
                                text: "--Tất cả Phòng ban--",
                            },
                        ]

                        departments = departments.concat(departmentsContent)
                    }
                    departmentField.empty().select2({
                        data: departments,
                    })
                })
                .catch((err) => {
                    departmentField.empty().select2({
                        data: departments,
                    })
                })

            break
        }
        case "GET_MEMBERS": {
            let memberField = defaultConfig._defaultSelected.userIds
            const member = $(".modal-expand-matrix #memberField").html("").select2({
                data: memberField,
            })

            promise = axios
                .post(POS_APIS_COMMON.get("GET_MEMBER_LIST"), {
                    action: _permissions[0].actionCode,
                    entity: _permissions[0].entityCode,
                    permissionId:
                        _permissions[_permissions.length - 1].permissionId,
                    zoneIds: defaultConfig._dataPostMatrixFilter.zoneField,
                    teamIds: defaultConfig._dataPostMatrixFilter.teamField,
                    districtIds: defaultConfig._dataPostMatrixFilter.districtId,
                    wardIds: defaultConfig._dataPostMatrixFilter.wardId,
                    departmentIds: defaultConfig._dataPostMatrixFilter.departmentField,
                })
                .then((response) => {
                    const resultsContent = response.data
                    if (
                        resultsContent.result &&
                        resultsContent.data.length > 0
                    ) {
                        const arrDataId = []
                        const memberFieldContent = resultsContent.data.map(
                            (it) => {
                                const itemId = parseInt(it.userId)

                                // set data id to array filter
                                arrDataId.push(itemId)

                                return {
                                    id: itemId,
                                    text: it.name,
                                }
                            }
                        )
                        // set all data ids to filter
                        defaultConfig._filter.memberField = arrDataId

                        // select all option
                        memberField = [
                            {
                                id: "",
                                text: "--Tất cả Thành viên--",
                            },
                        ]

                        memberField = memberField.concat(memberFieldContent)
                    }
                    member.empty().select2({
                        data: memberField,
                    })
                })
                .catch((err) => {
                    member.empty().select2({
                        data: memberField,
                    })
                })

            break
        }
        case "GET_DISTRICT": {
            let districts = defaultConfig._defaultSelected.districtIds
            const districtField = $(".modal-expand-matrix #districtId").html("").select2({
                data: districts,
            })

            promise = axios
                .get(URL_GET_DISTRICTS_BY_CITY + OPTION_CITY_HCM)
                .then((response) => {
                    const resultsContent = response.data

                    if (
                        resultsContent.result &&
                        resultsContent.data.length > 0
                    ) {
                        const arrDataId = []
                        let districtsContent = resultsContent.data.map((it) => {
                            const itemId = parseInt(it.districtId)

                            // set data id to array filter
                            arrDataId.push(itemId)

                            return {
                                id: itemId,
                                text: it.districtName,
                            }
                        })
                        // set all data ids to filter
                        defaultConfig._filter.districtId = arrDataId

                        // select all option
                        districts = [
                            {
                                id: "",
                                text: "--Tất cả Quận--",
                            },
                        ]

                        districts = districts.concat(districtsContent)
                    }
                    districtField.empty().select2({
                        data: districts,
                    })
                })
                .catch((err) => {
                    districtField.empty().select2({
                        data: districts,
                    })
                })
            break
        }
        case "GET_WARDS": {
            let wards = defaultConfig._defaultSelected.wardIds
            const wardField = $(".modal-expand-matrix #wardId").html("").select2({
                data: wards,
            })
            let districtId = defaultConfig._dataPostMatrixFilter.districtId
            if (!districtId) {
                districtId = "-1"
            }
            promise = axios
                .get(URL_GET_WARDS_BY_DISTRICT + districtId)
                .then((response) => {
                    const resultsContent = response.data

                    if (
                        resultsContent.result &&
                        resultsContent.data.length > 0
                    ) {
                        const arrDataId = []
                        let dataContent = resultsContent.data.map((it) => {
                            const itemId = parseInt(it.wardId)

                            // set data id to array filter
                            arrDataId.push(itemId)

                            return {
                                id: itemId,
                                text: it.wardName,
                            }
                        })
                        // set all data ids to filter
                        defaultConfig._filter.wardId = arrDataId

                        // select all option
                        wards = [
                            {
                                id: "",
                                text: "--Tất cả Phường--",
                            },
                        ]

                        wards = wards.concat(dataContent)
                    }
                    wardField.empty().select2({
                        data: wards,
                    })
                })
                .catch((err) => {
                    wardField.empty().select2({
                        data: wards,
                    })
                })
            break
        }
    }

    return
}



function bindEventByPermissionMatrix(defaultConfig, _permissions) {
    $(document).on("change", ".modal-expand-matrix #zoneField", function (e) {
        let data = null
        // check select data has value
        if (isVal($(this).select2("data")[0].id)) {
            data = [$(this).select2("data")[0].id]
        }

        defaultConfig._dataPostMatrixFilter.zoneField = data
        // reset affected store
        defaultConfig._dataPostMatrixFilter.memberField = null
        defaultConfig._dataPostMatrixFilter.teamField = null
        defaultConfig._dataPostMatrixFilter.districtId = null
        defaultConfig._dataPostMatrixFilter.wardId = null

        getInputFiltersMatrix("GET_MEMBERS", defaultConfig, _permissions)
        getInputFiltersMatrix("GET_TEAMS", defaultConfig, _permissions)
        getInputFiltersMatrix("GET_DISTRICT", defaultConfig, _permissions)
        getInputFiltersMatrix("GET_WARDS", defaultConfig, _permissions)
    })
    $(document).on("change", ".modal-expand-matrix #teamField", function (e) {
        let data = null
        // check select data has value
        if (isVal($(this).select2("data")[0].id)) {
            data = [$(this).select2("data")[0].id]
        }

        defaultConfig._dataPostMatrixFilter.teamField = data
        // reset affected store
        defaultConfig._dataPostMatrixFilter.memberField = null
        defaultConfig._dataPostMatrixFilter.districtId = null
        defaultConfig._dataPostMatrixFilter.wardId = null

        getInputFiltersMatrix("GET_MEMBERS", defaultConfig, _permissions)
        getInputFiltersMatrix("GET_DISTRICT", defaultConfig, _permissions)
        getInputFiltersMatrix("GET_WARDS", defaultConfig, _permissions)
    })
    $(document).on("change", ".modal-expand-matrix #departmentField", function (e) {
        let data = null
        // check select data has value
        if (isVal($(this).select2("data")[0].id)) {
            data = [$(this).select2("data")[0].id]
        }

        defaultConfig._dataPostMatrixFilter.departmentField = data
        // reset affected store
        defaultConfig._dataPostMatrixFilter.memberField = null

        getInputFiltersMatrix("GET_MEMBERS", defaultConfig, _permissions)
    })
    $(document).on("change", ".modal-expand-matrix #memberField", function (e) {
        let data = null
        // check select data has value
        if (isVal($(this).select2("data")[0].id)) {
            data = [$(this).select2("data")[0].id]
        }

        defaultConfig._dataPostMatrixFilter.memberField = data
    })
    $(document).on("change", ".modal-expand-matrix #districtId", function (e) {
        let data = null
        // check select data has value
        if (isVal($(this).select2("data")[0].id)) {
            data = [$(this).select2("data")[0].id]
        }

        defaultConfig._dataPostMatrixFilter.districtId = data
        // reset affected store
        defaultConfig._dataPostMatrixFilter.wardId = null
        defaultConfig._dataPostMatrixFilter.memberField = null

        getInputFiltersMatrix("GET_WARDS", defaultConfig, _permissions)
        getInputFiltersMatrix("GET_MEMBERS", defaultConfig, _permissions)
    })
    $(document).on("change", ".modal-expand-matrix #wardId", function (e) {
        let data = null
        // check select data has value
        if (isVal($(this).select2("data")[0].id)) {
            data = [$(this).select2("data")[0].id]
        }

        defaultConfig._dataPostMatrixFilter.wardId = data
        // reset affected store
        defaultConfig._dataPostMatrixFilter.memberField = null

        getInputFiltersMatrix("GET_MEMBERS", defaultConfig, _permissions)
    })
}

const columns = () => {
    return [
        {
            data: "dealId",
            orderable: false,
            render: function (data, type, object) {
                var agentInfo = ""
                if (object.agentName != null) {
                    agentInfo = object.agentName != null ? object.agentName : "N/A"
                    agentInfo =
                        ' <a data-toggle="tooltip" title="Môi giới: ' +
                        agentInfo +
                        '" href="#"> <i class="fa fa-black-tie" aria-hidden="true"></i></a>'
                }
                return data + agentInfo
            },
        }, // dealID
        {data: "customerName", render: renderLinkMatrix, orderable: false}, // tên khách hàng
        {data: "formatPrice", orderable: false}, // giá
        {data: "formatUnitPrice", orderable: false}, // giá / m2
        {data: "propertyTypeGroupName", orderable: false}, // Thuộc nhóm BĐS
        {
            data: "propertyTypeName",
            orderable: false,
            render: function (data, type, object) {
                return object.listingTypeName + " - " + object.propertyTypeName
            },
        }, // loại BĐS
        {
            data: "",
            orderable: false,
            render: function (data, type, object) {
                let range = '';
                if (object.finalBudgetFormat && object.finalBudgetFormat !== '0') {
                    if (object.initialBudgetFormat && object.initialBudgetFormat !== '0') {
                        range = `${object.initialBudgetFormat} - ${object.finalBudgetFormat}`;
                    } else {
                        range = `<= ${object.finalBudgetFormat}`;
                    }                   
                } else {
                    if (object.initialBudgetFormat && object.initialBudgetFormat !== '0') {
                        range = `>= ${object.initialBudgetFormat}`;
                    } else {
                        range = 'N/A';
                    }
                }
                return range;
            }
        }, // khoảng giá khách tìm kiếm
        {data: "formatPrice", orderable: false}, // ngân sách khách đang có
        {
            data: "preferDistrict",
            render: renderWardDictrictPrefer,
            orderable: false,
        }, // quận phường ưa thích
        {
            data: "statusName",
            orderable: false,
            render: function (data, type, object) {
                var content = []
                content.push(
                    "<div>- <b>LID:</b> <button class='btn btn-link' onclick='JMDetail.openModalListingDetailForAllPage(" +
                    object.rListingId +
                    ");return false;'>" +
                    object.rListingId +
                    "</button></div>"
                )
                content.push(
                    "<div>- <b>Giá chốt:</b> " + object.formatNewPrice + "</div>"
                )
                content.push("<div>- <b>Quận:</b>" + object.districtName + "</div>")
                if (object.statusId == 27 || object.statusId == 29)
                    return (
                        '<button class="btn btn-link" href="#" data-toggle="popover" data-html="true" title="Nhu cầu" data-content="' +
                        content.join("") +
                        '"><i style="font-size:9px;" class="fa fa-gavel" aria-hidden="true"></i> ' +
                        data +
                        "</button>"
                    )
                else return data
            },
        }, // trạng thái
        {
            data: "progressName",
            orderable: false,
            render: progressQuoNameRender,
        }, // tiến độ
        {data: "numberOfTours", orderable: false}, // tổng số tour
        {
            data: "createdDate",
            render: leadDealRender.renderDaysOfBeingDeal,
            orderable: false,
        }, // số ngày tồn tại
        {
            data: "expectedClosingDate",
            orderable: false,
            class: "expectedClosingDate",
            render: function (data, type, object) {
                return hasValue(object.expectedClosingDate) ? moment(object.expectedClosingDate).format("DD/MM/YYYY") : "N/A"
            }
        }, // ngày dự kiến chốt deal
        {
            data: "expectedClosingDateRemain",
            orderable: false,
            className: "expectedClosingDateRemain",
            render: function (data, type, object) {
                if(!hasValue(data)){
                    return "N/A";
                }
                let _diffBpoCloseDate = null;
                if(hasValue(object.diffExpectedClosingDate)){
                    let _icon = `<i class="fa fa-arrow-up" aria-hidden="true"></i>`;
                    if(object.diffExpectedClosingDate < 0){
                        _icon = `<i class="fa fa-arrow-down" aria-hidden="true"></i>`;
                    }
                    _diffBpoCloseDate = `<a href="#" onClick="showPopoverHistory(this);return false;" data-poload="${baseApi}bpo/get-history-closing-date-for-ba/${object.dealId}?access_token=${currentUser.token}" class="label label-default">${_icon} ${Math.abs(object.diffExpectedClosingDate)}</a>`;
                }
                let textExpectedClosingDateRemain = data >= 0 ? `${data} ngày` : `Quá hạn ${Math.abs(data)} ngày`;
                return `<span>${textExpectedClosingDateRemain} ${hasValue(_diffBpoCloseDate) ? _diffBpoCloseDate : ""}</span>`;
            },
        }, // thời gian còn lại để chốt deal
        {data: "lastUpdatedDate", render: dateTimeRender}, // ngày tương tác gần nhất
        {data: "createdDate", render: dateTimeRender}, // ngày tạo
        {data: "sourceName", orderable: false}, // nguồn
        {data: "tmName"}, // tên crm
        {data: "subjectName", orderable: false}, // đối tượng
        {
            data: "timeCounter",
            orderable: false,
            render: function (data, type, object) {
                if (data) {
                    return data
                }
                return "N/A"
            },
        } // timeCounter
    ];
}
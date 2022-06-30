const URL_GET_DISTRICTS_BY_CITY = "/common/get-districts/"
const URL_GET_WARDS_BY_DISTRICT = "/common/get-wards/"

const OPTION_CITY_HCM = 1
const DEFAULT_FORMAT_DATE = "DD/MM/YYYY"
const DEFAULT_FROM_DATE = moment().subtract(7, "d").startOf("day").unix() * 1000 // 7 days
const DEFAULT_TO_DATE = moment().endOf("day").unix() * 1000 // current day

const LIMIT_PER_PAGE = 10
const PAGINATION_SIZE = 7
const TXT_PAGE_PREV = "Trước"
const TXT_PAGE_NEXT = "Tiếp"
//Enum Listing App Status
const LISTING_APP_STATUS = {
	NONE: 1784, // "Không có nhãn"
	BLUE: 1785, // "Nhãn DIY màu xanh"
	GRAY: 1786, // "Nhãn Propzy app màu xám"
	ORANGE: 1787 //  "Nhãn Propzy app màu cam"
}

const checkValueInputFilter = async (props) => {
    if (props.filterredItem) {
        props.selectedItem = props.filterredItem[0]
        // select multi
        if (props.filterredItem.length > 1) {
            props.selectedItem = props.filterredItem
        }
    }

    if (props._mountedPage) {
        if (!props.itemList) {
            props.itemList = await POS_PROMISISE_API(
                props.apiName,
                props.requestData
            )
        }

        // render item select2
        if (props.itemList) {
            if (props.itemList.length === 0) {
                props.configItem.data[0].text = `--None ${props.fieldName}--`
            } else if (
                props.itemList.length > 0 &&
                props.configItem.data.length > 0
            ) {
                props.configItem.data[0].text = `--Tất cả${props.fieldName}--`
            }
        }
    }

    if (props._isClicked) {
        props.itemList = await POS_PROMISISE_API(
            props.apiName,
            props.requestData
        )

        // render item select2
        if (props.itemList && props.itemList.length === 0) {
            props.configItem.data[0].text = `--None ${props.fieldName}--`
        } else if (
            props.itemList.length > 0 &&
            props.configItem.data.length > 0
        ) {
            props.configItem.data[0].text = `--Tất cả${props.fieldName}--`
        }
    }

    return props
}
async function getInputFilters(
    name,
    defaultConfig,
    _permissions,
    _mountedPage,
    _isClicked
) {
    let selectFieldData = {
            selectField: null,
            selectedItem: null,
        },
        configItem = { data: [] }

    switch (name) {
        case "GET_ZONES": {
            selectFieldData = await checkValueInputFilter({
                filterredItem: defaultConfig._filter.zoneField,
                defaultConfig,
                _permissions,
                selectField: $("#zoneField"),
                configItem: {
                    data: defaultConfig._defaultSelected.zoneIds,
                },
                requestData: {
                    action: _permissions[0].actionCode,
                    entity: _permissions[0].entityCode,
                    permissionId:
                        _permissions[_permissions.length - 1].permissionId,
                },
                itemList: POS_STORED_LOCAL_API.ZONE_LIST,
                _mountedPage,
                _isClicked,
                apiName: "GET_ZONES",
                fieldName: " Zone",
            })

            configItem.data = selectFieldData.configItem.data.concat(
                selectFieldData.itemList
            )

            break
        }
        case "GET_TEAMS": {
            selectFieldData = await checkValueInputFilter({
                filterredItem: defaultConfig._filter.teamField,
                defaultConfig,
                _permissions,
                selectField: $("#teamField"),
                configItem: {
                    data: defaultConfig._defaultSelected.teamIds,
                },
                requestData: {
                    action: _permissions[0].actionCode,
                    entity: _permissions[0].entityCode,
                    permissionId:
                        _permissions[_permissions.length - 1].permissionId,
                    zoneIds: defaultConfig._filter.zoneField,
                },
                itemList: POS_STORED_LOCAL_API.TEAM_LIST,
                _mountedPage,
                _isClicked,
                apiName: "GET_TEAMS",
                fieldName: " Team",
            })

            configItem.data = selectFieldData.configItem.data.concat(
                selectFieldData.itemList
            )

            break
        }
        case "GET_DISTRICTS": {
            selectFieldData = await checkValueInputFilter({
                filterredItem: defaultConfig._filter.districtId,
                defaultConfig,
                _permissions,
                selectField: $("#districtId"),
                configItem: {
                    data: defaultConfig._defaultSelected.districtIds,
                },
                requestData: null,
                itemList: POS_STORED_LOCAL_API.DISTRICT_LIST,
                _mountedPage,
                _isClicked,
                apiName: "GET_DISTRICTS",
                fieldName: " Quận",
            })

            configItem.data = selectFieldData.configItem.data.concat(
                selectFieldData.itemList
            )

            break
        }
        case "GET_WARDS": {
            selectFieldData = await checkValueInputFilter({
                filterredItem: defaultConfig._filter.wardId,
                defaultConfig,
                _permissions,
                selectField: $("#wardId"),
                configItem: {
                    data: defaultConfig._defaultSelected.wardIds,
                },
                requestData: {
                    districtId: defaultConfig._filter.districtId || -1,
                },
                itemList: POS_STORED_LOCAL_API.WARD_LIST,
                _mountedPage,
                _isClicked,
                apiName: "GET_WARDS_OPTIMIZED",
                fieldName: " Phường",
            })

            configItem.data = selectFieldData.configItem.data.concat(
                selectFieldData.itemList
            )

            break
        }
        case "GET_DEPARTMENTS": {
            selectFieldData = await checkValueInputFilter({
                filterredItem: defaultConfig._filter.departmentField,
                defaultConfig,
                _permissions,
                selectField: $("#departmentField"),
                configItem: {
                    data: defaultConfig._defaultSelected.departmentIds,
                },
                requestData: {
                    action: _permissions[0].actionCode,
                    entity: _permissions[0].entityCode,
                    permissionId:
                        _permissions[_permissions.length - 1].permissionId,
                    zoneIds: defaultConfig._filter.zoneField,
                },
                itemList: POS_STORED_LOCAL_API.DEPARTMENT_LIST,
                _mountedPage,
                _isClicked,
                apiName: "GET_DEPARTMENTS",
                fieldName: " Phòng ban",
            })

            configItem.data = selectFieldData.configItem.data.concat(
                selectFieldData.itemList
            )

            break
        }
        case "GET_MEMBERS": {
            selectFieldData = await checkValueInputFilter({
                filterredItem: defaultConfig._filter.memberField,
                defaultConfig,
                _permissions,
                selectField: $("#memberField"),
                configItem: {
                    data: defaultConfig._defaultSelected.userIds,
                },
                requestData: {
                    action: _permissions[0].actionCode,
                    entity: _permissions[0].entityCode,
                    permissionId:
                        _permissions[_permissions.length - 1].permissionId,
                    zoneIds: defaultConfig._filter.zoneField,
                    teamIds: defaultConfig._filter.teamField,
                    districtIds: defaultConfig._filter.districtId,
                    wardIds: defaultConfig._filter.wardId,
                    departmentIds: defaultConfig._filter.departmentField,
                },
                itemList: POS_STORED_LOCAL_API.MEMBER_LIST,
                _mountedPage,
                _isClicked,
                apiName: "GET_MEMBERS",
                fieldName: " Thành viên",
            })

            configItem.data = selectFieldData.configItem.data.concat(
                selectFieldData.itemList
            )

            break
        }
        case "GET_SOURCE": {
            // additional Placeholder for config
            configItem = {
                ...configItem,
                placeholder: defaultConfig._defaultSelected.sourceId[0].text,
            }

            selectFieldData = await checkValueInputFilter({
                filterredItem: defaultConfig._filter.sourceId,
                defaultConfig,
                _permissions,
                selectField: $("#sourceId"),
                configItem,
                requestData: null,
                itemList: POS_STORED_LOCAL_API.SOURCE_LIST,
                _mountedPage,
                _isClicked,
                apiName: "GET_SOURCE",
                fieldName: " Nguồn",
            })

            configItem.data = selectFieldData.configItem.data.concat(
                selectFieldData.itemList
            )

            break
        }
        case "GET_TC": {
            // additional Placeholder for config
            configItem = {
                ...configItem,
                placeholder: defaultConfig._defaultSelected.tcId[0].text,
            }

            selectFieldData = await checkValueInputFilter({
                filterredItem: defaultConfig._filter.tcId,
                defaultConfig,
                _permissions,
                selectField: $("#tcId"),
                configItem,
                requestData: null,
                itemList: POS_STORED_LOCAL_API.TC_LIST,
                _mountedPage,
                _isClicked,
                apiName: "GET_TC",
                fieldName: " Trung tâm",
            })

            configItem.data = selectFieldData.configItem.data.concat(
                selectFieldData.itemList
            )

            // check disable TC selector
            let isDisabled = true
            if (localIndexVariables._filter.sourceId) {
                let dataPostItem = localIndexVariables._filter.sourceId.slice()

                // convert to string
                if (isArray(dataPostItem)) {
                    dataPostItem = dataPostItem.join(",")
                }

                // if selected data post is existing TC (177)
                if (dataPostItem.indexOf("177") > -1) {
                    $(`.tcBlock .overlay-filter`).show()
                    isDisabled = false
                } else {
                    $(`.tcBlock .overlay-filter`).hide()
                }
            }

            // set disable select opts
            selectFieldData.selectField.prop("disabled", isDisabled)
            break
        }
        case "GET_INFO_CHANNEL": {
            // additional Placeholder for config
            configItem = {
                ...configItem,
                placeholder: defaultConfig._defaultSelected.infoChannel[0].text,
            }

            selectFieldData = await checkValueInputFilter({
                filterredItem: defaultConfig._filter.channelTypeId,
                defaultConfig,
                _permissions,
                selectField: $("#infoChannel"),
                configItem,
                requestData: null,
                itemList: POS_STORED_LOCAL_API.INFO_CHANNEL_LIST,
                _mountedPage,
                _isClicked,
                apiName: "GET_INFO_CHANNEL",
                fieldName: " Kênh thông tin",
            })

            configItem.data = selectFieldData.configItem.data.concat(
                selectFieldData.itemList
            )

            break
        }
        case "GET_INFO_CHANNEL_CHILD": {
            // additional Placeholder for config
            configItem = {
                ...configItem,
                placeholder: defaultConfig._defaultSelected.infoSource[0].text,
            }

            selectFieldData = await checkValueInputFilter({
                filterredItem: defaultConfig._filter.channelTypeIds,
                defaultConfig,
                _permissions,
                selectField: $("#infoChannelChild"),
                configItem,
                requestData: {
                    parentId: 0,
                },
                itemList: POS_STORED_LOCAL_API.INFO_CHANNEL_CHILD_LIST,
                _mountedPage,
                _isClicked,
                apiName: "GET_INFO_CHANNEL_CHILD",
                fieldName: " Nguồn thông tin",
            })

            // convert data
            let isDisabled = true
            const channelTypeChild = new Map()
            if (selectFieldData.itemList) {
                selectFieldData.itemList.forEach((item) => {
                    if (channelTypeChild.has(item.parentId)) {
                        const sourceItem = channelTypeChild.get(item.parentId)
                        const listChild = sourceItem.children.concat([
                            {
                                id: item.id + "_" + item.parentId,
                                text: item.text,
                                data: {
                                    parentId: item.parentId,
                                },
                            },
                        ])
                        sourceItem.children = listChild
                        channelTypeChild.set(item.parentId, sourceItem)
                    } else {
                        // none, we create new
                        const sourceItem = {
                            id: item.parentId,
                            text: item.parentName,
                            children: [
                                {
                                    id: item.id + "_" + item.parentId,
                                    text: item.text,
                                    data: {
                                        parentId: item.parentId,
                                    },
                                },
                            ],
                        }
                        channelTypeChild.set(item.parentId, sourceItem)
                    }
                })
            }

            // filter by info channel
            const dataMap = []
            if (localIndexVariables._filter.channelTypeId) {
                localIndexVariables._filter.channelTypeId.forEach((it) => {
                    const id = Number.parseInt(it)
                    if (channelTypeChild.has(id)) {
                        dataMap.push(channelTypeChild.get(id))
                    }
                })

                isDisabled = false
                // concat to config item
                configItem.data = selectFieldData.configItem.data.concat(
                    dataMap
                )
            }

            // set disable select opts
            selectFieldData.selectField.prop("disabled", isDisabled)

            break
        }
        case "GET_LISTING_TYPES": {
            selectFieldData = await checkValueInputFilter({
                filterredItem: defaultConfig._filter.listingTypeId,
                defaultConfig,
                _permissions,
                selectField: $("#listingTypeId"),
                configItem: {
                    data: defaultConfig._defaultSelected.listingTypeId,
                },
                requestData: null,
                itemList: POS_STORED_LOCAL_API.LISTING_TYPES_LIST,
                _mountedPage,
                _isClicked,
                apiName: "GET_LISTING_TYPES",
                fieldName: " Loại giao dịch",
            })

            configItem.data = selectFieldData.configItem.data.concat(
                selectFieldData.itemList
            )

            break
        }
        case "GET_PROPERTY_TYPES": {
            // additional Placeholder for config
            configItem = {
                ...configItem,
                placeholder:
                    defaultConfig._defaultSelected.propertyTypeIds[0].text,
            }

            selectFieldData = await checkValueInputFilter({
                filterredItem: defaultConfig._filter.propertyTypeIds,
                defaultConfig,
                _permissions,
                selectField: $("#propertyTypeIds"),
                configItem,
                requestData: {
                    listingTypeId: localIndexVariables._filter.listingTypeId,
                },
                itemList: POS_STORED_LOCAL_API.PROPERTY_TYPES_LIST,
                _mountedPage,
                _isClicked,
                apiName: "GET_PROPERTY_TYPES",
                fieldName: " loại hình BĐS",
            })

            configItem.data = selectFieldData.configItem.data.concat(
                selectFieldData.itemList
            )

            let isDisabled = true
            if (localIndexVariables._filter.listingTypeId) {
                isDisabled = false
            }

            // set disable select opts
            selectFieldData.selectField.prop("disabled", isDisabled)

            break
        }
        case "GET_PROPERTY_LIST_PREFIX": {
            // additional Placeholder for config
            configItem = {
                ...configItem,
                placeholder:
                    defaultConfig._defaultSelected.propertyTypeIds[0].text,
            }

            let paramsRequest = null
            if (localIndexVariables._filter.listingTypeId) {
                paramsRequest = {
                    listingTypeId: localIndexVariables._filter.listingTypeId
                }
            }

            selectFieldData = await checkValueInputFilter({
                filterredItem: defaultConfig._filter.propertyTypeIds,
                defaultConfig,
                _permissions,
                selectField: $("#propertyTypeIds"),
                configItem,
                requestData: paramsRequest,
                itemList: POS_STORED_LOCAL_API.PROPERTY_LIST_PREFIX,
                _mountedPage,
                _isClicked,
                apiName: "GET_PROPERTY_LIST_PREFIX",
                fieldName: " Nguồn thông tin",
            })

            configItem.data = selectFieldData.configItem.data.concat(
                selectFieldData.itemList
            )

            let isDisabled = true
            if (localIndexVariables._filter.listingTypeId) {
                isDisabled = false
            }

            // set disable select opts
            configItem.templateResult = highlightDisabledItem
            configItem.templateSelection = highlightDisabledItem
            
            selectFieldData.selectField.prop("disabled", isDisabled)

            break
        }
        case "GET_TYPE_LIVE": {
            selectFieldData = await checkValueInputFilter({
                filterredItem: defaultConfig._filter.liveType,
                defaultConfig,
                _permissions,
                selectField: $("#liveType"),
                configItem: {
                    data: defaultConfig._defaultSelected.liveType,
                },
                requestData: null,
                itemList: POS_STORED_LOCAL_API.SA_CHANNEL_TYPE_LIST,
                _mountedPage,
                _isClicked,
                apiName: "SA_GET_CHANNEL_TYPE",
                fieldName: " loại đăng tin",
            })

            let dataMap = []
            if (selectFieldData.itemList) {
                const liveType = selectFieldData.itemList.filter(
                    (it) => it.type == 9
                )

                if (liveType) {
                    dataMap = liveType[0].list.map((it) => {
                        return {
                            id: it.id,
                            text: it.name,
                        }
                    })
                }
            }
            configItem.data = selectFieldData.configItem.data.concat(dataMap)

            break
        }
        case "GET_CLASSIFIED": {
            selectFieldData = await checkValueInputFilter({
                filterredItem: defaultConfig._filter.scorecardType,
                defaultConfig,
                _permissions,
                selectField: $("#classified"),
                configItem: {
                    data: defaultConfig._defaultSelected.classified,
                },
                requestData: null,
                itemList: POS_STORED_LOCAL_API.CARD_LIST,
                _mountedPage,
                _isClicked,
                apiName: "GET_CLASSIFIED",
                fieldName: " phân loại listing",
            })

            configItem.data = selectFieldData.configItem.data.concat(
                selectFieldData.itemList
            )

            break
        }
        case "GET_BPO": {
            selectFieldData = await checkValueInputFilter({
                filterredItem: defaultConfig._filter.bpo,
                defaultConfig,
                _permissions,
                selectField: $("#bpo"),
                configItem: {
                    data: defaultConfig._defaultSelected.bpo,
                },
                requestData: null,
                itemList: POS_STORED_LOCAL_API.BPO_LIST,
                _mountedPage,
                _isClicked,
                apiName: "GET_BPO",
                fieldName: " BPO",
            })

            configItem.data = selectFieldData.configItem.data.concat(
                selectFieldData.itemList
            )

            break
        }
    }

    if (selectFieldData.selectField) {
        if (!selectFieldData.filterredItem) {
            selectFieldData.selectField.html("").select2(configItem)
        } else {
            selectFieldData.selectField
                .val(selectFieldData.selectedItem)
                .select2(configItem)
        }
    }

    return selectFieldData
}

function bindEventByPermission(defaultConfig, _permissions) {
    // include load event for filter
    bindEventForFilter(
        ".zoneBlock",
        "#zoneField",
        "GET_ZONES",
        defaultConfig,
        _permissions
    )
    bindEventForFilter(
        ".teamBlock",
        "#teamField",
        "GET_TEAMS",
        defaultConfig,
        _permissions
    )
    bindEventForFilter(
        ".memberBlock",
        "#memberField",
        "GET_MEMBERS",
        defaultConfig,
        _permissions
    )
    bindEventForFilter(
        ".liveTypeBlock",
        "#liveType",
        "GET_TYPE_LIVE",
        defaultConfig,
        _permissions
    )
    bindEventForFilter(
        ".districtBlock",
        "#districtId",
        "GET_DISTRICTS",
        defaultConfig,
        _permissions
    )
    bindEventForFilter(
        ".wardBlock",
        "#wardId",
        "GET_WARDS",
        defaultConfig,
        _permissions
    )
    bindEventForFilter(
        ".departmentBlock",
        "#departmentField",
        "GET_DEPARTMENTS",
        defaultConfig,
        _permissions
    )
    bindEventForFilter(
        ".sourceBlock",
        "#sourceId",
        "GET_SOURCE",
        defaultConfig,
        _permissions
    )
    bindEventForFilter(
        ".infoChannelBlock",
        "#infoChannel",
        "GET_INFO_CHANNEL",
        defaultConfig,
        _permissions
    )
    bindEventForFilter(
        ".listingTypeBlock",
        "#listingTypeId",
        "GET_LISTING_TYPES",
        defaultConfig,
        _permissions
    )
    bindEventForFilter(
        ".classifiedBlock",
        "#classified",
        "GET_CLASSIFIED",
        defaultConfig,
        _permissions
    )
    bindEventForFilter(
        ".bpoBlock",
        "#bpo",
        "GET_BPO",
        defaultConfig,
        _permissions
    )

    $(document).on("change", "#zoneField", function (e) {
        let data = null
        // check select data has value
        if (isVal($(this).select2("data")[0].id)) {
            data = [$(this).select2("data")[0].id]
        }
        defaultConfig._filter.zoneField = data

        // reset affected store
        defaultConfig._filter.memberField = null
        defaultConfig._filter.teamField = null
        defaultConfig._filter.districtId = null
        defaultConfig._filter.wardId = null
        // reset data for UI
        $('#districtId').val(null).trigger('change');
        $('#wardId').val(null).trigger('change');
        $('#teamField').val(null).trigger('change');
        $('#memberField').val(null).trigger('change');

        // reset dependant lists
        POS_STORED_LOCAL_API.TEAM_LIST = null
        POS_STORED_LOCAL_API.MEMBER_LIST = null
        POS_STORED_LOCAL_API.WARD_LIST = null

        getInputFilters("GET_TEAMS", defaultConfig, _permissions, false, true)
        getInputFilters("GET_MEMBERS", defaultConfig, _permissions, false, true)
    })
    $(document).on("change", "#teamField", function (e) {
        let data = null
        // check select data has value
        if (isVal($(this).select2("data")[0].id)) {
            data = [$(this).select2("data")[0].id]
        }
        defaultConfig._filter.teamField = data

        // reset affected store
        defaultConfig._filter.memberField = null
        $('#memberField').val(null).trigger('change');

        // reset dependant lists
        POS_STORED_LOCAL_API.MEMBER_LIST = null

        getInputFilters("GET_MEMBERS", defaultConfig, _permissions, false, true)
    })
    $(document).on("change", "#departmentField", function (e) {
        let data = null
        // check select data has value
        if (isVal($(this).select2("data")[0].id)) {
            data = [$(this).select2("data")[0].id]
        }
        defaultConfig._filter.departmentField = data

        // reset affected store
        defaultConfig._filter.memberField = null
        $('#memberField').val(null).trigger('change');

        // reset dependant lists
        POS_STORED_LOCAL_API.MEMBER_LIST = null

        getInputFilters("GET_MEMBERS", defaultConfig, _permissions, false, true)
    })
    $(document).on("change", "#memberField", function (e) {
        let data = null
        // check select data has value
        if (isVal($(this).select2("data")[0].id)) {
            data = [$(this).select2("data")[0].id]
        }

        defaultConfig._filter.memberField = data
    })
    $(document).on("change", "#districtId", function (e) {
        let data = null
        // check select data has value
        if (isVal($(this).select2("data")[0].id)) {
            data = [$(this).select2("data")[0].id]
        }
        defaultConfig._filter.districtId = data

        // reset affected store
        defaultConfig._filter.memberField = null
        defaultConfig._filter.wardId = null
        $('#memberField').val(null).trigger('change');
        $('#wardId').val(null).trigger('change');

        // reset dependant lists
        POS_STORED_LOCAL_API.MEMBER_LIST = null
        POS_STORED_LOCAL_API.WARD_LIST = null

        getInputFilters("GET_WARDS", defaultConfig, _permissions, false, true)
        getInputFilters("GET_MEMBERS", defaultConfig, _permissions, false, true)
    })
    $(document).on("change", "#wardId", function (e) {
        let data = null
        // check select data has value
        if (isVal($(this).select2("data")[0].id)) {
            data = [$(this).select2("data")[0].id]
        }
        defaultConfig._filter.wardId = data

        // reset affected store
        defaultConfig._filter.memberField = null
        $('#memberField').val(null).trigger('change');

        // reset dependant lists
        POS_STORED_LOCAL_API.MEMBER_LIST = null

        getInputFilters("GET_MEMBERS", defaultConfig, _permissions, false, true)
    })
}

function bindEventForFilter(
    parentBlockEle,
    parentFieldEle,
    apiName,
    defaultConfig,
    permissions
) {
    generateLoadingElement($(parentBlockEle))
    $(`${parentBlockEle} .overlay-filter`).click(async () => {
        const overlayFilter = $(`${parentBlockEle} .overlay-filter`)

        overlayFilter.addClass("show")
        const resp = await getInputFilters(
            apiName,
            defaultConfig,
            permissions,
            false,
            true
        )
        overlayFilter.removeClass("show")

        // remove overlay if load data successfully
        if (resp.itemList) {
            overlayFilter.remove()
        }

        // open select2
        $(parentFieldEle).select2("open")
    })
}
// end for filter block

const convertToStringFromArray = (data) => {
    if (data) {
        data = data.join(",")
    }

    return data
}

// Returns an array of maxLength (or less) page numbers
// where a 0 in the returned array denotes a gap in the series.
// Parameters:
//   totalPages:     total number of pages
//   page:           current page
//   maxLength:      maximum size of returned array
function getPageList(totalPages, page, maxLength) {
    if (maxLength < 5) throw "maxLength must be at least 5"

    function range(start, end) {
        return Array.from(Array(end - start + 1), (_, i) => i + start)
    }

    var sideWidth = maxLength < 9 ? 1 : 2
    var leftWidth = (maxLength - sideWidth * 2 - 3) >> 1
    var rightWidth = (maxLength - sideWidth * 2 - 2) >> 1
    if (totalPages <= maxLength) {
        // no breaks in list
        return range(1, totalPages)
    }
    if (page <= maxLength - sideWidth - 1 - rightWidth) {
        // no break on left of page
        return range(1, maxLength - sideWidth - 1).concat(
            0,
            range(totalPages - sideWidth + 1, totalPages)
        )
    }
    if (page >= totalPages - sideWidth - 1 - rightWidth) {
        // no break on right of page
        return range(1, sideWidth).concat(
            0,
            range(
                totalPages - sideWidth - 1 - rightWidth - leftWidth,
                totalPages
            )
        )
    }
    // Breaks on both sides
    return range(1, sideWidth).concat(
        0,
        range(page - leftWidth, page + rightWidth),
        0,
        range(totalPages - sideWidth + 1, totalPages)
    )
}

// Number of items and limits the number of items per page
// var numberOfItems = $("#jar .content").length;
// var LIMIT_PER_PAGE = 2;
// Total pages rounded upwards
// var totalPages = Math.ceil(numberOfItems / LIMIT_PER_PAGE);
// Number of buttons at the top, not counting prev/next,
// but including the dotted buttons.
// Must be at least 5:
function showPage(currentPage = 1, numberOfItems = 0) {
    const totalPages = Math.ceil(numberOfItems / LIMIT_PER_PAGE)
    if (currentPage < 1 || totalPages === 0) {
        $(".paging-container").hide()

        return false
    }

    let start = 1
    if (currentPage > 1) {
        start += currentPage * LIMIT_PER_PAGE - LIMIT_PER_PAGE
    }

    // config pagination
    $(".paging-container .paging-info").text(
        `Đang xem ${start} đến ${
            currentPage * LIMIT_PER_PAGE
        } trong tổng số ${numberOfItems} mục`
    )
    $(".pagination-custom").append(
        $("<li class='page-item'>")
            .addClass("page-item")
            .attr({ id: "previous-page" })
            .append(
                $("<a>")
                    .addClass("page-link")
                    .attr({
                        href: "javascript:void(0)",
                    })
                    .text(TXT_PAGE_PREV)
            ),
        $("<li class='page-item'>")
            .addClass("page-item")
            .attr({ id: "next-page" })
            .append(
                $("<a>")
                    .addClass("page-link")
                    .attr({
                        href: "javascript:void(0)",
                    })
                    .text(TXT_PAGE_NEXT)
            )
    )

    // Replace the navigation items (not prev/next):
    $(".pagination-custom li").slice(1, -1).remove()
    getPageList(totalPages, currentPage, PAGINATION_SIZE).forEach((item) => {
        $("<li>")
            .addClass("page-item")
            .addClass(item ? "current-page" : "disabled")
            .toggleClass("active", item === currentPage)
            .append(
                $("<a>")
                    .addClass("page-link")
                    .attr({
                        href: "javascript:void(0)",
                    })
                    .text(item || "...")
            )
            .insertBefore("#next-page")
    })

    // Disable prev/next when at first/last page:
    $("#previous-page").toggleClass("disabled", currentPage === 1)
    $("#next-page").toggleClass("disabled", currentPage === totalPages)

    $(".paging-container").show()
    return true
}

const highlightDisabledItem = (item) => {
    // Found a note in the Select2 formums on how to get the item to be selected

    if (!item.id) { return item.text }

    let $item = item.text
    if (item.isHighlight) {
        $item = $('<span style="color: #ccc">' + item.text + '</span>')
    }

    return $item
}
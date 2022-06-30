const OPTION_CITY_HCM = 1
const URL_GET_DISTRICTS_BY_CITY = "/common/get-districts/"
const URL_GET_WARDS_BY_DISTRICT = "/common/get-wards/"
const DEFAULT_FORMAT_DATE = "DD/MM/YYYY"
const DEFAULT_FROM_DATE = moment().subtract(7, "d").startOf("day").unix() * 1000 // 7 days
const DEFAULT_TO_DATE = moment().endOf("day").unix() * 1000 // current day
//Enum Listing App Status
const LISTING_APP_STATUS = {
	NONE: 1784, // "Không có nhãn"
	BLUE: 1785, // "Nhãn DIY màu xanh"
	GRAY: 1786, // "Nhãn Propzy app màu xám"
	ORANGE: 1787 //  "Nhãn Propzy app màu cam"
}
function getInputFilters(name, defaultConfig, _permissions) {
    switch (name) {
        case "GET_ZONES": {
            let zoneIds = defaultConfig._defaultSelected.zoneIds
            const zoneField = $("#zoneField").html("").select2({
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
            const teamField = $("#teamField").html("").select2({
                data: teams,
            })

            promise = axios
                .post(POS_APIS_COMMON.get("GET_TEAMS"), {
                    action: _permissions[0].actionCode,
                    entity: _permissions[0].entityCode,
                    permissionId:
                        _permissions[_permissions.length - 1].permissionId,
                    zoneIds: defaultConfig._dataPost.zoneField,
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
            const departmentField = $("#departmentField").html("").select2({
                data: departments,
            })

            promise = axios
                .post(POS_APIS_COMMON.get("GET_DEPARTMENTS"), {
                    action: _permissions[0].actionCode,
                    entity: _permissions[0].entityCode,
                    permissionId:
                        _permissions[_permissions.length - 1].permissionId,
                    zoneIds: defaultConfig._dataPost.zoneField,
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
            const member = $("#memberField").html("").select2({
                data: memberField,
            })

            promise = axios
                .post(POS_APIS_COMMON.get("GET_MEMBER_LIST"), {
                    action: _permissions[0].actionCode,
                    entity: _permissions[0].entityCode,
                    permissionId:
                        _permissions[_permissions.length - 1].permissionId,
                    zoneIds: defaultConfig._dataPost.zoneField,
                    teamIds: defaultConfig._dataPost.teamField,
                    districtIds: defaultConfig._dataPost.districtId,
                    wardIds: defaultConfig._dataPost.wardId,
                    departmentIds: defaultConfig._dataPost.departmentField,
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
            const districtField = $("#districtId").html("").select2({
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
            const wardField = $("#wardId").html("").select2({
                data: wards,
            })
            let districtId = defaultConfig._dataPost.districtId
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

function bindEventByPermission(defaultConfig, _permissions) {
    $(document).on("change", "#zoneField", function (e) {
        let data = null
        // check select data has value
        if (isVal($(this).select2("data")[0].id)) {
            data = [$(this).select2("data")[0].id]
        }

        defaultConfig._dataPost.zoneField = data
        // reset affected store
        defaultConfig._dataPost.memberField = null
        defaultConfig._dataPost.teamField = null
        defaultConfig._dataPost.districtId = null
        defaultConfig._dataPost.wardId = null

        getInputFilters("GET_MEMBERS", defaultConfig, _permissions)
        getInputFilters("GET_TEAMS", defaultConfig, _permissions)
        getInputFilters("GET_DISTRICT", defaultConfig, _permissions)
        getInputFilters("GET_WARDS", defaultConfig, _permissions)
    })
    $(document).on("change", "#teamField", function (e) {
        let data = null
        // check select data has value
        if (isVal($(this).select2("data")[0].id)) {
            data = [$(this).select2("data")[0].id]
        }

        defaultConfig._dataPost.teamField = data
        // reset affected store
        defaultConfig._dataPost.memberField = null
        defaultConfig._dataPost.districtId = null
        defaultConfig._dataPost.wardId = null

        getInputFilters("GET_MEMBERS", defaultConfig, _permissions)
        getInputFilters("GET_DISTRICT", defaultConfig, _permissions)
        getInputFilters("GET_WARDS", defaultConfig, _permissions)
    })
    $(document).on("change", "#departmentField", function (e) {
        let data = null
        // check select data has value
        if (isVal($(this).select2("data")[0].id)) {
            data = [$(this).select2("data")[0].id]
        }

        defaultConfig._dataPost.departmentField = data
        // reset affected store
        defaultConfig._dataPost.memberField = null

        getInputFilters("GET_MEMBERS", defaultConfig, _permissions)
    })
    $(document).on("change", "#memberField", function (e) {
        let data = null
        // check select data has value
        if (isVal($(this).select2("data")[0].id)) {
            data = [$(this).select2("data")[0].id]
        }

        defaultConfig._dataPost.memberField = data
    })
    $(document).on("change", "#districtId", function (e) {
        let data = null
        // check select data has value
        if (isVal($(this).select2("data")[0].id)) {
            data = [$(this).select2("data")[0].id]
        }

        defaultConfig._dataPost.districtId = data
        // reset affected store
        defaultConfig._dataPost.wardId = null
        defaultConfig._dataPost.memberField = null

        getInputFilters("GET_WARDS", defaultConfig, _permissions)
        getInputFilters("GET_MEMBERS", defaultConfig, _permissions)
    })
    $(document).on("change", "#wardId", function (e) {
        let data = null
        // check select data has value
        if (isVal($(this).select2("data")[0].id)) {
            data = [$(this).select2("data")[0].id]
        }

        defaultConfig._dataPost.wardId = data
        // reset affected store
        defaultConfig._dataPost.memberField = null

        getInputFilters("GET_MEMBERS", defaultConfig, _permissions)
    })
}

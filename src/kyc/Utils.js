export const _TABLE_COLUMNS = [
    {
        data: "",
        name: "Chọn",
        render($data, $type, $object, $position) {
            let clsDisabled = ""
            let isDisabled = ""
            if ($object.isDisabled) {
                clsDisabled = "is-disabled"
                isDisabled = "disabled"
            }
            return `<label key="lbl-check-${$position.row}" class="lbl-check ${clsDisabled}">
                    <input type="checkbox" name="chkChecking" class="chkChecking" 
                        ${isDisabled} 
                        value="${$object.dealIds && $object.dealIds.length > 0 ? $object.dealIds.toString() : null}" data-is-group="${$object.isGroup || false}" data-lead-id="${$object.parentLeadId || 0}"/>
                    <span class="checkmark"></span>
                </label>`
        },
    },
    {
        data: "customerName",
        name: "Tên khách hàng",
    },
    {
        data: "listingTypeName",
        name: "Nhu cầu",
    },
    {
        data: "needInfo",
        name: "Thông tin nhu cầu",
        render($data, $type, $object, $position) {
            let displayNeedInfo = ""
            if ($data && $data.length > 0) {
                $data.map((data) => {
                    displayNeedInfo += `${data.key}: ${data.value}<br>`
                })
            }

            return displayNeedInfo
        },
    },
    {
        data: "parentLeadId",
        name: "Lead ID",
    },
    {
        data: "dealIds",
        name: "Deal ID",
        render($data, $type, $object, $position) {
            if ($data) {
                return $data.join("<br>")
            }

            return ""
        },
    },
    {
        data: "leadDealStatusName",
        name: "Trạng thái lead/deal",
        render($data, $type, $object, $position) {
            if ($object.isGroup && $object.dealIds && $object.dealIds.length) {
                return $object.groupStatusName || $object.leadDealStatusName;
            }
            return $object.leadDealStatusName
        },
    },
    {
        data: "meetingDate",
        name: "Thời gian",
        render($data, $type, $object, $position) {
            if ($data) {
                return moment($data).format("HH:mm - DD/MM/YYYY")
            }
            return ""
        },
    },
    {
        data: "tmName",
        name: "TM",
    },
    {
        data: "baNames",
        name: "BA",
        render($data, $type, $object, $position) {
            if ($data) {
                return $data.join("<br>")
            }

            return ""
        },
    },
    {
        data: "scoreCardType",
        name: "Nhãn",
        render($data, $type, $object, $position) {
            if ($data) {
                if (
                    $object.scoreCardType == "H1" ||
                    $object.scoreCardType == "H2"
                ) {
                    return `<span class="label label-success">${$data}</span>`
                } else if (
                    $object.scoreCardType == "M1" ||
                    $object.scoreCardType == "M2"
                ) {
                    return `<span class="label label-warning">${$data}</span>`
                } else if (
                    $object.scoreCardType == "L1" ||
                    $object.scoreCardType == "L0"
                ) {
                    return `<span class="label label-danger">${$data}</span>`
                } else if ($object.scoreCardType == 1655) {
                    return `<span class="label label-default">${$data}</span>`
                }
            }
            return ""
        },
    },
    {
        data: null,
        name: "Hành động",
        render($data, $type, obj, $position) {
            if ($data.canReOpen) {
                return `<span class="label label-success reopen-deal">Kích hoạt</span>`
            }

            return ""
        },
    },
]

export const _DATA_CHECKING_CUSTOMERS = [
    {
        customerId: "KM57923",
        customerName: "Thúy Vân",
        listingTypeId: 1,
        listingTypeName: "Mua",
        needInfo: [
            {
                key: "Loại BĐS",
                value: "nhà riêng",
            },
            {
                key: "Nguồn",
                value: "Call",
            },
            {
                key: "Ngân sách",
                value: "1 tỷ - 4 tỷ",
            },
            {
                key: "Diện tích",
                value: "25m2 - 100m2",
            },
            {
                key: "Tỉnh",
                value: "TP HCM",
            },
            {
                key: "Quận",
                value: "1, 3, 12",
            },
            {
                key: "Hướng",
                value: "Đông Nam",
            },
        ],
        leadId: 138884,
        dealIds: ["69416", "69417", "69418", "69419"],
        status: "N/A",
        meetingDate: null,
        leadAssignedTo: 926,
        tmName: "tmselfgen",
        dealAssignedTos: ["166", "553", "556", "568"],
        baNames: ["phuongho", "savuphan", "saloandang", "thangnguyensa"],
        scoreCardType: "L0",
        numberOfTours: 0,
        canReOpen: false,
        groupStatus: false,
        notYetRequest: false,
        isDisabled: true,
        isGroup: true,
        dealCreatedDate: 969677400000,
    },
    {
        customerId: "KM57923",
        customerName: "Thúy Vân",
        listingTypeId: 1,
        listingTypeName: "Mua",
        needInfo: [
            {
                key: "Loại BĐS",
                value: "nhà riêng",
            },
            {
                key: "Nguồn",
                value: "Call",
            },
            {
                key: "Ngân sách",
                value: "1 tỷ - 4 tỷ",
            },
            {
                key: "Diện tích",
                value: "25m2 - 100m2",
            },
            {
                key: "Tỉnh",
                value: "TP HCM",
            },
            {
                key: "Quận",
                value: "1, 3, 12",
            },
            {
                key: "Hướng",
                value: "Đông Nam",
            },
        ],
        leadId: 136696,
        dealIds: ["68933", "69404", "69405"],
        status: "N/A",
        meetingDate: null,
        leadAssignedTo: 926,
        tmName: "tmselfgen",
        dealAssignedTos: ["520", "126", "131"],
        baNames: ["phungnguyen", "trivo", "phongle"],
        scoreCardType: "L0",
        numberOfTours: 0,
        canReOpen: false,
        groupStatus: false,
        notYetRequest: false,
        isDisabled: true,
        isGroup: false,
        dealCreatedDate: 969677600000,
    },
    {
        customerId: "KM57923",
        customerName: "Thúy Vân",
        listingTypeId: 1,
        listingTypeName: "Mua",
        needInfo: [
            {
                key: "Loại BĐS",
                value: "nhà riêng",
            },
            {
                key: "Nguồn",
                value: "Call",
            },
            {
                key: "Ngân sách",
                value: "1 tỷ - 4 tỷ",
            },
            {
                key: "Diện tích",
                value: "25m2 - 100m2",
            },
            {
                key: "Tỉnh",
                value: "TP HCM",
            },
            {
                key: "Quận",
                value: "1, 3, 12",
            },
            {
                key: "Hướng",
                value: "Đông Nam",
            },
        ],
        leadId: 136695,
        dealIds: ["68932"],
        status: "N/A",
        meetingDate: null,
        leadAssignedTo: 926,
        tmName: "tmselfgen",
        dealAssignedTos: ["309"],
        baNames: ["hainam"],
        scoreCardType: "L0",
        numberOfTours: 1,
        canReOpen: true,
        groupStatus: false,
        notYetRequest: false,
        isDisabled: false,
        isGroup: false,
        dealCreatedDate: 969677200000,
    },
    {
        customerId: "KM57923",
        customerName: "Thúy Vân",
        listingTypeId: 1,
        listingTypeName: "Mua",
        needInfo: [
            {
                key: "Loại BĐS",
                value: "nhà riêng",
            },
            {
                key: "Nguồn",
                value: "Call",
            },
            {
                key: "Ngân sách",
                value: "1 tỷ - 4 tỷ",
            },
            {
                key: "Diện tích",
                value: "25m2 - 100m2",
            },
            {
                key: "Tỉnh",
                value: "TP HCM",
            },
            {
                key: "Quận",
                value: "1, 3, 12",
            },
            {
                key: "Hướng",
                value: "Đông Nam",
            },
        ],
        leadId: 136693,
        dealIds: ["68930"],
        status: "N/A",
        meetingDate: null,
        leadAssignedTo: 926,
        tmName: "tmselfgen",
        dealAssignedTos: ["123"],
        baNames: ["nhungtran"],
        scoreCardType: "L0",
        numberOfTours: 2,
        canReOpen: false,
        groupStatus: false,
        notYetRequest: false,
        isDisabled: false,
        isGroup: false,
        dealCreatedDate: 969677300000,
    },
    {
        customerId: "KM57923",
        customerName: "Thúy Vân",
        listingTypeId: 1,
        listingTypeName: "Mua",
        needInfo: [
            {
                key: "Loại BĐS",
                value: "nhà riêng",
            },
            {
                key: "Nguồn",
                value: "Call",
            },
            {
                key: "Ngân sách",
                value: "1 tỷ - 4 tỷ",
            },
            {
                key: "Diện tích",
                value: "25m2 - 100m2",
            },
            {
                key: "Tỉnh",
                value: "TP HCM",
            },
            {
                key: "Quận",
                value: "1, 3, 12",
            },
            {
                key: "Hướng",
                value: "Đông Nam",
            },
        ],
        leadId: 138881,
        dealIds: [],
        status: "N/A",
        meetingDate: null,
        leadAssignedTo: 926,
        tmName: "tmselfgen",
        dealAssignedTos: null,
        baNames: null,
        scoreCardType: "L0",
        numberOfTours: 0,
        canReOpen: false,
        groupStatus: false,
        notYetRequest: false,
        isDisabled: false,
        isGroup: false,
        dealCreatedDate: 96967720000,
    },
    {
        customerId: "KM57923",
        customerName: "Thúy Vân",
        listingTypeId: 1,
        listingTypeName: "Mua",
        needInfo: [
            {
                key: "Loại BĐS",
                value: "nhà riêng",
            },
            {
                key: "Nguồn",
                value: "Call",
            },
            {
                key: "Ngân sách",
                value: "1 tỷ - 4 tỷ",
            },
            {
                key: "Diện tích",
                value: "25m2 - 100m2",
            },
            {
                key: "Tỉnh",
                value: "TP HCM",
            },
            {
                key: "Quận",
                value: "1, 3, 12",
            },
            {
                key: "Hướng",
                value: "Đông Nam",
            },
        ],
        leadId: 138882,
        dealIds: [],
        status: "N/A",
        meetingDate: null,
        leadAssignedTo: 926,
        tmName: "tmselfgen",
        dealAssignedTos: ["309"],
        baNames: null,
        scoreCardType: "L0",
        numberOfTours: 0,
        canReOpen: false,
        groupStatus: false,
        notYetRequest: false,
        isDisabled: false,
        isGroup: false,
        dealCreatedDate: 969677800000,
    },
]

export const sortItem = (a, b) => {
    if (a.dealCreatedDate < b.dealCreatedDate) {
        // desc
        return 1
    } else if (a.dealCreatedDate > b.dealCreatedDate) {
        // asc
        return -1
    }

    // as the same
    return 0
}

export const sortListLeadDealByLoggedUser = (data) => {
    let loggedInUserIsInAssignTo = []
    let loggedInUserIsNotInAssignTo = []

    // check list assignTo existing loggedIn user
    data.map((item) => {
        const listAssignedTosA =
            (item.dealAssignedTos && item.dealAssignedTos.join()) || ""

        // get list logged user is existing in assignTo list
        if (listAssignedTosA.indexOf(currentUser.userId.toString()) > -1) {
            loggedInUserIsInAssignTo.push(item)
        } else {
            // get list not existing logged user in assignTo list
            loggedInUserIsNotInAssignTo.push(item)
        }
    })
    loggedInUserIsInAssignTo.sort(sortItem)
    loggedInUserIsNotInAssignTo.sort(sortItem)

    return loggedInUserIsInAssignTo.concat(loggedInUserIsNotInAssignTo)
}

export const objectsEqual = (o1, o2) =>
    typeof o1 === "object" &&
        typeof o2 === "object" &&
        Object.keys(o1) &&
        Object.keys(o2) &&
        Object.keys(o1).length > 0
        ? Object.keys(o1).length === Object.keys(o2).length &&
        Object.keys(o1).every((p) => objectsEqual(o1[p], o2[p]))
        : o1 === o2

export const arraysEqual = (a1, a2) => {
    if (a1.length !== a2.length) {
        return false
    }

    return a1.every((o, idx) => objectsEqual(o, a2[idx]))
}

export const isEqual = (value, other) => {
    if (JSON.stringify(value) == JSON.stringify(other)) {
        return true
    }

    return false
}

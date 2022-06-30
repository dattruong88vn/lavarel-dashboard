var POS_APIS_AGENTS = new Map()
var POS_APIS_PRESCREEN = new Map()
var POS_APIS_SA = new Map()
var POS_APIS_CRAWLER = new Map()
var POS_APIS_COMMON = new Map()
var POS_APIS_TRAINING = new Map()
var PROJECT_API = new Map()

/**
 * define api for all pos
 * */

POS_APIS_COMMON.set("UPLOAD_PHOTO", baseUploadApiPublic + "upload")
POS_APIS_COMMON.set("GET_ZONES", "/common/get-zones")
POS_APIS_COMMON.set("GET_TEAMS", "/common/get-teams")
POS_APIS_COMMON.set("GET_DEPARTMENTS", "/common/get-departments")
POS_APIS_COMMON.set(
    "GET_DISTRICTS_BY_PERMISSION",
    "/common/get-districts-by-permission"
)
POS_APIS_COMMON.set(
    "GET_WARDS_BY_PERMISSION",
    "/common/get-wards-by-permission"
)
POS_APIS_COMMON.set("GET_MEMBER_LIST", "/common/get-members")
POS_APIS_COMMON.set("GET_DISTRICTS_BY_CITY", "/zone/get-district-list-by-city")
POS_APIS_COMMON.set("GET_DISTRICTS_BY_USER", "/zone/get-district-by-user")
POS_APIS_COMMON.set("GET_WARDS", "/zone/get-wards")
POS_APIS_COMMON.set("GET_STREETS", "/zone/get-streets")
POS_APIS_COMMON.set("GET_LISTING_TYPES", "/lso/get-property-types")
POS_APIS_COMMON.set("GET_REAL_ESTATE_GROUP", "/common/real-estate-group")
POS_APIS_COMMON.set("GET_PROPERTY_TYPES", "/lso/get-property-type-list")
POS_APIS_COMMON.set("GET_PROPERTY_TYPES_V2", "/lso/get-property-type-list-v2")
POS_APIS_COMMON.set("GET_PROPERTY_LIST_PREFIX", "/lso/get-property-type-list-prefix")
POS_APIS_COMMON.set(
    "GET_BUILDING_BY_DISTRICT",
    "/pos/commonPos/get-building-list-by-district-id"
)
POS_APIS_COMMON.set(
    "GET_BLOCKS_BY_BUILDING",
    "/pos/commonPos/get-blocks-by-building"
)
POS_APIS_COMMON.set("CHECK_EXIST_OWNER", "/pos/commonPos/check-exists-owner")
POS_APIS_COMMON.set(
    "CHECK_DUPLICATED_ADDRESS",
    "/pos/commonPos/check-duplicated-address"
)
POS_APIS_COMMON.set(
    "GET_DEPARTMENT_USER_LIST",
    "/pos/CommonPos/loadDepartmentUserList"
)
POS_APIS_COMMON.set(
    "GET_LIVE_LISTING_BY_PHONE",
    "/pos/phones/getLiveListingByPhone"
)
POS_APIS_COMMON.set("WRITE_TRACK_CALL", "/pos/phones/trackCall")
POS_APIS_COMMON.set("UPDATE_PHONE_NUMBER", "/pos/phones/change-phone")
POS_APIS_COMMON.set("MERGE_LISTING_OF_OWNER", "/pos/phones/merge-listing")
POS_APIS_COMMON.set(
    "CANCEL_LISTING_BY_CHANG_PHONE",
    "/pos/phones/cancel-listing"
)
POS_APIS_COMMON.set("GET_SOURCE_CHILD", "/pos/CommonPos/getSourceChild")
POS_APIS_COMMON.set(
    "GET_CONVERT_COORDINATE",
    "/pos/Utilities/convert-coordinate"
)
POS_APIS_COMMON.set(
    "GET_INFORMATION_CHANNEL",
    "/pos/CommonPos/get-information-channel"
)
POS_APIS_COMMON.set(
    "GET_INFORMATION_CHANNEL_CHILD",
    "/pos/CommonPos/get-information-channel-child"
)
POS_APIS_COMMON.set("GET_PROJECT_LIST", "/get-project-list")
POS_APIS_COMMON.set("GET_CHANNEL_TYPES", "/pos/commonPos/channel-Types")
POS_APIS_COMMON.set("GET_CLASSIFIED", "/pos/SaApi/get-list-card")
POS_APIS_COMMON.set("GET_BPO", "/pos/SaApi/get-list-bpo")

//
POS_APIS_COMMON.set("GET_BANK_LIST", "/bank/get-bank-list")
POS_APIS_COMMON.set("NEW_BANK", "/bank/save")

POS_APIS_AGENTS.set("AGENT_SEND_APP", "/pos/agent/send-app")
POS_APIS_AGENTS.set("GET_EDIT_OWNER_LIST", "/pos/agent/edit-owner-list")
POS_APIS_AGENTS.set("POST_EDIT_OWNER_RESOLVE", "/pos/agent/edit-owner-resolve")

/**
 * define api for all crawler
 * */
POS_APIS_CRAWLER.set("GET_CRAWLER_STATUS", "/pos/crawler/get-status-list")
POS_APIS_CRAWLER.set("GET_CRAWLER_INSERT", "/pos/crawler/insert-crawler")
POS_APIS_CRAWLER.set(
    "GET_CRAWLER_TOOL_LIST",
    "/pos/crawler-list-2/get-list-crawler"
)
POS_APIS_CRAWLER.set(
    "GET_CRAWLER_TOOL_UPDATE_STATUS_SEND",
    "/pos/crawler-list-2/update-status-send"
)
POS_APIS_CRAWLER.set(
    "GET_CRAWLER_TOOL_CREATE_LISTING",
    "/pos/crawler-list-2/transferCrawler"
)
POS_APIS_CRAWLER.set(
    "GET_CRAWLER_TOOL_CANCEL_LISTING",
    "/pos/crawler-list-2/cancelCrawler"
)
POS_APIS_CRAWLER.set(
    "GET_CRAWLER_TOOL_CHECK_EMAIL_PHONE",
    "/pos/crawler-list-2/check-duplicate"
)
POS_APIS_CRAWLER.set(
    "GET_CRAWLER_TOOL_CHECK_ADDRESS",
    "/pos/crawler-list-2/check-address-duplicate"
)

/**
 * define api for all prescreen
 * */
POS_APIS_PRESCREEN.set("GET_CHANNEL_STATUS", "/pos/prescreener/channel-status")
POS_APIS_PRESCREEN.set("GET_CHANNEL_TYPES", "/pos/prescreener/channel-types")
POS_APIS_PRESCREEN.set("UPDATE_LISTING", "/pos/prescreener/updateListing")
POS_APIS_PRESCREEN.set("INSERT_LISTING", "/pos/prescreener/insertListing")
POS_APIS_PRESCREEN.set("SEND_TO_SA", "/pos/prescreener/sendSA")
POS_APIS_PRESCREEN.set("SEND_DIY", "/pos/prescreener/sendDiy") // /{id} | GET
POS_APIS_PRESCREEN.set(
    "SEARCH_PHONE_HIGHLIGHT",
    "/pos/CommonPos/loadDepartmentUserList"
)
POS_APIS_PRESCREEN.set("GET_OVERVIEW_INDEX", "/pos/prescreener/overview")
POS_APIS_PRESCREEN.set(
    "GET_LISTING_LIST_INDEX",
    "/pos/prescreener/getListingList"
)
POS_APIS_PRESCREEN.set(
    "GET_LISTING_LIST_DIY_INDEX",
    "/pos/prescreener/getUpdateDiyList"
)

POS_APIS_PRESCREEN.set("CHANGE_PHONE", "/pos/prescreener/change-phone")
POS_APIS_PRESCREEN.set("DELETE_SUB_PHONE", "/pos/prescreener/delete-sub-phone")

POS_APIS_PRESCREEN.set("GET_ZONE_LIST", "/pos/prescreener/getZone")
POS_APIS_PRESCREEN.set("GET_TEAM_LIST", "/pos/prescreener/getTeam")
POS_APIS_PRESCREEN.set("GET_DEPARTMENT_LIST", "/pos/prescreener/getDepartment")
POS_APIS_PRESCREEN.set("GET_MEMBER_LIST", "/pos/prescreener/getMember")

/**
 * define api for all sa
 * */

POS_APIS_SA.set(
    "GET_DEPOSIT_REJECT_REASON",
    "/pos/SaApi/getDepositRejectReason"
)
POS_APIS_SA.set("GET_DEPOSIT_TASK_SUPPORT", "/pos/SaApi/getDepositTaskSupport")
POS_APIS_SA.set("GET_DEPOSIT_TASK_CANCEL", "/pos/SaApi/getDepositTaskCancel")
POS_APIS_SA.set(
    "SET_DEPOSIT_TASK_SUPPORT",
    "/pos/SaApi/setDepositTaskSupportDone"
)
POS_APIS_SA.set("GET_COUNT_TASKS", "/pos/SaApi/countTasks")
POS_APIS_SA.set("CHANGE_PHONE", "/pos/SaApi/change-phone")
POS_APIS_SA.set("DELETE_SUB_PHONE", "/pos/SaApi/delete-sub-phone")
POS_APIS_SA.set("GET_TRANSACTION_CENTER", "/pos/SaApi/get-transaction-center")
POS_APIS_SA.set("GET_NEGOTIATION_LATEST", "/pos/SaApi/get-negotiation-latest")
POS_APIS_SA.set("GET_DEAL_STATUS", "/pos/SaApi/getDealStatusList")
POS_APIS_SA.set("GET_LISTING_LIST_INDEX", "/pos/SaApi/searchList")
POS_APIS_SA.set("UPDATE_GUARANTEED", "/pos/SaApi/updateGuaranteedListing")
POS_APIS_SA.set("GET_OVERVIEW_LIST_INDEX", "/pos/SaApi/loadListingOverview")
POS_APIS_SA.set("GET_HIGHLIGHT_LIST_INDEX", "/pos/SaApi/checkHighlight")
POS_APIS_SA.set(
    "GET_COLLECTION_TOUR_INDEX",
    "/pos/SaApi/countCollectionAndTour"
)
POS_APIS_SA.set("GET_LIST_DEAL_BY_ID", "/pos/SaApi/getDealTotalList")
POS_APIS_SA.set("GET_LIST_TOUR_BY_ID", "/pos/SaApi/getTourTotalList")
POS_APIS_SA.set(
    "UPDATE_GUARANTEED_LISTING_INDEX",
    "/pos/SaApi/updateGuaranteedListing"
)
POS_APIS_SA.set("GET_CHANNEL_TYPE", "/pos/SaApi/get-channel-type-list")
POS_APIS_SA.set("UPDATE_REQUEST_INFO_IMAGE", "/pos/SaApi/update-Info-Image")
POS_APIS_SA.set("GET_APPRAISAL_INFO", "/pos/SaApi/get-appraisal-info")
POS_APIS_SA.set("UPDATE_APPRAISAL_INFO", "/pos/SaApi/update-appraisal-info")

POS_APIS_TRAINING.set("GET_COURSE", "/pos/training/get-training-short-list")
POS_APIS_TRAINING.set("GET_COURSE_DETAIL", "/pos/training/get-detail") //COURSE ID
POS_APIS_TRAINING.set("UPDATE_STATUS_MEMBER", "/pos/members/change-status")
POS_APIS_TRAINING.set("GET_STATUS_MEMBER", "/pos/members/get-status-member")
POS_APIS_TRAINING.set("GET_REASON", "/pos/members/get-reason")
POS_APIS_TRAINING.set("GET_TRAINING_LIST", "/pos/training/get-training-list")
POS_APIS_TRAINING.set("UPDATE_STATUS_COURSE", "/pos/training/change-status")
POS_APIS_TRAINING.set("UPDATE_COURSE", "/pos/training/update-course")
POS_APIS_TRAINING.set("SEND_SMS_TO_MEMBER", "/pos/members/send-sms")
POS_APIS_TRAINING.set("SEND_NOTIFY_TO_MEMBER", "/pos/members/send-notify")
POS_APIS_TRAINING.set("GET_LIST_INFO", "/pos/members/get-list-info")
POS_APIS_TRAINING.set("SET_COMMISSION", "/pos/members/set-commission")
POS_APIS_TRAINING.set("SET_REQUEST_AGENT", "/pos/members/set-Requset-agent")

PROJECT_API.set("GET_LIST_BY_DISTRICT", "/get-project-list-by-district")

/**
 * define mess for Pos
 * */

const POS_MESSAGE = new Map([
    [
        "IS_CALLING",
        "Xin vui lòng tắt cuộc gọi trước khi thực hiện thao tác này",
    ],
    ["PROCESS_ERR", "Đã có lỗi xảy ra trong quá trình xử lý"],
    [
        "ERR_RESPONSE_API",
        "%s không thể thực hiện được trong lúc này!<br> vì : %s",
    ],
    ["SUCCESS_RESPONSE_API", "%s thành công!"],
    [
        "MERGE_LISTING_BY_PHONE_SUCCESS",
        "Đồng bộ tin đăng các chủ nhà thành công!",
    ],
    [
        "UPDATE_PHONE_OWNER_FAIL_BY_NOT_CHANGE",
        "Không có sự thay đổi nào. Xin vui lòng kiểm tra lại dữ liệu",
    ],
    [
        "UPDATE_PHONE_OWNER_FAIL_BY_NOT_ACCESS",
        "Không thể cập nhật số điện thoại vì không có quyền chỉnh sửa",
    ],
    [
        "MISSING_PRIMARY_PHONE_NUMBER",
        "Số điện thoại chính không tồn tại. Vui lòng kiểm tra lại dữ liệu",
    ],
    [
        "UPDATE_PHONE_OWNER_SUCCESS",
        "Đã cập nhật lại số điện thoại thành công. Trang sẽ tự động refresh sau 3s",
    ],
    [
        "CANCEL_LISTING_BY_PHONE_IS_EMPTY",
        "Không có listing nào được chọn để hủy",
    ],
    ["CANCEL_LISTING_BY_PHONE_IS_SUCCESS", "Đã gỡ tin đăng thành công"],
    [
        "CANCEL_LISTING_BY_PHONE_IS_ERROR",
        "Đã có lỗi xảy ra trong quá trình gỡ tin đăng",
    ],
    ["CANCEL_LISTING_BY_PHONE_VALID_REASON", "Bạn cần nhập lý do gỡ tin đăng"],
    [
        "UPDATE_PHONE_OWNER_FAIL_BY_OWNER_DEACTIVE",
        "Chủ nhà bạn chọn đã không còn trong hệ thống. Trang sẽ tự động refresh sau 3s",
    ],
    [
        "TRAINING_ERR_SEND_SMS_MISSING_PHONES",
        "Xin vui lòng chọn môi giới để gửi thông báo",
    ],
    [
        "TRAINING_ERR_SEND_SMS_MISSING_CONTENT",
        "Xin vui lòng nhập nội dung để gửi thông báo",
    ],
    ["TRAINING_ERR_SEND_SMS_RESPONSE", "Đã có lỗi xảy ra khi gửi SMS ! "],
    [
        "TRAINING_ERR_SEND_NOTIFY_RESPONSE",
        "Đã có lỗi xảy ra khi gửi thông báo ! ",
    ],
    ["TRAINING_SUCCESS_SEND_SMS_RESPONSE", "Đã gửi SMS thành công! "],
    ["TRAINING_SUCCESS_SEND_NOTIFY_RESPONSE", "Đã gửi thông báo thành công! "],
    [
        "TRAINING_ERR_NOT_SEEN_DETAIL",
        "Đã có lỗi xảy ra trong quá trình xử lý, Bạn không thể xem chi tiết của khóa học",
    ],
    [
        "TRAINING_ERR_UPDATE_MEMBER_AGENT",
        "Đã xảy ra lỗi do không tìm thấy khóa học, tên môi giới hoặc trạng thái cần cập nhật",
    ],
    [
        "TRAINING_ERR_UPDATE_MEMBER_STATUS_NOT_FOUND",
        "Không thể cập nhật trạng thái do trạng thái không tồn tại trong hệ thống",
    ],
    [
        "TRAINING_ERR_UPDATE_MEMBER_SCORE",
        "Điểm số không đúng định dạng (là số từ 0 -> 100)",
    ],
    ["TRAINING_ERR_UPDATE_MEMBER_REASON", "Lý do không đúng định dạng"],
    ["TRAINING_ERR_UPDATE_MEMBER_COURSE", "Bạn chưa chọn khóa học mới"],
    [
        "TRAINING_ERR_UPDATE_MEMBER_RESPONSE",
        "Đã xảy ra lỗi. Không thể cập nhật",
    ],
    ["TRAINING_SUCCESS_UPDATE_MEMBER", "Cập nhật thành công"],
    [
        "TRAINING_ERR_UPDATE_STATUS_COURSE",
        "Đã xảy ra lỗi do không tìm thấy khóa học, trạng thái cần cập nhật",
    ],
    [
        "TRAINING_ERR_UPDATE_COURSE",
        "Đã xảy ra lỗi do không tìm thấy khóa học, trạng thái cần cập nhật",
    ],
    ["TRAINING_SUCCESS_UPDATE_COURSE", "Cập nhật thành công"],
    [
        "UPDATE_REQUEST_INFO_IMAGE_NOT_CHECK",
        "Xin vui lòng chọn tiêu chí để gửi thông tin.",
    ],
    [
        "UPDATE_REQUEST_INFO_IMAGE_VALID",
        "Thiếu thông tin yêu cầu để gửi thông tin. Xin vui lòng thử lại",
    ],
    [
        "UPDATE_REQUEST_INFO_IMAGE_SUCCESS",
        "Gửi thông tin thành công. Trang sẽ tự động reload lại sau 3s!",
    ],
    [
        "TRAINING_ERR_UPDATE_COMMISSION_RESPONSE",
        "Đã có lỗi xảy ra khi cập nhật hoa hồng ! ",
    ],
    [
        "TRAINING_SUCCESS_UPDATE_COMMISSION_RESPONSE",
        "Cập nhật hoa hông thành công! ",
    ],
    [
        "TRAINING_SUCCESS_UPDATE_REQUEST_AGENT_RESPONSE",
        "Cập nhật yêu câu thành công! ",
    ],
    [
        "TRAINING_ERR_UPDATE_REQUEST_AGENT_RESPONSE",
        "Đã có lỗi xảy ra khi xác nhận yêu cầu ! ",
    ],
    ["EDIT_OWNER_RESOLVE_SUCCESS", "Cập nhật thành công"],
    ["EDIT_OWNER_RESOLVE_ERROR", "Cập nhật không thành công ! "],
    [
        "EDIT_OWNER_UPDATE_PHONE_MISSING_OWNER",
        "Đã có lỗi xảy ra do không tìm thấy chủ nhà! ",
    ],
    [
        "EDIT_OWNER_UPDATE_PHONE_MISSING_NEW_PHONE",
        "Đã có lỗi xảy ra do không tìm số điện thoại chính! ",
    ],
    [
        "EDIT_OWNER_UPDATE_PHONE_SUCCESS",
        "Cập nhật thông tin chủ nhà thành công! ",
    ],
    ["MISSING_PARAM", "%s không tìm thấy. Xin vui lòng check lại dữ liệu"],
])

const POS_STORED_LOCAL_API = {}

async function POS_PROMISISE_API(name = null, requestData = {}) {
    let resultsContent = null

    switch (name) {
        case "GET_CLASSIFIED": {
            resultsContent = await axios
                .get(POS_APIS_COMMON.get("GET_CLASSIFIED"))
                .catch((err) => {
                    showErrLog(err)
                })

            const data = resultsContent.data
            if (data.result) {
                POS_STORED_LOCAL_API.CARD_LIST = data.data[0].list.map((it) => {
                    const itemId = it.id
                    const itemName = it.name

                    return { id: itemId, text: itemName }
                })
            }

            return POS_STORED_LOCAL_API.CARD_LIST
        }
        case "GET_LISTING_TYPES": {
            resultsContent = await axios
                .get(POS_APIS_COMMON.get("GET_LISTING_TYPES"))
                .catch((err) => {
                    showErrLog(err)
                })

            if (Object.values(resultsContent.data).length > 0) {
                const keys = Object.keys(resultsContent.data)

                POS_STORED_LOCAL_API.LISTING_TYPES_LIST = keys.map((it) => {
                    const itemId = it
                    const itemName = resultsContent.data[it]

                    return { id: itemId, text: itemName }
                })
            }

            return POS_STORED_LOCAL_API.LISTING_TYPES_LIST
        }
        case "GET_PROPERTY_TYPES": {
            resultsContent = await axios
                .get(
                    POS_APIS_COMMON.get("GET_PROPERTY_TYPES") +
                        "/" +
                        requestData.listingTypeId
                )
                .catch((err) => {
                    showErrLog(err)
                })

            if (resultsContent.data) {
                POS_STORED_LOCAL_API.PROPERTY_TYPES_LIST = resultsContent.data.map(
                    (it) => {
                        const itemId = it.propertyTypeID
                        const itemName = it.typeName

                        return { id: itemId, text: itemName }
                    }
                )
            }

            return POS_STORED_LOCAL_API.PROPERTY_TYPES_LIST
        }
        case "GET_PROPERTY_LIST_PREFIX": {
            if (!requestData) {
                return [{
                    id: '',
                    text: '--Tất cả loại hình bất động sản--'
                }]
            }
            resultsContent = await axios
                .get(
                    POS_APIS_COMMON.get("GET_PROPERTY_LIST_PREFIX") +
                        "/" +
                        requestData.listingTypeId
                )
                .catch((err) => {
                    showErrLog(err)
                })

            if (resultsContent.data) {
                const response = resultsContent.data;
                const { data } = response;
                POS_STORED_LOCAL_API.PROPERTY_LIST_PREFIX = data.map(
                    (it) => {
                        return { id: it.propertyTypeId, text: it.prefixName, isHighlight: !it.active }
                    }
                )
            }

            return POS_STORED_LOCAL_API.PROPERTY_LIST_PREFIX
        };
        case "GET_DISTRICT": {
            let districts = []
            await axios
                .get(
                    POS_APIS_COMMON.get("GET_DISTRICTS_BY_CITY") +
                        "/" +
                        requestData.cityId,
                    { params: {} }
                )
                .then((response) => {
                    resultsContent = response.data
                })
                .catch((err) => {
                    showErrLog(err)
                })
            if (resultsContent) {
                if (resultsContent.result) {
                    let districtsContent = resultsContent.data.map((it) => {
                        return { id: it.districtId, text: it.districtName }
                    })
                    districts = districts.concat(districtsContent)
                }
            }
            POS_STORED_LOCAL_API.DISTRICT_LIST = districts
            break
        }
        case "GET_DISTRICTS_BY_USER": {
            resultsContent = await axios
                .get(
                    POS_APIS_COMMON.get("GET_DISTRICTS_BY_USER") +
                        "/" +
                        requestData.userId
                )
                .catch((err) => {
                    showErrLog(err)
                })

            if (resultsContent.data.result) {
                POS_STORED_LOCAL_API.DISTRICT_LIST_BY_USER = resultsContent.data.data.map(
                    (it) => {
                        return { id: it.districtId, text: it.districtName }
                    }
                )
            }

            break
        }
        case "GET_WARDS": {
            resultsContent = await axios
                .get(
                    POS_APIS_COMMON.get("GET_WARDS") +
                        "/" +
                        requestData.districtId,
                    {
                        params: {},
                    }
                )
                .catch((err) => {
                    showErrLog(err)
                })

            if (resultsContent.data.result) {
                POS_STORED_LOCAL_API.WARD_LIST = resultsContent.data.data.map(
                    (it) => {
                        return { id: it.wardId, text: it.wardName }
                    }
                )
            }

            break
        }
        case "GET_STREETS": {
            resultsContent = await axios
                .get(
                    POS_APIS_COMMON.get("GET_STREETS") +
                        "/" +
                        requestData.wardId
                )
                .catch((err) => {
                    showErrLog(err)
                })

            if (resultsContent.data.result) {
                POS_STORED_LOCAL_API.STREET_LIST = resultsContent.data.data.map(
                    (it) => {
                        return { id: it.streetId, text: it.streetName }
                    }
                )
            }

            break
        }
        case "GET_ZONES": {
            resultsContent = await axios
                .post(POS_APIS_COMMON.get("GET_ZONES"), requestData)
                .catch((err) => {
                    showErrLog(err)
                })

            if (resultsContent.data.result) {
                POS_STORED_LOCAL_API.ZONE_LIST = resultsContent.data.data.map(
                    (it) => {
                        const itemId = parseInt(it.departmentId)
                        const itemName = it.departmentName

                        return {
                            id: itemId,
                            text: itemName,
                        }
                    }
                )
            }

            return POS_STORED_LOCAL_API.ZONE_LIST
        }
        case "GET_TEAMS": {
            resultsContent = await axios
                .post(POS_APIS_COMMON.get("GET_TEAMS"), requestData)
                .catch((err) => {
                    showErrLog(err)
                })

            if (resultsContent.data.result) {
                POS_STORED_LOCAL_API.TEAM_LIST = resultsContent.data.data.map(
                    (it) => {
                        const itemId = parseInt(it.departmentId)
                        const itemName = it.departmentName

                        return {
                            id: itemId,
                            text: itemName,
                        }
                    }
                )
            }

            return POS_STORED_LOCAL_API.TEAM_LIST
        }
        case "GET_DEPARTMENTS": {
            resultsContent = await axios
                .post(POS_APIS_COMMON.get("GET_DEPARTMENTS"), requestData)
                .catch((err) => {
                    showErrLog(err)
                })

            if (resultsContent.data.result) {
                POS_STORED_LOCAL_API.DEPARTMENT_LIST = resultsContent.data.data.map(
                    (it) => {
                        const itemId = parseInt(it.departmentId)
                        const itemName = it.departmentName

                        return {
                            id: itemId,
                            text: itemName,
                        }
                    }
                )
            }

            return POS_STORED_LOCAL_API.DEPARTMENT_LIST
        }
        case "GET_MEMBERS": {
            resultsContent = await axios
                .post(POS_APIS_COMMON.get("GET_MEMBER_LIST"), requestData)
                .catch((err) => {
                    showErrLog(err)
                })

            if (resultsContent.data.result) {
                POS_STORED_LOCAL_API.MEMBER_LIST = resultsContent.data.data.map(
                    (it) => {
                        const itemId = it.userId
                        const itemName = it.name

                        return {
                            id: itemId,
                            text: itemName,
                        }
                    }
                )
            }

            return POS_STORED_LOCAL_API.MEMBER_LIST
        }
        case "GET_DISTRICTS": {
            resultsContent = await axios
                .get(URL_GET_DISTRICTS_BY_CITY + OPTION_CITY_HCM)
                .catch((err) => {
                    showErrLog(err)
                })

            if (resultsContent.data.result) {
                POS_STORED_LOCAL_API.DISTRICT_LIST = resultsContent.data.data.map(
                    (it) => {
                        const itemId = parseInt(it.districtId)
                        const itemName = it.districtName

                        return {
                            id: itemId,
                            text: itemName,
                        }
                    }
                )
            }

            return POS_STORED_LOCAL_API.DISTRICT_LIST
        }
        case "GET_WARDS_OPTIMIZED": {
            resultsContent = await axios
                .get(URL_GET_WARDS_BY_DISTRICT + requestData.districtId)
                .catch((err) => {
                    showErrLog(err)
                })

            if (resultsContent.data.result) {
                POS_STORED_LOCAL_API.WARD_LIST = resultsContent.data.data.map(
                    (it) => {
                        const itemId = parseInt(it.wardId)
                        const itemName = it.wardName

                        return {
                            id: itemId,
                            text: itemName,
                        }
                    }
                )
            }

            return POS_STORED_LOCAL_API.WARD_LIST
        }
        case "GET_SOURCE": {
            resultsContent = await axios
                .get(POS_APIS_PRESCREEN.get("GET_CHANNEL_TYPES"), {
                    params: {},
                })
                .catch((err) => {
                    showErrLog(err)
                })

            if (resultsContent.data.result) {
                resultsContent.data.data.forEach((item) => {
                    if (item.type === 1) {
                        const filter = item.list.filter(
                            (it) => [2, 5, 7, 9].indexOf(it.id) === -1
                        )
                        POS_STORED_LOCAL_API.SOURCE_LIST = filter.map((it) => {
                            return {
                                id: it.id,
                                text: it.name,
                            }
                        })
                    }
                })
            }

            return POS_STORED_LOCAL_API.SOURCE_LIST
        }
        case "GET_TC": {
            resultsContent = await axios
                .get(POS_APIS_SA.get("GET_TRANSACTION_CENTER"), { params: {} })
                .catch((err) => {
                    showErrLog(err)
                })

            if (resultsContent.data.result) {
                POS_STORED_LOCAL_API.TC_LIST = resultsContent.data.data.map(
                    (it) => {
                        return {
                            id: it.id,
                            text: hasValue(it.name) ? it.name : "N/A",
                        }
                    }
                )
            }

            return POS_STORED_LOCAL_API.TC_LIST
        }
        case "GET_INFO_CHANNEL": {
            resultsContent = await axios
                .get(POS_APIS_COMMON.get("GET_INFORMATION_CHANNEL"), {
                    params: {},
                })
                .catch((err) => {
                    showErrLog(err)
                })

            if (resultsContent.data.result) {
                POS_STORED_LOCAL_API.INFO_CHANNEL_LIST = resultsContent.data.data.list.map(
                    (it) => {
                        const itemId = it.id
                        const itemName = it.name || "N/A"

                        return {
                            id: itemId,
                            text: itemName,
                        }
                    }
                )
            }

            return POS_STORED_LOCAL_API.INFO_CHANNEL_LIST
        }
        case "GET_INFO_CHANNEL_CHILD": {
            resultsContent = await axios
                .get(POS_APIS_COMMON.get("GET_INFORMATION_CHANNEL_CHILD"), {
                    params: { parentId: requestData.parentId },
                })
                .catch((err) => {
                    showErrLog(err)
                })

            if (resultsContent.data.result) {
                POS_STORED_LOCAL_API.INFO_CHANNEL_CHILD_LIST = resultsContent.data.data.list.map(
                    (it) => {
                        const itemId = it.id
                        const itemName = it.name || "N/A"

                        return {
                            id: itemId,
                            text: itemName,
                            parentId: it.parentId,
                            parentName: it.parentName,
                        }
                    }
                )
            }

            return POS_STORED_LOCAL_API.INFO_CHANNEL_CHILD_LIST
        }
        case "GET_DEPARTMENT_USER_LIST": {
            let data = []
            await axios
                .get(POS_APIS_COMMON.get("GET_DEPARTMENT_USER_LIST"), {
                    params: {},
                })
                .then((response) => {
                    resultsContent = response.data
                })
                .catch((err) => {
                    showErrLog(err)
                })
            if (resultsContent) {
                let dataMap = resultsContent.data.map((it) => {
                    return {
                        id: it.userId,
                        text: hasValue(it.name) ? it.name : "N/A",
                        departmentId: it.departmentId,
                        departmentName: it.departmentName,
                    }
                })
                data = data.concat(dataMap)
            }
            POS_STORED_LOCAL_API.DEPARTMENT_USER_LIST = data
            break
        }
        case "GET_PROJECT_LIST": {
            let data = []
            await axios
                .get(POS_APIS_COMMON.get("GET_PROJECT_LIST"), { params: {} })
                .then((response) => {
                    resultsContent = response.data
                })
                .catch((err) => {
                    showErrLog(err)
                })
            let dataMap = resultsContent.data.map((it) => {
                return {
                    id: it.pId,
                    text: hasValue(it.projectName) ? it.projectName : "N/A",
                    address: it.address,
                    latitude: it.latitude,
                    longitude: it.longitude,
                }
            })
            data = data.concat(dataMap)
            POS_STORED_LOCAL_API.PROJECT_LIST = data
            break
        }
        case "SA_GET_CHANNEL_TYPE": {
            resultsContent = await axios
                .get(POS_APIS_SA.get("GET_CHANNEL_TYPE"))
                .catch((err) => {
                    showErrLog(err)
                })

            if (resultsContent.data.result) {
                POS_STORED_LOCAL_API.SA_CHANNEL_TYPE_LIST =
                    resultsContent.data.data
            }

            return POS_STORED_LOCAL_API.SA_CHANNEL_TYPE_LIST
        }
        case "COMMON_GET_CHANNEL_TYPE": {
            let data = []
            await axios
                .get(POS_APIS_COMMON.get("GET_CHANNEL_TYPES"), {
                    params: { type: requestData.type },
                })
                .then((response) => {
                    resultsContent = response.data
                })
                .catch((err) => {
                    showErrLog(err)
                })
            if (resultsContent) {
                data = resultsContent.data
            }
            POS_STORED_LOCAL_API.COMMON_CHANNEL_TYPE_LIST = data
            break
        }
        case "GET_BPO": {
            resultsContent = await axios
                .get(POS_APIS_COMMON.get("GET_BPO"))
                .catch((err) => {
                    showErrLog(err)
                })

            const data = resultsContent.data
            if (data.result) {
                POS_STORED_LOCAL_API.BPO_LIST = data.data[0].list.map((it) => {
                    const itemId = it.code
                    const itemName = it.name

                    return { id: itemId, text: itemName }
                })
            }

            return POS_STORED_LOCAL_API.BPO_LIST
        }
    }
}

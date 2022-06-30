export const FORMAT_TIME = "HH:mm"
export const FORMAT_DATE = "dd/MM/yyyy"

export const FROM_TO_ALLEY = "alley"
export const FROM_TO_LENGTH = "length"
export const FROM_TO_WIDTH = "width"
export const FROM_TO_YEAR_BUILT = "yearbuilt"
export const DEF_FROM_TO = {
    fromValue: "",
    toValue: "",
}
export const DEF_GROUP_FILTER_FROM_TO = {
    [FROM_TO_ALLEY]: {
        ...DEF_FROM_TO,
        type: FROM_TO_ALLEY,
    },
    [FROM_TO_LENGTH]: {
        ...DEF_FROM_TO,
        type: FROM_TO_LENGTH,
    },
    [FROM_TO_WIDTH]: {
        ...DEF_FROM_TO,
        type: FROM_TO_WIDTH,
    },
    [FROM_TO_WIDTH]: {
        ...DEF_FROM_TO,
        type: FROM_TO_WIDTH,
    },
    [FROM_TO_YEAR_BUILT]: {
        ...DEF_FROM_TO,
        type: FROM_TO_YEAR_BUILT,
    },
}

export const KEY_PRIVATE_LISTING = "privateListing"
export const PRIVATE_LISTING_IDENTIFIED = "identified"
export const PRIVATE_LISTING_UNIDENTIFIED = "unidentified"
export const DEF_PRIVATE_LISTING = {
    [PRIVATE_LISTING_UNIDENTIFIED]: {
        label: "Chưa xác thực",
        type: "privateListing",
        value: "2",
    },
    [PRIVATE_LISTING_IDENTIFIED]: {
        label: "Đã xác thực",
        type: "privateListing",
        value: "1",
    },
}

// lead
export const MEETING_NEED_BA_ACCEPT = 2
export const PROGRESS_CANCEL_GENERAL = 3
export const PROGRESS_CANCEL_TRACKING = 4

// label
export const LABEL_CONFIRM = "Xác nhận"
export const LABEL_CLOSE = "Đóng"
export const LABEL_SAVE = "Lưu"
export const LABEL_CANCEL_LEAD_TITLE = "Lý do hủy ?"
export const LABEL_REOPEN_LEAD_TITLE = "Lý do mở ?"
export const LABEL_ADJUST_CRITERIA_LEAD_TITLE = "Điều chỉnh tiêu chí"

// error
export const ERROR_SELECTED_REASON = "Chọn lý do"

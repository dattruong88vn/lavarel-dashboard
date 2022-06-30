export interface Rating {
    code: string
    content: string | null
    name: string
    reason: string
    percentValue: number | null
}

export interface FeedBack {
    createdDate: number | null
    customerName: string
    results: Array<Rating>
}

export type FieldDistrictWard = {
    id: number
    isPrefered: boolean
    name: string
    name_en: string | null
}
export interface DistrictObj extends FieldDistrictWard {}
export interface WardObj extends FieldDistrictWard {
    districtId: number
    districtName: string
}
export interface DistrictWardGroup extends FieldDistrictWard {
    wardList: Array<WardObj>
}

export interface MeetingCancel {
    meetingId: number
    reasonId: number
    reasonName: string
    createdDate: Date
}

export interface QuoItem {
    id: number
    progressId: number
    progressQuoId: number
    progressQuoName: string
    createdDate: null
}
export interface ProgressItem {
    lable: string | null
    meetingCancelTemps: Array<MeetingCancel> | null
    progressId: number | null
    progressName: string
    progressQuoList: Array<QuoItem>
}

export interface Direction {
    id: number
    name: string
    name_en: string | null
    isPrefered?: boolean
}
export interface ResponseDeal {
    assignedTo: number | null
    avgPercentValue: number
    baName: string
    baPhone: string
    closingTimeRemaining: number | null
    customerName: string
    customerPhone: string
    dealId: number | string
    dealStatus: string
    districtList: Array<DistrictWardGroup> = []
    directionList: Array<Direction> = []
    expectedClosingDate: number | null
    feedBackList: Array<FeedBack> = [] | null
    lastExpectedClosingDate: number | null
    listingTypeId: number | null
    listingTypeName: string
    progressId: number | 0
    progressList: Array<ProgressItem> | []
    propertyTypeName: string
    propertyTypeId: number | null
    isViewDetail: boolean | null
}

export interface IDealDataPost {
    dealIds: Array[number] | string | null
    rListingId: number | string | null
}
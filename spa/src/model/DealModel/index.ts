import { Direction, DistrictWardGroup, FeedBack, ProgressItem } from './index.d'

class DealModel {
    assignedTo: number| null
    avgPercentValue: number
    baName: string
    baPhone: string
    closingTimeRemaining: number | null
    customerName: string
    customerPhone: string
    dealId: number | string
    dealStatus: string
    directionList: Array<Direction> = []
    districtList: Array<DistrictWardGroup> = []
    expectedClosingDate: number| null
    feedBackList: Array<FeedBack> = []
    lastExpectedClosingDate: number| null
    listingTypeId: number| null
    listingTypeName: string
    progressId: number | 0
    progressList: Array<ProgressItem> | []
    propertyTypeName: string
    propertyTypeId: number| null
    isViewDetail: boolean | null

    constructor() {
        this.assignedTo = null
        this.avgPercentValue = 0
        this.baName = ''
        this.baPhone = ''
        this.closingTimeRemaining = null
        this.customerName = ''
        this.customerPhone = ''
        this.dealId = ''
        this.dealStatus = ''
        this.directionList = []
        this.districtList = []
        this.expectedClosingDate = null
        this.feedBackList = []
        this.lastExpectedClosingDate = null
        this.listingTypeId = null
        this.listingTypeName = ''
        this.progressId = 0
        this.progressList = []
        this.propertyTypeName = ''
        this.propertyTypeId = null
        this.isViewDetail = null
    }
}

export default DealModel

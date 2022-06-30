export interface positionObj {
    rlistingId: number | string
    postionName: string | null
    alleyTypeName: string | null
    alleyName: string | null
    alleyWidth: number | null
    roadFrontageDistanceFrom: number | null
    roadFrontageDistanceTo: number | null
    roadFrontageWidth: string | null
}

export interface legalObject {
    legalId: number
    legalName: string | ''
}

export class ListingDetailModel {
    rlistingId: number | string
    address: string | ''
    price: number | null
    formatPrice: string | ''
    bpoCloseDate : number | null
    comparedToMarket : number | null
    formatPreliminaryPrice: string | ''
    lotSize: number | null
    sizeWidth: number | null
    sizeLength: number | null
    bedrooms: number | null
    bathrooms: number | null
    statusQuoName: string | null
    formatNumberFloor: string | ''
    legalsOfListing: Array<legalObject> | null
    legal: string | null
    privacyName: string | null
    listingPositions: positionObj | null
    formatPricePerSquareMeterOfLotSize: string | ''
    phone: number | string | null
    dealId: number | string | null

    constructor() {
        this.rlistingId = ''
        this.address = ''
        this.price = null
        this.formatPrice = ''
        this.bpoCloseDate = null
        this.comparedToMarket = null
        this.formatPreliminaryPrice = ''
        this.lotSize = null
        this.sizeWidth = null
        this.sizeLength = null
        this.bedrooms = null
        this.bathrooms = null
        this.statusQuoName = null
        this.formatNumberFloor = ''
        this.legalsOfListing = null
        this.legal = ''
        this.privacyName = ''
        this.listingPositions = null
        this.formatPricePerSquareMeterOfLotSize = ''
        this.phone = null
        this.dealId = null
    }
}

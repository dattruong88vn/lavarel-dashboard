export enum TimeGroupBy {
    WEEK = "week",
    MONTH = "month",
}

export enum GroupBy {
    STATUS = "status",
    USER = "user",
}

export enum TrackingType {
    PAGE = "page",
    POPUP = "popup",
}

export enum PopupType {
    NONE = "",
    TOTAL_POTENTIAL_DEALS = "totalPotentialDeals",
    BUY_DEAL = "buyDeal",
    RENTAL_DEAL = "rentalDeal",
    POTENTIAL_BUY_DEAL = "potentialBuyDeal",
    POTENTIAL_RENTAL_DEAL = "potentialRentalDeal",
    BAD_BUY_DEAL = "badBuyDeal",
    BAD_RENTAL_DEAL = "badRentalDeal",
}
export interface ListingGroup {
    groupBy: GroupBy;
    timeGroupby: TimeGroupBy;
}

export interface FilterPipeLine {
    createdDateFrom: string;
    createdDateTo: string;
    dealId: number[] | null;
    zoneIds: number[] | null;
    teamIds: number[] | null;
    departmentIds: number[] | null;
    districtIds: number[] | null;
    wardIds: number[] | null;
    assignees: number[] | null;
    listingTypeId: number | null;
    propertyTypeId: number | null;
    expectedClosingCodes: string[] | null;
    expectedClosingDateFrom: string;
    expectedClosingDateTo: string;
    scoreCardTypes: string[] | null;
}

export interface SumPipeLineModel {
    finalBudgetSum: string;
    actualCommissionSum: string;
    potentialDealSum: number;
    potentialDealIds: string;
}
export interface DateRanger {
    from: number;
    to: number;
}

export interface DataRowSalePipeline {
    name: string;
    totalUnit: DealSalePipeline;
    noExceptedClosingDateUnit: DealSalePipeline;
    timeRangeUnits: DealSalePipeline[];
    rowId: number;
}
export interface DealSalePipeline {
    value: string;
    buyItem: number;
    buyItemIds: string;
    valueBuyItem: string;
    rentItem: number;
    rentItemIds: string;
    valueRentItem: string;
    hotRentItem: number;
    hotRentItemIds: string;
    hotBuyItem: number;
    hotBuyItemIds: string;
    badRentItem: number;
    badRentItemIds: string;
    badBuyItem: number;
    badBuyItemIds: string;
}

export interface SalePipelineReportRequest {
    page: number;
    numberItem: number;
    filter: FilterPipeLine;
    listingGroup: ListingGroup;
    expectedTimeRanges: string[];
    removeEmpty: boolean;
}

export interface SalePipelineTrackingRequest {
    trackingType: TrackingType;
    fromTime: string;
    duration: number;
    viewType: GroupBy;
    viewTimeType: TimeGroupBy;
    rowId?: string;
    linkName?: PopupType;
}

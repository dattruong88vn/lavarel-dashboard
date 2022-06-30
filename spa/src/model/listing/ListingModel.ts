import ListingFilter from "model/filter/ListingFilter";

export const getNameListingType = (id: any) => {
    id = parseInt(id, 10);
    switch (id) {
        case 1:
            return {
                sale: {
                    name: "Bán"
                },
                buy: {
                    name: "Mua"
                }
            };
        case 2:
            return {
                sale: {
                    name: "Thuê"
                },
                buy: {
                    name: "Thuê"
                }
            };
        case 99:
            return {
                sale: {
                    name: "Dự án"
                },
                buy: {
                    name: "Dự án"
                }
            };
    }
    return null;
}

export const isDisplayListingColum = (col: string, filter: ListingFilter) => {
    switch (col) {
        case 'rlistingId':
            return true;
        case 'updatedDate':
            return filter.type == 3 || filter.type == 1 || filter.type == 5;
        case 'liveType':
            return filter.type == 3 || filter.type == 1;
        case 'districtName':
        case 'propertyTypeName':
        case 'psAssignedName':
        case 'assignedName':
        case 'liveType':
        case 'reasonName':
        case 'timeCounter':
        case 'phone':
        case 'ownerName':
        case 'bpoCloseDate':
        case 'address':
        case 'price':
        case 'sourceName':
        case 'listingTypeId':
        case 'assignedDate':
        case 'guaranteedExpiredDate':
        case 'numberDeal':
        case 'statusCreateDate':
            return true;
    }
    return false;
}

export interface ListModel<T> {
    list: Array<T>
}

export class ZoneModel {
    departmentId: number = 0;
    departmentName: string = '';
}

export class MemberModel {
    userId: number = 0;
    name: string = '';
}

export class DistrictModel {
    districtId: number = 0;
    districtName: string = '';
}

export class WardModel {
    wardId: number = 0;
    wardName: string = '';
}

export class InformationChannelModel {
    id: number = 0;
    name: string = '';
}

export class ChannelTypeModel extends InformationChannelModel {
    code: string = '';
};

export class PropertyModel {
    typeName: string = '';
    propertyTypeID: number = 0
}

export class PropertyPrefixModel {
    typeName: string = '';
    propertyTypeId: number = 0;
    prefixName: string = '';
}

export class InformationSourceModel extends InformationChannelModel {
    parentId: number = 0;
    parentName: string = '';
}

export class CenterModel {
    tcId: number = 0;
    name: string = '';
}

class StatusModel {
    statusId: number = 0;
    statusName: string = '';
    owner: number = 0;
    all: null = null;
    dealIds: string = '';
    allDealIds: string = '';
}

class DealModel {
    name: string = '';
    status: Array<StatusModel> = [];
}

export class DataDealMatrixModel {
    rlistingId: number = 0;
    formatedPrice: string = '';
    deals: Array<DealModel> = [];
}

export class DataPostGetMemberList {
    zoneIds: Array<string | number> | null = null;
    teamIds: Array<string | number> | null = null;
    districtIds: Array<string | number> | null = null;
    wardIds: Array<string | number> | null = null;
    departmentIds: Array<string | number> | null = null;
}

export class DataPostGetListingDealMatrix {
    rlistingId?: Array<number> | null;
    filterBPOCode?: string | null;
    channelTypeIds?: string | null;
    ownerName?: string | null;
    sourceId?: string | null;
    tcid?: string | null;
    phone?: string | null;
    address?: string | null;
    zoneIds?: string | null;
    teamIds?: string | null;
    departmentIds?: string | null;
    userIds?: string | null;
    bpoCloseGradeDateFrom?: number | null;
    bpoCloseGradeDateTo?: number | null;
    liveDateFrom?: number | null;
    liveDateTo?: number | null;
    listingTypeId?: number | null;
    propertyTypeIds?: string | null;
    districtId?: string | null;
    wardId?: string | null;
    scorecardType?: number | null;
    liveType?: number | null;
    filterBPOCodeTab: string;
    fromBSA: boolean;

    constructor(code: string, fromBSA: boolean = true) {
        this.filterBPOCodeTab = code;
        this.fromBSA = fromBSA;
    }
}

class ListingModel {
    rlistingId: number = -1;
    assignedDate: any;
    numberOfSeconds: number = -1;
    isRequestByDiy: boolean = false;
    ownerName: string = '';
    sourceName: string = '';
    statusName: string = '';
    useDiy?: number;
    workTypeName?: any;
    phone: string = '';
    subPhone?: any;
    districtName: string = '';
    wardName: string = '';
    address: string = '';
    price: any;
    currency: string = '';
    formatedPrice: string = '';
    reviewedDate?: number;
    updatedDate: any;
    statusCreateDate: any;
    createdName: string = '';
    numberDeal?: any;
    assignedName: string = '';
    numberTour?: any;
    liveType?: any;
    liveTypeId?: any;
    guaranteedExpiredDate?: any;
    guaranteedSignedDate?: any;
    lastestDateFeedBack?: any;
    psAssignedName: string = '';
    reasonName: string = '';
    tcName: string = '';
    channelName: string = '';
    livePrivate?: any;
    listingTypeId: number = -1;
    propertyTypeId: number = -1;
    propertyTypeName: string = '';
    landCode: string = '';
    mapCode: string = '';
    latestHistory?: any;
    timeCounter: string = '';
    scorecardName: string = '';
    scorecardType?: number;
    score?: any;
    bpoCloseDate?: any;
    bpoGrade?: number;
    bpoStatus: number = -1;
    bpoLabel: string = '';
    unitPrice?: any;
    bpoCloseDateRemain?: any;
    diffBpoCloseDate?: any;
    basketDeals?: any;
    bestDeals?: any;
}

export default ListingModel;

import MasterFilter from "./master/MasterFilter"
export const BsaListingDefautlFilter =
{
    draw: 4,
    columns: [{
        data: "updatedDate",
        name: null,
        searchable: true,
        orderable: true,
        search: {value: null, regex: false}
    },
    {
        data: "rlistingId",
        name: null,
        searchable: true,
        orderable: true,
        search: {value: null, regex: false}
    },
    {
        data: "ownerName",
        name: null,
        searchable: true,
        orderable: true,
        search: {value: null, regex: false}
    },
    {
        data: "bpoCloseDate",
        name: null,
        searchable: true,
        orderable: true,
        search: {value: null, regex: false}
    }, {
        data: "timeCounter",
        name: null,
        searchable: true,
        orderable: true,
        search: {value: null, regex: false}
    },
    {
        data: "phone",
        name: null,
        searchable: true,
        orderable: true,
        search: {value: null, regex: false}
    },
    {
        data: "address",
        name: null,
        searchable: true,
        orderable: true,
        search: {value: null, regex: false}
    },
    {
        data: "districtName",
        name: null,
        searchable: true,
        orderable: true,
        search: {value: null, regex: false}
    }, {
        data: "price",
        name: null,
        searchable: true,
        orderable: true,

        search: {value: null, regex: false}
    },
    {
        data: "sourceName",
        name: null,
        searchable: true,
        orderable: true,
        search: {value: null, regex: false}
    },
    {
        data: "listingTypeId",
        name: null,
        searchable: true,
        orderable: true,
        search: {value: null, regex: false}
    },
    {
        data: "propertyTypeId",
        name: null,
        searchable: true,
        orderable: true,
        search: {value: null, regex: false}
    }, {
        data: "assignedDate",
        name: null,
        searchable: true,
        orderable: true,
        search: {value: null, regex: false}
    },
    {
        data: "psAssignedName",
        name: null,
        searchable: true,
        orderable: true,
        search: {value: null, regex: false}
    },
    {
        data: "assignedName",
        name: null,
        searchable: true,
        orderable: true,
        search: {value: null, regex: false}
    }],
    order: [{"column": "0", "dir": "desc"}],
    start: 0, length: "10",
    search: {value: null, regex: false},
    address: null, "fromAssignedDate": null,
    guaranteedExpired: null,
    listingTypeId: null,
    liveType: null,
    ownerName: null,
    phone: null,
    propertyTypeIds: null,
    rlistingId: null,
    sort: {columnName: "updatedDate", value: "desc"},
    scorecardType: null,
    sourceId: null,
    tcId: null,
    toAssignedDate: null,
    type: 1,
    zoneField: null,
    teamField: null,
    districtId: null,
    wardId: null,
    memberField: null,
    departmentField: null,
    channelTypeIds: null,
    bpo: null,
    tcid: null
};

export interface Search {
    value?: any;
    regex: any;
}

export interface Column {
    data: string;
    name?: any;
    searchable: boolean;
    orderable: boolean;
    search: Search;
}

export interface Order {
    column: string;
    dir: string;
}

export interface Sort {
    columnName: string;
    value: string;
}
class ListingFilter extends MasterFilter {
    draw: any;
    columns: Array<Column> = [];
    order: Array<Order> = [];
    start: any;
    length: any;
    search: Search = {value: '', regex: false};
    address?: any;
    fromAssignedDate?: any;
    guaranteedExpired?: any;
    listingTypeId?: any;
    liveType?: any;
    ownerName?: any;
    phone?: any;
    propertyTypeIds?: any;
    rlistingId?: any;
    sort: Sort = {columnName: '', value: ''};
    scorecardType?: any;
    sourceId?: any;
    tcId?: any;
    toAssignedDate: any;
    type: any;
    zoneField?: any;
    teamField?: any;
    districtId?: any;
    wardId?: any;
    memberField?: any;
    departmentField?: any;
    channelTypeIds?: any;
    channelTypeChildIds?: any;
    bpo?: any;
    tcid?: any;
}

export default ListingFilter

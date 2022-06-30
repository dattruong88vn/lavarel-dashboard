import axios from "axios";

const URL_PROPERTY_TYPE = "/common/property-type-list-v2/";
const URL_PROPERTY_TYPE_GROUP = "/common/real-estate-group/";
const URL_AMENITIES = "/amenities/get-amenities/";
const URL_LISTING_PROS_AND_CONS = "/pos/sa-api/get-channel-type-list/";
const URL_PRICE_RANGES = "/common/get-price-ranges";
const URL_ALLEY_TYPE = "/common/get-alley-type";
const URL_DIRECTIONS = "/common/get-directions-dashboard";
const URL_CHANNEL_TYPE = "/common/get-channel-types/";
const URL_DONE_PAGE = "/kyc-api/done-page";
const URL_GET_DEAL_GROUP_USER = "/kyc-api/get-deal-group-user";
const URL_GET_DETAIL_DEAL_GROUP_USER = "/kyc-api/get-detail-deal-group-user";
const URL_GET_TIME_CLOSE_DEAL = '/kyc-api/getListChannelTypes/63';

export function fetchPropertyTypes(propertyTypeGroup, listingTypeId, callback){
    fetch(`${URL_PROPERTY_TYPE}${propertyTypeGroup}/${listingTypeId}`)
    .then(res => res.json())
    .then(
      (result) => {
          callback(result);
      }
    )
}

export function fetchPropertyGroup(callback){
    fetch(URL_PROPERTY_TYPE_GROUP)
    .then(res => res.json())
    .then(
      (result) => {
          callback(result);
      }
    )
}

export function fetchDetailDealGroupUser(callback) {
    fetch(URL_GET_DETAIL_DEAL_GROUP_USER)
    .then(res => res.json())
    .then(
      (result) => {
          callback(result);
      }
    )
}

export function fetchDealGroupUser(callback, data) {
    showPropzyLoading()
    fetch(URL_GET_DEAL_GROUP_USER, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },

        body: JSON.stringify(data),
    })
    .then(res => res.json())
    .then(
      (result) => {
        hidePropzyLoading()
        callback(result);
      }
    )

}

export function fetchPropertyGroupForSelect(callback) {
    fetchPropertyGroup((result) => {
        let { data } = result;
        let propertyTypeGroup = data.map(item => {
            return {
                value: item.id,
                label: item.name
            }
        })
        callback(propertyTypeGroup)
    })
}

export function fetchPropertyTypesForSelect(propertyTypeGroupId, listingTypeId, callback) {
    fetchPropertyTypes(propertyTypeGroupId, listingTypeId, (result) => {
        let { data } = result;
        var propertyTypes = []
        for (var i = 0; i < data.length; i++) {
            let item = data[i]
            propertyTypes.push({
                value: item.propertyTypeId,
                label: item.typeName,
                formId: item.formId,
                isDisabled: !item.active,
            })
        }
        callback(propertyTypes)
    })
}

export function fetchAmenities(type, callback) {
    fetch(URL_AMENITIES + type)
    .then(res => res.json())
    .then(
      (result) => {
          callback(result.data[0]);
      }
    )
}

export function fetchAmenitiesForSelect(type, callback) {
    fetchAmenities(type, (data) => {
        var options = []
        for (var i = 0; i < data.list.length; i++) {
            let item = data.list[i]
            options.push({ value: item.id, label: item.name })
            if (item.childs) {
                for (var j = 0; j < item.childs.length; j++) {
                    let children = item.childs[j]
                    if (children) {
                        options.push({
                            value: children.id,
                            label: "|------" + children.name,
                        })
                    }
                }
            }
        }
        callback(options)
    })
}

export function fetchAlleyType(callback){
    fetch(URL_ALLEY_TYPE)
    .then(res => res.json())
    .then(
      (result) => {
          callback(result.data);
      }
    )
}


export function fetchListingProsAndCons(type, callback){
    fetch(URL_LISTING_PROS_AND_CONS + type)
    .then(res => res.json())
    .then(
      (result) => {
          callback(result.data[0]);
      }
    )
}

export function fetchListingProsAndConsForSelect(type, callback) {
    fetchListingProsAndCons(type, (data) => {
        var options = []
        for (var i = 0; i < data.list.length; i++) {
            let item = data.list[i]
            options.push({ value: item.id, label: item.name })
            if (item.childs) {
                for (var j = 0; j < item.childs.length; j++) {
                    let children = item.childs[j]
                    if (children) {
                        options.push({
                            value: children.id,
                            label: "|------" + children.name,
                        })
                    }
                }
            }
        }
        callback(options)
    })
}

export function fetchRanges(callback) {
    fetch(URL_PRICE_RANGES)
    .then(res => res.json())
    .then(
      (result) => {
          callback(result.data);
      }
    )
}

export function fetchRangesForSelect(listingTypeId, propertyTypeId, callback) {
    fetchRanges((data) => {
        var priceOptions = []
        var sizeOptions = []
        for (var i = 0; i < data.length; i++) {
            let item = data[i]
            if (item.listingTypeId != listingTypeId) {
                continue
            }
            item.propertyTypes.forEach((element) => {
                if (element.propertyTypeId != propertyTypeId) {
                    return
                }
                element.prices.forEach((price) => {
                    price.label = price.name
                    priceOptions.push(price)
                })
                element.sizes.forEach((size) => {
                    size.label = size.name
                    sizeOptions.push(size)
                })
            })
        }
        var returnData = {
            prices: priceOptions,
            sizes: sizeOptions,
        }
        callback(returnData)
    })
}

export function fetchDirections(callback) {
    fetch(URL_DIRECTIONS)
    .then(res => res.json())
    .then(
      (result) => {
          callback(result.data);
      }
    )
}

export function fetchChannelTypes(id, callback){
    fetch(URL_CHANNEL_TYPE +  id)
    .then(res => res.json())
    .then(
      (result) => {
          callback(result.data);
      }
    )

}

export function fetchChannelTypesForSelect(id, callback) {
    fetchChannelTypes(id, (data) => {
        var options = []
        for (var i = 0; i < data[0].list[0].childs.length; i++) {
            let item = data[0].list[0].childs[i]
            options.push({ value: item.id, label: item.name })
            if (item.childs) {
                for (var j = 0; j < item.childs.length; j++) {
                    let children = item.childs[j]
                    if (children) {
                        options.push({
                            value: children.id,
                            label: "|------" + children.name,
                        })
                    }
                }
            }
        }
        callback(options)
    })
}

export const fetchDonePage = (data = {}) => {
    showPropzyLoading()
    axios
        .post(URL_DONE_PAGE, data)
        .then((xhr) => {
            hidePropzyLoading()
        })
        .catch((error) => {
            hidePropzyLoading()
            throw error
        })
}

export const fetchTimeCloseDeal = () => {
    return axios.get(URL_GET_TIME_CLOSE_DEAL);
}

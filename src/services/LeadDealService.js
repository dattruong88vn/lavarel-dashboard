import BaseApiService from "services/BaseApiService"

import { TOKEN } from "Commons/apis"
import { LEAD_DETAIL, LISTING_FILTER_DATA, LIST_MATCHING_LISTING, LIST_MATCHING_LISTING_INIT } from "Commons/apis/lead_deal"

export default class LeadDealService extends BaseApiService {
    getDetail = async () => {
        return await this.connect(`${LEAD_DETAIL}/${lead.leadId}?${TOKEN}`)
            .get()
    }
    getAdjusCriteriaData = async (url) => {
        return await this.connect(`${url}?${TOKEN}`)
            .get()
    }
    generateDataPostForCustomSearch(item) {
        const dataPostForGetListing = [
            "assignedTo",
            "bathRooms",
            "bedRooms",
            "directionsList",
            "districtsList",
            "finalBudget",
            "formatFilterParams",
            "initialBudget",
            "leadId",
            "listingTypeId",
            "maxSize",
            "minSize",
            "positionList",
            "progressId",
            "propertyTypeId",
            "statusId",
            "statusName",
            "responsiveness",
            "sourceId",
            "sourceName",
            "subjectId",
            "subjectName",
            "wardsList",
        ]

        let dataPost = {}
        // set default value
        dataPostForGetListing.map((v, k) => {
            dataPost[v] = item[v]
            if (v === 'formatFilterParams') {
                dataPost['filterParams'] = item[v]
                dataPost[v] = null
            }

            return dataPost
        })

        return dataPost
    }
    getFilterCustomSearch = async (dataPost) => {
        return await this.connect(`${LISTING_FILTER_DATA}?${TOKEN}`)
            .appendBody(dataPost)
            .post()
    }
    getMatchingListingInit = async (page, dataPost) => {
        return await this.connect(`${LIST_MATCHING_LISTING_INIT}/${page}/10?${TOKEN}`)
            .appendBody(dataPost)
            .post()
    }
    getMatchingListing = async (page, dataPost) => {
        return await this.connect(`${LIST_MATCHING_LISTING}/${page}/10?${TOKEN}`)
            .appendBody(dataPost)
            .post()
    }
    getListCancelledReasons = async (url) => {
        return await this.connect(`${url}?${TOKEN}`)
            .get()
    }
    updateReasonStatus = async (url, dataPost) => {
        return await this.connect(`${url}?${TOKEN}`)
            .appendBody(dataPost)
            .post()
    }
    getListReopenReasons = async (url) => {
        return await this.connect(`${url}?${TOKEN}`)
            .get()
    }
    unlockReasonStatus = async (url, dataPost) => {
        return await this.connect(`${url}?${TOKEN}`)
            .appendBody(dataPost)
            .post()
    }
}

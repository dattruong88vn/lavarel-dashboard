import { BASE_API, SEARCH_LISTING_API } from "Commons/apis/index"

export const LISTING_CUSTOM_SEARCH = "listing/custom-search"
export const LEAD_DETAIL = `${BASE_API}lead/v2/detail-new`
export const LISTING_FILTER_DATA = `${BASE_API}listing/v2/filter-data`
export const LIST_MATCHING_LISTING_INIT = `${SEARCH_LISTING_API}listing/search`
export const LIST_MATCHING_LISTING = `${SEARCH_LISTING_API}listing/filter`
export const GET_ADJUST_CRITERIA_LIST = `${BASE_API}lead/get-lead-match-listing-value`
export const GET_LIST_REASONS_CANCELLED = `${BASE_API}cancel-reason/list`
export const GET_LIST_REASONS_REOPEN = `${BASE_API}lead-deal-type/2`
export const LEAD_CANCEL = `${BASE_API}lead/status-pending`
export const LEAD_REOPEN = `${BASE_API}deal/unlock`

import { PaginationFilter } from "../Pagination"

export const LEFT_PAGE = "LEFT"
export const RIGHT_PAGE = "RIGHT"
export const PAGE_PREVIOUS = "Trước"
export const PAGE_NEXT = "Tiếp"
export const PAGE_DOTS = "..."

export interface PagingProps {
    limit: number
    totalRecords: number
    onPageChanged: Function
    filter?: any
}

export interface PageData {
    currentPage: number
    totalPages: number
    pageLimit: number
    totalRecords: number
}

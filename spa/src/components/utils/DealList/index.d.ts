import { ResponseDeal } from "model/DealModel/index.d"
export interface IPropsDealList {
    onPageChanged: Function
    items: Array<ResponseDeal>
    totalRecords: Array<string>
}
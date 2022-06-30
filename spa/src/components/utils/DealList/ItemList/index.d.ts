import { FeedBack, ResponseDeal } from "model/DealModel/index.d";

export interface IDealItem {
  data: ResponseDeal
}

export type RenderFeedBack = {
  feedBackList: Array<FeedBack>
}
export interface TimeoutRequest {
    type: TimeoutType;
}

export interface TimeoutResponse {
    leadTime: number,
    dealTime: number,
    listingTime: number,
    lsoTime: number
}
export enum TimeoutType {
    BUY = "buy",
    SELL = "sell",
}
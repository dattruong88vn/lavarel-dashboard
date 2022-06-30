/**
 * For calling
 */
export interface CustomWindow extends Window {
    customAttribute: any
    makeCallFromJS: any
    closeFilterInTypescript: any
}

export interface IPropsCall {
    phoneNumber: number | string
    dealId: number | string
}

export const makeCall = (phoneNumber: string | number | null, dealId: string | number | null, isViewDetail: boolean | null) => {
    window.makeCallFromJS(phoneNumber, dealId, isViewDetail)
}

declare const window: CustomWindow
/**
 * end For calling
 */
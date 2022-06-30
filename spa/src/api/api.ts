export interface Response<T> {
    data: T;
}

export interface FullResponse<T> {
    code: number;
    data: T;
    message: string | null;
    result: boolean;
    technicalMessage: string | null;
}

export interface CollectionResponse<T> {
    data: T[];
}
export const encode = (component: object): string => {
    return encodeURIComponent(JSON.stringify(component));
};
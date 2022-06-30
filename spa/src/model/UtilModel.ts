export class SelectItem {
    text: string = '';
    value: any = '';
}

export class DataPostUploadImage {
    file?: Object;
    type?: string | null;
    source?: string | null;
    rlistingId?: string | number | null;
    lsoId?: string | number | null;
}

export interface ResponseUploadImage {
    file_name?: string | null
    link?: string | null
    isPrivate? : boolean
    source?: string
    isApproved?: boolean
}
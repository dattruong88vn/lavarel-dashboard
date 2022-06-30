export interface BaModelResponse {
    userId: number;
    name: string;
}

export interface BAAssigned {
    userId: number;
    name: string;
    grade: number| null;
    isActive: boolean;
    isRemove?: boolean;
    comment?: string;
    isRequire: boolean;
}

export interface ListBAAssignedResponse {
    minBaConfig: number;
    bas: BAAssigned[];
}

export interface PagePermission {
    entityCode: string;
    title: string;
    url: string;
    isAccessible: boolean;
}
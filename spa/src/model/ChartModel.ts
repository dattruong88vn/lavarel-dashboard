// class dataChildModel {
//     subLabel: string | null = null;
//     subType: string | null = null;
//     revenue: number | null = 0;
//     count: number | null = 0;
//     listingIds: Array<number> = [];
//     percent: number = 0;
// }

// class ChartModel {
//     label: string | null = null;
//     bpoType: string | null = null;
//     data: Array<dataChildModel> = [];
// }

declare module ChartModel {

    export interface Datum {
        subLabel: string;
        subType: string;
        revenue: string;
        count: number;
        listingIds: number[];
        bpoCode: number;
    }

    export interface RootObject {
        label: string;
        bpoType: string;
        data: Datum[];
    }

}
export default ChartModel;



import { startOfMonth, endOfMonth, endOfDay, format } from "date-fns";
import moment from 'moment';

export const transactionList = [
    { label: 'Bán', value: 1 },
    { label: 'Thuê', value: 2 }
]

export class Option {
    label: string = '';
    value: string | number = '';
    isHighlight?: boolean
}

export class GroupSelect {
    label: string = '';
    options: Array<Option> = [];
}

export class IsDisabled {
    property: boolean = true;
    center: boolean = true;
    informationSource: boolean = true;
}

export interface FormMatrix {
    id: string,
    owner: string,
    phone: string,
    address: string,
    bpoCloseGradeDateFrom: string,
    bpoCloseGradeDateTo: string,
    liveDateFrom: string,
    liveDateTo: string,
    zone: any,
    team: any,
    department: any,
    member: any,
    transaction: any,
    district: any,
    ward: any,
    center: any,
    classification: any,
    post: any,
    bpo: any,
    property: any,
    source: any,
    informationChannel: any,
    informationSource: any
}

export const defaultFormMatrix = {
    id: '',
    owner: '',
    phone: '',
    address: '',
    bpoCloseGradeDateFrom: '',
    bpoCloseGradeDateTo: '',
    liveDateFrom: '',
    liveDateTo: '',
    zone: { label: 'Tất cả zone', value: '' },
    team: { label: 'Tất cả team', value: '' },
    department: { label: 'Tất cả phòng ban', value: '' },
    member: { label: 'Tất cả thành viên', value: '' },
    transaction: { label: 'Tất cả loại giao dịch', value: '' },
    district: { label: 'Tất cả quận', value: '' },
    ward: { label: 'Tất cả phường', value: '' },
    center: { label: 'Tất cả trung tâm', value: '' },
    classification: { label: 'Tất cả phân loại listing', value: '' },
    post: { label: 'Tất cả loại đăng tin', value: '' },
    bpo: { label: 'Tất cả BPO', value: '' },
    property: [],
    source: [],
    informationChannel: [],
    informationSource: []
}

export class SalePipelineFilterForm {
    createdDateFrom: Date = moment(new Date()).subtract(6, 'months').toDate();
    createdDateTo: Date = new Date();
    dealId: string = '';
    zone: Option | string = '';
    team: Option | string = '';
    district: Option | string = '';
    ward: Option | string = '';
    department: Option | string = '';
    member: Option | string = '';
    transaction: Option | string = '';
    property: Option | string = '';
    closeDealType: Option[] = [];
    closeDateFrom: Date = startOfMonth(new Date());
    closeDateTo: Date = endOfMonth(new Date());
    labelDeal: Option[] = [];
}

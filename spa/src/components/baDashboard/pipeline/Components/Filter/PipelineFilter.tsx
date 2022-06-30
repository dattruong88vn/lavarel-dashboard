import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { Option } from 'utils/form';
import * as listApi from 'api/list/listApi';
import { getCurrentUser } from 'api/user/userApi';
import { formatOptionLabel, handleConvertOptions } from 'utils/func';
import * as constants from 'constants/index';
import CustomDateRangePicker from 'components/utils/DateRangePicker';
import { SalePipelineFilterForm } from 'utils/form';
import { FilterPipeLine } from 'model';
import "./pipelineFilter.scss";
import moment from 'moment';

type SalesPipelineFilterProps = {
    onSubmit: (data: FilterPipeLine) => void
};

const optionsTypeOfDeal = [
    { label: 'Mua', value: 1 },
    { label: 'Thuê', value: 2 }
];

const SalesPipelineFilter: React.FC<SalesPipelineFilterProps> = (props) => {
    const [showFilter, setShowFilter] = useState<boolean>(false);
    const [permissionIdBpo, setPermissionIdBpo] = useState<string>('');
    const [zoneList, setZoneList] = useState<Option[]>([]);
    const [teamList, setTeamList] = useState<Option[]>([]);
    const [districtList, setDistrictList] = useState<Option[]>([]);
    const [wardList, setWardList] = useState<Option[]>([]);
    const [departmentList, setDepartmentList] = useState<Option[]>([]);
    const [memberList, setMemberList] = useState<Option[]>([]);
    const [propertyList, setPropertyList] = useState<Option[]>([]);
    const [closeDealType, setCloseDealType] = useState<Option[]>([]);
    const [labelDealList, setLabelDealList] = useState<Option[]>([]);
    const [errors, setErrors] = useState({
        createdDate: false,
        closeDate: false
    });

    const [formData, setFormData] = useState<any>(new SalePipelineFilterForm());
    const defaultFormData = new SalePipelineFilterForm();

    const mapData = (): FilterPipeLine => {
        const data = {
            createdDateFrom: formData.createdDateFrom.setHours(0,0,0,0).toString(),
            createdDateTo: formData.createdDateTo.setHours(23,59,59,999).toString(),
            dealId: formData.dealId ? formData.dealId.replace(', ', ',').split(',').map((item: any) => parseInt(item)) : null,
            zoneIds: formData.zone ? [formData.zone.value] : null,
            teamIds: formData.team ? [formData.team.value] : null,
            departmentIds: formData.department ? [formData.department.value] : null,
            districtIds: formData.district ? [formData.district.value] : null,
            wardIds: formData.ward ? [formData.ward.value] : null,
            assignees: formData.member ? [formData.member.value] : null,
            listingTypeId: formData.transaction ? formData.transaction.value : null,
            propertyTypeId: formData.property ? formData.property.value : null,
            expectedClosingCodes: formData.closeDealType.map((item: any) => item.value),
            expectedClosingDateFrom: formData.closeDateFrom.setHours(0,0,0,0).toString(),
            expectedClosingDateTo: formData.closeDateTo.setHours(23,59,59,999).toString(),
            scoreCardTypes: formData.labelDeal.map((item: any) => item.value)
        };
        return data;
    };

    const onClear = () => {
        setFormData(defaultFormData);
        setErrors({
            createdDate: false,
            closeDate: false
        });
    };

    const onSubmit = () => {
        const validCreatedDateBeforeMonths = moment(formData.createdDateTo).subtract(6, 'months').toDate();
        const validCloseDateBeforeMonths = moment(formData.closeDateTo).subtract(6, 'months').toDate();
        const errors = {
            createdDate: false,
            closeDate: false
        };
        if (formData.createdDateFrom.getTime() < validCreatedDateBeforeMonths.setHours(0,0,0,0)) {
            errors.createdDate = true;
        }
        if ((formData.closeDealType.find((item: any) => item.value !== 'NO_TIME') || formData.closeDealType.length === 0) && formData.closeDateFrom.getTime() < validCloseDateBeforeMonths.setHours(0,0,0,0)) {
            errors.closeDate = true;
        }
        setErrors(errors);
        if (errors.createdDate || errors.closeDate) {
            return;
        }
        setShowFilter(false);
        props.onSubmit(mapData());
    };

    const onChangeInput = (value: any, key: string) => {
        const state = { ...formData };
        state[key] = value;
        setFormData(state);
    };

    const onChangeSelect = (e: any, type: keyof SalePipelineFilterForm) => {
        const state = { ...formData };
        let data = defaultFormData[type];
        if (e) {
            data = e;
        }
        state[type] = data;
        setFormData(state);
    };

    const onChangeDateRange = (data: any, type: string) => {
        const validDateBeforeMonths = moment(data.range1.endDate).subtract(6, 'months').toDate();
        if (type === 'createdDate') {
            setFormData({ ...formData, createdDateFrom: data.range1.startDate, createdDateTo: data.range1.endDate });

            if (data.range1.startDate.getTime() > validDateBeforeMonths.setHours(0,0,0,0)) {
                setErrors({ ...errors, createdDate: false });
            }
            return;
        }
        setFormData({ ...formData, closeDateFrom: data.range1.startDate, closeDateTo: data.range1.endDate });
        if (data.range1.startDate.getTime() > validDateBeforeMonths.setHours(0,0,0,0)) {
            setErrors({ ...errors, closeDate: false });
        }
    };

    const onClickFilter = () => {
        setShowFilter(!showFilter);
    };

    const fetchOptionmemberList = async () => {
        const dataPost = {
            zoneIds: formData.zone.value ? [formData.zone.value] : null,
            teamIds: formData.team.value ? [formData.team.value] : null,
            districtIds: formData.district.value ? [formData.district.value] : null,
            wardIds: formData.ward.value ? [formData.ward.value] : null,
            departmentIds: formData.department.value ? [formData.department.value] : null
        };
        const memberList = await listApi.getMemberList(permissionIdBpo, dataPost, constants.SALE_PIPELINE_REPORT);
        setMemberList(handleConvertOptions(memberList.data, 'member'));
    };

    useEffect(() => {
        props.onSubmit(mapData());
        (async () => {
            const currentUser = await getCurrentUser();
            const permissionIdBpoList = currentUser.permissions.filter((item: any) => item.actionCode === 'list' && item.entityCode === 'sale_pipeline_report');
            const permissionIdBpo = permissionIdBpoList[permissionIdBpoList.length - 1].permissionId;
            setPermissionIdBpo(permissionIdBpo);
            (async () => {
                const zoneList = await listApi.getZoneList(permissionIdBpo, constants.SALE_PIPELINE_REPORT);
                setZoneList(handleConvertOptions(zoneList.data));
            })();
            (async () => {
                const districtList = await listApi.getDistrictList('1');
                setDistrictList(handleConvertOptions(districtList.data, 'district'));
            })();
            (async () => {
                const departmentList = await listApi.getDepartmentList(permissionIdBpo, constants.SALE_PIPELINE_REPORT);
                setDepartmentList(handleConvertOptions(departmentList.data));
            })();
            (async () => {
                const closeDealType = await listApi.getChannelType('63');
                const closeDealTypeTrans = handleConvertOptions(closeDealType.data[0].list, 'closeDealType');
                const closeDealTypePlus = [...closeDealTypeTrans, { label: 'Chưa xác định', value: 'NO_TIME' }];
                setCloseDealType(closeDealTypePlus);
            })();
            (async () => {
                const labelDealList = await listApi.getCardType();
                setLabelDealList(handleConvertOptions(labelDealList.data, 'labelDeal'));
            })();
        })();
    }, []);

    useEffect(() => {
        if (permissionIdBpo) {
            const state = { ...formData, team: defaultFormData.team, district: defaultFormData.district, ward: defaultFormData.ward, member: defaultFormData.member };
            setFormData(state);
            (async () => {
                const param = formData.zone.value ? [formData.zone.value] : null;
                const teamList = await listApi.getTeamList(permissionIdBpo, param, constants.SALE_PIPELINE_REPORT);
                setTeamList(handleConvertOptions(teamList.data));
            })();
            fetchOptionmemberList();
        }
    }, [formData.zone.value, permissionIdBpo]);

    useEffect(() => {
        const state = { ...formData, ward: defaultFormData.ward, member: defaultFormData.member };
        setFormData(state);
        (async () => {
            const param = formData.district.value ? formData.district.value : '-1';
            const wardList = await listApi.getWardList(param);
            setWardList(handleConvertOptions(wardList.data, 'ward'));
        })();
        if (permissionIdBpo) {
            fetchOptionmemberList();
        }
    }, [formData.district.value]);

    useEffect(() => {
        (async () => {
            if (permissionIdBpo) {
                const state = { ...formData, member: defaultFormData.member };
                setFormData(state);
                fetchOptionmemberList();
            }
        })();
    }, [formData.team.value, formData.ward.value, formData.department.value, permissionIdBpo]);

    useEffect(() => {
        const state = { ...formData, property: defaultFormData.property };
        setFormData(state);
        if (formData.transaction.value) {
            (async () => {
                const response = await listApi.getPropertyListV2(formData.transaction.value);
                const propertyList = response.data;
                setPropertyList(handleConvertOptions(propertyList, 'property_prefix'));
            })();
            return;
        }
        setPropertyList([]);
    }, [formData.transaction]);

    return (
        <div className="col-md-12 filter">
            <button className="btn btn-default custom-button" onClick={onClickFilter}>
                <i className="fa fa-filter" aria-hidden="true"></i>
                <span>Lọc</span>
                <i className="fa fa-sort-desc" aria-hidden="true"></i>
            </button>
            <div className={`filter-content filter-content-pipeline ${showFilter ? 'show' : ''}`}>
                <div className="row">
                    <div className="col-md-12">
                        <label>Thời gian tạo</label>
                        <div className="form-group">
                            <CustomDateRangePicker
                                name="createdDate"
                                hasQuickRange={false}
                                fromDate={formData.createdDateFrom}
                                toDate={formData.createdDateTo}
                                onChange={onChangeDateRange} />
                            {errors.createdDate &&
                                <p className="title-red">Vui lòng chọn khoảng thời gian tạo không quá sáu tháng</p>
                            }
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="form-group">
                            <label>DealID</label>
                            <input
                                className="form-control"
                                type="text"
                                placeholder="id: 1001, 1002"
                                value={formData.dealId}
                                onChange={e => onChangeInput(e.target.value, 'dealId')} />
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="form-group">
                            <label>Zone</label>
                            <Select
                                isClearable={true}
                                placeholder="--Tất cả Zone--"
                                options={zoneList}
                                value={formData.zone}
                                onChange={e => onChangeSelect(e, 'zone')} />
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="form-group">
                            <label>Team</label>
                            <Select
                                isClearable={true}
                                placeholder="--Tất cả Team--"
                                options={teamList}
                                value={formData.team}
                                onChange={e => onChangeSelect(e, 'team')} />
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="form-group">
                            <label>Quận</label>
                            <Select
                                isClearable={true}
                                placeholder="--Tất cả Quận--"
                                options={districtList}
                                value={formData.district}
                                onChange={e => onChangeSelect(e, 'district')} />
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="form-group">
                            <label>Phường</label>
                            <Select
                                isClearable={true}
                                placeholder="--Tất cả Phường--"
                                options={wardList}
                                value={formData.ward}
                                onChange={e => onChangeSelect(e, 'ward')} />
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="form-group">
                            <label>Phòng ban</label>
                            <Select
                                isClearable={true}
                                placeholder="--Tất cả Phòng ban--"
                                options={departmentList}
                                value={formData.department}
                                onChange={e => onChangeSelect(e, 'department')} />
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="form-group">
                            <label>Nhân viên</label>
                            <Select
                                isClearable={true}
                                placeholder="--Tất cả Nhân viên--"
                                options={memberList}
                                value={formData.member}
                                onChange={e => onChangeSelect(e, 'member')} />
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="form-group">
                            <label>Hình thức giao dịch</label>
                            <Select
                                isClearable={true}
                                placeholder="--Tất cả Hình thức giao dịch--"
                                options={optionsTypeOfDeal}
                                value={formData.transaction}
                                onChange={e => onChangeSelect(e, 'transaction')} />
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="form-group">
                            <label>Loại BĐS</label>
                            <Select
                                placeholder="--Tất cả Loại bất động sản--"
                                options={propertyList}
                                formatOptionLabel={formatOptionLabel}
                                value={formData.property}
                                onChange={e => onChangeSelect(e, 'property')} />
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="form-group">
                            <label>Loại thời hạn chốt</label>
                            <Select
                                isMulti
                                isClearable={true}
                                placeholder="--Tất cả Thời hạn chốt--"
                                options={closeDealType}
                                value={formData.closeDealType}
                                onChange={e => onChangeSelect(e, 'closeDealType')} />
                        </div>
                    </div>
                    <div className="col-md-12">
                        <label>Thời gian chốt deal dự kiến</label>
                        <div className="form-group input-group custom-datepicker">
                            <CustomDateRangePicker
                                name="closeDate"
                                hasQuickRange={true}
                                fromDate={formData.closeDateFrom}
                                toDate={formData.closeDateTo}
                                onChange={onChangeDateRange} />
                            {errors.closeDate &&
                                <p className="title-red">Vui lòng chọn khoảng thời gian chốt deal dự kiến không quá sáu tháng</p>
                            }
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="form-group">
                            <label>Nhãn</label>
                            <Select
                                isMulti
                                isClearable={true}
                                placeholder="--Tất cả Nhãn--"
                                options={labelDealList}
                                value={formData.labelDeal}
                                onChange={e => onChangeSelect(e, 'labelDeal')} />
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="form-group group-btn">
                            <button type="button" className="btn btn-default" onClick={onClear}>Xóa bộ lọc</button>
                            <button type="button" className="btn btn-success" onClick={onSubmit}>Áp dụng</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SalesPipelineFilter;
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { getMemberList, getTeamList, getWardList, getPropertyListV2 } from 'api/list/listApi';
import { IsDisabled, Option, FormMatrix, GroupSelect, transactionList, defaultFormMatrix } from 'utils/form';
import { formatOptionLabel, handleConvertOptions } from 'utils/func';
import { BPO_BUY_SIDE } from 'constants/index';

type ExpandMatrixFilterProp = {
    permissionId: string;
    zoneList: Option[];
    departmentList: Option[];
    districtList: Option[];
    informationChannelList: Option[];
    classificationList: Option[];
    postList: Option[];
    sourceList: Option[];
    centerList: Option[];
    bpoList: Option[];
    informationSourceTotal: GroupSelect[];
    applyFilter: (filter: any) => void;
};

const ExpandMatrixFilter: React.FC<ExpandMatrixFilterProp> = (props) => {
    const [isShowed, setIsShowed] = useState<boolean>(false);
    const [isDisabled, setIsDisabled] = useState<IsDisabled>(new IsDisabled());
    const [teamList, setTeamList] = useState<Option[]>([]);
    const [memberList, setMemberList] = useState<Option[]>([]);
    const [wardList, setWardList] = useState<Option[]>([]);
    const [propertyList, setPropertyList] = useState<Option[]>([]);
    const [informationSourceList, setInformationSourceList] = useState<GroupSelect[]>([]);

    const [formMatrix, setFormMatrix] = useState<any>(defaultFormMatrix);

    const classShow = isShowed ? 'show' : '';

    const onOk = () => {
        props.applyFilter(formMatrix);
        setIsShowed(!isShowed);
    }

    const onClear = () => {
        setIsDisabled(new IsDisabled());
        setFormMatrix(defaultFormMatrix);
    }

    const onClickBtn = () => {
        setIsShowed(!isShowed);
    };

    const onChangeInput = (value: any, key: string) => {
        const state = { ...formMatrix };
        state[key] = value;
        setFormMatrix(state);
    };

    const onChangeSelect = (e: any, type: keyof FormMatrix) => {
        const state = { ...formMatrix };
        let data = defaultFormMatrix[type];
        if (e) {
            data = e;
        }
        state[type] = data;
        setFormMatrix(state);
    };

    useEffect(() => {
        if (props.permissionId) {
            const state = { ...formMatrix, team: { ...defaultFormMatrix.team }, district: { ...defaultFormMatrix.district } };
            setFormMatrix(state);
            const param = formMatrix.zone.value ? [formMatrix.zone.value] : null;
            (async () => {
                const teamList = await getTeamList(props.permissionId, param, BPO_BUY_SIDE);
                setTeamList(handleConvertOptions(teamList.data));
            })();
        }
    }, [formMatrix.zone, props.permissionId]);

    useEffect(() => {
        if (props.permissionId) {
            const state = { ...formMatrix, member: { ...defaultFormMatrix.member } };
            setFormMatrix(state);
            (async () => {
                const dataPost = {
                    zoneIds: formMatrix.zone.value ? [formMatrix.zone.value] : null,
                    teamIds: formMatrix.team.value ? [formMatrix.team.value] : null,
                    districtIds: formMatrix.district.value ? [formMatrix.district.value] : null,
                    wardIds: formMatrix.ward.value ? [formMatrix.ward.value] : null,
                    departmentIds: formMatrix.department.value ? [formMatrix.department.value] : null
                };
                const memberList = await getMemberList(props.permissionId, dataPost, BPO_BUY_SIDE);
                setMemberList(handleConvertOptions(memberList.data, 'member'));
            })();
        }
    }, [formMatrix.team, formMatrix.ward, formMatrix.department, props.permissionId]);

    useEffect(() => {
        const state = { ...formMatrix, ward: { ...defaultFormMatrix.ward } };
        setFormMatrix(state);
        (async () => {
            const param = formMatrix.district.value ? formMatrix.district.value : '-1';
            const wardList = await getWardList(param);
            setWardList(handleConvertOptions(wardList.data, 'ward'));
        })();
    }, [formMatrix.district]);

    useEffect(() => {
        const state = { ...formMatrix, property: [...defaultFormMatrix.property] };
        setFormMatrix(state);
        if (formMatrix.transaction.value) {
            setIsDisabled({ ...isDisabled, property: false });
            (async () => {
                const propertyList = await getPropertyListV2(formMatrix.transaction.value);
                setPropertyList(handleConvertOptions(propertyList.data, 'property_prefix'));
            })();
            return;
        }
        setIsDisabled({ ...isDisabled, property: true });
    }, [formMatrix.transaction]);

    useEffect(() => {
        const state = { ...formMatrix, informationSource: [...defaultFormMatrix.informationSource] };
        setFormMatrix(state);
        if (formMatrix.informationChannel.length > 0) {
            setIsDisabled({ ...isDisabled, informationSource: false });
            let options: Array<GroupSelect> = [];
            formMatrix.informationChannel.forEach((element: any) => {
                options.push(...props.informationSourceTotal.filter((item: any) => item.label === element.label));
            })
            setInformationSourceList(options);
            return;
        }
        setIsDisabled({ ...isDisabled, informationSource: true });
    }, [formMatrix.informationChannel]);

    useEffect(() => {
        const state = { ...formMatrix, center: { ...defaultFormMatrix.center } };
        setFormMatrix(state);
        if (formMatrix.source.filter((item: any) => item.value === 177).length > 0) { // source is TC
            setIsDisabled({ ...isDisabled, center: false });
            return;
        }
        setIsDisabled({ ...isDisabled, center: true });
    }, [formMatrix.source]);

    return (
        <div className="col-md-12 filter">
            <button className="btn btn-default" onClick={onClickBtn}>
                <i className="fa fa-filter" aria-hidden="true"></i>
                <span>Lọc</span>
                <i className="fa fa-sort-desc" aria-hidden="true"></i>
            </button>
            <div className={`filter-content ${classShow}`}>
                <div className="row">
                    <div className="col-md-12">
                        <div className="form-group">
                            <input className="form-control" type="text" placeholder="id: 1001, 1002"
                                value={formMatrix.id} onChange={e => onChangeInput(e.target.value, 'id')} />
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="form-group">
                            <input className="form-control" type="text" placeholder="Chủ tin đăng"
                                value={formMatrix.owner} onChange={e => onChangeInput(e.target.value, 'owner')} />
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="form-group">
                            <input className="form-control" type="text" placeholder="Số điện thoại"
                                value={formMatrix.phone} onChange={e => onChangeInput(e.target.value, 'phone')} />
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="form-group">
                            <input className="form-control" type="text" name="listingId" placeholder="Địa chỉ"
                                value={formMatrix.address} onChange={e => onChangeInput(e.target.value, 'address')} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group input-group custom-datepicker">
                            <DatePicker
                                dateFormat='dd/MM/yyyy'
                                placeholderText="Ngày Chốt BPO Từ"
                                selected={formMatrix.bpoCloseGradeDateFrom}
                                onChange={date => onChangeInput(date, 'bpoCloseGradeDateFrom')} />
                            <div className="input-group-addon">
                                <i className="fa fa-calendar"></i>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group input-group custom-datepicker">
                            <DatePicker
                                dateFormat='dd/MM/yyyy'
                                placeholderText="Ngày Chốt BPO Đến"
                                selected={formMatrix.bpoCloseGradeDateTo}
                                onChange={date => onChangeInput(date, 'bpoCloseGradeDateTo')} />
                            <div className="input-group-addon">
                                <i className="fa fa-calendar"></i>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group input-group custom-datepicker">
                            <DatePicker
                                dateFormat='dd/MM/yyyy'
                                placeholderText="Ngày Đăng Tin Từ"
                                selected={formMatrix.liveDateFrom}
                                onChange={date => onChangeInput(date, 'liveDateFrom')} />
                            <div className="input-group-addon">
                                <i className="fa fa-calendar"></i>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group input-group custom-datepicker">
                            <DatePicker
                                dateFormat='dd/MM/yyyy'
                                placeholderText="Ngày Đăng Tin Đến"
                                selected={formMatrix.liveDateTo}
                                onChange={date => onChangeInput(date, 'liveDateTo')} />
                            <div className="input-group-addon">
                                <i className="fa fa-calendar"></i>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <Select
                                isClearable={true}
                                options={props.zoneList}
                                value={formMatrix.zone}
                                onChange={e => onChangeSelect(e, 'zone')} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <Select
                                isClearable={true}
                                options={teamList}
                                value={formMatrix.team}
                                onChange={e => onChangeSelect(e, 'team')} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <Select
                                isClearable={true}
                                options={props.departmentList}
                                value={formMatrix.department}
                                onChange={e => onChangeSelect(e, 'department')} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <Select
                                isClearable={true}
                                options={memberList}
                                value={formMatrix.member}
                                onChange={e => onChangeSelect(e, 'member')} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <Select
                                isClearable={true}
                                options={transactionList}
                                value={formMatrix.transaction}
                                onChange={e => onChangeSelect(e, 'transaction')} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <Select
                                isMulti
                                placeholder="Tất cả loại hình bđs"
                                isDisabled={isDisabled.property}
                                options={propertyList}
                                formatOptionLabel={formatOptionLabel}
                                value={formMatrix.property}
                                onChange={e => onChangeSelect(e, 'property')} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <Select
                                isClearable={true}
                                options={props.districtList}
                                value={formMatrix.district}
                                onChange={e => onChangeSelect(e, 'district')} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <Select
                                isClearable={true}
                                options={wardList}
                                value={formMatrix.ward}
                                onChange={e => onChangeSelect(e, 'ward')} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <Select
                                isMulti
                                placeholder="Tất cả nguồn"
                                options={props.sourceList}
                                value={formMatrix.source}
                                onChange={e => onChangeSelect(e, 'source')} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <Select
                                isClearable={true}
                                isDisabled={isDisabled.center}
                                options={props.centerList}
                                value={formMatrix.center}
                                onChange={e => onChangeSelect(e, 'center')} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <Select
                                isMulti
                                placeholder="Tất cả kênh thông tin"
                                options={props.informationChannelList}
                                value={formMatrix.informationChannel}
                                onChange={e => onChangeSelect(e, 'informationChannel')} />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <Select
                                isMulti
                                placeholder="Tất cả nguồn thông tin"
                                isDisabled={isDisabled.informationSource}
                                options={informationSourceList}
                                value={formMatrix.informationSource}
                                onChange={e => onChangeSelect(e, 'informationSource')}
                            />
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="form-group">
                            <Select
                                isClearable={true}
                                options={props.classificationList}
                                value={formMatrix.classification}
                                onChange={e => onChangeSelect(e, 'classification')} />
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="form-group">
                            <Select
                                isClearable={true}
                                options={props.postList}
                                value={formMatrix.post}
                                onChange={e => onChangeSelect(e, 'post')} />
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="form-group">
                            <Select
                                isClearable={true}
                                options={props.bpoList}
                                value={formMatrix.bpo}
                                onChange={e => onChangeSelect(e, 'bpo')} />
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="form-group group-btn">
                            <button type="button" className="btn btn-default" onClick={onClear}>Xóa bộ lọc</button>
                            <button type="button" className="btn btn-success" onClick={onOk}>Áp dụng</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExpandMatrixFilter;
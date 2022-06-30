import React, {useEffect, useRef, useState} from 'react'
import PropTypes from 'prop-types'
import './BPOListingFilter.scss'
import {format} from 'date-fns'
import axios from 'axios'
import { BPO_URL } from '../../constants'
import {Form} from 'react-bootstrap'
import Select from 'react-select';

import { useFetchCurrentUser } from '../../hooks'
import { handleConvertOptions } from '../../utils'

const FORMAT_DATE_MOMENT = 'dd/mm/yyyy'
const FOCUS = 'focus'

const defaultForm = {
    zone: { label: '--Tất cả Zone--', value: '' },
    team: { label: '--Tất cả Team--', value: '' },
    member: { label: '--Tất cả Thành viên--', value: '' },
    bpo: { label: '--Chọn BPO--', value: '' }
};
function BPOListingFilter({filterChange, data}) {
    const [ currentUser ] = useFetchCurrentUser();
    const [permissionItem, setPermissionItem] = useState('');
    const [teamList, setTeamList] = useState([]);
    const [zoneList, setZoneList] = useState([]);
    const [memberList, setMemberList] = useState([]);
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [selectedOption, setSelectedOption] = useState({value: null, label: '-- Chọn BPO --'});
    const fromRef = useRef(null);
    const toRef = useRef(null);
    const optionsBPO = [
        {value: '', label: '-- Chọn BPO --'},
        {value: 50, label: '>= 4.5 (Bán trong 30 ngày)'},
        {value: 49, label: '< 4.5 (Bán trong 90 ngày)'},
        {value: 45, label: 'Chưa BPO'},
        {value: 46, label: 'Đã đánh giá, chưa chốt'},
        {value: 47, label: 'BPO có khác biệt'}
    ];
    const [formData, setFormData] = useState(defaultForm);

    window.handleSearchFilterBPOListing = () => {handleSearchFilter()};

    useEffect(()=> {
        if (currentUser?.data) {
            const permissionIdList = currentUser.data.permissions.filter((item) => item.actionCode === 'list' && item.entityCode === 'bpo_buy_side');
            const permissionItem = permissionIdList[permissionIdList.length - 1];
            setPermissionItem(permissionItem);
        } 
    }, [currentUser])

    useEffect(() => {
        if(permissionItem) {
            (async () => {
                const zoneList = await axios.post(`/common/get-zones`, {
                    action: permissionItem.actionCode,
                    entity: permissionItem.entityCode,
                    permissionId: permissionItem.permissionId
                });
                setZoneList(handleConvertOptions(zoneList.data.data, 'zone'));
            })();
        }
    }, [permissionItem]);

    useEffect(() => {
        if(permissionItem) {
            const state = {...formData, team: {...defaultForm.team}};
            setFormData(state);

            (async () => {
                const teamList = await axios.post(`/common/get-teams`, {
                    action: permissionItem.actionCode,
                    entity: permissionItem.entityCode,
                    permissionId: permissionItem.permissionId,
                    zoneIds: formData.zone.value ? [formData.zone.value] : null
                });
                setTeamList(handleConvertOptions(teamList.data.data, 'team'));
            })();
        }
    }, [formData.zone, permissionItem]);

    useEffect(() => {
        if(permissionItem) {
            const state = {...formData, member: {...defaultForm.member}};
            setFormData(state);
            (async () => {
                const memberList = await axios.post(`/common/get-members`, {
                    action: permissionItem.actionCode,
                    entity: permissionItem.entityCode,
                    permissionId: permissionItem.permissionId,
                    zoneIds: formData.zone.value ? [formData.zone.value] : null,
                    teamIds: formData.team.value ? [formData.team.value] : null,
                    districtIds: null,
                    wardIds: null,
                    departmentIds: null
                });
                setMemberList(handleConvertOptions(memberList.data.data, 'member'));
            })();
        }
    }, [formData.team, permissionItem]);

    const onChangeSelect = (e, type) => {
        const state = {...formData};
        let data = defaultForm[type];
        if (e) {
            data = e;
        }
        state[type] = data;
        setFormData(state);
    };

    const handleSearchFilter = () => {
        let dataPost = {
            userIds: (formData.member.value).toString(),
            zoneIds: (formData.zone.value).toString(),
            teamIds: (formData.team.value).toString(),
            labelId: formData.bpo.value, 
            fromDate: fromDate, 
            toDate: toDate
        }
        filterChange && filterChange(dataPost)
    }
    
    useEffect(() => {
        /**
         * Closure
         */
        if (data) {
            const $fromDateElement = $(fromRef.current);
            const $toDateElement = $(toRef.current);

            let dataFromDate = data.fromDate ? format(data.fromDate, 'dd/MM/yyyy') : null;
            let dataToDate = format(data.toDate, 'dd/MM/yyyy');

            // add filter from BA dashboard to BPO listings
            var url_string = window.location.href
            var url = new URL(url_string);
            var bpoCode = url.searchParams.get("bpoCode");
            if (bpoCode) {
                optionsBPO.filter((item) => {
                    if (item.value == bpoCode) {
                        onChangeSelect(item, 'bpo')
                    }
                })
                // set date follow logic have bpoCode
                // dataFromDate = null; 
                // dataToDate = new Date();
            }

            $fromDateElement.datepicker({
                format: 'dd/mm/yyyy'
            }).datepicker('setDate', dataFromDate);
            $toDateElement.datepicker({
                format: 'dd/mm/yyyy'
            }).datepicker('setDate', dataToDate);

            const to = dataToDate ? dataToDate.split('/') : null;
            const toChangeFormat = dataToDate ? `${to[1]}/${to[0]}/${to[2]}` : null;
            setToDate(toChangeFormat);

            const from = dataFromDate ? dataFromDate.split('/') : null;
            const fromChangeFormat = dataFromDate ? `${from[1]}/${from[0]}/${from[2]}` : null;
            setFromDate(fromChangeFormat);

            // on change datetime picker
            $toDateElement.datepicker({format: FORMAT_DATE_MOMENT}).on(FOCUS, e => {
                if (e.target.value) {
                    const to = e.target.value.split('/');
                    const toChangeFormat = `${to[1]}/${to[0]}/${to[2]}`;
                    setToDate(toChangeFormat);
                }
            })
            $fromDateElement.datepicker({format: FORMAT_DATE_MOMENT}).on(FOCUS, e => {
                if (e.target.value) {
                    const from = e.target.value.split('/');
                    const fromChangeFormat = `${from[1]}/${from[0]}/${from[2]}`;
                    setFromDate(fromChangeFormat);
                }
            });

            return () => {
                // $toDateElement.datepicker({ format: FORMAT_DATE_MOMENT }).off(FOCUS);
                // $fromDateElement.datepicker({ format: FORMAT_DATE_MOMENT }).off(FOCUS);
            }
        }

    }, []);

    const handleChangeFromDate = ({target}) => {
        const {value} = target;

        if (value?.length === 0) {
            setFromDate(null);
        }
    }

    const handleChangeToDate = ({target}) => {
        const {value} = target;

        if (value?.length === 0) {
            setToDate(null);
        }
    }

    return (
        <>
            <div className="row">
                <div className="col-sm-4">
                    <label htmlFor="fromDateFilter">Từ ngày</label>
                    <div className="input-group date" data-provide="datepicker" data-date-format="dd/mm/yyyy">
                        <input
                            type="text"
                            className="form-control"
                            ref={fromRef}
                            id="fromDateFilter"
                            onChange={handleChangeFromDate}
                            name="fromDateFilter"
                            autoComplete="off" placeholder="Từ ngày" />
                        <div className="input-group-addon">
                            <i className="fa fa-calendar"></i>
                        </div>
                    </div>
                </div>
                <div className="col-sm-4">
                    <label htmlFor="toDateFilter">Đến ngày</label>
                    <div className="input-group date" data-provide="datepicker" data-date-format="dd/mm/yyyy">
                        <input
                            type="text"
                            className="form-control"
                            id="toDateFilter"
                            name="toDateFilter"
                            onChange={handleChangeToDate}
                            ref={toRef}
                            autoComplete="off" placeholder="Đến ngày"/>
                        <div className="input-group-addon">
                            <i className="fa fa-calendar"></i>
                        </div>
                    </div>
                </div>

                <div className="col-sm-3">
                    <div className="filter-select">
                        <Select
                            isClearable={true}
                            options={optionsBPO}
                            value={formData.bpo}
                            onChange={e => onChangeSelect(e, 'bpo')} />
                    </div>
                </div>
                
            </div>

            <div className="row">
                <div className="col-sm-4">
                    <label htmlFor="fromDateFilter">Zone</label>
                    <Select
                        isClearable={true}
                        options={zoneList}
                        value={formData.zone}
                        onChange={e => onChangeSelect(e, 'zone')} />
                </div>
                <div className="col-sm-4">
                    <label htmlFor="toDateFilter">Team</label>
                    <Select
                        isClearable={true}
                        options={teamList}
                        value={formData.team}
                        onChange={e => onChangeSelect(e, 'team')} />
                </div>

                <div className="col-sm-3">
                    <label htmlFor="toDateFilter">Nhân viên</label>
                    <Select
                        isClearable={true}
                        options={memberList}
                        value={formData.member}
                        onChange={e => onChangeSelect(e, 'member')} />
                </div>
                <div className="col-sm-1">
                    <div>&nbsp;</div>
                    <button className="btn btn-warning btn-search" onClick={handleSearchFilter}>Tìm</button>
                </div>
            </div>
        </>
    )
}

BPOListingFilter.propTypes = {
    filterChange: PropTypes.func,
    data: PropTypes.object,
}

BPOListingFilter.defaultProps = {
    filterChange: null,
    data: {}
}

export default BPOListingFilter

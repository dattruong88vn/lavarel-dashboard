import {faCaretDown, faFilter, faSortDown, faTimes} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import DateTime from 'react-datetime';
import ListingFilter, {BsaListingDefautlFilter} from 'model/filter/ListingFilter';
import React, {useEffect, useState} from 'react';
import "react-datetime/css/react-datetime.css";
import {SelectItem} from 'model/UtilModel';
import {getChannelTypes, getDepartments, getDistricts, getMembers, getTeams, getWards, getZones, getTransactionCenters, getChannelTypeList, getPropertyTypes, getPropertyTypeLists, getListCards, getChannelInformations, getChannelInformationChilds, getListBpos} from 'api/bsa/listingApi';
import { getPropertyListV2 } from 'api/list/listApi';
import { handleConvertOptions } from 'utils/func';
import { Option } from 'utils/form';

type FilterProps = {
    filter: ListingFilter,
    onChange?: (filter: ListingFilter) => void,
    onFilter?: (filter: ListingFilter) => void
}

const BsaListingFilterPopup: React.FC<FilterProps> = (props) => {
    const [filter, setFilter] = useState<ListingFilter>(props.filter || {...BsaListingDefautlFilter});
    const [isDisplay, setIsDisplay] = useState(false);
    const [zones, setZones] = useState<Array<SelectItem>>([]);
    const [teams, setTeams] = useState<Array<SelectItem>>([]);
    const [districts, setDistricts] = useState<Array<SelectItem>>([]);
    const [wards, setWards] = useState<Array<SelectItem>>([]);
    const [departments, setDepartments] = useState<Array<SelectItem>>([]);
    const [members, setMembers] = useState<Array<SelectItem>>([]);
    const [channelTypes, setChannelTypes] = useState<Array<SelectItem>>([]);
    const [channelTypeLists, setChannelTypeLists] = useState<Array<SelectItem>>([]);
    const [propertyTypes, setPropertyTypes] = useState<Array<SelectItem>>([]);
    const [propertyTypeLists, setPropertyTypeLists] = useState<Array<Option>>([]);
    const [transactionCenters, setTransactionCenters] = useState<Array<SelectItem>>([{text: '---Tất cả Trung tâm---', value: ''}]);
    const [informationChannels, setInformationChannels] = useState<Array<SelectItem>>([{text: '---Tất cả Kênh thông tin---', value: ''}]);
    const [informationChannelChilds, setInformationChannelChilds] = useState<Array<SelectItem>>([{text: '---Tất cả Nguồn thông tin---', value: ''}]);
    const [listCards, setListCards] = useState<Array<SelectItem>>([{text: '---Tất cả---', value: ''}]);
    const [bpos, setBpos] = useState<Array<SelectItem>>([{text: '---Chọn BPO---', value: ''}]);

    useEffect(() => {
        //load zone
        (async () => {
            const filterGet = {action: "list", entity: "pos_sa", permissionId: 7};
            const res = await getZones(filterGet);
            setZones([{text: '---Tất cả Zone---', value: ''}, ...res.data.filter(i => i.departmentType === 'ZONE').map(i => {return {text: i.departmentName, value: i.departmentId}})]);
        })();
        //load propertyTypes
        (async () => {
            const res = await getPropertyTypes();
            const keys = Object.entries(res);
            setPropertyTypes([{text: '---Tất cả Loại giao dịch---', value: ''}, ...keys.map(i => {return {text: i[1], value: i[0]}})]);
        })();
        //load channelTypeLists/livetype
        (async () => {
            const res = await getChannelTypeList();
            const dt = res.data.find(i => i.type == 9);
            if (dt) {
                setChannelTypeLists([{text: '---Tất cả---', value: ''}, ...dt.list.map((i: any) => {return {text: i.name, value: i.id}})]);
                return;
            }
            setChannelTypeLists([{text: '---Tất cả---', value: ''}]);
        })();
        //load channelTypes
        (async () => {
            const res = await getChannelTypes();
            const dt = res.data.find(i => i.type == 1);
            if (dt) {
                setChannelTypes([{text: '---Tất cả Nguồn---', value: ''}, ...dt.list.map((i: any) => {return {text: i.name, value: i.id}})]);
                return;
            }
            setChannelTypes([{text: '---Tất cả Nguồn---', value: ''}]);
        })();
        //load listCard
        (async () => {
            const res = await getListCards();
            const dt = res.data.find(i => i.type == 36);
            if (dt) {
                setListCards([{text: '---Tất cả---', value: ''}, ...dt.list.map((i: any) => {return {text: i.name, value: i.id}})]);
                return;
            }
            setListCards([{text: '---Tất cả---', value: ''}]);
        })();
        //load informationChannel
        (async () => {
            const res = await getChannelInformations();
            setInformationChannels([{text: '---Tất cả Kênh thông tin---', value: ''}, ...res.data.list.map((i: any) => {return {text: i.name, value: i.id}})]);
        })();
        //load bpos
        (async () => {
            const res = await getListBpos();
            const dt = res.data.find(i => i.type == 62);
            setBpos([{text: '---Tất cả BPO---', value: ''}, ...dt.list.map((i: any) => {return {text: i.name, value: i.id}})]);
        })();
    }, []);
    useEffect(() => {
        setFilter({...filter, teamField: null, departmentField: null, districtId: -1});
        //load team
        (async () => {
            const filterGet = {
                action: "list",
                entity: "pos_sa",
                permissionId: 7,
                zoneIds: filter.zoneField ? [filter.zoneField] : null
            };
            const res = await getTeams(filterGet);
            setTeams([{text: '---Tất cả Team---', value: ''}, ...res.data.filter(i => i.departmentType === 'GROUP').map(i => {return {text: i.departmentName, value: i.departmentId}})]);
        })();
        //load deaprtment
        (async () => {
            const filterGet = {
                action: "list",
                entity: "pos_sa",
                permissionId: 7,
                zoneIds: filter.zoneField ? [filter.zoneField] : null
            };
            const res = await getDepartments(filterGet);
            setDepartments([{text: '---Tất cả Phòng ban---', value: ''}, ...res.data.filter(i => i.departmentType === 'DEPARTMENT').map(i => {return {text: i.departmentName, value: i.departmentId}})]);
        })();
        //load district
        (async () => {
            const res = await getDistricts();
            setDistricts([{text: '---Tất cả Quận---', value: -1}, ...res.data.map(i => {return {text: i.districtName, value: i.districtId}})]);
        })();
    }, [filter.zoneField]);

    //load member
    useEffect(() => {
        setFilter({...filter, memberField: null});
        (async () => {
            const filterGet = {
                action: "list",
                entity: "pos_sa",
                permissionId: 7,
                zoneIds: filter.zoneField ? [filter.zoneField] : null,
                teamIds: filter.teamField ? [filter.teamField] : null,
                districtIds: filter.districtId ? [filter.districtId] : null,
                wardIds: filter.wardId ? [filter.wardId] : null,
                departmentIds: filter.departmentField ? [filter.departmentField] : null,
            };
            const res = await getMembers(filterGet);
            setMembers([{text: '---Tất cả Thành viên---', value: ''}, ...res.data.map(i => {return {text: i.name, value: i.userId}})]);
        })();
    }, [filter.zoneField, filter.departmentField, filter.teamField, filter.wardId, filter.districtId]);

    //load ward
    useEffect(() => {
        setFilter({...filter, wardId: null});
        (async () => {
            const res = await getWards(filter.districtId || -1);
            setWards([{text: '---Tất cả Phường---', value: ''}, ...res.data.map(i => {return {text: i.wardName, value: i.wardId}})]);
        })();
    }, [filter.districtId]);

    //load propertyTypeList
    useEffect(() => {
        setFilter({...filter, propertyTypeIds: null});
        (async () => {
            const response = await getPropertyListV2(filter.listingTypeId);
            const propertyList = response.data;
            setPropertyTypeLists(handleConvertOptions(propertyList, 'property_prefix'));
        })();
    }, [filter.listingTypeId]);

    //load transactionCenter
    useEffect(() => {
        setFilter({...filter, tcId: null});
        if (filter.sourceId == 177) {
            (async () => {
                const res = await getTransactionCenters();
                setTransactionCenters([{text: '---Tất cả Trung tâm---', value: ''}, ...res.data.map((i: any) => {return {text: i.name, value: i.tcId}})]);
            })();
            return;
        }
        setTransactionCenters([{text: '---Tất cả Trung tâm---', value: ''}]);
    }, [filter.sourceId]);
    //load informationChannelChild
    useEffect(() => {
        setFilter({...filter, channelTypeChildIds: null});
        (async () => {
            const res = await getChannelInformationChilds(filter.channelTypeIds);
            setInformationChannelChilds([{text: '---Tất cả Nguồng thông tin---', value: ''}, ...res.data.list.map((i: any) => {return {text: i.name, value: i.id}})]);
        })();
    }, [filter.channelTypeIds]);

    useEffect(() => {
        setFilter(props.filter);
    }, [props.filter]);

    useEffect(() => {
        console.log(filter, '------filter bsa')
    }, [filter]);
    return (
        <>
            <div className="filter-button">
                <button type="button" onClick={e => setIsDisplay(!isDisplay)} className="form-control"><FontAwesomeIcon icon={faFilter}></FontAwesomeIcon> Lọc <FontAwesomeIcon icon={faCaretDown}></FontAwesomeIcon></button>
                <div>
                    {isDisplay && <div className="panel panel-default filter-box">
                        <div className="panel-body">
                            <div className="row" style={{height: '15px'}}>
                                <a className="filter-closed" href="javascript:void(0)" onClick={e => setIsDisplay(false)}><FontAwesomeIcon icon={faTimes} /></a>
                                <div style={{clear: 'both'}}></div>
                            </div>
                            <div className="row">
                                <div className="form-group">
                                    <input className="form-control" type={'text'} placeholder="Id: 1001, 1002" name="rlistingId" value={filter.rlistingId || null} onChange={(e: any) => {setFilter({...filter, rlistingId: e.target.value})}} />
                                </div>
                                <div className="form-group">
                                    <input className="form-control" type={'text'} placeholder="Chủ tin đăng" name="owner-name" value={filter.ownerName || null} onChange={(e: any) => {setFilter({...filter, ownerName: e.target.value})}} />
                                </div>
                                <div className="form-group">
                                    <input className="form-control" type={'text'} placeholder="Số điện thoại" name="phone" value={filter.phone || null} onChange={(e: any) => {setFilter({...filter, phone: e.target.value})}} />
                                </div>
                                <div className="form-group">
                                    <input className="form-control" type={'text'} placeholder="Địa chỉ" name="address" value={filter.address || null} onChange={(e: any) => {setFilter({...filter, address: e.target.value})}} />
                                </div>
                                <div className="form-group">
                                    <DateTime className="col-md-6 date-range-inline" inputProps={{placeholder: 'Từ'}} timeFormat={false} value={new Date(filter.fromAssignedDate || '')} dateFormat={'DD/MM/YYYY'} onChange={(e: any) => {setFilter({...filter, fromAssignedDate: e})}} />
                                    <DateTime className="col-md-6 date-range-inline" inputProps={{placeholder: 'Đến'}} timeFormat={false} value={new Date(filter.toAssignedDate || '')} dateFormat={'DD/MM/YYYY'} onChange={(e: any) => {setFilter({...filter, toAssignedDate: e})}} />
                                    <div style={{clear: 'both'}}></div>
                                </div>
                                <div className="form-group">
                                    <div className="col-md-6 date-range-inline">
                                        <select value={filter.zoneField} name="zoneField" className="form-control" onChange={e => setFilter({...filter, zoneField: e.target.value})}>
                                            {zones.map(i => <option value={i.value}>{i.text}</option>)}
                                        </select>
                                    </div>
                                    <div className="col-md-6 date-range-inline">
                                        <select name="teamField" value={filter.teamField} className="form-control" onChange={e => setFilter({...filter, teamField: e.target.value})}>
                                            {teams.map(i => <option value={i.value}>{i.text}</option>)}
                                        </select>
                                    </div>
                                    <div style={{clear: 'both'}}></div>
                                </div>
                                <div className="form-group">
                                    <div className="col-md-6 date-range-inline">
                                        <select name="districtId" value={filter.districtId} className="form-control" onChange={e => setFilter({...filter, districtId: e.target.value})}>
                                            {districts.map(i => <option value={i.value}>{i.text}</option>)}
                                        </select>
                                    </div>
                                    <div className="col-md-6 date-range-inline">
                                        <select name="wardId" value={filter.wardId} className="form-control" onChange={e => setFilter({...filter, wardId: e.target.value})}>
                                            {wards.map(i => <option value={i.value}>{i.text}</option>)}
                                        </select>
                                    </div>
                                    <div style={{clear: 'both'}}></div>
                                </div>
                                <div className="form-group">
                                    <div className="col-md-6 date-range-inline">
                                        <select name="departmentField" value={filter.departmentField} className="form-control" onChange={e => setFilter({...filter, departmentField: e.target.value})}>
                                            {departments.map(i => <option value={i.value}>{i.text}</option>)}
                                        </select>
                                    </div>
                                    <div className="col-md-6 date-range-inline">
                                        <select name="memberField" value={filter.memberField} className="form-control" onChange={e => setFilter({...filter, memberField: e.target.value})}>
                                            {members.map(i => <option value={i.value}>{i.text}</option>)}
                                        </select>
                                    </div>
                                    <div style={{clear: 'both'}}></div>
                                </div>
                                <div className="form-group">
                                    <div className="col-md-6 date-range-inline">
                                        <select name="liveType" className="form-control" onChange={e => setFilter({...filter, liveType: e.target.value})}>
                                            {channelTypeLists.map(i => <option value={i.value}>{i.text}</option>)}
                                        </select>
                                    </div>
                                    <div className="col-md-6 date-range-inline">
                                        <select name="scorecardType" className="form-control" onChange={e => setFilter({...filter, scorecardType: e.target.value})}>
                                            {listCards.map(i => <option value={i.value}>{i.text}</option>)}
                                        </select>
                                    </div>
                                    <div style={{clear: 'both'}}></div>
                                </div>
                                <div className="form-group">
                                    <div className="col-md-6 date-range-inline">
                                        <select name="listingTypeId" className="form-control" onChange={e => setFilter({...filter, listingTypeId: e.target.value})}>
                                            {propertyTypes.map(i => <option value={i.value}>{i.text}</option>)}
                                        </select>
                                    </div>
                                    <div className="col-md-6 date-range-inline">
                                        <select name="propertyTypeIds" disabled={propertyTypeLists.length <= 1} className="form-control" onChange={e => setFilter({...filter, propertyTypeIds: e.target.value})}>
                                            {/* {propertyTypeLists.map(i => <option value={i.value}>{i.text}</option>)} */}
                                        </select>
                                    </div>
                                    <div style={{clear: 'both'}}></div>
                                </div>
                                <div className="form-group">
                                    <div className="col-md-6 date-range-inline">
                                        <select name="sourceId" className="form-control" onChange={e => setFilter({...filter, sourceId: e.target.value})}>
                                            {channelTypes.map(i => <option value={i.value}>{i.text}</option>)}
                                        </select>
                                    </div>
                                    <div className="col-md-6 date-range-inline">
                                        <select name="tcId" className="form-control" disabled={transactionCenters.length <= 1} onChange={e => setFilter({...filter, tcId: e.target.value, tcid: e.target.value})}>
                                            {transactionCenters.map(i => <option value={i.value}>{i.text}</option>)}
                                        </select>
                                    </div>
                                    <div style={{clear: 'both'}}></div>
                                </div>
                                <div className="form-group">
                                    <div className="col-md-6 date-range-inline">
                                        <select name="channelTypeIds" className="form-control" onChange={e => setFilter({...filter, channelTypeIds: e.target.value})}>
                                            {informationChannels.map(i => <option value={i.value}>{i.text}</option>)}
                                        </select>
                                    </div>
                                    <div className="col-md-6 date-range-inline">
                                        <select name="channelTypeChildIds" className="form-control" disabled={!filter.channelTypeIds} onChange={e => setFilter({...filter, channelTypeChildIds: e.target.value})}>
                                            {informationChannelChilds.map(i => <option value={i.value}>{i.text}</option>)}
                                        </select>
                                    </div>
                                    <div style={{clear: 'both'}}></div>
                                </div>
                                <div className="form-group">
                                    <div className="col-md-6 date-range-inline">
                                        <select name="bpo" className="form-control" onChange={e => setFilter({...filter, bpo: e.target.value})}>
                                            {bpos.map(i => <option value={i.value}>{i.text}</option>)}
                                        </select>
                                    </div>
                                    <div style={{clear: 'both'}}></div>
                                </div>
                            </div>
                            <hr />
                            <div className="row" style={{textAlign: 'right'}}>
                                <button type="button" className="btn btn-default" name="LFclearFilter" onClick={e => {
                                    setFilter(BsaListingDefautlFilter);
                                }}>Xóa bộ lọc</button>
                                &nbsp;
                                <button type="button" className="btn btn-success" name="LFapplyFilter" onClick={e => {
                                    if (props.onFilter) {
                                        props.onFilter(filter);
                                    }
                                    setIsDisplay(false);
                                }}>Áp dụng</button>
                            </div>
                        </div>
                    </div>}
                </div>
            </div>
        </>
    )
};

export default BsaListingFilterPopup;

import React, { useState } from 'react';
import {CustomWindow} from '../../../utils/generic'

const _Window = (window as any).Window;
const listingTypeList = [
    {label:'--Tất cả loại giao dịch--', value:''},
    { label: 'Mua', value: 1 },
    { label: 'Thuê', value: 2 }
];

declare const window: CustomWindow

const BtnFilterBar: React.FC<{}> = () => {
    const [isShowed, setIsShowed] = useState<boolean>(false);
    const classShow = isShowed ? 'show' : '';

    const onClickBtn = () => {
        setIsShowed(!isShowed);
    };

    window.closeFilterInTypescript = () => {
        setIsShowed(false);
    }

    const clearFilter = () => {
        if(!$('.modal-expand-matrix').hasClass("in")){ // for list deal
            _Window.CRMReassignDeals.resetFilter();
            // _Window.CRMReassignDeals.reloadList();
            return;
        }
        _Window._ListDealMatrix.resetFilter(); // for expand matrix
        // _Window._ListDealMatrix.reloadList();
    }

    return (
        <div className="filter">
            <button className="btn btn-default" onClick={onClickBtn}>
                <i className="fa fa-filter" aria-hidden="true"></i>
                <span>Lọc</span>
                <i className="fa fa-sort-desc" aria-hidden="true"></i>
            </button>
            <div className={`filter-content ${classShow}`}>
                <label>Thời gian</label>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <input type="text" className="form-control fromDate"  placeholder="Từ ngày"/>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <input type="text" className="form-control toDate" placeholder="Đến ngày"/>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="form-group">
                            <label>DealId</label>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <input type="text" className="form-control" id="inputDealId"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="form-group">
                            <label>Zone</label>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <select id="zoneField" name="zoneField" className="form-control">
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="form-group">
                            <label>Team</label>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <select id="teamField" name="teamField" className="form-control">
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="form-group">
                            <label>Quận</label>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <select id="districtId" name="districtId" className="form-control">
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="form-group">
                            <label>Phường</label>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <select id="wardId" name="wardId" className="form-control">
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="form-group">
                            <label>Phòng ban</label>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <select id="departmentField" name="departmentField" className="form-control">
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="form-group">
                            <label>Nhân viên</label>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <select id="memberField" name="memberField" className="form-control">
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="form-group">
                            <label>Hình thức giao dịch</label>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <select id="listingTypeId" name="listingTypeId" className="form-control">
                                            {listingTypeList.map(item => {
                                                return (<option value={item.value}>{item.label}</option>)
                                            })}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="form-group">
                            <label>Loại BĐS</label>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <select name="propertyTypeId" id="propertyTypeId" className="form-control">
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="form-group">
                            <label>Nhãn</label>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <select name="scoreCardType" id="scoreCardType" className="form-control">
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="form-group">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group group-btn">
                                        <button type="button" onClick={clearFilter} className="btn btn-default">Xóa bộ lọc</button>
                                        <button type="button" id="btn_filter_button_deal" className="btn btn-success">
                                            Áp dụng
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BtnFilterBar;
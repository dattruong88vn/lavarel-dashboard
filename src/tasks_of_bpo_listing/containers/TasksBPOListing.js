import React, { useState, useEffect } from 'react';
import { BPOListOfListing, BPOListingFilter } from '../components';
import { useFetchTaskOfBPOListing, useFetchCountListing } from '../hooks';
import { BPO_URL } from '../constants';
import { getLastDateFromCurrentMonth, getStartDateFromCurrentMonth } from '../utils';
import Pagination from "react-js-pagination";
import './TasksBPOListing.scss';

const initParams = {
    page: 1,
    pageSize: 10,
    labelId: null,
    fromDate: getStartDateFromCurrentMonth(),
    toDate: getLastDateFromCurrentMonth(),
    teamIds: null,
    zoneIds: null,
    userIds: null
}

const RECORD_OPTIONS = [
    {
        value: 10,
        label: '10 records'
    }, {
        value: 25,
        label: '25 records'
    }, {
        value: 50,
        label: '50 records'
    }
]

function TasksBPOListing() {
    // add filter from BA dashboard to BPO listings
    var url_string = window.location.href;
    var url = new URL(url_string);
    var bpoCode = url.searchParams.get("bpoCode");
    if (bpoCode) {
        initParams.fromDate = null;
        initParams.toDate = new Date();
        initParams.labelId = bpoCode;
    }

    const [params, setParams] = useState(initParams);
    const [resource] = useFetchTaskOfBPOListing(params);
    const [resourceCount] = useFetchCountListing(BPO_URL.BPO_FETCH_COUNT_LISTING, params);

    const handleFilterChange = model => {
        // clone params resource !
        const cloneParams = { ...params, 
            fromDate: model.fromDate, 
            toDate: model.toDate, 
            labelId: model.labelId, 
            teamIds: model.teamIds, 
            zoneIds: model.zoneIds, 
            userIds: model.userIds, 
            page: 1 
        };

        // search effects !
        setParams(cloneParams)
    };

    const handleChangeRecords = event => {
        const value = event.target.value

        const cloneParams = { ...params, page: 1, pageSize: Number(value) }

        setParams(cloneParams)
    };

    const handlePaginationClick = pagi => {
        const value = pagi

        if (value === params.page) {
            return
        }

        // effect search
        setParams({ ...params, page: value })
    };

    const handleOnReloadData = () => {
        setParams({ ...params })
    };

    const getCurrentRecords = () => {
        const totalRecords = resourceCount.count;
        const currentPage = Number(params.page);
        const limit = Number(params.pageSize);
        const number = (totalRecords - ((currentPage - 1 ) * limit)) > limit ? limit : (totalRecords - ((currentPage - 1 ) * limit));
        const start = ((currentPage - 1) * limit) + 1;
        const end = ((currentPage - 1) * limit) + number;
        return {start, end};
    };

    return (
        <div>
            <div className="box box-primary">
                <div className="box-body">
                    <ul className="nav nav-tabs nav__listing">
                        <li className="active">
                            <a >Mua</a>
                        </li>
                    </ul>
                    <BPOListingFilter data={params} filterChange={handleFilterChange} />
                </div>
            </div>

            <div className="box box-primary">
                <div className="box-body">
                    <div className="box-header ">
                        <h3 className="box-title">Danh sách Listings BPO</h3>
                    </div>

                    <div className="tasks-container">
                        <BPOListOfListing
                            reloadData={handleOnReloadData}
                            loading={resource.loading}
                            data={resource.data}>
                        </BPOListOfListing>

                        {(!resourceCount.loading && resourceCount.count > 0) && <div className="filter-pagination">
                            <div>
                                Hiển thị {getCurrentRecords().start} đến {getCurrentRecords().end} của {resourceCount.count}
                            </div>
                            <Pagination
                                activePage={params.page}
                                itemsCountPerPage={params.pageSize}
                                totalItemsCount={resourceCount.count}
                                pageRangeDisplayed={5}
                                innerClass={`pagination pagination-sm`}
                                onChange={(page)=>{handlePaginationClick(page)}}
                            />
                        </div>
                        }
                    </div>

                    <div className="filter-records">
                        <span className="p-r-xxs">Hiển thị</span>
                        <select
                            name="records"
                            onChange={handleChangeRecords}
                            className="form-control input-sm filter-records__select">
                            {RECORD_OPTIONS.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
                        </select>
                        <span className="p-l-xxs">trên 1 trang</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TasksBPOListing;

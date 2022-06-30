import React, { useState, useEffect } from 'react';
import { getListingDealMatrix, getTotalRecordsDealMatrix } from 'api/list/listApi';
import { DataDealMatrixModel, DataPostGetListingDealMatrix } from 'model/listing/ListingModel';
import ExpandMatrixFilter from './ExpandMatrixFilter';
import { Paging } from 'components/utils/Paging';
import { Option, GroupSelect } from 'utils/form';
import { CODE_LISTING_DOES_NOT_HAVE_BPO, CODE_LISTING_IN_MONTH, CODE_LISTING_NINETY_DAYS } from 'constants/index';

const listings = [
    { name: 'Listings Bán Trong 30 Ngày', code: CODE_LISTING_IN_MONTH }, 
    { name: 'Listings 90 Ngày', code: CODE_LISTING_NINETY_DAYS }, 
    { name: 'Listings Chưa Có Điểm BPO', code: CODE_LISTING_DOES_NOT_HAVE_BPO }
];

type ModalProps = {
    renderModalDeals: Function;
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
}

const ExpandMatrix: React.FC<ModalProps> = (props) => {
    const {permissionId, zoneList, departmentList, districtList, informationChannelList, classificationList, postList, sourceList, centerList, bpoList, informationSourceTotal } = props; 
    const [filter, setFilter] = useState<DataPostGetListingDealMatrix>(new DataPostGetListingDealMatrix(CODE_LISTING_IN_MONTH));
    const [deals, setDeals] = useState<Array<DataDealMatrixModel>>([]);
    const [totalRecords, setTotalRecords] = useState<number>(0);
    const [limit, setLimit] = useState(10);

    const applyFilter = (formMatrix: any) => {
        const { id, bpo, informationSource, owner, source, center, phone, address, zone, team, department, member, transaction, property, district, ward, classification, post, bpoCloseGradeDateFrom, bpoCloseGradeDateTo, liveDateFrom, liveDateTo } = formMatrix;
        const newFilter = {
            rlistingId: id ? [parseInt(id)] : null,
            filterBPOCode: bpo.value ? bpo.value: null,
            channelTypeIds: informationSource.length > 0 ? informationSource.map((item: any) => item.value).join() : null,
            ownerName: owner ? owner: null,
            sourceId: source.length > 0 ? source.map((item: any) => item.value).join() : null,
            tcid: center.length > 0 ? center.map((item: any) => item.value).join() : null,
            phone: phone ? phone : null,
            address: address ? address : null,
            zoneIds: zone.value ? zone.value.toString() : null,
            teamIds: team.value ? team.value : null,
            departmentIds: department.value ? department.value.toString() : null,
            userIds: member.value ? member.value : null,
            bpoCloseGradeDateFrom: bpoCloseGradeDateFrom ? bpoCloseGradeDateFrom.setHours(0,0,0,0) : null,
            bpoCloseGradeDateTo: bpoCloseGradeDateTo ? bpoCloseGradeDateTo.setHours(23,59,59,999) : null,
            liveDateFrom: liveDateFrom ? liveDateFrom.setHours(0,0,0,0) : null,
            liveDateTo: liveDateTo ? liveDateTo.setHours(23,59,59,999) : null,
            listingTypeId: transaction.value ? transaction.value : null,
            propertyTypeIds: property.length > 0 ? property.map((item: any) => item.value).join() : null,
            districtId: district.value ? district.value.toString() : null,
            wardId: ward.value ? ward.value.toString() : null,
            scorecardType: classification.value ? classification.value : null,
            liveType: post.value ? post.value : null,
            filterBPOCodeTab: filter.filterBPOCodeTab,
            fromBSA: true
        };
        setFilter(newFilter);
    };

    const onPageChanged = async (paginationData: any) => {  
        const deals = await getListingDealMatrix(paginationData.currentPage, limit, filter);
        setDeals(deals.data);
    };

    useEffect(() => {
        (async () => {
            const newTotalRecords = await getTotalRecordsDealMatrix(filter);
            setTotalRecords(newTotalRecords.data);
        })();
    }, [filter]);

    useEffect(() => {
        (async () => {
            const deals = await getListingDealMatrix('1', limit, filter);
            setDeals(deals.data);
        })();
    }, [limit, filter]);

    const nav = listings.map((item, index) => {
        const classActive = item.code === filter.filterBPOCodeTab ? 'active' : '';
        return (
            <li key={index} className={`nav-item ${classActive}`} onClick={() => setFilter({...filter, filterBPOCodeTab: item.code})}>{item.name}</li>
        )
    });

    const dealsData = deals.length > 0 ? deals.map((item: any, index: number) => {
        return (
            <tr key={index}>
                <td>{item.rlistingId}</td>
                <td>{item.formatedPrice}</td>
                <td>
                    {item.deals[0].status.map((element:any, key: number) => {
                        const lastIndex = item.deals[0].status.length - 1;
                        return <>
                            <span>{element.statusName} (</span>
                            {element.owner > 0 ? 
                                <a onClick={() => props.renderModalDeals(item.rlistingId, element.dealIds)}>
                                    {element.owner}
                                </a> :
                                <span>{element.owner}</span>
                            }
                            {(element.statusId === 25 || element.statusId === 26 || element.statusId === 29) &&
                                <>
                                    <span>/</span>
                                    <a onClick={() => props.renderModalDeals(item.rlistingId, element.allDealIds)}>
                                        {element.all}
                                    </a>
                                </>
                            }
                            <span>){lastIndex !== key ? ', ' : ''}</span>
                        </> 
                    })}
                </td>
                <td className="table-last-td-width">
                    {item.deals[1].status.map((element:any, key: number) => {
                        const lastIndex = item.deals[1].status.length - 1;
                        return <>
                            <span>{element.statusName} (</span>
                            {element.owner > 0 ? 
                                <a onClick={() => props.renderModalDeals(item.rlistingId, element.dealIds)}>
                                    {element.owner}
                                </a> :
                                <span>{element.owner}</span>
                            }
                            {(element.statusId === 25 || element.statusId === 26 || element.statusId === 29) &&
                                <>
                                    <span>/</span>
                                    <a onClick={() => props.renderModalDeals(item.rlistingId, element.allDealIds)}>
                                        {element.all}
                                    </a>
                                </>
                            }
                            <span>){lastIndex !== key ? ', ' : ''}</span>
                        </> 
                    })}
                </td>
            </tr>
        )
    }) : '';

    return (
        <div className="row">
            <div className="col-md-2">
                <ul className="nav flex-column">
                    {nav}
                </ul>
            </div>
            <div className="col-md-10">
                <div className="panel panel-matrix">
                    <div className="row">
                        <ExpandMatrixFilter applyFilter={applyFilter}
                            permissionId={permissionId} zoneList={zoneList} departmentList={departmentList} districtList={districtList} 
                            informationChannelList={informationChannelList} classificationList={classificationList} postList={postList} 
                            sourceList={sourceList} centerList={centerList} bpoList={bpoList} informationSourceTotal={informationSourceTotal} />
                        <div className="col-md-12">
                            <div className="label-box">
                                <div className="column-label">Deals Trong Tháng</div>
                                <div className="column-label">Deals 90 Ngày</div>
                            </div>
                            
                            <table className="table table-striped custom-table-bordered">
                                <tbody>
                                    <tr>
                                        <td>ListingID</td>
                                        <td>Giá</td>
                                        <td>Trong BST của Deals</td>
                                        <td className="table-last-td-width">Trong BST của Deals</td>
                                    </tr>
                                    {dealsData}
                                </tbody>
                            </table>
                        </div>
                        <div className="col-md-12">
                            <div className="pagination-row">
                                <div className="limit-records">
                                    Hiển thị &nbsp;
                                    <select name="limit" value={limit} onChange={e => setLimit(parseInt(e.target.value))}>
                                        <option value="10">10 records</option>
                                        <option value="20">20 records</option>
                                        <option value="30">30 records</option>
                                    </select>
                                    &nbsp; trên 1 trang
                                </div>
                                <Paging filter={filter} limit={limit} totalRecords={totalRecords} onPageChanged={onPageChanged} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExpandMatrix;
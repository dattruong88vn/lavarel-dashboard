import React, { useState, useEffect } from 'react';
import ExpandMatrix from './ExpandMatrix';
import ShortcutMatrixFilter from './ShortcutMatrixFilter';
import Modals from "components/utils/Modals";
import { getCurrentUser } from 'api/user/userApi';
import * as listApi from 'api/list/listApi';
import { DataDealMatrixModel, DataPostGetListingDealMatrix } from 'model/listing/ListingModel';
import { Option, GroupSelect } from 'utils/form';
import { handleConvertOptions, handleConvertGroupOptions } from 'utils/func';
import * as constants from 'constants/index';
import { CODE_LISTING_IN_MONTH, CODE_LISTING_NINETY_DAYS, BPO_BUY_SIDE, BPO } from 'constants/index';
import Chart from './Chart';

const BpoBuySide: React.FC<{}> = () => {
    // Listing
    const [permissionIdBpo, setPermissionIdBpo] = useState<string>('');
    const [permissionDealText, setPermissionDealText] = useState<string>('');
    const [zoneList, setZoneList] = useState<Array<Option>>([]);
    const [departmentList, setDepartmentList] = useState<Array<Option>>([]);
    const [districtList, setDistrictList] = useState<Array<Option>>([]);
    const [informationChannelList, setInformationChannelList] = useState<Array<Option>>([]);
    const [classificationList, setClassificationList] = useState<Array<Option>>([]);
    const [postList, setPostList] = useState<Array<Option>>([]);
    const [sourceList, setSourceList] = useState<Array<Option>>([]);
    const [centerList, setCenterList] = useState<Array<Option>>([]);
    const [bpoList, setBpoList] = useState<Array<Option>>([]);
    const [informationSourceTotal, setInformationSourceTotal] = useState<Array<GroupSelect>>([]);
    
    // Matrix collapse
    const [filterState, setFilterState] = useState<DataPostGetListingDealMatrix>(new DataPostGetListingDealMatrix(constants.CODE_LISTING_IN_MONTH, false));
    const [filterState90, setFilterState90] = useState<DataPostGetListingDealMatrix>(new DataPostGetListingDealMatrix(constants.CODE_LISTING_NINETY_DAYS, false));
    const [matrixs, setMatrixs] = useState<DataDealMatrixModel[]>([]);
    const [matrixs90, setMatrixs90] = useState<DataDealMatrixModel[]>([]);
    const [isToggleExpandMatrix, setIsToggleExpandMatrix] = useState(false)
    const [showTable, setShowTable] = useState<boolean>(false);
    const [initTab,setInitTab] = useState<any>(CODE_LISTING_IN_MONTH);

    const _Window = (window as any).Window;
    const _window = (window as any).window;

    useEffect(() => {
        (async () => {
            const currentUser = await getCurrentUser();
            const permissionIdBpoList = currentUser.permissions.filter((item: any) => item.actionCode === 'list' && item.entityCode === 'bpo_buy_side');
            const permissionIdBpo = permissionIdBpoList[permissionIdBpoList.length - 1].permissionId;
            setPermissionIdBpo(permissionIdBpo);
            const permissionIdDealList = currentUser.permissions.filter((item: any) => item.actionCode === 'list' && item.entityCode === 'deal');
            const permissionIdDeal = permissionIdDealList[0].permissionId;
            let permissionDealText;
            switch (permissionIdDeal) {
                case 3:
                    permissionDealText = 'Của Phòng Ban';
                    break;
                case 5: 
                    permissionDealText = 'Của Tất cả';
                    break;
                case 7:
                    permissionDealText = 'Của Team';
                    break;
                case 8:
                    permissionDealText = 'Của Zone';
                    break;
                default:
                    permissionDealText = 'Của Tôi';            
            }
            setPermissionDealText(permissionDealText); 
            (async () => {
                const zoneList = await listApi.getZoneList(permissionIdBpo, BPO_BUY_SIDE);
                setZoneList(handleConvertOptions(zoneList.data));
            })();
            (async () => {
                const departmentList = await listApi.getDepartmentList(permissionIdBpo, BPO);
                setDepartmentList(handleConvertOptions(departmentList.data));
            })();
            (async () => {
                const districtList = await listApi.getDistrictList('1');
                setDistrictList(handleConvertOptions(districtList.data, 'district'));
            })();
            (async () => {
                const informationChannelList = await listApi.getInformationChannelList('0','0');
                setInformationChannelList(handleConvertOptions(informationChannelList.data.list, 'information'));
            })();
            (async () => {
                const classificationList = await listApi.getChannelType('36');
                setClassificationList(handleConvertOptions(classificationList.data[0].list, 'classification'));
            })();
            (async () => {
                const postList = await listApi.getSellerChannelType('9');
                setPostList(handleConvertOptions(postList.data[0].list, 'post'));
            })();
            (async () => {
                const sourceList = await listApi.getPrescreenChannelType();
                setSourceList(handleConvertOptions(sourceList.data[0].list, 'source'));
            })();
            (async () => {
                const bpoList = await listApi.getChannelType('62');
                setBpoList(handleConvertOptions(bpoList.data[0].list, 'bpo'));
            })();
            (async () => {
                const informationSourceTotal = await listApi.getInformationSourceList('1', '0');
                setInformationSourceTotal(handleConvertGroupOptions(informationSourceTotal.data.list, 'informationSource'));
            })();
            (async () => {
                const centerList = await listApi.getCenterList();
                setCenterList(handleConvertOptions(centerList.data, 'center'));
            })();
        })();
    }, []);

    useEffect(() => {
        (async () => {
            const respMatrix = await listApi.getListingDealMatrix('1', '5', filterState);
            const lenghtData:any = respMatrix.data.length;
            if(lenghtData <= 5){
                for(var i = 0; i < (5 - lenghtData); i++){
                    respMatrix.data.push({rlistingId:0,formatedPrice:"",deals:[{name:"Deals Trong Tháng",status:[]},{name:"Deals 90 Ngày",status:[]}]});
                }
            }
            setMatrixs(respMatrix.data);
        })();
    }, [filterState]);

    useEffect(() => {
        (async () => {
            const respMatrix = await listApi.getListingDealMatrix('1', '5', filterState90);
            const lenghtData:any = respMatrix.data.length;
            if(lenghtData <= 5){
                for(var i = 0; i < (5 - lenghtData); i++){
                    respMatrix.data.push({rlistingId:0,formatedPrice:"",deals:[{name:"Deals Trong Tháng",status:[]},{name:"Deals 90 Ngày",status:[]}]});
                }
            }
            setMatrixs90(respMatrix.data);
        })();
    }, [filterState90]);

    const applyFilter = (filter: any): void => {
        const arrRlistingId = (filter.id && filter.id != '') ? filter.id.split(',').map((item:any) => parseInt(item)) : null;
        setFilterState({
            rlistingId: arrRlistingId,
            bpoCloseGradeDateFrom: filter.bpoCloseGradeDateFrom ? filter.bpoCloseGradeDateFrom.setHours(0,0,0,0) : null,
            bpoCloseGradeDateTo: filter.bpoCloseGradeDateTo ? filter.bpoCloseGradeDateTo.setHours(23,59,59,999) : null,
            listingTypeId: filter.transaction.value ? filter.transaction.value : null,
            propertyTypeIds: filter.property.length > 0 ? filter.property.map((item: any) => item.value).join() : null,
            districtId: filter.district.value ? filter.district.value : null,
            wardId: filter.ward.value ? filter.ward.value : null,
            scorecardType: filter.classification.value ? filter.classification.value : null,
            liveType: filter.post.value ? filter.post.value : null,
            filterBPOCodeTab: constants.CODE_LISTING_IN_MONTH,
            fromBSA: false
        })
        setFilterState90({
            rlistingId: arrRlistingId,
            bpoCloseGradeDateFrom: filter.bpoCloseGradeDateFrom ? filter.bpoCloseGradeDateFrom.setHours(0,0,0,0) : null,
            bpoCloseGradeDateTo: filter.bpoCloseGradeDateTo ? filter.bpoCloseGradeDateTo.setHours(23,59,59,999) : null,
            listingTypeId: filter.transaction.value ? filter.transaction.value : null,
            propertyTypeIds: filter.property.length > 0 ? filter.property.map((item: any) => item.value).join() : null,
            districtId: filter.district.value ? filter.district.value : null,
            wardId: filter.ward.value ? filter.ward.value : null,
            scorecardType: filter.classification.value ? filter.classification.value : null,
            liveType: filter.post.value ? filter.post.value : null,
            filterBPOCodeTab: constants.CODE_LISTING_NINETY_DAYS,
            fromBSA: false
        });
    };

    const renderModalDeals = (dealIds: any,tab:any = null) => 
    {
        _window.showPropzyLoadingBPO();
        switch (tab) { //trigger active tab
            case 30:
                setInitTab(CODE_LISTING_IN_MONTH);
                break;
            case 90:
                setInitTab(CODE_LISTING_NINETY_DAYS);
                break;
        
            default:
                break;
        }
        setIsToggleExpandMatrix(true);        
        setShowTable(true); // show table deal
        setTimeout(() => { // load table from filter
            _Window._ListDealMatrix.resetFilter();
            $(".modal-expand-matrix .filter-content #inputDealId").val(dealIds);
            _Window._ListDealMatrix.reloadList(); 
        }, 1000);
    }

    const _setIsToggleExpandMatrix = () =>{
        setInitTab(CODE_LISTING_IN_MONTH);
        setIsToggleExpandMatrix(true); 
        setShowTable(false);
    }

    _Window.renderModalDeals = renderModalDeals;
    
    return (
        <>
            <div className="container-flex">
                <div className="row row-eq-height">
                    <div className="col-md-5 del-padding-right-col">
                        <Chart permissionIdBpo={permissionIdBpo} />
                    </div>
                    <div className="col-md-7">
                        <div style={{ height: "100%" }} className="panel panel-default custom-panel-bsa">
                            <div className="panel-body shortcut-filter-container">
                                <div className="row">
                                    <div className="col-md-3">
                                        <div className="block-expand-matrix" onClick={() => _setIsToggleExpandMatrix()}>
                                            <i className="fa fa-arrows-alt" aria-hidden="true"></i>
                                            <a href={void(0)}>Xem Tất Cả</a>
                                        </div>
                                    </div>
                                    <div className="col-md-5 del-padding-right-col">
                                        <div className="label-deal">
                                            Deals Trong Tháng
                                        </div>
                                    </div>
                                    <div className="col-md-4 custom-padding-col-md-4">
                                        <div className="block-filter">
                                            <div className="label-deal">
                                                Deals 90 Ngày
                                            </div>
                                            <div>
                                                <ShortcutMatrixFilter districtList={districtList} classificationList={classificationList} postList={postList} applyFilter={applyFilter} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="container-listing-in-month">
                                        <div className="col-md-1 del-padding-right-col">
                                            <div className="in-month-title">
                                                Listing Trong Tháng
                                            </div>
                                        </div>
                                        <div className="col-md-11">
                                            <table className="table table-striped custom-table-bordered" >
                                                <tbody>
                                                    <tr>
                                                        <td className="table-td-width">ListingID</td>
                                                        <td className="table-td-width">Giá</td>
                                                        <td>
                                                            <span>Trong BST của Deals</span>
                                                            <div className="custom-tooltip">
                                                                <div className="tooltip-dot"><span>i</span></div>
                                                                <span className="tooltip-text">{permissionDealText}/Tất cả Deals</span>
                                                            </div>
                                                        </td>
                                                        <td className="table-last-td-width">
                                                            <span>Trong BST của Deals</span>
                                                            <div className="custom-tooltip">
                                                                <div className="tooltip-dot"><span>i</span></div>
                                                                <span className="tooltip-text">{permissionDealText}/Tất cả Deals</span>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    {matrixs && matrixs.map((matrixItem, index) => (
                                                        <tr key={index}>
                                                            <td>{matrixItem.rlistingId == 0 ? "" : matrixItem.rlistingId}</td>
                                                            <td>{matrixItem.formatedPrice}</td>
                                                            <td>
                                                                {matrixItem.deals[0].status.map((itemStatus, key) => {
                                                                    const lastIndex = matrixItem.deals[0].status.length - 1;
                                                                    return <>
                                                                        <span>{itemStatus.statusName} (</span>
                                                                        {itemStatus.owner > 0 ? 
                                                                            <a onClick={() => renderModalDeals(itemStatus.dealIds,30)}>
                                                                                {itemStatus.owner}
                                                                            </a> : 
                                                                            <span>{itemStatus.owner}</span>
                                                                        }
                                                                        <span>/{itemStatus.all}) {lastIndex !== key ? ', ' : ''}</span> 
                                                                    </>
                                                                })}
                                                            </td>
                                                            <td className="table-last-td-width">
                                                                {matrixItem.deals[1].status.map((itemStatus, key) => {
                                                                    const lastIndex = matrixItem.deals[1].status.length - 1;
                                                                    return <>
                                                                        <span>{itemStatus.statusName} (</span>
                                                                        {itemStatus.owner > 0 ? 
                                                                            <a onClick={() => renderModalDeals(itemStatus.dealIds,30)}>
                                                                                {itemStatus.owner}
                                                                            </a> :
                                                                            <span>{itemStatus.owner}</span>
                                                                        }
                                                                        <span>/{itemStatus.all}) {lastIndex !== key ? ', ' : ''}</span>
                                                                    </> 
                                                                })}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="row">
                                    <div className="container-listing-90">
                                        <div className="col-md-1 del-padding-right-col">
                                            <div className="in-month-title">
                                                Listing Trong 90 Ngày
                                            </div>
                                        </div>
                                        <div className="col-md-11">
                                            <table className="table table-striped custom-table-bordered">
                                                <tbody>
                                                    {matrixs90 && matrixs90.map((matrixItem, index) => (
                                                        <tr key={index}>
                                                            <td className="table-td-width">{matrixItem.rlistingId == 0 ? "" : matrixItem.rlistingId}</td>
                                                            <td className="table-td-width">{matrixItem.formatedPrice}</td>
                                                            <td>
                                                                {matrixItem.deals[0].status.map((itemStatus, key) => {
                                                                    const lastIndex = matrixItem.deals[0].status.length - 1;
                                                                    return <>
                                                                        <span>{itemStatus.statusName} (</span>
                                                                        {itemStatus.owner > 0 ? 
                                                                            <a onClick={() => renderModalDeals(itemStatus.dealIds,90)}>
                                                                                {itemStatus.owner}
                                                                            </a> :
                                                                            <span>{itemStatus.owner}</span>
                                                                        }
                                                                        <span>/{itemStatus.all}) {lastIndex !== key ? ', ' : ''}</span>
                                                                    </>  
                                                                })}
                                                            </td>
                                                            <td className="table-last-td-width">
                                                                {matrixItem.deals[1].status.map((itemStatus, key) => {
                                                                    const lastIndex = matrixItem.deals[1].status.length - 1;
                                                                    return <>
                                                                        <span>{itemStatus.statusName} (</span>
                                                                        {itemStatus.owner > 0 ? 
                                                                            <a onClick={() => renderModalDeals(itemStatus.dealIds,90)}>
                                                                                {itemStatus.owner}
                                                                            </a> :
                                                                            <span>{itemStatus.owner}</span>        
                                                                        }
                                                                        <span>/{itemStatus.all}) {lastIndex !== key ? ', ' : ''}</span>
                                                                    </>  
                                                                })}
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 
                <Modals isDisplay={isToggleExpandMatrix} title="Bảng Ma Trận Listings BPO và Deals Tương Ứng" className="modal-expand-matrix" onCancelAction={() => setIsToggleExpandMatrix(false)}>
                    <ExpandMatrix initTab={initTab} setShowTable={setShowTable} showTable={showTable} renderModalDeals={renderModalDeals} permissionDealText={permissionDealText}
                        permissionId={permissionIdBpo} zoneList={zoneList} departmentList={departmentList} districtList={districtList} 
                        informationChannelList={informationChannelList} classificationList={classificationList} postList={postList} 
                        sourceList={sourceList} centerList={centerList} bpoList={bpoList} informationSourceTotal={informationSourceTotal} /> 
                </Modals>                                        
            </div>
        </>
    )
};

export default BpoBuySide;
import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import ExpandMatrix from "./ExpandMatrix";
import ShortcutMatrixFilter from "./ShortcutMatrixFilter";
import Modals from "components/utils/Modals";
import DealListContainer from "components/utils/DealListContainer/DealListContainer";
import { getCharts } from "api/bsa";
import { getCurrentUser } from "api/user/userApi";
import * as listApi from "api/list/listApi";
import ChartModel from "model/ChartModel";
import {
    DataDealMatrixModel,
    DataPostGetListingDealMatrix,
} from "model/listing/ListingModel";
import { Option, GroupSelect } from "utils/form";
import { handleConvertOptions, handleConvertGroupOptions } from "utils/func";
import * as constants from "constants/index";
import SaCreateBpo from "components/saCreateBpo/SaCreateBpo";
import SaBpoEvaluationHistory from "components/saBpoEvaluationHistory/SaBpoEvaluationHistory";
import SaCreateBpoAgain from "components/saCreateBpo/SaCreateBpoAgain";
import SaResolveConflict from "components/saResolveConflict/SaResolveConflict";
import SaUpdateBAEvaluateBPO from "components/saUpdateBAEvaluateBPO/SaUpdateBAEvaluateBPO";
import { BPO_SELL_SIDE, BPO } from "constants/index";

const _Window = (window as any).Window;

const BsaDashboard: React.FC<RouteComponentProps> = () => {
    // Listing
    const [permissionId, setPermissionId] = useState<string>("");
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

    // BSA chart
    const [charts, setcharts] = useState<Array<ChartModel.RootObject>>([]);

    // Matrix collapse
    const [filterState, setFilterState] = useState<DataPostGetListingDealMatrix>(
        new DataPostGetListingDealMatrix(constants.CODE_LISTING_IN_MONTH)
    );
    const [filterState90, setFilterState90] = useState<DataPostGetListingDealMatrix>(
        new DataPostGetListingDealMatrix(constants.CODE_LISTING_NINETY_DAYS)
    );
    const [matrixs, setMatrixs] = useState<DataDealMatrixModel[]>([]);
    const [matrixs90, setMatrixs90] = useState<DataDealMatrixModel[]>([]);
    const [isToggleExpandMatrix, setIsToggleExpandMatrix] = useState(false);

    const [toggleModal, setToggleModal] = useState<boolean>(false);
    const [rListingId, setRListingId] = useState(null);
    const [dealIds, setDealIds] = useState("");

    const [isToggle, setIsToggle] = useState(false);
    const [isToggleBpoHistory, setIsToggleBpoHistory] = useState(false);
    const [isToggleResolveConflict, setIsToggleResolveConflict] = useState(false);
    const [toggleSAReEvaluateBPO, setToggleSAReEvaluateBPO] = useState(false);
    const [togglePopupSaUpdateBAEvaluate, setTogglePopupSaUpdateBAEvaluate] = useState(false);

    const [listingTypeId, setListingTypeId] = useState(null);
    const [listingId, setListingId] = useState(null);

    const showSaCreateBpo = (listingTypeId: any, listingId: any) => {
        setListingTypeId(listingTypeId);
        setListingId(listingId);
        setIsToggle(true);
    };
    const showSaBpoEvaluationHistor = (listingTypeId: any, listingId: any) => {
        setListingTypeId(listingTypeId);
        setListingId(listingId);
        setIsToggleBpoHistory(true);
    };
    const togglePopupSACreateBPOAgain = () => {
        setToggleSAReEvaluateBPO(true);
        setIsToggleBpoHistory(false);
    };
    const togglePopupHistory = () => {
        setIsToggleBpoHistory(true);
        setToggleSAReEvaluateBPO(false);
    };
    const togglePopupHistoryFromUpdate = () => {
        setIsToggleBpoHistory(true);
        setTogglePopupSaUpdateBAEvaluate(false);
    };
    const togglePopupSaUpdateBAEvaluateBPO = () => {
        setIsToggleBpoHistory(false);
        setTogglePopupSaUpdateBAEvaluate(true);
    };

    const [permissionSaCreateBpoAgain, setPermissionSaCreateBpoAgain] = useState<boolean>();

    _Window.showSaCreateBpo = showSaCreateBpo;
    _Window.showSaBpoEvaluationHistor = showSaBpoEvaluationHistor;

    useEffect(() => {
        (async () => {
            const response = await getCharts();
            setcharts(response.data);
        })();
        (async () => {
            const currentUser = await getCurrentUser();
            const permissionIdList = currentUser.permissions.filter(
                (item: any) => item.actionCode === "list" && item.entityCode === "bpo_sell_side"
            );

            const permissionIdParam = permissionIdList[permissionIdList.length - 1].permissionId;
            setPermissionId(permissionIdParam);

            (async () => {
                const zoneList = await listApi.getZoneList(permissionIdParam, BPO_SELL_SIDE);
                setZoneList(handleConvertOptions(zoneList.data));
            })();
            (async () => {
                const departmentList = await listApi.getDepartmentList(permissionIdParam, BPO);
                setDepartmentList(handleConvertOptions(departmentList.data));
            })();
            (async () => {
                const districtList = await listApi.getDistrictList("1");
                setDistrictList(handleConvertOptions(districtList.data, "district"));
            })();

            (async () => {
                const informationChannelList = await listApi.getInformationChannelList("0","0");
                setInformationChannelList(handleConvertOptions(informationChannelList.data.list,"information"));
            })();
            (async () => {
                const classificationList = await listApi.getChannelType("36");
                setClassificationList(handleConvertOptions(classificationList.data[0].list, "classification"));
            })();
            (async () => {
                const postList = await listApi.getSellerChannelType("9");
                setPostList(handleConvertOptions(postList.data[0].list, "post"));
            })();
            (async () => {
                const sourceList = await listApi.getPrescreenChannelType();
                setSourceList(handleConvertOptions(sourceList.data[0].list, "source"));
            })();
            (async () => {
                const bpoList = await listApi.getChannelType("62");
                setBpoList(handleConvertOptions(bpoList.data[0].list, "bpo"));
            })();
            (async () => {
                const informationSourceTotal = await listApi.getInformationSourceList("1", "0");
                setInformationSourceTotal(handleConvertGroupOptions(informationSourceTotal.data.list, "informationSource"));
            })();
            (async () => {
                const centerList = await listApi.getCenterList();
                setCenterList(handleConvertOptions(centerList.data, "center"));
            })();
        })();
    }, []);

    useEffect(() => {
        (async () => {
            const respMatrix = await listApi.getListingDealMatrix("1", "5", filterState);
            const lenghtData: any = respMatrix.data.length;
            if (lenghtData <= 5) {
                for (var i = 0; i < 5 - lenghtData; i++) {
                    respMatrix.data.push({
                        rlistingId: 0,
                        formatedPrice: "",
                        deals: [
                            { name: "Deals Trong Tháng", status: [] },
                            { name: "Deals 90 Ngày", status: [] },
                        ],
                    });
                }
            }
            setMatrixs(respMatrix.data);
        })();
    }, [filterState]);

    useEffect(() => {
        (async () => {
            const respMatrix = await listApi.getListingDealMatrix("1", "5", filterState90);
            const lenghtData: any = respMatrix.data.length;
            if (lenghtData <= 5) {
                for (var i = 0; i < 5 - lenghtData; i++) {
                    respMatrix.data.push({
                        rlistingId: 0,
                        formatedPrice: "",
                        deals: [
                            { name: "Deals Trong Tháng", status: [] },
                            { name: "Deals 90 Ngày", status: [] },
                        ],
                    });
                }
            }
            setMatrixs90(respMatrix.data);
        })();
    }, [filterState90]);

    const getPercent = (count: any): number => {
        let total: number = 0;
        charts.forEach((chart) => {
            chart.data.forEach((item) => {
                if (item.count && item.count > total) {
                    total = item.count;
                }
            });
        });
        return (count * 100) / total;
    };

    const applyFilter = (filter: any): void => {
        const arrRlistingId = filter.id && filter.id != "" ? filter.id.split(",").map((item: any) => parseInt(item)) : null;
        setFilterState({
            rlistingId: arrRlistingId,
            bpoCloseGradeDateFrom: filter.bpoCloseGradeDateFrom ? filter.bpoCloseGradeDateFrom.setHours(0, 0, 0, 0) : null,
            bpoCloseGradeDateTo: filter.bpoCloseGradeDateTo ? filter.bpoCloseGradeDateTo.setHours(23, 59, 59, 999) : null,
            listingTypeId: filter.transaction.value ? filter.transaction.value : null,
            propertyTypeIds: filter.property.length > 0 ? filter.property.map((item: any) => item.value).join() : null,
            districtId: filter.district.value ? filter.district.value : null,
            wardId: filter.ward.value ? filter.ward.value : null,
            scorecardType: filter.classification.value ? filter.classification.value : null,
            liveType: filter.post.value ? filter.post.value : null,
            filterBPOCodeTab: constants.CODE_LISTING_IN_MONTH,
            fromBSA: true,
        });
        setFilterState90({
            rlistingId: arrRlistingId,
            bpoCloseGradeDateFrom: filter.bpoCloseGradeDateFrom ? filter.bpoCloseGradeDateFrom.setHours(0, 0, 0, 0) : null,
            bpoCloseGradeDateTo: filter.bpoCloseGradeDateTo ? filter.bpoCloseGradeDateTo.setHours(23, 59, 59, 999) : null,
            listingTypeId: filter.transaction.value ? filter.transaction.value : null,
            propertyTypeIds: filter.property.length > 0 ? filter.property.map((item: any) => item.value).join() : null,
            districtId: filter.district.value ? filter.district.value : null,
            wardId: filter.ward.value ? filter.ward.value : null,
            scorecardType: filter.classification.value ? filter.classification.value : null,
            liveType: filter.post.value ? filter.post.value : null,
            filterBPOCodeTab: constants.CODE_LISTING_NINETY_DAYS,
            fromBSA: true,
        });
    };

    const renderModalDeals = (rlistingId: any, dealIds: any) => {
        setRListingId(rlistingId);
        setDealIds(dealIds);
        setToggleModal(true);
    };

    _Window.renderModalDeals = renderModalDeals;

    const ChartPage = (
        <div className="row row-eq-height">
            <div className="col-md-5 del-padding-right-col">
                <div className="panel panel-default custom-panel-bsa" style={{ lineHeight: "45px", height: "100%" }} >
                    <div id="bpo-chart" className="panel-body">
                        <div className="row">
                            <div className="col-md-12">
                                <label className="control-label">BPO </label>
                            </div>
                        </div>
                        {charts.map((chart, index) => (
                            <div key={index}>
                                <label>{chart.label}</label>
                                {chart.data.map((item, index2) => {
                                    let backgroundColor, width;
                                    const revenue = chart.bpoType !== constants.CODE_NEED_TO_BPO ? `Doanh thu ước tính ${item.revenue}` : "";
                                    if (item.count && item.count > 0) {
                                        backgroundColor = `${item.subType ? constants.COLOR_CHART[item.subType] : constants.COLOR_CHART[chart.bpoType]}`;
                                        width = `${getPercent(item.count)}%`;
                                    }
                                    return (
                                        <div key={index2} className="row" style={{ marginBottom: "5px" }} >
                                            <div className="col-md-4">
                                                <p className="text-muted" style={{paddingLeft: "20px"}} >
                                                    {item.subLabel}
                                                </p>
                                            </div>
                                            <div className="col-md-8">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="block-chart">
                                                            <a href={void 0}
                                                                data-toggle="tooltip"
                                                                onClick={() => {
                                                                    _Window.saIndex.clearFilter();
                                                                    _Window.saIndex._currentTabIndex = 3;
                                                                    _Window.saIndex._currentPage = 1;
                                                                    const formFilter = $("#form-filter");
                                                                    formFilter.find("#rlistingId").val(item.listingIds.join(","));
                                                                    _Window.saIndex.reloadList();
                                                                    $("#living-listing-id").trigger("click");
                                                                }}
                                                                title={revenue}
                                                                className="chart-tooltip"
                                                                style={{
                                                                    cursor:
                                                                        "pointer",
                                                                    display:
                                                                        "inline-block",
                                                                    color:
                                                                        "white",
                                                                    height:
                                                                        "36px",
                                                                    padding:
                                                                        "3px",
                                                                    backgroundColor: backgroundColor,
                                                                    width: width,
                                                                }}
                                                            ></a>
                                                            <span>
                                                                {item.count}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="col-md-7">
                <div
                    style={{ height: "100%" }}
                    className="panel panel-default custom-panel-bsa"
                >
                    <div className="panel-body shortcut-filter-container">
                        <div className="row">
                            <div className="col-md-3">
                                <div
                                    className="block-expand-matrix"
                                    onClick={() =>
                                        setIsToggleExpandMatrix(true)
                                    }
                                >
                                    <i
                                        className="fa fa-arrows-alt"
                                        aria-hidden="true"
                                    ></i>
                                    <a href={void 0}>Xem Tất Cả</a>
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
                                        <ShortcutMatrixFilter
                                            districtList={districtList}
                                            classificationList={
                                                classificationList
                                            }
                                            postList={postList}
                                            applyFilter={applyFilter}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="container-listing-in-month">
                                <div className="col-md-1 del-padding-right-col">
                                    <div className="in-month-title">
                                        Listing Bán Trong 30 Ngày
                                    </div>
                                </div>
                                <div className="col-md-11">
                                    <table className="table table-striped custom-table-bordered">
                                        <tbody>
                                            <tr>
                                                <td className="table-td-width">
                                                    ListingID
                                                </td>
                                                <td className="table-td-width">
                                                    Giá
                                                </td>
                                                <td>Trong BST của Deals</td>
                                                <td className="table-last-td-width">
                                                    Trong BST của Deals
                                                </td>
                                            </tr>
                                            {matrixs &&
                                                matrixs.map(
                                                    (matrixItem, index) => (
                                                        <tr key={index}>
                                                            <td>
                                                                {matrixItem.rlistingId ==
                                                                0
                                                                    ? ""
                                                                    : matrixItem.rlistingId}
                                                            </td>
                                                            <td>
                                                                {
                                                                    matrixItem.formatedPrice
                                                                }
                                                            </td>
                                                            <td>
                                                                {matrixItem.deals[0].status.map(
                                                                    (
                                                                        itemStatus,
                                                                        key
                                                                    ) => {
                                                                        const lastIndex =
                                                                            matrixItem
                                                                                .deals[0]
                                                                                .status
                                                                                .length -
                                                                            1;
                                                                        return (
                                                                            <>
                                                                                <span>
                                                                                    {
                                                                                        itemStatus.statusName
                                                                                    }{" "}
                                                                                    (
                                                                                </span>
                                                                                {itemStatus.owner >
                                                                                0 ? (
                                                                                    <a
                                                                                        onClick={() =>
                                                                                            renderModalDeals(
                                                                                                matrixItem.rlistingId,
                                                                                                itemStatus.dealIds
                                                                                            )
                                                                                        }
                                                                                    >
                                                                                        {
                                                                                            itemStatus.owner
                                                                                        }
                                                                                    </a>
                                                                                ) : (
                                                                                    <span>
                                                                                        {
                                                                                            itemStatus.owner
                                                                                        }
                                                                                    </span>
                                                                                )}
                                                                                {(itemStatus.statusId ===
                                                                                    25 ||
                                                                                    itemStatus.statusId ===
                                                                                        26 ||
                                                                                    itemStatus.statusId ===
                                                                                        29) && (
                                                                                    <>
                                                                                        <span>
                                                                                            /
                                                                                        </span>
                                                                                        <a
                                                                                            onClick={() =>
                                                                                                renderModalDeals(
                                                                                                    matrixItem.rlistingId,
                                                                                                    itemStatus.allDealIds
                                                                                                )
                                                                                            }
                                                                                        >
                                                                                            {
                                                                                                itemStatus.all
                                                                                            }
                                                                                        </a>
                                                                                    </>
                                                                                )}
                                                                                <span>
                                                                                    )
                                                                                    {lastIndex !==
                                                                                    key
                                                                                        ? ", "
                                                                                        : ""}
                                                                                </span>
                                                                            </>
                                                                        );
                                                                    }
                                                                )}
                                                            </td>
                                                            <td className="table-last-td-width">
                                                                {matrixItem.deals[1].status.map(
                                                                    (
                                                                        itemStatus,
                                                                        key
                                                                    ) => {
                                                                        const lastIndex =
                                                                            matrixItem
                                                                                .deals[1]
                                                                                .status
                                                                                .length -
                                                                            1;
                                                                        return (
                                                                            <>
                                                                                <span>
                                                                                    {
                                                                                        itemStatus.statusName
                                                                                    }{" "}
                                                                                    (
                                                                                </span>
                                                                                {itemStatus.owner >
                                                                                0 ? (
                                                                                    <a
                                                                                        onClick={() =>
                                                                                            renderModalDeals(
                                                                                                matrixItem.rlistingId,
                                                                                                itemStatus.dealIds
                                                                                            )
                                                                                        }
                                                                                    >
                                                                                        {
                                                                                            itemStatus.owner
                                                                                        }
                                                                                    </a>
                                                                                ) : (
                                                                                    <span>
                                                                                        {
                                                                                            itemStatus.owner
                                                                                        }
                                                                                    </span>
                                                                                )}
                                                                                {(itemStatus.statusId ===
                                                                                    25 ||
                                                                                    itemStatus.statusId ===
                                                                                        26 ||
                                                                                    itemStatus.statusId ===
                                                                                        29) && (
                                                                                    <>
                                                                                        <span>
                                                                                            /
                                                                                        </span>
                                                                                        <a
                                                                                            onClick={() =>
                                                                                                renderModalDeals(
                                                                                                    matrixItem.rlistingId,
                                                                                                    itemStatus.allDealIds
                                                                                                )
                                                                                            }
                                                                                        >
                                                                                            {
                                                                                                itemStatus.all
                                                                                            }
                                                                                        </a>
                                                                                    </>
                                                                                )}
                                                                                <span>
                                                                                    )
                                                                                    {lastIndex !==
                                                                                    key
                                                                                        ? ", "
                                                                                        : ""}
                                                                                </span>
                                                                            </>
                                                                        );
                                                                    }
                                                                )}
                                                            </td>
                                                        </tr>
                                                    )
                                                )}
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
                                            {matrixs90 &&
                                                matrixs90.map(
                                                    (matrixItem, index) => (
                                                        <tr key={index}>
                                                            <td className="table-td-width">
                                                                {matrixItem.rlistingId ==
                                                                0
                                                                    ? ""
                                                                    : matrixItem.rlistingId}
                                                            </td>
                                                            <td className="table-td-width">
                                                                {
                                                                    matrixItem.formatedPrice
                                                                }
                                                            </td>
                                                            <td>
                                                                {matrixItem.deals[0].status.map(
                                                                    (
                                                                        itemStatus,
                                                                        key
                                                                    ) => {
                                                                        const lastIndex =
                                                                            matrixItem
                                                                                .deals[0]
                                                                                .status
                                                                                .length -
                                                                            1;
                                                                        return (
                                                                            <>
                                                                                <span>
                                                                                    {
                                                                                        itemStatus.statusName
                                                                                    }{" "}
                                                                                    (
                                                                                </span>
                                                                                {itemStatus.owner >
                                                                                0 ? (
                                                                                    <a
                                                                                        onClick={() =>
                                                                                            renderModalDeals(
                                                                                                matrixItem.rlistingId,
                                                                                                itemStatus.dealIds
                                                                                            )
                                                                                        }
                                                                                    >
                                                                                        {
                                                                                            itemStatus.owner
                                                                                        }
                                                                                    </a>
                                                                                ) : (
                                                                                    <span>
                                                                                        {
                                                                                            itemStatus.owner
                                                                                        }
                                                                                    </span>
                                                                                )}
                                                                                {(itemStatus.statusId ===
                                                                                    25 ||
                                                                                    itemStatus.statusId ===
                                                                                        26 ||
                                                                                    itemStatus.statusId ===
                                                                                        29) && (
                                                                                    <>
                                                                                        <span>
                                                                                            /
                                                                                        </span>
                                                                                        <a
                                                                                            onClick={() =>
                                                                                                renderModalDeals(
                                                                                                    matrixItem.rlistingId,
                                                                                                    itemStatus.allDealIds
                                                                                                )
                                                                                            }
                                                                                        >
                                                                                            {
                                                                                                itemStatus.all
                                                                                            }
                                                                                        </a>
                                                                                    </>
                                                                                )}
                                                                                <span>
                                                                                    )
                                                                                    {lastIndex !==
                                                                                    key
                                                                                        ? ", "
                                                                                        : ""}
                                                                                </span>
                                                                            </>
                                                                        );
                                                                    }
                                                                )}
                                                            </td>
                                                            <td className="table-last-td-width">
                                                                {matrixItem.deals[1].status.map(
                                                                    (
                                                                        itemStatus,
                                                                        key
                                                                    ) => {
                                                                        const lastIndex =
                                                                            matrixItem
                                                                                .deals[1]
                                                                                .status
                                                                                .length -
                                                                            1;
                                                                        return (
                                                                            <>
                                                                                <span>
                                                                                    {
                                                                                        itemStatus.statusName
                                                                                    }{" "}
                                                                                    (
                                                                                </span>
                                                                                {itemStatus.owner >
                                                                                0 ? (
                                                                                    <a
                                                                                        onClick={() =>
                                                                                            renderModalDeals(
                                                                                                matrixItem.rlistingId,
                                                                                                itemStatus.dealIds
                                                                                            )
                                                                                        }
                                                                                    >
                                                                                        {
                                                                                            itemStatus.owner
                                                                                        }
                                                                                    </a>
                                                                                ) : (
                                                                                    <span>
                                                                                        {
                                                                                            itemStatus.owner
                                                                                        }
                                                                                    </span>
                                                                                )}
                                                                                {(itemStatus.statusId ===
                                                                                    25 ||
                                                                                    itemStatus.statusId ===
                                                                                        26 ||
                                                                                    itemStatus.statusId ===
                                                                                        29) && (
                                                                                    <>
                                                                                        <span>
                                                                                            /
                                                                                        </span>
                                                                                        <a
                                                                                            onClick={() =>
                                                                                                renderModalDeals(
                                                                                                    matrixItem.rlistingId,
                                                                                                    itemStatus.allDealIds
                                                                                                )
                                                                                            }
                                                                                        >
                                                                                            {
                                                                                                itemStatus.all
                                                                                            }
                                                                                        </a>
                                                                                    </>
                                                                                )}
                                                                                <span>
                                                                                    )
                                                                                    {lastIndex !==
                                                                                    key
                                                                                        ? ", "
                                                                                        : ""}
                                                                                </span>
                                                                            </>
                                                                        );
                                                                    }
                                                                )}
                                                            </td>
                                                        </tr>
                                                    )
                                                )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div>
            <label className="control-label title-bpo-bashboard">
                SA Dashboard{" "}
            </label>
            <div className="container-flex">
                {ChartPage}

                <Modals
                    isDisplay={isToggleExpandMatrix}
                    title="Bảng Listings BPO và Deals Tương Ứng"
                    className="modal-expand-matrix"
                    onCancelAction={() => setIsToggleExpandMatrix(false)}
                >
                    <ExpandMatrix
                        renderModalDeals={renderModalDeals}
                        permissionId={permissionId}
                        zoneList={zoneList}
                        departmentList={departmentList}
                        districtList={districtList}
                        informationChannelList={informationChannelList}
                        classificationList={classificationList}
                        postList={postList}
                        sourceList={sourceList}
                        centerList={centerList}
                        bpoList={bpoList}
                        informationSourceTotal={informationSourceTotal}
                    />
                </Modals>

                <Modals
                    isDisplay={toggleModal}
                    title="Danh Sách Deals"
                    onCancelAction={() => setToggleModal(false)}
                >
                    <DealListContainer rListingId={rListingId} dealIds={dealIds}/>
                </Modals>
            </div>

            <Modals
                isDisplay={isToggle}
                title="Đánh giá BPO Listing"
                className="popup-bpo-improve"
                onCancelAction={() => setIsToggle(false)}
            >
                <SaCreateBpo
                    listingId={listingId}
                    listingTypeId={listingTypeId}
                    onCloseModal={() => setIsToggle(false)}
                    _Window={_Window}
                />
            </Modals>

            <Modals
                isDisplay={isToggleBpoHistory}
                title="Lịch sử đánh giá BPO listing"
                className="popup-bpo-improve"
                onCancelAction={() => setIsToggleBpoHistory(false)}
            >
                <SaBpoEvaluationHistory
                    setIsToggleResolveConflict={() => {
                        setIsToggleResolveConflict(true);
                        setIsToggleBpoHistory(false)
                    }}
                    onCloseModal={() => setIsToggleBpoHistory(false)}
                    togglePopupSACreateBPOAgain={togglePopupSACreateBPOAgain}
                    togglePopupSaUpdateBAEvaluateBPO={
                        togglePopupSaUpdateBAEvaluateBPO
                    }
                    listingId={listingId}
                />
            </Modals>

            <Modals
                isDisplay={toggleSAReEvaluateBPO}
                title="Đánh giá BPO Listing"
                className="popup-bpo-improve"
                onCancelAction={() =>
                    {
                        setToggleSAReEvaluateBPO(false)
                        if(!permissionSaCreateBpoAgain) {
                            togglePopupHistory();
                        }
                    }
                }
            >
                <SaCreateBpoAgain
                    listingId={listingId}
                    listingTypeId={listingTypeId}
                    onCloseModal={() => setToggleSAReEvaluateBPO(false)}
                    onHandlerPermission={(permission) => setPermissionSaCreateBpoAgain(permission)}
                    togglePopupHistory={togglePopupHistory}/>
            </Modals>

            <Modals
                isDisplay={isToggleResolveConflict}
                title="BPO listing - Giải quyết khác biệt ý kiến SA và BAs"
                className="popup-bpo-improve"
                onCancelAction={() => setIsToggleResolveConflict(false)}
            >
                <SaResolveConflict
                    onCloseModal={() => {
                        setIsToggleResolveConflict(false);
                        setIsToggleBpoHistory(true)
                    }}
                    listingId={listingId}
                />
            </Modals>

            <Modals
                isDisplay={togglePopupSaUpdateBAEvaluate}
                title="Cập Nhật Danh Sách BA Đánh Giá BPO"
                className="popup-bpo-improve"
                onCancelAction={() => {
                    setTogglePopupSaUpdateBAEvaluate(false);
                    setIsToggleBpoHistory(true);
                }}
            >
                <SaUpdateBAEvaluateBPO
                    onCloseModal={() => setTogglePopupSaUpdateBAEvaluate(false)}
                    listingId={listingId}
                    togglePopupHistory={togglePopupHistoryFromUpdate}
                />
            </Modals>
        </div>
    );
};

export default BsaDashboard;

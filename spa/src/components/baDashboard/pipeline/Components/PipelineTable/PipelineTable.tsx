import { DataRowSalePipeline, DealSalePipeline, ListingGroup, DateRanger, GroupBy, FilterPipeLine, PopupType } from "model";
import React, { useEffect, useRef, useState } from "react";
import DataDealItem from "../DataDealItem/DataDealItem";
import "./pipelineTable.scss"
import { getSalesPipelineReport, getListDateRanger } from "api/ba/SalePipelineApi/getSalesPipelineReport";
import axios, { CancelToken } from "axios";
import moment from "moment";
interface SalesPipelineTableProps {
    dataGroup: ListingGroup;
    dataFilter: FilterPipeLine;
    removeEmpty: boolean;
    loadDataDone: (loadDone: boolean) => void;
    showModal: (dealIds: string, linkName: PopupType, rowId: string) => void;
};

const LIMIT = 15;

const SalesPipelineTableNew: React.FC<SalesPipelineTableProps> = (props) => {
    const { dataGroup, dataFilter, loadDataDone, showModal, removeEmpty } = props;
    const [offset, setOffset] = useState(0);
    const [listItems, setListItems] = useState<any[]>([]);
    const [listDateRanger, setListDateRanger] = useState<any[]>([]);
    const [loadMore, setLoadMore] = useState(false);
    const [loadAllDone, setLoadAllDone] = useState(false);
    const [resetted, setResetted] = useState(false)

    const cancelTokenReport = axios.CancelToken;
    const sourceTokenReport = cancelTokenReport.source();

    const handleScroll = (e: any) => {

        if (loadMore === true || loadAllDone || dataGroup.groupBy == GroupBy.STATUS || dataFilter === undefined) {
            return;
        }
        const bottom = Math.floor(e.target.scrollHeight - e.target.scrollTop) === Math.floor(e.target.clientHeight) || Math.ceil(e.target.scrollHeight - e.target.scrollTop) === Math.ceil(e.target.clientHeight);
        if (bottom) {
            setLoadMore(true);
        }
    }

    const showModalListDeal = async (listDealId: string, linkName: PopupType, rowId: number) => {
        showModal(
            listDealId,
            linkName,
            String(rowId)
        )
    }

    useEffect(() => {
        if (resetted) {
            getListDate();
            fetchMoreListItems(true);
            setResetted(false);
        }
    }, [resetted]);

    const resetData = async () => {
        await Promise.all([
            setLoadAllDone(false),
            setLoadMore(false),
            setOffset(0),
            setListItems([]),
            setListDateRanger([]),
            sourceTokenReport.cancel("sourceTokenReport request cancelled"),
        ]);
        setResetted(true);
        loadDataDone(true)
    }


    useEffect(() => {
        if (!dataFilter || dataFilter === undefined) return;
        resetData()
    }, [dataGroup, dataFilter, removeEmpty]);

    useEffect(() => {
        fetchMoreListItems(loadMore);
    }, [loadMore]);

    useEffect(() => {
        setOffset(listItems.length)
        loadDataDone(true)
    }, [listItems]);



    const fetchMoreListItems = (load: boolean) => {
        if (load) {
            (async () => {
                const dataReport = await getSalesPipelineReport({
                    numberItem: LIMIT,
                    page: Math.ceil((listItems.length / LIMIT)) + 1,
                    filter: dataFilter,
                    listingGroup: dataGroup,
                    expectedTimeRanges: listDateRanger,
                    removeEmpty: removeEmpty,
                }, sourceTokenReport.token);
                setListItems([...listItems, ...dataReport.data] || []);
                loadDataDone(false);
                setLoadMore(false);
                if (dataReport.data.length === 0) {
                    setLoadAllDone(true)
                }
            })();
        }
    }

    const getListDate = () => {
        (async () => {
            const dataDateRanger = await getListDateRanger(dataFilter, dataGroup, removeEmpty);
            setListDateRanger(dataDateRanger.data);
        })();
    }

    const dateCard = (item: DateRanger) => {
        return (
            <div className="date-card">
                <label className="date-time-label">
                    Từ&nbsp;{moment(item.from).format("DD/MM/YYYY")}
                </label>
                <label className="date-time-label">
                    đến&nbsp;{moment(item.to).format("DD/MM/YYYY")}
                </label>
            </div>
        );
    };

    const rowData = listItems.length > 0 ? listItems.map((item: DataRowSalePipeline, index: number) => {
        return (
            <tr key={index}>
                <td className="sticky-col">
                    <span className="bold-text-left">{item.name} </span>
                </td>
                <td>
                    <DataDealItem dataDeal={item.totalUnit} showModalListDeal={showModalListDeal} rowId={item.rowId} />
                </td>
                <td>
                    <DataDealItem dataDeal={item.noExceptedClosingDateUnit} showModalListDeal={showModalListDeal} rowId={item.rowId} />
                </td>
                {item.timeRangeUnits?.map((element: DealSalePipeline, key: number) => {
                    return (
                        <td>
                            <DataDealItem dataDeal={element} showModalListDeal={showModalListDeal} rowId={item.rowId} />
                        </td>
                    )
                })}
            </tr>
        )
    }) : '';

    return (
        <div className="sales-pipeline-table-container" onScroll={handleScroll}>
            <table id={"1"} className="table table-striped custom-table" >
                <thead>
                    <tr>
                        <th rowSpan={2} colSpan={1} className="sticky-col custom-zindex"><span className="bold-text" > {dataGroup.groupBy === GroupBy.STATUS ? "Trạng thái" : "Nhân viên"} </span></th>
                        <th rowSpan={2} colSpan={1}><span className="bold-text"> Tổng cộng </span></th>
                        <th rowSpan={2} colSpan={1}><span className="bold-text"> Deal không có ngày dự kiến</span></th>
                        {listDateRanger.length > 0 && <th rowSpan={1} colSpan={listDateRanger.length}>
                            <span className="bold-text-group">Thời gian chốt deal dự kiến </span>
                        </th>}
                    </tr>
                    <tr className="data-no-border" >
                        {listDateRanger?.map(i =>
                            <th>{dateCard(i)}</th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {rowData}
                </tbody>
            </table>
            {loadMore && <p className="normal-text"> Đang tải dữ liệu... <i className="fa fa-spinner fa-spin" /></p>}
        </div >);
};

export default SalesPipelineTableNew;

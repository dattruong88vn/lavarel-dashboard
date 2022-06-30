import React, { memo, useEffect, useState } from "react";
import "./totalValueComponent.scss"
import { FilterPipeLine, ListingGroup, PopupType, SumPipeLineModel, TrackingType } from 'model'
import { getSumSalePipeline } from "api/ba/SalePipelineApi/getSalesPipelineReport";

type TotalValueDataProps = {
    dataGroup: ListingGroup
    dataFilter: FilterPipeLine
    showModal: (dealIds: string, linkName: PopupType) => void
};

const TotalValueComponent: React.FC<TotalValueDataProps> = (props) => {
    const { dataGroup, dataFilter, showModal } = props;
    const [sumData, setSumData] = useState<SumPipeLineModel>({
        finalBudgetSum: "",
        actualCommissionSum: "",
        potentialDealSum: 0,
        potentialDealIds: ""
    });
    const linkName = PopupType.TOTAL_POTENTIAL_DEALS;
    useEffect(() => {
        getDataSum();
    }, [dataGroup, dataFilter]);

    const getDataSum = () => {
        if (!dataFilter || dataFilter === undefined) return;
        (async () => {
            const dataSum = await getSumSalePipeline(
                dataFilter,
                dataGroup
            );
            setSumData(dataSum?.data);
        })();
    }

    const onClickHotDeal = () => {
        if (sumData.potentialDealSum === 0) {
            return;
        }
        showModal(
            sumData.potentialDealIds,
            linkName
        )
    }
    const totalCard = (data: string, title: string, className: string, onClickDeal: any) => (
        <div className={`total-card ${className}`} onClick={onClickDeal}  >
            <span className="normal-text">{title}</span>
            <span className="bold-text">{data}</span>
        </div>
    )
    return (
        <div className="total-value-container">
            {totalCard(sumData?.finalBudgetSum, "Tổng giá trị deal", "color-blue", () => { })}
            {totalCard(sumData?.actualCommissionSum, "Doanh thu đã chốt", "color-blue", () => { })}
            {totalCard(String(sumData?.potentialDealSum || 0), "Tổng số deal tiềm năng", sumData?.potentialDealSum > 0 ? "color-green" : "color-green no-data", onClickHotDeal)}
        </div>);
};

export default memo(TotalValueComponent);

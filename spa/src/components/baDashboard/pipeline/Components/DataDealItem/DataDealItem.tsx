import React, { useState, useEffect, memo } from "react";
import "./dataDealItem.scss"
import { DealSalePipeline, PopupType } from "model";
type DataDealItemProps = {
    dataDeal: DealSalePipeline;
    showModalListDeal: (listDealId: string, linkName: PopupType, rowId: number) => void;
    rowId: number;
};

const DataDealItem: React.FC<DataDealItemProps> = (props) => {
    const { dataDeal, showModalListDeal: showListDeal ,rowId} = props;

    const onTapItem = (itemIds: string, popupType: PopupType) => () => {
        showListDeal(itemIds, popupType, rowId)
    }

    return (
        dataDeal ? <div className="deal-item-container">
            <span className="top-label">{dataDeal.value} </span>
            <div className="bottom-content">
                {dataDeal.buyItem > 0 && <div className="column-content">
                    <div className="two-text" onClick={onTapItem(dataDeal.buyItemIds, PopupType.BUY_DEAL)}>
                        <span className="normal-text">{dataDeal.buyItem}&nbsp;mua </span>
                        {dataDeal.valueBuyItem !== "0" && <span className="normal-text">{dataDeal.valueBuyItem} </span>}
                    </div>
                    <div className="two-value">
                        {dataDeal.badBuyItem > 0 && <span className="value-yellow" onClick={onTapItem(dataDeal.badBuyItemIds, PopupType.BAD_BUY_DEAL)}> {dataDeal.badBuyItem}</span>}
                        {dataDeal.hotBuyItem > 0 && <span className="value-green" onClick={onTapItem(dataDeal.hotBuyItemIds, PopupType.POTENTIAL_BUY_DEAL)}> {dataDeal.hotBuyItem} </span>}
                    </div>
                </div>}
                <div className="space" />
                {dataDeal.rentItem > 0 && <div className="column-content">
                    <div className="two-text" onClick={onTapItem(dataDeal.rentItemIds, PopupType.RENTAL_DEAL)}>
                        <span className="normal-text">{dataDeal.rentItem}&nbsp;thuê </span>
                        {dataDeal.valueRentItem !== "0" && <span className="normal-text">{dataDeal.valueRentItem} </span>}
                    </div>
                    <div className="two-value">
                        {dataDeal.badRentItem > 0 && <span className="value-yellow" onClick={onTapItem(dataDeal.badRentItemIds, PopupType.BAD_RENTAL_DEAL)}>{dataDeal.badRentItem}</span>}
                        {dataDeal.hotRentItem > 0 && <span className="value-green" onClick={onTapItem(dataDeal.hotRentItemIds, PopupType.POTENTIAL_RENTAL_DEAL)}> {dataDeal.hotRentItem} </span>}
                    </div>
                </div>}
            </div>
        </div> : <div />
    );
};

export default memo(DataDealItem);

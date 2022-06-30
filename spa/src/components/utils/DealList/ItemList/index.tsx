import React, { FC } from "react"
import { useState } from "react"
import BeautyStars from "beauty-stars"
import { Tab, Tabs } from "react-bootstrap"
import { Paging } from "components/utils/Paging/index"
import ProgressBar from "components/utils/ProgressBar"
import { IDealItem, RenderFeedBack } from "components/utils/DealList/ItemList/index.d"
import { IPropsDealList } from "components/utils/DealList/index.d"
import { Rating } from "model/DealModel/index.d"
import {
    CALL_BA,
    CALL_CUSTOMER,
    FEED_BACK_FROM_CUSTOMERS,
    TXT_SHOW_ALL,
    TXT_COLLAPSE,
    FORMAT_TYPE,
    RATING_COLOR_ACTIVE_STAR,
    RATING_COLOR_INACTIVE_STAR,
    RATING_GAP,
    RATING_GET_STAR,
    RATING_SiZE_STAR_FEEDBACKS,
    RATING_SiZE_STAR_FEEDBACK_AVERAGE,
} from "constants/index"

import { formatDate } from "utils"
import { makeCall } from "utils/generic"

import "components/utils/DealList/ItemList/index.scss"

const RenderCustomerFeedback: FC<RenderFeedBack> = (p) => {
    const handleSelect = () => { }

    const renderFeedBackContent: FC<Rating> = (item) => {
        const percentValue = item.percentValue && item.percentValue / RATING_GET_STAR || 0

        return (
            <ul key={item.code} className="col-sm-2">
                <li className="name">{item.name}</li>
                <li className="percent">
                    <BeautyStars
                        activeColor={RATING_COLOR_ACTIVE_STAR}
                        gap={RATING_GAP}
                        inactiveColor={RATING_COLOR_INACTIVE_STAR}
                        size={RATING_SiZE_STAR_FEEDBACKS}
                        value={percentValue}
                    />
                </li>
                <li className="item-content">{item.content}</li>
            </ul>
        )
    }

    return (
        <div className="col-sm-12">
            <Tabs
                activeKey="feedback-0"
                onSelect={handleSelect}
                id="customer-feedback-tabs"
            >
                {p.feedBackList.map((feedback, f) => {
                    return (
                        <Tab
                            key={`feedback-${f}`}
                            tabClassName="tab-item"
                            eventKey={`feedback-${f}`}
                            title={feedback.customerName}
                        >
                            {feedback.results.map((result, r) =>
                                renderFeedBackContent(result)
                            )}
                        </Tab>
                    )
                })}
            </Tabs>
        </div>
    )
}
const ItemData: FC<IDealItem> = (props) => {
    const [toggleCustomerFeedback, setToggleCustomerFeedback] = useState(false)
   
    const progressList = props.data.progressList
    const getDirection = props.data.directionList && props.data.directionList.map(d => d.name) || []
    const renderExpectedDate = props.data.expectedClosingDate && formatDate(props.data.expectedClosingDate, FORMAT_TYPE)
    const renderTimeRemaining = props.data.closingTimeRemaining && props.data.closingTimeRemaining > 0 ? props.data.closingTimeRemaining + ' ngày' 
    : props.data.closingTimeRemaining && props.data.closingTimeRemaining < 0 ? 'Quá hạn ' + Math.abs(props.data.closingTimeRemaining) + ' ngày' : ''; 

    let renderDeal = null
    let renderPhone = ""
    let renderTextCallPhone = null
    if (props.data.isViewDetail) {
        renderDeal = (
            <div>
                Deal:
                <a href={`/deal/detail/${props.data.dealId}`}
                target="_blank"
                title={props.data.dealId.toString()}>
                    {props.data.dealId}
                </a>
            </div>
        )
        
        renderPhone = props.data.customerPhone
        renderTextCallPhone = CALL_CUSTOMER
    } else {
        renderDeal = <span>Deal: {props.data.dealId}</span>
        renderPhone = props.data.baPhone
        renderTextCallPhone = CALL_BA
    }

    return (
        <div className="box box-primary item">
            <div className="box-body">
                <div className="col-sm-2 deal-id">
                    {renderDeal}
                </div>
                <div className="col-sm-2 customer-name">
                    <strong>{props.data.customerName}</strong>
                </div>
                <div className="col-sm-2 col-sm-push-6">
                    <button
                        className="btn btn-success"
                        style={{ float: "right" }}
                        type="button"
                        onClick={() => makeCall(renderPhone, props.data.dealId, props.data.isViewDetail)}
                    ><i className="fa fa-volume-control-phone" aria-hidden="true"></i>
                        {renderTextCallPhone}
                    </button>
                </div>
            </div>
            <div className="box-body progress-bar-container">
                <div className="progress-bar">
                    <ProgressBar
                        completed={props.data.progressId}
                        progressList={progressList}
                    />
                </div>
            </div>
            <div className="box-body deal-date">
                <div className="col-sm-4 k-col expected-closing-date">
                    <span>Ngày dự kiến chốt deal:</span>
                </div>
                <div className="col-sm-2 v-col">
                    <span>{renderExpectedDate}</span>
                </div>
                <div className="col-sm-4 k-col remaining-closing-time">
                    <span>Thời gian chốt deal còn lại:</span>
                </div>
                <div className="col-sm-2 v-col">
                    <span>{renderTimeRemaining}</span>
                </div>
            </div>
            <div className="box-body deal-info">
                <div className="col-sm-2 k-col">
                    <strong>BA:</strong>
                </div>
                <div className="col-sm-2 v-col">
                    <span>{props.data.baName}</span>
                </div>
                <div className="col-sm-2 k-col">
                    <strong>{props.data.listingTypeName}</strong>
                </div>
                <div className="col-sm-2 v-col">
                    <span>{props.data.propertyTypeName}</span>
                </div>
                <div className="col-sm-2 k-col">
                    <strong>Hướng</strong>
                </div>
                <div className="col-sm-2 v-col">
                    <span>{getDirection.join(', ')}</span>
                </div>
            </div>
            {props.data.districtList.map((item, k) => {
                const getWards = item.wardList.map((ward) => ward.name)
                return (
                    <div key={k} className="box-body group-district-wards">
                        <div className="col-sm-2 k-col district">
                            <strong>Quận</strong>
                        </div>
                        <div className="col-sm-2 v-col">
                            <span>{item.name}</span>
                        </div>
                        <div className="col-sm-2 k-col ward">
                            <strong>Phường</strong>
                        </div>
                        <div className="col-sm-6 v-col">
                            <span>{getWards.join(", ")}</span>
                        </div>
                    </div>
                )
            })}
            <div className="box-body feedbacks">
                <div className="col-sm-12 feedback-overall">
                    <strong>{FEED_BACK_FROM_CUSTOMERS}</strong>
                    <div className="rating-section">
                        <BeautyStars
                            activeColor={RATING_COLOR_ACTIVE_STAR}
                            inactiveColor={RATING_COLOR_INACTIVE_STAR}
                            size={RATING_SiZE_STAR_FEEDBACK_AVERAGE}
                            value={props.data.avgPercentValue}
                        />
                        {props.data.feedBackList && (
                            <>
                                {!toggleCustomerFeedback && <span onClick={() => setToggleCustomerFeedback(true)}>{TXT_SHOW_ALL}</span>}
                                {toggleCustomerFeedback && <span onClick={() => setToggleCustomerFeedback(false)}>{TXT_COLLAPSE}</span>}
                            </>
                        )}
                    </div>
                </div>

                {toggleCustomerFeedback && props.data.feedBackList && (
                    <RenderCustomerFeedback
                        feedBackList={props.data.feedBackList}
                    />
                )}
            </div>
        </div>
    )
}
const ItemList: FC<IPropsDealList> = (props) => {
    const [items] = [props.items]
    return (
        <div className="item-list">
            {items.length === 0 ? 
                
                <> 
                    {items.length === 0 && <p>Không có dữ liệu</p>}
                </>
            : 
                <> 
                    {items.map((item, k) => (
                        <ItemData key={k} data={item} />
                    ))}
                    {<Paging limit={10} totalRecords={props.totalRecords.length} onPageChanged={props.onPageChanged} />}
                </>
            }
        </div>
    )
}

export default ItemList

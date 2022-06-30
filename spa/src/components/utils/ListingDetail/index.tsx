import React, { FC } from 'react';
import moment from 'moment';
import Heading from '../Heading';
import { ListingDetailModel, positionObj } from 'model/ListingDetailModel';
import { makeCall } from 'utils/generic';
import "./index.scss";

type ListingDetailProps = { 
    rlistingId: number | string | null
    listItem: ListingDetailModel
}
const ListingDetail: FC<ListingDetailProps> = (props) => {
    const [listItem] = [props.listItem]

    const renderPosition = (listingPositions : positionObj | null) : string =>  {
        let strAlley = '';
        if (listingPositions) {

            if (listingPositions.postionName && listingPositions.postionName != 'Hẻm') {
                let roadFrontageWidth = listingPositions.roadFrontageWidth ?
                    ' (' + listingPositions.roadFrontageWidth + 'm)' : '';
                strAlley = listingPositions.postionName + roadFrontageWidth;
            } else if (listingPositions.postionName) {
                let alleyName = listingPositions.alleyName ? ' - ' + listingPositions.alleyName : '';

                let alleyWidth = listingPositions.alleyWidth ? ' (' + listingPositions.alleyWidth + 'm)' : '';
                let typeName = listingPositions.alleyTypeName ? ' - ' + listingPositions.alleyTypeName : '';

                let roadFrontageDistanceFrom = '';
                if (listingPositions.roadFrontageDistanceFrom == 0) {
                    roadFrontageDistanceFrom = ' - Khoảng cách đến mặt tiền đường: <= 100m';
                } else if (listingPositions.roadFrontageDistanceFrom == 100) {
                    roadFrontageDistanceFrom = ' - Khoảng cách đến mặt tiền đường: 100m - 200m';
                } else if (listingPositions.roadFrontageDistanceFrom == 200) {
                    roadFrontageDistanceFrom = ' - Khoảng cách đến mặt tiền đường: 200m - 500m';
                } else if (listingPositions.roadFrontageDistanceFrom == 500) {
                    roadFrontageDistanceFrom = ' - Khoảng cách đến mặt tiền đường: >500';
                }

                strAlley = listingPositions.postionName + alleyWidth + typeName + alleyName + roadFrontageDistanceFrom;
            }
        }
        return strAlley;
    }

    return (
        <div className="deal-listing-info">
            <Heading title="Thông tin Listing" />
            <div className="listing-info-container">
                <div className="block-call">
                    <div>
                        <label className="control-label">Listing <a target="_blank" href={`/pos/sa/detail/${listItem?.rlistingId}`}>{listItem?.rlistingId}</a></label><br />
                        <label className="control-label">{listItem.address ? listItem.address : ''}</label>
                    </div>
                    <button onClick={() => listItem && makeCall(listItem.phone, listItem.dealId, false)} className="btn btn-success"><i className="fa fa-volume-control-phone" aria-hidden="true"></i> Call Chủ Tin Đăng</button>
                </div>
                <br />
                <div className="row">
                    <div className="col-md-6">
                        <div className="row">
                            <div className="col-md-6"><span className="red-text">Ngày dự kiến bán</span></div>
                            <div className="col-md-6">{listItem.bpoCloseDate ? moment(listItem.bpoCloseDate).format("DD/MM/YYYY") : ''}</div>
                        </div>
                    </div>
                </div>
                <br />

                <div className="row">
                    <div className="col-md-6">
                        <div className="row">
                            <div className="col-md-6">
                                <label className="control-label">Giá/m2:</label>
                            </div>
                            <div className="col-md-6">
                                {listItem.formatPricePerSquareMeterOfLotSize ? listItem.formatPricePerSquareMeterOfLotSize + '/m2' : ''}

                                {listItem?.comparedToMarket && <div className="block-price-info">
                                    {listItem?.comparedToMarket && listItem.comparedToMarket > 0 ? <i className="fa fa-long-arrow-up red-text" aria-hidden="true"></i> : <i className="fa fa-long-arrow-down green-text" aria-hidden="true"></i>}

                                    <p className={listItem?.comparedToMarket && listItem.comparedToMarket > 0 ? 'red-text' : 'green-text'}>
                                        {listItem?.comparedToMarket || ''}%
                                    </p>

                                    <span data-toggle="tooltip" data-placement="top" title={listItem?.comparedToMarket && listItem.comparedToMarket > 0 ? `Giá nhà cao hơn ${listItem.comparedToMarket}% so với giá sơ bộ tự động` : `Giá nhà thấp hơn ${listItem?.comparedToMarket}% so với giá sơ bộ tự động`} className="glyphicon glyphicon-info-sign price-tooltip"></span>
                                </div>}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="row">
                            <div className="col-md-6"><label className="control-label">Giá sơ bộ tự động cùng khu vực:</label></div>
                            <div className="col-md-6">{listItem.formatPreliminaryPrice ? listItem.formatPreliminaryPrice + '/m2' : ''}</div>
                        </div>
                    </div>
                </div>
                <br />

                <label className="control-label">Thông tin Listing</label>
                <p></p>
                <br />

                <div className="row">
                    <div className="col-md-6">
                        <div className="row">
                            <div className="col-md-6"><label className="control-label">Diện tích</label></div>
                            <div className="col-md-6">{listItem.lotSize ? listItem.lotSize + 'm2' : ''}</div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="row">
                            <div className="col-md-6"><label className="control-label">Rộng - Dài</label></div>
                            <div className="col-md-6">
                                {listItem.sizeWidth && listItem.sizeLength ? `${listItem.sizeWidth}m x ${listItem.sizeLength}m` : 
                                    listItem.sizeWidth && !listItem.sizeLength ? `${listItem.sizeWidth}m` :
                                    !listItem.sizeWidth && listItem.sizeLength ? `${listItem.sizeLength}m` : ''}
                            </div>
                        </div>
                    </div>
                </div>
                <br />

                <div className="row">
                    <div className="col-md-6">
                        <div className="row">
                            <div className="col-md-6"><label className="control-label">Giá</label></div>
                            <div className="col-md-6">{listItem.formatPrice ? listItem.formatPrice : ''}</div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="row">
                            <div className="col-md-6"><label className="control-label">Phòng ngủ - WC</label></div>
                            <div className="col-md-6">
                                {listItem.bedrooms && listItem.bathrooms ? `${listItem.bedrooms}PN - ${listItem.bathrooms}WC` : 
                                    listItem.bedrooms && !listItem.bathrooms ? `${listItem.bedrooms}PN` :
                                    !listItem.bedrooms && listItem.bathrooms ? `${listItem.sizeLength}WC` : ''}
                            </div>
                        </div>
                    </div>
                </div>
                <br />

                <div className="row">
                    <div className="col-md-6">
                        <div className="row">
                            <div className="col-md-6"><label className="control-label">Hiện trạng nhà</label></div>
                            <div className="col-md-6">{listItem.statusQuoName ? listItem.statusQuoName : '' }</div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="row">
                            <div className="col-md-6"><label className="control-label">Kết cấu</label></div>
                            <div className="col-md-6">{listItem.formatNumberFloor ? listItem.formatNumberFloor : ''}</div>
                        </div>
                    </div>
                </div>
                <br />

                <div className="row">
                    <div className="col-md-6">
                        <div className="row">
                            <div className="col-md-6"><label className="control-label">Vị trí</label></div>
                            <div className="col-md-6">{renderPosition(listItem?.listingPositions)}</div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="row">
                            <div className="col-md-6"><label className="control-label">Vấn đề pháp lý</label></div>
                            <div className="col-md-6">{listItem.legal && listItem.privacyName ? `${listItem.legal}, ${listItem.privacyName}` : listItem.legal ? listItem.legal : ''}</div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ListingDetail
import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import PropTypes from 'prop-types'
import './BPOListingDetailModal.scss'
import { useFetchListingModalDetail } from '../../hooks'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

function BPOListingDetailModal(props) {

    const { opened, backdrop, keyboard, handleCloseFunc, rListingId } = props;
    const [isShow, setIsShow] = useState(false)
    const [loading, listingDetail, listingDetailCompare] = useFetchListingModalDetail(rListingId);
    const [photoIndex, setPhotoIndex] = useState(0);

    const onHideModal = () => {
        handleCloseFunc && handleCloseFunc();
    }

    const renderPaperLegalHtml = (listingDetail) => {
        let $return = "N/A";
        if(listingDetail && listingDetail.legal){
            $return = listingDetail.legal;
        }

        let $privacy = "";
        if(listingDetail && listingDetail.privacy){
            switch (listingDetail.privacy) {
                case 1:
                    $privacy = " (Sở hữu chung)";
                    break;
                case 2:
                    $privacy = " (Sở hữu riêng)";
                    break;
                default:
                    $privacy = "";
                    break;
            }
        }
        return $return + $privacy;
    }

    const renderOverview = () => {

        if (listingDetail) {
            let liveDate = listingDetail.numberDaysOfLive ? listingDetail.numberDaysOfLive : 'N/A';
            let numberOfViewingsConcat = listingDetail.numberOfViewings + '/' + liveDate;

            const renderLegalHtml = () => {
                if (listingDetail.legalsOfListing && listingDetail.legalsOfListing.length != 0) {
                    return (
                        <>
                            <ul>
                                {listingDetail.legalsOfListing.map((item) =>
                                    <li>{item.legalName} {item.content ? '(' + item.content + ')' : ''}</li>
                                )}
                            </ul>
                        </>
                    );
                }
                return (<>N/A</>);
            }

            const renderStarFeedback = () => {
                if (listingDetail.avgScoreAfterWatching) {
                    return (<>
                        <b class="starRenderPropzy" poin={listingDetail.avgScoreAfterWatching}></b>
                    </>)
                }
                return (<> N/A</>)
            }

            const renderAdvantage = (type) => {
                if (listingDetail.advantageList.length != 0 && type == 'advantage') {
                    return (<>
                        <ul>
                            {listingDetail.advantageList.map((item) =>
                                <li>{item.advantageName} </li>
                            )}
                        </ul>
                    </>)
                } else if (listingDetail.disAdvantageList.length != 0 && type == 'disAdvantage') {
                    return (<>
                        <ul>
                            {listingDetail.disAdvantageList.map((item) =>
                                <li>{item.disAdvantageName} </li>
                            )}
                        </ul>
                   </>)
                } else {
                    return (<> N/A</>)
                }
            }

            return (
                <div className="listing-detail__nothing">
                    <div className="title-with-line">
                        <span>TỔNG QUAN</span>
                    </div>
                    <div className="content">
                        <div className="row item-row">
                            <div className="col-md-6">
                                <b>Trạng thái listing: </b> {listingDetail?.JMStatusId || 'N/A'}
                                <br />
                                {/* <small style="color: #fb7533"
                  >
                    <i className="fa fa-mobile" aria-hidden="true"></i> Đã mời sử dụng Propzy App
                  (DIY)</small> */}
                            </div>

                            <div className="col-md-6"><b>Lần cuối check trống: </b>
                                {listingDetail?.checkedDate ? moment(listingDetail.checkedDate).format('d-M-Y') : 'N/A'}</div>
                        </div>
                        <div className="row item-row">
                            <div className="col-md-6"><b>Lượt đi xem: </b> {listingDetail?.numberOfViewings || 'N/A'}</div>

                            <div className="col-md-6"><b>Mật độ được chọn đi xem: </b>
                                {listingDetail?.numberOfViewings ? numberOfViewingsConcat : 'N/A'}
                            </div>
                        </div>

                        <div className="row item-row">
                            <div className="col-md-6"><b>Đặc điểm tốt: </b>{renderAdvantage('advantage')}</div>
                            <div className="col-md-6"><b>Đặc điểm xấu: </b>{renderAdvantage('disAdvantage')}</div>
                        </div>
                        <div className="row item-row">
                            <div className="col-md-6">
                                <b>Lần cuối cập nhật: </b>
                                <a href={void(0)}>
                                    {listingDetail?.updatedDate ? moment(listingDetail.updatedDate).format('d-M-Y') : 'N/A'}
                                </a>
                            </div>
                            <div className="col-md-6"><b>Vấn đề pháp lý: </b> {renderPaperLegalHtml(listingDetail)}</div>
                        </div>
                        <div className="row item-row">
                            <div className="col-md-6"><b>Thông tin quy hoạch: </b> {listingDetail?.planningInfo || 'N/A'}</div>
                            <div className="col-md-6"><b>Loại nhà: </b> {listingDetail?.constructionTypeName || 'N/A'}</div>
                        </div>
                        <div className="row item-row">
                            <div className="col-md-6"><b>Ghi chú thông tin địa chỉ: </b> {listingDetail?.addressNote || 'N/A'}</div>
                            <div className="col-md-6">
                                <b>Hoa hồng: </b>
                                <ul>
                                    <li>{listingDetail?.commissionList[0].formatCommission || 'N/A'}</li>
                                </ul>
                            </div>
                        </div>
                        <div className="row item-row">
                            <div className="col-md-12"><b>Nguồn: </b> {[171, 166, 3].includes(listingDetail.sourceId) ? listingDetail.sourceName : 'N/A'}</div>
                        </div>
                        <div className="row item-row">
                            <div className="col-md-12 textContainer_Truncate">
                                <b>Thông tin pháp lý: </b> {renderLegalHtml()}
                            </div>
                        </div>
                        <div className="row item-row">
                            <div className="col-md-12 textContainer_Truncate">
                                <b>Đánh giá của CRM: </b> N/A
                            </div>
                        </div>
                        <div className="row item-row">
                            <div className="col-md-12">
                                <b>Điểm đánh giá TB sau khi xem:</b> {renderStarFeedback()}
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }

    const renderCompare = () => {
        let avgListing = listingDetailCompare.avgListing ? JSON.parse(listingDetailCompare.avgListing) : null;
        return (
        <div className="listing_detail__compare">
            <div className="title-with-line">
                <span>SO SÁNH</span>
            </div>
            <div className="content">
                <table className="table-striped-custom table table-striped">
                    <thead>
                        <tr>
                            <th>Tiêu chuẩn</th>
                            <th>Listing bạn chọn</th>
                            <th>Còn lại</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Giá</td>
                            <td>{listingDetailCompare?.formatPrice || 'N/A'}</td>
                            <td>{avgListing?.formatPrice || 'N/A'}</td>
                        </tr>
                        <tr>
                            <td>Giá/m2</td>
                            <td>{listingDetailCompare?.formatPricePerSquareMeterOfLotSize || 'N/A'}</td>
                            <td>{avgListing?.formatPricePerSquareMeterOfLotSize || 'N/A'}</td>
                        </tr>
                        <tr>
                            <td>Diện tích đất</td>
                            <td>{listingDetailCompare?.lotSize || 'N/A'}</td>
                            <td>{avgListing?.lotSize || 'N/A'}</td>
                        </tr>
                        <tr>
                            <td>Diện tích sử dụng</td>
                            <td>{listingDetailCompare?.floorSize || 'N/A'}</td>
                            <td>{avgListing?.floorSize || 'N/A'}</td>
                        </tr>
                        <tr>
                            <td>Lượt view (tour)</td>
                            <td>{listingDetailCompare?.numberOfViewings || 'N/A'}</td>
                            <td>{avgListing?.numberOfViewings || 'N/A'}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        )
    }
    
    const renderAlley = (listingPositions) => {
        let strAlley = 'N/A';
        if (listingPositions) {

            if(listingPositions.postionName && listingPositions.postionName != 'Hẻm') {
                let roadFrontageWidth = listingPositions.roadFrontageWidth ?
                 ' (' + listingPositions.roadFrontageWidth + 'm)' : '';
                strAlley = listingPositions.postionName + roadFrontageWidth ;
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

    const renderScorecard = () => {
        if (listingDetail.scorecardType == 1637) {
            return (<>
                <p> 
                   <span className="label">Nhãn</span>
                   <span className="p-l-xss">
                       <i className="fa fa-circle label-high"></i> {listingDetail?.scorecardName || 'N/A'}
                    </span>
                    {listingDetail?.score ? <span> Điểm: {listingDetail.score}</span> : ''}
               </p>
           </>)
        } else if (listingDetail.scorecardType == 1638) {
            return (<>
                <p> 
                   <span className="label">Nhãn</span>
                   <span className="p-l-xss">
                       <i className="fa fa-circle label-medium"></i> {listingDetail?.scorecardName || 'N/A'}
                    </span>
                    {listingDetail?.score ? <span> Điểm: {listingDetail.score}</span> : ''}
               </p>
           </>)
        } else if (listingDetail.scorecardType == 1639) {
            return (<>
                <p> 
                   <span className="label">Nhãn</span>
                   <span className="p-l-xss">
                       <i className="fa fa-circle label-low"></i> {listingDetail?.scorecardName || 'N/A'}
                    </span>
                    {listingDetail?.score ? <span> Điểm: {listingDetail.score}</span> : ''}
               </p>
           </>)
        } else {
            return (<>
                <p> 
                   <span className="label">Nhãn</span>
                   <span className="p-l-xss">
                       <i className="fa fa-circle label-unclassified"></i> {listingDetail?.scorecardName || 'N/A'}
                    </span>
                    {listingDetail?.score ? <span> Điểm: {listingDetail.score}</span> : ''}
               </p>
           </>)
        }
    }

    return (
        <>
            <Modal
                className="listing-detail "
                show={opened}
                onHide={onHideModal}
                backdrop={backdrop}
                keyboard={keyboard}
                size="lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title>
                        THÔNG TIN LISTING <a>#{rListingId}</a>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="listing-detail__body">
                    {loading ? <div>Loading ...</div> :
                        (
                            <div className="listing-detail">
                                <div className="listing-detail__images" style={{ backgroundImage: `url(${listingDetail?.photos[0]?.link})` }}>
                                    {listingDetail?.photos.length &&
                                        <a className="link" onClick={() => setIsShow(true)}>Show {listingDetail.photos.length} ảnh</a>
                                    }

                                    {isShow &&
                                        <Lightbox
                                            mainSrc={listingDetail?.photos[photoIndex].link}
                                            nextSrc={listingDetail?.photos[(photoIndex + 1) % listingDetail?.photos.length].link}
                                            prevSrc={listingDetail?.photos[(photoIndex + listingDetail?.photos.length - 1) % listingDetail?.photos.length].link}
                                            onCloseRequest={() => setIsShow(false)}
                                            onMovePrevRequest={() =>
                                                setPhotoIndex((photoIndex + listingDetail?.photos.length - 1) % listingDetail?.photos.length
                                                )}
                                            onMoveNextRequest={() =>
                                                setPhotoIndex((photoIndex + 1) % listingDetail?.photos.length
                                                )}
                                        />
                                    }
                                </div>

                                <div className="listing-detail__details">
                                    <div className="title-with-line">
                                        <span>CHI TIẾT</span>
                                    </div>

                                    <div className="listing-detail__details content">
                                        <div className="item">
                                            <p>
                                                <span className="label">Lên Live:</span>
                                                <span className="p-l-xss">{
                                                listingDetail?.numberDaysOfLive ? listingDetail.numberDaysOfLive + ' ngày trước' : 'N/A'}
                                                </span>
                                            </p>

                                            <p>
                                                <span className="label">Đơn giá:</span>
                                                <span className="p-l-xss">{listingDetail?.formatPrice}</span>
                                            </p>

                                            <p>
                                                <span className="label">Vị trí:</span>
                                                <span className="p-l-xss">
                                                    {renderAlley(listingDetail?.listingPositions)}
                                                </span>
                                            </p>

                                            {listingDetail?.scorecardType && renderScorecard()}
                                        </div>

                                        <div className="item">
                                            <p>
                                                <span className="label">Diện tích:</span>
                                                {/* <span className="p-l-xss">
                                                    {listingDetail?.lotSize ? listingDetail.lotSize + ' &#x33a1;' : 'N/A'}
                                                </span> */}
                                                {<span dangerouslySetInnerHTML={{__html: listingDetail?.lotSize ? listingDetail.lotSize + ' &#x33a1;' : 'N/A'}}  className="p-l-xss"></span>}
                                            </p>

                                            <p>
                                                <span className="label">Năm XD:</span>
                                                <span className="p-l-xss">{listingDetail?.yearBuilt || 'N/A'}</span>
                                            </p>

                                            <p>
                                                <span className="label">Phòng ngủ - WC:</span>
                                                <span className="p-l-xss">
                                                {listingDetail?.bedrooms || 'N/A'} - {listingDetail?.bathrooms || 'N/A'} </span>
                                            </p>
                                        </div>

                                        <div className="item">
                                            <p>
                                                <span className="label">Rộng Dài:</span>
                                                <span className="p-l-xss">
                                                    {listingDetail?.sizeWidth || 'N/A'} - {listingDetail?.sizeLength || 'N/A'}
                                                </span>
                                            </p>

                                            <p>
                                                <span className="label">Kết Cấu:</span>
                                                <span className="p-l-xss">
                                                    {listingDetail?.formatNumberFloor && listingDetail.formatNumberFloor != '--' ? 
                                                    listingDetail.formatNumberFloor : 'N/A'}
                                                </span>
                                            </p>

                                            <p>
                                                <span className="label">Giá thuê:</span>
                                                <span className="p-l-xss">{listingDetail?.formatPriceForStatusQuo || 'N/A'}</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="listing-detail__zoning">
                                    <div className="title-with-line">
                                        <span>THÔNG TIN QUI HOẠCH</span>
                                    </div>

                                    <div className="listing-detail__zoning content">
                                        <div className="item">
                                            <p>
                                                <span className="label">Loaị qui hoạch:</span>
                                                <span className="p-l-xss">{listingDetail?.plan?.typeName || 'N/A'}</span>
                                            </p>

                                            <p>
                                                <span className="label">Lộ giới:</span>
                                                <span className="p-l-xss">{listingDetail?.plan?.rightOfWay || 'N/A'}</span>
                                            </p>
                                        </div>

                                        <div className="item">
                                            <p>
                                                <span className="label">Diện tích bị qui hoạch:</span>
                                                {/* <span className="p-l-xss">
                                                    {listingDetail?.plan?.area ?
                                                     listingDetail.plan.area + '&#x33a1; (' + Math.round(((listingDetail.plan.area/listingDetail.lotSize)*100),2) + '%)'
                                                    : 'N/A'}
                                                </span> */}
                                                {<span dangerouslySetInnerHTML={{__html: listingDetail?.plan?.area ?
                                                    parseFloat(listingDetail.plan.area).toFixed(2) + '&#x33a1; (' + Math.round(((listingDetail.plan.area/listingDetail.lotSize)*100),2) + '%)'
                                                    : 'N/A'}}  className="p-l-xss"></span>}
                                            </p>

                                            <p>
                                                <span className="label">Ghi chú:</span>
                                                <span className="p-l-xss">{listingDetail?.plan?.note || 'N/A'}</span>
                                            </p>
                                        </div>

                                        <div className="item">
                                            <p>
                                                <span className="label">Diện tích còn lại:</span>
                                                {/* <span className="p-l-xss">
                                                    {listingDetail?.plan?.area ?
                                                    listingDetail.lotSize - listingDetail.plan.area + '&#x33a1; (' + Math.round(100-((listingDetail.plan.area/listingDetail.lotSize)*100),2) + '%)'
                                                    : 'N/A'}
                                                </span> */}
                                                {<span dangerouslySetInnerHTML={{__html: listingDetail?.plan?.area ?
                                                    listingDetail.lotSize - parseFloat(listingDetail.plan.area).toFixed(2) + '&#x33a1; (' + Math.round(100-((listingDetail.plan.area/listingDetail.lotSize)*100),2) + '%)'
                                                    : 'N/A'}}  className="p-l-xss"></span>}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="listing-detail__valuation">
                                    <div className="title-with-line">
                                        <span>THẨM ĐỊNH GIÁ</span>
                                    </div>

                                    <div className="listing-detail__valuation content">
                                        <div className="item">
                                            <p>
                                                <span className="label">Công ty thẩm định:</span>
                                                <span className="p-l-xss">{listingDetail?.valuationInfo?.companyName || 'N/A'}</span>
                                            </p>
                                        </div>
                                        <div className="item">
                                            <p>
                                                <span className="label">Loại thẩm định:</span>
                                                <span className="p-l-xss">{listingDetail?.valuationInfo?.typeName || 'N/A'}</span>
                                            </p>
                                        </div>
                                        <div className="item">
                                            <p>
                                                <span className="label">Giá thẩm định:</span>
                                                <span className="p-l-xss">{listingDetail?.valuationInfo?.price || 'N/A'}</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                {renderOverview()}

                                {listingDetailCompare && renderCompare() }
                            </div>
                        )}
                </Modal.Body>
                <Modal.Footer>
                    {/* <Button variant="secondary" onClick={onHideModal}>
            Huỷ
          </Button>
          <Button variant="primary">
            Lưu và gởi BPO
          </Button> */}
                </Modal.Footer>
            </Modal>
        </>
    )
}

BPOListingDetailModal.propTypes = {
    opened: PropTypes.bool,
    backdrop: PropTypes.any,
    keyboard: PropTypes.bool,
    handleCloseFunc: PropTypes.func,
}

BPOListingDetailModal.defaultProps = {
    opened: false,
    backdrop: false,
    keyboard: false,
    handleCloseFunc: null
}

export default BPOListingDetailModal


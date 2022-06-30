import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import BPODialog from "../BPODialog";
import BPOListingDetailModal from "../BPOListingDetailModal";
import BPORating from "../BPORating";
import "./BPOListItem.scss";
import NotificationMessage from '../../../commonComponents/notifications/NotificationMessage';
import moment from "moment";
import { BPO_URL } from '../../constants'

function BPOListItem({listing, reloadList}) {
    const [isShow, setIsShow] = useState(false);
    const [bpoLoading, setBpoLoading] = useState(false);
    const [listingId, setListingId] = useState(0);
    const [isNotification, setIsNotification] = useState(false);
    const [modelListing, setModelListing] = useState(null);
    const [
        isShowBPOListingDetailModal,
        setIsShowBPOListingDetailModal,
    ] = useState(false);


    useEffect(() => {
        listing && setModelListing(listing);
    }, [listing])

    const onHandleCloseDialog = (bpoGrade) => {
        setIsShow(false);

        if (bpoGrade !== null) {
            // update list
            const cloneModel = {...modelListing};

            cloneModel.bpoGrade = bpoGrade;

            setModelListing(cloneModel);

            setTimeout(() => {
                window.location.reload();

                // after 500ms , we will reload page when success !
            }, 500);

        }
    };

    const onHandleCloseModalDetail = () => {
        setIsShowBPOListingDetailModal(false);
    };

    const openBPO = (listing) => {
         Window.showBaHistory(listing?.rListingId || 0)
    };

    const openBPOListingDetailModal = () => {
        setIsShowBPOListingDetailModal(true);
        setListingId(modelListing?.rListingId);
    };

    const buildBALabel = (gradeBA) => {
        return (
            <BPORating
                rating={gradeBA}
                starSpacing="1px"
                starDimension="30px"
                disabled
            />
        );
    };

    const bpoCloseDate = () => {
        const bpoCloseDate = modelListing?.bpoCloseDate ? `(${moment(modelListing.bpoCloseDate).format("DD/MM/YYYY")})` : '';
        if (modelListing?.gradeBA && modelListing?.gradeBA) {
            if(modelListing?.gradeBA === 1) {
                return (
                    <div className="lis-ba" style={{fontSize: "10px"}}>{modelListing.question}</div>
                ); 
            }
            return (
                <div className="lis-ba" style={{fontSize: "10px"}}>{modelListing.question} {bpoCloseDate}</div>
            );
        }
        return '';
    }

    const renderBAEvaluate = () => {
        if (modelListing?.bpoUserDto && modelListing.bpoUserDto.length > 0) { 
            return modelListing.bpoUserDto.map((evaluateItem, evaluateIndex) => {
                return (
                        <div className="evaluate-item" key={evaluateItem.userId + evaluateIndex}>
                            <p className="name">{evaluateItem?.name ? evaluateItem.name : '' }</p>
                            {!evaluateItem?.grade && <div><a className="pointer" onClick={() => {Window.showBaSaveBpo(modelListing.rListingId,evaluateItem.userId);return false}}>Chưa BPO</a></div> }
                            {evaluateItem.grade && (<a className="evaluate-score-block-list cursor-pointer">
                                <div>{buildBALabel(evaluateItem.grade)}</div>
                            </a>)}
                            {evaluateItem?.answer ? (<p>{evaluateItem.answer}</p>) : ''}
                            {evaluateItem?.ratingDate ? (<p className="bpo-close-date">Ngày đánh giá: {`${moment(evaluateItem.ratingDate).format("DD/MM/YYYY")}`}</p>) : '' }
                            {evaluateItem?.ratingName && evaluateItem.ratingUser !== evaluateItem.userId && <p>Người đánh giá: {evaluateItem.ratingName}</p>}
                        </div>
                );
            })
        }
    }

    
    return (
        <div className="list-item">
            <div
                className="list-item__images"
                onClick={openBPOListingDetailModal}
            >
                <img className="list-item__img" alt={modelListing?.photo?.caption} src={modelListing?.photo?.link} />
                {modelListing?.liveType && modelListing?.liveType != 195 && (<span className="list-item__liveType">{modelListing?.liveTypeName}</span>)}
            </div>

            <div className="list-item__information">
                <div className="lis-id p-b-xxs">
                    <i className="fa fa-bars"></i>
                    <span className="p-l-xxs">LID: <a onClick={openBPOListingDetailModal}>{modelListing?.rListingId}</a></span>
                </div>
                <div className="lis-address p-b-xxs">
                    <i className="fa fa-map-marker"></i>
                    <span className="p-l-xxs">{modelListing?.address}</span>
                </div>
                <div className="lis-price-mix-acreage p-b-xxs">
                    <span>
                        <i className="fa fa-usd"></i>
                        <span className="p-l-xxs">{modelListing?.formatPrice}</span>
                    </span>
                    {modelListing?.lotSize && (
                        <span>
                            <span> - </span>
                            <span>
                                <i className="fa fa-window-maximize"></i>
                                <span className="p-l-xxs">{modelListing?.lotSize} ㎡</span>
                            </span>
                        </span>
                    )}
                </div>
                <div className="lis-bpo tag p-b-xxs">
                    
                    <span className="strong">Điểm BPO:</span>{" "}
                    <a
                        className={`evaluate-score-block-list ${bpoLoading ? 'cursor-loading' : 'cursor-pointer'}`}
                        onClick={() => openBPO(modelListing)}
                    >
                        {modelListing?.bpoCloseGrade && <span>{modelListing.bpoCloseGrade} - </span>}<span>{modelListing?.bpoStatusName ? modelListing.bpoStatusName : ''}</span>
                    </a>
                    
                </div>
                <div className="lis-ba tag p-b-xxs">
                    <p>Người đánh giá BPO</p>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="evaluate-container">
                            {renderBAEvaluate()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Every time when you was called the BPODialog will be init default from BPO resource API*/}
            {isShow && (
                <BPODialog
                    rListingId={listingId}
                    opened={isShow}
                    reload={reloadList && reloadList()}
                    handleCloseFunc={onHandleCloseDialog}
                ></BPODialog>
            )}

            {isShowBPOListingDetailModal && (
                <BPOListingDetailModal
                    rListingId={listingId}
                    opened={isShowBPOListingDetailModal}
                    handleCloseFunc={onHandleCloseModalDetail}
                ></BPOListingDetailModal>
            )}

            {isNotification &&
                <NotificationMessage
                    duration={1500}
                    data={{
                        type: 'error',
                        message: 'Bạn không có quyền để đánh gía BPO'
                    }}
                    handleClose={() => setIsNotification(false)}
                />
            }
        </div>
    );
}

BPOListItem.propTypes = {
    listing: PropTypes.object,
    reloadList: PropTypes.func,
};

BPOListItem.defaultProps = {
    // 🔴 : Fake modal , replace when api is available !
    listing: {
        listingId: null,
        BA: 0,
        acreage: 0,
        address: "",
        bpo: 0,
        price: null,
        images: [],
    },
};

export default BPOListItem;

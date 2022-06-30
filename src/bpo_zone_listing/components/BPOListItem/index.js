import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import BPOListingDetailModal from "../BPOListingDetailModal";
import "./BPOListItem.scss";
import moment from "moment";
function BPOListItem({listing}) {
    const [listingId, setListingId] = useState(0);
    const [modelListing, setModelListing] = useState(null);
    const [isShowBPOListingDetailModal, setIsShowBPOListingDetailModal] = useState(false);

    useEffect(() => {
        listing && setModelListing(listing);
    }, [listing]);

    const onHandleCloseModalDetail = () => {
        setIsShowBPOListingDetailModal(false);
    };

    const openBPOListingDetailModal = () => {
        setIsShowBPOListingDetailModal(true);
        setListingId(modelListing?.rListingId);
    };

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
                    <span className="label-primary evaluate-score-block-list">BPO: {modelListing?.bpoCloseGrade}</span>
                    <span>Ngày chốt bán: {modelListing?.bpoCloseGrade == 1 ? 'Rất khó bán' : `${moment(modelListing?.bpoCloseDate).format("DD/MM/YYYY")}`}</span>
                </div>
            </div>

            {isShowBPOListingDetailModal && (
                <BPOListingDetailModal
                    rListingId={listingId}
                    opened={isShowBPOListingDetailModal}
                    handleCloseFunc={onHandleCloseModalDetail}
                ></BPOListingDetailModal>
            )}
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

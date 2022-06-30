import React, { useState } from "react";
import Modals from "components/utils/Modals";
import BaSaveBpo from "components/baSaveBpo/BaSaveBpo";
import BaBpoEvaluationHistory from "components/baBpoEvaluationHistory/BaBpoEvaluationHistory";
const _Window = (window as any).Window;
const BpoImprove = () => {
    const [isToggleBaHistory, setIsToggleBaHistory] = useState(false);
    const [listingId, setListingId] = useState(0);
    const [assignedTo, setAssignedTo] = useState(0);
    const [togglePopupBASaveBPO, setTogglePopupBASaveBPO] = useState(false);
    const showBaSaveBpo = (listingId: number, assignedTo: number) => {
        setListingId(listingId);
        setAssignedTo(assignedTo);
        setTogglePopupBASaveBPO(true);
    };
    _Window.showBaSaveBpo = showBaSaveBpo;

    const showBaHistory = (listingId: number) => {
        setListingId(listingId);
        setIsToggleBaHistory(true);
    };
    _Window.showBaHistory = showBaHistory;

    return (
        <>
            <Modals
                isDisplay={togglePopupBASaveBPO}
                title="Đánh giá BPO Listing"
                className="popup-bpo-improve"
                onCancelAction={() => setTogglePopupBASaveBPO(false)}
            >
                <BaSaveBpo
                    onCloseModal={() => setTogglePopupBASaveBPO(false)}
                    rlistingId={listingId}
                    assignedTo={assignedTo}
                />
            </Modals>

            <Modals
                isDisplay={isToggleBaHistory}
                title="Lịch sử đánh giá BPO listing"
                className="popup-bpo-improve"
                onCancelAction={() => setIsToggleBaHistory(false)}
            >
                <BaBpoEvaluationHistory
                    onCloseModal={() => setIsToggleBaHistory(false)}
                    listingId={listingId}
                />
            </Modals>
        </>
    );
};

export default BpoImprove;

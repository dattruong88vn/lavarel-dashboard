import React, { FC, memo, useEffect, useState } from "react";
import { RatingView } from "components/utils";
import "./baBpoEvaluator.scss";
import {
    BpoCommentHistoryResponse,
    BpoCommentHistoryType,
    RatingUsers,
    UserStatusId,
} from "model";
import moment from "moment";
import BPOComment from "../BPOComment/BaBPOComment";
import {
    getCommentsBpoHistorySaBa,
    getCommentsCurrentBpoSaBa,
} from "api/bpoHistory/bpoHistory";

interface BaBPOEvaluatorProps {
    resultData: RatingUsers;
    rlistingId: number;
    index: number;
    ratingId: number;
}
const BaBPOEvaluator: FC<BaBPOEvaluatorProps> = (props) => {
    const { resultData, ratingId, index, rlistingId } = props;

    const isActive = resultData?.userStatusId === UserStatusId.ACTIVE;
    const [commentData, setCommentData] = useState<BpoCommentHistoryResponse[]>(
        []
    );
    const [expandCollapse, setExpandCollapse] = useState(false);
    const collapseText = expandCollapse ? "Thu gọn ghi chú " : "Xem ghi chú";
    const showAssignedText = resultData?.ratingUser !== resultData?.assignedTo;
    const onClickCollapse = () => {
        if (expandCollapse === true) {
            setExpandCollapse(false);
            return;
        }

        index === 0
            ? (async () => {
                  const response = await getCommentsCurrentBpoSaBa({
                      type: BpoCommentHistoryType.CURRENT_BPO,
                      rlistingId: rlistingId,
                      assignedTo: resultData?.assignedTo,
                  });
                  setCommentData(response.data);
                  setExpandCollapse(true);
              })()
            : (async () => {
                  const response = await getCommentsBpoHistorySaBa({
                      type: BpoCommentHistoryType.BPO_HISTORY,
                      ratingId: ratingId,
                      assignedTo: resultData?.assignedTo,
                  });
                  setCommentData(response.data);
                  setExpandCollapse(true);
              })();
    };
    const getDateString = (date: number) => {
        return date ? moment(date).format("DD/MM/YYYY") : "";
    };

    return (
        <div className="ba-bpo-evaluator-container">
            <div className="bpo-evaluator">
                <div className="bpo-evaluator-top">
                    <div className="text-left">
                        <div className="two-text">
                            <p className="bold-title">
                                {resultData?.assignedToName}
                            </p>
                            {!isActive && (
                                <p className="orange-title">
                                    ({resultData?.userStatus})
                                </p>
                            )}
                        </div>
                        <div className="rate">
                            <RatingView
                                currentRate={resultData?.grade}
                                readOnly={true}
                                textHard={resultData?.answer}
                            />
                        </div>
                        {showAssignedText && (
                            <div className="nomal-title-gray">
                                Người đánh giá:&nbsp;
                                {resultData?.ratingUserName}
                            </div>
                        )}
                        {resultData?.hasComment && (
                            <button
                                className="collapse-button"
                                onClick={onClickCollapse}
                            >
                                {collapseText}
                            </button>
                        )}
                    </div>
                    <p className="text-right">
                        Ngày đánh giá: &nbsp;
                        {getDateString(resultData?.ratingDate)}
                    </p>
                </div>
                <div
                    className={
                        "collapsible" + (expandCollapse ? " active" : "")
                    }
                >
                    {commentData.map((item, index) => {
                        return <BPOComment commentData={item} />;
                    })}
                </div>
            </div>
        </div>
    );
};

export default memo(BaBPOEvaluator);

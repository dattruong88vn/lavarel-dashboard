import {
    getCommentsBpoHistoryConflict,
    getCommentsCurrentBpoConflict,
} from "api/bpoHistory/bpoHistory";
import {
    BpoCommentHistoryResponse,
    BpoCommentHistoryType,
    BpoFinalCaseId,
    FinalRating,
} from "model";
import moment from "moment";
import React, { FC, memo, useEffect, useState } from "react";
import BPOComment from "../BPOComment/BPOComment";
import "./bpoResult.scss";

interface BPOResultProps {
    resultData: FinalRating;
    rlistingId: number;
    index: number;
    ratingId: number;
}

const BPOResult: FC<BPOResultProps> = (props) => {
    const { resultData, rlistingId, index, ratingId } = props;
    const resultKey = resultData?.bpoFinalCaseId;
    const [expandCollapse, setExpandCollapse] = useState(false);
    const [commentData, setCommentData] = useState<BpoCommentHistoryResponse[]>(
        []
    );

    const collapseText = expandCollapse ? "Thu gọn ghi chú " : "Xem ghi chú";
    const getDateString = (date: number) => {
        return date ? moment(date).format("DD/MM/YYYY") : "";
    };

    const renderCloseDate = () => {
        if (!resultData?.bpoCloseDate && resultData?.bpoStatus == 48) {
            return 'Rất khó bán'
        } else {
            return getDateString(resultData?.bpoCloseDate);
        }
    }

    const resultView = (result: BpoFinalCaseId) => {
        switch (result) {
            case BpoFinalCaseId.INCOMPLETE_BPO:
                return (
                    <div className="incomplete-result">
                        <p className="title">Chưa hoàn tất BPO</p>
                    </div>
                );
            case BpoFinalCaseId.COMPLETE_BUT_CONFLICT:
                return (
                    <div className="conflict-result">
                        <p className="bold-title">BPO có khác biệt</p>
                        <p className="nomal-title">
                            Điểm BPO của SA:&nbsp; {resultData?.saGrade}
                        </p>
                        <p className="nomal-title">
                            Điểm BPO trung bình của BAs:&nbsp;
                            {resultData?.avgBAGrade}
                        </p>
                    </div>
                );
            case BpoFinalCaseId.FINALIZED_BPO_WITH_SOLVE_CONFLICT:
                return (
                    <div className="final-result">
                        <div className="final-result-top">
                            <div className="text-left">
                                <p className="bold-title">
                                    Điểm BPO:&nbsp; {resultData?.bpoCloseGrade}
                                </p>

                                <p className="bold-title">
                                    Ngày chốt bán : &nbsp;
                                    {renderCloseDate()}
                                </p>
                                <p className="nomal-title">
                                    {resultData?.resolveUser}&nbsp; -&nbsp; giải
                                    quyết khác biệt
                                </p>
                                {resultData?.hasCommentSolvedConflict && (
                                    <button
                                        className="collapse-button"
                                        onClick={onClickCollapse}
                                    >
                                        {collapseText}
                                    </button>
                                )}
                            </div>
                            <p className="text-right">
                                Ngày chốt điểm: &nbsp;
                                {getDateString(resultData?.bpoCloseGradeDate)}
                            </p>
                        </div>
                        <div
                            className={
                                "collapsible" +
                                (expandCollapse ? " active" : "")
                            }
                        >
                            {commentData.map((item, index) => {
                                return <BPOComment commentData={item} />;
                            })}
                        </div>
                    </div>
                );
            case BpoFinalCaseId.FINALIZED_BPO:
                return (
                    <div className="final-result-system">
                        <div className="text-left">
                            <p className="bold-title">
                                Điểm BPO:&nbsp; {resultData?.bpoCloseGrade}
                            </p>

                            <p className="bold-title">
                                Ngày chốt bán : &nbsp;
                                {renderCloseDate()}
                            </p>
                        </div>
                        <p className="text-right">
                            Ngày chốt điểm:&nbsp;
                            {getDateString(resultData?.bpoCloseGradeDate)}
                        </p>
                    </div>
                );
            default:
                return <div />;
        }
    };
    const onClickCollapse = () => {
        if (expandCollapse === true) {
            setExpandCollapse(false);
            return;
        }

        index === 0
            ? (async () => {
                  const response = await getCommentsCurrentBpoConflict({
                      type: BpoCommentHistoryType.CURRENT_BPO_CONFLICT,
                      rlistingId: rlistingId,
                  });
                  setCommentData(response.data);
                  setExpandCollapse(true);
              })()
            : (async () => {
                  const response = await getCommentsBpoHistoryConflict({
                      type: BpoCommentHistoryType.BPO_HISTORY_CONFLICT,
                      ratingId: ratingId,
                  });
                  setCommentData(response.data);
                  setExpandCollapse(true);
              })();
    };
    return (
        <div className="bpo-result-container"> {resultView(resultKey)} </div>
    );
};

export default memo(BPOResult);

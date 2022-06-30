import { BpoFinalCaseId, FinalRating } from "model";
import moment from "moment";
import React, { FC, memo, useEffect, useState } from "react";
import "./baBpoResult.scss";

interface BaBPOResultProps {
    resultData: FinalRating;
    rlistingId: number;
    index: number;
    ratingId: number;
}

const BaBPOResult: FC<BaBPOResultProps> = (props) => {
    const { resultData } = props;
    const resultKey = resultData?.bpoFinalCaseId;

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
                    </div>
                );
            case BpoFinalCaseId.FINALIZED_BPO:
            case BpoFinalCaseId.FINALIZED_BPO_WITH_SOLVE_CONFLICT:
                return (
                    <div className="final-result-system">
                        <div className="text-left">
                            <p className="bold-title">
                                Điểm BPO:&nbsp; {resultData?.bpoCloseGrade}
                            </p>
                            {resultData?.bpoCloseDate ? (
                                <p className="bold-title">
                                    Ngày chốt bán : &nbsp;
                                    {renderCloseDate()}
                                </p>
                            ) : (
                                <p className="nomal-title">Rất khó bán</p>
                            )}
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

    return (
        <div className="ba-bpo-result-container"> {resultView(resultKey)} </div>
    );
};

export default memo(BaBPOResult);

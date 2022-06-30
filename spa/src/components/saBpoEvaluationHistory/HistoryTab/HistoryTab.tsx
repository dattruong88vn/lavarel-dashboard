import React, { FC, memo, useEffect, useState } from "react";
import "./historyTab.scss";
import BPOResult from "./BPOResult/BPOResult";
import DeletedUser from "./User/DeletedUser";
import BPOEvaluator from "./User/BPOEvaluator";
import NoRatingUser from "./User/NoRatingUser";
import { FinalRating, RatingUsers } from "model";
import { saGetBpoHistory } from "api/bpoHistory/bpoHistory";
import { isEmpty } from "lodash";

interface HistoryTabProps {
    ratingId: number;
    rlistingId: number;
    tabIndex: number;
    loadDataDone: (data: FinalRating, index: number) => void;
}

const HistoryTab: FC<HistoryTabProps> = (props) => {
    const { ratingId, rlistingId, tabIndex: index, loadDataDone } = props;

    const [bpoHistory, setBpoHistory] = useState<any>({});

    useEffect(() => {
        (async () => {
            const response = await saGetBpoHistory({
                rlistingId: rlistingId,
                ratingId: ratingId,
            });
            setBpoHistory(getFinalData(response.data));
        })();
    }, []);

    const getFinalData = (response: any) => {
        const bpoCreated: RatingUsers = response.ratingUsers?.filter(
            (item: RatingUsers) => item.isSA === true
        )[0];

        const listBa: RatingUsers[] = response.ratingUsers?.filter(
            (item: RatingUsers) => item.isSA !== true
        );
        const finalRating: FinalRating = response.finalRating;

        loadDataDone(finalRating, index);

        const data: Record<string, Partial<any>> = {
            bpoCreated: bpoCreated,
            listBa: listBa,
            finalRating: finalRating,
        };
        return data;
    };

    const userView = (item: RatingUsers) => {
        if (item.isRemoved) {
            return <DeletedUser resultData={item} />;
        } else if (item.grade === null) {
            return <NoRatingUser resultData={item} />;
        } else {
            return (
                <BPOEvaluator
                    resultData={item}
                    rlistingId={rlistingId}
                    index={index}
                    ratingId={ratingId}
                />
            );
        }
    };

    const returnView = !isEmpty(bpoHistory) ? (
        <div className="sa-history-tab-container">
            <p className="nomal-title"> Kết quả BPO </p>
            <BPOResult
                resultData={bpoHistory.finalRating}
                rlistingId={rlistingId}
                ratingId={ratingId}
                index={index}
            />
            <p className="nomal-title"> Người tạo BPO </p>
            {!isEmpty(bpoHistory.bpoCreated) && (
                <BPOEvaluator
                    resultData={bpoHistory.bpoCreated}
                    rlistingId={rlistingId}
                    index={index}
                    ratingId={ratingId}
                />
            )}
            <p className="nomal-title"> Người được yêu cầu đánh giá BPO </p>
            {bpoHistory?.listBa?.map((item: RatingUsers, index: number) => {
                return userView(item);
            })}
        </div>
    ) : (
        <div></div>
    );

    return returnView;
};

export default memo(HistoryTab);

import React, { FC, memo, useEffect, useState } from "react";
import "./baHistoryTab.scss";
import BPOResult from "./BPOResult/BaBPOResult";
import BPOEvaluator from "./User/BaBPOEvaluator";
import NoRatingUser from "./User/BaNoRatingUser";
import { FinalRating, RatingUsers } from "model";
import { baGetBpoHistory } from "api/bpoHistory/bpoHistory";
import { isEmpty } from "lodash";

interface BaHistoryTabProps {
    ratingId: number;
    rlistingId: number;
    index: number;
}

const BaHistoryTab: FC<BaHistoryTabProps> = (props) => {
    const { ratingId, rlistingId, index } = props;

    const [bpoHistory, setBpoHistory] = useState<any>({});

    useEffect(() => {
        (async () => {
            const response = await baGetBpoHistory({
                rlistingId: rlistingId,
                ratingId: ratingId,
            });
            setBpoHistory(getFinalData(response.data));
        })();
    }, []);

    const getFinalData = (response: any) => {
        const listBa: RatingUsers[] = response.ratingUsers;
        const finalRating: FinalRating = response.finalRating;

        const data: Record<string, Partial<any>> = {
            listBa: listBa,
            finalRating: finalRating,
        };
        return data;
    };

    const userView = (item: RatingUsers) => {
        if (item.grade == null) {
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
        <div className="ba-history-container">
            <p className="nomal-title"> Kết quả BPO </p>
            <BPOResult
                resultData={bpoHistory.finalRating}
                rlistingId={rlistingId}
                ratingId={ratingId}
                index={index}
            />
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

export default memo(BaHistoryTab);

import React, { FC, memo } from "react";
import { RatingUsers, UserStatusId } from "model";

import "./baNoRatingUser.scss";

interface BaNoratingUserProps {
    resultData: RatingUsers;
}

const BaNoRatingUser: FC<BaNoratingUserProps> = (props) => {
    const { resultData } = props;

    const isActive = resultData?.userStatusId === UserStatusId.ACTIVE;
    return (
        <div className="ba-norating-user-container">
            <div className="norating-user">
                <div className="text-left">
                    <div className="two-text">
                        <p className="bold-title">{resultData?.assignedToName}</p>
                        {!isActive && (
                            <p className="orange-title">
                                ({resultData?.userStatus})
                            </p>
                        )}
                    </div>
                    <div />
                    <p className="nomal-title">Chưa đánh giá BPO</p>
                </div>
            </div>
        </div>
    );
};

export default memo(BaNoRatingUser);

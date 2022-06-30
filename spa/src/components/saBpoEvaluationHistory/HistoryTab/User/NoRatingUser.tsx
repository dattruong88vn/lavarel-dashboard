import React, { FC, memo } from "react";
import { RatingUsers, UserStatusId } from "model";

import "./noRatingUser.scss";

interface NoratingUserProps {
    resultData: RatingUsers;
}

const NoRatingUser: FC<NoratingUserProps> = (props) => {
    const { resultData } = props;

    const isActive = resultData?.userStatusId === UserStatusId.ACTIVE;
    return (
        <div className="norating-user-container">
            <div className="norating-user">
                <div className="text-left">
                    <div className="two-text">
                        <p className="black-title">{resultData?.assignedToName}</p>
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

export default memo(NoRatingUser);

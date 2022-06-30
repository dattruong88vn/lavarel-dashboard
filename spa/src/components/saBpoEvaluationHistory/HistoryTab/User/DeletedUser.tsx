import { RatingUsers } from "model";
import moment from "moment";
import React, { FC, memo } from "react";

import "./deletedUser.scss";

interface DeletedUserProps {
    resultData: RatingUsers;
}
const deletedIcon = (
    <svg
        viewBox="64 64 896 896"
        focusable="false"
        data-icon="minus-circle"
        width="1.2em"
        height="1.2em"
        fill="red"
        aria-hidden="true"
    >
        <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm192 472c0 4.4-3.6 8-8 8H328c-4.4 0-8-3.6-8-8v-48c0-4.4 3.6-8 8-8h368c4.4 0 8 3.6 8 8v48z"></path>
    </svg>
);
const DeletedUser: FC<DeletedUserProps> = (props) => {
    const { resultData } = props;
    const getDateString = (date: number) => {
        return date ? moment(date).format("DD/MM/YYYY") : "";
    };
    return (
        <div className="deleted-user-container">
            <div className="deleted-user">
                <div className="text-left">
                    <div className="image-text">
                        <div>{deletedIcon} </div>

                        <p className="black-title">{resultData?.assignedToName}</p>
                        <div />
                    </div>
                    <p className="nomal-title">
                        Lý do xóa:&nbsp;{resultData?.removedReason}
                    </p>
                </div>
                <p className="text-right">
                    Ngày xóa:&nbsp;
                    {getDateString(resultData?.removedDate)}
                </p>
            </div>
        </div>
    );
};

export default memo(DeletedUser);

import React, { FC, memo } from "react";

import "./index.scss";

type TitleProps = {
    text: string;
    isRequire?: boolean;
    customClassContainer?: string;
    customClassTitle?: string;
};
const TitleLine: FC<TitleProps> = (props) => {
    return (
        <div className={`title-container ${props.customClassContainer}`}>
            <h4 className={`title ${props.customClassTitle}`}>
                {props.text}
                {props.isRequire && <span className="dot-require">*</span>}
            </h4>
        </div>
    );
};

export default memo(TitleLine);

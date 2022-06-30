import React, { FC, memo } from "react";

import "./footerButton.scss";

interface FooterButtonProps {
    showBtnReevaluation?: boolean;
    showBtnUpdateListBa?: boolean;
    showBtnResolveConflict?: boolean;
    onReevaluatiol: () => void;
    onUpdateListBa: () => void;
    onResolveConflict: () => void;
}
const FooterButton: FC<FooterButtonProps> = (props) => {
    const {
        showBtnReevaluation,
        showBtnUpdateListBa,
        showBtnResolveConflict,
        onReevaluatiol,
        onUpdateListBa,
        onResolveConflict,
    } = props;
    return (
        <div className="footer-button-container">
            {showBtnReevaluation && (
                <button
                    className="btn btn-primary btn-outline-primary"
                    onClick={onReevaluatiol}
                >
                  <b>Đánh giá lại BPO</b>
                </button>
            )}
            {showBtnUpdateListBa && (
                <button
                    className="btn btn-primary button-margin"
                    onClick={onUpdateListBa}
                >
                  <b>Cập nhật danh sách BA</b> 
                </button>
            )}
            {showBtnResolveConflict && (
                <button
                    className="btn btn-success button-margin"
                    onClick={onResolveConflict}
                >
                  <b>Giải quyết khác biệt</b>  
                </button>
            )}
        </div>
    );
};

export default memo(FooterButton);

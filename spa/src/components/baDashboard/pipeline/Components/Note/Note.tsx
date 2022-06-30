import React, { memo } from "react";
import "./note.scss"

const NoteView: React.FC = () => {
    const noteData = ["Số deal rủi ro", "Số deal tiềm năng"]
    const note = (text: string, index: number) => (
        <div className="note-wrap" style={{ display: index > 0 ? "flex" : "none" }}>
            <div className={"note" + (index > 0 ? " color-green" : " color-yellow")} />
            <span className="gray-text">{text}</span>
        </div>
    )
    return (
        <div className="note-container">
            <span className="gray-text">Chú thích</span>
            {noteData?.map((item, index) => {
                return (
                    note(item, index)
                );
            })}
        </div>);
};

export default memo(NoteView);

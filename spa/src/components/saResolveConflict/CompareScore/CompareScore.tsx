import { Title } from "components/utils";
import React, { FC, memo } from "react";

import "./compareScore.scss";

type CompareScoreProps = {
    saScore: number;
    basScore: number;
};
const CompareScore: FC<CompareScoreProps> = (props) => {
    const { saScore, basScore } = props;
    return (
        <div className="compare-score-container">
            <div className="flex-score">
                <div className="score-left">
                    <Title
                        text="1.Điểm đánh giá BPO của SA "
                        isRequire={false}
                    />
                    <p className="score-label">{saScore}</p>
                </div>
                <div className="score-right">
                    <Title
                        text="2.Điểm đánh giá BPO trung bình của BAs"
                        isRequire={false}
                    />
                    <p className="score-label">{basScore}</p>
                </div>
            </div>
            <div className="flex-warning">
                <p className="title">Chú ý</p>
                <p className="title">
                    -Chắc chắn bạn đã thảo luận với BAs, Team Lead, Zone list để
                    đưa ra điểm số cuối cùng
                </p>
                <p className="title">
                    -Điểm khi bạn đánh giá sẽ là điểm BPO cuối cùng của listing
                </p>
            </div>
        </div>
    );
};

export default memo(CompareScore);

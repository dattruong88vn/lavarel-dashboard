import React, { FC, useEffect, useMemo, useState } from "react";
import "./index.scss";
import Rating from "react-rating";
import { VoteOptionsResponse } from "model";

type RatingProps = {
    readOnly?: boolean;
    currentRate?: number;
    onClickRate?: (rate: number) => void;
    textHard?: string;
    listVoteOptions?: VoteOptionsResponse[];
};

const yellowStar = (
    <svg
        viewBox="64 64 896 896"
        focusable="false"
        data-icon="star"
        width="2em"
        height="2em"
        fill="#fadb14"
        aria-hidden="true"
    >
        <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"></path>
    </svg>
);

const grayStar = (
    <svg
        viewBox="64 64 896 896"
        focusable="false"
        data-icon="star"
        width="2em"
        height="2em"
        fill="lightGray"
        aria-hidden="true"
    >
        <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.3z"></path>
    </svg>
);

const RatingView: FC<RatingProps> = (props) => {
    const {
        readOnly,
        currentRate = 0,
        onClickRate = () => {},
        textHard,
        listVoteOptions = [],
    } = props;
    const [textRate, setTextRate] = useState("");
    const [rate, setRate] = useState(currentRate);
    const [hoverRate, setHoverRate] = useState(0);

    const listVote = [
        ...listVoteOptions,
        {
            content: "",
            grade: 0,
            numberOfDay: 0,
        },
    ];
    const getTextRate = (rate: number) => {
        const options = listVote.filter((option) => option.grade === rate);
        return options.length > 0 ? options[0].content : "";
    };
    const onHoverRate = (rateValue: number) => {
        setHoverRate(rateValue);
    };

    const onChangeRate = (rateValue: number) => {
        setRate(rateValue);
        onClickRate(rateValue);
    };

    useEffect(() => {
        hoverRate > 0
            ? setTextRate(getTextRate(hoverRate))
            : setTextRate(getTextRate(rate));
    }, [rate, hoverRate]);

    useEffect(() => {
        setRate(currentRate);
    }, [currentRate]);

    const ratingView = (
        <Rating
            placeholderRating={rate}
            emptySymbol={grayStar}
            fullSymbol={yellowStar}
            placeholderSymbol={yellowStar}
            readonly={readOnly}
            onHover={onHoverRate}
            onClick={onChangeRate}
        />
    );
    return (
        <div className="rating-container-new">
            {ratingView}
            {!readOnly ? (
                <h4 className="title-orange">{textRate}</h4>
            ) : (
                <h4 className="title">{textHard}</h4>
            )}
        </div>
    );
};

export default RatingView;

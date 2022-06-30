import React, {useEffect, useState} from "react";
import BPORating from "../BPORating";
import PropTypes from "prop-types";
import {lastDay} from "../../utils";
import "./BPOOptions.scss";
import {useFetchConfigGrade} from "../../hooks";

function BPOOptions(props) {
    const [rated, setRated] = useState(0);
    const [caption, setCaption] = useState('');
    const [questionId, setQuestionId] = useState(1);

    const [grades] = useFetchConfigGrade();

    const currentStringFormat = () => {
        const now = new Date();
        const last = lastDay(now.getFullYear(), now.getMonth() + 1);

        return `${last}/${now.getMonth() + 1}/${now.getFullYear()}`;
    };

    const nextMonthStringFromCurrent = () => {
        const now = new Date();
        let current;
        if (now.getMonth() == 11) {
            current = new Date(now.getFullYear() + 1, 0, 1);
        } else {
            current = new Date(now.getFullYear(), now.getMonth() + 1, 1);
        }
        const last = lastDay(current.getFullYear(), current.getMonth() + 1);

        return `${last}/${current.getMonth() + 1}/${current.getFullYear()}`;
    };

    useEffect(() => {
        setRated(props.rated);
        setCaption(props.caption);
        setQuestionId(props.questionId);
    }, [props]);

    useEffect(() => {
        props.onChangeRating(rated);
        const aw = (grades?.data || []).find(i => i.id === questionId);
        const cap = (aw?.answers || []).find(i => i.grade === rated);
        setCaption(cap?.content || ' ');
    }, [rated]);
    useEffect(() => {
        //setRated(0);
        props.onChangeQuestion(questionId);
    }, [questionId]);

    return (
        <>
            {!grades.loading &&
                grades.data.map((option, index) => {
                    console.log(option);
                    return (
                        <div className="container-options" key={index}>
                            <label className="form-label no-bold">
                                <input
                                    type="radio"
                                    checked={option.id === questionId}
                                    value={option.id}
                                    onClick={(e) => setQuestionId(option.id)}
                                />
                                <span className="p-l-md no-bold">{option.content}{option.labelCode === 'THIS_MONTH' ? ` (${currentStringFormat()})` : ` (${nextMonthStringFromCurrent()})`}</span>
                            </label>
                            <div className="rating-container">
                                <BPORating
                                    name={`bpoOption-${index}`}
                                    rating={option.id === questionId ? rated : 0}
                                    disabled={option.id !== questionId}
                                    onChangeRating={setRated}
                                />
                                <div className="danger m-t-xs mb-2">{caption?.length > 0 ? caption : ' '}</div>
                                <br />
                            </div>
                        </div>
                    );
                })}
        </>
    );
}

BPOOptions.propTypes = {
    rate: PropTypes.number,
    onSelectOption: PropTypes.func,
    data: PropTypes.array,
    loading: PropTypes.bool,
};

BPOOptions.defaultProps = {
    rate: 0,
    onSelectOption: null,
    data: [],
    loading: false,
};

export default BPOOptions;

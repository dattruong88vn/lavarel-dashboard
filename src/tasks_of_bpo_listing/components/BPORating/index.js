import React from 'react'
import PropTypes from 'prop-types'
import StarRatings from 'react-star-ratings'

function BPORating(props) {
    const {
        rating,
        starRatedColor,
        numberOfStars,
        onChangeRating,
        name,
        starDimension,
        disabled,
        starHoverColor,
        starSpacing,
        starEmptyColor
    } = props

    const handleOnChangeRate = values => {
        !disabled && onChangeRating && onChangeRating(values)
    }

    return (
        <>
            {disabled &&
                <StarRatings
                    starHoverColor={starHoverColor}
                    starDimension={starDimension}
                    starRatedColor={starRatedColor}
                    rating={rating || 0}
                    numberOfStars={numberOfStars}
                    starSpacing={starSpacing}
                    name={name}
                    changeRating={null}
                    starEmptyColor={starEmptyColor}>
                </StarRatings>}
            {!disabled &&
                <StarRatings
                    starHoverColor={starHoverColor}
                    starDimension={starDimension}
                    starRatedColor={starRatedColor}
                    rating={rating || 0}
                    numberOfStars={numberOfStars}
                    starSpacing={starSpacing}
                    name={name}
                    changeRating={handleOnChangeRate}
                    starEmptyColor={starEmptyColor}>
                </StarRatings>}
        </>
    )
}

BPORating.propTypes = {
    rating: PropTypes.number,
    onChangeRating: PropTypes.func,
    numberOfStars: PropTypes.number,
    starRatedColor: PropTypes.string,
    name: PropTypes.string,
    starDimension: PropTypes.string,
    disabled: PropTypes.bool,
    starHoverColor: PropTypes.string,
    starSpacing: PropTypes.string,
    starEmptyColor: PropTypes.string
}

BPORating.defaultProps = {
    rating: 0,
    onChangeRating: null,
    numberOfStars: 5,
    starRatedColor: '#F1C40F',
    name: '',
    starDimension: '27px',
    disabled: false,
    starHoverColor: '#F1C40F',
    starSpacing: "1px",
    starEmptyColor: '#aaaaaa'
}

export default BPORating


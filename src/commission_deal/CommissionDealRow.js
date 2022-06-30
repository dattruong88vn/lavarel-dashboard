import React from 'react';

export default class CommissionDealRow extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        const {
            leftClass,
            rightClass,
            name,
            value
        } = this.props;

        return (
            <div className="row commission-deal-row">
                <div className={leftClass}>{name}</div>
                <div className={rightClass}>{value}</div>
            </div>
        )
    }
}
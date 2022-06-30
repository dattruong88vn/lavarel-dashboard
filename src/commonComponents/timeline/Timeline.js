import React from 'react';
import numberToDate from '../functions/numberToDate';
import numberToCurrency from '../functions/numberToCurrency';
import numberToTime from '../functions/numberToTime';

export default class Timeline extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        const {
            timelines
        } = this.props;

        return (
            <div className="commission-timeline">
                {timelines && timelines.map((timeline, index) => 
                    <div key={index} className="commission-timeline-container">
                        <div className="commission-timeline-content">
                            <div className="commission-timeline-content-item">{numberToDate(timeline.createdDate)} {numberToTime(timeline.createdDate)}</div>
                            <div className="commission-timeline-content-item">{timeline.createdByName}</div>
                            <div className="commission-timeline-content-item">{timeline.typeName}</div>
                            <div className="commission-timeline-content-item">{timeline.collectPrice ? numberToCurrency(timeline.collectPrice) : 0}</div>
                            {timeline.typeId === 189 && <div className="commission-timeline-content-item">{timeline.statusName}</div>}
                            <div className="commission-timeline-content-item">{timeline.note ? timeline.note : ''}</div>
                        </div>
                    </div>    
                )}  
            </div>
        )
    }
}
import React from 'react';

export default class MoneyCollectedPlanInput extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        const {
            type,
            label,
            name,
            value,
            onChange
        } = this.props;

        return (
            <div className="col-sm-4">
                <form className="form-inline">
                    <div className="form-group">
                        <span className="money-collected-plan-input-label">{label}</span>
                        <input 
                            type={type} 
                            min="0.1"
                            className="form-control"  
                            name={name}
                            placeholder={label}
                            value={value}
                            onChange={onChange} 
                        />
                    </div>
                </form>
            </div>
        )
    }
}
import React from 'react';

export default class CommissionTextarea extends React.Component {
    constructor(props) {
        super(props);
    }

    handleCheckboxChange = (e) => {
        const {
            name,
            value
        } = e.target;
        this.props.onChange(name, value);
    }

    render() {

        const {
            leftClass,
            rightClass,
            label,
            name,
            value,
            placeholder
        } = this.props;

        return (
            <div className="row commission-deal-row">
                <div className={leftClass}>{label}</div>
                <div className={rightClass}>
                    <textarea 
                        className="form-control" 
                        name={name} 
                        value={value} 
                        placeholder={placeholder}
                        onChange={this.handleCheckboxChange} 
                    />
                </div>
            </div>
        )
    }
}
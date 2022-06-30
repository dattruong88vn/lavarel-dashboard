import React from 'react';

export default class CommissionCheckbox extends React.Component {
    constructor(props) {
        super(props);
    }

    handleCheckboxChange = (e) => {
        const {
            name,
            checked
        } = e.target;
        this.props.onChange(name, checked);
    }

    render() {

        const {
            size,
            label,
            name,
            checked
        } = this.props;

        return (
            <div className={size}>
                <div className="checkbox">
                    <label>
                        <input 
                            type="checkbox" 
                            name={name} 
                            checked={checked} 
                            onChange={this.handleCheckboxChange} 
                        /> 
                        {label}
                    </label>
                </div>
            </div>
        )
    }
}
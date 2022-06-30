import React from 'react';

const CATEGORIES = [
    { id: 1, name: 'Mua' },
    { id: 2, name: 'Bán' }
]

export default class CommissionSelect extends React.Component {
    constructor(props) {
        super(props);
    }

    handleSelectChange = (e) => {
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
            value
        } = this.props;

        return (
            <div className="row commission-deal-row">
                <div className={leftClass}>{label}</div>
                <div className={rightClass}>
                    <select 
                        className="form-control"
                        name={name}
                        value={value}
                        onChange={this.handleSelectChange}
                    >
                        {CATEGORIES.map(category => 
                            <option key={category.id} value={category.id}>{category.name}</option>    
                        )}
                    </select>
                </div>
            </div>
        )
    }
}
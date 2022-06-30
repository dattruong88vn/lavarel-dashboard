import React, { Component } from 'react';
import Select from 'react-select';

export default class CommissionRevenueReportSelect extends Component {
    constructor(props) {
        super(props);
    }

    handleChange = (e) => {
        const { name } = this.props;
        this.props.onChange(name, e);
    }

    render() {

        const {
            constainer,
            id,
            label,
            name,
            options,
            selectedOption,
            isMulti
        } = this.props;

        return (
            <div className={constainer}>
                <div className="row form-group">
                    <div className="col-sm-5">
                        <label htmlFor={id}>{label}</label>
                    </div>
                    <div className="col-sm-7">
                        <Select
                            name={name} 
                            value={selectedOption}
                            onChange={this.handleChange}
                            options={options}
                            isMulti={isMulti}
                        />

                        {/* <select 
                            className="form-control select-label" 
                            name={name} 
                            multiple={true}
                            onChange={this.handleChange}
                        >
                            <option value={data && data.map(item => item.id)}>All</option>
                            {data && data.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
                        </select> */}
                    </div>
                </div>
            </div>
        )
    }
}
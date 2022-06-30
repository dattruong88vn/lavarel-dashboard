import React, { Component } from 'react';
import Select from 'react-select';

class NeedOther extends Component {
    constructor(props) {
        super(props);
        this._STORED_LOCAL = {
            defaultValue : {value : '', label: "--- Vui lòng chọn ---"}
        };
    }
    
    render() {
        let {filterSelect, listNeed, listTypeCustomer, listLocationTc} = this.props.checking;
        return (
            <div className="wrapper-form-need">
                <div className="form-group row">
                    <div className="col-md-4 pr0">
                        <label>Nhu cầu: <span className="text-danger">*</span></label>
                    </div>
                    <div className="col-md-8 pl0">
                        <Select
                            isSearchable={false}
                            value={filterSelect.needId ? filterSelect.needId : this._STORED_LOCAL.defaultValue}
                            options={listNeed}
                            onChange={this.props.handleChangeSelect.bind(this, 'needId')}/>
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-md-4 pr0">
                        <label>Loại khách hàng: <span className="text-danger">*</span></label>
                    </div>
                    <div className="col-md-8 pl0">
                        <Select
                            isSearchable={false}
                            value={filterSelect.visitorType ? filterSelect.visitorType : this._STORED_LOCAL.defaultValue}
                            options={listTypeCustomer}
                            onChange={this.props.handleChangeSelect.bind(this, 'visitorType')}/>
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-md-4 pr0">
                        <label>Mục đích: <span className="text-danger">*</span></label>
                    </div>
                    <div className="col-md-8 pl0">
                        <textarea rows="4" className="form-control" name="intent" placeholder="Mục đích của khách hàng" onChange={this.props.handleChangeInput.bind(this)}></textarea>
                    </div>
                </div>
                
            </div>
        );
    }
}

export default NeedOther;
import React, { Component } from 'react';
import Select from 'react-select';

class NeedAll extends Component {
    constructor(props) {
        super(props);
        this._STORED_LOCAL = {
            defaultValue : {value : '', label: "--- Vui lòng chọn ---"}
        };
        this.tcId = false;
    }

    componentDidMount(){
        this.tcId = true;
    }

    render() {
        var {filterSelect, listGroup, listTypeLand, postData, listLocationTc} = this.props.checking;
        if (!this.tcId) {
             filterSelect.tcId = listLocationTc.find(o => o.value == currentUser.tcs[0].tcId);
        }

        return (
            <div className="wrapper-form-need">
                {postData.requestType != 96 && 
                    <div className="form-group">
                        <div className="row">
                            <div className="col-md-4 pr0">
                                <label>Nhóm bất động sản: <span className="text-danger">*</span></label>
                            </div>
                            <div className="col-md-8 pl0">
                                <Select
                                    isSearchable={false}
                                    value={filterSelect.propertyTypeGroup ? filterSelect.propertyTypeGroup : this._STORED_LOCAL.defaultValue}
                                    options={listGroup}
                                    onChange={this.props.handleChangeSelect.bind(this, 'propertyTypeGroup')} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4 pr0">
                                <label>Loại bất động sản: <span className="text-danger">*</span></label>
                            </div>
                            <div className="col-md-8 pl0">
                                <Select
                                    isSearchable={false}
                                    value={filterSelect.propertyTypeId ? filterSelect.propertyTypeId : this._STORED_LOCAL.defaultValue}
                                    options={listTypeLand}
                                    onChange={this.props.handleChangeSelect.bind(this, 'propertyTypeId')}
                                    styles={{
                                        option: (base, { isDisabled, isFocused }) => {
                                            let backgroundColor = '#fff'
                                            let color = '#333'
                                            if(isDisabled) {
                                                backgroundColor = '#ccc'
                                                color = '#444'
                                            }
                            
                                            if(isFocused) {
                                                backgroundColor = "#deebff"; //Default color by react-select
                                            }
                            
                                            return {
                                                ...base,
                                                backgroundColor,
                                                color,
                                                cursor: isDisabled ? 'not-allowed' : 'default',
                                            }
                                        }
                                    }} 
                                    />
                            </div>
                        </div>
                </div>}

                {/* <div className="form-group row">

                     <div className="col-md-4 pr0">
                        <label>Vị trí TC: <span className="text-danger">*</span></label>
                    </div>
                    <div className="col-md-8 pl0">
                        <Select
                            isSearchable={false}
                            value={filterSelect.tcId ? filterSelect.tcId : this._STORED_LOCAL.defaultValue}
                            options={listLocationTc}
                            onChange={this.props.handleChangeSelect.bind(this, 'tcId')}/>
                    </div> 

                </div> */}
            </div>
        );
    }
}

export default NeedAll;
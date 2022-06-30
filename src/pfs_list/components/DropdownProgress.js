import React, { Component } from 'react';
import Select from 'react-select';

class DropdownProgress extends Component {
    constructor(props) {
        super(props);
        this._STORED_LOCAL = {
            defaultValue : {value : '', label: "--- Vui lòng chọn ---"}
        };
        this._SELECT_DEFAULT =  {
            value: { 
                label: this.props.info.progressName ? this.props.info.progressName : "--- Vui lòng chọn ---", 
                value: this.props.info.progressId ? this.props.info.progressId : ''
            },
        }
    }

    render() {
        let {info} = this.props;
        return (
            <div className="form-group">
                <label>Tiến độ </label>
                <p>{info.progressName ? info.progressName : 'N/A'}</p>
                {info.statusId == 31 && <Select
                    value={this.props.dp.selectProgress.progressId ? this.props.dp.selectProgress.progressId : this._SELECT_DEFAULT.value}
                    defaultValue={{ label: info.progressName, value: info.progressId }}
                    options={this.props.dp.listProgress}
                    onChange={this.props.handleChangeSelect.bind(this, 'progressId')}/>}
            </div>
        );
    }
}

export default DropdownProgress;
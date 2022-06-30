import React from "react";
import Select from 'react-select';

export const Select2= (props) => {
    let options = props.options ? props.options : [];
    let value = props.value ? props.value : '';
    return(
        <div className="row">
            <label className="control-label col-md-12" htmlFor={props.id}>{props.label ? props.label : 'N/a'}</label>
            <div className="col-md-12">
                <Select
                    classNamePrefix={"db-select2-react"}
                    options={options}
                    value={value}
                    isMulti={props.isMulti ? props.isMulti : false}
                    onChange={function (value) {
                        if(props.onChange) {
                            return props.onChange(value);
                        }
                        return false;
                    }}
                    placeholder={props.placeholder ? props.placeholder : '---Vui lòng chọn ---'}
                />
            </div>
        </div>
    );
};
import React from "react";

function formatPhoneNumber($number) {
    let _value = '';
    if($number) {
        const newValue = $number.split('').filter(it => {
            const __value = Number.parseInt(it);
            return (__value >= 0 ? String(__value) : null );
        });

        if(newValue[0] != "0") {
            // number 1 is a 0
            _value = '';
        } else if (newValue.length > 11) {
            newValue.length = 11;
            _value = newValue.join("");
        } else if (newValue.length > 1 && newValue[1] == "0") {
            // number 2 not is 0 (00)
            newValue.length = 1;
            _value = newValue.join("");
        } else {
            _value = newValue.join("");
        }
    }
    return _value;
}

export const InputText = (props) => {
    return(
        <div className="row">
            <label className="control-label col-md-12" htmlFor={props.id}>{props.label ? props.label : 'N/a'}</label>
            <div className="col-md-12">
                <input id={props.id} name={props.name} type="text" className="form-control" value={props.value ? props.value : '' } onChange={function (e) {
                    if (props.onChange) {
                        return props.onChange(e);
                    } else {
                        return false;
                    }
                }}/>
            </div>
        </div>
    );
};

export const InputDate = (props) => {
    return(
        <div className="row">
            <label className="control-label col-md-12" htmlFor={props.id}>{props.label ? props.label : 'N/a'}</label>
            <div className="col-md-12">
                <div className="input-group date-range date">
                <input id={props.id} type="text"  value={props.value ? props.value : '' } placeholder={props.label ? props.label + '...' : ''} className="form-control date-range-from" onChange={function (e) {}}/>
                    <div className="input-group-addon">
                        <span className="glyphicon glyphicon-th"></span>
                    </div>
                </div>
            </div>
        </div>

    );
};

export const InputPhone = (props) => {
    let value = formatPhoneNumber(props.value);
    return(
        <div className="row">
            <label className="control-label col-md-12" htmlFor={props.id}>{props.label ? props.label : 'N/a'}</label>
            <div className="col-md-12">
                <input id={props.id} name={props.name} type="text" className="form-control" value={value} onChange={function (e) {
                    if (props.onChange) {
                        e.target.value = formatPhoneNumber(e.target.value);
                        return props.onChange(e);
                    } else {
                        return false;
                    }
                }}/>
            </div>
        </div>
    );
};
import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

const CustomSelect = props => {
    const styleColor = props.validation.isShowed ? {color: 'red'} : {};
    const styleBorder = props.validation.isShowed ? {border: '1px solid red'} : {};
    const required = props.required ? 'required' : null;

    return (
        <>
            {props.label ? <label className={`control-label ${required}`} style={styleColor} >{props.label}</label> : null}
            <div style={styleBorder}>
                <Select 
                    name={props.name}
                    options={props.options}
                    isDisabled={props.isDisabled}
                    value={props.value}
                    onChange={props.changed}
                    id={props.id}
                    classNamePrefix="db-select2-react" />
            </div>
        </>
    );
};

CustomSelect.defaultProps = {
    validation: {
        isShowed: false
    },
    isDisabled: false
};

export default CustomSelect;
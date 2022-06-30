import React from 'react';
import PropTypes from 'prop-types';

const Input = props => {
    const {label, required, type, placeholder, value, changed, name, validation} = props;
    const styleColor = validation.isShowed ? {color: 'red'} : {};
    const styleBorder = validation.isShowed ? {border: '1px solid red'} : {};
    const styleRequired = required ? 'required' : null;

    return (
        <>
            {label ? <label className={`control-label ${styleRequired}`} style={styleColor} >{label}</label> : null}
            <input 
                type={type} 
                placeholder={placeholder}
                value={value}
                onChange={changed} 
                name={name} 
                className="form-control" 
                style={styleBorder} />
        </>    
    );        
};

Input.propTypes = {
    label: PropTypes.string,
    required: PropTypes.bool,
    type: PropTypes.string,
    placeholder: PropTypes.string,
    changed: PropTypes.func,
    name: PropTypes.string,
    validation: PropTypes.shape({
        isShowed: PropTypes.bool,
        value: PropTypes.bool
    })
};

Input.defaultProps = {
    validation: {
        isShowed: false
    }
};

export default Input;
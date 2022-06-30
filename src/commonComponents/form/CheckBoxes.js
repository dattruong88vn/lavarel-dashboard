import React from 'react';
import PropTypes from 'prop-types';

const CheckBoxes = props => {
    const styleColor = props.validation.isShowed ? {color: 'red'} : {};
    const styleBorder = props.validation.isShowed ? {border: '1px solid red'} : {};
    const required = props.required ? 'required' : null;

    return (
        <>
            <label className={`control-label ${required}`} style={styleColor} >{props.label}</label>
            <div className="form-group">
                <div className="row">
                    {
                        props.types.map(type => (
                            <div key={type.id} className="col-sm-12 col-md-4 col-lg-4 utilitie-item-content">
                                <label className="checkbox text-capitalize font-weight-bold" style={styleColor}>
                                    <input 
                                    type="checkbox" 
                                        className="utilitie" 
                                        value={type["id"]} 
                                        checked={type.checked}
                                        id={`type${type.id}`} 
                                        name={`type${type.id}`}
                                        onChange={props.changed} />
                                    <span className="cr" style={styleBorder}><i className="cr-icon glyphicon glyphicon-ok"></i></span>
                                    {type.name}
                                </label>
                            </div>   
                        ))
                    } 
                </div>
            </div>    
        </>
    );
};

CheckBoxes.defaultProps = {
    validation: {
        isShowed: false
    }
};

export default CheckBoxes;
import React from 'react';
import PropTypes from 'prop-types';

export const BtnSubmit = props => (
    <button 
        type="submit" 
        className="btn btn-primary"
        id={props.id} >
            {props.name}
    </button>
);

export default BtnSubmit;
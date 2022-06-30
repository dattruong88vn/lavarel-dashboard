import React from 'react';

const Checkbox = ({ type = 'checkbox', name, value, checked = false, onChange, disabled }) => (
    <input type={type} name={name} value={value} disabled={disabled} checked={checked} onChange={onChange} />
);

export default Checkbox;
import React from 'react';
import './input-field.style.css';

const InputField = ({
    placeholder, 
    handleOnChange, 
    type,
    name, 
    value, 
    autoComplete,
    required
}) => {
    return (
        <input 
            className='input-field'
            placeholder={placeholder}
            onChange={(e) => handleOnChange(e)}
            name={name}
            value={value}
            autoComplete={autoComplete}
            type={type}
            required={required}
        />
    )
}

export default InputField;
import React from 'react';
import './input-field.style.css';

const InputField = ({
    placeholder, 
    handleOnChange, 
    type,
    name, 
    value, 
    autoComplete,
    required,
    classes
}) => {
    return (
        <input 
            className={`input-field ${classes}`}
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
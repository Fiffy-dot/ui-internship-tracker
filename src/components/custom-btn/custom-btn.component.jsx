import React from 'react';
import './custom-btn.style.css';

const CustomButton = ({ children, handleOnClick, type, classes }) => {
    return (
        <button 
            className={`${classes} custom-btn`} 
            onClick={(e) => handleOnClick(e)}
            type={type}
        >
            { children }
        </button>
    )
}

export default CustomButton;
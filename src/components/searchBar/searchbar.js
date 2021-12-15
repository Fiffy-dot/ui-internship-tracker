import React from 'react';
import InputField from '../input-field/input-field.component';

const SearchBar = () => {
    const [state, setstate] = React.useState("");
    const handleState = (e) => {
        setstate(e.target.value)
    }
    return (
        <InputField 
            handleOnChange={handleState}
            value={state}
            classes="search"
            placeholder={"search item"}
            autoComplete={"on"}
            name="search"
            type={"text"}
        />
    )
};

export default SearchBar;
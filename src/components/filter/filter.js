import React from 'react';

const Filter = () => {
    return (
        <select class="form-select" aria-label="Default select example">
            <option selected>status</option>
            <option value="1">selected</option>
            <option value="2">viewed</option>
            <option value="3">rejected</option>
        </select>
    )
}

export default Filter;
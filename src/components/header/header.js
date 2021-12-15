import React from 'react';
import SearchBar from '../searchBar/searchbar';
import './style.css';

const Header = () => {
    return (
        <header className='header'>
            <SearchBar />
            <i className="far fa-bell"></i>
        </header>
    )
}

export default Header;
import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changeCurrentPage } from '../../redux/navigation/navigation.action';
import './sidebar.css';

const Sidebar = ({ page, changeCurrentPage }) => {
    const navigate = useNavigate()
    const handleOnClick = (navigateTo) => {
        changeCurrentPage(navigateTo);
        navigate(`/student/${navigateTo}`);
    }

    return (
        <div className='sidebar'>
            <h2 className='logo'>Internship Tracker</h2>
            <div>
                <h2 className='secondary-header sidebar-title'>main menu</h2>
                <div 
                    className={`${page === "dashboard" ? "active" : ""} sidebar-item`} 
                    onClick={() => handleOnClick('dashboard')}
                >
                    <i className="fas fa-tachometer-alt"></i>
                    <span className='item-text'>dasboard</span>
                </div>
                <div 
                    className={`${page === 'jobs' ? "active" : ""} sidebar-item`} 
                    onClick={() => handleOnClick('jobs')}
                >
                    <i className="fas fa-tachometer-alt"></i>
                    <span className='item-text'>jobs</span>
                </div>
                <div 
                    className={`${page === "profil" ? "active" : ""} sidebar-item`} 
                    onClick={() => handleOnClick('profil')}
                >
                    <i className="fas fa-tachometer-alt"></i>
                    <span className='item-text'>profil</span>
                </div>
                <div 
                    className={`sidebar-item`} 
                    onClick={() => {console.log("logout")}}
                >
                    <i className="fas fa-tachometer-alt"></i>
                    <span className='item-text'>logout</span>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        page: state.navbar.page
    }
}

const mapDispatchToProps = dispatch => {
    return {
    changeCurrentPage: (page) => dispatch(changeCurrentPage(page))
}}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Sidebar);
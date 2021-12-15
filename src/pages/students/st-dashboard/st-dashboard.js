import React from 'react';
import Sidebar from '../../../components/sidebar/sidebar';
import StHome from '../../../components/st-home/st-home';
import './st-dashboard.css';

const StDashboard = () => {
    return (
        <div className='student-dashboard'>
            <Sidebar />
            <StHome />
        </div>
    )
}

export default StDashboard;
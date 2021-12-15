import React from 'react';
import Sidebar from '../../../components/sidebar/sidebar';
import Home from '../../../components/employer/home/home';
import'./em-dashboard.css';

const EmDashboard = () => {
    return (
        <div className='em-dashboard'>
            <Sidebar />
            <Home />
        </div>
    )
};

export default EmDashboard;